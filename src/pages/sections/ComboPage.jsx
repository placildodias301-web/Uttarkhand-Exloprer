import { Check, MapPinned, ArrowDown, Mountain, TreePalm } from "lucide-react";
import Hero from "../../components/Hero";
import SectionHeader from "../../components/SectionHeader";
import DestinationCard from "../../components/DestinationCard";
import PackageCard from "../../components/PackageCard";
import PageSection from "../../components/sections/PageSection";
import ItineraryExplorer from "../../components/sections/ItineraryExplorer";
import PlanTripCTA from "../../components/sections/PlanTripCTA";
import ViewAll from "../../components/sections/ViewAll";
import { useOverlayHeader } from "../../hooks/useOverlayHeader";
import { sectionContent } from "../../data/sections";
import { planTripLink } from "../../data/navigation";
import { usePublicDestinations, usePublicPackages } from "../../services/content";
import { useItineraries } from "../../services/itineraries";
import { pickByIds } from "../../utils/collections";

// /combo — Uttarakhand + Goa in one journey. Combo packages and their
// itineraries come from src/data/comboPackages.js (independent seed data).
export default function ComboPage() {
  useOverlayHeader();
  const content = sectionContent.combo;
  const destinations = usePublicDestinations("all");
  const packages = usePublicPackages("combo");
  const itineraries = useItineraries("combo");

  const uttarakhand = pickByIds(destinations, content.highlights.uttarakhandIds);
  const goa = pickByIds(destinations, content.highlights.goaIds);
  const experiences = [...new Set(packages.flatMap((p) => p.highlights || []))];

  return (
    <div>
      <Hero
        {...content.hero}
        actions={[
          { label: "See combined packages", to: "#packages", icon: ArrowDown },
          { label: planTripLink.label, to: planTripLink.to, icon: MapPinned, primary: true },
        ]}
      />

      <PageSection>
        <SectionHeader kicker="Two halves of one trip" title="Start in the hills, finish on the coast" />
        <div className="grid lg:grid-cols-2 gap-10">
          <HighlightColumn icon={Mountain} title="Uttarakhand highlights" items={uttarakhand} viewTo="/uttarakhand" />
          <HighlightColumn icon={TreePalm} title="Goa highlights" items={goa} viewTo="/goa" />
        </div>
      </PageSection>

      {experiences.length > 0 && (
        <PageSection band>
          <SectionHeader kicker="Featured experiences" title="What a combined trip covers" />
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {experiences.map((x) => (
              <li key={x} className="flex gap-3 rounded-2xl border border-white/[0.08] bg-ink-850/70 p-5 text-mist-200 font-body text-sm leading-relaxed">
                <Check size={16} className="text-moss-500 shrink-0 mt-0.5" aria-hidden="true" />
                {x}
              </li>
            ))}
          </ul>
        </PageSection>
      )}

      <PageSection id="packages">
        <SectionHeader kicker="Combined packages" title="Peaks + palms, planned end to end" action={<ViewAll to="/packages">All packages</ViewAll>} />
        {packages.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {packages.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        ) : (
          <p className="text-mist-300 font-body text-sm">No combined packages are published right now.</p>
        )}
      </PageSection>

      {itineraries.length > 0 && (
        <PageSection band>
          <SectionHeader kicker="Combined itinerary" title="The whole route, day by day" />
          <ItineraryExplorer itineraries={itineraries} />
        </PageSection>
      )}

      <div className="pt-20 sm:pt-28">
        <PlanTripCTA {...content.cta} />
      </div>
    </div>
  );
}

function HighlightColumn({ icon: Icon, title, items, viewTo }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5">
        <h3 className="flex items-center gap-2 font-display text-2xl text-mist-100">
          <Icon size={20} className="text-moss-500" aria-hidden="true" /> {title}
        </h3>
        <ViewAll to={viewTo}>Explore</ViewAll>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {items.map((d) => (
          <DestinationCard key={d.id} destination={d} showDescription={false} />
        ))}
      </div>
    </div>
  );
}
