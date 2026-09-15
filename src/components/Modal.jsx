import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ open, onClose, children, className = "" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-0 sm:p-6">
      <div
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm animate-[fadeUp_0.2s_ease]"
        onClick={onClose}
      />
      <div
        className={`relative w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto bg-ink-850 sm:rounded-2xl border border-white/10 shadow-card animate-floatIn ${className}`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-9 w-9 flex items-center justify-center rounded-full bg-ink-950/70 text-mist-200 hover:text-moss-400 border border-white/10"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
