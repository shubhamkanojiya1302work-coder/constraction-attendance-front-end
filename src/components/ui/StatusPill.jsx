// Rounded status label, optionally with a leading dot in the same colour.
// tone: "success" | "warning" | "danger" | "neutral"
//
// <StatusPill tone="success">On Site</StatusPill>
// <StatusPill tone="danger" dot={false}>Requires Sign-off</StatusPill>
const tones = {
  success: "bg-emerald-300 text-emerald-950",
  warning: "bg-orange-100 text-orange-800",
  danger: "bg-red-50 text-red-700",
  neutral: "bg-slate-100 text-slate-600",
};

export default function StatusPill({
  tone = "success",
  dot = true,
  className = "",
  children,
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-sm ${
        tones[tone] ?? tones.neutral
      } ${className}`}
    >
      {dot && <span className="h-2 w-2 shrink-0 rounded-full bg-current" />}
      {children}
    </span>
  );
}
