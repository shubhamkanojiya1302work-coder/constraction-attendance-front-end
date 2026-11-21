import { useMemo, useRef, useState } from "react";
import { Building2, Info, MapPinPlus } from "lucide-react";
import Card from "../ui/Card";
import PageHeading from "../ui/PageHeading";
import SegmentedTabs from "../ui/SegmentedTabs";
import SearchInput from "../ui/SearchInput";
import SiteCard from "./SiteCard";
import PerimeterPanel from "./PerimeterPanel";
import SiteFormModal from "./SiteFormModal";

// SiteDesk "Sites": the construction site directory with a geofence panel.
// data: { sites, supervisorPool } (see sitesDirectory)
//
// Edits (new site, site changes, radius) are kept in local state for the
// session; the callbacks are where the page should save them to the backend:
//   onSaveSite(site, "add" | "edit"), onSaveRadius(site, radius),
//   onTestKiosk(site), onViewLog(site)

const tabs = [
  { id: "all", label: "All Sites" },
  { id: "active", label: "Active Projects", dotClass: "bg-emerald-600" },
  { id: "completed", label: "Completed" },
];

export default function SitesView({
  data,
  onSaveSite,
  onSaveRadius,
  onTestKiosk,
  onViewLog,
}) {
  const [sites, setSites] = useState(data.sites);
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(
    () => data.sites.find((s) => s.status === "active")?.id,
  );
  // null, or { siteId?, section? } — siteId set means "edit that site".
  const [form, setForm] = useState(null);
  const panelRef = useRef(null);

  const tabOptions = tabs.map((t) => ({
    ...t,
    count:
      t.id === "all"
        ? sites.length
        : sites.filter((s) => s.status === t.id).length,
  }));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sites.filter(
      (s) =>
        (tab === "all" || s.status === tab) &&
        (!q ||
          [s.name, s.code, s.address].some((v) => v.toLowerCase().includes(q))),
    );
  }, [sites, tab, query]);

  const selected = sites.find((s) => s.id === selectedId);
  const editing = form?.siteId
    ? sites.find((s) => s.id === form.siteId)
    : undefined;

  // Below `xl` the panel sits under the list, so bring it into view.
  const manageRadius = (site) => {
    setSelectedId(site.id);
    if (window.matchMedia("(max-width: 1279px)").matches) {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const saveSite = (site) => {
    const mode = editing ? "edit" : "add";
    setSites((prev) =>
      editing
        ? prev.map((s) => (s.id === editing.id ? site : s))
        : [site, ...prev],
    );
    setSelectedId(site.id);
    setForm(null);
    onSaveSite?.(site, mode);
  };

  const saveRadius = (radius) => {
    const updated = { ...selected, radius };
    setSites((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    onSaveRadius?.(updated, radius);
  };

  return (
    <>
      <PageHeading
        eyebrow={
          <span className="flex items-center gap-2 text-[#965000]">
            <Building2 className="h-4 w-4" /> Field Operations Directory
          </span>
        }
        title="Construction Sites"
        subtitle="Manage project locations, GPS geofence boundaries for touchless check-ins, and assigned field supervisors."
        actions={
          <button
            onClick={() => setForm({})}
            className="flex items-center gap-2 rounded-xl bg-[#965000] px-5 py-3 text-lg font-medium text-white shadow-md hover:bg-[#794000]"
          >
            <MapPinPlus className="h-5 w-5" /> Add New Site
          </button>
        }
      />

      <Card className="flex flex-col gap-3 p-3 lg:flex-row lg:items-center">
        <SegmentedTabs options={tabOptions} active={tab} onSelect={setTab} />
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search sites by name, code or city..."
          variant="tinted"
          className="flex-1"
        />
      </Card>

      <div className="grid grid-cols-1 items-start gap-4 sm:gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-4 sm:space-y-6">
          {filtered.map((s) => (
            <SiteCard
              key={s.id}
              site={s}
              selected={s.id === selectedId}
              onEdit={(site) => setForm({ siteId: site.id })}
              onManageRadius={manageRadius}
              onViewLog={(site) => onViewLog?.(site)}
            />
          ))}
          {filtered.length === 0 && (
            <p className="rounded-2xl bg-white p-8 text-center text-slate-600">
              No sites match this filter.
            </p>
          )}
        </div>

        <div
          ref={panelRef}
          className="scroll-mt-4 space-y-4 sm:space-y-6 xl:sticky xl:top-4"
        >
          {selected ? (
            <PerimeterPanel
              key={`${selected.id}-${selected.radius}`}
              site={selected}
              onSave={saveRadius}
              onAssign={() =>
                setForm({ siteId: selected.id, section: "supervisors" })
              }
              onTestKiosk={() => onTestKiosk?.(selected)}
            />
          ) : (
            <Card className="p-6 text-slate-600">
              Choose “Manage Radius” on a site to configure its perimeter.
            </Card>
          )}
          <div className="flex gap-3 rounded-2xl bg-orange-50 p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#965000]" />
            <div>
              <p className="font-medium text-[#965000]">
                Touchless GPS Enforcement
              </p>
              <p className="text-slate-700">
                Workers checking in via mobile tablet kiosks must be located
                physically inside the dashed circular zone. Check-ins outside
                this limit trigger a manual manager approval request.
              </p>
            </div>
          </div>
        </div>
      </div>

      {form && (
        <SiteFormModal
          initial={editing}
          supervisorPool={data.supervisorPool}
          takenCodes={sites
            .filter((s) => s.id !== editing?.id)
            .map((s) => s.code.toUpperCase().replace(/^#/, ""))}
          startSection={form.section}
          onSubmit={saveSite}
          onClose={() => setForm(null)}
        />
      )}
    </>
  );
}
