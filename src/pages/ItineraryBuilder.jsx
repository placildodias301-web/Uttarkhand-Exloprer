import { useState } from "react";
import {
  Plus, X, ChevronUp, ChevronDown, Trash2, MapPin, Gauge,
  CalendarRange, Save, GripVertical, Check, MessageCircle,
} from "lucide-react";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import { useItinerary } from "../context/ItineraryContext";
import { getWhatsAppLink } from "../data/contact";

export default function ItineraryBuilder() {
  const {
    items, allDestinations, days, totalDistanceKm,
    addDestination, removeDestination, moveUp, moveDown, reorder, clear,
  } = useItinerary();
  const [dragIndex, setDragIndex] = useState(null);
  const [savedFlash, setSavedFlash] = useState(false);

  const availableDestinations = allDestinations.filter(
    (d) => !items.some((i) => i.id === d.id)
  );

  const whatsAppLink = getWhatsAppLink(
    `Hi! I've put together a ${days}-day itinerary (${items.map((i) => i.name).join(" → ")}) and would like some help finalizing it.`
  );

  const onSave = () => {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1800);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-20">
      <SectionHeader
        kicker="Plan My Trip"
        title="Build your own itinerary"
        description="Add destinations, drag to reorder, and your plan is saved automatically so it's still here next time you open the site."
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
                    <img src={d.image} alt="" className="h-10 w-10 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-mist-100 font-body text-sm font-semibold truncate">Day {i + 1} → {d.name}</p>
                      <p className="text-mist-400 font-body text-xs truncate">{d.tagline}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => moveUp(i)} disabled={i === 0} className="h-7 w-7 rounded-full flex items-center justify-center text-mist-300 hover:text-moss-400 disabled:opacity-30">
                        <ChevronUp size={15} />
                      </button>
                      <button onClick={() => moveDown(i)} disabled={i === items.length - 1} className="h-7 w-7 rounded-full flex items-center justify-center text-mist-300 hover:text-moss-400 disabled:opacity-30">
                        <ChevronDown size={15} />
                      </button>
                      <button onClick={() => removeDestination(d.id)} className="h-7 w-7 rounded-full flex items-center justify-center text-mist-300 hover:text-rose-400">
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
              <ul className="space-y-2.5">
                {availableDestinations.map((d) => (
                  <li key={d.id} className="flex items-center gap-3">
                    <img src={d.image} alt="" className="h-10 w-10 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-mist-100 font-body text-sm font-semibold truncate">{d.name}</p>
                      <p className="text-mist-400 font-body text-xs truncate">{d.tagline}</p>
                    </div>
                    <button
                      onClick={() => addDestination(d.id)}
                      className="h-8 w-8 rounded-full bg-moss-500/10 text-moss-400 hover:bg-moss-500 hover:text-ink-950 flex items-center justify-center shrink-0 transition-colors"
                      aria-label={`Add ${d.name}`}
                    >
                      <Plus size={15} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
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
