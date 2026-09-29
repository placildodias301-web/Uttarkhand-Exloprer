import { createStore } from "./createStore";
import { useStore } from "../hooks/useStore";
import { pushNotification } from "./notifications";

const store = createStore("uk_inquiries", []);

function makeId() {
  return `inq_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// data: { name, email, phone, inquiryType, destination, travelDate, message }
export function addInquiry(data) {
  const entry = {
    id: makeId(),
    status: "New",
    date: new Date().toISOString(),
    ...data,
  };
  store.setState((list) => [entry, ...list]);
  pushNotification({
    title: "New inquiry received",
    message: `From ${data.name || "a visitor"}${data.inquiryType ? ` · ${data.inquiryType}` : ""}`,
    link: "/admin/inquiries",
  });
  return entry;
}

export function updateInquiryStatus(id, status) {
  store.setState((list) => list.map((i) => (i.id === id ? { ...i, status } : i)));
}

export function useInquiries() {
  const inquiries = useStore(store);
  return { inquiries, addInquiry, updateInquiryStatus };
}
