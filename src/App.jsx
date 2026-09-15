import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppWidget from "./components/WhatsAppWidget";
import Home from "./pages/Home";
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
import HotelsFood from "./pages/HotelsFood";
import GalleryPage from "./pages/GalleryPage";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { ItineraryProvider } from "./context/ItineraryContext";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <ItineraryProvider>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-ink-950">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={<DestinationDetail />} />
            <Route path="/packages" element={<Packages />} />

            <Route path="/packages/spiritual" element={<SpiritualPackages />} />
            <Route path="/packages/local-tours" element={<LocalTourPackages />} />
            <Route path="/packages/most-popular" element={<MostPopularPackages />} />
            <Route path="/packages/luxury" element={<LuxuryPackages />} />
            <Route path="/packages/budget-friendly" element={<BudgetFriendlyPackages />} />

            <Route path="/packages/:id" element={<PackageDetail />} />
            <Route path="/itinerary" element={<ItineraryBuilder />} />
            <Route path="/hotels-food" element={<HotelsFood />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppWidget />
      </div>
    </ItineraryProvider>
  );
}