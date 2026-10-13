import { useParams, Navigate, Link } from "react-router-dom";
import { CalendarDays, MapPin, Plus, Check, MapPinned } from "lucide-react";
import Button from "../components/Button";
import SmartImage from "../components/SmartImage";
import RegionBadge from "../components/RegionBadge";
import ItineraryTimeline from "../components/ItineraryTimeline";
import { useOverlayHeader } from "../hooks/useOverlayHeader";
import { usePackages, useDestinations, isPublished } from "../services/content";
import { useItinerary } from "../context/ItineraryContext";
import { planTripLink } from "../data/navigation";

export default function PackageDetail() {
  useOverlayHeader();
  const { id } = useParams();
  const packages = usePackages();
  const destinations = useDestinations();
  const pkg = packages.find((p) => p.id === id && isPublished(p));
  const getDestination = (destId) => destinations.find((d) => d.id === destId);
  const { ids, addDestination } = useItinerary();

  if (!pkg) return <Navigate to="/packages" replace />;

  // Only stops that still exist (a destination may have been deleted in admin).
  const stops = (pkg.destinations || []).map(getDestination).filter(Boolean);
  const addWholePackage = () => stops.forEach((d) => addDestination(d.id));
  const allAdded = stops.length > 0 && stops.every((d) => ids.includes(d.id));

  return (
    <div>
      <section className="relative isolate min-h-[60vh] flex items-end">
        <SmartImage src={pkg.image} alt={pkg.name} priority className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/30" />
        <div className="relative max-w-[1100px] mx-auto px-5 sm:px-8 pt-40 pb-12 w-full">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <RegionBadge region={pkg.region} onImage />
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink-950/60 backdrop-blur-md border border-white/10 text-mist-100 text-[11px] font-body font-semibold">
              <CalendarDays size={11} aria-hidden="true" /> {pkg.days} Days / {pkg.nights} Nights
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl text-mist-100 leading-[1.05] mb-3">{pkg.name}</h1>
          <p className="text-mist-300 font-body text-lg">{pkg.subtitle}</p>
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12 grid lg:grid-cols-[1fr_300px] gap-12">
        <div className="min-w-0">
          {pkg.description && <p className="text-mist-200 font-body text-[17px] leading-[1.8] mb-10">{pkg.description}</p>}
          <h2 className="font-display text-3xl text-mist-100 mb-6">Day-by-day itinerary</h2>
          <ItineraryTimeline days={pkg.itinerary} />
        </div>

        <aside>
          <div className="lg:sticky lg:top-36 rounded-2xl border border-white/[0.08] bg-ink-850/80 p-6">
            <p className="text-mist-400 text-xs font-body mb-1">Starting from</p>
            <p className="font-display text-3xl text-mist-100 mb-1">{pkg.priceFrom}</p>
            <p className="text-mist-400 text-xs font-body mb-6">{/request/i.test(pkg.priceFrom || "") ? "Priced for your dates and group" : pkg.priceUnit}</p>

            <h4 className="font-body font-semibold text-mist-100 text-sm mb-3">Highlights</h4>
            <ul className="space-y-2 mb-6">
              {(pkg.highlights || []).map((h) => (
                <li key={h} className="text-mist-300 text-[13px] font-body flex gap-2">
                  <span className="h-1 w-1 rounded-full bg-moss-400 mt-2 shrink-0" /> {h}
                </li>
              ))}
            </ul>

            <h4 className="font-body font-semibold text-mist-100 text-sm mb-3 flex items-center gap-1.5">
              <MapPin size={13} className="text-moss-400" /> Covers
            </h4>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {stops.map((d) => {
                return (
                  <Link
                    key={d.id}
                    to={`/destinations/${d.id}`}
                    className="text-xs font-body text-mist-200 bg-ink-800 border border-white/5 rounded-full px-2.5 py-1 hover:border-moss-500/40"
                  >
                    {d.name}
                  </Link>
                );
              })}
            </div>

            <Button
              variant={allAdded ? "dark" : "primary"}
              onClick={addWholePackage}
              disabled={allAdded}
              className="w-full"
            >
              {allAdded ? <><Check size={15} /> All stops added</> : <><Plus size={15} /> Add stops to my trip</>}
            </Button>
            <Link
              to={planTripLink.to}
              className="mt-3 flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-body font-semibold text-mist-100 hover:border-moss-500/60"
            >
              <MapPinned size={15} aria-hidden="true" /> {planTripLink.label}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
