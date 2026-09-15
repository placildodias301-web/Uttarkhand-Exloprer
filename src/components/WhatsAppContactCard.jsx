import { MessageCircle } from "lucide-react";
import { getWhatsAppLink, WHATSAPP_DEFAULT_MESSAGE } from "../data/contact";

export default function WhatsAppContactCard({ title = "Have questions?", message = WHATSAPP_DEFAULT_MESSAGE }) {
  const link = getWhatsAppLink(message);

  return (
    <div className="rounded-xl border border-moss-500/20 bg-moss-500/[0.06] p-4">
      <div className="flex items-start gap-3">
        <span className="h-9 w-9 rounded-full bg-moss-500/15 flex items-center justify-center text-moss-400 shrink-0">
          <MessageCircle size={16} />
        </span>
        <div className="min-w-0">
          <p className="text-mist-100 font-body text-sm font-semibold mb-0.5">{title}</p>
          <p className="text-mist-400 font-body text-xs leading-relaxed mb-3">
            Chat with us on WhatsApp and we'll help you plan it out.
          </p>
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-body font-semibold text-moss-400 hover:text-moss-300"
            >
              <MessageCircle size={13} /> Chat on WhatsApp
            </a>
          ) : (
            <span
              className="inline-flex items-center gap-2 text-xs font-body font-semibold text-mist-400 cursor-not-allowed"
              title="Add a WhatsApp number in src/data/contact.js to activate this"
            >
              <MessageCircle size={13} /> Chat on WhatsApp
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
