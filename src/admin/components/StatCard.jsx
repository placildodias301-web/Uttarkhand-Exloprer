// Dashboard stat tile. `detail` is an optional second line (e.g. "15 live").
export default function StatCard({ icon: Icon, value, label, detail, accent = "text-moss-400" }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-ink-850 p-4 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
      <span className={`h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-white/5 flex items-center justify-center shrink-0 ${accent}`}>
        <Icon size={18} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="font-display text-xl text-mist-100 leading-tight">{value}</p>
        <p className="text-mist-300 text-xs font-body leading-snug">{label}</p>
        {detail && <p className="text-mist-400 text-[11px] font-body">{detail}</p>}
      </div>
    </div>
  );
}
