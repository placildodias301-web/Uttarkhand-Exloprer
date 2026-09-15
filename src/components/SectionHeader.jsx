export default function SectionHeader({ kicker, title, description, align = "left", action }) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center text-center mx-auto" : "items-start"
      } ${action ? "sm:flex-row sm:items-end sm:justify-between text-left" : ""} max-w-3xl mb-10`}
    >
      <div>
        {kicker && (
          <p className="text-moss-400 font-body text-sm font-semibold mb-3">{kicker}</p>
        )}
        <h2 className="font-display text-3xl sm:text-4xl text-mist-200 leading-tight">{title}</h2>
        {description && (
          <p className="text-mist-400 font-body mt-3 leading-relaxed max-w-xl">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
