import SectionHeader from "../../components/SectionHeader";
import ComingSoonBlock from "../../components/ComingSoonBlock";

// Add your budget-friendly package cards / content below the SectionHeader.
// This page is independent — editing it won't affect any other package category page.
export default function BudgetFriendlyPackages() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-20 min-h-[55vh]">
      <SectionHeader
        kicker="Packages"
        title="Budget Friendly Packages"
        description="Lower-cost itineraries without cutting the essentials."
      />
      <ComingSoonBlock />
    </div>
  );
}
