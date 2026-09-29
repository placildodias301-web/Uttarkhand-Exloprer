export default function StatCard({ icon: Icon, value, label, accent = "text-moss-400" }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-ink-850 p-4 flex items-center gap-3">
      <span className={`h-11 w-11 rounded-xl bg-white/5 flex items-center justify-center shrink-0 ${accent}`}>
        <Icon size={19} />
      </span>
      <div className="min-w-0">
        <p className="font-display text-xl text-mist-100 leading-tight">{value}</p>
        <p className="text-mist-400 text-xs font-body truncate">{label}</p>
      </div>
    </div>
  );
}
