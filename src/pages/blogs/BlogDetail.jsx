import { useParams, Navigate, Link } from "react-router-dom";
import { CalendarDays, User, ArrowLeft } from "lucide-react";
import { useBlogs } from "../../services/blogs";
import { useDestinations } from "../../services/content";

export default function BlogDetail() {
  const { id } = useParams();
  const { blogs } = useBlogs();
  const destinations = useDestinations();
  const blog = blogs.find((b) => b.id === id && b.status === "published");

  if (!blog) return <Navigate to="/blogs" replace />;
  const destination = destinations.find((d) => d.id === blog.destinationId);

  return (
    <div>
      <section className="relative h-[46vh] min-h-[320px] flex items-end">
        <img src={blog.coverImage} alt={blog.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
        <div className="relative max-w-[800px] mx-auto px-5 sm:px-8 pb-10 w-full">
          <p className="text-moss-400 text-xs font-body font-semibold mb-3">{blog.category}</p>
          <h1 className="font-display text-3xl sm:text-4xl text-mist-100 mb-3">{blog.title}</h1>
          <div className="flex items-center gap-4 text-mist-300 text-sm font-body">
            <span className="flex items-center gap-1.5"><User size={13} /> {blog.author}</span>
            {blog.publishDate && <span className="flex items-center gap-1.5"><CalendarDays size={13} /> {new Date(blog.publishDate).toLocaleDateString()}</span>}
          </div>
        </div>
      </section>

      <div className="max-w-[800px] mx-auto px-5 sm:px-8 py-12">
        <Link to="/blogs" className="inline-flex items-center gap-1.5 text-moss-400 hover:text-moss-300 text-sm font-body font-semibold mb-8">
          <ArrowLeft size={14} /> Back to Blogs
        </Link>

        {blog.subtitle && <p className="text-mist-300 font-body text-lg leading-relaxed mb-6">{blog.subtitle}</p>}
        <p className="text-mist-300 font-body leading-relaxed whitespace-pre-line mb-8">{blog.content}</p>

        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((t) => (
              <span key={t} className="text-xs font-body text-mist-300 bg-ink-800 border border-white/5 rounded-full px-3 py-1">{t}</span>
            ))}
          </div>
        )}

        {destination && (
          <Link
            to={`/destinations/${destination.id}`}
            className="flex items-center gap-4 rounded-2xl border border-white/5 bg-ink-850 p-4 hover:border-moss-500/30 transition-colors"
          >
            <img src={destination.image} alt="" className="h-16 w-24 rounded-lg object-cover shrink-0" />
            <div>
              <p className="text-mist-400 text-xs font-body">Related destination</p>
              <p className="font-display text-lg text-mist-100">{destination.name}</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
