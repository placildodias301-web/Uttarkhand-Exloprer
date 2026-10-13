import { Camera, Users2, X, Play, Briefcase, AtSign, Image, Share2, MessageCircle } from "lucide-react";

// lucide-react (this project's icon set) doesn't ship brand/logo icons, so
// each platform gets a sensible generic icon instead of its real logo.
const ICON_MAP = {
  instagram: Camera,
  facebook: Users2,
  x: X,
  twitter: X,
  youtube: Play,
  linkedin: Briefcase,
  threads: AtSign,
  pinterest: Image,
  whatsapp: MessageCircle,
};

// Platforms offered as one-click presets in Admin → Settings → Social.
export const SUGGESTED_PLATFORMS = [
  { platform: "Instagram", url: "https://instagram.com/" },
  { platform: "Facebook", url: "https://facebook.com/" },
  { platform: "YouTube", url: "https://youtube.com/" },
  { platform: "WhatsApp", url: "https://wa.me/" },
  { platform: "LinkedIn", url: "https://linkedin.com/" },
  { platform: "X", url: "https://x.com/" },
];

export function getSocialIcon(platformName = "") {
  return ICON_MAP[platformName.toLowerCase()] || Share2;
}
