import SmartImage from "../../components/SmartImage";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { useDestinations, destinationsStore } from "../../services/content";
import StatusBadge from "../components/StatusBadge";
import RegionFilter from "../components/RegionFilter";
import StatusToggle from "../components/StatusToggle";

export default function DestinationsAdmin() {
  const destinations = useDestinations();
  const [query, setQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const filtered = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) &&
      (regionFilter === "All" || d.region === regionFilter)
  );

  const doDelete = (id) => {
    destinationsStore.remove(id);
    setConfirmDeleteId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl text-mist-100">Destinations</h1>
        <Link
          to="/admin/destinations/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-moss-500 text-ink-950 text-sm font-body font-semibold hover:bg-moss-400"
        >
          <Plus size={15} /> Add Destination
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex items-center gap-2 rounded-lg bg-ink-800 border border-white/10 px-3 py-2.5 max-w-sm w-full sm:w-auto">
          <Search size={15} className="text-mist-400 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations…"
            className="w-full bg-transparent outline-none text-sm font-body text-mist-100 placeholder:text-mist-400"
          />
        </div>
        <RegionFilter value={regionFilter} onChange={setRegionFilter} />
      </div>

      <div className="rounded-2xl border border-white/5 bg-ink-850 overflow-x-auto">
        <table className="w-full text-sm font-body min-w-[640px]">
          <thead>
            <tr className="text-left text-mist-400 text-xs border-b border-white/5">
              <th className="py-3 px-4 font-semibold">Image</th>
              <th className="py-3 px-4 font-semibold">Name</th>
              <th className="py-3 px-4 font-semibold">Region</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                <td className="py-2.5 px-4">
                  <SmartImage src={d.image} alt="" className="h-10 w-14 rounded-md object-cover" />
                </td>
                <td className="py-2.5 px-4">
                  <p className="text-mist-100 font-semibold">{d.name}</p>
                  {d.location && <p className="text-mist-400 text-xs">{d.location}</p>}
                </td>
                <td className="py-2.5 px-4 text-mist-400">{d.region}</td>
                <td className="py-2.5 px-4"><StatusBadge status={d.status || "Published"} /></td>
                <td className="py-2.5 px-4">
                  <div className="flex items-center justify-end gap-1.5">
                    <StatusToggle item={d} onChange={(status) => destinationsStore.setStatus(d.id, status)} />
                    <Link
                      to={`/admin/destinations/${d.id}/edit`}
                      aria-label={`Edit ${d.name}`}
                      className="h-8 w-8 rounded-full flex items-center justify-center text-mist-300 hover:text-moss-300 hover:bg-white/5"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button
                      onClick={() => setConfirmDeleteId(d.id)}
                      aria-label={`Delete ${d.name}`}
                      className="h-8 w-8 rounded-full flex items-center justify-center text-mist-300 hover:text-rose-400 hover:bg-white/5"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-mist-400">No destinations match these filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 p-5" onClick={() => setConfirmDeleteId(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl border border-white/10 bg-ink-900 p-5">
            <p className="text-mist-100 font-body font-semibold mb-1.5">Delete this destination?</p>
            <p className="text-mist-400 text-sm font-body mb-5">This removes it from the public site. To hide it temporarily, use the eye icon instead.</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmDeleteId(null)} className="flex-1 py-2 rounded-full border border-white/10 text-mist-200 text-sm font-body">Cancel</button>
              <button onClick={() => doDelete(confirmDeleteId)} className="flex-1 py-2 rounded-full bg-rose-500 text-white text-sm font-body font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
