import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { useBlogs } from "../../services/blogs";
import StatusBadge from "../components/StatusBadge";

export default function BlogsAdmin() {
  const { blogs, updateBlog, deleteBlog } = useBlogs();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const filtered = blogs.filter((b) => {
    const matchesQuery = b.title.toLowerCase().includes(query.toLowerCase());
    const matchesTab = tab === "all" || b.status === tab;
    return matchesQuery && matchesTab;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl text-mist-100">Blogs</h1>
        <Link to="/admin/blogs/new" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-moss-500 text-ink-950 text-sm font-body font-semibold hover:bg-moss-400">
          <Plus size={15} /> Create New Blog
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex items-center gap-2 rounded-lg bg-ink-800 border border-white/10 px-3 py-2.5 max-w-sm w-full sm:w-auto">
          <Search size={15} className="text-mist-400 shrink-0" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search blogs…" className="w-full bg-transparent outline-none text-sm font-body text-mist-100 placeholder:text-mist-400" />
        </div>
        <div className="flex gap-1.5">
          {["all", "published", "draft"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold capitalize border transition-colors ${
                tab === t ? "bg-moss-500 text-ink-950 border-moss-500" : "border-white/10 text-mist-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/5 bg-ink-850 overflow-x-auto">
        <table className="w-full text-sm font-body min-w-[680px]">
          <thead>
            <tr className="text-left text-mist-400 text-xs border-b border-white/5">
              <th className="py-3 px-4 font-semibold">Image</th>
              <th className="py-3 px-4 font-semibold">Title</th>
              <th className="py-3 px-4 font-semibold">Category</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                <td className="py-2.5 px-4"><img src={b.coverImage} alt="" className="h-10 w-14 rounded-md object-cover" /></td>
                <td className="py-2.5 px-4 text-mist-100 font-semibold">{b.title}</td>
                <td className="py-2.5 px-4 text-mist-400">{b.category}</td>
                <td className="py-2.5 px-4"><StatusBadge status={b.status} /></td>
                <td className="py-2.5 px-4">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => updateBlog(b.id, { status: b.status === "published" ? "draft" : "published" })}
                      className="px-2.5 py-1 rounded-full border border-white/10 text-mist-300 text-xs font-body hover:border-moss-500/40 hover:text-moss-300"
                    >
                      {b.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                    <Link to={`/admin/blogs/${b.id}/edit`} className="h-8 w-8 rounded-full flex items-center justify-center text-mist-300 hover:text-moss-300 hover:bg-white/5">
                      <Pencil size={14} />
                    </Link>
                    <button onClick={() => setConfirmDeleteId(b.id)} className="h-8 w-8 rounded-full flex items-center justify-center text-mist-300 hover:text-rose-400 hover:bg-white/5">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="text-center py-10 text-mist-400">No blogs match.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 p-5" onClick={() => setConfirmDeleteId(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl border border-white/10 bg-ink-900 p-5">
            <p className="text-mist-100 font-body font-semibold mb-1.5">Delete this blog post?</p>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setConfirmDeleteId(null)} className="flex-1 py-2 rounded-full border border-white/10 text-mist-200 text-sm font-body">Cancel</button>
              <button
                onClick={() => {
                  deleteBlog(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="flex-1 py-2 rounded-full bg-rose-500 text-white text-sm font-body font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
