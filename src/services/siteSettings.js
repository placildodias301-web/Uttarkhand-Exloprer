import { createStore } from "./createStore";
import { useStore } from "../hooks/useStore";
import { pushNotification } from "./notifications";

const DEFAULT_SETTINGS = {
  general: {
    siteName: "Peak & Palm",
    tagline: "From Peaks to Palms.",
    logoDataUrl: null, // null = fall back to the built-in Mountain icon + text
    faviconDataUrl: null,
  },
  contact: {
    address: "Dehradun, Uttarakhand",
    email: "hello@uttarakhandexplorer.in",
    phones: [
      { number: "+91 98765 43210", label: "General Enquiries", enabled: true },
      { number: "+91 98765 43211", label: "Trip Planning", enabled: true },
      { number: "+91 98765 43212", label: "Support", enabled: false },
    ],
  },
  social: [
    { id: "instagram", platform: "Instagram", url: "https://instagram.com", enabled: true },
    { id: "facebook", platform: "Facebook", url: "https://facebook.com", enabled: true },
    { id: "x", platform: "X", url: "https://x.com", enabled: true },
    { id: "youtube", platform: "YouTube", url: "https://youtube.com", enabled: false },
  ],
  system: {
    maintenanceMode: false,
    maintenanceTitle: "We'll Be Back Soon",
    maintenanceMessage: "Our website is currently under maintenance. Please check back shortly.",
    showContactInfo: true,
    showSocialLinks: true,
  },
};

const store = createStore("uk_site_settings", DEFAULT_SETTINGS);

// One-time rebrand migration. Browsers that already saved settings still hold
// the old default name/tagline in localStorage. Only values that exactly match
// the OLD defaults are replaced — anything the admin typed themselves is kept,
// and no other setting is touched.
const LEGACY_GENERAL = { siteName: "Uttarakhand Explorer", tagline: "Explore · Experience · Discover" };
(function migrateBrand() {
  const general = store.getState()?.general;
  if (!general) return;
  const patch = {};
  if (general.siteName === LEGACY_GENERAL.siteName) patch.siteName = DEFAULT_SETTINGS.general.siteName;
  if (general.tagline === LEGACY_GENERAL.tagline) patch.tagline = DEFAULT_SETTINGS.general.tagline;
  if (Object.keys(patch).length) {
    store.setState((s) => ({ ...s, general: { ...s.general, ...patch } }));
  }
})();

export function updateGeneralSettings(patch) {
  store.setState((s) => ({ ...s, general: { ...s.general, ...patch } }));
}

export function updateContactSettings(patch) {
  store.setState((s) => ({ ...s, contact: { ...s.contact, ...patch } }));
}

export function updatePhone(index, patch) {
  store.setState((s) => {
    const phones = s.contact.phones.map((p, i) => (i === index ? { ...p, ...patch } : p));
    return { ...s, contact: { ...s.contact, phones } };
  });
}

export function addSocialPlatform(entry) {
  const id = entry.id || entry.platform.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  store.setState((s) => ({ ...s, social: [...s.social, { enabled: true, ...entry, id }] }));
}

export function updateSocialPlatform(id, patch) {
  store.setState((s) => ({
    ...s,
    social: s.social.map((p) => (p.id === id ? { ...p, ...patch } : p)),
  }));
}

export function removeSocialPlatform(id) {
  store.setState((s) => ({ ...s, social: s.social.filter((p) => p.id !== id) }));
}

export function updateSystemSettings(patch) {
  const prev = store.getState().system;
  store.setState((s) => ({ ...s, system: { ...s.system, ...patch } }));
  if ("maintenanceMode" in patch && patch.maintenanceMode !== prev.maintenanceMode) {
    pushNotification({
      type: "system",
      title: patch.maintenanceMode ? "Maintenance mode enabled" : "Maintenance mode disabled",
      message: "Website setting changed",
      link: "/admin/settings/system",
    });
  }
}

export function useSiteSettings() {
  const settings = useStore(store);
  return {
    settings,
    updateGeneralSettings,
    updateContactSettings,
    updatePhone,
    addSocialPlatform,
    updateSocialPlatform,
    removeSocialPlatform,
    updateSystemSettings,
  };
}

export function getSiteSettings() {
  return store.getState();
}
