import { Mountain } from "lucide-react";
import { useSiteSettings } from "../services/siteSettings";
import { getSocialIcon } from "../utils/socialIcons";

export default function Maintenance() {
  const { settings } = useSiteSettings();
  const { system, general, contact, social } = settings;
  const activeSocial = social.filter((s) => s.enabled);

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center px-5 text-center">
      <div className="max-w-md">
        <Mountain size={34} className="text-moss-400 mx-auto mb-5" />
        <p className="text-mist-400 font-body text-sm mb-2">{general.siteName}</p>
        <h1 className="font-display text-3xl text-mist-100 mb-4">{system.maintenanceTitle}</h1>
        <p className="text-mist-400 font-body leading-relaxed mb-8">{system.maintenanceMessage}</p>

        {system.showContactInfo && (
          <a href={`mailto:${contact.email}`} className="inline-flex items-center px-6 py-2.5 rounded-full bg-moss-500 text-ink-950 font-body font-semibold text-sm mb-6 hover:bg-moss-400 transition-colors">
            Contact Us
          </a>
        )}

        {system.showSocialLinks && activeSocial.length > 0 && (
          <div className="flex justify-center gap-3">
            {activeSocial.map((s) => {
              const Icon = getSocialIcon(s.platform);
              return (
                <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center text-mist-300 hover:text-moss-400">
                  <Icon size={15} />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
