// Page title block: small uppercase eyebrow, the h1, an optional subtitle,
// and optional actions (buttons, a date chip…) on the right from `lg` up.
export default function PageHeading({
  eyebrow,
  title,
  subtitle,
  actions,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between ${className}`}
    >
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-xs uppercase tracking-wider text-slate-600">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-slate-600">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}
