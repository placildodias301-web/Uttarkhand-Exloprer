import { Link } from "react-router-dom";
import { ArrowUpRight, Star, MapPin } from "lucide-react";
import SmartImage from "./SmartImage";
import RegionBadge from "./RegionBadge";
import { regionLabel } from "../data/regions";

// Destination card → /destinations/:id (full details, packages, itineraries).
export default function DestinationCard({ destination, showDescription = true, className = "" }) {
  const d = destination;
  const location = d.location || regionLabel(d.region);

  return (
    <Link
      to={`/destinations/${d.id}`}
      className={`group relative block aspect-[4/5] rounded-2xl overflow-hidden border border-white/[0.08] bg-ink-850 shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-500/70 ${className}`}
    >
      <SmartImage
        src={d.image}
        fallbackSrc={d.gallery?.[0]}
        alt={`${d.name}, ${location}`}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-transparent" />

      <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
        <RegionBadge region={d.region} onImage />
        {d.rating ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-ink-950/60 backdrop-blur-md border border-white/10 px-2 py-1 text-[11px] font-body font-semibold text-gold-300">
            <Star size={10} fill="currentColor" aria-hidden="true" /> {d.rating}
          </span>
        ) : null}
      </div>

      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
        <p className="flex items-center gap-1 text-mist-300 text-[11px] font-body mb-1.5">
          <MapPin size={11} aria-hidden="true" /> {location}
        </p>
        <h3 className="font-display text-xl sm:text-[1.4rem] text-mist-100 leading-tight mb-1 flex items-center gap-1.5">
          <span className="truncate">{d.name}</span>
          <ArrowUpRight size={16} className="shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-moss-400" aria-hidden="true" />
        </h3>
        {showDescription && (
          <p className="text-mist-300 text-[13px] font-body leading-snug line-clamp-2">{d.shortDescription || d.tagline}</p>
        )}
      </div>
    </Link>
  );
}
