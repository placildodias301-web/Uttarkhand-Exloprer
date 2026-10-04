import SmartImage from "../../components/SmartImage";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { usePackages, packagesStore } from "../../services/content";
import StatusBadge from "../components/StatusBadge";
import RegionFilter from "../components/RegionFilter";
import StatusToggle from "../components/StatusToggle";
import { contentRegionNames, normalizeRegion } from "../../data/regions";

export default function PackagesAdmin() {
  const packages = usePackages();
  const [query, setQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const filtered = packages.filter(
    (p) => p.name.toLowerCase().includes(query.toLowerCase()) && (regionFilter === "All" || normalizeRegion(p.region) === normalizeRegion(regionFilter))
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl text-mist-100">Packages</h1>
        <Link
          to="/admin/packages/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-moss-500 text-ink-950 text-sm font-body font-semibold hover:bg-moss-400"
        >
          <Plus size={15} /> Add Package
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex items-center gap-2 rounded-lg bg-ink-800 border border-white/10 px-3 py-2.5 max-w-sm w-full sm:w-auto">
          <Search size={15} className="text-mist-400 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search packages…"
            className="w-full bg-transparent outline-none text-sm font-body text-mist-100 placeholder:text-mist-400"
          />
        </div>
        <RegionFilter value={regionFilter} onChange={setRegionFilter} options={contentRegionNames} />
      </div>

      <div className="rounded-2xl border border-white/5 bg-ink-850 overflow-x-auto">
        <table className="w-full text-sm font-body min-w-[760px]">
          <thead>
            <tr className="text-left text-mist-400 text-xs border-b border-white/5">
              <th className="py-3 px-4 font-semibold">Image</th>
              <th className="py-3 px-4 font-semibold">Title</th>
              <th className="py-3 px-4 font-semibold">Region</th>
              <th className="py-3 px-4 font-semibold">Duration</th>
              <th className="py-3 px-4 font-semibold">Price</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                <td className="py-2.5 px-4"><SmartImage src={p.image} alt="" className="h-10 w-14 rounded-md object-cover" /></td>
                <td className="py-2.5 px-4 text-mist-100 font-semibold">{p.name}</td>
                <td className="py-2.5 px-4 text-mist-400">{p.region}</td>
                <td className="py-2.5 px-4 text-mist-400">{p.days}D / {p.nights}N<span className="block text-[11px] text-mist-400/70">{(p.itinerary || []).length} days planned</span></td>
                <td className="py-2.5 px-4 text-mist-400">{p.priceFrom}</td>
                <td className="py-2.5 px-4"><StatusBadge status={p.status || "Published"} /></td>
                <td className="py-2.5 px-4">
                  <div className="flex items-center justify-end gap-1.5">
                    <StatusToggle item={p} onChange={(status) => packagesStore.setStatus(p.id, status)} />
                    <Link to={`/admin/packages/${p.id}/edit`} aria-label={`Edit ${p.name}`} className="h-8 w-8 rounded-full flex items-center justify-center text-mist-300 hover:text-moss-300 hover:bg-white/5">
                      <Pencil size={14} />
                    </Link>
                    <button onClick={() => setConfirmDeleteId(p.id)} aria-label={`Delete ${p.name}`} className="h-8 w-8 rounded-full flex items-center justify-center text-mist-300 hover:text-rose-400 hover:bg-white/5">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="text-center py-10 text-mist-400">No packages match these filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 p-5" onClick={() => setConfirmDeleteId(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl border border-white/10 bg-ink-900 p-5">
            <p className="text-mist-100 font-body font-semibold mb-1.5">Delete this package?</p>
            <p className="text-mist-400 text-sm font-body mb-5">This removes it from the public site.</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmDeleteId(null)} className="flex-1 py-2 rounded-full border border-white/10 text-mist-200 text-sm font-body">Cancel</button>
              <button
                onClick={() => {
                  packagesStore.remove(confirmDeleteId);
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
