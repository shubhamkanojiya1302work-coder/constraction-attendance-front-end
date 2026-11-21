// Tab bar fixed to the bottom of the screen on phones and tablets.
// Hidden from `lg` up, where the page shows a Sidebar or AppBar tabs instead.
// items: [{ id, label, icon }]
export default function BottomNav({ items, active, onSelect }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-around border-t border-slate-100 bg-white py-3 lg:hidden">
      {items.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`flex flex-col items-center gap-1 text-xs ${
            active === id ? "text-[#965000]" : "text-slate-700"
          }`}
        >
          <Icon className="h-5 w-5" /> {label}
        </button>
      ))}
    </nav>
  );
}
