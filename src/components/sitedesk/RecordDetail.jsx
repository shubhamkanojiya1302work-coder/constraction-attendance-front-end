import {
  BadgeCheck,
  CalendarClock,
  Camera,
  Check,
  ClipboardCheck,
  ShieldCheck,
} from "lucide-react";
import Card from "../ui/Card";
import Avatar, { initialTone } from "../ui/Avatar";
import StatusPill from "../ui/StatusPill";
import { recordStatus } from "./recordStyles";

// Right-hand panel for the selected record: face scans, duration, location,
// who verified it, and Edit Hours / Approve.
export default function RecordDetail({
  record: r,
  approved,
  onEditHours,
  onApprove,
}) {
  const status = recordStatus[r.status];
  const canApprove = r.status !== "missing";

  return (
    <Card className="space-y-6 p-5 sm:p-6">
      {/* Who */}
      <div className="flex items-start gap-4">
        <Avatar
          name={r.name}
          photo={r.photo}
          size="h-14 w-14 text-2xl"
          rounded="rounded-full"
          tone={initialTone(r.name)}
          letters={1}
        />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 text-xl font-semibold text-slate-900">
            {r.name}
            <BadgeCheck
              className={`h-5 w-5 shrink-0 ${
                approved ? "text-emerald-700" : "text-slate-400"
              }`}
            />
          </p>
          <p className="text-slate-600">
            {r.trade} • ID {r.workerId}
          </p>
        </div>
        <StatusPill tone={approved ? "success" : "warning"}>
          {approved ? "Verified & Approved" : "Pending Review"}
        </StatusPill>
      </div>

      {/* Face scans */}
      <div>
        <p className="mb-3 text-sm uppercase tracking-wider text-slate-800">
          Jobsite Face Checkpoints
        </p>
        <div className="grid grid-cols-2 gap-3">
          <ScanTile
            label="Morning Scan"
            title="Check-In"
            time={r.checkIn}
            timeClass="text-emerald-700"
            photo={r.checkInPhoto}
          />
          <ScanTile
            label="Evening Scan"
            title="Check-Out"
            time={r.checkOut}
            timeClass="text-[#965000]"
            photo={r.checkOutPhoto}
          />
        </div>
      </div>

      {/* Duration + location */}
      <div className="grid grid-cols-2 gap-4 rounded-2xl bg-indigo-50 p-5">
        <div>
          <p className="text-sm text-slate-700">Total Duration</p>
          <p className="text-2xl font-semibold text-slate-900">
            {r.total ?? "—"}
          </p>
          <p className={status.durationClass}>{status.duration}</p>
        </div>
        <div>
          <p className="text-sm text-slate-700">Checked Location</p>
          <p className="mt-1 flex gap-2 text-slate-900">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#965000]" />
            {r.location}
          </p>
        </div>
      </div>

      {/* Verification */}
      <div className="flex gap-3 rounded-2xl bg-indigo-100/70 p-4">
        <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
        <div>
          <p className="text-sm text-slate-900">
            {approved
              ? `Verified by ${r.verifiedBy ?? "you"}`
              : "Not verified yet"}
          </p>
          <p className="text-slate-600">{r.verifiedNote}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onEditHours}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-100 py-3.5 text-lg text-slate-900 hover:bg-indigo-200"
        >
          <CalendarClock className="h-5 w-5" /> Edit Hours
        </button>
        {approved ? (
          <p className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 py-3.5 text-lg font-medium text-white">
            <Check className="h-5 w-5" /> Approved
          </p>
        ) : (
          <button
            onClick={onApprove}
            disabled={!canApprove}
            title={canApprove ? undefined : "Needs a check-out before approval"}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#965000] py-3.5 text-lg font-medium text-white hover:bg-[#794000] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Check className="h-5 w-5" /> Approve
          </button>
        )}
      </div>
    </Card>
  );
}

function ScanTile({ label, title, time, timeClass, photo }) {
  return (
    <div className="rounded-2xl bg-indigo-50 p-1.5">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-indigo-100 text-slate-500">
        {photo ? (
          <img
            src={photo}
            alt={`${label} photo`}
            className="h-full w-full object-cover"
          />
        ) : (
          <Camera className="h-6 w-6" />
        )}
        <span className="absolute bottom-2 left-2 rounded bg-slate-900/60 px-2 py-0.5 text-xs text-white">
          {time ? label : "No scan"}
        </span>
      </div>
      <div className="flex items-center justify-between px-1.5 pb-0.5 pt-2 text-sm">
        <span className="font-medium text-slate-900">{title}</span>
        <span className={time ? timeClass : "italic text-slate-500"}>
          {time ?? "Pending"}
        </span>
      </div>
    </div>
  );
}
