import { useState } from "react";
import { ContactRound, Plus, Save, Smartphone } from "lucide-react";
import Card from "../ui/Card";
import Avatar, { initialTone } from "../ui/Avatar";
import StatusPill from "../ui/StatusPill";
import GeofencePreview from "./GeofencePreview";
import RadiusSlider from "./RadiusSlider";
import { to12h } from "./siteFormat";

// Right-hand "Perimeter Configuration" panel for the selected site.
// The radius is edited locally and only applied on "Save & Broadcast Perimeter".
// Give it key={site.id + site.radius} so the draft resets when the site changes.
//
// onSave(radius), onAssign(), onTestKiosk()
export default function PerimeterPanel({
  site,
  onSave,
  onAssign,
  onTestKiosk,
}) {
  const [radius, setRadius] = useState(site.radius);
  const changed = radius !== site.radius;

  return (
    <Card className="space-y-4 p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-[#965000]">
            Perimeter Configuration
          </p>
          <h2 className="mt-1 text-xl font-medium text-slate-900">
            {site.name}
          </h2>
        </div>
        <span className="shrink-0 rounded-lg bg-indigo-50 px-3 py-1.5 font-mono text-sm text-slate-700">
          {site.code}
        </span>
      </div>

      <GeofencePreview radius={radius} anchorLabel={site.anchorDetail} />
      <RadiusSlider value={radius} onChange={setRadius} />

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-indigo-50 p-4">
          <p className="text-sm text-slate-700">GPS Center Coordinates</p>
          <p className="mt-1 text-slate-900">
            lat {site.lat.toFixed(4)}, long {site.lng.toFixed(4)}
          </p>
          <p className="mt-1 text-sm text-slate-600">{site.accuracyNote}</p>
        </div>
        <div className="rounded-2xl bg-indigo-50 p-4">
          <p className="text-sm text-slate-700">Shift Window &amp; Rules</p>
          <p className="mt-1 text-slate-900">
            {to12h(site.shiftStart)} – {to12h(site.shiftEnd)}
          </p>
          <p className="mt-1 text-sm text-emerald-700">
            {site.graceMins} min standard grace period
          </p>
        </div>
      </div>

      {/* Supervisors */}
      <div className="rounded-2xl bg-indigo-50 p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="flex items-center gap-2 text-slate-900">
            <ContactRound className="h-5 w-5 text-[#965000]" /> Assigned Site
            Supervisors ({site.supervisors.length})
          </p>
          <button
            onClick={onAssign}
            className="flex shrink-0 items-center gap-1 text-sm text-[#965000] hover:underline"
          >
            <Plus className="h-4 w-4" /> Assign
          </button>
        </div>
        <ul className="space-y-2">
          {site.supervisors.map((sv) => (
            <li
              key={sv.id}
              className="flex items-center gap-3 rounded-xl bg-white p-3"
            >
              <Avatar
                name={sv.name}
                size="h-10 w-10 text-sm"
                rounded="rounded-full"
                tone={
                  sv.onDuty ? "bg-[#965000] text-white" : initialTone(sv.name)
                }
              />
              <div className="min-w-0 flex-1">
                <p className="text-slate-900">{sv.name}</p>
                <p
                  className={`text-sm ${sv.onDuty ? "text-[#965000]" : "text-slate-600"}`}
                >
                  {sv.role}
                </p>
              </div>
              {sv.onDuty ? (
                <StatusPill tone="success" className="text-xs">
                  On Duty
                </StatusPill>
              ) : (
                <span className="text-sm text-slate-600">Assigned</span>
              )}
            </li>
          ))}
          {site.supervisors.length === 0 && (
            <li className="rounded-xl bg-white p-3 text-sm text-slate-600">
              No supervisors assigned yet.
            </li>
          )}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={onTestKiosk}
          className="flex items-center justify-center gap-2 text-[#965000] hover:underline"
        >
          <Smartphone className="h-5 w-5" /> Test on Mobile Kiosk
        </button>
        <button
          onClick={() => onSave(radius)}
          disabled={!changed}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#965000] px-5 py-3 font-medium text-white hover:bg-[#794000] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save className="h-5 w-5" />
          {changed ? "Save & Broadcast Perimeter" : "Perimeter Saved"}
        </button>
      </div>
    </Card>
  );
}
