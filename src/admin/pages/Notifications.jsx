import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Inbox, Image, Route, Newspaper, Package, MapPin, Settings } from "lucide-react";
import { useNotifications, NOTIFICATION_TYPES } from "../../services/notifications";
import { timeAgo } from "../utils/timeAgo";

const TYPE_ICONS = {
  inquiry: Inbox,
  gallery: Image,
  itinerary: Route,
  blog: Newspaper,
  package: Package,
  destination: MapPin,
  system: Settings,
};

export default function Notifications() {
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications();
  const navigate = useNavigate();
  const [type, setType] = useState("all");
  const typeOf = (n) => n.type || "system";
  const filtered = notifications.filter((n) => type === "all" || typeOf(n) === type);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl text-mist-100">Notifications</h1>
          <p className="text-mist-400 text-sm font-body mt-1">{unreadCount} unread</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-moss-400 hover:text-moss-300">
            <Check size={13} /> Mark all as read
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5" role="group" aria-label="Filter by type">
        {[["all", "All"], ...Object.entries(NOTIFICATION_TYPES)].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setType(key)}
            aria-pressed={type === key}
            className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold border transition-colors ${
              type === key ? "bg-moss-500 text-ink-950 border-moss-500" : "border-white/10 text-mist-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/5 bg-ink-850 divide-y divide-white/5">
        {filtered.length === 0 ? (
          <p className="text-mist-400 font-body text-sm text-center py-14">No notifications here.</p>
        ) : (
          filtered.map((n) => {
            const Icon = TYPE_ICONS[typeOf(n)] || Settings;
            return (
              <div key={n.id} className={`flex items-start gap-3 px-5 py-4 ${!n.read ? "bg-moss-500/[0.04]" : ""}`}>
                <span className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${!n.read ? "bg-moss-500/15 text-moss-400" : "bg-white/5 text-mist-400"}`}>
                  <Icon size={15} aria-hidden="true" />
                </span>
                <button
                  onClick={() => {
                    markRead(n.id);
                    if (n.link) navigate(n.link);
                  }}
                  className="min-w-0 flex-1 text-left"
                >
                  <p className="text-mist-100 text-sm font-body font-semibold">
                    {n.title}
                    {!n.read && <span className="ml-2 inline-block h-2 w-2 rounded-full bg-moss-400 align-middle" aria-label="Unread" />}
                  </p>
                  <p className="text-mist-400 text-sm font-body">{n.message}</p>
                  <p className="text-mist-400/70 text-xs font-body mt-1">
                    {NOTIFICATION_TYPES[typeOf(n)] || "System"} · {timeAgo(n.timestamp)}
                  </p>
                </button>
                {!n.read && (
                  <button onClick={() => markRead(n.id)} className="text-xs font-body font-semibold text-moss-400 hover:text-moss-300 shrink-0">
                    Mark read
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
