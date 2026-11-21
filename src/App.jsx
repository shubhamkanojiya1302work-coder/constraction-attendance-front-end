import Login from "./pages/Login";
import FieldSite from "./pages/FieldSite";
import SiteDesk from "./pages/SiteDesk";

// There's no router yet, so pick the screen from the URL path:
//   /           -> Login
//   /fieldsite  -> FieldSite (labour view)
//   /sitedesk   -> SiteDesk (admin dashboard)
function App() {
  const path = window.location.pathname;

  if (path.startsWith("/fieldsite")) return <FieldSite />;
  if (path.startsWith("/sitedesk")) return <SiteDesk />;

  return <Login />;
}

export default App;
