import { useState } from "react";
import { Check } from "lucide-react";
import { useSiteSettings } from "../../../services/siteSettings";
import { Field, TextInput } from "../../components/FormFields";
import ImageUploadBox from "../../components/ImageUploadBox";

export default function GeneralSettings() {
  const { settings, updateGeneralSettings } = useSiteSettings();
  const [form, setForm] = useState(settings.general);
  const [saved, setSaved] = useState(false);

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const onSave = () => {
    updateGeneralSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl text-mist-100 mb-6">General Settings</h1>

      <div className="rounded-2xl border border-white/5 bg-ink-850 p-5 space-y-5">
        <Field label="Website Name">
          <TextInput value={form.siteName} onChange={(e) => set({ siteName: e.target.value })} />
        </Field>
        <Field label="Tagline">
          <TextInput value={form.tagline} onChange={(e) => set({ tagline: e.target.value })} />
        </Field>
        <ImageUploadBox value={form.logoDataUrl} onChange={(v) => set({ logoDataUrl: v })} label="Logo" hint="Square image works best" />
        <ImageUploadBox value={form.faviconDataUrl} onChange={(v) => set({ faviconDataUrl: v })} label="Favicon" hint="32x32px" />

        <button onClick={onSave} className="w-full py-3 rounded-full bg-moss-500 text-ink-950 font-body font-semibold hover:bg-moss-400 transition-colors">
          {saved ? <><Check size={15} className="inline mr-1.5" /> Saved</> : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
