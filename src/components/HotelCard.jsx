import { Star, MapPin } from "lucide-react";

export default function HotelCard({ hotel, destinationName, destinationImage }) {
  return (
    <div className="group rounded-2xl overflow-hidden border border-white/5 bg-ink-850 shadow-card flex flex-col">
      <div className="relative h-40 overflow-hidden">
        <img
          src={destinationImage}
          alt={hotel.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-850 via-transparent to-transparent" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-display text-lg text-mist-100 leading-snug">{hotel.name}</h4>
          <span className="flex items-center gap-1 text-gold-400 text-xs font-body font-semibold shrink-0 mt-1">
            <Star size={12} fill="currentColor" /> {hotel.rating}
          </span>
        </div>
        <p className="flex items-center gap-1 text-mist-400 text-xs font-body mb-3">
          <MapPin size={12} className="text-moss-400" /> {destinationName}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hotel.facilities.map((f) => (
            <span key={f} className="text-[11px] font-body text-mist-300 bg-ink-800 border border-white/5 rounded-full px-2.5 py-1">
              {f}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5">
          <span className="font-display text-moss-300">{hotel.price}</span>
          <button className="text-xs font-body font-semibold text-moss-400 hover:text-moss-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
