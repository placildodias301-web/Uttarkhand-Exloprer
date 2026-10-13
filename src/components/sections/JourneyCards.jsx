import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SmartImage from "../SmartImage";
import { journeyCards } from "../../data/sections";
import { getTravelSection } from "../../data/navigation";
import { selectTravelSection } from "../../services/travelSection";
import { usePublicDestinations, usePublicPackages } from "../../services/content";

// "Choose your journey": Uttarakhand, Goa, Combo → their section pages.
export default function JourneyCards() {
  const destinations = usePublicDestinations("all");
  const packages = usePublicPackages("all");

  const stats = (sectionId) => {
    if (sectionId === "combo") {
      const n = packages.filter((p) => p.region === "Combo").length;
      return `${n} combined package${n === 1 ? "" : "s"}`;
    }
    const name = getTravelSection(sectionId).label;
    const d = destinations.filter((x) => x.region === name).length;
    const p = packages.filter((x) => x.region === name).length;
    return `${d} destinations, ${p} packages`;
  };

  return (
    <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
      {journeyCards.map((card) => {
        const section = getTravelSection(card.sectionId);
        return (
          <Link
            key={card.sectionId}
            to={section.path}
            onClick={() => selectTravelSection(card.sectionId)}
            className="group relative block aspect-[16/11] md:aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden border border-white/[0.08] shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-500/70"
          >
            {card.images ? (
              <>
                <SmartImage src={card.images[0]} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                <div className="absolute inset-y-0 right-0 w-[60%] [clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)]">
                  <SmartImage src={card.images[1]} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                </div>
              </>
            ) : (
              <SmartImage src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/5" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
              <p className="text-mist-300 text-xs font-body mb-2">{stats(card.sectionId)}</p>
              <h3 className="font-display text-3xl sm:text-4xl text-mist-100 mb-2">{card.title}</h3>
              <p className="text-mist-200/90 text-sm font-body leading-relaxed mb-5 max-w-xs">{card.description}</p>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-ink-700/40 backdrop-blur-md px-4 py-2 text-sm font-body font-semibold text-mist-100 group-hover:border-moss-500/60 group-hover:text-moss-400 transition-colors">
                Explore {card.title} <ArrowRight size={15} aria-hidden="true" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
