import { Link } from "react-router-dom";
import { Mountain, Camera, Users2, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { destinations } from "../data/destinations";

export default function Footer() {
  return (
    <footer className="bg-ink-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <Mountain className="text-moss-400" size={24} />
            <span className="font-display text-lg text-mist-200">
              Uttarakhand <span className="text-moss-400 italic">Explorer</span>
            </span>
          </Link>
          <p className="text-mist-400 font-body text-sm leading-relaxed max-w-xs mb-5">
            An interactive way to discover the Garhwal Himalaya — from the Ganga's ghats
            to the snowline above Auli — and build a trip around what you actually want to do.
          </p>
          <div className="flex gap-3">
            {[Camera, Users2, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center text-mist-300 hover:text-moss-400 hover:border-moss-500/40 transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-body font-semibold text-mist-200 text-sm mb-4">Destinations</h4>
          <ul className="space-y-2.5">
            {destinations.map((d) => (
              <li key={d.id}>
                <Link to={`/destinations/${d.id}`} className="text-mist-400 hover:text-moss-400 text-sm font-body transition-colors">
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-body font-semibold text-mist-200 text-sm mb-4">Explore</h4>
          <ul className="space-y-2.5">
            {[
              ["Packages", "/packages"],
              ["Plan My Trip", "/itinerary"],
              ["Hotels & Food", "/hotels-food"],
              ["Gallery", "/gallery"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-mist-400 hover:text-moss-400 text-sm font-body transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-body font-semibold text-mist-200 text-sm mb-4">Contact</h4>
          <ul className="space-y-3 text-mist-400 text-sm font-body">
            <li className="flex items-center gap-2"><MapPin size={14} className="text-moss-400 shrink-0" /> Dehradun, Uttarakhand</li>
            <li className="flex items-center gap-2"><Phone size={14} className="text-moss-400 shrink-0" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-moss-400 shrink-0" /> hello@uttarakhandexplorer.in</li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <p className="text-mist-400 text-xs font-body">
          © {new Date().getFullYear()} Uttarakhand Explorer. Built as a student internship project — content is illustrative.
        </p>
      </div>
    </footer>
  );
}
