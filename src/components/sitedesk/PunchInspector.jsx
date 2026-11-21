import { useMemo } from "react";
import {
  CalendarClock,
  CircleCheck,
  LocateFixed,
  Lock,
  LogIn,
  LogOut,
  MessageSquare,
  RotateCcw,
  ScanSearch,
  Utensils,
} from "lucide-react";
import Card from "../ui/Card";

function buildAuditTrail(d) {
  return [
    {
      icon: LogIn,
      iconClass: "bg-emerald-700 text-white",
      title: `${d.in} Check-In`,
      tag: "On Time",
      tagClass: "bg-emerald-50 text-emerald-700",
      sub: `${d.inGate} • East Turnstile Kiosk`,
      meta: [`PIN Verified (${d.pin})`, `GPS Lat ${d.lat}, Lon ${d.lon}`],
    },
    {
      icon: Utensils,
      iconClass: "bg-indigo-100 text-slate-700",
      title: `${d.lunchStart} Lunch Break`,
      tag: `Duration: ${d.lunchMins}m`,
      tagClass: "text-slate-600",
      sub: "Break Area Canteen Kiosk • Auto-reconciled",
    },
    {
      icon: RotateCcw,
      iconClass: "bg-indigo-100 text-slate-700",
      title: `${d.lunchEnd} Resumed Shift`,
      tag: `Within Allotted ${d.lunchMins}m`,
      tagClass: "text-emerald-700",
      sub: "Scaffold Level 4 Scanner",
    },
    {
      icon: LogOut,
      iconClass: "bg-[#965000] text-white",
      title: `${d.out} Check-Out`,
      tag: d.overtime ? "Overtime" : "Shift End",
      tagClass: d.overtime
        ? "bg-orange-100 text-[#965000]"
        : "bg-indigo-50 text-slate-700",
      sub: `${d.outGate} • East Turnstile Kiosk`,
      meta: ["Site Exit Code Verified"],
    },
  ];
}

// Right-hand panel: geofence, punch audit trail and supervisor stamp for one day.
export default function PunchInspector({ day }) {
  const trail = useMemo(() => buildAuditTrail(day), [day]);

  return (
    <Card className="overflow-hidden">
      <div className="bg-indigo-100/70 p-5">
        <p className="text-[11px] uppercase tracking-wider text-slate-700">
          Punch Inspector
        </p>
        <div className="mt-1 flex items-start justify-between gap-2">
          <h3 className="flex items-start gap-2 text-lg font-semibold text-slate-900">
            <ScanSearch className="mt-1 h-4 w-4 shrink-0 text-[#965000]" />{" "}
            {day.fullLabel}
          </h3>
          <span className="flex items-center gap-1 rounded-full bg-emerald-400 px-2.5 py-1 text-xs text-emerald-900">
            <CircleCheck className="h-3.5 w-3.5" /> Verified
          </span>
        </div>
      </div>

      <div className="space-y-5 p-5">
        {/* Geofence "map" placeholder – swap for Leaflet / Google Maps */}
        <div className="flex h-40 items-end rounded-xl bg-indigo-50 p-2">
          <div className="flex w-full items-center justify-between rounded-lg bg-white px-3 py-2">
            <div className="flex items-start gap-2 text-xs">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-700" />
              <div>
                <p className="text-slate-900">Geofence Radius: 150m</p>
                <p className="text-emerald-700">
                  Punched at {day.radius} radial accuracy
                </p>
              </div>
            </div>
            <LocateFixed className="h-4 w-4 text-emerald-700" />
          </div>
        </div>

        <div>
          <p className="mb-3 text-[11px] uppercase tracking-wider text-slate-700">
            Punch Audit Trail
          </p>
          <ol className="relative space-y-3 before:absolute before:bottom-4 before:left-[9px] before:top-4 before:w-px before:bg-slate-200">
            {trail.map((p) => (
              <li key={p.title} className="relative flex gap-3">
                <span
                  className={`z-10 mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${p.iconClass}`}
                >
                  <p.icon className="h-3 w-3" />
                </span>
                <div className="flex-1 rounded-xl bg-indigo-50/70 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm text-slate-900">{p.title}</p>
                    <span
                      className={`shrink-0 rounded px-1.5 py-0.5 text-[11px] ${p.tagClass}`}
                    >
                      {p.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{p.sub}</p>
                  {p.meta && (
                    <p className="mt-1 flex flex-wrap gap-x-3 text-[11px] text-slate-600">
                      {p.meta.map((m) => (
                        <span key={m}>{m}</span>
                      ))}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-xl bg-indigo-50 p-3">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider">
            <span className="text-slate-700">Supervisor Stamp</span>
            <span className="flex items-center gap-1 normal-case tracking-normal text-emerald-700">
              <Lock className="h-3 w-3" /> Authenticated
            </span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-[#965000]">
              MV
            </span>
            <div>
              <p className="text-sm text-slate-900">Marcus Vance</p>
              <p className="text-xs text-slate-600">
                General Foreman • Tower 2 Structural
              </p>
            </div>
          </div>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-50 py-3 text-sm text-slate-900 hover:bg-indigo-100">
          <CalendarClock className="h-4 w-4 text-[#965000]" /> Request Punch
          Correction
        </button>
        <button className="flex w-full items-center justify-center gap-2 text-xs text-slate-700 hover:text-slate-900">
          <MessageSquare className="h-3.5 w-3.5" /> Send SMS Shift Receipt
        </button>
      </div>
    </Card>
  );
}
