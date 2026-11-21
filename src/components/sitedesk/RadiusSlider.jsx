import { useId } from "react";
import { Target } from "lucide-react";
import {
  RADIUS_MAX,
  RADIUS_MIN,
  RADIUS_STEP,
  radiusPresets,
} from "./siteFormat";

// Geofence radius picker: a slider plus one-tap presets (50 / 150 / 500 m).
export default function RadiusSlider({ value, onChange }) {
  const id = useId();

  return (
    <div className="rounded-2xl bg-indigo-50 p-4">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="flex items-center gap-2 text-slate-900">
          <Target className="h-5 w-5 text-[#965000]" /> Geofence Radius
        </label>
        <span className="text-xl font-semibold text-[#965000]">
          {value} meters
        </span>
      </div>

      <input
        id={id}
        type="range"
        min={RADIUS_MIN}
        max={RADIUS_MAX}
        step={RADIUS_STEP}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full accent-[#965000]"
      />

      <div className="mt-2 flex flex-wrap gap-2">
        {radiusPresets.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => onChange(p.value)}
            aria-pressed={value === p.value}
            className={`rounded-lg px-2.5 py-1 text-left text-sm transition ${
              value === p.value
                ? "bg-white font-medium text-[#965000] shadow-sm"
                : "text-slate-700 hover:bg-white/60"
            }`}
          >
            {p.label} ({p.value}m)
          </button>
        ))}
      </div>
    </div>
  );
}
