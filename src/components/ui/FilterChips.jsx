// Row of pill-shaped filter buttons; the active one is filled with the brand colour.
// Scrolls sideways on small screens (bleeds to the screen edge on phones).
// options: [{ id, label, count? }]
export default function FilterChips({ options, active, onSelect }) {
  return (
    <div className="-mx-4 flex min-w-0 flex-1 gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      {options.map(({ id, label, count }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          aria-pressed={active === id}
          className={`shrink-0 rounded-full px-5 py-2.5 transition ${
            active === id
              ? "bg-[#965000] font-medium text-white"
              : "bg-indigo-50 text-slate-800 hover:bg-indigo-100"
          }`}
        >
          {label}
          {count != null && ` (${count})`}
        </button>
      ))}
    </div>
  );
}
