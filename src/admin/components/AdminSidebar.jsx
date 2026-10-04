import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, MapPin, Package, Route, Newspaper, Image, Inbox,
  Bell, Settings, UserCircle, LogOut, Mountain, X,
} from "lucide-react";
import { useAdminSession } from "../../services/adminAuth";
import { useSiteSettings } from "../../services/siteSettings";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/destinations", label: "Destinations", icon: MapPin },
  { to: "/admin/packages", label: "Packages", icon: Package },
  { to: "/admin/itineraries", label: "Itineraries", icon: Route },
  { to: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { to: "/admin/gallery", label: "Gallery", icon: Image },
  { to: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { to: "/admin/notifications", label: "Notifications", icon: Bell },
  { to: "/admin/settings", label: "Settings", icon: Settings },
  { to: "/admin/profile", label: "Admin Profile", icon: UserCircle },
];

export default function AdminSidebar({ onNavigate }) {
  const navigate = useNavigate();
  const { logout } = useAdminSession();
  const { settings } = useSiteSettings();

  const doLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="h-full flex flex-col bg-ink-950 border-r border-white/5">
      <div className="h-16 flex items-center justify-between px-5 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <Mountain size={20} className="text-moss-400 shrink-0" />
          <span className="font-display text-[15px] text-mist-200 truncate">{settings.general.siteName}</span>
        </div>
        <button onClick={onNavigate} className="lg:hidden text-mist-400 hover:text-mist-200" aria-label="Close menu">
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-0.5">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-colors ${
                isActive ? "bg-moss-500/10 text-moss-300 font-semibold" : "text-mist-300 hover:bg-white/5 hover:text-mist-100"
              }`
            }
          >
            <l.icon size={16} className="shrink-0" />
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-2.5 border-t border-white/5">
        <button
          onClick={doLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body text-mist-300 hover:bg-white/5 hover:text-rose-300 transition-colors"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
}
