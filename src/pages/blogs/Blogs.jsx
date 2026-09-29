import { Link } from "react-router-dom";
import { CalendarDays, User } from "lucide-react";
import SectionHeader from "../../components/SectionHeader";
import { useBlogs } from "../../services/blogs";

export default function Blogs() {
  const { published } = useBlogs();

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-20">
      <SectionHeader
        kicker="Blogs"
        title="Stories from the road"
        description="Practical guides and notes from across Uttarakhand — and, soon, Goa."
      />

      {published.length === 0 ? (
        <p className="text-mist-400 font-body text-sm">No posts published yet — check back soon.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {published.map((b) => (
            <Link key={b.id} to={`/blogs/${b.id}`} className="group rounded-2xl overflow-hidden border border-white/5 bg-ink-850">
              <div className="h-44 overflow-hidden">
                <img src={b.coverImage} alt={b.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <p className="text-moss-400 text-[11px] font-body font-semibold mb-1.5">{b.category}</p>
                <h3 className="font-display text-lg text-mist-100 mb-1.5 leading-snug group-hover:text-moss-300 transition-colors">{b.title}</h3>
                <p className="text-mist-400 text-sm font-body leading-relaxed mb-4 line-clamp-2">{b.subtitle}</p>
                <div className="flex items-center gap-4 text-mist-400 text-xs font-body">
                  <span className="flex items-center gap-1"><User size={11} /> {b.author}</span>
                  {b.publishDate && <span className="flex items-center gap-1"><CalendarDays size={11} /> {new Date(b.publishDate).toLocaleDateString()}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
