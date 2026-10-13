import { Mountain, TreePalm, MapPinned } from "lucide-react";
import Hero from "../components/Hero";
import SectionHeader from "../components/SectionHeader";
import DestinationCard from "../components/DestinationCard";
import PackageCard from "../components/PackageCard";
import ItineraryCard from "../components/ItineraryCard";
import BlogCard from "../components/BlogCard";
import PageSection from "../components/sections/PageSection";
import JourneyCards from "../components/sections/JourneyCards";
import GalleryStrip from "../components/sections/GalleryStrip";
import PlanTripCTA from "../components/sections/PlanTripCTA";
import ViewAll from "../components/sections/ViewAll";
import { useOverlayHeader } from "../hooks/useOverlayHeader";
import { sectionContent } from "../data/sections";
import { planTripLink } from "../data/navigation";
import { usePublicDestinations, usePublicPackages } from "../services/content";
import { useItineraries } from "../services/itineraries";
import { usePublicBlogs, getBlogRegion } from "../services/blogs";
import { interleave, pickByIds } from "../utils/collections";

// ALL (/all) — the main discovery page covering Uttarakhand AND Goa.
export default function Home() {
  useOverlayHeader();
  const content = sectionContent.all;
  const destinations = usePublicDestinations("all");
  const packages = usePublicPackages("all");
  const itineraries = useItineraries("all");
  const blogs = usePublicBlogs("all");

  const featuredDestinations = pickByIds(destinations, content.destinations.ids);
  const byRegion = (list, key) => list.filter((x) => String(x.region).toLowerCase() === key);
  const featuredPackages = interleave([byRegion(packages, "uttarakhand"), byRegion(packages, "goa"), byRegion(packages, "combo")], 6);
  const withDays = itineraries.filter((it) => it.days.length > 0);
  const featuredItineraries = interleave(
    [withDays.filter((i) => i.region === "uttarakhand"), withDays.filter((i) => i.region === "goa"), withDays.filter((i) => i.region === "combo")],
    3
  );

  return (
    <div>
      <Hero
        {...content.hero}
        actions={[
          { label: "Explore Uttarakhand", to: "/uttarakhand", icon: Mountain },
          { label: "Explore Goa", to: "/goa", icon: TreePalm },
          { label: planTripLink.label, to: planTripLink.to, icon: MapPinned, primary: true },
        ]}
      />

      <PageSection>
        <SectionHeader kicker={content.journeys.kicker} title={content.journeys.title} description={content.journeys.description} />
        <JourneyCards />
      </PageSection>

      {featuredDestinations.length > 0 && (
        <PageSection band>
          <SectionHeader
            kicker={content.destinations.kicker}
            title={content.destinations.title}
            action={<ViewAll to="/destinations">All destinations</ViewAll>}
          />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {featuredDestinations.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
        </PageSection>
      )}

      {featuredPackages.length > 0 && (
        <PageSection>
          <SectionHeader kicker={content.packages.kicker} title={content.packages.title} action={<ViewAll to="/packages">All packages</ViewAll>} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredPackages.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        </PageSection>
      )}

      {featuredItineraries.length > 0 && (
        <PageSection band>
          <SectionHeader kicker={content.itineraries.kicker} title={content.itineraries.title} action={<ViewAll to="/itinerary">All itineraries</ViewAll>} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredItineraries.map((it) => (
              <ItineraryCard key={it.id} itinerary={it} />
            ))}
          </div>
        </PageSection>
      )}

      {blogs.length > 0 && (
        <PageSection>
          <SectionHeader kicker={content.blogs.kicker} title={content.blogs.title} action={<ViewAll to="/blogs">All posts</ViewAll>} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogs.slice(0, 3).map((b) => (
              <BlogCard key={b.id} blog={b} region={getBlogRegion(b, destinations)} />
            ))}
          </div>
        </PageSection>
      )}

      <PageSection band>
        <SectionHeader kicker={content.gallery.kicker} title={content.gallery.title} />
        <GalleryStrip region="all" />
      </PageSection>

      <div className="pt-20 sm:pt-28">
        <PlanTripCTA {...content.cta} />
      </div>
    </div>
  );
}
