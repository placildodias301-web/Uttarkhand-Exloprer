import { useParams, Navigate, Link } from "react-router-dom";
import { CalendarDays, MapPin, Plus, Check } from "lucide-react";
import Button from "../components/Button";
import ItineraryTimeline from "../components/ItineraryTimeline";
import { getPackage } from "../data/packages";
import { getDestination } from "../data/destinations";
import { useItinerary } from "../context/ItineraryContext";

export default function PackageDetail() {
  const { id } = useParams();
  const pkg = getPackage(id);
  const { ids, addDestination } = useItinerary();

  if (!pkg) return <Navigate to="/packages" replace />;

  const addWholePackage = () => pkg.destinations.forEach((d) => addDestination(d));
  const allAdded = pkg.destinations.every((d) => ids.includes(d));

  return (
    <div>
      <section className="relative h-[50vh] min-h-[340px] flex items-end">
        <img src={pkg.image} alt={pkg.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-transparent" />
        <div className="relative max-w-[1100px] mx-auto px-5 sm:px-8 pb-12 w-full">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-moss-500 text-ink-950 text-xs font-body font-bold mb-4">
            <CalendarDays size={12} /> {pkg.days} Days / {pkg.nights} Nights
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-mist-100 mb-3">{pkg.name}</h1>
          <p className="text-mist-300 font-body text-lg">{pkg.subtitle}</p>
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12 grid lg:grid-cols-[1fr_300px] gap-12">
        <div>
          <h2 className="font-display text-2xl text-mist-100 mb-5">Day-by-Day Itinerary</h2>
          <ItineraryTimeline days={pkg.itinerary} />
        </div>

        <aside>
          <div className="sticky top-24 rounded-2xl border border-white/5 bg-ink-850 p-6">
            <p className="text-mist-400 text-xs font-body mb-1">Starting from</p>
            <p className="font-display text-3xl text-moss-300 mb-1">{pkg.priceFrom}</p>
            <p className="text-mist-400 text-xs font-body mb-6">{pkg.priceUnit}</p>

            <h4 className="font-body font-semibold text-mist-100 text-sm mb-3">Highlights</h4>
            <ul className="space-y-2 mb-6">
              {pkg.highlights.map((h) => (
                <li key={h} className="text-mist-300 text-[13px] font-body flex gap-2">
                  <span className="h-1 w-1 rounded-full bg-moss-400 mt-2 shrink-0" /> {h}
                </li>
              ))}
            </ul>

            <h4 className="font-body font-semibold text-mist-100 text-sm mb-3 flex items-center gap-1.5">
              <MapPin size={13} className="text-moss-400" /> Covers
            </h4>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {pkg.destinations.map((id) => {
                const d = getDestination(id);
                return (
                  <Link
                    key={id}
                    to={`/destinations/${id}`}
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
              {allAdded ? <><Check size={15} /> All Stops Added</> : <><Plus size={15} /> Add Package to Itinerary</>}
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
