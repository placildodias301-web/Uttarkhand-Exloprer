import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, Menu, ChevronDown, UserCircle, LogOut, Check } from "lucide-react";
import { useNotifications } from "../../services/notifications";
import { useAdminProfile } from "../../services/adminAuth";
import { useAdminSession } from "../../services/adminAuth";

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function AdminTopbar({ onMenuClick }) {
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications();
  const { profile } = useAdminProfile();
  const { logout } = useAdminSession();
  const navigate = useNavigate();
  const [bellOpen, setBellOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const bellRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) setBellOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const doLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="h-16 shrink-0 border-b border-white/5 bg-ink-950/80 backdrop-blur flex items-center gap-4 px-4 sm:px-6">
      <button onClick={onMenuClick} className="lg:hidden text-mist-300 hover:text-mist-100" aria-label="Open menu">
        <Menu size={20} />
      </button>

      <div className="flex-1 max-w-md hidden sm:flex items-center gap-2 rounded-lg bg-ink-800 border border-white/10 px-3 py-2">
        <Search size={15} className="text-mist-400 shrink-0" />
        <input
          placeholder="Search anything…"
          className="w-full bg-transparent outline-none text-sm font-body text-mist-100 placeholder:text-mist-400"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="relative" ref={bellRef}>
          <button
            onClick={() => setBellOpen((v) => !v)}
            className="relative h-10 w-10 rounded-full flex items-center justify-center text-mist-300 hover:text-mist-100 hover:bg-white/5"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {bellOpen && (
            <div className="absolute right-0 mt-2 w-80 max-h-[26rem] overflow-y-auto rounded-xl border border-white/10 bg-ink-900 shadow-card z-50 animate-fadeUp">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                <span className="font-body text-sm font-semibold text-mist-100">Notifications</span>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs font-body text-moss-400 hover:text-moss-300 flex items-center gap-1">
                    <Check size={12} /> Mark all read
                  </button>
                )}
              </div>
              {notifications.length === 0 ? (
                <p className="text-mist-400 text-sm font-body text-center py-8">No notifications yet.</p>
              ) : (
                notifications.slice(0, 8).map((n) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      markRead(n.id);
                      setBellOpen(false);
                      if (n.link) navigate(n.link);
                    }}
                    className={`w-full text-left px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${!n.read ? "bg-moss-500/[0.04]" : ""}`}
                  >
                    <div className="flex items-start gap-2">
                      {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-moss-400 mt-1.5 shrink-0" />}
                      <div className="min-w-0">
                        <p className="text-mist-100 text-[13px] font-body font-semibold truncate">{n.title}</p>
                        <p className="text-mist-400 text-xs font-body truncate">{n.message}</p>
                        <p className="text-mist-400/70 text-[11px] font-body mt-0.5">{timeAgo(n.timestamp)}</p>
                      </div>
                    </div>
                  </button>
                ))
              )}
              <Link
                to="/admin/notifications"
                onClick={() => setBellOpen(false)}
                className="block text-center text-xs font-body font-semibold text-moss-400 hover:text-moss-300 py-3 border-t border-white/5"
              >
                View all notifications
              </Link>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button onClick={() => setProfileOpen((v) => !v)} className="flex items-center gap-2 pl-1">
            {profile.avatarDataUrl ? (
              <img src={profile.avatarDataUrl} alt="" className="h-9 w-9 rounded-full object-cover" />
            ) : (
              <span className="h-9 w-9 rounded-full bg-ink-800 border border-white/10 flex items-center justify-center text-mist-300">
                <UserCircle size={19} />
              </span>
            )}
            <span className="hidden sm:block text-left">
              <span className="block text-mist-100 text-[13px] font-body font-semibold leading-tight">{profile.name}</span>
              <span className="block text-mist-400 text-[11px] font-body leading-tight">Admin</span>
            </span>
            <ChevronDown size={14} className="text-mist-400 hidden sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-ink-900 shadow-card overflow-hidden z-50 animate-fadeUp">
              <Link
                to="/admin/profile"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-body text-mist-200 hover:bg-white/5"
              >
                <UserCircle size={15} /> Admin Profile
              </Link>
              <button
                onClick={doLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-body text-mist-200 hover:bg-white/5 hover:text-rose-300"
              >
                <LogOut size={15} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
