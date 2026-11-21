import { Search } from "lucide-react";

// Search box with a magnifier icon. onChange receives the text.
// variant: "white" (default, on a tinted page) or "tinted" (inside a white card).
const variants = { white: "bg-white", tinted: "bg-indigo-50" };

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  variant = "white",
  className = "",
}) {
  return (
    <label
      className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
        variants[variant] ?? variants.white
      } ${className}`}
    >
      <Search className="h-5 w-5 shrink-0 text-slate-500" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-500"
      />
    </label>
  );
}
