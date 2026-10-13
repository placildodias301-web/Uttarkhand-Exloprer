import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { usePublicDestinations } from "../services/content";
import { useSiteSettings } from "../services/siteSettings";
import { getSocialIcon } from "../utils/socialIcons";
import BrandMark from "./BrandMark";
import { regions } from "../data/regions";
import { travelSections, mainNavLinks, planTripLink } from "../data/navigation";
import { selectTravelSection } from "../services/travelSection";

// Everything here is driven by data: site name/tagline, contact details and
// enabled phones (Admin → Settings → Contact), enabled social platforms
// (Admin → Settings → Social), visibility toggles (Admin → Settings →
// System) and published destinations.
export default function Footer() {
  const destinations = usePublicDestinations("all");
  const { settings } = useSiteSettings();
  const { general, contact, social, system } = settings;

  const byRegion = regions.map((r) => ({ region: r, items: destinations.filter((d) => d.region === r.name) }));
  const activePhones = contact.phones.filter((p) => p.enabled && p.number);
  const activeSocial = system.showSocialLinks === false ? [] : social.filter((s) => s.enabled && s.url);
  const showContact = system.showContactInfo !== false;
  const exploreLinks = [...mainNavLinks.filter((l) => l.to && l.id !== "destinations"), planTripLink];

  return (
    <footer className="border-t border-white/[0.07] bg-ink-950 pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">
        <div className="sm:col-span-2 lg:col-span-4">
          <Link to="/all" onClick={() => selectTravelSection("all")} className="inline-flex mb-5" aria-label={`${general.siteName} home`}>
            <BrandMark variant="nav" />
          </Link>
          <p className="text-mist-400 font-body text-sm leading-relaxed max-w-sm mb-6">
            Curated journeys across the mountains of Uttarakhand and the beaches of Goa — destinations, packages and day-by-day itineraries.
          </p>
          {activeSocial.length > 0 && (
            <ul className="flex flex-wrap gap-2.5" aria-label="Social media">
              {activeSocial.map((s) => {
                const Icon = getSocialIcon(s.platform);
                return (
                  <li key={s.id}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.platform}
                      title={s.platform}
                      className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-mist-300 hover:text-moss-400 hover:border-moss-500/40 transition-colors"
                    >
                      <Icon size={16} />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <nav aria-label="Travel sections" className="lg:col-span-2">
          <h2 className="font-body font-semibold text-mist-100 text-sm mb-4">Journeys</h2>
          <ul className="space-y-2.5">
            {travelSections.map((s) => (
              <li key={s.id}>
                <Link to={s.path} onClick={() => selectTravelSection(s.id)} className="text-mist-400 hover:text-moss-400 text-sm font-body transition-colors">
                  {s.id === "combo" ? "Uttarakhand + Goa" : s.label}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="font-body font-semibold text-mist-100 text-sm mt-8 mb-4">Explore</h2>
          <ul className="space-y-2.5">
            {exploreLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-mist-400 hover:text-moss-400 text-sm font-body transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Destinations" className="sm:col-span-2 lg:col-span-3 grid grid-cols-2 gap-8">
          {byRegion.map(({ region, items }) => (
            <div key={region.id} className="min-w-0">
              <h2 className="font-body font-semibold text-mist-100 text-sm mb-4">{region.name}</h2>
              <ul className="space-y-2.5">
                {items.slice(0, 8).map((d) => (
                  <li key={d.id} className="truncate">
                    <Link to={`/destinations/${d.id}`} className="text-mist-400 hover:text-moss-400 text-sm font-body transition-colors">
                      {d.name}
                    </Link>
                  </li>
                ))}
                {items.length > 8 && (
                  <li>
                    <Link to={`/${region.id}`} onClick={() => selectTravelSection(region.id)} className="text-moss-500 hover:text-moss-400 text-sm font-body">
                      +{items.length - 8} more
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </nav>

        {showContact && (
          <div className="sm:col-span-2 lg:col-span-3 min-w-0">
            <h2 className="font-body font-semibold text-mist-100 text-sm mb-4">Contact</h2>
            <ul className="space-y-3 text-mist-400 text-sm font-body">
              {contact.address && (
                <li className="flex items-start gap-2.5">
                  <MapPin size={15} className="text-moss-500 shrink-0 mt-0.5" aria-hidden="true" /> <span>{contact.address}</span>
                </li>
              )}
              {activePhones.map((p, i) => (
                <li key={`${p.number}-${i}`} className="flex items-start gap-2.5">
                  <Phone size={15} className="text-moss-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="min-w-0">
                    <a href={`tel:${p.number.replace(/\s+/g, "")}`} className="hover:text-moss-400 transition-colors">{p.number}</a>
                    {p.label && <span className="block text-mist-400/70 text-xs">{p.label}</span>}
                  </span>
                </li>
              ))}
              {contact.email && (
                <li className="flex items-start gap-2.5 min-w-0">
                  <Mail size={15} className="text-moss-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <a href={`mailto:${contact.email}`} className="hover:text-moss-400 transition-colors break-all">{contact.email}</a>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <p className="text-mist-400 text-xs font-body">
          © {new Date().getFullYear()} {general.siteName}. {general.tagline}
        </p>
        <p className="text-mist-400/70 text-xs font-body">Student project — content is illustrative.</p>
      </div>
    </footer>
  );
}
