import {
  Coffee,
  LogIn,
  LogOut,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Utensils,
} from "lucide-react";

const punchIcon = {
  in: { icon: LogIn, cls: "bg-emerald-400 text-emerald-900" },
  lunchOut: { icon: Utensils, cls: "bg-indigo-100 text-slate-700" },
  lunchIn: { icon: Coffee, cls: "bg-indigo-100 text-slate-700" },
  out: { icon: LogOut, cls: "bg-emerald-400 text-emerald-900" },
};

// Vertical timeline of the day's check-in / lunch / check-out punches.
export default function PunchTimeline({ punches }) {
  return (
    <section className="rounded-2xl bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-medium">
          <TrendingUp className="h-4 w-4 text-[#965000]" /> Daily Punches
        </h3>
        <span className="text-[11px] text-slate-600">
          {punches.length} Events Recorded
        </span>
      </div>

      <ol className="relative space-y-3 before:absolute before:bottom-6 before:left-[9px] before:top-6 before:w-px before:bg-slate-200">
        {punches.map((p) => {
          const { icon: Icon, cls } = punchIcon[p.kind];
          const Badge = p.kind === "out" ? MapPin : ShieldCheck;
          return (
            <li key={p.kind} className="relative flex gap-3">
              <span
                className={`z-10 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${cls}`}
              >
                <Icon className="h-3 w-3" />
              </span>
              <div className="flex-1 rounded-xl bg-indigo-50 p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm">{p.title}</p>
                  <p
                    className={`text-sm font-medium ${p.accent ? "text-[#965000]" : "text-slate-900"}`}
                  >
                    {p.time}
                  </p>
                </div>
                <p className="mt-0.5 text-xs text-slate-600">{p.detail}</p>
                {p.badge && (
                  <p className="mt-1.5 flex items-center gap-1 text-[11px] text-emerald-700">
                    <Badge className="h-3 w-3" /> {p.badge}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
