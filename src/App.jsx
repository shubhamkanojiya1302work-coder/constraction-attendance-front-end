import Login from "./pages/Login";
import FieldSite from "./pages/FieldSite";
import SiteDesk from "./pages/SiteDesk";

// There's no router yet, so pick the screen from the URL path:
//   /           -> Login
//   /fieldsite  -> FieldSite (labour view)
//   /sitedesk   -> SiteDesk (admin dashboard)
// The paths are relative to Vite's base: "/" in dev, and
// "/constraction-attendance-front-end/" on GitHub Pages (see vite.config.js).
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

function currentPath() {
  const path = window.location.pathname;
  return path.startsWith(BASE) ? path.slice(BASE.length) || "/" : path;
}

function App() {
  const path = currentPath();

  if (path.startsWith("/fieldsite")) return <FieldSite />;
  if (path.startsWith("/sitedesk")) return <SiteDesk />;

  return <Login />;
}

export default App;
