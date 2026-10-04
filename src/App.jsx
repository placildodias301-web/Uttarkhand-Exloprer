import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppWidget from "./components/WhatsAppWidget";
import MaintenanceGate from "./components/MaintenanceGate";
import ScrollToTop from "./components/ScrollToTop";
import { ItineraryProvider } from "./context/ItineraryContext";

// Public pages
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import Packages from "./pages/Packages";
import PackageDetail from "./pages/PackageDetail";
import SpiritualPackages from "./pages/packages/SpiritualPackages";
import LocalTourPackages from "./pages/packages/LocalTourPackages";
import HoneymoonPackages from "./pages/packages/HoneymoonPackages";
import UttarakhandTourPackages from "./pages/packages/UttarakhandTourPackages";
import ItineraryBuilder from "./pages/ItineraryBuilder";
import Blogs from "./pages/blogs/Blogs";
import BlogDetail from "./pages/blogs/BlogDetail";
import GalleryPage from "./pages/GalleryPage";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminLayout from "./admin/components/AdminLayout";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import DestinationsAdmin from "./admin/pages/DestinationsAdmin";
import DestinationForm from "./admin/pages/DestinationForm";
import PackagesAdmin from "./admin/pages/PackagesAdmin";
import PackageForm from "./admin/pages/PackageForm";
import ItinerariesAdmin from "./admin/pages/ItinerariesAdmin";
import ItineraryForm from "./admin/pages/ItineraryForm";
import BlogsAdmin from "./admin/pages/BlogsAdmin";
import BlogForm from "./admin/pages/BlogForm";
import GalleryModeration from "./admin/pages/GalleryModeration";
import Inquiries from "./admin/pages/Inquiries";
import Notifications from "./admin/pages/Notifications";
import SettingsHub from "./admin/pages/settings/SettingsHub";
import GeneralSettings from "./admin/pages/settings/GeneralSettings";
import ContactSettings from "./admin/pages/settings/ContactSettings";
import SocialSettings from "./admin/pages/settings/SocialSettings";
import SystemSettings from "./admin/pages/settings/SystemSettings";
import Profile from "./admin/pages/Profile";

function PublicLayout() {
  return (
    <MaintenanceGate>
      <div className="min-h-screen flex flex-col bg-ink-950">
        <Navbar />
        <main className="flex-1">
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
      <Routes>
        {/* ---------- Public site ---------- */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:id" element={<DestinationDetail />} />
          <Route path="/packages" element={<Packages />} />

          {/* Only your 4 itinerary folders */}
          <Route path="/packages/spiritual" element={<SpiritualPackages />} />
          <Route path="/packages/local-tours" element={<LocalTourPackages />} />
          <Route path="/packages/honeymoon" element={<HoneymoonPackages />} />
          <Route path="/packages/uttarakhand-tours" element={<UttarakhandTourPackages />} />

          <Route path="/packages/:id" element={<PackageDetail />} />
          <Route path="/itinerary" element={<ItineraryBuilder />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ---------- Admin ---------- */}
        <Route path="/admin/login" element={<Login />} />
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