import { useEffect, useRef } from "react";
import { X } from "lucide-react";

// Dialog used across the site and admin. Closes on Escape, backdrop click or
// the close button; focus moves into the dialog when it opens.
export default function Modal({ open, onClose, children, className = "", label }) {
  const closeRef = useRef(null);
  // Callers often pass an inline onClose; keep the latest one in a ref so the
  // effect below only runs on open/close (and focus isn't stolen on re-render).
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onCloseRef.current();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true" aria-label={label}>
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm animate-[fadeUp_0.2s_ease]" onClick={onClose} />
      <div
        className={`relative w-full sm:max-w-3xl max-h-[100dvh] sm:max-h-[92vh] overflow-y-auto bg-ink-850 sm:rounded-2xl border border-white/10 shadow-card animate-floatIn ${className}`}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-3 right-3 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-ink-950/70 text-mist-200 hover:text-moss-400 border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-500/70"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
