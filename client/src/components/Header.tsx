import { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { Search, Heart, User, ShoppingCart, LogOut, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CartDrawer } from "@/components/CartDrawer";
import { useCart } from "@/lib/cart-store";
import { useAuth } from "@/lib/auth-context";
import { useWishlist } from "@/lib/wishlist-store";
import { useQuery } from "@tanstack/react-query";
import { getCategories, type WcCategory } from "@/lib/woocommerce";

import { cn } from "@/lib/utils";
import { MainNavigation, type NavCategory } from "./MainNavigation";
import { MobileNavigation } from "./MobileNavigation";

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  const cartCount = getTotalItems();
  const wishlistCount = wishlistItems.length;

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [, setLocation] = useLocation();

  // -- DYNAMIC CATEGORY FETCHING --
  const { data: allCategories = [], isLoading } = useQuery<WcCategory[]>({
    queryKey: ["header-categories"],
    queryFn: () => getCategories(),
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
  });

  // Calculate Navigation Tree
  const navTree: NavCategory[] = useMemo(() => {
    const parents = allCategories
      .filter(c => c.parent === 0 && c.slug !== "uncategorized")
      .sort((a, b) => a.name.localeCompare(b.name));

    return parents.map(parent => ({
      ...parent,
      children: allCategories.filter(c => c.parent === parent.id)
    }));
  }, [allCategories]);

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

  const [location] = useLocation();
  const isHome = location === "/";

  return (
    <header
      className={cn(
        "w-full z-50 font-['Playfair Display',serif] transition-all duration-300",
        isHome ? "absolute top-0 bg-transparent" : "sticky top-0 bg-[#0E2220] shadow-xl"
      )}
    >
      <div className="container mx-auto">

        {/* TOP BAR Grid Layout for Perfect Centering */}
        <div className="grid grid-cols-3 items-center py-4 px-4 md:px-6 lg:px-10">

          {/* LEFT: Mobile Nav + Category Toggle */}
          <div className="flex items-center justify-start gap-4 md:gap-8">
            <MobileNavigation navTree={navTree} />

            {/* Desktop Category Toggle */}
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="hidden lg:flex items-center gap-2 text-white hover:text-[#C8A46A] transition-colors group"
            >
              <span className="text-sm md:text-base tracking-widest uppercase font-light">Categories</span>
              <div className={cn("transition-transform duration-300", isCategoryOpen ? "rotate-180" : "rotate-0")}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-70 group-hover:opacity-100">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </button>
          </div>

          {/* CENTER: Logo */}
          <div className="flex justify-center items-center">
            <Link href="/">
              <img
                src="https://github.com/piyushthakur7/bm-scrubber-images-/blob/main/Amiora-final-logo-01.png?raw=true"
                alt="Amiora Diamonds"
                className="h-16 md:h-24 object-contain drop-shadow-[0_0_25px_rgba(200,164,106,0.5)] hover:drop-shadow-[0_0_25px_rgba(200,164,106,0.6)] transition-all duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* RIGHT: Icons & Search */}
          <div className="flex items-center justify-end gap-2 md:gap-4">

            {/* EXPANDABLE SEARCH */}
            <div className="flex items-center">
              <div className={cn(
                "transition-all duration-500 ease-in-out overflow-hidden flex items-center",
                isSearchOpen ? "w-40 md:w-60 opacity-100 mr-2" : "w-0 opacity-0"
              )}>
                <Input
                  type="search"
                  placeholder="Search..."
                  className="h-9 rounded-full border-white/20 bg-white/10 backdrop-blur-md text-white placeholder:text-white/50 focus:ring-[#C8A46A]/50 focus:border-[#C8A46A]/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:scale-110 transition shrink-0"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-6 w-6" />
              </Button>
            </div>

            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative hover:scale-110 transition duration-200 text-white">
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
                  <Button variant="ghost" size="icon" className="hover:scale-110 transition duration-200 text-white">
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
                <Button variant="ghost" size="icon" className="hover:scale-110 transition duration-200 text-white">
                  <User className="h-6 w-6" />
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="relative hover:scale-110 transition duration-200 text-white"
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

        <div className={cn(
          "transition-all duration-500 ease-in-out origin-top",
          isCategoryOpen ? "max-h-[500px] opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"
        )}>
          <MainNavigation navTree={navTree} isLoading={isLoading} />
        </div>

      </div>
    </header>
  );
}
