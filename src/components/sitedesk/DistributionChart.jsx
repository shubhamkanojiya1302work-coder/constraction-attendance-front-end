import Card from "../ui/Card";

const STANDARD = 8;
const MAX_HOURS = 11; // top of the chart scale

// Stacked bars per worked day (standard hours + extra), drawn with plain CSS.
export default function DistributionChart({ shifts, selectedId, onSelect }) {
  const days = shifts.filter((d) => d.type !== "rest");
  const pct = (h) => `${(h / MAX_HOURS) * 100}%`;

  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-slate-900">
            Daily Time Distribution (vs. {STANDARD.toFixed(1)}h Standard)
          </h3>
          <p className="text-sm text-slate-600">
            Visual review of shifts recorded against baseline standard hours
          </p>
        </div>
        <span className="rounded-md bg-indigo-50 px-3 py-1 text-xs text-slate-700">
          Target: 40h/week
        </span>
      </div>

      <div className="relative mt-6 h-40">
        {/* 8h goal line */}
        <div
          className="absolute inset-x-0 border-t border-dashed border-slate-300"
          style={{ bottom: pct(STANDARD) }}
        >
          <span className="absolute -top-2 right-0 bg-white pl-1 text-[9px] text-slate-500">
            8h goal
          </span>
        </div>

        <div className="relative flex h-full items-end justify-around pr-10">
          {days.map((d) => {
            const base = Math.min(d.hours, STANDARD);
            const extra = Math.max(d.hours - STANDARD, 0);
            const selected = d.id === selectedId;
            return (
              <button
                key={d.id}
                onClick={() => onSelect(d.id)}
                className="group flex h-full w-12 flex-col items-center justify-end"
                title={`${d.label}: ${d.duration}`}
              >
                {selected && (
                  <span className="mb-1 h-1.5 w-1.5 rounded-full bg-[#965000]" />
                )}
                {extra > 0 && (
                  <div
                    className={`w-10 rounded-t-sm ${d.overtime ? "bg-amber-700" : "bg-orange-100"}`}
                    style={{ height: pct(extra) }}
                  />
                )}
                <div
                  className={`w-10 transition group-hover:opacity-80 ${
                    selected ? "bg-[#965000]" : "bg-emerald-700"
                  } ${extra ? "" : "rounded-t-sm"}`}
                  style={{ height: pct(base) }}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-2 flex justify-around pr-10 text-[11px] text-slate-700">
        {days.map((d) => (
          <span
            key={d.id}
            className={`w-12 text-center ${d.id === selectedId ? "text-[#965000]" : ""}`}
          >
            {d.label.slice(0, 3)} ({d.hours.toFixed(1)}h)
          </span>
        ))}
      </div>
    </Card>
  );
}
