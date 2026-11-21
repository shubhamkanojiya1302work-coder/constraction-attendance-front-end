import { CalendarDays, ChevronDown, Sheet } from "lucide-react";
import Card from "../ui/Card";
import PageHeading from "../ui/PageHeading";

// All Records heading card with the date picker and Export to Excel buttons.
export default function RecordsHeader({ dateLabel, onPickDate, onExport }) {
  return (
    <Card className="p-5 sm:p-6">
      <PageHeading
        eyebrow={
          <>
            Site Operations <span className="mx-1">•</span> Roster Verification
          </>
        }
        title="Daily Attendance Records"
        className="lg:items-center"
        actions={
          <>
            <button
              onClick={onPickDate}
              className="flex items-center gap-2 rounded-lg bg-indigo-50 px-4 py-2.5 text-slate-900 hover:bg-indigo-100"
            >
              <CalendarDays className="h-5 w-5 text-[#965000]" /> {dateLabel}
              <ChevronDown className="h-4 w-4" />
            </button>
            <button
              onClick={onExport}
              className="flex items-center gap-2 rounded-lg bg-indigo-100 px-4 py-2.5 text-slate-900 hover:bg-indigo-200"
            >
              <Sheet className="h-5 w-5 text-[#965000]" /> Export to Excel
            </button>
          </>
        }
      />
    </Card>
  );
}
