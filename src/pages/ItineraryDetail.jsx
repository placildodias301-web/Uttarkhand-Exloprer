import { useParams, Navigate, Link } from "react-router-dom";
import { CalendarDays, ArrowLeft, MapPinned } from "lucide-react";
import SmartImage from "../components/SmartImage";
import RegionBadge from "../components/RegionBadge";
import ItineraryTimeline from "../components/ItineraryTimeline";
import { useOverlayHeader } from "../hooks/useOverlayHeader";
import { usePublicItinerary } from "../services/itineraries";
import { useDestinations } from "../services/content";
import { planTripLink } from "../data/navigation";

export default function ItineraryDetail() {
  useOverlayHeader();
  const { id } = useParams();
  const it = usePublicItinerary(id);
  const destinations = useDestinations();
  if (!it) return <Navigate to="/itinerary" replace />;

  const stops = it.destinationIds.map((d) => destinations.find((x) => x.id === d)).filter(Boolean);
  const stated = parseInt(it.duration, 10);

  return (
    <div>
      <section className="relative isolate min-h-[62vh] flex items-end">
        <SmartImage src={it.cover} alt={it.name} priority className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/30" />
        <div className="max-w-[1200px] mx-auto w-full px-5 sm:px-8 pt-40 pb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <RegionBadge region={it.region} onImage />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-950/60 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[11px] font-body font-semibold text-mist-100">
              <CalendarDays size={11} aria-hidden="true" /> {it.duration}
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl text-mist-100 leading-[1.05] mb-3">{it.name}</h1>
          {it.subtitle && <p className="text-mist-200 font-body text-lg">{it.subtitle}</p>}
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 grid lg:grid-cols-[1fr_300px] gap-10 lg:gap-14 items-start">
        <div className="min-w-0">
          <Link to="/itinerary" className="inline-flex items-center gap-1.5 text-moss-400 hover:text-moss-300 text-sm font-body font-semibold mb-8">
            <ArrowLeft size={14} aria-hidden="true" /> All itineraries
          </Link>
          {it.description && <p className="text-mist-200 font-body text-lg leading-relaxed mb-10 max-w-2xl">{it.description}</p>}
          <h2 className="font-display text-3xl text-mist-100 mb-6">Day by day</h2>
          {it.days.length > 0 && stated > it.days.length && (
            <p className="text-mist-400 text-sm font-body mb-6">
              {it.days.length} of {stated} days are written out so far.
            </p>
          )}
          <ItineraryTimeline days={it.days} />
        </div>

        <aside className="lg:sticky lg:top-36 space-y-4">
          {stops.length > 0 && (
            <div className="rounded-2xl border border-white/[0.08] bg-ink-850/80 p-5">
              <h3 className="font-body font-semibold text-mist-100 text-sm mb-3">Stops on this route</h3>
              <ul className="space-y-2.5">
                {stops.map((d) => (
                  <li key={d.id}>
                    <Link to={`/destinations/${d.id}`} className="flex items-center gap-3 group">
                      <SmartImage src={d.image} alt="" className="h-11 w-11 rounded-lg object-cover shrink-0" />
                      <span className="text-sm font-body text-mist-200 group-hover:text-moss-400">{d.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="rounded-2xl border border-white/[0.08] bg-ink-850/80 p-5 space-y-3">
            {it.priceFrom && (
              <p className="text-mist-300 text-sm font-body">
                From <span className="font-display text-xl text-mist-100">{it.priceFrom}</span>
                {!/request/i.test(it.priceFrom) && <span className="text-mist-400 text-xs"> / {it.priceUnit}</span>}
              </p>
            )}
            {it.packageId && (
              <Link to={`/packages/${it.packageId}`} className="block text-center rounded-full border border-white/15 px-4 py-2.5 text-sm font-body font-semibold text-mist-100 hover:border-moss-500/60">
                View the package
              </Link>
            )}
            <Link to={planTripLink.to} className="flex items-center justify-center gap-2 rounded-full bg-moss-500 px-4 py-2.5 text-sm font-body font-semibold text-ink-950 hover:bg-moss-400">
              <MapPinned size={15} aria-hidden="true" /> {planTripLink.label}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
