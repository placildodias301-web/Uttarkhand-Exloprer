import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useNotifications } from "../../services/notifications";

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function Notifications() {
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl text-mist-100">Notifications</h1>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-moss-400 hover:text-moss-300">
            <Check size={13} /> Mark all as read
          </button>
        )}
      </div>

      <div className="rounded-2xl border border-white/5 bg-ink-850 divide-y divide-white/5">
        {notifications.length === 0 ? (
          <p className="text-mist-400 font-body text-sm text-center py-14">No notifications yet.</p>
        ) : (
          notifications.map((n) => (
            <button
              key={n.id}
              onClick={() => {
                markRead(n.id);
                if (n.link) navigate(n.link);
              }}
              className={`w-full text-left flex items-start gap-3 px-5 py-4 hover:bg-white/[0.02] transition-colors ${!n.read ? "bg-moss-500/[0.03]" : ""}`}
            >
              {!n.read && <span className="h-2 w-2 rounded-full bg-moss-400 mt-1.5 shrink-0" />}
              {n.read && <span className="h-2 w-2 shrink-0" />}
              <div className="min-w-0 flex-1">
                <p className="text-mist-100 text-sm font-body font-semibold">{n.title}</p>
                <p className="text-mist-400 text-sm font-body">{n.message}</p>
                <p className="text-mist-400/70 text-xs font-body mt-1">{timeAgo(n.timestamp)}</p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
