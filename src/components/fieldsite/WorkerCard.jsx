import { Building2 } from "lucide-react";

// Worker photo/initials, name, trade, badge, a status pill and the current site.
// Defaults give the Attendance-tab version; the Check-In tab passes a greeting
// title, a different status and the gate it was located at.
export default function WorkerCard({
  worker,
  title = worker.name,
  status = "Active Today",
  site = worker.mobileSite,
  siteIcon: SiteIcon = Building2,
}) {
  const initials = worker.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <section className="rounded-2xl bg-indigo-50 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-100 font-semibold text-[#965000]">
          {worker.photo ? (
            <img
              src={worker.photo}
              alt=""
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold leading-tight">{title}</p>
          <p className="text-xs text-slate-600">
            {worker.trade} • {worker.badgeId}
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-1 self-start rounded-full bg-emerald-400 px-2 py-0.5 text-[11px] text-emerald-900">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-800" /> {status}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-white px-3 py-2.5 text-sm">
        <SiteIcon className="h-4 w-4 shrink-0 text-[#965000]" /> {site}
      </div>
    </section>
  );
}
