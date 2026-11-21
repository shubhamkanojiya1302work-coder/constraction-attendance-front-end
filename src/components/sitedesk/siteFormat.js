import { Building2, Landmark, TrainFront, Warehouse } from "lucide-react";

// Shared helpers for the Sites screen (SiteCard, PerimeterPanel, SiteFormModal).

// Card icon per site `kind`.
export const siteKindIcon = {
  tower: Building2,
  rail: TrainFront,
  commercial: Landmark,
  warehouse: Warehouse,
};

// Geofence radius limits (metres) and the one-tap presets under the slider.
export const RADIUS_MIN = 50;
export const RADIUS_MAX = 500;
export const RADIUS_STEP = 10;
export const radiusPresets = [
  { label: "Tight Gate", value: 50 },
  { label: "Standard", value: 150 },
  { label: "Broad Compound", value: 500 },
];

// "17:00" -> "05:00 PM"
export function to12h(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = String(h % 12 || 12).padStart(2, "0");
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}
