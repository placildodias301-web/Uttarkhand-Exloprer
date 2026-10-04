import { useState } from "react";
import { Eye } from "lucide-react";
import { useInquiries } from "../../services/inquiries";
import StatusBadge from "../components/StatusBadge";
import Modal from "../../components/Modal";

const STATUSES = ["New", "Contacted", "In Progress", "Resolved"];

export default function Inquiries() {
  const { inquiries, updateInquiryStatus } = useInquiries();
  const [tab, setTab] = useState("All");
  const [viewing, setViewing] = useState(null);

  const filtered = tab === "All" ? inquiries : inquiries.filter((i) => i.status === tab);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl text-mist-100">Inquiries</h1>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {["All", ...STATUSES].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-body font-semibold border transition-colors ${
              tab === t ? "bg-moss-500 text-ink-950 border-moss-500" : "border-white/10 text-mist-300"
            }`}
          >
            {t} {t !== "All" && `(${inquiries.filter((i) => i.status === t).length})`}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/5 bg-ink-850 overflow-x-auto">
        <table className="w-full text-sm font-body min-w-[720px]">
          <thead>
            <tr className="text-left text-mist-400 text-xs border-b border-white/5">
              <th className="py-3 px-4 font-semibold">Name</th>
              <th className="py-3 px-4 font-semibold">Subject</th>
              <th className="py-3 px-4 font-semibold">Date</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((i) => (
              <tr key={i.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                <td className="py-2.5 px-4 text-mist-100 font-semibold">{i.name}</td>
                <td className="py-2.5 px-4 text-mist-400">{i.inquiryType || "General Inquiry"}</td>
                <td className="py-2.5 px-4 text-mist-400">{new Date(i.date).toLocaleDateString()}</td>
                <td className="py-2.5 px-4">
                  <select
                    value={i.status}
                    onChange={(e) => updateInquiryStatus(i.id, e.target.value)}
                    className="bg-ink-800 border border-white/10 rounded-full text-xs font-body px-2.5 py-1 text-mist-200 outline-none"
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="py-2.5 px-4 text-right">
                  <button onClick={() => setViewing(i)} className="h-8 w-8 rounded-full inline-flex items-center justify-center text-mist-300 hover:text-moss-300 hover:bg-white/5">
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="text-center py-10 text-mist-400">No inquiries here yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={Boolean(viewing)} onClose={() => setViewing(null)} className="sm:max-w-lg">
        {viewing && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl text-mist-100">{viewing.name}</h3>
              <StatusBadge status={viewing.status} />
            </div>
            <div className="space-y-3 text-sm font-body">
              <Row label="Email" value={viewing.email} />
              <Row label="Phone" value={viewing.phone} />
              <Row label="Inquiry Type" value={viewing.inquiryType} />
              <Row label="Destination" value={viewing.destination} />
              <Row label="Travel Date" value={viewing.travelDate} />
              <Row label="Date Submitted" value={new Date(viewing.date).toLocaleString()} />
              <div>
                <p className="text-mist-400 text-xs mb-1">Message</p>
                <p className="text-mist-100 bg-ink-800 rounded-lg p-3 leading-relaxed">{viewing.message}</p>
              </div>
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
    <div className="flex items-center gap-2">
      <span className="text-mist-400 text-xs w-28 shrink-0">{label}</span>
      <span className="text-mist-100">{value}</span>
    </div>
  );
}
