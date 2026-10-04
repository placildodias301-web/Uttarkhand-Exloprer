// Section heading used across the public site. `kicker` is a short context
// line above the title; `action` renders on the right (e.g. "View all").
export default function SectionHeader({ kicker, title, description, align = "left", action, className = "", as: Heading = "h2" }) {
  return (
    <div
      className={`flex flex-col gap-5 mb-10 ${
        action ? "sm:flex-row sm:items-end sm:justify-between" : ""
      } ${align === "center" && !action ? "items-center text-center mx-auto max-w-3xl" : ""} ${className}`}
    >
      <div className={align === "center" && !action ? "" : "max-w-3xl"}>
        {kicker && <p className="text-moss-500 font-body text-[13px] font-semibold tracking-wide mb-3">{kicker}</p>}
        <Heading className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-mist-100 leading-[1.12]">{title}</Heading>
        {description && (
          <p className={`text-mist-300 font-body mt-4 leading-relaxed max-w-xl ${align === "center" && !action ? "mx-auto" : ""}`}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
