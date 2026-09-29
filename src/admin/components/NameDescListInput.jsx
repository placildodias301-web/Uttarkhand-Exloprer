import { Plus, Trash2 } from "lucide-react";

export default function NameDescListInput({ label, items, onChange, addLabel = "Add Item" }) {
  const update = (index, patch) => onChange(items.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  const remove = (index) => onChange(items.filter((_, i) => i !== index));
  const add = () => onChange([...items, { name: "", desc: "" }]);

  return (
    <div>
      {label && <label className="block text-mist-300 font-body text-sm mb-2">{label}</label>}
      <div className="space-y-2.5 mb-2.5">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg bg-ink-800 border border-white/10 p-3 flex gap-2">
            <div className="flex-1 space-y-2">
              <input
                value={item.name}
                onChange={(e) => update(i, { name: e.target.value })}
                placeholder="Name"
                className="w-full rounded-md bg-ink-900 border border-white/10 px-2.5 py-1.5 text-sm font-body text-mist-100 placeholder:text-mist-400 outline-none focus:border-moss-500/50"
              />
              <input
                value={item.desc}
                onChange={(e) => update(i, { desc: e.target.value })}
                placeholder="Short description"
                className="w-full rounded-md bg-ink-900 border border-white/10 px-2.5 py-1.5 text-sm font-body text-mist-100 placeholder:text-mist-400 outline-none focus:border-moss-500/50"
              />
            </div>
            <button type="button" onClick={() => remove(i)} className="h-8 w-8 rounded-full flex items-center justify-center text-mist-400 hover:text-rose-400 hover:bg-white/5 shrink-0 self-start">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-moss-400 hover:text-moss-300"
      >
        <Plus size={13} /> {addLabel}
      </button>
    </div>
  );
}
