import { useParams, Navigate } from "react-router-dom";
import {
  Star, Clock, Mountain, Thermometer, Tag, MapPin, Plus, Check,
  ArrowRight, Compass, Bed, UtensilsCrossed, Car,
} from "lucide-react";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import DestinationCard from "../components/DestinationCard";
import WhatsAppContactCard from "../components/WhatsAppContactCard";
import { destinations, getDestination } from "../data/destinations";
import { useItinerary } from "../context/ItineraryContext";

export default function DestinationDetail() {
  const { id } = useParams();
  const destination = getDestination(id);
  const { ids, addDestination } = useItinerary();

  if (!destination) return <Navigate to="/destinations" replace />;
  const d = destination;
  const added = ids.includes(d.id);
  const related = destinations.filter((x) => x.id !== d.id).slice(0, 3);

  return (
    <div>
      <section className="relative h-[56vh] min-h-[380px] flex items-end">
        <img src={d.image} alt={d.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 pb-12 w-full">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-body font-bold text-ink-950 mb-4" style={{ backgroundColor: d.accent }}>
            Stop {d.order} of 6
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-mist-100 mb-3">{d.name}</h1>
          <p className="text-mist-300 font-body text-lg mb-3">{d.tagline}</p>
          <div className="flex items-center gap-1 text-gold-400 text-sm font-body font-semibold">
            <Star size={14} fill="currentColor" /> {d.rating} <span className="text-mist-400 font-normal">({d.reviews} reviews)</span>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 grid lg:grid-cols-[1fr_320px] gap-12">
        <div>
          <h2 className="font-display text-2xl text-mist-100 mb-4">About {d.name}</h2>
          <p className="text-mist-300 font-body leading-relaxed mb-10">{d.description}</p>

          <h2 className="font-display text-2xl text-mist-100 mb-5 flex items-center gap-2">
            <Compass size={19} className="text-moss-400" /> Attractions
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {d.attractions.map((a) => (
              <div key={a.name} className="p-4 rounded-xl border border-white/5 bg-ink-850">
                <h4 className="font-body font-semibold text-mist-100 text-sm mb-1.5">{a.name}</h4>
                <p className="text-mist-400 text-[13px] font-body leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-display text-2xl text-mist-100 mb-5">Things to Do</h2>
          <div className="flex flex-wrap gap-2 mb-10">
            {d.activities.map((a) => (
              <span key={a} className="px-3.5 py-2 rounded-full bg-ink-850 border border-white/5 text-mist-200 text-sm font-body">
                {a}
              </span>
            ))}
          </div>

          <h2 className="font-display text-2xl text-mist-100 mb-5 flex items-center gap-2">
            <Bed size={19} className="text-moss-400" /> Where to Stay
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {d.hotels.map((h) => (
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

          <h2 className="font-display text-2xl text-mist-100 mb-5 flex items-center gap-2">
            <UtensilsCrossed size={19} className="text-moss-400" /> Local Food to Try
          </h2>
          <div className="space-y-3 mb-10">
            {d.cuisine.map((c) => (
              <div key={c.name} className="p-4 rounded-xl border border-white/5 bg-ink-850">
                <h4 className="font-body font-semibold text-mist-100 text-sm mb-1">{c.name}</h4>
                <p className="text-mist-400 text-[13px] font-body leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-display text-2xl text-mist-100 mb-5">Photo Gallery</h2>
          <div className="grid grid-cols-3 gap-3 mb-10">
            {d.gallery.map((g, i) => (
              <img key={i} src={g} alt={`${d.name} ${i + 1}`} loading="lazy" className="aspect-square object-cover rounded-xl" />
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="sticky top-24 space-y-5">
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
              <p className="text-mist-400 text-[13px] font-body leading-relaxed">{d.howToReach}</p>
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
                {added ? <><Check size={15} /> Added to Itinerary</> : <><Plus size={15} /> Add to My Itinerary</>}
              </Button>
            </div>
          </div>
        </aside>
      </div>

      <section className="bg-ink-900 border-t border-white/5 py-16">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <SectionHeader title="Related Destinations" align="left" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {related.map((r) => (
              <DestinationCard key={r.id} destination={r} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Fact({ icon: Icon, label, value }) {
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
