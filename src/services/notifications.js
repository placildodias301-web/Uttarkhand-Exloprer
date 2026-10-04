import { createStore } from "./createStore";
import { useStore } from "../hooks/useStore";

const store = createStore("uk_admin_notifications", []);

function makeId() {
  return `ntf_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// Notification types shown in the admin (icon + filter). Older entries saved
// without a type are shown as "system".
export const NOTIFICATION_TYPES = {
  inquiry: "New inquiry",
  gallery: "New gallery submission",
  itinerary: "Itinerary update",
  blog: "Blog update",
  package: "Package update",
  destination: "Destination update",
  system: "System",
};

// Any part of the app — public or admin — can call this to raise an
// admin notification. It doesn't need to be inside a React component.
export function pushNotification({ title, message, link, type = "system" }) {
  const entry = {
    id: makeId(),
    type,
    title,
    message,
    link: link || null,
    timestamp: new Date().toISOString(),
    read: false,
  };
  store.setState((list) => [entry, ...list].slice(0, 100)); // cap history
  return entry;
}

export function markNotificationRead(id) {
  store.setState((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));
}

export function markAllNotificationsRead() {
  store.setState((list) => list.map((n) => ({ ...n, read: true })));
}

export function useNotifications() {
  const notifications = useStore(store);
  const unreadCount = notifications.filter((n) => !n.read).length;
  return {
    notifications,
    unreadCount,
    markRead: markNotificationRead,
    markAllRead: markAllNotificationsRead,
  };
}
