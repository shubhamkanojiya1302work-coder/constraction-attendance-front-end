import { CalendarClock, FileDown } from "lucide-react";

// Correction request + timecard download buttons at the bottom of the mobile view.
export default function MobileActions() {
  return (
    <>
      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#965000] py-3.5 font-medium text-white shadow-lg shadow-amber-900/20 active:scale-[0.99]">
        <CalendarClock className="h-4 w-4" /> Request Time Correction / Dispute
      </button>
      <button className="flex w-full items-center justify-center gap-2 py-2 text-sm text-slate-800">
        <FileDown className="h-4 w-4 text-[#965000]" /> Download Timecard PDF
        (Oct 21 - Oct 25)
      </button>
    </>
  );
}
