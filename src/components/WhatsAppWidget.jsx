import { useState } from "react";
import { MessageCircle, X, Send, Mountain } from "lucide-react";
import { getWhatsAppLink, WHATSAPP_DEFAULT_MESSAGE } from "../data/contact";

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const link = getWhatsAppLink(draft.trim() || WHATSAPP_DEFAULT_MESSAGE);

  const onSend = (e) => {
    e.preventDefault();
    if (link) window.open(link, "_blank", "noreferrer");
  };

  return (
    <div className="fixed bottom-5 left-5 z-[200] flex flex-col items-start gap-3">
      {open && (
        <div className="w-[300px] sm:w-[320px] rounded-2xl overflow-hidden border border-white/10 bg-[#ece5dd] shadow-card animate-floatIn">
          <div className="bg-moss-600 px-4 py-3 flex items-center gap-3">
            <span className="h-8 w-8 rounded-full bg-ink-950/20 flex items-center justify-center text-mist-100 shrink-0">
              <Mountain size={16} />
            </span>
            <div className="min-w-0">
              <p className="text-mist-100 font-body text-sm font-semibold leading-tight truncate">Uttarakhand Explorer</p>
              <p className="text-mist-200/80 font-body text-[11px] leading-tight">Welcomes You</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto h-7 w-7 rounded-full flex items-center justify-center text-mist-100/80 hover:text-mist-100"
              aria-label="Close chat"
            >
              <X size={15} />
            </button>
          </div>

          <div className="p-4 min-h-[140px] flex flex-col justify-end">
            <div className="bg-white rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[85%] shadow-sm">
              <p className="text-ink-900 text-[13px] font-body leading-relaxed">
                Welcome to Uttarakhand Explorer! How can we help you plan your trip?
              </p>
            </div>
          </div>

          <form onSubmit={onSend} className="flex items-center gap-2 p-3 bg-[#f0ece4] border-t border-black/5">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 rounded-full bg-white px-4 py-2 text-[13px] font-body text-ink-900 placeholder:text-ink-600/50 outline-none"
            />
            <button
              type="submit"
              className="h-9 w-9 rounded-full bg-moss-600 text-white flex items-center justify-center shrink-0 hover:bg-moss-500 transition-colors"
              aria-label="Send"
            >
              <Send size={15} />
            </button>
          </form>
          {!link && (
            <p className="text-center text-[10px] font-body text-ink-600/60 pb-2 -mt-1">
              WhatsApp number not configured yet
            </p>
          )}
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="relative h-14 w-14 rounded-full bg-moss-500 text-ink-950 shadow-[0_10px_30px_-8px_rgba(79,212,163,0.6)] flex items-center justify-center hover:bg-moss-400 transition-colors animate-pulseGlow"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle size={24} fill="currentColor" />
        {!open && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-ink-950">
            1
          </span>
        )}
      </button>
    </div>
  );
}
