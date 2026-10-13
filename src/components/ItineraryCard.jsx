import { Link } from "react-router-dom";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import SmartImage from "./SmartImage";
import RegionBadge from "./RegionBadge";
import { useDestinations } from "../services/content";

// Card for one itinerary from services/itineraries.js → /itinerary/:id
export default function ItineraryCard({ itinerary }) {
  const it = itinerary;
  const destinations = useDestinations();
  const stops = it.destinationIds.map((id) => destinations.find((d) => d.id === id)?.name).filter(Boolean);

  return (
    <Link
      to={`/itinerary/${it.id}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-white/[0.08] bg-ink-850/80 hover:border-white/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-500/70"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <SmartImage
          src={it.cover}
          alt={it.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
        <div className="absolute top-3 left-3">
          <RegionBadge region={it.region} onImage />
        </div>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-ink-950/60 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[11px] font-body font-semibold text-mist-100">
          <CalendarDays size={11} aria-hidden="true" /> {it.duration}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-xl text-mist-100 leading-snug mb-1 flex items-start justify-between gap-2">
          {it.name}
          <ArrowUpRight size={17} className="shrink-0 mt-1 text-mist-400 group-hover:text-moss-400 transition-colors" aria-hidden="true" />
        </h3>
        {it.subtitle && <p className="text-mist-300 text-sm font-body mb-3">{it.subtitle}</p>}
        {stops.length > 0 && (
          <p className="text-mist-400 text-xs font-body leading-relaxed mb-4 line-clamp-2">{stops.join(" → ")}</p>
        )}
        <p className="mt-auto text-xs font-body text-mist-400">
          {it.days.length > 0 ? `${it.days.length}-day plan written out` : "Day plan coming soon"}
        </p>
      </div>
    </Link>
  );
}
