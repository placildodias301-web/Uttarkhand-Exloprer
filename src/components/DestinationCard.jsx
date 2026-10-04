import { Link } from "react-router-dom";
import { ArrowUpRight, Star } from "lucide-react";

export default function DestinationCard({ destination }) {
  const d = destination;
  return (
    <Link
      to={`/destinations/${d.id}`}
      className="group relative block aspect-[4/3] rounded-xl overflow-hidden border border-white/5 bg-ink-850 shadow-card"
    >
      <img
        src={d.image}
        alt={d.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />

      <span
        className="absolute top-2.5 left-2.5 h-6 px-2 rounded-full flex items-center gap-1 text-[10px] font-body font-bold text-ink-950"
        style={{ backgroundColor: d.accent }}
      >
        #{d.order}
      </span>

      <span className="absolute top-2.5 right-2.5 h-7 w-7 rounded-full bg-ink-950/60 backdrop-blur flex items-center justify-center text-mist-100 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight size={13} />
      </span>

      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="flex items-center gap-1 text-gold-400 text-[11px] font-body font-semibold mb-1">
          <Star size={10} fill="currentColor" /> {d.rating}
          <span className="text-mist-400 font-normal">({d.reviews})</span>
        </div>
        <h3 className="font-display text-base text-mist-100 leading-tight mb-0.5 truncate">{d.name}</h3>
        <p className="text-mist-300 text-xs font-body truncate">{d.tagline}</p>
      </div>
    </Link>
  );
}
