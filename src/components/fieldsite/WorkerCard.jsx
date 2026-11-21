import { Building2 } from "lucide-react";

// Worker name, trade, badge and current site.
export default function WorkerCard({ worker }) {
  const initials = worker.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <section className="rounded-2xl bg-indigo-50 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 font-semibold text-[#965000]">
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
        <div className="flex-1">
          <p className="text-lg font-semibold leading-tight">{worker.name}</p>
          <p className="text-xs text-slate-600">
            {worker.trade} • {worker.badgeId}
          </p>
        </div>
        <span className="flex items-center gap-1 self-start rounded-full bg-emerald-400 px-2 py-0.5 text-[11px] text-emerald-900">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-800" /> Active
          Today
        </span>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-white px-3 py-2.5 text-sm">
        <Building2 className="h-4 w-4 text-[#965000]" /> {worker.mobileSite}
      </div>
    </section>
  );
}
