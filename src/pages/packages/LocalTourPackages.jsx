import SectionHeader from "../../components/SectionHeader";
import ComingSoonBlock from "../../components/ComingSoonBlock";

export default function LocalTourPackages() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-20 min-h-[55vh]">
      <SectionHeader
        kicker="Packages"
        title="Local Tour Packages"
        description="Short, regional trips within a single area — easy to combine with a longer stay."
      />
      <ComingSoonBlock />
    </div>
  );
}