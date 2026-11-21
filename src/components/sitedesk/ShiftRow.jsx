import { BadgeCheck, Check, MapPin, Radio } from "lucide-react";

// One worked day in the weekly ledger table. Click to inspect it.
export default function ShiftRow({ d, selected, onSelect }) {
  const accent = selected || d.overtime;

  return (
    <tr
      onClick={onSelect}
      className={`cursor-pointer border-b border-indigo-50 transition ${
        selected ? "bg-indigo-50" : "bg-white hover:bg-slate-50"
      }`}
    >
      <td
        className={`px-4 py-5 align-top ${selected ? "border-l-2 border-[#965000]" : ""}`}
      >
        <p className={selected ? "text-[#965000]" : "text-slate-900"}>
          {d.label}
        </p>
        <p
          className={`text-xs ${d.taskIsOvertime ? "text-[#965000]" : "text-slate-600"}`}
        >
          {d.task}
        </p>
      </td>
      <td className="px-4 py-5">
        <p className="text-slate-900">{d.in}</p>
        <p className="flex items-center gap-1 text-xs text-slate-600">
          <MapPin className="h-3 w-3 text-emerald-700" />
          {d.inGate}
        </p>
      </td>
      <td className="px-4 py-5 text-slate-600">
        <p>{d.lunch}</p>
        <p className="text-xs">({d.lunchMins}m)</p>
      </td>
      <td className="px-4 py-5">
        <p className="text-slate-900">{d.out}</p>
        <p className="text-xs text-slate-600">{d.outGate}</p>
      </td>
      <td
        className={`px-4 py-5 ${accent ? "font-medium text-[#965000]" : "text-slate-900"}`}
      >
        {d.duration}
      </td>
      <td className="px-4 py-5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs ${
            selected
              ? "bg-orange-100 text-slate-800"
              : "bg-indigo-50 text-slate-700"
          }`}
        >
          {selected ? (
            <BadgeCheck className="h-3.5 w-3.5" />
          ) : (
            <Radio className="h-3.5 w-3.5 text-indigo-600" />
          )}
          GPS • Site Code
        </span>
      </td>
      <td className="px-4 py-5">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-emerald-900">
          <Check className="h-3.5 w-3.5" />
        </span>
      </td>
    </tr>
  );
}
