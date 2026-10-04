import SmartImage from "../../components/SmartImage";
import { useState } from "react";
import { Check, X, Eye, Trash2 } from "lucide-react";
import { useGallerySubmissions } from "../../services/gallerySubmissions";
import StatusBadge from "../components/StatusBadge";
import Modal from "../../components/Modal";

export default function GalleryModeration() {
  const { submissions, pending, approved, rejected, approveSubmission, rejectSubmission, deleteSubmission } = useGallerySubmissions();
  const [deleting, setDeleting] = useState(null);
  const [tab, setTab] = useState("pending");
  const [viewing, setViewing] = useState(null);
  const [rejecting, setRejecting] = useState(null);
  const [reason, setReason] = useState("");

  const lists = { all: submissions, pending, approved, rejected };
  const list = lists[tab];

  const confirmReject = () => {
    rejectSubmission(rejecting.id, reason);
    setRejecting(null);
    setReason("");
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-mist-100">Gallery</h1>
        <p className="text-mist-400 text-sm font-body mt-1">Visitor photos. Only approved photos appear in the public gallery.</p>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {["all", "pending", "approved", "rejected"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-body font-semibold capitalize border transition-colors ${
              tab === t ? "bg-moss-500 text-ink-950 border-moss-500" : "border-white/10 text-mist-300"
            }`}
          >
            {t} {t !== "all" && `(${lists[t].length})`}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((s) => (
          <div key={s.id} className="rounded-2xl border border-white/5 bg-ink-850 overflow-hidden">
            <div className="relative h-36">
              <SmartImage src={s.image} alt="" className="h-full w-full object-cover" />
              <div className="absolute top-2 right-2"><StatusBadge status={s.status} /></div>
            </div>
            <div className="p-4">
              <p className="font-body font-semibold text-mist-100 text-sm mb-0.5 truncate">{s.title || "Untitled"}</p>
              <p className="text-mist-400 text-xs font-body mb-0.5">{s.place}{s.region ? ` · ${s.region}` : ""}</p>
              <p className="text-mist-400 text-xs font-body mb-0.5 truncate">By {s.visitorName} ({s.email})</p>
              <p className="text-mist-400 text-xs font-body mb-3">Submitted {new Date(s.date).toLocaleDateString()}</p>
              <div className="flex items-center gap-1.5">
                <button onClick={() => setViewing(s)} aria-label="View details" className="h-8 w-8 rounded-full flex items-center justify-center text-mist-300 hover:text-moss-300 hover:bg-white/5 border border-white/10">
                  <Eye size={13} />
                </button>
                {s.status !== "approved" && (
                  <button onClick={() => approveSubmission(s.id)} className="flex-1 py-1.5 rounded-full bg-moss-500/10 text-moss-400 text-xs font-body font-semibold hover:bg-moss-500 hover:text-ink-950">
                    <Check size={12} className="inline mr-1" /> Approve
                  </button>
                )}
                {s.status !== "rejected" && (
                  <button onClick={() => setRejecting(s)} className="flex-1 py-1.5 rounded-full bg-rose-500/10 text-rose-400 text-xs font-body font-semibold hover:bg-rose-500 hover:text-white">
                    <X size={12} className="inline mr-1" /> Reject
                  </button>
                )}
                <button onClick={() => setDeleting(s)} aria-label="Delete submission" className="h-8 w-8 rounded-full flex items-center justify-center text-mist-400 hover:text-rose-400 hover:bg-white/5 shrink-0">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {list.length === 0 && <p className="text-mist-400 font-body text-sm col-span-full py-10 text-center">Nothing here yet.</p>}
      </div>

      <Modal open={Boolean(viewing)} onClose={() => setViewing(null)} className="sm:max-w-lg">
        {viewing && (
          <div>
            <SmartImage src={viewing.image} alt="" className="w-full max-h-[60vh] object-contain bg-ink-950" />
            <div className="p-5">
              <p className="font-display text-lg text-mist-100 mb-1">{viewing.title}</p>
              <p className="text-mist-400 text-sm font-body mb-1">{viewing.place}{viewing.region ? ` · ${viewing.region}` : ""}</p>
              <p className="text-mist-400 text-sm font-body mb-3">
                {viewing.visitorName} ({viewing.email}) · {new Date(viewing.date).toLocaleString()} · <span className="capitalize">{viewing.status}</span>
              </p>
              {viewing.caption && <p className="text-mist-300 text-sm font-body mb-3">"{viewing.caption}"</p>}
              {viewing.rejectionReason && (
                <p className="text-rose-300 text-xs font-body bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                  Rejected: {viewing.rejectionReason}
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Modal open={Boolean(deleting)} onClose={() => setDeleting(null)} className="sm:max-w-sm" label="Delete submission">
        {deleting && (
          <div className="p-5">
            <p className="font-body font-semibold text-mist-100 mb-1.5 pr-10">Delete this submission?</p>
            <p className="text-mist-400 text-sm font-body mb-4">The photo is removed permanently, including from the public gallery.</p>
            <div className="flex gap-2">
              <button onClick={() => setDeleting(null)} className="flex-1 py-2 rounded-full border border-white/10 text-mist-200 text-sm font-body">Cancel</button>
              <button
                onClick={() => {
                  deleteSubmission(deleting.id);
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

      <Modal open={Boolean(rejecting)} onClose={() => setRejecting(null)} className="sm:max-w-sm">
        {rejecting && (
          <div className="p-5">
            <p className="font-body font-semibold text-mist-100 mb-3">Reject this submission?</p>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Optional reason (shown for your records only)"
              rows={3}
              className="w-full rounded-lg bg-ink-800 border border-white/10 px-3 py-2.5 text-sm font-body text-mist-100 placeholder:text-mist-400 outline-none focus:border-moss-500/50 mb-4"
            />
            <div className="flex gap-2">
              <button onClick={() => setRejecting(null)} className="flex-1 py-2 rounded-full border border-white/10 text-mist-200 text-sm font-body">Cancel</button>
              <button onClick={confirmReject} className="flex-1 py-2 rounded-full bg-rose-500 text-white text-sm font-body font-semibold">Reject</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
