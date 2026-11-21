import { supervisor, sitesDirectory } from "../../data/attendanceData";
import SiteDeskLayout from "../../components/sitedesk/SiteDeskLayout";
import SitesView from "../../components/sitedesk/SitesView";

// /sitedesk/sites — SiteDesk "Sites": site directory, geofence panel, add/edit site.
export default function SitesPage() {
  return (
    <SiteDeskLayout active="sites" user={supervisor}>
      {/* TODO: save sites/radius to the API; kiosk test and log history. */}
      <SitesView data={sitesDirectory} />
    </SiteDeskLayout>
  );
}
