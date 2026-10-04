import { useParams, Navigate, Link } from "react-router-dom";
import { CalendarDays, User, ArrowLeft } from "lucide-react";
import SmartImage from "../../components/SmartImage";
import RegionBadge from "../../components/RegionBadge";
import { useOverlayHeader } from "../../hooks/useOverlayHeader";
import { useBlogs, getBlogRegion } from "../../services/blogs";
import { useDestinations } from "../../services/content";

export default function BlogDetail() {
  useOverlayHeader();
  const { id } = useParams();
  const { blogs } = useBlogs();
  const destinations = useDestinations();
  const blog = blogs.find((b) => b.id === id && b.status === "published");

  if (!blog) return <Navigate to="/blogs" replace />;
  const destination = destinations.find((d) => d.id === blog.destinationId);
  const region = getBlogRegion(blog, destinations);

  return (
    <article>
      <header className="relative isolate min-h-[56vh] flex items-end">
        <SmartImage src={blog.coverImage} alt={blog.title} priority className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/30" />
        <div className="max-w-[820px] mx-auto w-full px-5 sm:px-8 pt-40 pb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <RegionBadge region={region} onImage />
            <span className="text-gold-400 text-xs font-body font-semibold">{blog.category}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-mist-100 leading-[1.08] mb-4">{blog.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-mist-200 text-sm font-body">
            <span className="flex items-center gap-1.5"><User size={13} aria-hidden="true" /> {blog.author}</span>
            {blog.publishDate && (
              <span className="flex items-center gap-1.5">
                <CalendarDays size={13} aria-hidden="true" />
                {new Date(blog.publishDate).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-[820px] mx-auto px-5 sm:px-8 py-12">
        <Link to="/blogs" className="inline-flex items-center gap-1.5 text-moss-400 hover:text-moss-300 text-sm font-body font-semibold mb-8">
          <ArrowLeft size={14} aria-hidden="true" /> Back to blogs
        </Link>

        {blog.subtitle && <p className="font-display text-2xl text-mist-100 leading-snug mb-6">{blog.subtitle}</p>}
        <div className="text-mist-200 font-body text-[17px] leading-[1.8] whitespace-pre-line mb-10">{blog.content}</div>

        {blog.tags?.length > 0 && (
          <ul className="flex flex-wrap gap-2 mb-10" aria-label="Tags">
            {blog.tags.map((t) => (
              <li key={t} className="text-xs font-body text-mist-300 bg-ink-800 border border-white/10 rounded-full px-3 py-1">{t}</li>
            ))}
          </ul>
        )}

        {destination && (
          <Link
            to={`/destinations/${destination.id}`}
            className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-ink-850/80 p-4 hover:border-moss-500/40 transition-colors"
          >
            <SmartImage src={destination.image} alt="" className="h-16 w-24 rounded-lg object-cover shrink-0" />
            <div>
              <p className="text-mist-400 text-xs font-body">Related destination</p>
              <p className="font-display text-xl text-mist-100">{destination.name}</p>
            </div>
          </Link>
        )}
      </div>
    </article>
  );
}
