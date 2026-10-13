import { regionNames } from "../../data/regions";

// "All | Uttarakhand | Goa (| Combo)" filter pills used on the admin list pages.
export default function RegionFilter({ value, onChange, options = regionNames }) {
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by region">
      {["All", ...options].map((name) => (
        <button
          key={name}
          onClick={() => onChange(name)}
          aria-pressed={value === name}
          className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold border transition-colors ${
            value === name ? "bg-moss-500 text-ink-950 border-moss-500" : "border-white/10 text-mist-300 hover:border-moss-500/40"
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
