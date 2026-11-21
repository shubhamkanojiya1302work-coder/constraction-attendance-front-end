import { CircleCheck, IdCard } from "lucide-react";
import Card from "../ui/Card";

// "94.7% Verified On-Site Roster • Ready for Payroll" card.
export default function PayrollStatCard({ percent, ready }) {
  return (
    <Card className="flex items-center gap-4 p-5 sm:p-6">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-300 text-emerald-900">
        <IdCard className="h-6 w-6" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-2xl font-semibold text-slate-900">{percent}%</p>
        <p className="text-sm text-slate-700">Verified On-Site Roster</p>
      </div>
      <p
        className={`flex shrink-0 items-center gap-1.5 text-sm ${
          ready ? "text-emerald-700" : "text-[#965000]"
        }`}
      >
        <CircleCheck className="h-4 w-4" />
        {ready ? "Ready for Payroll" : "Not Ready"}
      </p>
    </Card>
  );
}
