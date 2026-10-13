import PageIntro from "../../components/PageIntro";
import BlogCard from "../../components/BlogCard";
import RegionTabs from "../../components/RegionTabs";
import { useListRegion } from "../../services/travelSection";
import { usePublicBlogs, getBlogRegion } from "../../services/blogs";
import { useDestinations } from "../../services/content";

export default function Blogs() {
  const region = useListRegion();
  const blogs = usePublicBlogs(region);
  const destinations = useDestinations();

  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <PageIntro kicker="Blogs" title="Notes from the road" description="Practical guides and travel notes from Uttarakhand and Goa.">
        <RegionTabs />
      </PageIntro>

      {blogs.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/10 px-6 py-10 text-center text-mist-300 font-body text-sm">
          No posts published for this region yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((b) => (
            <BlogCard key={b.id} blog={b} region={getBlogRegion(b, destinations)} />
          ))}
        </div>
      )}
    </div>
  );
}
