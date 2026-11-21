import { useState } from "react";
import {
  Camera,
  ClipboardCheck,
  Clock,
  History,
  MapPin,
  Pointer,
} from "lucide-react";
import {
  worker,
  checkIn,
  mobileDays,
  shiftSchedule,
  approval,
  mobileTimesheet,
} from "../data/attendanceData";

import AppBar from "../components/layout/AppBar";
import BottomNav from "../components/layout/BottomNav";
import WorkerCard from "../components/fieldsite/WorkerCard";
import GeofenceBanner from "../components/fieldsite/GeofenceBanner";
import CheckInCard from "../components/fieldsite/CheckInCard";
import CheckInModal from "../components/fieldsite/CheckInModal";
import InfoTile from "../components/fieldsite/InfoTile";
import SiteCodeCard from "../components/fieldsite/SiteCodeCard";
import SafetyReminder from "../components/fieldsite/SafetyReminder";
import HelpCallLink from "../components/fieldsite/HelpCallLink";
import DateSwitcher from "../components/fieldsite/DateSwitcher";
import ShiftStatus from "../components/fieldsite/ShiftStatus";
import PunchTimeline from "../components/fieldsite/PunchTimeline";
import ApprovalCard from "../components/fieldsite/ApprovalCard";
import WeeklyTimesheet from "../components/fieldsite/WeeklyTimesheet";
import MobileActions from "../components/fieldsite/MobileActions";

// FieldSite: the labour (worker) view.
// Phones: one column with a bottom tab bar.
// Desktop (`lg`+): two columns, tabs move into the top bar.

const tabs = [
  { id: "checkin", label: "Check-In", icon: Camera },
  { id: "attendance", label: "Attendance", icon: Pointer },
  { id: "log", label: "My Log", icon: History },
];

const formatTime = (date) =>
  date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

export default function FieldSite() {
  const [tab, setTab] = useState("checkin");
  const [checkedInAt, setCheckedInAt] = useState(null);
  // Site Check-In modal: open flag, the selfie taken inside it, and the
  // time shown while it's open.
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [selfie, setSelfie] = useState(null);
  const [pendingTime, setPendingTime] = useState(null);

  const startCheckIn = () => {
    setSelfie(null);
    setPendingTime(formatTime(new Date()));
    setCheckInOpen(true);
  };

  const cancelCheckIn = () => {
    setCheckInOpen(false);
    setSelfie(null);
  };

  // TODO: send the selfie, code and time to the backend.
  const confirmCheckIn = () => {
    setCheckedInAt(pendingTime);
    setCheckInOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f6fd] font-sans text-slate-900">
      <AppBar title="FieldSite" items={tabs} active={tab} onSelect={setTab} />

      <main className="mx-auto max-w-md px-4 pb-32 pt-3 sm:max-w-xl lg:max-w-6xl lg:px-8 lg:pb-10 lg:pt-6">
        {tab === "checkin" ? (
          <CheckInTab checkedInAt={checkedInAt} onStart={startCheckIn} />
        ) : (
          // "My Log" has no screen of its own yet, so it shows the attendance view.
          <AttendanceTab />
        )}
      </main>

      <BottomNav items={tabs} active={tab} onSelect={setTab} />

      {checkInOpen && (
        <CheckInModal
          open
          worker={worker}
          site={checkIn}
          photo={selfie}
          time={pendingTime}
          onPhoto={setSelfie}
          onScanQr={() => {}}
          onCancel={cancelCheckIn}
          onConfirm={confirmCheckIn}
        />
      )}
    </div>
  );
}

function CheckInTab({ checkedInAt, onStart }) {
  const firstName = worker.name.split(" ")[0];

  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:gap-6">
      <div className="space-y-4 lg:space-y-6">
        <WorkerCard
          worker={worker}
          title={`Hello, ${firstName}! 👋`}
          status={checkedInAt ? "On Shift" : "Ready for Shift"}
          site={checkIn.gate}
          siteIcon={MapPin}
        />
        <GeofenceBanner message={checkIn.geofenceMessage} />
        <CheckInCard checkedInAt={checkedInAt} onStart={onStart} />
      </div>

      <div className="space-y-4 lg:space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <InfoTile
            icon={Clock}
            label="Shift Timing"
            value={checkIn.shiftTiming}
            sub={checkIn.shiftNote}
          />
          <InfoTile
            icon={ClipboardCheck}
            label="Today's Status"
            value={checkedInAt ? "Checked In" : "Not Checked In"}
            valueClass={checkedInAt ? "text-emerald-700" : "text-[#965000]"}
            sub={checkedInAt ? `Since ${checkedInAt}` : "Ready to punch"}
          />
        </div>
        <SiteCodeCard code={checkIn.siteCode} onScan={() => {}} />
        <SafetyReminder />
        <HelpCallLink
          name={checkIn.helpContact.name}
          phone={checkIn.helpContact.phone}
        />
      </div>
    </div>
  );
}

function AttendanceTab() {
  const [dayIndex, setDayIndex] = useState(mobileDays.length - 1);
  const day = mobileDays[dayIndex];

  return (
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
        <ShiftStatus day={day} scheduledMins={shiftSchedule.scheduledMins} />
        <PunchTimeline punches={day.punches} />
      </div>

      <div className="space-y-4 lg:space-y-6">
        <ApprovalCard approval={approval} />
        <WeeklyTimesheet timesheet={mobileTimesheet} />
        <MobileActions />
      </div>
    </div>
  );
}
