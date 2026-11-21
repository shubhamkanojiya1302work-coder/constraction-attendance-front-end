import { Camera, CircleCheck, ScanFace } from "lucide-react";

// Check-in call to action. The button calls onStart(), which opens the
// Site Check-In modal (code + selfie). checkedInAt switches it to the done state.
export default function CheckInCard({ checkedInAt, onStart }) {
  return (
    <section className="rounded-2xl bg-white p-6 text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-[#965000]">
        <ScanFace className="h-8 w-8" />
      </span>
      <h2 className="mt-4 text-2xl font-semibold">
        Face &amp; Hard Hat Check-In
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Takes 5 seconds. Make sure your face and hard hat are visible.
      </p>

      {checkedInAt ? (
        <p className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 py-3.5 font-medium text-emerald-800">
          <CircleCheck className="h-5 w-5" /> Checked in at {checkedInAt}
        </p>
      ) : (
        <button
          onClick={onStart}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#965000] py-3.5 font-medium text-white shadow-lg shadow-amber-900/20 hover:bg-[#794000] active:scale-[0.99]"
        >
          <Camera className="h-5 w-5" /> Start Check-In (Take Selfie)
        </button>
      )}
    </section>
  );
}
