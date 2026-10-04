import { Compass, Route, ShieldCheck, Wallet, MapPinned, ArrowDown } from "lucide-react";
import Hero from "../../components/Hero";
import SectionHeader from "../../components/SectionHeader";
import DestinationCard from "../../components/DestinationCard";
import PackageCard from "../../components/PackageCard";
import BlogCard from "../../components/BlogCard";
import PageSection from "../../components/sections/PageSection";
import ItineraryExplorer from "../../components/sections/ItineraryExplorer";
import GalleryStrip from "../../components/sections/GalleryStrip";
import PlanTripCTA from "../../components/sections/PlanTripCTA";
import ViewAll from "../../components/sections/ViewAll";
import { useOverlayHeader } from "../../hooks/useOverlayHeader";
import { sectionContent } from "../../data/sections";
import { regions } from "../../data/regions";
import { planTripLink } from "../../data/navigation";
import { usePublicDestinations, usePublicPackages } from "../../services/content";
import { useItineraries } from "../../services/itineraries";
import { usePublicBlogs } from "../../services/blogs";
import { pickByIds } from "../../utils/collections";

const whyIcons = [Compass, Route, ShieldCheck, Wallet];

// /uttarakhand and /goa — one region's destinations, packages, complete
// itineraries, blogs and photos. Copy: src/data/sections.js + regions.js.
export default function RegionPage({ regionId }) {
  useOverlayHeader();
  const content = sectionContent[regionId];
  const region = regions.find((r) => r.id === regionId);
  const destinations = usePublicDestinations(regionId);
  const packages = usePublicPackages(regionId);
  const itineraries = useItineraries(regionId);
  const blogs = usePublicBlogs(regionId);

  const core = pickByIds(destinations, content.coreDestinationIds);
  const more = destinations.filter((d) => !content.coreDestinationIds.includes(d.id));
  const fullItineraries = itineraries.filter((it) => it.days.length > 0);

  return (
    <div>
      <Hero
        {...content.hero}
        compact
        actions={[
          { label: "See destinations", to: "#destinations", icon: ArrowDown },
          { label: planTripLink.label, to: planTripLink.to, icon: MapPinned, primary: true },
        ]}
      />

      <PageSection>
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
          <div>
            <SectionHeader kicker={content.intro.kicker} title={content.intro.title} description={content.intro.description} className="!mb-8" />
            <dl className="grid grid-cols-3 gap-3 max-w-md">
              {[
                [destinations.length, "Destinations"],
                [packages.length, "Packages"],
                [fullItineraries.length, "Itineraries"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/[0.08] bg-ink-850/70 p-4">
                  <dd className="font-display text-3xl text-mist-100">{value}</dd>
                  <dt className="text-mist-400 text-xs font-body mt-1">{label}</dt>
                </div>
              ))}
            </dl>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
            {region.why.items.map(({ title, desc }, i) => {
              const Icon = whyIcons[i % whyIcons.length];
              return (
                <li key={title}>
                  <Icon size={20} className="text-moss-500 mb-3" aria-hidden="true" />
                  <h3 className="font-display text-lg text-mist-100 mb-1.5">{title}</h3>
                  <p className="text-mist-400 text-sm font-body leading-relaxed">{desc}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </PageSection>

      <PageSection band id="destinations">
        <SectionHeader kicker={`${region.name} destinations`} title={region.featured.title} action={<ViewAll to="/destinations">All destinations</ViewAll>} />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {core.map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </div>
        {more.length > 0 && (
          <>
            <h3 className="font-display text-2xl text-mist-100 mt-14 mb-6">More in {region.name}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {more.map((d) => (
                <DestinationCard key={d.id} destination={d} showDescription={false} />
              ))}
            </div>
          </>
        )}
      </PageSection>

      {packages.length > 0 && (
        <PageSection>
          <SectionHeader kicker={`${region.name} packages`} title={region.packages.title} description={region.packages.description} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {packages.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        </PageSection>
      )}

      {fullItineraries.length > 0 && (
        <PageSection band>
          <SectionHeader
            kicker={`${region.name} itineraries`}
            title="Every day, written out"
            description="Pick an itinerary to read its complete day-by-day plan — where you stay, what you eat and how you get between stops."
          />
          <ItineraryExplorer itineraries={fullItineraries} />
        </PageSection>
      )}

      <PageSection>
        <SectionHeader kicker={`${region.name} stories`} title="From the blog" action={<ViewAll to="/blogs">All posts</ViewAll>} />
        {blogs.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogs.slice(0, 3).map((b) => (
              <BlogCard key={b.id} blog={b} region={regionId} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-white/10 px-6 py-10 text-center text-mist-300 font-body text-sm">
            {region.name} stories haven't been published yet. In the meantime, browse the destinations above.
          </p>
        )}
      </PageSection>

      <PageSection band>
        <SectionHeader kicker={`${region.name} gallery`} title="In pictures" />
        <GalleryStrip region={regionId} />
      </PageSection>

      <div className="pt-20 sm:pt-28">
        <PlanTripCTA {...content.cta} />
      </div>
    </div>
  );
}
