import { useRegion } from "../services/region";

// Pill tabs for switching between Uttarakhand and Goa on list pages.
export default function RegionTabs({ className = "" }) {
  const { region, regions, setRegion } = useRegion();

  return (
    <div className={`inline-flex rounded-full border border-white/10 bg-ink-850 p-1 ${className}`}>
      {regions.map((r) => (
        <button
          key={r.id}
          onClick={() => setRegion(r.id)}
          className={`px-5 py-2 rounded-full text-sm font-body font-semibold transition-colors ${
            region.id === r.id ? "bg-moss-500 text-ink-950" : "text-mist-300 hover:text-mist-100"
          }`}
        >
          {r.name}
        </button>
      ))}
    </div>
  );
}
