import SmartImage from "../../components/SmartImage";
import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp, ArrowUp, ArrowDown, ImagePlus, X } from "lucide-react";
import { Field, TextInput, TextArea, Select } from "./FormFields";
import TagListInput from "./TagListInput";
import { prepareImage } from "../../utils/images";

// Dynamic day-by-day editor shared by the Itinerary and Package forms.
//
// Days are edited in place — existing fields are never dropped, so a seed
// package day ({ hotel, meals, timing, transport, activities }) keeps its
// shape. `keys` maps the editor's Stay/Food inputs onto the field names the
// source uses: packages store "hotel"/"meals", itinerary templates
// "stay"/"food".
import { TEMPLATE_KEYS } from "../utils/dayKeys";

export default function DayEditor({ days, onChange, destinations = [], keys = TEMPLATE_KEYS }) {
  const [openIndex, setOpenIndex] = useState(days.length ? null : 0);

  const renumber = (list) => list.map((d, i) => ({ ...d, day: i + 1 }));
  const update = (index, patch) => onChange(days.map((d, i) => (i === index ? { ...d, ...patch } : d)));
  const add = () => {
    onChange(renumber([...days, { day: days.length + 1, title: "", description: "", activities: [] }]));
    setOpenIndex(days.length);
  };
  const remove = (index) => {
    onChange(renumber(days.filter((_, i) => i !== index)));
    setOpenIndex(null);
  };
  const move = (index, dir) => {
    const to = index + dir;
    if (to < 0 || to >= days.length) return;
    const next = [...days];
    [next[index], next[to]] = [next[to], next[index]];
    onChange(renumber(next));
    setOpenIndex(to);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-mist-300 font-body text-sm">Day-by-day plan ({days.length} {days.length === 1 ? "day" : "days"})</p>
        <button onClick={add} type="button" className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-moss-400 hover:text-moss-300">
          <Plus size={13} /> Add day
        </button>
      </div>

      {days.length === 0 ? (
        <p className="text-mist-400 text-sm font-body py-6 text-center rounded-lg border border-dashed border-white/10">No days added yet.</p>
      ) : (
        <ol className="space-y-2.5">
          {days.map((day, i) => {
            const open = openIndex === i;
            const dest = destinations.find((d) => d.id === day.destinationId);
            return (
              <li key={i} className="rounded-xl bg-ink-800 border border-white/10">
                <div className="flex items-center gap-2 p-2.5">
                  <span className="h-8 w-8 rounded-full bg-moss-500/15 text-moss-300 text-xs font-display font-semibold flex items-center justify-center shrink-0">
                    {day.day ?? i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    className="flex-1 min-w-0 text-left"
                  >
                    <span className="block text-mist-100 text-sm font-body font-semibold truncate">{day.title || "Untitled day"}</span>
                    <span className="block text-mist-400 text-xs font-body truncate">{day.location || dest?.name || "No location"}</span>
                  </button>
                  <div className="flex items-center shrink-0">
                    <IconBtn label="Move up" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUp size={14} /></IconBtn>
                    <IconBtn label="Move down" onClick={() => move(i, 1)} disabled={i === days.length - 1}><ArrowDown size={14} /></IconBtn>
                    <IconBtn label={open ? "Collapse" : "Expand"} onClick={() => setOpenIndex(open ? null : i)}>
                      {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </IconBtn>
                    <IconBtn label="Remove day" onClick={() => remove(i)} danger><Trash2 size={14} /></IconBtn>
                  </div>
                </div>

                {open && (
                  <div className="border-t border-white/10 p-4 space-y-4">
                    <Field label="Day title">
                      <TextInput value={day.title || ""} onChange={(e) => update(i, { title: e.target.value })} placeholder="e.g. Haridwar → Rishikesh" />
                    </Field>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Destination" hint="Links the day to a destination page">
                        <Select value={day.destinationId || ""} onChange={(e) => update(i, { destinationId: e.target.value || null })}>
                          <option value="">None</option>
                          {destinations.map((d) => (
                            <option key={d.id} value={d.id}>{d.name} ({d.region})</option>
                          ))}
                        </Select>
                      </Field>
                      <Field label="Location" hint="Shown on the day; defaults to the destination name">
                        <TextInput value={day.location || ""} onChange={(e) => update(i, { location: e.target.value })} placeholder={dest?.name || "e.g. Triveni Ghat"} />
                      </Field>
                    </div>
                    <Field label="Description">
                      <TextArea rows={3} value={day.description || ""} onChange={(e) => update(i, { description: e.target.value })} placeholder="What happens this day" />
                    </Field>
                    <TagListInput label="Activities" items={day.activities || []} onChange={(v) => update(i, { activities: v })} placeholder="e.g. Evening Ganga Aarti" />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Stay"><TextInput value={day[keys.stay] || ""} onChange={(e) => update(i, { [keys.stay]: e.target.value })} placeholder="Hotel or camp" /></Field>
                      <Field label="Food"><TextInput value={day[keys.food] || ""} onChange={(e) => update(i, { [keys.food]: e.target.value })} placeholder="e.g. Breakfast, Dinner" /></Field>
                      <Field label="Timing"><TextInput value={day.timing || ""} onChange={(e) => update(i, { timing: e.target.value })} placeholder="e.g. 9:00 AM – 6:00 PM" /></Field>
                      <Field label="Transport"><TextInput value={day.transport || ""} onChange={(e) => update(i, { transport: e.target.value })} placeholder="e.g. Private cab" /></Field>
                    </div>
                    <DayImage value={day.image || ""} fallback={dest?.image} onChange={(v) => update(i, { image: v || undefined })} />
                    <Field label="Notes">
                      <TextArea rows={2} value={day.notes || ""} onChange={(e) => update(i, { notes: e.target.value })} placeholder="Anything travellers should know" />
                    </Field>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

function DayImage({ value, fallback, onChange }) {
  const isUrl = value && !value.startsWith("data:");
  return (
    <Field label="Image" hint={value ? undefined : fallback ? "Empty = the destination's photo is used" : undefined}>
      <div className="flex gap-3 items-start">
        <div className="h-16 w-24 rounded-lg overflow-hidden bg-ink-900 border border-white/10 shrink-0">
          {(value || fallback) && <SmartImage src={value || fallback} alt="" className={`h-full w-full object-cover ${value ? "" : "opacity-50"}`} />}
        </div>
        <div className="flex-1 space-y-2 min-w-0">
          <TextInput value={isUrl ? value : ""} onChange={(e) => onChange(e.target.value.trim())} placeholder="Paste an image URL (https://…)" />
          <div className="flex gap-2">
            <label className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-moss-400 hover:text-moss-300 cursor-pointer">
              <ImagePlus size={13} /> Upload
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) onChange(await prepareImage(file));
                }}
              />
            </label>
            {value && (
              <button type="button" onClick={() => onChange("")} className="inline-flex items-center gap-1 text-xs font-body text-mist-400 hover:text-rose-300">
                <X size={12} /> Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </Field>
  );
}

function IconBtn({ label, onClick, disabled, danger, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`h-8 w-8 rounded-full flex items-center justify-center text-mist-400 hover:bg-white/5 disabled:opacity-30 ${danger ? "hover:text-rose-400" : "hover:text-mist-100"}`}
    >
      {children}
    </button>
  );
}
