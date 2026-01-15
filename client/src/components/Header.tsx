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

        {/* TOP BAR */}
        <div className="flex items-center justify-between h-20 px-4 md:px-6 lg:px-10">

          {/* MOBILE MENU + LOGO */}
          <div className="flex items-center gap-6">
            <MobileNavigation navTree={navTree} />

            {/* LOGO */}
            <Link href="/">
              <img
                src="https://github.com/piyushthakur7/bm-scrubber-images-/blob/main/Amiora-final-logo-01.png?raw=true"
                alt="Amiora Diamonds"
                className="h-20 object-contain drop-shadow-md hover:drop-shadow-xl transition-all duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* SEARCH BAR */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search for Diamond Jewellery & More…"
                className="pl-12 pr-4 py-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-sm focus:ring-2 focus:ring-[#C8A46A]/50 focus:border-[#C8A46A]/50 text-white placeholder:text-white/60 transition"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70 cursor-pointer hover:text-white transition"
                onClick={() => handleSearch()}
              />
            </div>
          </div>

          {/* ICONS */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setLocation("/shop")}>
              <Search className="h-6 w-6" />
            </Button>

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

        {/* DESKTOP NAV */}
        <MainNavigation navTree={navTree} isLoading={isLoading} />

      </div>
    </header>
  );
}
