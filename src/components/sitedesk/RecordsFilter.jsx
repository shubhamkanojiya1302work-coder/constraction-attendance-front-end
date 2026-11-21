import { ChevronDown, MapPin } from "lucide-react";
import Card from "../ui/Card";
import SegmentedTabs from "../ui/SegmentedTabs";

// All Records filter card: site picker + status tabs.
// options: [{ id, label, count }]
export default function RecordsFilter({
  site,
  onPickSite,
  options,
  active,
  onSelect,
}) {
  return (
    <Card className="space-y-4 p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="text-sm uppercase text-slate-700">Filter:</span>
        <button
          onClick={onPickSite}
          className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-sm text-slate-900 hover:bg-indigo-100"
        >
          <MapPin className="h-4 w-4 text-[#965000]" /> {site}
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      <SegmentedTabs options={options} active={active} onSelect={onSelect} />
    </Card>
  );
}
