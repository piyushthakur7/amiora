import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Heart, User, ShoppingCart, Menu, LogOut, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import { useAuth } from "@/lib/auth-context";
import { useWishlist } from "@/lib/wishlist-store";

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

// FULL SUBCATEGORY MAP (truncated for brevity, ensure existing map is preserved or imported if large)
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
  const { items: wishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  const cartCount = getTotalItems();
  const wishlistCount = wishlistItems.length;

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8a98a] cursor-pointer hover:text-primary transition"
                onClick={() => handleSearch()}
              />
            </div>
          </div>

          {/* ICONS */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden text-[#b59863]" onClick={() => setLocation("/shop")}>
              <Search className="h-6 w-6" />
            </Button>

            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative hover:scale-110 transition duration-200 text-[#b59863]">
                <Heart className="h-6 w-6" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 bg-red-600 text-white flex items-center justify-center text-xs p-0 shadow-md">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* AUTH DROPDOWN */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:scale-110 transition duration-200 text-[#b59863]">
                    <UserCircle className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Orders</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon" className="hover:scale-110 transition duration-200 text-[#b59863]">
                  <User className="h-6 w-6" />
                </Button>
              </Link>
            )}

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
        <nav className="hidden lg:flex justify-center items-center border-t border-transparent bg-[#003C32] px-6 shadow-md">
          <NavigationMenu className="mx-auto">
            <NavigationMenuList className="gap-2">

              {categories.map(category => (
                <NavigationMenuItem key={category.slug}>

                  <NavigationMenuTrigger className="h-12 font-medium text-white hover:text-[#C8A46A] bg-transparent transition">
                    {category.name}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="bg-[#003C32] shadow-xl rounded-b-xl border-x border-b border-[#C8A46A]/20 -mt-1">
                    <div className="flex flex-row p-4 w-[400px] gap-4">

                      {/* VIEW ALL SECTION */}
                      <div className="flex-shrink-0 w-1/3 border-r border-[#C8A46A]/20 pr-4">
                        <Link href={`/${category.slug}`}>
                          <div className="group cursor-pointer">
                            <h3 className="text-xl font-serif text-[#C8A46A] mb-2 group-hover:text-white transition-colors duration-300">
                              {category.name}
                            </h3>
                            <span className="text-sm text-gray-300 group-hover:text-[#C8A46A] transition-colors underline decoration-[#C8A46A]/50 underline-offset-4">
                              View All Collection
                            </span>
                          </div>
                        </Link>
                      </div>

                      {/* SUBCATEGORY LINKS OR GRID */}
                      <div className="flex-grow">
                        {Array.isArray(subcategories[category.slug]) && subcategories[category.slug].length > 0 ? (
                          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                            {subcategories[category.slug].map(sub => (
                              <Link key={sub.slug} href={`/${category.slug}/${sub.slug}`}>
                                <span className="block text-sm text-gray-200 hover:text-[#C8A46A] cursor-pointer transition-colors duration-200 py-1">
                                  {sub.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-400 italic">Explore our exclusive {category.name} collection.</p>
                        )}
                      </div>

                    </div>
                  </NavigationMenuContent>

                </NavigationMenuItem>
              ))}

            </NavigationMenuList>

          </NavigationMenu>
        </nav>

      </div>
    </header>
  );
}
