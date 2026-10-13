import { Link } from "react-router-dom";
import { MapPinned, MessageCircle } from "lucide-react";
import SmartImage from "../SmartImage";
import { planTripLink } from "../../data/navigation";

// Closing call-to-action used on every section page.
export default function PlanTripCTA({ title, description, image }) {
  return (
    <section className="px-3 sm:px-5 pb-16 sm:pb-24">
      <div className="relative max-w-[1440px] mx-auto overflow-hidden rounded-[28px] border border-white/[0.08]">
        <SmartImage src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/75 to-ink-950/30" />
        <div className="relative px-6 sm:px-12 lg:px-16 py-16 sm:py-24 max-w-2xl">
          <h2 className="font-display text-3xl sm:text-5xl text-mist-100 leading-[1.1] mb-5">{title}</h2>
          <p className="text-mist-200/90 font-body leading-relaxed mb-9 max-w-lg">{description}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to={planTripLink.to}
              className="inline-flex items-center gap-2 rounded-full bg-moss-500 px-6 py-3.5 font-body text-sm font-semibold text-ink-950 hover:bg-moss-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            >
              <MapPinned size={16} aria-hidden="true" /> {planTripLink.label}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-ink-700/40 backdrop-blur-md px-6 py-3.5 font-body text-sm font-semibold text-mist-100 hover:border-white/35 transition-colors"
            >
              <MessageCircle size={16} aria-hidden="true" /> Ask a question
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
