import { ShieldAlert } from "lucide-react";
import Card from "../ui/Card";

// Banner shown once the week has been signed off and punches are locked.
export default function SignOffNotice() {
  return (
    <Card className="flex flex-wrap items-center gap-4 bg-[#eef0fb] p-5">
      <ShieldAlert className="h-5 w-5 text-[#965000]" />
      <div className="flex-1">
        <p className="text-sm text-slate-900">
          Weekly Sign-Off Completed by Field Superintendent
        </p>
        <p className="text-sm text-slate-600">
          Punches are locked for current payroll processing. Contact Foreman for
          retroactive adjustments.
        </p>
      </div>
      <button className="rounded-lg bg-white px-4 py-2 text-xs text-slate-800">
        Read Policy
      </button>
    </Card>
  );
}
