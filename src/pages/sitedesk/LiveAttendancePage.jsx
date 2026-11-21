import { supervisor, liveRoster } from "../../data/attendanceData";
import SiteDeskLayout from "../../components/sitedesk/SiteDeskLayout";
import LiveAttendanceView from "../../components/sitedesk/LiveAttendanceView";

// /sitedesk — SiteDesk "Live Attendance": who is on site right now.
export default function LiveAttendancePage() {
  return (
    <SiteDeskLayout active="live" user={supervisor}>
      {/* TODO: refetch on Refresh; open the worker's records on View Details. */}
      <LiveAttendanceView
        roster={liveRoster}
        onRefresh={() => {}}
        onViewDetails={() => {}}
      />
    </SiteDeskLayout>
  );
}
