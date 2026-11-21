import { List } from "lucide-react";
import Card from "../ui/Card";
import ShiftRow from "./ShiftRow";

const columns = [
  "Date & Day",
  "In (Morning)",
  "Lunch Break",
  "Out (Evening)",
  "Duration",
  "Verification",
  "",
];

// Weekly attendance table. Rest days render as a single italic line.
export default function LedgerTable({ shifts, stats, selectedId, onSelect }) {
  const worked = shifts.filter((d) => d.type !== "rest");

  return (
    <Card className="overflow-hidden bg-[#f5f6fd]">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-5">
        <h2 className="flex items-center gap-3 text-lg text-slate-900">
          <List className="h-5 w-5 text-[#965000]" /> Weekly Attendance Ledger
        </h2>
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <span className="rounded-md bg-indigo-50 px-2 py-1">
            {shifts.length} Days Logged
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            All {worked.length} Operational Shifts Reconciled
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-indigo-50 text-[11px] uppercase tracking-wider text-slate-700">
            <tr>
              {columns.map((h) => (
                <th key={h} className="px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shifts.map((d) =>
              d.type === "rest" ? (
                <tr key={d.id} className="bg-[#f5f6fd]">
                  <td className="px-4 py-3 text-slate-700">{d.label}</td>
                  <td colSpan={4} className="px-4 py-3 italic text-slate-600">
                    {d.note}
                  </td>
                  <td colSpan={2} className="px-4 py-3 text-slate-400">
                    —
                  </td>
                </tr>
              ) : (
                <ShiftRow
                  key={d.id}
                  d={d}
                  selected={d.id === selectedId}
                  onSelect={() => onSelect(d.id)}
                />
              ),
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-indigo-100 px-5 py-3 text-xs text-slate-700">
        <div className="flex gap-6">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-emerald-400" /> Paid Standard
            Time ({stats.regularHours.toFixed(1)}h)
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-orange-100" /> Overtime 1.5×
            ({stats.overtimeHours}h)
          </span>
        </div>
        <span>
          Net Week Total:{" "}
          <b className="ml-2 text-xl font-semibold text-slate-900">38h 30m</b>
        </span>
      </div>
    </Card>
  );
}
