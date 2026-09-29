import { regionNames } from "../../data/regions";

// "All | Uttarakhand | Goa" filter pills used on the admin list pages.
export default function RegionFilter({ value, onChange }) {
  return (
    <div className="flex gap-1.5">
      {["All", ...regionNames].map((name) => (
        <button
          key={name}
          onClick={() => onChange(name)}
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
