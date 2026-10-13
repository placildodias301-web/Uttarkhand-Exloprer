import { Eye, EyeOff } from "lucide-react";
import { isPublished } from "../../services/content";

// Quick enable/disable for list rows. Enabled = "Published", disabled =
// "Disabled" (hidden from the public site, kept in admin).
export default function StatusToggle({ item, onChange, enabledValue = "Published", disabledValue = "Disabled" }) {
  const enabled = isPublished(item);
  return (
    <button
      type="button"
      onClick={() => onChange(enabled ? disabledValue : enabledValue)}
      aria-label={enabled ? `Disable ${item.name || item.title}` : `Enable ${item.name || item.title}`}
      title={enabled ? "Disable (hide from website)" : "Enable (show on website)"}
      className="h-8 w-8 rounded-full flex items-center justify-center text-mist-300 hover:text-moss-300 hover:bg-white/5"
    >
      {enabled ? <Eye size={14} /> : <EyeOff size={14} />}
    </button>
  );
}
