// Fill in your WhatsApp business number (with country code, no + or spaces,
// e.g. "919876543210") to activate all WhatsApp contact points on the site.
// Leave it blank to keep the buttons visible but inactive.
export const WHATSAPP_NUMBER = "";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi! I'm planning a trip with Peak & Palm and had a few questions.";

export function getWhatsAppLink(message = WHATSAPP_DEFAULT_MESSAGE) {
  if (!WHATSAPP_NUMBER) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
