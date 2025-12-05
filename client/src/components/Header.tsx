import { useState } from "react";
import { Link } from "wouter";
import { Search, Heart, User, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { CartDrawer } from "@/components/CartDrawer";
import { useCart } from "@/lib/cart-store";

// MAIN CATEGORIES
const categories = [
  { name: "Necklaces", slug: "necklaces" },
  { name: "Nosepins", slug: "nosepins" },
  { name: "Rings", slug: "rings" },
  { name: "Earrings", slug: "earrings" },
  { name: "Pendants & Lockets", slug: "pendants-lockets" },
  { name: "Bracelets", slug: "bracelets" },
  { name: "Bangles", slug: "bangles" },
  { name: "Mangalsutra", slug: "mangalsutra" },
  { name: "Men's Collection", slug: "mens-collection" },
  { name: "Kids Collection", slug: "kids-collection" },
];

// FULL SUBCATEGORY MAP
const subcategories: Record<string, { name: string; slug: string }[]> = {
  necklaces: [
    { name: "Daily Wear", slug: "daily-wear" },
    { name: "Solitaire", slug: "solitaire" },
    { name: "Bridal", slug: "bridal" },
    { name: "Choker", slug: "choker" },
    { name: "Y", slug: "y" },
    { name: "Bar", slug: "bar" },
    { name: "Adjustable", slug: "adjustable" },
  ],

  nosepins: [
    { name: "Solitaire", slug: "solitaire" },
    { name: "Designer", slug: "designer" },
    { name: "Rings", slug: "rings" },
    { name: "Nathi", slug: "nathi" },
  ],

  rings: [
    { name: "Daily Wear", slug: "daily-wear" },
    { name: "Solitaires", slug: "solitaires" },
    { name: "Bands", slug: "bands" },
    { name: "Cocktail", slug: "cocktail" },
    { name: "Platinum", slug: "platinum" },
  ],

  earrings: [
    { name: "Studs", slug: "studs" },
    { name: "Hoops", slug: "hoops" },
    { name: "Drop & Jhumka", slug: "drop-jhumka" },
  ],

  "pendants-lockets": [
    { name: "Daily Wear", slug: "daily-wear" },
    { name: "Solitaire", slug: "solitaire" },
    { name: "Cluster", slug: "cluster" },
    { name: "Alphabet", slug: "alphabet" },
  ],

  bracelets: [
    { name: "Chain Bracelet", slug: "chain-bracelet" },
    { name: "Adjustable Bracelet", slug: "adjustable-bracelet" },
    { name: "Flexible Bracelet", slug: "flexible-bracelet" },
    { name: "Tennis Bracelet", slug: "tennis-bracelet" },
  ],

  bangles: [
    { name: "Daily Wear Bangles", slug: "daily-wear-bangles" },
    { name: "Bridal Bangles", slug: "bridal-bangles" },
    { name: "Noya", slug: "noya" },
  ],

  mangalsutra: [
    { name: "Pendant", slug: "mangalsutra-pendant" },
    { name: "Chain", slug: "mangalsutra-chain" },
    { name: "Bracelet", slug: "mangalsutra-bracelet" },
    { name: "Solitaire", slug: "solitaire-mangalsutra" },
  ],

  "mens-collection": [
    { name: "Rings", slug: "rings" },
    { name: "Studs", slug: "studs" },
    { name: "Bracelet", slug: "bracelet" },
    { name: "Kada", slug: "kada" },
    { name: "Chains", slug: "chains" },
    { name: "Pendant", slug: "pendant" },
  ],

  "kids-collection": [
    { name: "Rings", slug: "rings" },
    { name: "Bracelets & Bangles", slug: "bracelets-bangles" },
    { name: "Pendants", slug: "pendants" },
    { name: "Earrings", slug: "earrings" },
  ],
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#EDE1CB] via-[#F5EBD8] to-[#EDE1CB] shadow-[0_2px_15px_rgba(0,0,0,0.12)] font-['Playfair Display',serif]">
      <div className="container mx-auto">

        {/* TOP BAR */}
        <div className="flex items-center justify-between h-20 px-4 md:px-6 lg:px-10">

          {/* MOBILE MENU + LOGO */}
          <div className="flex items-center gap-6">
            
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="p-2 rounded-xl bg-white border border-[#d9c7a3] shadow-sm hover:shadow-md transition text-[#b59863]">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-80 bg-white text-[#0E2220]">
                <div className="flex flex-col gap-6 mt-10">

                  {/* MOBILE LOGO */}
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <span className="text-3xl font-serif bg-gradient-to-r from-[#C8A46A] to-[#E6D1A3] text-transparent bg-clip-text">
                      Amiora Diamonds
                    </span>
                  </Link>

                  {/* MOBILE CATEGORY LIST */}
                  <div className="flex flex-col gap-5 mt-6">
                    {categories.map(cat => (
                      <Link key={cat.slug} href={`/${cat.slug}`} onClick={() => setIsMenuOpen(false)}>
                        <span className="text-xl font-medium hover:text-[#C8A46A] transition">
                          {cat.name}
                        </span>
                      </Link>
                    ))}
                  </div>

                </div>
              </SheetContent>
            </Sheet>

            {/* LOGO */}
            <Link href="/">
              <img
                src="https://github.com/piyushthakur7/bm-scrubber-images-/blob/main/Amiora-final-logo-01.png?raw=true"
                alt="Amiora Diamonds"
                className="h-16 object-contain drop-shadow-sm hover:drop-shadow-lg transition-transform duration-300 hover:scale-110"
              />
            </Link>
          </div>

          {/* SEARCH BAR */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search for Diamond Jewellery & More…"
                className="pl-12 pr-4 py-3 rounded-full border border-[#e4d7b8] bg-white/90 shadow-inner focus:ring-2 focus:ring-[#d5b98a] focus:border-[#d5b98a] text-[#2a2a2a] placeholder:text-[#b8a98a] transition"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8a98a]" />
            </div>
          </div>

          {/* ICONS */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden text-[#b59863]">
              <Search className="h-6 w-6" />
            </Button>

            <Button variant="ghost" size="icon" className="hover:scale-110 transition duration-200 text-[#b59863]">
              <Heart className="h-6 w-6" />
            </Button>

            <Button variant="ghost" size="icon" className="hover:scale-110 transition duration-200 text-[#b59863]">
              <User className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative hover:scale-110 transition duration-200 text-[#b59863]"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-br from-[#c9a771] to-[#e7d7ad] text-black flex items-center justify-center text-xs p-0 shadow-md">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center border-t border-transparent bg-[#003C32] px-6 shadow-md">
          <NavigationMenu>
            <NavigationMenuList>

              {categories.map(category => (
                <NavigationMenuItem key={category.slug}>
                  
                  <NavigationMenuTrigger className="h-12 font-medium text-white hover:text-[#C8A46A] bg-transparent transition">
                    {category.name}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="bg-white shadow-xl rounded-xl border border-gray-100">
                    <div className="flex flex-col gap-2 p-5 w-[260px]">

                      {/* VIEW ALL */}
                      <Link href={`/${category.slug}`}>
                        <span className="font-semibold text-[#003C32] hover:text-[#C8A46A]">
                          View all {category.name}
                        </span>
                      </Link>

                      {/* SUBCATEGORY LINKS */}
                      {Array.isArray(subcategories[category.slug]) && (
                        <div className="mt-2 flex flex-col gap-1 text-sm">
                          {subcategories[category.slug].map(sub => (
                            <Link key={sub.slug} href={`/${category.slug}/${sub.slug}`}>
                              <span className="cursor-pointer text-[#003C32] hover:text-[#C8A46A]">
                                {sub.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}

                    </div>
                  </NavigationMenuContent>

                </NavigationMenuItem>
              ))}

            </NavigationMenuList>

            <NavigationMenuViewport className="mt-2" />
          </NavigationMenu>
        </nav>

      </div>
    </header>
  );
}
