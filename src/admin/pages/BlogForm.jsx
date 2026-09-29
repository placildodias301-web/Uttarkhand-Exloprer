import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogs, addBlog, updateBlog } from "../../services/blogs";
import { useDestinations } from "../../services/content";
import { Field, TextInput, Select } from "../components/FormFields";
import ImageUploadBox from "../components/ImageUploadBox";
import RichTextLite from "../components/RichTextLite";
import TagListInput from "../components/TagListInput";

const emptyForm = {
  title: "",
  subtitle: "",
  category: "Travel Guide",
  destinationId: "",
  author: "Uttarakhand Explorer Team",
  tags: [],
  content: "",
  coverImage: null,
  status: "draft",
  publishDate: null,
};

export default function BlogForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { blogs } = useBlogs();
  const destinations = useDestinations();
  const isEdit = Boolean(id);
  const existing = isEdit ? blogs.find((b) => b.id === id) : null;

  const [form, setForm] = useState(() => (existing ? { ...emptyForm, ...existing } : emptyForm));
  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const save = (status) => {
    if (!form.title.trim()) return;
    const payload = { ...form, status };
    if (isEdit) {
      updateBlog(id, payload);
    } else {
      addBlog(payload);
    }
    navigate("/admin/blogs");
  };

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-2xl text-mist-100 mb-6">{isEdit ? "Edit Blog" : "Create New Blog"}</h1>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-5">
          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5 space-y-4">
            <Field label="Title" required>
              <TextInput value={form.title} onChange={(e) => set({ title: e.target.value })} placeholder="e.g. Best Time to Visit Auli" />
            </Field>
            <Field label="Subtitle / Excerpt">
              <TextInput value={form.subtitle} onChange={(e) => set({ subtitle: e.target.value })} placeholder="A short standfirst shown on the blog card" />
            </Field>
            <Field label="Content">
              <RichTextLite value={form.content} onChange={(v) => set({ content: v })} rows={12} placeholder="Write the post…" />
            </Field>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
            <ImageUploadBox value={form.coverImage} onChange={(v) => set({ coverImage: v })} label="Cover Image" />
          </div>

          <div className="rounded-2xl border border-white/5 bg-ink-850 p-5 space-y-4">
            <Field label="Category">
              <Select value={form.category} onChange={(e) => set({ category: e.target.value })}>
                <option>Travel Guide</option>
                <option>Adventure</option>
                <option>Beach</option>
                <option>Seasonal</option>
                <option>Food</option>
              </Select>
            </Field>
            <Field label="Destination">
              <Select value={form.destinationId || ""} onChange={(e) => set({ destinationId: e.target.value || null })}>
                <option value="">None</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </Select>
            </Field>
            <Field label="Author">
              <TextInput value={form.author} onChange={(e) => set({ author: e.target.value })} />
            </Field>
            <TagListInput label="Tags" items={form.tags} onChange={(v) => set({ tags: v })} placeholder="e.g. Winter" />
          </div>

          <div className="space-y-2">
            <button onClick={() => save("published")} className="w-full py-3 rounded-full bg-moss-500 text-ink-950 font-body font-semibold hover:bg-moss-400 transition-colors">
              Publish
            </button>
            <button onClick={() => save("draft")} className="w-full py-2.5 rounded-full border border-white/10 text-mist-200 font-body font-semibold hover:border-moss-500/40">
              Save as Draft
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
