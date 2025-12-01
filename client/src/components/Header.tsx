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

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  const categories = [
    { name: "Necklaces", slug: "necklaces", children: ["Daily wear", "Solitaire", "Layer", "Bridal", "Choker", "Y", "Bar", "Adjustable"] },
    { name: "Nosepins", slug: "nosepins", children: ["Solitaire", "Designer", "Rings", "Nath"] },
    { name: "Rings", slug: "rings", children: ["Daily wear", "Solitaires", "Bands", "Cocktail", "Platinum"] },
    { name: "Earrings", slug: "earrings", children: ["Studs", "Hoops", "Drop / Jhumka"] },
    { name: "Pendants & Lockets", slug: "pendants-lockets", children: ["Daily wear", "Solitaire", "Cluster", "Alphabet"] },
    { name: "Bracelets", slug: "bracelets", children: ["Chain bracelet", "Adjustable bracelet", "Flexible bracelet", "Tennis bracelet"] },
    { name: "Bangles", slug: "bangles", children: ["Daily-wear bangles", "Bridal bangles", "Noya"] },
    { name: "Mangalsutra", slug: "mangalsutra", children: ["Mangal sutra pendant chain", "Mangal sutra bracelet", "Solitaire mangalsutra"] },
    { name: "Men's Collection", slug: "mens-collection", children: ["Rings", "Studs", "Bracelet", "Kada", "Chains", "Pendant"] },
    { name: "Kids Collection", slug: "kids-collection", children: ["Rings", "Bracelet / Bangles", "Pendants", "Earrings"] },
  ];

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
                  {/* Mobile Logo */}
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <span className="text-3xl font-serif bg-gradient-to-r from-[#C8A46A] to-[#E6D1A3] text-transparent bg-clip-text">
                      Amiora Diamonds
                    </span>
                  </Link>

                  {/* Mobile Categories */}
                  <div className="flex flex-col gap-5 mt-6">
                    {categories.map(cat => (
                      <Link key={cat.slug} href={`/category/${cat.slug}`} onClick={() => setIsMenuOpen(false)}>
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

        {/* Cart Drawer */}
        <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

        {/* DESKTOP NAV */}
       <nav className="hidden lg:flex items-center border-t border-transparent bg-[#003C32] px-6 shadow-md">
  <NavigationMenu>
    <NavigationMenuList>
      {categories.map(category => (
        <NavigationMenuItem key={category.slug}>
          <NavigationMenuTrigger
            className="h-12 font-medium text-white hover:text-[#C8A46A] bg-transparent transition"
          >
            {category.name}
          </NavigationMenuTrigger>

          <NavigationMenuContent className="bg-white shadow-xl rounded-xl border border-gray-100">
            <div className="flex flex-col gap-2 p-5 w-[260px]">
              <Link href={`/category/${category.slug}`}>
                <span className="font-semibold text-[#003C32] hover:text-[#C8A46A]">
                  View all {category.name}
                </span>
              </Link>

              <div className="mt-2 flex flex-col gap-1 text-sm">
                {category.children.map(sub => (
                  <span key={sub} className="cursor-pointer text-[#003C32] hover:text-[#C8A46A]">
                    {sub}
                  </span>
                ))}
              </div>
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
