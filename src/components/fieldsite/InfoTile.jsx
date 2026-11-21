// Small white tile: icon + uppercase label, a bold value and a muted line under it.
export default function InfoTile({
  icon: Icon,
  label,
  value,
  valueClass = "",
  sub,
}) {
  return (
    <section className="rounded-2xl bg-white p-4">
      <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-700">
        <Icon className="h-4 w-4 shrink-0 text-[#965000]" /> {label}
      </p>
      <p className={`mt-2 font-semibold ${valueClass}`}>{value}</p>
      <p className="text-sm text-slate-600">{sub}</p>
    </section>
  );
}
