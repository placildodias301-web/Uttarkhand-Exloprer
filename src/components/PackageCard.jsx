import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Heart } from "lucide-react";
import SmartImage from "./SmartImage";
import RegionBadge from "./RegionBadge";
import { useDestinations } from "../services/content";

export default function PackageCard({ pkg }) {
  const destinations = useDestinations();
  const getDestName = (id) => destinations.find((d) => d.id === id)?.name;
  const stops = (pkg.destinations || []).map(getDestName).filter(Boolean);

  return (
    <article className="group rounded-2xl overflow-hidden border border-white/[0.08] bg-ink-850/80 shadow-card flex flex-col transition-colors hover:border-white/15">
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage
          src={pkg.image}
          alt={pkg.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-850 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <RegionBadge region={pkg.region} onImage />
          {pkg.theme === "honeymoon" && (
            <span className="inline-flex items-center gap-1.5 bg-ink-950/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-rose-200 text-[11px] font-body font-semibold">
              <Heart size={11} fill="currentColor" aria-hidden="true" /> Couple special
            </span>
          )}
        </div>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-ink-950/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-mist-100 text-[11px] font-body font-semibold">
          <CalendarDays size={11} aria-hidden="true" /> {pkg.days}D / {pkg.nights}N
        </span>
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl text-mist-100 leading-snug mb-1">{pkg.name}</h3>
        <p className="text-mist-300 text-sm font-body mb-4">{pkg.subtitle}</p>

        {stops.length > 0 && (
          <p className="flex items-start gap-1.5 text-xs text-mist-400 font-body mb-4">
            <MapPin size={13} className="text-moss-500 mt-px shrink-0" aria-hidden="true" />
            <span>{stops.join(" → ")}</span>
          </p>
        )}

        <ul className="space-y-1.5 mb-6">
          {(pkg.highlights || []).slice(0, 3).map((h) => (
            <li key={h} className="text-mist-300 text-[13px] font-body flex gap-2">
              <span className="mt-2 h-1 w-1 rounded-full bg-gold-400 shrink-0" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4 border-t border-white/[0.07]">
          <div>
            <p className="text-mist-400 text-[11px] font-body">Starting from</p>
            <p className="font-display text-lg text-mist-100">
              {pkg.priceFrom}{" "}
              {pkg.priceFrom && !/request/i.test(pkg.priceFrom) && (
                <span className="text-mist-400 text-xs font-body">/ {pkg.priceUnit}</span>
              )}
            </p>
          </div>
          <Link
            to={`/packages/${pkg.id}`}
            className="inline-flex items-center rounded-full bg-moss-500 px-4 py-2 text-sm font-body font-semibold text-ink-950 hover:bg-moss-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-850"
            aria-label={`View package: ${pkg.name}`}
          >
            View package
          </Link>
        </div>
      </div>
    </article>
  );
}
