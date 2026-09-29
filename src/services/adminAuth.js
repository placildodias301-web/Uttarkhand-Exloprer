import { createStore } from "./createStore";
import { useStore } from "../hooks/useStore";

// IMPORTANT: this is a frontend-only demo auth layer. There is no server to
// verify against, so "security" here just means we don't keep the password
// sitting around in plaintext. SHA-256 via the browser's built-in Web Crypto
// API is used instead of a real password hashing algorithm (which needs a
// server and per-user salt to be meaningful) — swap this whole file for real
// API calls once a backend exists; nothing else in the app should need to
// change since components only ever call the exported functions below.
async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const DEFAULT_EMAIL = "admin@uttarakhandexplorer.in";
const DEFAULT_PASSWORD = "Admin@123";

const profileStore = createStore("uk_admin_profile", {
  name: "Admin",
  email: DEFAULT_EMAIL,
  avatarDataUrl: null,
  passwordHash: null, // set lazily on first use, see ensureSeeded()
});

const sessionStore = createStore("uk_admin_session", { loggedIn: false });

let seeded = false;
async function ensureSeeded() {
  if (seeded) return;
  seeded = true;
  if (!profileStore.getState().passwordHash) {
    const hash = await sha256(DEFAULT_PASSWORD);
    profileStore.setState((p) => ({ ...p, passwordHash: hash }));
  }
}

export async function login(email, password) {
  await ensureSeeded();
  const profile = profileStore.getState();
  const hash = await sha256(password);
  if (email.trim().toLowerCase() === profile.email.toLowerCase() && hash === profile.passwordHash) {
    sessionStore.setState({ loggedIn: true });
    return { ok: true };
  }
  return { ok: false, error: "Incorrect email or password." };
}

export function logout() {
  sessionStore.setState({ loggedIn: false });
}

export function isLoggedIn() {
  return sessionStore.getState().loggedIn;
}

export function useAdminSession() {
  const session = useStore(sessionStore);
  return { loggedIn: session.loggedIn, login, logout };
}

export function useAdminProfile() {
  const profile = useStore(profileStore);
  return { profile, updateProfile: (patch) => profileStore.setState((p) => ({ ...p, ...patch })) };
}

export async function changePassword(currentPassword, newPassword) {
  await ensureSeeded();
  const profile = profileStore.getState();
  const currentHash = await sha256(currentPassword);
  if (currentHash !== profile.passwordHash) {
    return { ok: false, error: "Current password is incorrect." };
  }
  const newHash = await sha256(newPassword);
  profileStore.setState((p) => ({ ...p, passwordHash: newHash }));
  return { ok: true };
}

// Exposed only so the login page can hint at the demo credentials.
export const DEMO_CREDENTIALS = { email: DEFAULT_EMAIL, password: DEFAULT_PASSWORD };
