import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Hotel, UtensilsCrossed, Compass, Package } from "lucide-react";
import Modal from "./Modal";
import { runSearch } from "../utils/search";

const icons = {
  Destination: MapPin,
  Attraction: Compass,
  Activity: Compass,
  Hotel: Hotel,
  Cuisine: UtensilsCrossed,
  Package: Package,
};

export default function SearchBar({ open, onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const results = useMemo(() => runSearch(query), [query]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const go = (href) => {
    navigate(href);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} className="sm:max-w-xl">
      <div className="p-5 border-b border-white/10 flex items-center gap-3">
        <Search size={18} className="text-moss-400 shrink-0" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destinations, hotels, attractions, packages…"
          className="w-full bg-transparent outline-none font-body text-mist-100 placeholder:text-mist-400 text-[15px]"
        />
      </div>
      <div className="max-h-[60vh] overflow-y-auto py-2">
        {query && results.length === 0 && (
          <p className="text-mist-400 text-sm px-5 py-8 text-center font-body">
            No results for "{query}" — try a destination or activity name.
          </p>
        )}
        {results.map((r) => {
          const Icon = icons[r.type] ?? MapPin;
          return (
            <button
              key={`${r.type}-${r.id}`}
              onClick={() => go(r.href)}
              className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/5 text-left transition-colors"
            >
              <span className="h-9 w-9 rounded-full bg-ink-800 flex items-center justify-center text-moss-400 shrink-0">
                <Icon size={16} />
              </span>
              <span className="min-w-0">
                <span className="block text-mist-100 font-body text-sm font-semibold truncate">{r.title}</span>
                <span className="block text-mist-400 font-body text-xs truncate">{r.subtitle}</span>
              </span>
              <span className="ml-auto text-[11px] font-body uppercase tracking-wide text-mist-400 border border-white/10 rounded-full px-2 py-0.5 shrink-0">
                {r.type}
              </span>
            </button>
          );
        })}
        {!query && (
          <p className="text-mist-400 text-sm px-5 py-8 text-center font-body">
            Try "Auli", "rafting", or "honeymoon".
          </p>
        )}
      </div>
    </Modal>
  );
}
