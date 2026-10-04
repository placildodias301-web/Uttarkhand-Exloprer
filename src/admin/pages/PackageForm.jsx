import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { packagesStore, usePackages, useDestinations } from "../../services/content";
import { Field, TextInput, Select } from "../components/FormFields";
import ImageUploadBox from "../components/ImageUploadBox";
import TagListInput from "../components/TagListInput";
import { regionNames, DEFAULT_REGION } from "../../data/regions";

const emptyForm = {
  region: DEFAULT_REGION,
  name: "",
  subtitle: "",
  days: 3,
  nights: 2,
  destinations: [],
  image: null,
  highlights: [],
  priceFrom: "",
  priceUnit: "per person",
  theme: "classic",
  status: "Published",
};

export default function PackageForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const packages = usePackages();
  const destinations = useDestinations();
  const isEdit = Boolean(id);
  const existing = isEdit ? packages.find((p) => p.id === id) : null;

  const [form, setForm] = useState(() => (existing ? { ...emptyForm, ...existing } : emptyForm));
  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const toggleDestination = (destId) => {
    set({
      destinations: form.destinations.includes(destId)
        ? form.destinations.filter((d) => d !== destId)
        : [...form.destinations, destId],
    });
  };

  const onSave = () => {
    if (!form.name.trim()) return;
    if (isEdit) {
      packagesStore.update(id, form);
    } else {
      packagesStore.add({ ...form, itinerary: [] });
    }
    navigate("/admin/packages");
  };

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl text-mist-100 mb-6">{isEdit ? "Edit Package" : "Add New Package"}</h1>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-5">
          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5 space-y-4">
            <Field label="Region" required>
              <Select value={form.region} onChange={(e) => set({ region: e.target.value, destinations: [] })}>
                {regionNames.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </Select>
            </Field>
            <Field label="Package Name" required>
              <TextInput value={form.name} onChange={(e) => set({ name: e.target.value })} placeholder="e.g. Chopta – Auli Honeymoon Package" />
            </Field>
            <Field label="Subtitle">
              <TextInput value={form.subtitle} onChange={(e) => set({ subtitle: e.target.value })} placeholder="e.g. Meadows, snow peaks and quiet hillside stays" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Days"><TextInput type="number" min={1} value={form.days} onChange={(e) => set({ days: Number(e.target.value) })} /></Field>
              <Field label="Nights"><TextInput type="number" min={0} value={form.nights} onChange={(e) => set({ nights: Number(e.target.value) })} /></Field>
            </div>
            <Field label="Category">
              <Select value={form.theme} onChange={(e) => set({ theme: e.target.value })}>
                <option value="classic">Classic</option>
                <option value="honeymoon">Honeymoon</option>
                <option value="adventure">Adventure</option>
                <option value="spiritual">Spiritual</option>
                <option value="luxury">Luxury</option>
                <option value="budget">Budget Friendly</option>
              </Select>
            </Field>
          </div>

          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
            <label className="block text-mist-300 font-body text-sm mb-2">Destinations Covered ({form.region})</label>
            <div className="flex flex-wrap gap-2">
              {destinations.filter((d) => d.region === form.region).map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => toggleDestination(d.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold border transition-colors ${
                    form.destinations.includes(d.id)
                      ? "bg-moss-500 text-ink-950 border-moss-500"
                      : "border-white/10 text-mist-300 hover:border-moss-500/40"
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
            <TagListInput label="Highlights" items={form.highlights} onChange={(v) => set({ highlights: v })} placeholder="e.g. Evening Ganga Aarti" />
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
            <ImageUploadBox value={form.image} onChange={(v) => set({ image: v })} label="Cover Image" />
          </div>

          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5 space-y-4">
            <Field label="Starting Price"><TextInput value={form.priceFrom} onChange={(e) => set({ priceFrom: e.target.value })} placeholder="₹14,999" /></Field>
            <Field label="Price Unit">
              <Select value={form.priceUnit} onChange={(e) => set({ priceUnit: e.target.value })}>
                <option value="per person">per person</option>
                <option value="per couple">per couple</option>
                <option value="per group">per group</option>
              </Select>
            </Field>
          </div>

          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
            <label className="block text-mist-300 font-body text-sm mb-2">Status</label>
            <div className="flex gap-2">
              {["Published", "Draft"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set({ status: s })}
                  className={`flex-1 py-2 rounded-lg text-sm font-body font-semibold border transition-colors ${
                    form.status === s ? "bg-moss-500 text-ink-950 border-moss-500" : "border-white/10 text-mist-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button onClick={onSave} className="w-full py-3 rounded-full bg-moss-500 text-ink-950 font-body font-semibold hover:bg-moss-400 transition-colors">
            Save Package
          </button>
        </aside>
      </div>
    </div>
  );
}
