import { MapPin } from "lucide-react";

export default function CuisineCard({ dish, destinationName, destinationImage }) {
  return (
    <div className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-ink-850 hover:border-moss-500/30 transition-colors">
      <img
        src={destinationImage}
        alt={dish.name}
        loading="lazy"
        className="h-20 w-20 rounded-xl object-cover shrink-0"
      />
      <div className="min-w-0">
        <h4 className="font-display text-base text-mist-100 mb-1">{dish.name}</h4>
        <p className="text-mist-400 text-[13px] font-body leading-relaxed mb-2 line-clamp-2">{dish.desc}</p>
        <p className="flex items-center gap-1 text-moss-400 text-xs font-body font-semibold">
          <MapPin size={11} /> {destinationName}
        </p>
      </div>
    </div>
  );
}
