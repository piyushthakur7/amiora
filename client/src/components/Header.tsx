import { useState, useMemo } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { getCategories, type WcCategory } from "@/lib/woocommerce";

import { cn } from "@/lib/utils";

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

  // -- DYNAMIC CATEGORY FETCHING --
  const { data: allCategories = [], isLoading } = useQuery<WcCategory[]>({
    queryKey: ["header-categories"],
    queryFn: () => getCategories(),
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
  });

  // Calculate Navigation Tree
  const navTree = useMemo(() => {
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

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="p-2 rounded-xl bg-white/10 border border-white/20 shadow-sm hover:bg-white/20 transition text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-80 bg-white text-[#0E2220] overflow-y-auto">
                <div className="flex flex-col gap-6 mt-10">

                  {/* MOBILE LOGO */}
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <span className="text-3xl font-serif bg-gradient-to-r from-[#C8A46A] to-[#E6D1A3] text-transparent bg-clip-text">
                      Amiora Diamonds
                    </span>
                  </Link>

                  {/* MOBILE CATEGORY LIST */}
                  <div className="flex flex-col gap-5 mt-6">
                    {navTree.map(cat => (
                      <div key={cat.id} className="flex flex-col gap-2">
                        <Link href={`/${cat.slug}`} onClick={() => setIsMenuOpen(false)}>
                          <span className="text-xl font-medium hover:text-[#C8A46A] transition">
                            {cat.name}
                          </span>
                        </Link>
                        {/* Mobile Subcategories */}
                        {cat.children.length > 0 && (
                          <div className="pl-4 flex flex-col gap-1 border-l-2 border-[#f0e6d2]">
                            {cat.children.map(sub => (
                              <Link key={sub.id} href={`/${cat.slug}/${sub.slug}`} onClick={() => setIsMenuOpen(false)}>
                                <span className="text-sm text-gray-600 hover:text-[#C8A46A] py-1 block">
                                  {sub.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
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
        <nav className="hidden lg:flex justify-center items-center border-t border-white/10 bg-black/20 backdrop-blur-sm px-6 shadow-md min-h-[48px]">
          <NavigationMenu className="mx-auto">
            <NavigationMenuList className="gap-2 flex-wrap justify-center">

              {navTree.map(category => (
                <NavigationMenuItem key={category.id}>

                  <NavigationMenuTrigger
                    className="h-12 font-medium text-white hover:text-[#C8A46A] bg-transparent transition focus:bg-transparent active:bg-transparent data-[state=open]:bg-[#002A24]"
                  >
                    <Link href={`/${category.slug}`}>
                      {category.name}
                    </Link>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="bg-[#003C32] shadow-xl rounded-b-xl border-x border-b border-[#C8A46A]/20 -mt-1">
                    <div className="flex flex-row p-6 w-[90vw] max-w-7xl gap-8 min-h-[350px] justify-center">

                      {/* VIEW ALL */}
                      <Link href={`/${category.slug}`}>
                        <span className="font-serif text-2xl text-white hover:text-[#C8A46A] block mb-4 pb-2 border-b border-white/10">
                          View all {category.name}
                        </span>
                      </Link>

                      {/* SUBCATEGORY LINKS */}
                      {category.children.length > 0 ? (
                        <div className="flex flex-col gap-1 text-sm max-h-[300px] overflow-y-auto">
                          {category.children.map(sub => (
                            <Link key={sub.id} href={`/${category.slug}/${sub.slug}`}>
                              <span className="cursor-pointer text-white/80 hover:text-[#C8A46A] py-1 block text-lg transition-colors">
                                {sub.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="text-xs text-gray-400 italic">No subcategories</div>
                      )}

                    </div>
                  </NavigationMenuContent>

                </NavigationMenuItem>
              ))}

              {navTree.length === 0 && !isLoading && (
                <div className="text-white/70 py-3 text-sm italic">
                  Loading Categories... (Check API Keys)
                </div>
              )}

            </NavigationMenuList>

            <NavigationMenuViewport />
          </NavigationMenu>
        </nav>

      </div>
    </header>
  );
}
