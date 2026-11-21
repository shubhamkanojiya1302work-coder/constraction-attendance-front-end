// Tab bar fixed to the bottom of the screen on phones and tablets.
// Hidden from `lg` up, where the page shows a Sidebar or AppBar tabs instead.
// Bottom padding grows on phones with a home indicator (safe-area inset).
// items: [{ id, label, icon }]
export default function BottomNav({ items, active, onSelect }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-around border-t border-slate-100 bg-white pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 lg:hidden">
      {items.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          aria-current={active === id ? "page" : undefined}
          className={`flex min-w-20 flex-col items-center gap-1.5 text-sm ${
            active === id ? "text-[#965000]" : "text-slate-700"
          }`}
        >
          <Icon className="h-6 w-6" /> {label}
        </button>
      ))}
    </nav>
  );
}
