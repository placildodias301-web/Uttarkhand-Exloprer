import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";
import { addInquiry } from "../services/inquiries";
import { useSiteSettings } from "../services/siteSettings";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  inquiryType: "General Inquiry",
  destination: "",
  travelDate: "",
  message: "",
};

export default function Contact() {
  const { settings } = useSiteSettings();
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);
  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const onSubmit = (e) => {
    e.preventDefault();
    addInquiry(form);
    setSent(true);
    setForm(emptyForm);
  };

  const activePhones = settings.contact.phones.filter((p) => p.enabled);

  return (
    <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-16 sm:py-20">
      <SectionHeader
        kicker="Contact"
        title="Planning something custom?"
        description="Tell us roughly what you're after — dates, number of travellers, must-see stops — and we'll help shape a route."
      />

      <div className="grid lg:grid-cols-[1fr_320px] gap-10">
        <form onSubmit={onSubmit} className="rounded-2xl border border-white/5 bg-ink-850 p-6 sm:p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full Name" required value={form.name} onChange={(e) => set({ name: e.target.value })} placeholder="Your name" />
            <Field label="Email" type="email" required value={form.email} onChange={(e) => set({ email: e.target.value })} placeholder="you@example.com" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Phone" type="tel" value={form.phone} onChange={(e) => set({ phone: e.target.value })} placeholder="+91 98765 43210" />
            <div>
              <label className="block text-mist-300 font-body text-sm mb-2">Inquiry Type</label>
              <select
                value={form.inquiryType}
                onChange={(e) => set({ inquiryType: e.target.value })}
                className="w-full rounded-xl bg-ink-800 border border-white/10 px-4 py-3 text-mist-100 font-body text-sm outline-none focus:border-moss-500/50"
              >
                <option>General Inquiry</option>
                <option>Trip Planning</option>
                <option>Package Inquiry</option>
                <option>Support</option>
              </select>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Preferred Destination" value={form.destination} onChange={(e) => set({ destination: e.target.value })} placeholder="e.g. Chopta, Auli" />
            <Field label="Travel Date" type="date" value={form.travelDate} onChange={(e) => set({ travelDate: e.target.value })} />
          </div>
          <div>
            <label className="block text-mist-300 font-body text-sm mb-2">Message</label>
            <textarea
              rows={5}
              required
              value={form.message}
              onChange={(e) => set({ message: e.target.value })}
              placeholder="Tell us about your trip…"
              className="w-full rounded-xl bg-ink-800 border border-white/10 px-4 py-3 text-mist-100 font-body text-sm placeholder:text-mist-400 outline-none focus:border-moss-500/50"
            />
          </div>
          <Button type="submit" size="md" className="w-full sm:w-auto">
            {sent ? <><Check size={15} /> Message Sent</> : <><Send size={15} /> Send Message</>}
          </Button>
        </form>

        <aside className="rounded-2xl border border-white/5 bg-ink-850 p-6 space-y-5 h-fit">
          <h3 className="font-display text-lg text-mist-100 mb-1">Reach us directly</h3>
          <ContactRow icon={MapPin} label="Office" value={settings.contact.address} />
          {activePhones.map((p, i) => (
            <ContactRow key={`${p.number}-${i}`} icon={Phone} label={p.label} value={p.number} href={`tel:${p.number.replace(/\s+/g, "")}`} />
          ))}
          <ContactRow icon={Mail} label="Email" value={settings.contact.email} href={`mailto:${settings.contact.email}`} />
        </aside>
      </div>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="block text-mist-300 font-body text-sm mb-2">{label}</label>
      <input
        {...props}
        className="w-full rounded-xl bg-ink-800 border border-white/10 px-4 py-3 text-mist-100 font-body text-sm placeholder:text-mist-400 outline-none focus:border-moss-500/50"
      />
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }) {
  const content = (
    <>
      <span className="h-9 w-9 rounded-full bg-moss-500/10 flex items-center justify-center text-moss-400 shrink-0">
        <Icon size={15} />
      </span>
      <div>
        <p className="text-mist-400 text-xs font-body">{label}</p>
        <p className="text-mist-100 font-body text-sm font-semibold">{value}</p>
      </div>
    </>
  );
  return href ? (
    <a href={href} className="flex items-start gap-3 hover:opacity-80 transition-opacity">{content}</a>
  ) : (
    <div className="flex items-start gap-3">{content}</div>
  );
}
