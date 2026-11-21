import {
  BadgeCheck,
  Check,
  CircleCheck,
  Clock,
  Timer,
  TrendingUp,
  Zap,
} from "lucide-react";
import StatCard from "./StatCard";

// Row of five KPI tiles for the selected week.
export default function StatsRow({ stats: s }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <StatCard
        label="Total Recorded"
        icon={Timer}
        iconClass="bg-indigo-50 text-[#965000]"
      >
        <p className="text-4xl font-semibold text-slate-900">
          {s.totalHours.toFixed(1)}{" "}
          <span className="text-sm font-normal">Hours</span>
        </p>
        <p className="mt-3 flex items-start gap-1 text-xs text-emerald-700">
          <TrendingUp className="h-3.5 w-3.5" /> On track for{" "}
          {s.goalHours.toFixed(1)}h goal
        </p>
      </StatCard>

      <StatCard
        label="Regular Time"
        icon={Clock}
        iconClass="bg-indigo-50 text-indigo-700"
      >
        <p className="text-4xl font-semibold text-slate-900">
          {s.regularHours.toFixed(1)}{" "}
          <span className="text-sm font-normal">Hours</span>
        </p>
        <p className="mt-3 text-xs text-slate-600">
          Base Rate • ${s.baseRate.toFixed(2)}/hr
        </p>
      </StatCard>

      <StatCard
        label="Overtime (1.5x)"
        icon={Zap}
        iconClass="bg-orange-100 text-orange-600"
      >
        <p className="text-4xl font-semibold text-[#965000]">
          {s.overtimeHours.toFixed(1)}{" "}
          <span className="text-sm font-normal">Hours</span>
        </p>
        <p className="mt-3 flex items-start gap-1 text-xs text-[#965000]">
          <CircleCheck className="h-3.5 w-3.5" /> Pre-approved by{" "}
          {s.overtimeApprover}
        </p>
      </StatCard>

      <StatCard
        label="Punctuality Score"
        icon={BadgeCheck}
        iconClass="bg-emerald-400 text-emerald-900"
      >
        <p className="text-4xl font-semibold text-emerald-700">
          {s.punctuality}%{" "}
          <span className="text-sm font-normal text-slate-700">Punctual</span>
        </p>
        <p className="mt-3 text-xs text-emerald-700">
          {s.shiftsInWindow} / {s.shiftsTotal} Shifts in Window
        </p>
      </StatCard>

      <StatCard
        label="Timesheet State"
        icon={Check}
        iconClass="bg-emerald-400 text-emerald-900"
      >
        <p className="text-xl font-semibold text-emerald-700">
          {s.timesheetState}
        </p>
        <p className="text-sm text-slate-500">By {s.approvedBy}</p>
        <p className="mt-3 text-xs text-slate-600">{s.approvedAt}</p>
      </StatCard>
    </div>
  );
}
