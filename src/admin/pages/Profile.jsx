import { useState } from "react";
import { Check, AlertCircle } from "lucide-react";
import { useAdminProfile, changePassword } from "../../services/adminAuth";
import { Field, TextInput } from "../components/FormFields";
import ImageUploadBox from "../components/ImageUploadBox";

export default function Profile() {
  const { profile, updateProfile } = useAdminProfile();
  const [form, setForm] = useState({ name: profile.name, email: profile.email, avatarDataUrl: profile.avatarDataUrl });
  const [savedProfile, setSavedProfile] = useState(false);

  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState(false);

  const saveProfile = () => {
    updateProfile(form);
    setSavedProfile(true);
    setTimeout(() => setSavedProfile(false), 1800);
  };

  const submitPasswordChange = async (e) => {
    e.preventDefault();
    setPwError("");
    setPwSuccess(false);
    if (pw.next.length < 6) {
      setPwError("New password must be at least 6 characters.");
      return;
    }
    if (pw.next !== pw.confirm) {
      setPwError("New password and confirmation don't match.");
      return;
    }
    const result = await changePassword(pw.current, pw.next);
    if (!result.ok) {
      setPwError(result.error);
      return;
    }
    setPwSuccess(true);
    setPw({ current: "", next: "", confirm: "" });
  };

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl text-mist-100 mb-6">Admin Profile</h1>

      <div className="rounded-2xl border border-white/5 bg-ink-850 p-5 space-y-5 mb-6">
        <h3 className="font-body font-semibold text-mist-100 text-sm">Profile Information</h3>
        <ImageUploadBox value={form.avatarDataUrl} onChange={(v) => setForm((f) => ({ ...f, avatarDataUrl: v }))} label="Change Photo" hint="Square image works best" />
        <Field label="Name">
          <TextInput value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        </Field>
        <Field label="Email">
          <TextInput type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
        </Field>
        <button onClick={saveProfile} className="w-full py-2.5 rounded-full bg-moss-500 text-ink-950 font-body font-semibold hover:bg-moss-400 transition-colors">
          {savedProfile ? <><Check size={15} className="inline mr-1.5" /> Saved</> : "Save Profile"}
        </button>
      </div>

      <form onSubmit={submitPasswordChange} className="rounded-2xl border border-white/5 bg-ink-850 p-5 space-y-4">
        <h3 className="font-body font-semibold text-mist-100 text-sm">Change Password</h3>

        {pwError && (
          <div className="flex items-center gap-2 text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2.5 text-xs font-body">
            <AlertCircle size={14} className="shrink-0" /> {pwError}
          </div>
        )}
        {pwSuccess && (
          <div className="flex items-center gap-2 text-moss-300 bg-moss-500/10 border border-moss-500/20 rounded-lg px-3 py-2.5 text-xs font-body">
            <Check size={14} className="shrink-0" /> Password updated.
          </div>
        )}

        <Field label="Current Password">
          <TextInput type="password" value={pw.current} onChange={(e) => setPw((p) => ({ ...p, current: e.target.value }))} required />
        </Field>
        <Field label="New Password">
          <TextInput type="password" value={pw.next} onChange={(e) => setPw((p) => ({ ...p, next: e.target.value }))} required />
        </Field>
        <Field label="Confirm New Password">
          <TextInput type="password" value={pw.confirm} onChange={(e) => setPw((p) => ({ ...p, confirm: e.target.value }))} required />
        </Field>
        <button type="submit" className="w-full py-2.5 rounded-full border border-white/10 text-mist-200 font-body font-semibold hover:border-moss-500/40 transition-colors">
          Update Password
        </button>
      </form>
    </div>
  );
}
