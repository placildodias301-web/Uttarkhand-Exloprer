import { useState } from "react";
import { Check } from "lucide-react";
import Modal from "./Modal";
import ImageUploadBox from "../admin/components/ImageUploadBox";
import { InputField, TextAreaField, SelectField } from "./FormControls";
import { addSubmission } from "../services/gallerySubmissions";
import { regionNames } from "../data/regions";

const emptyForm = { image: null, visitorName: "", email: "", place: "", region: "", title: "", caption: "" };

// Visitor photo submission. Saved as "pending" — it only appears in the
// public gallery after an admin approves it.
export default function ShareTravelPhotoModal({ open, onClose }) {
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const close = () => {
    onClose();
    setTimeout(() => {
      setForm(emptyForm);
      setSubmitted(false);
      setError("");
    }, 200);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.image) {
      setError("Add a photo before submitting.");
      return;
    }
    try {
      addSubmission(form);
      setSubmitted(true);
    } catch {
      setError("Your photo couldn't be saved. Try a smaller image.");
    }
  };

  return (
    <Modal open={open} onClose={close} className="sm:max-w-lg" label="Share your travel photo">
      <div className="p-6 sm:p-7">
        {submitted ? (
          <div className="text-center py-8" role="status">
            <span className="inline-flex h-12 w-12 rounded-full bg-moss-500/15 text-moss-400 items-center justify-center mb-4">
              <Check size={22} />
            </span>
            <p className="font-display text-xl text-mist-100 mb-1.5">Thanks for sharing</p>
            <p className="text-mist-300 text-sm font-body">
              Your photo is waiting for review and will appear in the gallery once it's approved.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
            <div className="pr-10">
              <h3 className="font-display text-2xl text-mist-100">Share your travel photo</h3>
              <p className="text-mist-400 text-sm font-body mt-1">Photos are reviewed before they're published.</p>
            </div>
            <ImageUploadBox value={form.image} onChange={(v) => { set({ image: v }); setError(""); }} label="Photo" hint="JPG or PNG" required />
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField label="Your name" required value={form.visitorName} onChange={(e) => set({ visitorName: e.target.value })} autoComplete="name" />
              <InputField label="Email" type="email" required value={form.email} onChange={(e) => set({ email: e.target.value })} autoComplete="email" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField label="Place" required value={form.place} onChange={(e) => set({ place: e.target.value })} placeholder="e.g. Palolem" />
              <SelectField label="Region" value={form.region} onChange={(e) => set({ region: e.target.value })} options={regionNames} placeholder="Choose…" />
            </div>
            <InputField label="Photo title" value={form.title} onChange={(e) => set({ title: e.target.value })} placeholder="e.g. Sunset over the bay" />
            <TextAreaField label="Caption" rows={2} value={form.caption} onChange={(e) => set({ caption: e.target.value })} placeholder="A line about the moment" />
            {error && <p className="text-rose-300 text-sm font-body" role="alert">{error}</p>}
            <button type="submit" className="w-full py-3 rounded-full bg-moss-500 text-ink-950 font-body font-semibold hover:bg-moss-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-850">
              Submit photo
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
}
