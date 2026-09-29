import { Link } from "react-router-dom";
import { Mountain, Mail, Phone, MapPin } from "lucide-react";
import { useDestinations } from "../services/content";
import { useSiteSettings } from "../services/siteSettings";
import { getSocialIcon } from "../utils/socialIcons";
import BrandMark from "./BrandMark";
import { regions } from "../data/regions";

export default function Footer() {
  const destinations = useDestinations();
  const { settings } = useSiteSettings();

  // One block per region, each listing its own destinations in two columns.
  const byRegion = regions.map((r) => ({
    region: r,
    items: destinations.filter((d) => d.region === r.name),
  }));

  const activePhones = settings.contact.phones.filter((p) => p.enabled);
  const activeSocial = settings.social.filter((s) => s.enabled);

  return (
    <footer className="bg-ink-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 grid grid-cols-2 md:grid-cols-6 gap-10 mb-14">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <BrandMark size={24} />
          </Link>
          <p className="text-mist-400 font-body text-sm leading-relaxed max-w-xs mb-5">
            An interactive way to discover the Garhwal Himalaya — from the Ganga's ghats
            to the snowline above Auli — and build a trip around what you actually want to do.
          </p>
          {activeSocial.length > 0 && (
            <div className="flex gap-3">
              {activeSocial.map((s) => {
                const Icon = getSocialIcon(s.platform);
                return (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.platform}
                    className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center text-mist-300 hover:text-moss-400 hover:border-moss-500/40 transition-colors"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="col-span-2 space-y-6">
          {byRegion.map(({ region, items }) => (
            <div key={region.id}>
              <h4 className="font-body font-semibold text-mist-200 text-sm mb-3">{region.name}</h4>
              {items.length === 0 ? (
                <p className="text-mist-400 text-sm font-body italic">Coming Soon</p>
              ) : (
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                  {items.map((d) => (
                    <li key={d.id}>
                      <Link to={`/destinations/${d.id}`} className="text-mist-400 hover:text-moss-400 text-sm font-body transition-colors">
                        {d.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div>
          <h4 className="font-body font-semibold text-mist-200 text-sm mb-4">Explore</h4>
          <ul className="space-y-2.5">
            {[
              ["Packages", "/packages"],
              ["Plan My Trip", "/itinerary"],
              ["Blogs", "/blogs"],
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
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-moss-400 shrink-0" /> {settings.contact.address}
            </li>
            {activePhones.map((p, i) => (
              <li key={`${p.number}-${i}`} className="flex items-center gap-2">
                <Phone size={14} className="text-moss-400 shrink-0" />
                <a href={`tel:${p.number.replace(/\s+/g, "")}`} className="hover:text-moss-400 transition-colors">
                  {p.number}
                </a>
                <span className="text-mist-400/60 text-xs">({p.label})</span>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-moss-400 shrink-0" />
              <a href={`mailto:${settings.contact.email}`} className="hover:text-moss-400 transition-colors">
                {settings.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <p className="text-mist-400 text-xs font-body">
          © {new Date().getFullYear()} {settings.general.siteName}. Built as a student internship project — content is illustrative.
        </p>
      </div>
    </footer>
  );
}
