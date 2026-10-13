import SectionHeader from "../../components/SectionHeader";
import ComingSoonBlock from "../../components/ComingSoonBlock";

// Add your spiritual package cards / content below the SectionHeader.
// This page is independent — editing it won't affect any other package category page.
export default function SpiritualPackages() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-20 min-h-[55vh]">
      <SectionHeader
        as="h1"
        kicker="Packages"
        title="Spiritual Packages"
        description="Char Dham circuits, temple towns, and pilgrimage-focused itineraries."
      />
      <ComingSoonBlock />
    </div>
  );
}
