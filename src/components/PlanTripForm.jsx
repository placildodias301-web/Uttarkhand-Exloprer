import { useState } from "react";
import { Check, Send } from "lucide-react";
import { InputField, TextAreaField, SelectField } from "./FormControls";
import { addInquiry, INQUIRY_SOURCES } from "../services/inquiries";
import { contentRegionNames } from "../data/regions";

const emptyForm = { name: "", email: "", phone: "", destination: "", travelDate: "", travellers: "2", message: "" };

// Plan My Trip request → saved as an inquiry (source "Plan My Trip", status
// "New") and raises an admin notification.
//   itinerarySummary — optional "Haridwar → Rishikesh …" from the trip builder
//   defaultDestination — "Uttarakhand" | "Goa" | "Combo"
export default function PlanTripForm({ itinerarySummary = "", defaultDestination = "" }) {
  const [form, setForm] = useState({ ...emptyForm, destination: defaultDestination });
  const [sent, setSent] = useState(false);
  const set = (patch) => setForm((f) => ({ ...f, ...patch }));
  const today = new Date().toISOString().slice(0, 10);

  const onSubmit = (e) => {
    e.preventDefault();
    addInquiry({
      ...form,
      source: INQUIRY_SOURCES.planTrip,
      inquiryType: "Trip Planning",
      itinerary: itinerarySummary || undefined,
    });
    setSent(true);
    setForm({ ...emptyForm, destination: defaultDestination });
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-ink-850/80 p-8 text-center" role="status">
        <span className="inline-flex h-12 w-12 rounded-full bg-moss-500/15 text-moss-400 items-center justify-center mb-4">
          <Check size={22} />
        </span>
        <p className="font-display text-2xl text-mist-100 mb-2">Request sent</p>
        <p className="text-mist-300 font-body text-sm mb-6">We'll get back to you about your trip soon.</p>
        <button onClick={() => setSent(false)} className="text-moss-400 hover:text-moss-300 text-sm font-body font-semibold">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/[0.08] bg-ink-850/80 p-6 sm:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <InputField label="Name" required value={form.name} onChange={(e) => set({ name: e.target.value })} autoComplete="name" />
        <InputField label="Email" type="email" required value={form.email} onChange={(e) => set({ email: e.target.value })} autoComplete="email" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <InputField label="Phone" type="tel" value={form.phone} onChange={(e) => set({ phone: e.target.value })} autoComplete="tel" placeholder="+91" />
        <SelectField
          label="Destination"
          required
          value={form.destination}
          onChange={(e) => set({ destination: e.target.value })}
          options={contentRegionNames}
          placeholder="Choose…"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <InputField label="Travel date" type="date" min={today} value={form.travelDate} onChange={(e) => set({ travelDate: e.target.value })} />
        <InputField label="Number of travellers" type="number" min={1} max={50} required value={form.travellers} onChange={(e) => set({ travellers: e.target.value })} />
      </div>
      {itinerarySummary && (
        <p className="rounded-xl bg-ink-900/60 border border-white/10 px-4 py-3 text-sm font-body text-mist-300">
          <span className="text-mist-400">Your stops: </span>
          {itinerarySummary}
        </p>
      )}
      <TextAreaField
        label="Message"
        rows={4}
        value={form.message}
        onChange={(e) => set({ message: e.target.value })}
        placeholder="Anything we should know — pace, interests, budget, who's travelling."
      />
      <button
        type="submit"
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-moss-500 px-7 py-3 font-body font-semibold text-ink-950 hover:bg-moss-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-850"
      >
        <Send size={15} aria-hidden="true" /> Send trip request
      </button>
    </form>
  );
}
