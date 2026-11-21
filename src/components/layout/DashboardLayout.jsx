import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BottomNav from "./BottomNav";

// Page frame for desktop-first dashboards (SiteDesk, and any future admin page):
//   `lg`+   left Sidebar + Topbar + content
//   below   Topbar + content + BottomNav with the same nav items
// The page only supplies the nav items, the active one, and its content.
//
// <DashboardLayout brand="SiteDesk" navItems={items} activeNav={id}
//   onNavigate={setId} siteName="Green Valley Site" user={user}>
//   …page content…
// </DashboardLayout>
export default function DashboardLayout({
  brand,
  navItems,
  activeNav,
  onNavigate,
  siteName,
  user,
  children,
}) {
  return (
    <div className="flex min-h-screen bg-[#f7f8fc] font-sans text-slate-900">
      <Sidebar
        title={brand}
        items={navItems}
        active={activeNav}
        onSelect={onNavigate}
      />

      <div className="min-w-0 flex-1">
        <Topbar siteName={siteName} user={user} />
        <main className="space-y-4 px-4 pb-28 sm:space-y-6 sm:px-6 lg:px-8 lg:pb-10">
          {children}
        </main>
      </div>

      <BottomNav items={navItems} active={activeNav} onSelect={onNavigate} />
    </div>
  );
}
