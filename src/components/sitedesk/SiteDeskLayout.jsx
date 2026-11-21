import { Clock, Images, Send } from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";
import { navigate } from "../../utils/navigation";

// SiteDesk's page frame: DashboardLayout with the SiteDesk nav. Each SiteDesk
// page wraps its content in this and says which nav item is active.
// The sidebar / bottom tabs navigate to the other SiteDesk pages by URL.
//
// <SiteDeskLayout active="records" user={supervisor}>…</SiteDeskLayout>
export const siteDeskNav = [
  { id: "live", label: "Live Attendance", icon: Clock, path: "/sitedesk" },
  {
    id: "records",
    label: "All Records",
    icon: Images,
    path: "/sitedesk/records",
  },
  { id: "sites", label: "Sites", icon: Send, path: "/sitedesk/sites" },
];

export default function SiteDeskLayout({
  active,
  user,
  siteName = "Green Valley Site",
  children,
}) {
  const goTo = (id) => {
    const item = siteDeskNav.find((n) => n.id === id);
    if (item) navigate(item.path);
  };

  return (
    <DashboardLayout
      brand="SiteDesk"
      navItems={siteDeskNav}
      activeNav={active}
      onNavigate={goTo}
      siteName={siteName}
      user={user}
    >
      {children}
    </DashboardLayout>
  );
}
