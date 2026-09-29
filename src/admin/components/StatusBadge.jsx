const TONES = {
  published: "bg-moss-500/15 text-moss-300 border-moss-500/30",
  approved: "bg-moss-500/15 text-moss-300 border-moss-500/30",
  resolved: "bg-moss-500/15 text-moss-300 border-moss-500/30",
  draft: "bg-white/5 text-mist-300 border-white/10",
  pending: "bg-gold-400/15 text-gold-300 border-gold-400/30",
  new: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  rejected: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  contacted: "bg-sky-400/15 text-sky-300 border-sky-400/30",
  "in progress": "bg-sky-400/15 text-sky-300 border-sky-400/30",
};

export default function StatusBadge({ status }) {
  const tone = TONES[String(status).toLowerCase()] || "bg-white/5 text-mist-300 border-white/10";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-body font-semibold border capitalize ${tone}`}>
      {status}
    </span>
  );
}
