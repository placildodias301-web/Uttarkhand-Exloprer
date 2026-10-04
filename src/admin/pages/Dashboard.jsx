import SmartImage from "../../components/SmartImage";
import { Link } from "react-router-dom";
import {
  MapPin, Package, Route, Newspaper, Image, Inbox, Bell, Users,
  Plus, FolderPlus, FilePlus, Eye, Check, X,
} from "lucide-react";
import { useDestinations, usePackages, isPublished } from "../../services/content";
import { useItineraries } from "../../services/itineraries";
import { useBlogs } from "../../services/blogs";
import { useGallerySubmissions } from "../../services/gallerySubmissions";
import { useInquiries, INQUIRY_STATUSES } from "../../services/inquiries";
import { useNotifications } from "../../services/notifications";
import { useAdminProfile } from "../../services/adminAuth";
import { contentRegionNames, regionNames, normalizeRegion } from "../../data/regions";
import StatCard from "../components/StatCard";
import { timeAgo } from "../utils/timeAgo";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

// Every number here is calculated from the same stores the public site reads.
export default function Dashboard() {
  const destinations = useDestinations();
  const packages = usePackages();
  const itineraries = useItineraries("all", { includeHidden: true });
  const { blogs } = useBlogs();
  const { pending, approved, approveSubmission, rejectSubmission } = useGallerySubmissions();
  const { inquiries } = useInquiries();
  const { notifications, unreadCount } = useNotifications();
  const { profile } = useAdminProfile();

  const newInquiries = inquiries.filter((i) => i.status === "New").length;
  const countBy = (list, region) => list.filter((x) => normalizeRegion(x.region) === normalizeRegion(region)).length;

  const regionBars = contentRegionNames.map((r) => ({
    label: r,
    values: [
      ["Destinations", r === "Combo" ? null : countBy(destinations, r)],
      ["Packages", countBy(packages, r)],
      ["Itineraries", countBy(itineraries, r)],
    ].filter(([, v]) => v !== null),
  }));
  const maxRegion = Math.max(1, ...regionBars.flatMap((r) => r.values.map(([, v]) => v)));
  const inquiryBars = INQUIRY_STATUSES.map((s) => [s, inquiries.filter((i) => i.status === s).length]);
  const maxInquiry = Math.max(1, ...inquiryBars.map(([, v]) => v));

  return (
    <div>
      <h1 className="font-display text-2xl text-mist-100 mb-1">{greeting()}, {profile.name?.split(" ")[0] || "Admin"}</h1>
      <p className="text-mist-400 font-body text-sm mb-6">Here's what's happening on your website.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard icon={MapPin} value={destinations.length} label="Destinations" detail={`${destinations.filter(isPublished).length} live`} />
        <StatCard icon={Package} value={packages.length} label="Packages" detail={`${packages.filter(isPublished).length} live`} />
        <StatCard icon={Route} value={itineraries.length} label="Itineraries" detail={`${itineraries.filter((i) => i.published).length} live`} />
        <StatCard icon={Newspaper} value={blogs.filter((b) => b.status === "published").length} label="Published blogs" />
        <StatCard icon={Image} value={pending.length} label="Pending photos" accent="text-gold-400" />
        <StatCard icon={Inbox} value={newInquiries} label="New inquiries" accent="text-rose-400" />
        <StatCard icon={Bell} value={unreadCount} label="Unread notifications" />
        <StatCard icon={Users} value={inquiries.length} label="Total inquiries" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        <Panel title="Content by region">
          <div className="space-y-5">
            {regionBars.map((r) => (
              <div key={r.label}>
                <p className="text-mist-200 text-sm font-body font-semibold mb-2">{r.label}</p>
                <div className="space-y-1.5">
                  {r.values.map(([label, value]) => (
                    <Bar key={label} label={label} value={value} max={maxRegion} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Inquiries by status" action={<Link to="/admin/inquiries" className="text-xs font-body font-semibold text-moss-400 hover:text-moss-300">View all</Link>}>
          <div className="space-y-2 mb-6">
            {inquiryBars.map(([label, value]) => (
              <Bar key={label} label={label} value={value} max={maxInquiry} />
            ))}
          </div>
          <p className="text-mist-400 text-xs font-body">
            {regionNames.length} regions · {approved.length} approved visitor photos · {blogs.filter((b) => b.status === "draft").length} blog drafts
          </p>
        </Panel>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        <Panel title="Recent activity" action={<Link to="/admin/notifications" className="text-xs font-body font-semibold text-moss-400 hover:text-moss-300">View all</Link>}>
          {notifications.length === 0 ? (
            <p className="text-mist-400 text-sm font-body">Nothing yet — activity will show up here as it happens.</p>
          ) : (
            <ul className="space-y-3">
              {notifications.slice(0, 6).map((n) => (
                <li key={n.id} className="flex items-start gap-3">
                  <span className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${n.read ? "bg-white/20" : "bg-moss-400"}`} aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-mist-100 text-sm font-body">{n.title}</p>
                    <p className="text-mist-400 text-xs font-body truncate">{n.message} · {timeAgo(n.timestamp)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Pending gallery submissions" action={<Link to="/admin/gallery" className="text-xs font-body font-semibold text-moss-400 hover:text-moss-300">View all</Link>}>
          {pending.length === 0 ? (
            <p className="text-mist-400 text-sm font-body">No pending submissions.</p>
          ) : (
            <ul className="space-y-3">
              {pending.slice(0, 4).map((s) => (
                <li key={s.id} className="flex items-center gap-3">
                  <SmartImage src={s.image} alt="" className="h-12 w-12 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-mist-100 text-sm font-body font-semibold truncate">{s.title || s.place}</p>
                    <p className="text-mist-400 text-xs font-body truncate">{s.place} · by {s.visitorName}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => approveSubmission(s.id)} aria-label="Approve" className="h-8 w-8 rounded-full bg-moss-500/10 text-moss-400 flex items-center justify-center hover:bg-moss-500 hover:text-ink-950">
                      <Check size={14} />
                    </button>
                    <button onClick={() => rejectSubmission(s.id)} aria-label="Reject" className="h-8 w-8 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center hover:bg-rose-500 hover:text-white">
                      <X size={14} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <Panel title="Quick actions">
        <div className="flex flex-wrap gap-3">
          <QuickAction to="/admin/destinations/new" icon={Plus} label="Add Destination" />
          <QuickAction to="/admin/packages/new" icon={FolderPlus} label="Add Package" />
          <QuickAction to="/admin/itineraries/new" icon={Route} label="Add Itinerary" />
          <QuickAction to="/admin/blogs/new" icon={FilePlus} label="Create Blog" />
          <QuickAction to="/admin/gallery" icon={Eye} label="Review Gallery" />
          <QuickAction to="/admin/inquiries" icon={Inbox} label="View Inquiries" />
        </div>
      </Panel>
    </div>
  );
}

function Panel({ title, action, children }) {
  return (
    <section className="rounded-2xl border border-white/5 bg-ink-850 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg text-mist-100">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Bar({ label, value, max }) {
  return (
    <div className="flex items-center gap-3 text-xs font-body">
      <span className="w-24 shrink-0 text-mist-400">{label}</span>
      <span className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
        <span className="block h-full rounded-full bg-moss-500" style={{ width: `${(value / max) * 100}%` }} />
      </span>
      <span className="w-6 text-right text-mist-200 font-semibold">{value}</span>
    </div>
  );
}

function QuickAction({ to, icon: Icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 text-mist-200 text-sm font-body font-semibold hover:border-moss-500/40 hover:text-moss-300 transition-colors"
    >
      <Icon size={15} /> {label}
    </Link>
  );
}
