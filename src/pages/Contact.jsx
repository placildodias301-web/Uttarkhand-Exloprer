import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

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
            <Field label="Full Name" placeholder="Your name" required />
            <Field label="Email" type="email" placeholder="you@example.com" required />
          </div>
          <Field label="Phone" type="tel" placeholder="+91 98765 43210" />
          <Field label="Preferred Destinations" placeholder="e.g. Chopta, Auli" />
          <div>
            <label className="block text-mist-300 font-body text-sm mb-2">Message</label>
            <textarea
              rows={5}
              required
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
          <ContactRow icon={MapPin} label="Office" value="Dehradun, Uttarakhand" />
          <ContactRow icon={Phone} label="Phone" value="+91 98765 43210" />
          <ContactRow icon={Mail} label="Email" value="hello@uttarakhandexplorer.in" />
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

function ContactRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="h-9 w-9 rounded-full bg-moss-500/10 flex items-center justify-center text-moss-400 shrink-0">
        <Icon size={15} />
      </span>
      <div>
        <p className="text-mist-400 text-xs font-body">{label}</p>
        <p className="text-mist-100 font-body text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}
