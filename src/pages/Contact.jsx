import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import PageIntro from "../components/PageIntro";
import { InputField, TextAreaField } from "../components/FormControls";
import { addInquiry, INQUIRY_SOURCES } from "../services/inquiries";
import { useSiteSettings } from "../services/siteSettings";

const emptyForm = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const { settings } = useSiteSettings();
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);
  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const onSubmit = (e) => {
    e.preventDefault();
    addInquiry({ ...form, source: INQUIRY_SOURCES.contact, inquiryType: "General Inquiry" });
    setSent(true);
    setForm(emptyForm);
  };

  const activePhones = settings.contact.phones.filter((p) => p.enabled && p.number);

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <PageIntro
        kicker="Contact"
        title="Ask us anything"
        description="Questions about a destination, a package or your dates — send a message and we'll reply by email or phone."
      />

      <div className="grid lg:grid-cols-[1fr_340px] gap-8 lg:gap-10 items-start">
        {sent ? (
          <div className="rounded-2xl border border-white/[0.08] bg-ink-850/80 p-8 text-center" role="status">
            <span className="inline-flex h-12 w-12 rounded-full bg-moss-500/15 text-moss-400 items-center justify-center mb-4">
              <Check size={22} />
            </span>
            <p className="font-display text-2xl text-mist-100 mb-2">Message sent</p>
            <p className="text-mist-300 font-body text-sm mb-6">Thanks — we'll be in touch soon.</p>
            <button onClick={() => setSent(false)} className="text-moss-400 hover:text-moss-300 text-sm font-body font-semibold">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="rounded-2xl border border-white/[0.08] bg-ink-850/80 p-6 sm:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <InputField label="Name" required value={form.name} onChange={(e) => set({ name: e.target.value })} autoComplete="name" />
              <InputField label="Email" type="email" required value={form.email} onChange={(e) => set({ email: e.target.value })} autoComplete="email" />
            </div>
            <InputField label="Phone" type="tel" value={form.phone} onChange={(e) => set({ phone: e.target.value })} autoComplete="tel" placeholder="+91" />
            <TextAreaField label="Message" required rows={6} value={form.message} onChange={(e) => set({ message: e.target.value })} />
            <button
              type="submit"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-moss-500 px-7 py-3 font-body font-semibold text-ink-950 hover:bg-moss-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-850"
            >
              <Send size={15} aria-hidden="true" /> Send message
            </button>
          </form>
        )}

        {settings.system.showContactInfo !== false && (
          <aside className="rounded-2xl border border-white/[0.08] bg-ink-850/80 p-6 space-y-5">
            <h2 className="font-display text-xl text-mist-100">Reach us directly</h2>
            {settings.contact.address && <ContactRow icon={MapPin} label="Office" value={settings.contact.address} />}
            {activePhones.map((p, i) => (
              <ContactRow key={`${p.number}-${i}`} icon={Phone} label={p.label} value={p.number} href={`tel:${p.number.replace(/\s+/g, "")}`} />
            ))}
            {settings.contact.email && (
              <ContactRow icon={Mail} label="Email" value={settings.contact.email} href={`mailto:${settings.contact.email}`} />
            )}
          </aside>
        )}
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }) {
  const content = (
    <>
      <span className="h-10 w-10 rounded-full bg-moss-500/10 flex items-center justify-center text-moss-400 shrink-0">
        <Icon size={16} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-mist-400 text-xs font-body">{label}</p>
        <p className="text-mist-100 font-body text-sm font-semibold break-words">{value}</p>
      </div>
    </>
  );
  return href ? (
    <a href={href} className="flex items-start gap-3 hover:opacity-80 transition-opacity">{content}</a>
  ) : (
    <div className="flex items-start gap-3">{content}</div>
  );
}
