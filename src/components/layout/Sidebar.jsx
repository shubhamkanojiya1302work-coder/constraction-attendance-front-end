import { BadgeCheck, Building2 } from "lucide-react";

// Left navigation, shown from the `lg` breakpoint up.
// On smaller screens pair it with BottomNav using the same items.
// items: [{ id, label, icon }]
export default function Sidebar({ title, items, active, onSelect }) {
  return (
    <aside className="hidden w-56 shrink-0 flex-col bg-white px-4 py-6 lg:flex">
      <div className="mb-10 flex items-center gap-2 px-2">
        <Building2 className="h-6 w-6 text-[#965000]" />
        <span className="text-lg font-semibold text-slate-900">{title}</span>
      </div>

      <nav className="space-y-1">
        {items.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
              active === id
                ? "bg-indigo-50 font-medium text-slate-900"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-auto flex items-center justify-between rounded-lg bg-indigo-50/60 px-3 py-2 text-xs text-slate-700">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-600" />
          Field Systems Online
        </span>
        <BadgeCheck className="h-4 w-4 text-slate-500" />
      </div>
    </aside>
  );
}
