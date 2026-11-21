import { useState } from "react";
import { Clock, Images, Send } from "lucide-react";
import {
  supervisor,
  worker,
  payPeriods,
  weeklyStats,
  weekShifts,
} from "../data/attendanceData";
import { exportShiftsCsv } from "../utils/exportCsv";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import BottomNav from "../components/layout/BottomNav";
import ProfileCard from "../components/sitedesk/ProfileCard";
import StatsRow from "../components/sitedesk/StatsRow";
import LedgerTable from "../components/sitedesk/LedgerTable";
import DistributionChart from "../components/sitedesk/DistributionChart";
import SignOffNotice from "../components/sitedesk/SignOffNotice";
import PunchInspector from "../components/sitedesk/PunchInspector";
import CorrectionHelp from "../components/sitedesk/CorrectionHelp";

// SiteDesk: the admin / supervisor dashboard.
// Desktop (`lg`+): left Sidebar. Phones and tablets: BottomNav with the same items.

const navItems = [
  { id: "live", label: "Live Attendance", icon: Clock },
  { id: "records", label: "All Records", icon: Images },
  { id: "sites", label: "Sites", icon: Send },
];

export default function SiteDesk() {
  const [activeNav, setActiveNav] = useState("records");
  const [periodIndex, setPeriodIndex] = useState(1);
  const [selectedId, setSelectedId] = useState("thu");

  const selectedDay = weekShifts.find((d) => d.id === selectedId);

  return (
    <div className="flex min-h-screen bg-[#f7f8fc] font-sans text-slate-900">
      <Sidebar
        title="SiteDesk"
        items={navItems}
        active={activeNav}
        onSelect={setActiveNav}
      />

      <div className="min-w-0 flex-1">
        <Topbar siteName="Green Valley Site" user={supervisor} />
        <main className="space-y-4 px-4 pb-28 sm:space-y-6 sm:px-6 lg:px-8 lg:pb-10">
          <ProfileCard
            worker={worker}
            payPeriods={payPeriods}
            periodIndex={periodIndex}
            setPeriodIndex={setPeriodIndex}
            onExport={() =>
              exportShiftsCsv(weekShifts, "timesheet-week-43.csv")
            }
          />
          <StatsRow stats={weeklyStats} />

          <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-[1fr_320px]">
            <div className="min-w-0 space-y-4 sm:space-y-6">
              <LedgerTable
                shifts={weekShifts}
                stats={weeklyStats}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
              <DistributionChart
                shifts={weekShifts}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
              <SignOffNotice />
            </div>

            <div className="space-y-4 sm:space-y-6">
              <PunchInspector day={selectedDay} />
              <CorrectionHelp />
            </div>
          </div>
        </main>
      </div>

      <BottomNav items={navItems} active={activeNav} onSelect={setActiveNav} />
    </div>
  );
}
