// The worker's week at a glance: one row per day, today highlighted.
export default function WeeklyTimesheet({ timesheet }) {
  return (
    <section className="rounded-2xl bg-white p-4">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h3 className="text-lg font-medium">Weekly Timesheet</h3>
          <p className="text-xs text-slate-600">{timesheet.weekLabel}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-slate-600">Total Week</p>
          <p className="text-xl font-semibold text-[#965000]">
            {timesheet.total}
          </p>
        </div>
      </div>

      <ul className="space-y-2">
        {timesheet.rows.map((r) => (
          <li
            key={r.abbr}
            className={`flex items-center gap-3 rounded-xl p-3 ${
              r.today
                ? "bg-orange-50"
                : r.future
                  ? "bg-white ring-1 ring-indigo-50"
                  : "bg-indigo-50"
            }`}
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-sm ${
                r.today
                  ? "bg-[#965000] text-white"
                  : r.future
                    ? "bg-indigo-50 text-slate-400"
                    : "bg-white text-slate-800"
              }`}
            >
              {r.abbr}
            </span>
            <div className={`flex-1 ${r.future ? "text-slate-400" : ""}`}>
              <p className="text-sm">{r.day}</p>
              <p className="text-xs text-slate-600">{r.range}</p>
            </div>
            <div className="text-right">
              <p
                className={`text-sm ${
                  r.today
                    ? "font-medium text-[#965000]"
                    : r.future
                      ? "text-slate-400"
                      : ""
                }`}
              >
                {r.hours}
              </p>
              {r.note && (
                <p
                  className={`text-[11px] ${
                    r.noteTone === "muted"
                      ? "text-slate-600"
                      : "text-emerald-700"
                  }`}
                >
                  {r.note}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
