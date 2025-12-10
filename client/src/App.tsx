// client/src/App.tsx
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/lib/auth-context";

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

// Necklaces Subpages
import DailyWearNecklaces from "@/pages/necklaces/daily-wear";
import SolitaireNecklaces from "@/pages/necklaces/solitaire";
import BridalNecklaces from "@/pages/necklaces/bridal";
import ChokerNecklaces from "@/pages/necklaces/choker";
import YNecklaces from "@/pages/necklaces/y";
import BarNecklaces from "@/pages/necklaces/bar";
import AdjustableNecklaces from "@/pages/necklaces/adjustable";

// Nosepins Subpages
import SolitaireNosepins from "@/pages/nosepins/solitaire";
import DesignerNosepins from "@/pages/nosepins/designer";
import NoseRings from "@/pages/nosepins/rings";
import NathiNosepins from "@/pages/nosepins/nathi";

// Earrings Subpages
import StudEarrings from "@/pages/earrings/studs";
import HoopEarrings from "@/pages/earrings/hoops";
import DropJhumkaEarrings from "@/pages/earrings/drop-jhumka";

// Pendants Subpages
import DailyWearPendants from "@/pages/pendants/daily-wear";
import SolitairePendants from "@/pages/pendants/solitaire";
import ClusterPendants from "@/pages/pendants/cluster";
import AlphabetPendants from "@/pages/pendants/alphabet";

// Bracelets Subpages
import ChainBracelets from "@/pages/bracelets/chain-bracelet";
import AdjustableBracelets from "@/pages/bracelets/adjustable-bracelet";
import FlexibleBracelets from "@/pages/bracelets/flexible-bracelet";
import TennisBracelets from "@/pages/bracelets/tennis-bracelet";

// Bangles Subpages
import DailyWearBangles from "@/pages/bangles/daily-wear-bangles";
import BridalBangles from "@/pages/bangles/bridal-bangles";
import NoyaBangles from "@/pages/bangles/noya";

// Mangalsutra Subpages
import MangalsutraPendants from "@/pages/mangalsutra/mangalsutra-pendant";
import MangalsutraChains from "@/pages/mangalsutra/mangalsutra-chain";
import MangalsutraBracelets from "@/pages/mangalsutra/mangalsutra-bracelet";
import SolitaireMangalsutra from "@/pages/mangalsutra/solitaire-mangalsutra";

// Mens Subpages
import MensRings from "@/pages/mens/rings";
import MensStuds from "@/pages/mens/studs";
import MensBracelets from "@/pages/mens/bracelet";
import MensKada from "@/pages/mens/kada";
import MensChains from "@/pages/mens/chains";
import MensPendants from "@/pages/mens/pendant";

// Kids Subpages
import KidsRings from "@/pages/kids/rings";
import KidsBracelets from "@/pages/kids/bracelets-bangles";
import KidsPendants from "@/pages/kids/pendants";
import KidsEarrings from "@/pages/kids/earrings";


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

      {/* SUBCATEGORY ROUTES (Explicit Files) */}
      <Route path="/necklaces/daily-wear"><DailyWearNecklaces /></Route>
      <Route path="/necklaces/solitaire"><SolitaireNecklaces /></Route>
      <Route path="/necklaces/bridal"><BridalNecklaces /></Route>
      <Route path="/necklaces/choker"><ChokerNecklaces /></Route>
      <Route path="/necklaces/y"><YNecklaces /></Route>
      <Route path="/necklaces/bar"><BarNecklaces /></Route>
      <Route path="/necklaces/adjustable"><AdjustableNecklaces /></Route>

      {/* Nosepins */}
      <Route path="/nosepins/solitaire"><SolitaireNosepins /></Route>
      <Route path="/nosepins/designer"><DesignerNosepins /></Route>
      <Route path="/nosepins/rings"><NoseRings /></Route>
      <Route path="/nosepins/nathi"><NathiNosepins /></Route>

      {/* Earrings */}
      <Route path="/earrings/studs"><StudEarrings /></Route>
      <Route path="/earrings/hoops"><HoopEarrings /></Route>
      <Route path="/earrings/drop-jhumka"><DropJhumkaEarrings /></Route>

      {/* Pendants & Lockets */}
      <Route path="/pendants-lockets/daily-wear"><DailyWearPendants /></Route>
      <Route path="/pendants-lockets/solitaire"><SolitairePendants /></Route>
      <Route path="/pendants-lockets/cluster"><ClusterPendants /></Route>
      <Route path="/pendants-lockets/alphabet"><AlphabetPendants /></Route>

      {/* Bracelets */}
      <Route path="/bracelets/chain-bracelet"><ChainBracelets /></Route>
      <Route path="/bracelets/adjustable-bracelet"><AdjustableBracelets /></Route>
      <Route path="/bracelets/flexible-bracelet"><FlexibleBracelets /></Route>
      <Route path="/bracelets/tennis-bracelet"><TennisBracelets /></Route>

      {/* Bangles */}
      <Route path="/bangles/daily-wear-bangles"><DailyWearBangles /></Route>
      <Route path="/bangles/bridal-bangles"><BridalBangles /></Route>
      <Route path="/bangles/noya"><NoyaBangles /></Route>

      {/* Mangalsutra */}
      <Route path="/mangalsutra/mangalsutra-pendant"><MangalsutraPendants /></Route>
      <Route path="/mangalsutra/mangalsutra-chain"><MangalsutraChains /></Route>
      <Route path="/mangalsutra/mangalsutra-bracelet"><MangalsutraBracelets /></Route>
      <Route path="/mangalsutra/solitaire-mangalsutra"><SolitaireMangalsutra /></Route>

      {/* Men's Collection */}
      <Route path="/mens-collection/rings"><MensRings /></Route>
      <Route path="/mens-collection/studs"><MensStuds /></Route>
      <Route path="/mens-collection/bracelet"><MensBracelets /></Route>
      <Route path="/mens-collection/kada"><MensKada /></Route>
      <Route path="/mens-collection/chains"><MensChains /></Route>
      <Route path="/mens-collection/pendant"><MensPendants /></Route>

      {/* Kids Collection */}
      <Route path="/kids-collection/rings"><KidsRings /></Route>
      <Route path="/kids-collection/bracelets-bangles"><KidsBracelets /></Route>
      <Route path="/kids-collection/pendants"><KidsPendants /></Route>
      <Route path="/kids-collection/earrings"><KidsEarrings /></Route>

      {/* Rings sub-pages (Keeping existing individual ones if desired, or replacing) */}
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
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
