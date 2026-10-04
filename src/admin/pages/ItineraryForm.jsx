import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useItineraryTemplates, addItineraryTemplate, updateItineraryTemplate } from "../../services/itineraryTemplates";
import { useDestinations } from "../../services/content";
import { Field, TextInput, TextArea, Select } from "../components/FormFields";
import ImageUploadBox from "../components/ImageUploadBox";
import DayEditor from "../components/DayEditor";
import { contentRegionNames, normalizeRegion, regionLabel } from "../../data/regions";

const emptyForm = {
  name: "",
  subname: "",
  region: "",
  destinationId: "",
  duration: "",
  shortDescription: "",
  description: "",
  coverImage: null,
  status: "draft",
  days: [],
};

// Itinerary templates (store "uk_itinerary_templates"). Existing fields are
// kept as they are; region and description are optional additions.
export default function ItineraryForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { templates } = useItineraryTemplates();
  const destinations = useDestinations();
  const isEdit = Boolean(id);
  const existing = isEdit ? templates.find((t) => t.id === id) : null;

  const [form, setForm] = useState(() => {
    if (!existing) return emptyForm;
    // Older templates have no region — show the one implied by their destination.
    const implied = destinations.find((d) => d.id === existing.destinationId)?.region || "";
    return { ...emptyForm, ...existing, region: existing.region || implied };
  });
  const [error, setError] = useState("");
  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const regionKey = normalizeRegion(form.region);
  const destinationOptions = destinations.filter((d) => !regionKey || regionKey === "combo" || normalizeRegion(d.region) === regionKey);

  const onSave = () => {
    if (!form.name.trim()) return setError("Add an itinerary name before saving.");
    const payload = { ...form, region: form.region ? regionLabel(form.region) : undefined };
    if (isEdit) updateItineraryTemplate(id, payload);
    else addItineraryTemplate(payload);
    navigate("/admin/itineraries");
  };

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-2xl text-mist-100 mb-6">{isEdit ? "Edit Itinerary" : "Add New Itinerary"}</h1>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6 [&>*]:min-w-0">
        <div className="space-y-5 order-2 lg:order-1">
          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
            <ImageUploadBox value={form.coverImage} onChange={(v) => set({ coverImage: v })} label="Cover Image" />
          </div>
          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
            <p className="block text-mist-300 font-body text-sm mb-2">Status</p>
            <div className="flex gap-1.5">
              {[
                ["published", "Published"],
                ["draft", "Draft"],
                ["disabled", "Disabled"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => set({ status: value })}
                  aria-pressed={form.status === value}
                  className={`flex-1 py-2 rounded-lg text-xs font-body font-semibold border transition-colors ${
                    form.status === value ? "bg-moss-500 text-ink-950 border-moss-500" : "border-white/10 text-mist-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="text-mist-400 text-xs font-body mt-2">Only published itineraries appear on the website.</p>
          </div>
          {error && <p role="alert" className="text-rose-300 text-sm font-body">{error}</p>}
          <button onClick={onSave} className="w-full py-3 rounded-full bg-moss-500 text-ink-950 font-body font-semibold hover:bg-moss-400 transition-colors">
            Save Itinerary
          </button>
        </div>

        <div className="space-y-5 order-1 lg:order-2">
          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5 space-y-4">
            <Field label="Itinerary Name" required>
              <TextInput value={form.name} onChange={(e) => set({ name: e.target.value })} placeholder="e.g. Himalayan Explorer" />
            </Field>
            <Field label="Subtitle" hint='e.g. "A 6-Day Journey Through Uttarakhand"'>
              <TextInput value={form.subname} onChange={(e) => set({ subname: e.target.value })} placeholder="A short subtitle" />
            </Field>
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Region">
                <Select value={form.region || ""} onChange={(e) => set({ region: e.target.value })}>
                  <option value="">From destination</option>
                  {contentRegionNames.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Main destination">
                <Select value={form.destinationId || ""} onChange={(e) => set({ destinationId: e.target.value })}>
                  <option value="">Select…</option>
                  {destinationOptions.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Duration"><TextInput value={form.duration} onChange={(e) => set({ duration: e.target.value })} placeholder="e.g. 6 Days" /></Field>
            </div>
            <Field label="Short Description" hint="Shown on itinerary cards">
              <TextArea rows={2} value={form.shortDescription} onChange={(e) => set({ shortDescription: e.target.value })} placeholder="One or two sentences." />
            </Field>
            <Field label="Description" hint="Shown at the top of the itinerary page (optional)">
              <TextArea rows={4} value={form.description || ""} onChange={(e) => set({ description: e.target.value })} />
            </Field>
          </div>

          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
            <DayEditor days={form.days} onChange={(days) => set({ days })} destinations={destinations} />
          </div>
        </div>
      </div>
    </div>
  );
}
