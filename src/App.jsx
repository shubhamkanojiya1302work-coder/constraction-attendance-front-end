import Login from "./pages/Login";
import FieldSite from "./pages/FieldSite";
import LiveAttendancePage from "./pages/sitedesk/LiveAttendancePage";
import RecordsPage from "./pages/sitedesk/RecordsPage";
import SitesPage from "./pages/sitedesk/SitesPage";
import usePath from "./hooks/usePath";

// There's no router library: App picks the page from the URL path and
// re-renders when utils/navigation's navigate() or Back/Forward changes it.
// Paths are relative to Vite's base ("/" in dev, the repo folder on GitHub Pages).
const routes = {
  "/": Login,
  "/fieldsite": FieldSite, // labour view
  "/sitedesk": LiveAttendancePage, // supervisor: live attendance
  "/sitedesk/records": RecordsPage, // supervisor: all records
  "/sitedesk/sites": SitesPage, // supervisor: sites
};

function App() {
  const path = usePath();
  const Page = routes[path] ?? Login;
  return <Page />;
}

export default App;
