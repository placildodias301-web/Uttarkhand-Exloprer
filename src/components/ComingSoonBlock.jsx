import { Link } from "react-router-dom";
import { PackageOpen, ArrowLeft } from "lucide-react";

export default function ComingSoonBlock() {
  return (
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
  );
}
