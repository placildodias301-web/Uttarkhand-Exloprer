import { useState } from "react";
import {
  Plus, X, ChevronUp, ChevronDown, Trash2, MapPin, Gauge,
  CalendarRange, Save, GripVertical, Check, MessageCircle, Send,
} from "lucide-react";
import Button from "../components/Button";
import PageIntro from "../components/PageIntro";
import SmartImage from "../components/SmartImage";
import PlanTripForm from "../components/PlanTripForm";
import { useItinerary } from "../context/ItineraryContext";
import { getWhatsAppLink } from "../data/contact";
import { regions, regionLabel, normalizeRegion } from "../data/regions";
import { isPublished } from "../services/content";

// Destination for the request form, inferred from the stops already added.
function inferDestination(items) {
  const keys = [...new Set(items.map((i) => normalizeRegion(i.region)).filter(Boolean))];
  if (keys.length === 0) return "";
  return keys.length > 1 ? "Combo" : regionLabel(keys[0]);
}

export default function ItineraryBuilder() {
  const {
    items, allDestinations, days, totalDistanceKm,
    addDestination, removeDestination, moveUp, moveDown, reorder, clear,
  } = useItinerary();
  const [dragIndex, setDragIndex] = useState(null);
  const [savedFlash, setSavedFlash] = useState(false);

  const availableDestinations = allDestinations.filter(
    (d) => isPublished(d) && !items.some((i) => i.id === d.id)
  );

  const itinerarySummary = items.map((i) => i.name).join(" → ");

  const whatsAppLink = getWhatsAppLink(
    `Hi! I've put together a ${days}-day itinerary (${itinerarySummary}) and would like some help finalizing it.`
  );

  const onSave = () => {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1800);
  };

  const scrollToRequest = () =>
    document.getElementById("trip-request")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-20">
      <PageIntro
        kicker="Plan My Trip"
        title="Build your trip, then send it to us"
        description="Add the stops you want, drag to reorder — your list is saved in this browser automatically. When you're ready, send the request below and we'll help finalise it."
      />

      <div className="grid lg:grid-cols-[1fr_340px] gap-8">
        <div>
          <div className="rounded-2xl border border-white/5 bg-ink-850 p-6 mb-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl text-mist-100">My Trip</h3>
              {items.length > 0 && (
                <button
                  onClick={clear}
                  className="flex items-center gap-1.5 text-mist-400 hover:text-rose-400 text-xs font-body font-semibold transition-colors"
                >
                  <Trash2 size={13} /> Clear Itinerary
                </button>
              )}
            </div>

            {items.length === 0 ? (
              <div className="text-center py-16">
                <MapPin size={30} className="text-mist-400 mx-auto mb-4" />
                <p className="text-mist-300 font-body mb-1">Your itinerary is empty</p>
                <p className="text-mist-400 font-body text-sm">Add a destination from the list on the right to get started.</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {items.map((d, i) => (
                  <li
                    key={d.id}
                    draggable
                    onDragStart={() => setDragIndex(i)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      if (dragIndex !== null && dragIndex !== i) reorder(dragIndex, i);
                      setDragIndex(null);
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-ink-800 border border-white/5 cursor-grab active:cursor-grabbing"
                  >
                    <GripVertical size={15} className="text-mist-400 shrink-0" />
                    <span
                      className="h-8 w-8 rounded-full flex items-center justify-center text-ink-950 text-xs font-display font-bold shrink-0"
                      style={{ backgroundColor: d.accent }}
                    >
                      {i + 1}
                    </span>
                    <SmartImage src={d.image} alt="" className="h-10 w-10 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-mist-100 font-body text-sm font-semibold truncate">Stop {i + 1} — {d.name}</p>
                      <p className="text-mist-400 font-body text-xs truncate">{d.tagline}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => moveUp(i)} disabled={i === 0} aria-label={`Move ${d.name} up`} className="h-7 w-7 rounded-full flex items-center justify-center text-mist-300 hover:text-moss-400 disabled:opacity-30">
                        <ChevronUp size={15} />
                      </button>
                      <button onClick={() => moveDown(i)} disabled={i === items.length - 1} aria-label={`Move ${d.name} down`} className="h-7 w-7 rounded-full flex items-center justify-center text-mist-300 hover:text-moss-400 disabled:opacity-30">
                        <ChevronDown size={15} />
                      </button>
                      <button onClick={() => removeDestination(d.id)} aria-label={`Remove ${d.name}`} className="h-7 w-7 rounded-full flex items-center justify-center text-mist-300 hover:text-rose-400">
                        <X size={15} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="flex flex-wrap gap-3">
              <Button onClick={onSave} variant="primary">
                {savedFlash ? <><Check size={15} /> Saved</> : <><Save size={15} /> Save Itinerary</>}
              </Button>
              <Button
                as="a"
                href={whatsAppLink ?? undefined}
                target={whatsAppLink ? "_blank" : undefined}
                rel={whatsAppLink ? "noreferrer" : undefined}
                variant="outline"
                className={!whatsAppLink ? "cursor-not-allowed opacity-60" : ""}
              >
                <MessageCircle size={15} /> Get Help on WhatsApp
              </Button>
              <Button onClick={scrollToRequest} variant="dark">
                <Send size={15} /> Send trip request
              </Button>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
            <h3 className="font-display text-lg text-mist-100 mb-4">Trip Summary</h3>
            <div className="grid grid-cols-3 gap-2 mb-1">
              <Stat icon={CalendarRange} value={days} label="Days" />
              <Stat icon={MapPin} value={items.length} label="Stops" />
              <Stat icon={Gauge} value={items.length > 1 ? `${totalDistanceKm}` : "—"} label="Approx. KM" />
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
            <h3 className="font-display text-lg text-mist-100 mb-4">Add a Destination</h3>
            {availableDestinations.length === 0 ? (
              <p className="text-mist-400 text-sm font-body">All destinations are already in your itinerary.</p>
            ) : (
              <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-1">
                {regions.map((r) => {
                  const list = availableDestinations.filter((d) => normalizeRegion(d.region) === r.id);
                  if (list.length === 0) return null;
                  return (
                    <div key={r.id}>
                      <p className="text-gold-400 text-xs font-body font-semibold mb-2">{r.name}</p>
                      <ul className="space-y-2.5">
                        {list.map((d) => (
                          <li key={d.id} className="flex items-center gap-3">
                            <SmartImage src={d.image} alt="" className="h-10 w-10 rounded-lg object-cover shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-mist-100 font-body text-sm font-semibold truncate">{d.name}</p>
                              <p className="text-mist-400 font-body text-xs truncate">{d.tagline}</p>
                            </div>
                            <button
                              onClick={() => addDestination(d.id)}
                              className="h-9 w-9 rounded-full bg-moss-500/10 text-moss-400 hover:bg-moss-500 hover:text-ink-950 flex items-center justify-center shrink-0 transition-colors"
                              aria-label={`Add ${d.name}`}
                            >
                              <Plus size={15} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </aside>
      </div>

      <section id="trip-request" className="scroll-mt-32 mt-16 sm:mt-20 grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-14 items-start">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl text-mist-100 leading-tight mb-4">Send us your trip request</h2>
          <p className="text-mist-300 font-body leading-relaxed">
            Tell us when you'd like to travel, how many of you are going and anything else that matters. Your stops
            {items.length > 0 ? " are attached automatically." : " can be added above, or just describe the trip in your message."}
          </p>
        </div>
        <PlanTripForm itinerarySummary={itinerarySummary} defaultDestination={inferDestination(items)} />
      </section>
    </div>
  );
}

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="rounded-xl bg-ink-800 border border-white/5 p-3 text-center">
      <Icon size={15} className="text-moss-400 mx-auto mb-1.5" />
      <p className="font-display text-lg text-mist-100">{value}</p>
      <p className="text-mist-400 text-[10px] font-body">{label}</p>
    </div>
  );
}
