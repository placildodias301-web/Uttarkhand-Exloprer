// Consistent section spacing/width for the section pages.
// band — slightly lifted background to separate consecutive sections.
export default function PageSection({ band = false, id, children, className = "" }) {
  return (
    <section id={id} className={`scroll-mt-[110px] ${band ? "bg-ink-900/60 border-y border-white/[0.05]" : ""} ${className}`}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-20 sm:py-28">{children}</div>
    </section>
  );
}
