import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ViewAll({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-body font-semibold text-mist-100 hover:border-moss-500/60 hover:text-moss-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-500/70"
    >
      {children} <ArrowRight size={15} aria-hidden="true" />
    </Link>
  );
}
