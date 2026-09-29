import { Link } from "react-router-dom";
import {
  MapPin, Package, Route, Newspaper, Image, Inbox, CheckCircle2, Users,
  Plus, FolderPlus, FilePlus, Eye, Check, X,
} from "lucide-react";
import { useDestinations, usePackages } from "../../services/content";
import { useItineraryTemplates } from "../../services/itineraryTemplates";
import { useBlogs } from "../../services/blogs";
import { useGallerySubmissions } from "../../services/gallerySubmissions";
import { useInquiries } from "../../services/inquiries";
import { useNotifications } from "../../services/notifications";
import StatCard from "../components/StatCard";

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function Dashboard() {
  const destinations = useDestinations();
  const packages = usePackages();
  const { templates } = useItineraryTemplates();
  const { blogs } = useBlogs();
  const { pending, approved, approveSubmission, rejectSubmission } = useGallerySubmissions();
  const { inquiries } = useInquiries();
  const { notifications } = useNotifications();

  const newInquiries = inquiries.filter((i) => i.status === "New").length;

  return (
    <div>
      <h1 className="font-display text-2xl text-mist-100 mb-1">Good Evening, Admin!</h1>
      <p className="text-mist-400 font-body text-sm mb-6">Here's what's happening on your website today.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={MapPin} value={destinations.length} label="Destinations" />
        <StatCard icon={Package} value={packages.length} label="Packages" />
        <StatCard icon={Route} value={templates.length} label="Itineraries" />
        <StatCard icon={Newspaper} value={blogs.filter((b) => b.status === "published").length} label="Published Blogs" />
        <StatCard icon={Image} value={pending.length} label="Pending Gallery Images" accent="text-gold-400" />
        <StatCard icon={Inbox} value={newInquiries} label="New Inquiries" accent="text-rose-400" />
        <StatCard icon={CheckCircle2} value={approved.length} label="Approved Gallery Images" />
        <StatCard icon={Users} value={inquiries.length} label="Total Contacts" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
          <h3 className="font-display text-lg text-mist-100 mb-4">Recent Activity</h3>
          {notifications.length === 0 ? (
            <p className="text-mist-400 text-sm font-body">Nothing yet — activity will show up here as it happens.</p>
          ) : (
            <ul className="space-y-3">
              {notifications.slice(0, 6).map((n) => (
                <li key={n.id} className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-moss-400 mt-1.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-mist-100 text-sm font-body">{n.title}</p>
                    <p className="text-mist-400 text-xs font-body">{n.message} · {timeAgo(n.timestamp)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg text-mist-100">Pending Gallery Submissions</h3>
            <Link to="/admin/gallery" className="text-xs font-body font-semibold text-moss-400 hover:text-moss-300">View all</Link>
          </div>
          {pending.length === 0 ? (
            <p className="text-mist-400 text-sm font-body">No pending submissions.</p>
          ) : (
            <ul className="space-y-3">
              {pending.slice(0, 3).map((s) => (
                <li key={s.id} className="flex items-center gap-3">
                  <img src={s.image} alt="" className="h-12 w-12 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-mist-100 text-sm font-body font-semibold truncate">{s.title}</p>
                    <p className="text-mist-400 text-xs font-body truncate">{s.place} · by {s.visitorName}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => approveSubmission(s.id)} className="h-7 w-7 rounded-full bg-moss-500/10 text-moss-400 flex items-center justify-center hover:bg-moss-500 hover:text-ink-950">
                      <Check size={13} />
                    </button>
                    <button onClick={() => rejectSubmission(s.id)} className="h-7 w-7 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center hover:bg-rose-500 hover:text-white">
                      <X size={13} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-white/5 bg-ink-850 p-5">
        <h3 className="font-display text-lg text-mist-100 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <QuickAction to="/admin/destinations/new" icon={Plus} label="Add Destination" />
          <QuickAction to="/admin/packages/new" icon={FolderPlus} label="Add Package" />
          <QuickAction to="/admin/itineraries/new" icon={Route} label="Add Itinerary" />
          <QuickAction to="/admin/blogs/new" icon={FilePlus} label="Create Blog" />
          <QuickAction to="/admin/gallery" icon={Eye} label="Review Gallery" />
          <QuickAction to="/admin/inquiries" icon={Inbox} label="View Inquiries" />
        </div>
      </div>
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
