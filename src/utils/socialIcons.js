import { Camera, Users2, X, Play, Briefcase, AtSign, Image, Share2 } from "lucide-react";

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
};

export function getSocialIcon(platformName = "") {
  return ICON_MAP[platformName.toLowerCase()] || Share2;
}
