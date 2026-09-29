import { useRef } from "react";
import { Bold, Italic, Underline, List, ListOrdered, Heading2, Quote, Link2 } from "lucide-react";

const TOOLS = [
  { icon: Bold, wrap: ["**", "**"], title: "Bold" },
  { icon: Italic, wrap: ["_", "_"], title: "Italic" },
  { icon: Underline, wrap: ["<u>", "</u>"], title: "Underline" },
  { icon: Heading2, wrap: ["## ", ""], title: "Heading" },
  { icon: List, wrap: ["- ", ""], title: "Bullet list" },
  { icon: ListOrdered, wrap: ["1. ", ""], title: "Numbered list" },
  { icon: Quote, wrap: ["> ", ""], title: "Quote" },
  { icon: Link2, wrap: ["[", "](https://)"], title: "Link" },
];

// A markdown-flavoured lightweight editor: the toolbar buttons wrap the
// current text selection in markdown syntax rather than rendering true
// rich text. This avoids adding a rich-text-editor dependency for now —
// swap in a real one (e.g. TipTap) later without changing how this is used
// elsewhere, since it just reads/writes a plain string value.
export default function RichTextLite({ value, onChange, rows = 8, placeholder }) {
  const textareaRef = useRef(null);

  const applyWrap = (before, after) => {
    const el = textareaRef.current;
    if (!el) return;
    const { selectionStart, selectionEnd } = el;
    const selected = value.slice(selectionStart, selectionEnd);
    const next = value.slice(0, selectionStart) + before + selected + after + value.slice(selectionEnd);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(selectionStart + before.length, selectionEnd + before.length);
    });
  };

  return (
    <div className="rounded-xl border border-white/10 bg-ink-800 overflow-hidden">
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-white/10 bg-ink-850">
        {TOOLS.map(({ icon: Icon, wrap, title }) => (
          <button
            key={title}
            type="button"
            title={title}
            onClick={() => applyWrap(wrap[0], wrap[1])}
            className="h-7 w-7 rounded-md flex items-center justify-center text-mist-300 hover:text-moss-300 hover:bg-white/5"
          >
            <Icon size={14} />
          </button>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full bg-transparent px-3.5 py-3 text-sm font-body text-mist-100 placeholder:text-mist-400 outline-none resize-y"
      />
    </div>
  );
}
