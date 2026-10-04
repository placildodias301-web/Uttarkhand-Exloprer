import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { useItineraryTemplates } from "../../services/itineraryTemplates";
import StatusBadge from "../components/StatusBadge";

export default function ItinerariesAdmin() {
  const { templates, updateItineraryTemplate, deleteItineraryTemplate } = useItineraryTemplates();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const filtered = templates.filter((t) => {
    const matchesQuery = t.name.toLowerCase().includes(query.toLowerCase());
    const matchesTab = tab === "all" || t.status === tab;
    return matchesQuery && matchesTab;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl text-mist-100">Itineraries</h1>
        <Link to="/admin/itineraries/new" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-moss-500 text-ink-950 text-sm font-body font-semibold hover:bg-moss-400">
          <Plus size={15} /> Add Itinerary
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex items-center gap-2 rounded-lg bg-ink-800 border border-white/10 px-3 py-2.5 max-w-sm w-full sm:w-auto">
          <Search size={15} className="text-mist-400 shrink-0" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search itineraries…" className="w-full bg-transparent outline-none text-sm font-body text-mist-100 placeholder:text-mist-400" />
        </div>
        <div className="flex gap-1.5">
          {["all", "published", "draft"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold capitalize border transition-colors ${
                tab === t ? "bg-moss-500 text-ink-950 border-moss-500" : "border-white/10 text-mist-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <div key={t.id} className="rounded-2xl border border-white/5 bg-ink-850 overflow-hidden">
            <div className="relative h-32">
              <img src={t.coverImage} alt="" className="h-full w-full object-cover" />
              <div className="absolute top-2 right-2"><StatusBadge status={t.status} /></div>
            </div>
            <div className="p-4">
              <p className="font-display text-base text-mist-100 mb-0.5">{t.name}</p>
              <p className="text-mist-400 text-xs font-body mb-3">{t.subname}</p>
              <div className="flex items-center gap-1.5">
                <Link to={`/admin/itineraries/${t.id}/edit`} className="flex-1 text-center py-1.5 rounded-full border border-white/10 text-mist-200 text-xs font-body font-semibold hover:border-moss-500/40">
                  <Pencil size={12} className="inline mr-1" /> Edit
                </Link>
                <button
                  onClick={() => updateItineraryTemplate(t.id, { status: t.status === "published" ? "draft" : "published" })}
                  className="flex-1 py-1.5 rounded-full bg-ink-800 border border-white/10 text-mist-200 text-xs font-body font-semibold hover:border-moss-500/40"
                >
                  {t.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button onClick={() => setConfirmDeleteId(t.id)} className="h-8 w-8 rounded-full flex items-center justify-center text-mist-300 hover:text-rose-400 hover:bg-white/5 shrink-0">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-mist-400 font-body text-sm col-span-full py-10 text-center">No itineraries match.</p>}
      </div>

      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 p-5" onClick={() => setConfirmDeleteId(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl border border-white/10 bg-ink-900 p-5">
            <p className="text-mist-100 font-body font-semibold mb-1.5">Delete this itinerary?</p>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setConfirmDeleteId(null)} className="flex-1 py-2 rounded-full border border-white/10 text-mist-200 text-sm font-body">Cancel</button>
              <button
                onClick={() => {
                  deleteItineraryTemplate(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="flex-1 py-2 rounded-full bg-rose-500 text-white text-sm font-body font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
