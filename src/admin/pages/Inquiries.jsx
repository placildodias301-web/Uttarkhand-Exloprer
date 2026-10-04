import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { useInquiries, INQUIRY_STATUSES, INQUIRY_SOURCES } from "../../services/inquiries";
import StatusBadge from "../components/StatusBadge";
import Modal from "../../components/Modal";

// Contact form messages and Plan My Trip requests, newest first.
// Older entries saved before "source" existed are treated as Contact.
const sourceOf = (i) => i.source || INQUIRY_SOURCES.contact;

export default function Inquiries() {
  const { inquiries, updateInquiryStatus, deleteInquiry } = useInquiries();
  const [tab, setTab] = useState("All");
  const [source, setSource] = useState("All");
  const [viewing, setViewing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const filtered = inquiries.filter((i) => (tab === "All" || i.status === tab) && (source === "All" || sourceOf(i) === source));

  return (
    <div>
      <h1 className="font-display text-2xl text-mist-100 mb-6">Inquiries</h1>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by status">
          {["All", ...INQUIRY_STATUSES].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={`px-3.5 py-1.5 rounded-full text-xs font-body font-semibold border transition-colors ${
                tab === t ? "bg-moss-500 text-ink-950 border-moss-500" : "border-white/10 text-mist-300"
              }`}
            >
              {t} {t !== "All" && `(${inquiries.filter((i) => i.status === t).length})`}
            </button>
          ))}
        </div>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          aria-label="Filter by source"
          className="bg-ink-800 border border-white/10 rounded-full text-xs font-body px-3 py-1.5 text-mist-200 outline-none"
        >
          <option value="All">All sources</option>
          {Object.values(INQUIRY_SOURCES).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl border border-white/5 bg-ink-850 overflow-x-auto">
        <table className="w-full text-sm font-body min-w-[900px]">
          <thead>
            <tr className="text-left text-mist-400 text-xs border-b border-white/5">
              <th className="py-3 px-4 font-semibold">Name</th>
              <th className="py-3 px-4 font-semibold">Source</th>
              <th className="py-3 px-4 font-semibold">Destination</th>
              <th className="py-3 px-4 font-semibold">Travel date</th>
              <th className="py-3 px-4 font-semibold">Travellers</th>
              <th className="py-3 px-4 font-semibold">Received</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((i) => (
              <tr key={i.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                <td className="py-2.5 px-4">
                  <p className="text-mist-100 font-semibold">{i.name}</p>
                  <p className="text-mist-400 text-xs truncate max-w-[200px]">{i.email}</p>
                </td>
                <td className="py-2.5 px-4 text-mist-300">{sourceOf(i)}</td>
                <td className="py-2.5 px-4 text-mist-300">{i.destination || "—"}</td>
                <td className="py-2.5 px-4 text-mist-300">{i.travelDate || "—"}</td>
                <td className="py-2.5 px-4 text-mist-300">{i.travellers || "—"}</td>
                <td className="py-2.5 px-4 text-mist-400">{new Date(i.date).toLocaleDateString()}</td>
                <td className="py-2.5 px-4">
                  <select
                    value={i.status}
                    onChange={(e) => updateInquiryStatus(i.id, e.target.value)}
                    aria-label={`Status for ${i.name}`}
                    className="bg-ink-800 border border-white/10 rounded-full text-xs font-body px-2.5 py-1 text-mist-200 outline-none"
                  >
                    {INQUIRY_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="py-2.5 px-4 text-right whitespace-nowrap">
                  <button onClick={() => setViewing(i)} aria-label={`View inquiry from ${i.name}`} className="h-8 w-8 rounded-full inline-flex items-center justify-center text-mist-300 hover:text-moss-300 hover:bg-white/5">
                    <Eye size={14} />
                  </button>
                  <button onClick={() => setDeleting(i)} aria-label={`Delete inquiry from ${i.name}`} className="h-8 w-8 rounded-full inline-flex items-center justify-center text-mist-300 hover:text-rose-400 hover:bg-white/5">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="text-center py-10 text-mist-400">No inquiries here yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={Boolean(viewing)} onClose={() => setViewing(null)} className="sm:max-w-lg" label="Inquiry details">
        {viewing && (
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4 pr-10">
              <h3 className="font-display text-xl text-mist-100">{viewing.name}</h3>
              <StatusBadge status={viewing.status} />
            </div>
            <div className="space-y-2.5 text-sm font-body">
              <Row label="Source" value={sourceOf(viewing)} />
              <Row label="Email" value={viewing.email} />
              <Row label="Phone" value={viewing.phone} />
              <Row label="Destination" value={viewing.destination} />
              <Row label="Travel date" value={viewing.travelDate} />
              <Row label="Travellers" value={viewing.travellers} />
              <Row label="Trip stops" value={viewing.itinerary} />
              <Row label="Received" value={new Date(viewing.date).toLocaleString()} />
              {viewing.message && (
                <div>
                  <p className="text-mist-400 text-xs mb-1">Message</p>
                  <p className="text-mist-100 bg-ink-800 rounded-lg p-3 leading-relaxed whitespace-pre-line">{viewing.message}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Modal open={Boolean(deleting)} onClose={() => setDeleting(null)} className="sm:max-w-sm" label="Delete inquiry">
        {deleting && (
          <div className="p-5">
            <p className="font-body font-semibold text-mist-100 mb-4 pr-10">Delete the inquiry from {deleting.name}?</p>
            <div className="flex gap-2">
              <button onClick={() => setDeleting(null)} className="flex-1 py-2 rounded-full border border-white/10 text-mist-200 text-sm font-body">Cancel</button>
              <button
                onClick={() => {
                  deleteInquiry(deleting.id);
                  setDeleting(null);
                }}
                className="flex-1 py-2 rounded-full bg-rose-500 text-white text-sm font-body font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function Row({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2">
      <span className="text-mist-400 text-xs w-24 shrink-0 pt-0.5">{label}</span>
      <span className="text-mist-100 break-words min-w-0">{value}</span>
    </div>
  );
}
