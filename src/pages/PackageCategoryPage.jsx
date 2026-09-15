import { useParams, Navigate, Link } from "react-router-dom";
import { PackageOpen, ArrowLeft } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { getPackageCategory } from "../data/packageCategories";

export default function PackageCategoryPage() {
  const { slug } = useParams();
  const category = getPackageCategory(slug);

  if (!category) return <Navigate to="/packages" replace />;

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-20 min-h-[55vh]">
      <SectionHeader kicker="Packages" title={category.label} />

      <div className="rounded-2xl border border-dashed border-white/10 bg-ink-850/50 py-20 flex flex-col items-center text-center">
        <PackageOpen size={30} className="text-mist-400 mb-4" />
        <p className="text-mist-300 font-body mb-1">No packages here yet</p>
        <p className="text-mist-400 font-body text-sm mb-6 max-w-sm">
          This category is set up and ready — packages will be added here soon.
        </p>
        <Link to="/packages" className="inline-flex items-center gap-1.5 text-moss-400 hover:text-moss-300 text-sm font-body font-semibold">
          <ArrowLeft size={14} /> Back to All Packages
        </Link>
      </div>
    </div>
  );
}
