// client/src/App.tsx
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Pages
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import Checkout from "@/pages/Checkout";

// Fallback (replaces 404)
import ComingSoonFallback from "./pages/ComingSoonFallback";


// Category pages (index)
import NecklacesPage from "@/pages/necklaces/index";
import NosepinsPage from "@/pages/nosepins/index";
import RingsMain from "@/pages/rings/index";
import EarringsPage from "@/pages/earrings/index";
import PendantsPage from "@/pages/pendants/index";
import BraceletsPage from "@/pages/bracelets/index";
import BanglesPage from "@/pages/bangles/index";
import MangalsutraPage from "@/pages/mangalsutra/index";
import MensPage from "@/pages/mens/index";
import KidsPage from "@/pages/kids/index";

// Rings subpages
import BandsPage from "@/pages/rings/bands";
import CocktailPage from "@/pages/rings/cocktail";
import DailyWearPage from "@/pages/rings/daily-wear";
import PlatinumPage from "@/pages/rings/platinum";
import SolitairePage from "@/pages/rings/solitaire";

// Info pages
import DeliveryPage from "@/pages/info/delivery";
import TrackOrderPage from "@/pages/info/track-order";
import ReturnsExchangePage from "@/pages/info/returns-exchange";
import FindStorePage from "@/pages/info/find-store";
import BlogPage from "@/pages/info/blog";
import FAQsPage from "@/pages/info/faqs";
import PrivacyPage from "@/pages/info/privacy";
import TermsPage from "@/pages/info/terms";

function Router() {
  return (
    <Switch>
      {/* Core Pages */}
      <Route path="/">
        <Home />
      </Route>

      <Route path="/shop">
        <Shop />
      </Route>

      <Route path="/product/:slug">
        <ProductDetail />
      </Route>

      {/* Category index pages */}
      <Route path="/necklaces"><NecklacesPage /></Route>
      <Route path="/nosepins"><NosepinsPage /></Route>
      <Route path="/rings"><RingsMain /></Route>
      <Route path="/earrings"><EarringsPage /></Route>
      <Route path="/pendants-lockets"><PendantsPage /></Route>
      <Route path="/bracelets"><BraceletsPage /></Route>
      <Route path="/bangles"><BanglesPage /></Route>
      <Route path="/mangalsutra"><MangalsutraPage /></Route>
      <Route path="/mens-collection"><MensPage /></Route>
      <Route path="/kids-collection"><KidsPage /></Route>

      {/* Rings sub-pages */}
      <Route path="/rings/bands"><BandsPage /></Route>
      <Route path="/rings/cocktail"><CocktailPage /></Route>
      <Route path="/rings/daily-wear"><DailyWearPage /></Route>
      <Route path="/rings/platinum"><PlatinumPage /></Route>
      <Route path="/rings/solitaire"><SolitairePage /></Route>

      {/* Checkout */}
      <Route path="/checkout"><Checkout /></Route>

      {/* Info pages */}
      <Route path="/info/delivery"><DeliveryPage /></Route>
      <Route path="/info/track-order"><TrackOrderPage /></Route>
      <Route path="/info/returns-exchange"><ReturnsExchangePage /></Route>
      <Route path="/info/find-store"><FindStorePage /></Route>
      <Route path="/blog"><BlogPage /></Route>
      <Route path="/faqs"><FAQsPage /></Route>
      <Route path="/privacy-policy"><PrivacyPage /></Route>
      <Route path="/terms"><TermsPage /></Route>

      {/* Fallback replacing 404 */}
      <Route>
        <ComingSoonFallback />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
