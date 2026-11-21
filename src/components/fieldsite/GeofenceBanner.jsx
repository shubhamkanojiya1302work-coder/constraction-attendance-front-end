import { BadgeCheck } from "lucide-react";

// Green banner confirming the worker's phone is inside the site geofence.
export default function GeofenceBanner({ message }) {
  return (
    <section className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-2 font-medium text-emerald-800">
          <BadgeCheck className="h-4 w-4" /> You are at the site
        </p>
        <span className="shrink-0 rounded-full bg-emerald-800 px-2.5 py-0.5 text-xs text-white">
          GPS Geofenced
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-700">{message}</p>
    </section>
  );
}
