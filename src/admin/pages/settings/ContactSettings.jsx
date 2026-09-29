import { useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import { useSiteSettings } from "../../../services/siteSettings";
import { Field, TextInput, Toggle } from "../../components/FormFields";

export default function ContactSettings() {
  const { settings, updateContactSettings } = useSiteSettings();
  const [form, setForm] = useState(settings.contact);
  const [saved, setSaved] = useState(false);

  const setPhone = (index, patch) =>
    setForm((f) => ({ ...f, phones: f.phones.map((p, i) => (i === index ? { ...p, ...patch } : p)) }));

  const addPhone = () =>
    setForm((f) => ({ ...f, phones: [...f.phones, { number: "", label: "", enabled: true }] }));

  const removePhone = (index) =>
    setForm((f) => ({ ...f, phones: f.phones.filter((_, i) => i !== index) }));

  const onSave = () => {
    // Drop any blank rows so the public site never shows an empty phone link.
    const cleaned = { ...form, phones: form.phones.filter((p) => p.number.trim()) };
    updateContactSettings(cleaned);
    setForm(cleaned);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl text-mist-100 mb-6">Contact Information</h1>

      <div className="rounded-2xl border border-white/5 bg-ink-850 p-5 space-y-5 mb-5">
        <Field label="Email Address">
          <TextInput type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
        </Field>
        <Field label="Address">
          <TextInput value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} />
        </Field>
      </div>

      <div className="rounded-2xl border border-white/5 bg-ink-850 p-5 space-y-4">
        <div>
          <p className="font-body font-semibold text-mist-100 text-sm">Phone Numbers ({form.phones.length})</p>
          <p className="text-mist-400 text-xs font-body mt-0.5">
            Every number switched on is shown on the website footer and Contact page.
          </p>
        </div>

        {form.phones.map((p, i) => (
          <div key={i} className="rounded-lg bg-ink-800 border border-white/10 p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <p className="text-mist-400 text-xs font-body font-semibold">Phone {i + 1}</p>
              <button
                type="button"
                onClick={() => removePhone(i)}
                className="h-7 w-7 rounded-full flex items-center justify-center text-mist-400 hover:text-rose-400 hover:bg-white/5"
                aria-label={`Remove phone ${i + 1}`}
              >
                <Trash2 size={14} />
              </button>
            </div>
            <TextInput value={p.number} onChange={(e) => setPhone(i, { number: e.target.value })} placeholder="+91 XXXXX XXXXX" />
            <TextInput value={p.label} onChange={(e) => setPhone(i, { label: e.target.value })} placeholder="Label — e.g. General Enquiries" />
            <Toggle checked={p.enabled} onChange={(v) => setPhone(i, { enabled: v })} label={p.enabled ? "Enabled" : "Disabled"} />
          </div>
        ))}

        <button
          type="button"
          onClick={addPhone}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-white/10 py-3 text-sm font-body font-semibold text-moss-400 hover:border-moss-500/40 hover:bg-moss-500/5 transition-colors"
        >
          <Plus size={15} /> Add Phone Number
        </button>
      </div>

      <button onClick={onSave} className="w-full mt-5 py-3 rounded-full bg-moss-500 text-ink-950 font-body font-semibold hover:bg-moss-400 transition-colors">
        {saved ? <><Check size={15} className="inline mr-1.5" /> Saved</> : "Save Changes"}
      </button>
    </div>
  );
}
