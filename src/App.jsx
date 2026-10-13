import { lazy, Suspense } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppWidget from "./components/WhatsAppWidget";
import MaintenanceGate from "./components/MaintenanceGate";
import ScrollToTop from "./components/ScrollToTop";
import SiteMeta from "./components/SiteMeta";
import { ItineraryProvider } from "./context/ItineraryContext";

// Public pages
import TravelSection from "./pages/TravelSection";
import { travelSections, legacyRedirects, DEFAULT_SECTION_ID, getTravelSection } from "./data/navigation";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import Packages from "./pages/Packages";
import PackageDetail from "./pages/PackageDetail";
import SpiritualPackages from "./pages/packages/SpiritualPackages";
import LocalTourPackages from "./pages/packages/LocalTourPackages";
import MostPopularPackages from "./pages/packages/MostPopularPackages";
import LuxuryPackages from "./pages/packages/LuxuryPackages";
import BudgetFriendlyPackages from "./pages/packages/BudgetFriendlyPackages";
import ItineraryBuilder from "./pages/ItineraryBuilder";
import Itineraries from "./pages/Itineraries.jsx";
import ItineraryDetail from "./pages/ItineraryDetail.jsx";
import Blogs from "./pages/blogs/Blogs";
import BlogDetail from "./pages/blogs/BlogDetail";
import GalleryPage from "./pages/GalleryPage";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin — pages load on demand so public visitors never download admin code.
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminLayout from "./admin/components/AdminLayout";
const Login = lazy(() => import("./admin/pages/Login"));
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const DestinationsAdmin = lazy(() => import("./admin/pages/DestinationsAdmin"));
const DestinationForm = lazy(() => import("./admin/pages/DestinationForm"));
const PackagesAdmin = lazy(() => import("./admin/pages/PackagesAdmin"));
const PackageForm = lazy(() => import("./admin/pages/PackageForm"));
const ItinerariesAdmin = lazy(() => import("./admin/pages/ItinerariesAdmin"));
const ItineraryForm = lazy(() => import("./admin/pages/ItineraryForm"));
const BlogsAdmin = lazy(() => import("./admin/pages/BlogsAdmin"));
const BlogForm = lazy(() => import("./admin/pages/BlogForm"));
const GalleryModeration = lazy(() => import("./admin/pages/GalleryModeration"));
const Inquiries = lazy(() => import("./admin/pages/Inquiries"));
const Notifications = lazy(() => import("./admin/pages/Notifications"));
const SettingsHub = lazy(() => import("./admin/pages/settings/SettingsHub"));
const GeneralSettings = lazy(() => import("./admin/pages/settings/GeneralSettings"));
const ContactSettings = lazy(() => import("./admin/pages/settings/ContactSettings"));
const SocialSettings = lazy(() => import("./admin/pages/settings/SocialSettings"));
const SystemSettings = lazy(() => import("./admin/pages/settings/SystemSettings"));
const Profile = lazy(() => import("./admin/pages/Profile"));

function AdminLoading() {
  return <div className="min-h-[50vh] flex items-center justify-center text-mist-400 font-body text-sm">Loading…</div>;
}

function PublicLayout() {
  return (
    <MaintenanceGate>
      <div className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-moss-500 focus:px-4 focus:py-2 focus:text-ink-950 focus:font-body focus:font-semibold"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppWidget />
      </div>
    </MaintenanceGate>
  );
}

export default function App() {
  return (
    <ItineraryProvider>
      <ScrollToTop />
      <SiteMeta />
      <Routes>
        {/* ---------- Public site ---------- */}
        <Route element={<PublicLayout />}>
          {/* Travel sections (top navigation row). "/" opens ALL. */}
          <Route path="/" element={<Navigate to={getTravelSection(DEFAULT_SECTION_ID).path} replace />} />
          {travelSections.map((s) => (
            <Route key={s.id} path={s.path} element={<TravelSection sectionId={s.id} />} />
          ))}
          {legacyRedirects.map((r) => (
            <Route key={r.from} path={r.from} element={<Navigate to={r.to} replace />} />
          ))}

          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:id" element={<DestinationDetail />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/spiritual" element={<SpiritualPackages />} />
          <Route path="/packages/local-tours" element={<LocalTourPackages />} />
          <Route path="/packages/most-popular" element={<MostPopularPackages />} />
          <Route path="/packages/luxury" element={<LuxuryPackages />} />
          <Route path="/packages/budget-friendly" element={<BudgetFriendlyPackages />} />
          <Route path="/packages/:id" element={<PackageDetail />} />
          <Route path="/itinerary" element={<Itineraries />} />
          <Route path="/itinerary/:id" element={<ItineraryDetail />} />
          <Route path="/plan-my-trip" element={<ItineraryBuilder />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ---------- Admin ---------- */}
        <Route path="/admin/login" element={<Suspense fallback={<AdminLoading />}><Login /></Suspense>} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="destinations" element={<DestinationsAdmin />} />
          <Route path="destinations/new" element={<DestinationForm />} />
          <Route path="destinations/:id/edit" element={<DestinationForm />} />

          <Route path="packages" element={<PackagesAdmin />} />
          <Route path="packages/new" element={<PackageForm />} />
          <Route path="packages/:id/edit" element={<PackageForm />} />

          <Route path="itineraries" element={<ItinerariesAdmin />} />
          <Route path="itineraries/new" element={<ItineraryForm />} />
          <Route path="itineraries/:id/edit" element={<ItineraryForm />} />

          <Route path="blogs" element={<BlogsAdmin />} />
          <Route path="blogs/new" element={<BlogForm />} />
          <Route path="blogs/:id/edit" element={<BlogForm />} />

          <Route path="gallery" element={<GalleryModeration />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="notifications" element={<Notifications />} />

          <Route path="settings" element={<SettingsHub />} />
          <Route path="settings/general" element={<GeneralSettings />} />
          <Route path="settings/contact" element={<ContactSettings />} />
          <Route path="settings/social" element={<SocialSettings />} />
          <Route path="settings/system" element={<SystemSettings />} />

          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </ItineraryProvider>
  );
}
