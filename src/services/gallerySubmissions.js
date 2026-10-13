import { createStore } from "./createStore";
import { useStore } from "../hooks/useStore";
import { pushNotification } from "./notifications";

const store = createStore("uk_gallery_submissions", []);

function makeId() {
  return `sub_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// data: { image (data URL), place, title, visitorName, email, caption, region }
export function addSubmission(data) {
  const entry = {
    id: makeId(),
    status: "pending",
    date: new Date().toISOString(),
    rejectionReason: null,
    ...data,
  };
  store.setState((list) => [entry, ...list]);
  pushNotification({
    type: "gallery",
    title: "New gallery image submitted",
    message: `"${data.title || "Untitled"}" from ${data.visitorName || "a visitor"}`,
    link: "/admin/gallery",
  });
  return entry;
}

export function approveSubmission(id) {
  store.setState((list) => list.map((s) => (s.id === id ? { ...s, status: "approved" } : s)));
}

export function deleteSubmission(id) {
  store.setState((list) => list.filter((s) => s.id !== id));
}

export function rejectSubmission(id, reason = "") {
  store.setState((list) =>
    list.map((s) => (s.id === id ? { ...s, status: "rejected", rejectionReason: reason } : s))
  );
}

export function useGallerySubmissions() {
  const submissions = useStore(store);
  return {
    submissions,
    pending: submissions.filter((s) => s.status === "pending"),
    approved: submissions.filter((s) => s.status === "approved"),
    rejected: submissions.filter((s) => s.status === "rejected"),
    addSubmission,
    approveSubmission,
    rejectSubmission,
    deleteSubmission,
  };
}
