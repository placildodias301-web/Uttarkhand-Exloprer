import { Link } from "react-router-dom";
import { Globe, Phone, Share2, SlidersHorizontal, ChevronRight } from "lucide-react";

const sections = [
  { to: "/admin/settings/general", icon: Globe, title: "General Settings", desc: "Website name, logo, favicon, tagline." },
  { to: "/admin/settings/contact", icon: Phone, title: "Contact Information", desc: "Address, email, and up to 3 phone numbers." },
  { to: "/admin/settings/social", icon: Share2, title: "Social Media", desc: "Add, edit or disable social platform links." },
  { to: "/admin/settings/system", icon: SlidersHorizontal, title: "System Configuration", desc: "Maintenance mode and visibility toggles." },
];

export default function SettingsHub() {
  return (
    <div>
      <h1 className="font-display text-2xl text-mist-100 mb-6">Settings</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {sections.map((s) => (
          <Link key={s.to} to={s.to} className="rounded-2xl border border-white/5 bg-ink-850 p-5 flex items-center gap-4 hover:border-moss-500/30 transition-colors">
            <span className="h-11 w-11 rounded-xl bg-moss-500/10 flex items-center justify-center text-moss-400 shrink-0">
              <s.icon size={19} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-body font-semibold text-mist-100 text-sm">{s.title}</p>
              <p className="text-mist-400 text-xs font-body">{s.desc}</p>
            </div>
            <ChevronRight size={16} className="text-mist-400 shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
