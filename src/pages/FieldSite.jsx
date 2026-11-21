import { useState } from "react";
import { Fingerprint, History } from "lucide-react";
import {
  worker,
  mobileDays,
  shiftSchedule,
  approval,
  mobileTimesheet,
} from "../data/attendanceData";

import AppBar from "../components/layout/AppBar";
import BottomNav from "../components/layout/BottomNav";
import WorkerCard from "../components/fieldsite/WorkerCard";
import DateSwitcher from "../components/fieldsite/DateSwitcher";
import ShiftStatus from "../components/fieldsite/ShiftStatus";
import PunchTimeline from "../components/fieldsite/PunchTimeline";
import ApprovalCard from "../components/fieldsite/ApprovalCard";
import WeeklyTimesheet from "../components/fieldsite/WeeklyTimesheet";
import MobileActions from "../components/fieldsite/MobileActions";

// FieldSite: the labour (worker) view of their own attendance.
// Phones: one column with a bottom tab bar.
// Desktop (`lg`+): two columns, tabs move into the top bar.

const tabs = [
  { id: "attendance", label: "Attendance", icon: Fingerprint },
  { id: "log", label: "My Log", icon: History },
];

export default function FieldSite() {
  const [dayIndex, setDayIndex] = useState(mobileDays.length - 1);
  const [tab, setTab] = useState("attendance");
  const day = mobileDays[dayIndex];

  return (
    <div className="min-h-screen bg-[#f5f6fd] font-sans text-slate-900">
      <AppBar title="FieldSite" items={tabs} active={tab} onSelect={setTab} />

      <main className="mx-auto max-w-md px-3 pb-28 pt-3 sm:max-w-xl lg:max-w-6xl lg:px-8 lg:pb-10 lg:pt-6">
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:gap-6">
          <div className="space-y-4 lg:space-y-6">
            <WorkerCard worker={worker} />
            <DateSwitcher
              date={day.date}
              subtitle={shiftSchedule.label}
              canPrev={dayIndex > 0}
              canNext={dayIndex < mobileDays.length - 1}
              onPrev={() => setDayIndex((i) => i - 1)}
              onNext={() => setDayIndex((i) => i + 1)}
            />
            <ShiftStatus
              day={day}
              scheduledMins={shiftSchedule.scheduledMins}
            />
            <PunchTimeline punches={day.punches} />
          </div>

          <div className="space-y-4 lg:space-y-6">
            <ApprovalCard approval={approval} />
            <WeeklyTimesheet timesheet={mobileTimesheet} />
            <MobileActions />
          </div>
        </div>
      </main>

      <BottomNav items={tabs} active={tab} onSelect={setTab} />
    </div>
  );
}
