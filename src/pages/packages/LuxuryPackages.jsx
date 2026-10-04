import SectionHeader from "../../components/SectionHeader";
import ComingSoonBlock from "../../components/ComingSoonBlock";

// Add your luxury package cards / content below the SectionHeader.
// This page is independent — editing it won't affect any other package category page.
export default function LuxuryPackages() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-20 min-h-[55vh]">
      <SectionHeader
        as="h1"
        kicker="Packages"
        title="Luxury Packages"
        description="Premium stays, private transport, and elevated experiences."
      />
      <ComingSoonBlock />
    </div>
  );
}
