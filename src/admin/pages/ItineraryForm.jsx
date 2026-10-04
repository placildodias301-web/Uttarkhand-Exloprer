import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { useItineraryTemplates, addItineraryTemplate, updateItineraryTemplate } from "../../services/itineraryTemplates";
import { useDestinations } from "../../services/content";
import { Field, TextInput, TextArea, Select } from "../components/FormFields";
import ImageUploadBox from "../components/ImageUploadBox";

const emptyForm = {
  name: "",
  subname: "",
  destinationId: "",
  duration: "",
  shortDescription: "",
  coverImage: null,
  status: "draft",
  days: [],
};

export default function ItineraryForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { templates } = useItineraryTemplates();
  const destinations = useDestinations();
  const isEdit = Boolean(id);
  const existing = isEdit ? templates.find((t) => t.id === id) : null;

  const [form, setForm] = useState(() => (existing ? { ...emptyForm, ...existing } : emptyForm));
  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const addDay = () => set({ days: [...form.days, { day: form.days.length + 1, title: "", description: "" }] });
  const updateDay = (index, patch) => set({ days: form.days.map((d, i) => (i === index ? { ...d, ...patch } : d)) });
  const removeDay = (index) =>
    set({ days: form.days.filter((_, i) => i !== index).map((d, i) => ({ ...d, day: i + 1 })) });

  const onSave = () => {
    if (!form.name.trim()) return;
    if (isEdit) {
      updateItineraryTemplate(id, form);
    } else {
      addItineraryTemplate(form);
    }
    navigate("/admin/itineraries");
  };

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-2xl text-mist-100 mb-6">{isEdit ? "Edit Itinerary" : "Add New Itinerary"}</h1>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        <div className="space-y-5">
          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
            <ImageUploadBox value={form.coverImage} onChange={(v) => set({ coverImage: v })} label="Cover Image" />
          </div>
          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
            <label className="block text-mist-300 font-body text-sm mb-2">Status</label>
            <div className="flex gap-2">
              {["published", "draft"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set({ status: s })}
                  className={`flex-1 py-2 rounded-lg text-sm font-body font-semibold border capitalize transition-colors ${
                    form.status === s ? "bg-moss-500 text-ink-950 border-moss-500" : "border-white/10 text-mist-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button onClick={onSave} className="w-full py-3 rounded-full bg-moss-500 text-ink-950 font-body font-semibold hover:bg-moss-400 transition-colors">
            Save Itinerary
          </button>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5 space-y-4">
            <Field label="Itinerary Name" required>
              <TextInput value={form.name} onChange={(e) => set({ name: e.target.value })} placeholder="e.g. Himalayan Explorer" />
            </Field>
            <Field label="Subname" hint='e.g. "A 6-Day Journey Through Uttarakhand"'>
              <TextInput value={form.subname} onChange={(e) => set({ subname: e.target.value })} placeholder="A short evocative subtitle" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Destination">
                <Select value={form.destinationId} onChange={(e) => set({ destinationId: e.target.value })}>
                  <option value="">Select…</option>
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Duration"><TextInput value={form.duration} onChange={(e) => set({ duration: e.target.value })} placeholder="e.g. 6 Days" /></Field>
            </div>
            <Field label="Short Description">
              <TextArea rows={3} value={form.shortDescription} onChange={(e) => set({ shortDescription: e.target.value })} placeholder="One or two sentences." />
            </Field>
          </div>

          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-mist-300 font-body text-sm">Day-wise Plan</label>
              <button onClick={addDay} type="button" className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-moss-400 hover:text-moss-300">
                <Plus size={13} /> Add Day
              </button>
            </div>
            {form.days.length === 0 ? (
              <p className="text-mist-400 text-sm font-body py-4 text-center">No days added yet.</p>
            ) : (
              <div className="space-y-2.5">
                {form.days.map((day, i) => (
                  <div key={i} className="rounded-lg bg-ink-800 border border-white/10 p-3 flex gap-2">
                    <span className="h-7 w-7 rounded-full bg-moss-500/15 text-moss-300 text-xs font-display font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      {day.day}
                    </span>
                    <div className="flex-1 space-y-2">
                      <input
                        value={day.title}
                        onChange={(e) => updateDay(i, { title: e.target.value })}
                        placeholder="Day title — e.g. Haridwar → Rishikesh"
                        className="w-full rounded-md bg-ink-900 border border-white/10 px-2.5 py-1.5 text-sm font-body text-mist-100 placeholder:text-mist-400 outline-none focus:border-moss-500/50"
                      />
                      <input
                        value={day.description}
                        onChange={(e) => updateDay(i, { description: e.target.value })}
                        placeholder="What happens this day"
                        className="w-full rounded-md bg-ink-900 border border-white/10 px-2.5 py-1.5 text-sm font-body text-mist-100 placeholder:text-mist-400 outline-none focus:border-moss-500/50"
                      />
                    </div>
                    <button onClick={() => removeDay(i)} type="button" className="h-8 w-8 rounded-full flex items-center justify-center text-mist-400 hover:text-rose-400 hover:bg-white/5 shrink-0 self-start">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
