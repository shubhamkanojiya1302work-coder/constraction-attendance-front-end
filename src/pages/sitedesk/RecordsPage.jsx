import { supervisor, dailyRecords } from "../../data/attendanceData";
import SiteDeskLayout from "../../components/sitedesk/SiteDeskLayout";
import RecordsView from "../../components/sitedesk/RecordsView";

// /sitedesk/records — SiteDesk "All Records": the day's attendance ledger.
export default function RecordsPage() {
  return (
    <SiteDeskLayout active="records" user={supervisor}>
      {/* TODO: wire to the API (approve, edit hours, date/site pickers). */}
      <RecordsView data={dailyRecords} />
    </SiteDeskLayout>
  );
}
