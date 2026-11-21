import Card from "../ui/Card";

// One KPI tile: small uppercase label, icon badge, and whatever value content is passed in.
export default function StatCard({ label, icon: Icon, iconClass, children }) {
  return (
    <Card className="flex flex-col p-5">
      <div className="mb-3 flex items-start justify-between gap-2">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-700">
          {label}
        </p>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${iconClass}`}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>
      {children}
    </Card>
  );
}
