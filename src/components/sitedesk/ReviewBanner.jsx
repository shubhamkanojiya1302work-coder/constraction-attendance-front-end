import { ArrowRight, TriangleAlert } from "lucide-react";

// "N items require supervisor review" banner at the top of Live Attendance.
export default function ReviewBanner({ count, message, onReview }) {
  if (!count) return null;

  return (
    <section className="flex flex-col gap-4 rounded-2xl bg-indigo-100/70 p-5 sm:flex-row sm:items-center">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[#965000]">
        <TriangleAlert className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-lg font-medium text-slate-900">
          {count} items require supervisor review
        </p>
        <p className="text-sm text-slate-600">{message}</p>
      </div>
      <button
        onClick={onReview}
        className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#965000] px-5 py-3 font-medium text-white hover:bg-[#794000]"
      >
        Review {count} Items <ArrowRight className="h-4 w-4" />
      </button>
    </section>
  );
}
