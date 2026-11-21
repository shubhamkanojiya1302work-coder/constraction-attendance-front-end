import { CircleCheck, Clock, Zap } from "lucide-react";
import ProgressRing from "./ProgressRing";

const fmt = (mins) =>
  `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, "0")}m`;

// Today's shift: status badge, progress ring and logged vs scheduled time.
export default function ShiftStatus({ day, scheduledMins }) {
  const percent = Math.round((day.loggedMins / scheduledMins) * 100);

  return (
    <section className="rounded-2xl bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-slate-600">
            Shift Status
          </p>
          <h2 className="text-xl font-semibold">Shift Completed</h2>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-400 px-2.5 py-1 text-xs text-emerald-900">
          <CircleCheck className="h-3.5 w-3.5" /> {day.status}
        </span>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <ProgressRing percent={percent} />
        <div className="space-y-1">
          <p className="text-xs text-slate-700">Logged Working Time</p>
          <p className="text-3xl font-semibold text-[#965000]">{day.logged}</p>
          <p className="flex items-center gap-1 text-xs text-slate-700">
            <Clock className="h-3.5 w-3.5" /> {fmt(scheduledMins)} Scheduled
            Shift
          </p>
          <p className="inline-flex items-center gap-1 rounded bg-indigo-50 px-2 py-0.5 text-[11px] text-slate-700">
            <Zap className="h-3 w-3 text-amber-700" /> {day.overtimeNote}
          </p>
        </div>
      </div>
    </section>
  );
}
