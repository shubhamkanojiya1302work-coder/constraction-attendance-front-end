import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

// Previous / next day arrows around the selected date.
export default function DateSwitcher({
  date,
  subtitle,
  canPrev,
  canNext,
  onPrev,
  onNext,
}) {
  return (
    <section className="flex items-center justify-between rounded-2xl bg-white px-3 py-3">
      <button
        aria-label="Previous day"
        disabled={!canPrev}
        onClick={onPrev}
        className="p-1 disabled:opacity-30"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <div className="text-center">
        <p className="flex items-center justify-center gap-1.5 font-medium">
          <CalendarDays className="h-4 w-4 text-[#965000]" /> {date}, 2024
        </p>
        <p className="text-xs text-slate-600">{subtitle}</p>
      </div>
      <button
        aria-label="Next day"
        disabled={!canNext}
        onClick={onNext}
        className="p-1 disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </section>
  );
}
