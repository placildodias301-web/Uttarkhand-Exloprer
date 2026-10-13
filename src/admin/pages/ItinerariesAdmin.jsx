import SmartImage from "../../components/SmartImage";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Pencil, Trash2, Package as PackageIcon } from "lucide-react";
import { useItineraryTemplates } from "../../services/itineraryTemplates";
import { useItineraries } from "../../services/itineraries";
import StatusBadge from "../components/StatusBadge";
import RegionFilter from "../components/RegionFilter";
import { contentRegionNames, normalizeRegion, regionLabel } from "../../data/regions";

// Two sources of day-by-day itineraries (see services/itineraries.js):
// itinerary templates (edited here) and package itineraries (edited in the
// package form). Both are listed so the admin sees everything the public
// site can show.
export default function ItinerariesAdmin() {
  const { updateItineraryTemplate, deleteItineraryTemplate } = useItineraryTemplates();
  const all = useItineraries("all", { includeHidden: true });
  const [query, setQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [kind, setKind] = useState("all");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const filtered = all.filter(
    (it) =>
      it.name.toLowerCase().includes(query.toLowerCase()) &&
      (regionFilter === "All" || it.region === normalizeRegion(regionFilter)) &&
      (kind === "all" || it.kind === kind)
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl text-mist-100">Itineraries</h1>
          <p className="text-mist-400 text-sm font-body mt-1">
            Templates are edited here; package itineraries are edited inside their package.
          </p>
        </div>
        <Link to="/admin/itineraries/new" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-moss-500 text-ink-950 text-sm font-body font-semibold hover:bg-moss-400">
          <Plus size={15} /> Add Itinerary
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex items-center gap-2 rounded-lg bg-ink-800 border border-white/10 px-3 py-2.5 max-w-sm w-full sm:w-auto">
          <Search size={15} className="text-mist-400 shrink-0" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search itineraries…" aria-label="Search itineraries" className="w-full bg-transparent outline-none text-sm font-body text-mist-100 placeholder:text-mist-400" />
        </div>
        <RegionFilter value={regionFilter} onChange={setRegionFilter} options={contentRegionNames} />
        <div className="flex gap-1.5" role="group" aria-label="Filter by source">
          {[
            ["all", "All sources"],
            ["template", "Templates"],
            ["package", "From packages"],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() => setKind(value)}
              aria-pressed={kind === value}
              className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold border transition-colors ${
                kind === value ? "bg-moss-500 text-ink-950 border-moss-500" : "border-white/10 text-mist-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((it) => {
          const isTemplate = it.kind === "template";
          return (
            <div key={it.id} className="rounded-2xl border border-white/5 bg-ink-850 overflow-hidden flex flex-col">
              <div className="relative h-32 bg-ink-800">
                <SmartImage src={it.cover} alt="" className="h-full w-full object-cover" />
                <div className="absolute top-2 left-2 flex gap-1.5">
                  {it.region && <span className="rounded-full bg-ink-950/70 px-2 py-0.5 text-[11px] font-body text-mist-100">{regionLabel(it.region)}</span>}
                  {!isTemplate && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-ink-950/70 px-2 py-0.5 text-[11px] font-body text-gold-300">
                      <PackageIcon size={10} /> Package
                    </span>
                  )}
                </div>
                <div className="absolute top-2 right-2"><StatusBadge status={it.status || "published"} /></div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <p className="font-display text-base text-mist-100 mb-0.5">{it.name}</p>
                <p className="text-mist-400 text-xs font-body mb-1">{it.subtitle}</p>
                <p className="text-mist-400 text-xs font-body mb-3">
                  {it.duration} · {it.days.length} {it.days.length === 1 ? "day" : "days"} written
                </p>
                <div className="mt-auto flex items-center gap-1.5">
                  {isTemplate ? (
                    <>
                      <Link to={`/admin/itineraries/${it.id}/edit`} className="flex-1 text-center py-1.5 rounded-full border border-white/10 text-mist-200 text-xs font-body font-semibold hover:border-moss-500/40">
                        <Pencil size={12} className="inline mr-1" /> Edit
                      </Link>
                      <button
                        onClick={() => updateItineraryTemplate(it.id, { status: it.published ? "disabled" : "published" })}
                        className="flex-1 py-1.5 rounded-full bg-ink-800 border border-white/10 text-mist-200 text-xs font-body font-semibold hover:border-moss-500/40"
                      >
                        {it.published ? "Disable" : "Enable"}
                      </button>
                      <button onClick={() => setConfirmDeleteId(it.id)} aria-label={`Delete ${it.name}`} className="h-8 w-8 rounded-full flex items-center justify-center text-mist-300 hover:text-rose-400 hover:bg-white/5 shrink-0">
                        <Trash2 size={14} />
                      </button>
                    </>
                  ) : (
                    <Link to={`/admin/packages/${it.packageId}/edit`} className="flex-1 text-center py-1.5 rounded-full border border-white/10 text-mist-200 text-xs font-body font-semibold hover:border-moss-500/40">
                      <Pencil size={12} className="inline mr-1" /> Edit in package
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <p className="text-mist-400 font-body text-sm col-span-full py-10 text-center">No itineraries match.</p>}
      </div>

      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 p-5" onClick={() => setConfirmDeleteId(null)}>
          <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl border border-white/10 bg-ink-900 p-5">
            <p className="text-mist-100 font-body font-semibold mb-1.5">Delete this itinerary?</p>
            <p className="text-mist-400 text-sm font-body">To hide it instead, use Disable.</p>
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
