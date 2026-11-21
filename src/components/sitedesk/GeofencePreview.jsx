import { LocateFixed } from "lucide-react";
import { RADIUS_MIN } from "./siteFormat";

// Schematic map of a site's check-in zone: a dashed circle that grows with the
// radius, on a faint grid. Not to scale. Swap for a real map (Leaflet / Google
// Maps) once coordinates come from the backend.
export default function GeofencePreview({ radius, anchorLabel }) {
  const size = 70 + (radius - RADIUS_MIN) * 0.36; // px, ~106px at 150m

  return (
    <div
      className="relative h-64 overflow-hidden rounded-2xl bg-indigo-50"
      style={{
        backgroundImage:
          "linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
      role="img"
      aria-label={`Check-in zone of ${radius} metres around ${anchorLabel}`}
    >
      {/* Outer buffer ring + allowed zone */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="absolute rounded-full border border-dashed border-[#965000]/25 transition-all duration-300"
          style={{ width: size * 1.35, height: size * 1.35 }}
        />
        <div
          className="absolute rounded-full border-2 border-dashed border-[#965000] bg-radial from-orange-200/70 to-transparent transition-all duration-300"
          style={{ width: size, height: size }}
        />
        <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-orange-200">
          <span className="h-2 w-2 rounded-full border-2 border-[#965000] bg-white" />
        </span>
      </div>

      <span className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm text-slate-900 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-emerald-700" />
        {radius}m Allowed Check-in Area
      </span>
      <span className="absolute bottom-3 right-3 flex max-w-[85%] items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-sm text-slate-900 shadow-sm">
        <LocateFixed className="h-4 w-4 shrink-0 text-[#965000]" />
        <span className="truncate">{anchorLabel}</span>
      </span>
    </div>
  );
}
