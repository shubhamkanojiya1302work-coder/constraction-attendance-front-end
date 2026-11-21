import { MapPin, ShieldCheck } from "lucide-react";
import StatusPill from "../ui/StatusPill";
import { siteKindIcon } from "./siteFormat";

// One site in the Sites directory. The selected site (shown in PerimeterPanel)
// is white with a brand edge; completed sites show an archive note instead of stats.
export default function SiteCard({
  site: s,
  selected,
  onEdit,
  onManageRadius,
  onViewLog,
}) {
  const Icon = siteKindIcon[s.kind] ?? siteKindIcon.tower;
  const completed = s.status === "completed";

  return (
    <article
      className={`rounded-2xl p-5 transition sm:p-6 ${
        selected
          ? "border-l-4 border-[#965000] bg-white shadow-md"
          : "bg-indigo-50/60"
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
            selected
              ? "bg-orange-100 text-[#965000]"
              : completed
                ? "bg-indigo-100 text-slate-500"
                : "bg-indigo-100 text-slate-800"
          }`}
        >
          <Icon className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3
              className={`text-xl font-medium ${completed ? "text-slate-600" : "text-slate-900"}`}
            >
              {s.name}
            </h3>
            <StatusPill
              tone={completed ? "neutral" : "success"}
              className="text-xs"
            >
              {completed ? "Completed" : "Active"}
            </StatusPill>
          </div>
          <p className="mt-1 flex items-start gap-1.5 text-slate-600">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {s.address}
          </p>
        </div>
        <span className="hidden shrink-0 rounded-lg bg-indigo-50 px-3 py-1.5 font-mono text-sm text-slate-700 sm:block">
          {s.code}
        </span>
      </div>

      {completed ? (
        <div className="mt-5 flex flex-col gap-2 rounded-xl bg-indigo-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-600">{s.syncNote}</p>
          <button
            onClick={() => onViewLog(s)}
            className="shrink-0 text-sm text-[#965000] hover:underline"
          >
            View Log History
          </button>
        </div>
      ) : (
        <>
          {/* Stats */}
          <dl className="mt-5 grid grid-cols-2 gap-y-4 rounded-xl bg-indigo-50 p-4 text-center sm:grid-cols-4">
            <Stat value={s.registered} label="Registered" />
            <Stat value={s.supervisors.length} label="Supervisors" />
            <Stat
              value={`${s.shiftStart} - ${s.shiftEnd}`}
              label="Shift Window"
              small
            />
            <Stat value={`${s.radius}m Radius`} label={s.anchor} small brand />
          </dl>

          {/* Footer */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-slate-700">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-700" />
              {s.syncNote}
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                onClick={() => onEdit(s)}
                className="flex-1 rounded-lg bg-indigo-100 px-4 py-2.5 text-slate-900 hover:bg-indigo-200 sm:flex-none"
              >
                Edit Site
              </button>
              <button
                onClick={() => onManageRadius(s)}
                aria-pressed={selected}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 sm:flex-none ${
                  selected
                    ? "bg-orange-100 text-[#965000]"
                    : "bg-indigo-100 text-slate-900 hover:bg-indigo-200"
                }`}
              >
                <MapPin className="h-4 w-4" /> Manage Radius
              </button>
            </div>
          </div>
        </>
      )}
    </article>
  );
}

function Stat({ value, label, small, brand }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd
        className={`${small ? "text-base" : "text-2xl"} font-semibold ${
          brand ? "text-[#965000]" : "text-slate-900"
        }`}
      >
        {value}
      </dd>
      <dd className="text-sm text-slate-700">{label}</dd>
    </div>
  );
}
