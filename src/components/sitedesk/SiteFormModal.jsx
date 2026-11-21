import { useEffect, useRef, useState } from "react";
import {
  Building2,
  Clock3,
  Crosshair,
  Hash,
  LocateFixed,
  MapPin,
  Store,
} from "lucide-react";
import Modal from "../ui/Modal";
import TextField from "../ui/TextField";
import Avatar, { initialTone } from "../ui/Avatar";
import GeofencePreview from "./GeofencePreview";
import RadiusSlider from "./RadiusSlider";

// "Add New Construction Site" / "Edit Site" dialog.
// One scrolling form in four sections. The numbered bar at the top jumps to a
// section. Mount it only while open so the form starts fresh each time.
//
//   initial         existing site to edit (omit to add a new one)
//   supervisorPool  [{ id, name, role }] people who can be assigned
//   takenCodes      codes used by other sites (upper-case, no "#"), to block duplicates
//   startSection    "info" | "shift" | "geofence" | "supervisors" (scrolls there on open)
//   onSubmit(site)  receives the full site object; onClose()

const steps = [
  { id: "info", label: "Project Info" },
  { id: "shift", label: "Shift Window" },
  { id: "geofence", label: "Geofence Zone" },
  { id: "supervisors", label: "Supervisors" },
];

const graceOptions = [0, 5, 10, 15, 20, 30];

const blank = {
  name: "",
  code: "",
  address: "",
  shiftStart: "08:00",
  shiftEnd: "17:00",
  graceMins: 15,
  radius: 150,
  anchor: "",
  lat: "",
  lng: "",
  supervisorIds: [],
};

function toForm(site) {
  if (!site) return blank;
  return {
    name: site.name,
    code: site.code,
    address: site.address,
    shiftStart: site.shiftStart,
    shiftEnd: site.shiftEnd,
    graceMins: site.graceMins,
    radius: site.radius,
    anchor: site.anchor,
    lat: String(site.lat),
    lng: String(site.lng),
    supervisorIds: site.supervisors.map((s) => s.id),
  };
}

function validate(f, takenCodes) {
  const errors = {};
  if (!f.name.trim()) errors.name = "Enter the site or project name.";
  const code = f.code.trim().toUpperCase().replace(/^#/, "");
  if (!code) errors.code = "Enter a project code.";
  else if (takenCodes.includes(code))
    errors.code = "Another site already uses this code.";
  if (!f.address.trim()) errors.address = "Enter the site address.";
  if (!f.shiftStart || !f.shiftEnd || f.shiftEnd <= f.shiftStart)
    errors.shift = "Shift end must be after shift start.";
  if (!f.anchor.trim())
    errors.anchor = "Name the check-in point, e.g. Main Gate.";
  const lat = Number(f.lat);
  const lng = Number(f.lng);
  if (f.lat === "" || Number.isNaN(lat) || lat < -90 || lat > 90)
    errors.lat = "Latitude must be between -90 and 90.";
  if (f.lng === "" || Number.isNaN(lng) || lng < -180 || lng > 180)
    errors.lng = "Longitude must be between -180 and 180.";
  if (f.supervisorIds.length === 0)
    errors.supervisors = "Assign at least one supervisor.";
  return errors;
}

export default function SiteFormModal({
  initial,
  supervisorPool,
  takenCodes = [],
  startSection,
  onSubmit,
  onClose,
}) {
  const editing = Boolean(initial);
  const [form, setForm] = useState(() => toForm(initial));
  const [submitted, setSubmitted] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState("");
  const sectionRefs = useRef({});

  const errors = validate(form, takenCodes);
  const show = (key) => (submitted ? errors[key] : undefined);
  const set = (key) => (event) =>
    setForm((f) => ({ ...f, [key]: event.target.value }));

  const jumpTo = (id) =>
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  useEffect(() => {
    if (startSection) jumpTo(startSection);
  }, [startSection]);

  const toggleSupervisor = (id) =>
    setForm((f) => ({
      ...f,
      supervisorIds: f.supervisorIds.includes(id)
        ? f.supervisorIds.filter((x) => x !== id)
        : [...f.supervisorIds, id],
    }));

  const fillMyLocation = () => {
    if (!navigator.geolocation) {
      setLocateError("This browser can't share its location.");
      return;
    }
    setLocating(true);
    setLocateError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((f) => ({
          ...f,
          lat: pos.coords.latitude.toFixed(4),
          lng: pos.coords.longitude.toFixed(4),
        }));
        setLocating(false);
      },
      () => {
        setLocateError("Couldn't get your location. Enter it by hand.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const submit = () => {
    setSubmitted(true);
    const firstError = Object.keys(errors)[0];
    if (firstError) {
      const section =
        firstError === "shift"
          ? "shift"
          : ["anchor", "lat", "lng"].includes(firstError)
            ? "geofence"
            : firstError === "supervisors"
              ? "supervisors"
              : "info";
      jumpTo(section);
      return;
    }

    const keepOnDuty = new Map(
      (initial?.supervisors ?? []).map((s) => [s.id, s.onDuty]),
    );
    const code = form.code.trim().toUpperCase();
    onSubmit({
      // Fields this form doesn't edit keep their old values (or defaults).
      status: "active",
      kind: "tower",
      registered: 0,
      accuracyNote: "Manually entered coordinates",
      syncNote: "Geofence pending kiosk sync",
      ...initial,
      id: initial?.id ?? code.replace(/^#/, "").toLowerCase(),
      name: form.name.trim(),
      code: code.startsWith("#") ? code : `#${code}`,
      address: form.address.trim(),
      shiftStart: form.shiftStart,
      shiftEnd: form.shiftEnd,
      graceMins: Number(form.graceMins),
      radius: form.radius,
      anchor: form.anchor.trim(),
      anchorDetail:
        initial && form.anchor.trim() === initial.anchor
          ? initial.anchorDetail
          : form.anchor.trim(),
      lat: Number(form.lat),
      lng: Number(form.lng),
      supervisors: supervisorPool
        .filter((s) => form.supervisorIds.includes(s.id))
        .map((s) => ({ ...s, onDuty: keepOnDuty.get(s.id) })),
    });
  };

  const sectionRef = (id) => (el) => (sectionRefs.current[id] = el);
  const errorCount = submitted ? Object.keys(errors).length : 0;

  return (
    <Modal
      open
      onClose={onClose}
      size="lg"
      accent
      icon={Store}
      title={
        <>
          {editing ? "Edit Construction Site" : "Add New Construction Site"}
          <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-sm font-normal uppercase text-slate-700">
            {editing ? "Edit" : "Setup"}
          </span>
        </>
      }
      description="Set up project identity, configure GPS geofence boundary rules, and assign initial site supervision."
      footer={
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-red-700" role="alert">
            {errorCount > 0 &&
              `Fix ${errorCount} ${errorCount === 1 ? "field" : "fields"} to continue.`}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl bg-indigo-100 px-5 py-3 text-slate-900 hover:bg-indigo-200 sm:flex-none"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              className="flex-1 rounded-xl bg-[#965000] px-5 py-3 font-medium text-white hover:bg-[#794000] sm:flex-none"
            >
              {editing ? "Save Changes" : "Create Site"}
            </button>
          </div>
        </div>
      }
    >
      {/* Step bar (jump links) */}
      <nav
        aria-label="Form sections"
        className="sticky -top-3 z-10 -mx-5 flex gap-4 overflow-x-auto bg-indigo-50 px-5 py-3 sm:-top-6 sm:-mx-6 sm:justify-between sm:px-6"
      >
        {steps.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => jumpTo(s.id)}
            className="flex shrink-0 items-center gap-2 text-sm font-medium text-[#965000]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#965000] text-xs text-white">
              {i + 1}
            </span>
            {s.label}
          </button>
        ))}
      </nav>

      <div className="space-y-10 pt-6">
        {/* 1. Basic info */}
        <section ref={sectionRef("info")} className="scroll-mt-16 space-y-4">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-xl font-semibold">1. Basic Site Info</h3>
            <span className="text-sm text-slate-700">All fields required</span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <TextField
              label="Site / Project Name"
              icon={Building2}
              value={form.name}
              onChange={set("name")}
              placeholder="e.g. Blue Harbor Residences - Phase 1"
              error={show("name")}
            />
            <TextField
              label="Project Code / ID"
              icon={Hash}
              value={form.code}
              onChange={set("code")}
              placeholder="#BH-RES-01"
              error={show("code")}
            />
          </div>
          <TextField
            label="Physical Site Address / Landmark"
            icon={MapPin}
            value={form.address}
            onChange={set("address")}
            placeholder="e.g. Plot 12B, Marine Drive Industrial Corridor"
            error={show("address")}
          />
        </section>

        {/* 2. Shift */}
        <section ref={sectionRef("shift")} className="scroll-mt-16 space-y-4">
          <h3 className="text-xl font-semibold">
            2. Shift Schedule &amp; Work Window
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <TextField
              label="Shift Start Time"
              icon={Clock3}
              type="time"
              value={form.shiftStart}
              onChange={set("shiftStart")}
              error={show("shift")}
            />
            <TextField
              label="Shift End Time"
              icon={Clock3}
              type="time"
              value={form.shiftEnd}
              onChange={set("shiftEnd")}
            />
            <TextField
              as="select"
              label="Grace Period"
              value={form.graceMins}
              onChange={set("graceMins")}
            >
              {graceOptions.map((m) => (
                <option key={m} value={m}>
                  {m === 0 ? "No grace period" : `${m} minutes`}
                </option>
              ))}
            </TextField>
          </div>
        </section>

        {/* 3. Geofence */}
        <section
          ref={sectionRef("geofence")}
          className="scroll-mt-16 space-y-4"
        >
          <h3 className="text-xl font-semibold">3. Geofence Zone</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <GeofencePreview
              radius={form.radius}
              anchorLabel={form.anchor.trim() || "Check-in point"}
            />
            <div className="space-y-4">
              <RadiusSlider
                value={form.radius}
                onChange={(radius) => setForm((f) => ({ ...f, radius }))}
              />
              <TextField
                label="Check-in Anchor Point"
                icon={LocateFixed}
                value={form.anchor}
                onChange={set("anchor")}
                placeholder="e.g. South Pier Gate"
                error={show("anchor")}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <TextField
              label="Latitude"
              inputMode="decimal"
              value={form.lat}
              onChange={set("lat")}
              placeholder="28.5355"
              error={show("lat")}
            />
            <TextField
              label="Longitude"
              inputMode="decimal"
              value={form.lng}
              onChange={set("lng")}
              placeholder="77.3910"
              error={show("lng")}
            />
            <button
              type="button"
              onClick={fillMyLocation}
              disabled={locating}
              className="flex items-center justify-center gap-2 rounded-xl bg-orange-100 px-4 py-3.5 text-[#965000] hover:bg-orange-200 disabled:opacity-60"
            >
              <Crosshair className="h-5 w-5" />
              {locating ? "Locating…" : "Use my location"}
            </button>
          </div>
          {locateError && <p className="text-sm text-red-700">{locateError}</p>}
        </section>

        {/* 4. Supervisors */}
        <section
          ref={sectionRef("supervisors")}
          className="scroll-mt-16 space-y-4"
        >
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-xl font-semibold">4. Site Supervisors</h3>
            <span className="text-sm text-slate-700">
              {form.supervisorIds.length} selected
            </span>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {supervisorPool.map((sv) => {
              const checked = form.supervisorIds.includes(sv.id);
              return (
                <li key={sv.id}>
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl p-3 ring-2 transition ${
                      checked
                        ? "bg-orange-50 ring-[#965000]"
                        : "bg-indigo-50 ring-transparent hover:bg-indigo-100"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleSupervisor(sv.id)}
                      className="h-4 w-4 accent-[#965000]"
                    />
                    <Avatar
                      name={sv.name}
                      size="h-10 w-10 text-sm"
                      rounded="rounded-full"
                      tone={initialTone(sv.name)}
                    />
                    <span className="min-w-0">
                      <span className="block text-slate-900">{sv.name}</span>
                      <span className="block text-sm text-slate-600">
                        {sv.role}
                      </span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
          {show("supervisors") && (
            <p className="text-sm text-red-700">{show("supervisors")}</p>
          )}
        </section>
      </div>
    </Modal>
  );
}
