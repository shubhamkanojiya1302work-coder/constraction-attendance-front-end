import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CloudUpload,
  Hammer,
  MapPin,
  Printer,
  ShieldCheck,
} from "lucide-react";
import Card from "../ui/Card";
import Avatar from "../ui/Avatar";

// Worker header with the pay-period switcher and Print / Export buttons.
export default function ProfileCard({
  worker,
  payPeriods,
  periodIndex,
  setPeriodIndex,
  onExport,
}) {
  const period = payPeriods[periodIndex];

  return (
    <Card className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-5">
        <Avatar
          name={worker.name}
          photo={worker.photo}
          online={worker.online}
        />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold text-slate-900">
              {worker.name}
            </h1>
            <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs text-slate-600">
              {worker.badgeId}
            </span>
          </div>
          <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-orange-100 px-2 py-0.5 text-xs text-amber-900">
            <Hammer className="h-3 w-3" /> {worker.trade}
          </span>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="flex items-start gap-1">
              <MapPin className="mt-0.5 h-3.5 w-3.5 text-amber-700" />
              <span>
                {worker.site}
                <br />
                {worker.siteDetail}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
              {worker.certification}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4 rounded-xl bg-indigo-50 px-5 py-3">
          <CalendarDays className="h-5 w-5 text-[#965000]" />
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-wider text-slate-600">
              Pay Period
            </p>
            <p className="text-sm text-slate-900">
              {period.label} (Week {period.week})
            </p>
          </div>
          <button
            aria-label="Previous pay period"
            disabled={periodIndex === 0}
            onClick={() => setPeriodIndex((i) => i - 1)}
            className="rounded p-1 text-slate-700 hover:bg-white disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Next pay period"
            disabled={periodIndex === payPeriods.length - 1}
            onClick={() => setPeriodIndex((i) => i + 1)}
            className="rounded p-1 text-slate-700 hover:bg-white disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-lg bg-indigo-50 px-5 py-2.5 text-sm text-slate-800 hover:bg-indigo-100"
          >
            <Printer className="h-4 w-4 text-indigo-700" /> Print Card
          </button>
          <button
            onClick={onExport}
            className="flex items-center gap-2 rounded-lg bg-[#965000] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#794000]"
          >
            <CloudUpload className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>
    </Card>
  );
}
