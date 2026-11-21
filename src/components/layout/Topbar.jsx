import { Building2, ChevronDown, User } from "lucide-react";

// Top toolbar: site picker on the left, signed-in user on the right.
// The user's name/role text is hidden on very small screens.
export default function Topbar({ siteName, user }) {
  return (
    <header className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
      <button className="flex min-w-0 items-center gap-2 rounded-lg bg-indigo-50 px-4 py-2 text-sm text-slate-800">
        <Building2 className="h-4 w-4 shrink-0 text-[#965000]" />
        <span className="truncate">{siteName}</span>
        <ChevronDown className="h-4 w-4 shrink-0" />
      </button>

      <div className="flex shrink-0 items-center gap-3">
        <div className="hidden text-right leading-tight sm:block">
          <p className="text-sm text-slate-900">{user.name}</p>
          <p className="text-xs text-slate-500">{user.role}</p>
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#965000] text-white">
          <User className="h-4 w-4" />
        </span>
      </div>
    </header>
  );
}
