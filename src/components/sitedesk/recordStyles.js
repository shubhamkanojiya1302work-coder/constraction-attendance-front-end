// Per-status labels for the All Records screen (RosterTable + RecordDetail).
// `tone` is a ui/StatusPill tone.
export const recordStatus = {
  present: {
    label: "Present",
    tone: "success",
    duration: "Full Day Confirmed",
    durationClass: "text-emerald-700",
  },
  "half-day": {
    label: "Half Day",
    tone: "warning",
    duration: "Half Day",
    durationClass: "text-orange-700",
  },
  missing: {
    label: "Missing Check-out",
    tone: "danger",
    duration: "Missing Check-out",
    durationClass: "text-red-700",
  },
};
