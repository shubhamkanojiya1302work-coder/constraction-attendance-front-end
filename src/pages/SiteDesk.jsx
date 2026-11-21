import { useState } from "react";
import { Clock, Images, Send } from "lucide-react";
import {
  supervisor,
  liveRoster,
  dailyRecords,
  sitesDirectory,
} from "../data/attendanceData";

import DashboardLayout from "../components/layout/DashboardLayout";
import LiveAttendanceView from "../components/sitedesk/LiveAttendanceView";
import RecordsView from "../components/sitedesk/RecordsView";
import SitesView from "../components/sitedesk/SitesView";

// SiteDesk: the supervisor app. The page owns the data and the active view;
// the layout and each view are reusable components.
//   Live Attendance -> who is on site right now (default)
//   All Records     -> the day's attendance ledger with a detail panel
//   Sites           -> site directory, geofence panel, add/edit site form

const navItems = [
  { id: "live", label: "Live Attendance", icon: Clock },
  { id: "records", label: "All Records", icon: Images },
  { id: "sites", label: "Sites", icon: Send },
];

export default function SiteDesk() {
  const [activeNav, setActiveNav] = useState("live");

  return (
    <DashboardLayout
      brand="SiteDesk"
      navItems={navItems}
      activeNav={activeNav}
      onNavigate={setActiveNav}
      siteName="Green Valley Site"
      user={supervisor}
    >
      {activeNav === "sites" ? (
        // TODO: save sites/radius to the API; kiosk test and log history.
        <SitesView data={sitesDirectory} />
      ) : activeNav === "records" ? (
        // TODO: wire these to the API (approve, edit hours, date/site pickers).
        <RecordsView data={dailyRecords} />
      ) : (
        // TODO: refetch on Refresh; open the worker's records on View Details.
        <LiveAttendanceView
          roster={liveRoster}
          onRefresh={() => {}}
          onViewDetails={() => {}}
        />
      )}
    </DashboardLayout>
  );
}
