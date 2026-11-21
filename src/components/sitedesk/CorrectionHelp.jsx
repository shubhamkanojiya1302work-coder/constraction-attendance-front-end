import { CircleHelp } from "lucide-react";
import Card from "../ui/Card";

// Small help tip under the Punch Inspector.
export default function CorrectionHelp() {
  return (
    <Card className="flex gap-3 p-5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
        <CircleHelp className="h-4 w-4 text-indigo-700" />
      </span>
      <div>
        <p className="text-sm text-slate-900">
          Missed a gate tap or badge read?
        </p>
        <p className="text-xs text-slate-600">
          Corrections must be filed within 72 hours of shift completion.
        </p>
      </div>
    </Card>
  );
}
