import { Users } from "lucide-react";
import Card from "../ui/Card";
import Avatar, { initialTone } from "../ui/Avatar";
import StatusPill from "../ui/StatusPill";
import { recordStatus } from "./recordStyles";

// Daily attendance table. Clicking a row selects it (shown in RecordDetail).
// The footer (count + pagination) is passed in as children.
export default function RosterTable({
  records,
  totalCount,
  shift,
  selectedId,
  onSelect,
  children,
}) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-5 sm:px-6">
        <h2 className="flex items-center gap-2 text-lg text-slate-900">
          <Users className="h-5 w-5 text-[#965000]" /> Active Site Roster (
          {totalCount} Crew Members)
        </h2>
        <span className="text-sm text-slate-700">Shift {shift}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead className="bg-indigo-50/70 text-sm uppercase text-slate-800">
            <tr>
              <th className="px-5 py-4 font-medium sm:px-6">
                Worker Name &amp; Trade
              </th>
              <th className="px-3 py-4 font-medium">Check In</th>
              <th className="px-3 py-4 font-medium">Check Out</th>
              <th className="px-3 py-4 font-medium">Total</th>
              <th className="px-5 py-4 font-medium sm:px-6">
                <span className="sr-only">Status</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-600">
                  No records match this filter.
                </td>
              </tr>
            )}
            {records.map((r) => {
              const status = recordStatus[r.status];
              const selected = r.id === selectedId;
              return (
                <tr
                  key={r.id}
                  onClick={() => onSelect(r.id)}
                  aria-selected={selected}
                  className={`cursor-pointer transition ${
                    selected ? "bg-indigo-50" : "hover:bg-slate-50"
                  }`}
                >
                  <td className="px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <Avatar
                        name={r.name}
                        photo={r.photo}
                        size="h-11 w-11 text-lg"
                        rounded="rounded-full"
                        tone={initialTone(r.name)}
                        letters={1}
                      />
                      <div className="min-w-0">
                        <p className="text-slate-900">{r.name}</p>
                        <p className="text-slate-600">{r.trade}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-slate-900">{r.checkIn}</td>
                  <td className="px-3 py-4 text-slate-900">
                    {r.checkOut ?? (
                      <span className="italic text-slate-700">Pending</span>
                    )}
                  </td>
                  <td className="px-3 py-4 text-slate-900">{r.total ?? "—"}</td>
                  <td className="px-5 py-4 text-right sm:px-6">
                    <StatusPill
                      tone={status.tone}
                      className="whitespace-nowrap"
                    >
                      {status.label}
                    </StatusPill>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        {children}
      </div>
    </Card>
  );
}
