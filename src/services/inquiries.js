import { createStore } from "./createStore";
import { useStore } from "../hooks/useStore";
import { pushNotification } from "./notifications";

const store = createStore("uk_inquiries", []);

function makeId() {
  return `inq_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export const INQUIRY_STATUSES = ["New", "In Progress", "Contacted", "Resolved"];
export const INQUIRY_SOURCES = { contact: "Contact", planTrip: "Plan My Trip" };

// data: { source, name, email, phone, inquiryType, destination, travelDate,
//         travellers, message, itinerary? }
export function addInquiry(data) {
  const entry = {
    id: makeId(),
    status: "New",
    date: new Date().toISOString(),
    ...data,
  };
  store.setState((list) => [entry, ...list]);
  pushNotification({
    type: "inquiry",
    title: data.source === INQUIRY_SOURCES.planTrip ? "New trip request" : "New inquiry received",
    message: `From ${data.name || "a visitor"}${data.destination ? ` — ${data.destination}` : ""}`,
    link: "/admin/inquiries",
  });
  return entry;
}

export function updateInquiryStatus(id, status) {
  store.setState((list) => list.map((i) => (i.id === id ? { ...i, status } : i)));
}

export function deleteInquiry(id) {
  store.setState((list) => list.filter((i) => i.id !== id));
}

export function useInquiries() {
  const inquiries = useStore(store);
  return { inquiries, addInquiry, updateInquiryStatus, deleteInquiry };
}
