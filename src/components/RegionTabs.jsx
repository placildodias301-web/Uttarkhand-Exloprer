import { travelSections } from "../data/navigation";
import { useActiveSection, selectTravelSection } from "../services/travelSection";

// Section tabs for the shared list pages (Destinations, Packages,
// Itineraries, Blogs). They drive the same "travel section" state as the top
// navigation row, so the two always agree.
//   includeCombo — show the Combo tab (pages that have Combo content).
export default function RegionTabs({ includeCombo = false, className = "" }) {
  const active = useActiveSection();
  const tabs = travelSections.filter((s) => includeCombo || s.id !== "combo");
  const activeId = tabs.some((t) => t.id === active.id) ? active.id : "all";

  return (
    <div role="tablist" aria-label="Filter by region" className={`no-scrollbar overflow-x-auto ${className}`}>
      <div className="inline-flex rounded-full border border-white/10 bg-ink-850/70 p-1 whitespace-nowrap">
        {tabs.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={activeId === s.id}
            onClick={() => selectTravelSection(s.id)}
            className={`px-4 sm:px-5 py-2 rounded-full text-sm font-body font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-500/70 ${
              activeId === s.id ? "bg-moss-500/[0.14] text-moss-400 shadow-pp-active" : "text-mist-300 hover:text-mist-100"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
