import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Heart } from "lucide-react";
import Button from "./Button";
import { getDestination } from "../data/destinations";

export default function PackageCard({ pkg }) {
  return (
    <div className="group rounded-2xl overflow-hidden border border-white/5 bg-ink-850 shadow-card flex flex-col">
      <div className="relative h-56 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-850 to-transparent" />
        {pkg.theme === "honeymoon" && (
          <span className="absolute top-4 left-4 flex items-center gap-1.5 bg-ink-950/70 backdrop-blur px-3 py-1 rounded-full text-rose-300 text-xs font-body font-semibold">
            <Heart size={12} fill="currentColor" /> Couple Special
          </span>
        )}
        <span className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-ink-950/70 backdrop-blur px-3 py-1 rounded-full text-mist-100 text-xs font-body font-semibold">
          <CalendarDays size={12} /> {pkg.days}D / {pkg.nights}N
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl text-mist-100 mb-1">{pkg.name}</h3>
        <p className="text-mist-400 text-sm font-body mb-4">{pkg.subtitle}</p>

        <div className="flex items-center gap-1.5 text-xs text-mist-400 font-body mb-4">
          <MapPin size={13} className="text-moss-400" />
          {pkg.destinations.map((id) => getDestination(id)?.name).join(" · ")}
        </div>

        <ul className="space-y-1.5 mb-6">
          {pkg.highlights.slice(0, 3).map((h) => (
            <li key={h} className="text-mist-300 text-[13px] font-body flex gap-2">
              <span className="text-moss-400 mt-1.5 h-1 w-1 rounded-full bg-moss-400 shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
          <div>
            <p className="text-mist-400 text-[11px] font-body">Starting from</p>
            <p className="font-display text-lg text-moss-300">
              {pkg.priceFrom} <span className="text-mist-400 text-xs font-body">/ {pkg.priceUnit}</span>
            </p>
          </div>
          <Button as={Link} to={`/packages/${pkg.id}`} size="sm">
            View Package
          </Button>
        </div>
      </div>
    </div>
  );
}
