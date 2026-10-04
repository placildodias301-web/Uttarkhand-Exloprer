import { Mountain, TreePalm, Route } from "lucide-react";
import { normalizeRegion, regionLabel } from "../data/regions";

const ICONS = { uttarakhand: Mountain, goa: TreePalm, combo: Route };

// Small region chip ("Uttarakhand" / "Goa" / "Combo") for cards and headers.
export default function RegionBadge({ region, className = "", onImage = false }) {
  const key = normalizeRegion(region);
  if (!key || key === "all") return null;
  const Icon = ICONS[key];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-body font-semibold ${
        onImage ? "bg-ink-950/60 backdrop-blur-md text-mist-100 border border-white/10" : "bg-white/[0.05] text-mist-300 border border-white/10"
      } ${className}`}
    >
      <Icon size={11} className={key === "goa" ? "text-gold-400" : "text-moss-500"} aria-hidden="true" />
      {regionLabel(key)}
    </span>
  );
}
