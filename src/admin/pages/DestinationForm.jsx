import SmartImage from "../../components/SmartImage";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { destinationsStore, useDestinations } from "../../services/content";
import { Field, TextInput, TextArea, Select } from "../components/FormFields";
import ImageUploadBox from "../components/ImageUploadBox";
import { prepareImage } from "../../utils/images";
import { CONTENT_STATUSES } from "../../services/content";
import RichTextLite from "../components/RichTextLite";
import TagListInput from "../components/TagListInput";
import NameDescListInput from "../components/NameDescListInput";
import { regionNames } from "../../data/regions";

const ACCENTS = ["#e8a23c", "#4fd4a3", "#4a9de8", "#a35de8", "#e85d8a", "#5cd4e8", "#6fae4a", "#e0c14a"];

const emptyForm = {
  name: "",
  tagline: "",
  region: "Uttarakhand",
  location: "",
  shortDescription: "",
  description: "",
  image: null,
  gallery: [],
  bestTime: "",
  idealDuration: "",
  altitude: "",
  tempRange: "",
  famousFor: "",
  howToReach: "",
  attractions: [],
  activities: [],
  highlights: [],
  status: "Published",
};

export default function DestinationForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const destinations = useDestinations();
  const isEdit = Boolean(id);
  const existing = isEdit ? destinations.find((d) => d.id === id) : null;

  const [form, setForm] = useState(() =>
    existing
      ? { ...emptyForm, ...existing, status: existing.status || "Published" }
      : emptyForm
  );

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));
  const [error, setError] = useState("");

  const onSave = () => {
    if (!form.name.trim()) return setError("Add a destination name before saving.");
    if (isEdit) {
      destinationsStore.update(id, form);
    } else {
      destinationsStore.add({
        ...form,
        accent: ACCENTS[Math.floor(Math.random() * ACCENTS.length)],
        rating: 4.5,
        reviews: 0,
        lat: 30.0,
        lng: 79.0,
        hotels: [],
        cuisine: [],
      });
    }
    navigate("/admin/destinations");
  };

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-2xl text-mist-100 mb-6">{isEdit ? "Edit Destination" : "Add New Destination"}</h1>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6 [&>*]:min-w-0">
        <div className="space-y-5">
          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5 space-y-4">
            <Field label="Destination Name" required>
              <TextInput value={form.name} onChange={(e) => set({ name: e.target.value })} placeholder="e.g. Haridwar" />
            </Field>
            <Field label="Location" hint="e.g. Dehradun district, Uttarakhand — shown on cards and the destination page">
              <TextInput value={form.location || ""} onChange={(e) => set({ location: e.target.value })} placeholder="Town, district or area" />
            </Field>
            <Field label="Destination group (region)" required>
              <Select value={form.region} onChange={(e) => set({ region: e.target.value })}>
                {regionNames.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </Select>
            </Field>
            <Field label="Short Tagline" required>
              <TextInput value={form.tagline} onChange={(e) => set({ tagline: e.target.value })} placeholder="e.g. The City of Gods" />
            </Field>
            <Field label="Short Description" required>
              <TextArea rows={2} value={form.shortDescription} onChange={(e) => set({ shortDescription: e.target.value })} placeholder="One or two sentences shown on cards" />
            </Field>
            <Field label="Description" required>
              <RichTextLite value={form.description} onChange={(v) => set({ description: v })} rows={6} placeholder="Write destination description…" />
            </Field>
          </div>

          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5 space-y-4">
            <h3 className="font-body font-semibold text-mist-100 text-sm">Additional Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Best Time to Visit"><TextInput value={form.bestTime} onChange={(e) => set({ bestTime: e.target.value })} placeholder="e.g. Sept – June" /></Field>
              <Field label="Ideal Duration"><TextInput value={form.idealDuration} onChange={(e) => set({ idealDuration: e.target.value })} placeholder="e.g. 2 Nights / 3 Days" /></Field>
              <Field label="Altitude"><TextInput value={form.altitude} onChange={(e) => set({ altitude: e.target.value })} placeholder="e.g. 314 m" /></Field>
              <Field label="Temperature Range"><TextInput value={form.tempRange} onChange={(e) => set({ tempRange: e.target.value })} placeholder="e.g. 8°C – 34°C" /></Field>
            </div>
            <Field label="Famous For"><TextInput value={form.famousFor} onChange={(e) => set({ famousFor: e.target.value })} placeholder="e.g. Temples, Ghats, Spirituality" /></Field>
            <Field label="How to Reach"><TextArea rows={3} value={form.howToReach} onChange={(e) => set({ howToReach: e.target.value })} placeholder="Nearest airport, railhead, road route…" /></Field>
          </div>

          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5 space-y-5">
            <NameDescListInput label="Attractions" items={form.attractions} onChange={(v) => set({ attractions: v })} addLabel="Add Attraction" />
            <TagListInput label="Highlights" items={form.highlights || []} onChange={(v) => set({ highlights: v })} placeholder="e.g. Evening Ganga Aarti" />
            <p className="text-mist-400 text-xs font-body -mt-3">Leave empty to show the attraction names as highlights.</p>
            <TagListInput label="Activities" items={form.activities} onChange={(v) => set({ activities: v })} placeholder="e.g. River Rafting" />
          </div>

          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
            <label className="block text-mist-300 font-body text-sm mb-3">Gallery Images</label>
            <div className="grid grid-cols-3 gap-3">
              {form.gallery.map((src, i) => (
                <div key={i} className="relative aspect-square">
                  <SmartImage src={src} alt="" className="h-full w-full object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => set({ gallery: form.gallery.filter((_, idx) => idx !== i) })}
                    className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-ink-950/80 text-mist-100 flex items-center justify-center"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-lg border-2 border-dashed border-white/10 bg-ink-800 hover:border-white/20 flex flex-col items-center justify-center cursor-pointer text-mist-400">
                <Plus size={18} className="mb-1" />
                <span className="text-[11px] font-body">Add Images</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const dataUrl = await prepareImage(file);
                    setForm((f) => ({ ...f, gallery: [...f.gallery, dataUrl] }));
                  }}
                />
              </label>
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
            <ImageUploadBox value={form.image} onChange={(v) => set({ image: v })} label="Main Image" />
          </div>

          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
            <label className="block text-mist-300 font-body text-sm mb-2">Status</label>
            <div className="flex gap-1.5">
              {CONTENT_STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set({ status: s })}
                  className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-body font-semibold border transition-colors ${
                    form.status === s ? "bg-moss-500 text-ink-950 border-moss-500" : "border-white/10 text-mist-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {error && <p role="alert" className="text-rose-300 text-sm font-body">{error}</p>}
          <button
            onClick={onSave}
            className="w-full py-3 rounded-full bg-moss-500 text-ink-950 font-body font-semibold hover:bg-moss-400 transition-colors"
          >
            Save Destination
          </button>
        </aside>
      </div>
    </div>
  );
}
