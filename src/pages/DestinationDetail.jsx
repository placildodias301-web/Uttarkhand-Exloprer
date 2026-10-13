import { useParams, Navigate, Link } from "react-router-dom";
import {
  Star, Clock, Mountain, Thermometer, Tag, MapPin, Plus, Check,
  Compass, Bed, UtensilsCrossed, Car, Sparkles, CalendarDays,
} from "lucide-react";
import SmartImage from "../components/SmartImage";
import RegionBadge from "../components/RegionBadge";
import { useOverlayHeader } from "../hooks/useOverlayHeader";
import { usePublicPackages, getDestinationHighlights, isPublished } from "../services/content";
import { useItineraries } from "../services/itineraries";
import { regionLabel } from "../data/regions";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import DestinationCard from "../components/DestinationCard";
import WhatsAppContactCard from "../components/WhatsAppContactCard";
import { useDestinations } from "../services/content";
import { useItinerary } from "../context/ItineraryContext";

export default function DestinationDetail() {
  useOverlayHeader();
  const { id } = useParams();
  const destinations = useDestinations();
  const destination = destinations.find((d) => d.id === id && isPublished(d));
  const { ids, addDestination } = useItinerary();
  const packages = usePublicPackages("all");
  const itineraries = useItineraries("all");

  if (!destination) return <Navigate to="/destinations" replace />;
  const d = destination;
  const added = ids.includes(d.id);
  const location = d.location || regionLabel(d.region);
  const highlights = getDestinationHighlights(d, 6);
  // Same region first; published only.
  const related = destinations.filter((x) => x.id !== d.id && x.region === d.region && isPublished(x)).slice(0, 3);
  const relatedPackages = packages.filter((p) => (p.destinations || []).includes(d.id));
  const relatedItineraries = itineraries.filter((it) => it.kind === "template" && it.destinationIds.includes(d.id));

  return (
    <div>
      <section className="relative isolate min-h-[66vh] flex items-end">
        <SmartImage src={d.image} fallbackSrc={d.gallery?.[0]} alt={`${d.name}, ${location}`} priority className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/30" />
        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 pt-40 pb-12 w-full">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <RegionBadge region={d.region} onImage />
            <span className="inline-flex items-center gap-1 text-mist-200 text-xs font-body">
              <MapPin size={12} aria-hidden="true" /> {location}
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl text-mist-100 mb-3">{d.name}</h1>
          <p className="text-mist-300 font-body text-lg mb-3">{d.tagline}</p>
          <div className="flex items-center gap-1 text-gold-400 text-sm font-body font-semibold">
            <Star size={14} fill="currentColor" /> {d.rating} <span className="text-mist-400 font-normal">({d.reviews} reviews)</span>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 grid lg:grid-cols-[1fr_320px] gap-12">
        <div>
          <h2 className="font-display text-2xl text-mist-100 mb-4">About {d.name}</h2>
          <p className="text-mist-200 font-body text-[17px] leading-[1.8] mb-8">{d.description}</p>

          {highlights.length > 0 && (
            <div className="mb-12">
              <h2 className="font-display text-2xl text-mist-100 mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-gold-400" aria-hidden="true" /> Highlights
              </h2>
              <ul className="flex flex-wrap gap-2">
                {highlights.map((h) => (
                  <li key={h} className="px-3.5 py-2 rounded-full border border-white/10 bg-ink-850/70 text-mist-100 text-sm font-body">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <h2 className="font-display text-2xl text-mist-100 mb-5 flex items-center gap-2">
            <Compass size={19} className="text-moss-400" /> Attractions
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {(d.attractions || []).map((a) => (
              <div key={a.name} className="p-4 rounded-xl border border-white/5 bg-ink-850">
                <h4 className="font-body font-semibold text-mist-100 text-sm mb-1.5">{a.name}</h4>
                <p className="text-mist-400 text-[13px] font-body leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-display text-2xl text-mist-100 mb-5">Things to Do</h2>
          <div className="flex flex-wrap gap-2 mb-10">
            {(d.activities || []).map((a) => (
              <span key={a} className="px-3.5 py-2 rounded-full bg-ink-850 border border-white/5 text-mist-200 text-sm font-body">
                {a}
              </span>
            ))}
          </div>

          {(d.hotels || []).length > 0 && (<>
          <h2 className="font-display text-2xl text-mist-100 mb-5 flex items-center gap-2">
            <Bed size={19} className="text-moss-400" /> Where to Stay
          </h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
            {(d.hotels || []).map((h) => (
              <div key={h.name} className="p-4 rounded-xl border border-white/5 bg-ink-850">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-body font-semibold text-mist-100 text-sm">{h.name}</h4>
                  <span className="flex items-center gap-1 text-gold-400 text-xs font-body"><Star size={11} fill="currentColor" />{h.rating}</span>
                </div>
                <p className="text-moss-300 text-sm font-display mb-2">{h.price}</p>
                <div className="flex flex-wrap gap-1">
                  {h.facilities.map((f) => (
                    <span key={f} className="text-[10px] font-body text-mist-400 bg-ink-800 rounded-full px-2 py-0.5">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          </>)}

          {(d.cuisine || []).length > 0 && (<>
          <h2 className="font-display text-2xl text-mist-100 mb-5 flex items-center gap-2">
            <UtensilsCrossed size={19} className="text-moss-400" /> Local Food to Try
          </h2>
          <div className="space-y-3 mb-10">
            {(d.cuisine || []).map((c) => (
              <div key={c.name} className="p-4 rounded-xl border border-white/5 bg-ink-850">
                <h4 className="font-body font-semibold text-mist-100 text-sm mb-1">{c.name}</h4>
                <p className="text-mist-400 text-[13px] font-body leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          </>)}

          {(d.gallery || []).length > 0 && (<>
          <h2 className="font-display text-2xl text-mist-100 mb-5">Photo Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {d.gallery.map((g, i) => (
              <SmartImage key={g} src={g} alt={`${d.name}, photo ${i + 1}`} className="aspect-square w-full object-cover rounded-xl" />
            ))}
          </div>
          </>)}
        </div>

        <aside className="space-y-5">
          <div className="lg:sticky lg:top-36 space-y-5">
            <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
              <h3 className="font-display text-lg text-mist-100 mb-4">Trip Facts</h3>
              <div className="space-y-3 text-sm font-body">
                <Fact icon={Clock} label="Best Time to Visit" value={d.bestTime} />
                <Fact icon={Mountain} label="Ideal Duration" value={d.idealDuration} />
                <Fact icon={Tag} label="Famous For" value={d.famousFor} />
                <Fact icon={Thermometer} label="Temperature Range" value={d.tempRange} />
                <Fact icon={MapPin} label="Altitude" value={d.altitude} />
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
              <h3 className="font-display text-lg text-mist-100 mb-3 flex items-center gap-2">
                <Car size={16} className="text-moss-400" /> How to Reach
              </h3>
              <p className="text-mist-400 text-[13px] font-body leading-relaxed">{d.howToReach || "Ask us for the best route from your city."}</p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-ink-850 p-5 space-y-3">
              <WhatsAppContactCard
                title={`Questions about ${d.name}?`}
                message={`Hi! I'd like to know more about visiting ${d.name}.`}
              />
              <Button
                variant={added ? "dark" : "primary"}
                onClick={() => addDestination(d.id)}
                disabled={added}
                className="w-full"
              >
                {added ? <><Check size={15} /> Added to your trip</> : <><Plus size={15} /> Add to Plan My Trip</>}
              </Button>
            </div>
          </div>
        </aside>
      </div>

      {(relatedPackages.length > 0 || relatedItineraries.length > 0) && (
        <section className="border-t border-white/5 py-16">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <SectionHeader kicker="Plans that include it" title={`Packages and itineraries visiting ${d.name}`} />
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...relatedPackages.map((p) => ({ id: p.id, to: `/packages/${p.id}`, name: p.name, image: p.image, meta: `Package · ${p.days}D / ${p.nights}N` })),
                ...relatedItineraries.map((it) => ({ id: it.id, to: `/itinerary/${it.id}`, name: it.name, image: it.cover, meta: `Itinerary · ${it.duration}` }))].map((x) => (
                <li key={x.id}>
                  <Link to={x.to} className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-ink-850/80 p-3 hover:border-white/20 transition-colors">
                    <SmartImage src={x.image} alt="" className="h-16 w-20 rounded-xl object-cover shrink-0" />
                    <div className="min-w-0">
                      <p className="flex items-center gap-1 text-mist-400 text-xs font-body mb-0.5"><CalendarDays size={11} aria-hidden="true" /> {x.meta}</p>
                      <p className="font-display text-lg text-mist-100 leading-snug group-hover:text-moss-400 transition-colors">{x.name}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {related.length > 0 && (
      <section className="bg-ink-900/60 border-t border-white/5 py-16">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <SectionHeader kicker={`More in ${regionLabel(d.region)}`} title="Related destinations" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
            {related.map((r) => (
              <DestinationCard key={r.id} destination={r} />
            ))}
          </div>
        </div>
      </section>
      )}
    </div>
  );
}

function Fact({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={14} className="text-moss-400 mt-0.5 shrink-0" />
      <div>
        <p className="text-mist-400 text-[11px]">{label}</p>
        <p className="text-mist-100 font-semibold">{value}</p>
      </div>
    </div>
  );
}
