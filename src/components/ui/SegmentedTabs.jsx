// Segmented control: tabs inside one tinted bar; the active tab is a white chip.
// Scrolls sideways if it doesn't fit.
// options: [{ id, label, count?, dotClass? }]  (dotClass adds a coloured dot, e.g. "bg-emerald-600")
export default function SegmentedTabs({ options, active, onSelect }) {
  return (
    <div
      role="tablist"
      className="flex w-full gap-1 overflow-x-auto rounded-xl bg-indigo-50 p-1 sm:w-fit"
    >
      {options.map(({ id, label, count, dotClass }) => (
        <button
          key={id}
          role="tab"
          aria-selected={active === id}
          onClick={() => onSelect(id)}
          className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm transition ${
            active === id
              ? "bg-white font-medium text-slate-900 shadow-sm"
              : "text-slate-800 hover:bg-white/60"
          }`}
        >
          {dotClass && <span className={`h-2 w-2 rounded-full ${dotClass}`} />}
          {label}
          {count != null && ` (${count})`}
        </button>
      ))}
    </div>
  );
}
