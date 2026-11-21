import Card from "../ui/Card";
import StatusPill from "../ui/StatusPill";

// Headline number card (Live Attendance).
// Optional: a badge (StatusPill tone + dot), a round icon, a progress bar
// (0–100) and extra content under it via children.
export default function SummaryCard({
  title,
  badge,
  badgeTone = "success",
  badgeDot = true,
  icon: Icon,
  value,
  valueClass = "text-slate-900",
  unit,
  unitClass = "text-slate-700",
  progress,
  progressClass = "bg-emerald-700",
  children,
}) {
  return (
    <Card className="flex flex-col p-6">
      <div className="flex min-h-9 items-center justify-between gap-2">
        <p className="text-slate-800">{title}</p>
        {badge && (
          <StatusPill tone={badgeTone} dot={badgeDot} className="text-xs">
            {badge}
          </StatusPill>
        )}
        {Icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[#965000]">
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>

      <p className="mt-4 flex items-baseline gap-3">
        <span className={`text-5xl font-semibold tracking-tight ${valueClass}`}>
          {value}
        </span>
        <span className={unitClass}>{unit}</span>
      </p>

      {progress != null && (
        <div className="mt-5 h-2 rounded-full bg-indigo-50">
          <div
            className={`h-full rounded-full ${progressClass}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      )}

      {children && <div className="mt-5 text-slate-700">{children}</div>}
    </Card>
  );
}
