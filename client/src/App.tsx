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
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Wishlist from "@/pages/Wishlist";
import ThankYou from "@/pages/ThankYou";

// Fallback (replaces 404)
import ComingSoonFallback from "./pages/ComingSoonFallback";


// Category pages (index)
import DynamicCategoryWrapper from "@/pages/DynamicCategory";
import SubCategoryGeneric from "@/pages/SubCategoryGeneric";

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

      {/* Info pages */}
      <Route path="/info/delivery"><DeliveryPage /></Route>
      <Route path="/info/track-order"><TrackOrderPage /></Route>
      <Route path="/info/returns-exchange"><ReturnsExchangePage /></Route>
      <Route path="/info/find-store"><FindStorePage /></Route>
      <Route path="/blog"><BlogPage /></Route>
      <Route path="/faqs"><FAQsPage /></Route>
      <Route path="/privacy-policy"><PrivacyPage /></Route>
      <Route path="/terms"><TermsPage /></Route>

      {/* Checkout */}
      <Route path="/checkout"><Checkout /></Route>

      {/* Auth & User */}
      <Route path="/login"><Login /></Route>
      <Route path="/register"><Register /></Route>
      <Route path="/wishlist"><Wishlist /></Route>
      <Route path="/thank-you"><ThankYou /></Route>

      {/* DYNAMIC CATEGORY ROUTES (The catch-all logic) */}

      {/* Subcategories: /rings/daily-wear */}
      <Route path="/:parent/:child">
        {(params) => (
          <SubCategoryGeneric
            parentSlug={params.parent}
            childSlug={params.child}
            title={params.child.replace(/-/g, ' ')}
          />
        )}
      </Route>

      {/* Top Level Categories: /rings */}
      <Route path="/:slug">
        <DynamicCategoryWrapper />
      </Route>

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
