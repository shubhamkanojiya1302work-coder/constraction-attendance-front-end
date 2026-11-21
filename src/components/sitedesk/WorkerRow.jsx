import { BadgeCheck, Camera, MapPin } from "lucide-react";
import Avatar from "../ui/Avatar";
import StatusPill from "../ui/StatusPill";

const tradeClass = {
  mason: "text-[#965000]",
  carpenter: "text-[#965000]",
  electrician: "text-blue-700",
  helper: "text-slate-600",
};

const statusInfo = {
  "on-time": { label: "On-time Check-in", className: "text-emerald-700" },
  late: { label: "Late Check-in (Review)", className: "text-[#965000]" },
  unverified: {
    label: "Unverified Zone (Review)",
    className: "text-[#965000]",
  },
};

// One worker on the live roster.
// Phones: stacked. `sm`: 2×2 grid. `xl`: a single row like the design.
export default function WorkerRow({ worker: w, onViewDetails }) {
  const status = statusInfo[w.status] ?? statusInfo["on-time"];
  const unverified = w.status === "unverified";

  return (
    <article className="grid grid-cols-1 gap-4 rounded-2xl bg-white p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)_minmax(0,1.2fr)_auto] xl:items-center">
      {/* Who */}
      <div className="flex min-w-0 items-center gap-4">
        <Avatar
          name={w.name}
          photo={w.photo}
          size="h-16 w-16"
          rounded="rounded-full"
        />
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-xl font-medium text-slate-900">
            <span className="truncate">{w.name}</span>
            <BadgeCheck
              aria-label={unverified ? "Zone not verified" : "Verified"}
              className={`h-5 w-5 shrink-0 ${
                unverified ? "text-slate-400" : "text-emerald-700"
              }`}
            />
          </p>
          <p className="text-sm">
            <span className={tradeClass[w.group] ?? "text-slate-600"}>
              {w.trade}
            </span>
            <span className="mx-2 text-slate-400">•</span>
            <a
              href={`tel:${w.phone.replace(/\s/g, "")}`}
              className="text-slate-700"
            >
              {w.phone}
            </a>
          </p>
        </div>
      </div>

      {/* Where */}
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-slate-700">
          <MapPin className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="text-sm text-slate-900">{w.site}</p>
          <p className="text-slate-600">{w.zone}</p>
        </div>
      </div>

      {/* When */}
      <div className="flex min-w-0 items-center gap-3">
        {w.checkInPhoto ? (
          <img
            src={w.checkInPhoto}
            alt={`${w.name} check-in selfie`}
            className="h-12 w-12 shrink-0 rounded-md object-cover"
          />
        ) : (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-slate-500">
            <Camera className="h-4 w-4" />
          </span>
        )}
        <div className="min-w-0">
          <p className="text-sm text-slate-900">In at {w.inAt}</p>
          <p className={status.className}>{status.label}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <StatusPill tone={w.onSite ? "success" : "neutral"}>
          {w.onSite ? "On Site" : "Checked Out"}
        </StatusPill>
        <button
          onClick={() => onViewDetails(w)}
          className="rounded-lg bg-indigo-50 px-5 py-2.5 text-slate-900 hover:bg-indigo-100"
        >
          View Details
        </button>
      </div>
    </article>
  );
}
