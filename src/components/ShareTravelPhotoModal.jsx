import { useState } from "react";
import { Check } from "lucide-react";
import Modal from "./Modal";
import ImageUploadBox from "../admin/components/ImageUploadBox";
import { addSubmission } from "../services/gallerySubmissions";

const emptyForm = { image: null, place: "", title: "", visitorName: "", email: "", caption: "" };

export default function ShareTravelPhotoModal({ open, onClose }) {
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const close = () => {
    onClose();
    setTimeout(() => {
      setForm(emptyForm);
      setSubmitted(false);
    }, 200);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.image || !form.visitorName.trim()) return;
    addSubmission(form);
    setSubmitted(true);
  };

  return (
    <Modal open={open} onClose={close} className="sm:max-w-md">
      <div className="p-6">
        {submitted ? (
          <div className="text-center py-8">
            <span className="inline-flex h-12 w-12 rounded-full bg-moss-500/15 text-moss-400 items-center justify-center mb-4">
              <Check size={22} />
            </span>
            <p className="font-display text-lg text-mist-100 mb-1.5">Thanks for sharing!</p>
            <p className="text-mist-400 text-sm font-body">
              Your photo is pending review and will appear in the gallery once approved.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <h3 className="font-display text-lg text-mist-100">Share Your Travel Photo</h3>
            <ImageUploadBox value={form.image} onChange={(v) => set({ image: v })} label="" hint="A photo from your trip" />
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                value={form.place}
                onChange={(e) => set({ place: e.target.value })}
                placeholder="Place Name"
                className="rounded-lg bg-ink-800 border border-white/10 px-3 py-2.5 text-sm font-body text-mist-100 placeholder:text-mist-400 outline-none focus:border-moss-500/50"
              />
              <input
                value={form.title}
                onChange={(e) => set({ title: e.target.value })}
                placeholder="Photo Title"
                className="rounded-lg bg-ink-800 border border-white/10 px-3 py-2.5 text-sm font-body text-mist-100 placeholder:text-mist-400 outline-none focus:border-moss-500/50"
              />
            </div>
            <input
              required
              value={form.visitorName}
              onChange={(e) => set({ visitorName: e.target.value })}
              placeholder="Your Name"
              className="w-full rounded-lg bg-ink-800 border border-white/10 px-3 py-2.5 text-sm font-body text-mist-100 placeholder:text-mist-400 outline-none focus:border-moss-500/50"
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => set({ email: e.target.value })}
              placeholder="Email"
              className="w-full rounded-lg bg-ink-800 border border-white/10 px-3 py-2.5 text-sm font-body text-mist-100 placeholder:text-mist-400 outline-none focus:border-moss-500/50"
            />
            <textarea
              rows={2}
              value={form.caption}
              onChange={(e) => set({ caption: e.target.value })}
              placeholder="Tell us about your photo…"
              className="w-full rounded-lg bg-ink-800 border border-white/10 px-3 py-2.5 text-sm font-body text-mist-100 placeholder:text-mist-400 outline-none focus:border-moss-500/50 resize-y"
            />
            <button type="submit" className="w-full py-3 rounded-full bg-moss-500 text-ink-950 font-body font-semibold hover:bg-moss-400 transition-colors">
              Submit Photo
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
}
