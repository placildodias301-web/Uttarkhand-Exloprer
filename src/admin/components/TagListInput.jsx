import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function TagListInput({ label, items, onChange, placeholder = "Add item…" }) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const value = draft.trim();
    if (!value) return;
    onChange([...items, value]);
    setDraft("");
  };

  const remove = (index) => onChange(items.filter((_, i) => i !== index));

  return (
    <div>
      {label && <label className="block text-mist-300 font-body text-sm mb-1.5">{label}</label>}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 bg-ink-800 border border-white/10 rounded-full pl-3 pr-1.5 py-1 text-xs font-body text-mist-200">
            {item}
            <button type="button" onClick={() => remove(i)} className="h-4 w-4 rounded-full flex items-center justify-center hover:bg-white/10">
              <X size={11} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className="flex-1 rounded-lg bg-ink-800 border border-white/10 px-3 py-2 text-sm font-body text-mist-100 placeholder:text-mist-400 outline-none focus:border-moss-500/50"
        />
        <button
          type="button"
          onClick={add}
          className="h-9 w-9 rounded-lg bg-ink-800 border border-white/10 flex items-center justify-center text-mist-300 hover:text-moss-300 hover:border-moss-500/40 shrink-0"
        >
          <Plus size={15} />
        </button>
      </div>
    </div>
  );
}
