import { User } from "lucide-react";

// Sticky top bar with the app name. From `lg` up it also shows the nav tabs
// inline (on smaller screens they live in BottomNav instead).
// items: [{ id, label, icon }] (optional)
export default function AppBar({ title, items = [], active, onSelect }) {
  return (
    <header className="sticky top-0 z-20 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-8">
        <span className="text-lg font-semibold">{title}</span>

        <div className="flex items-center gap-6">
          {items.length > 0 && (
            <nav className="hidden gap-2 lg:flex">
              {items.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => onSelect(id)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                    active === id
                      ? "bg-indigo-50 font-medium text-[#965000]"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {label}
                </button>
              ))}
            </nav>
          )}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#965000] text-white">
            <User className="h-4 w-4" />
          </span>
        </div>
      </div>
    </header>
  );
}
