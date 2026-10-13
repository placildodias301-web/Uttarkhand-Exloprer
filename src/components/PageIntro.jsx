// Heading block at the top of list pages (Destinations, Packages, …).
export default function PageIntro({ kicker, title, description, children }) {
  return (
    <header className="mb-10 sm:mb-12">
      {kicker && <p className="text-moss-500 font-body text-[13px] font-semibold tracking-wide mb-3">{kicker}</p>}
      <h1 className="font-display text-4xl sm:text-5xl text-mist-100 leading-[1.08] max-w-3xl">{title}</h1>
      {description && <p className="text-mist-300 font-body mt-4 leading-relaxed max-w-2xl">{description}</p>}
      {children && <div className="mt-8">{children}</div>}
    </header>
  );
}
