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
    {
      name: "Necklaces",
      slug: "necklaces",
      children: [
        "Daily wear",
        "Solitaire",
        "Layer",
        "Bridal",
        "Choker",
        "Y",
        "Bar",
        "Adjustable",
      ],
    },
    {
      name: "Nosepins",
      slug: "nosepins",
      children: ["Solitaire", "Designer", "Rings", "Nath"],
    },
    {
      name: "Rings",
      slug: "rings",
      children: ["Daily wear", "Solitaires", "Bands", "Cocktail", "Platinum"],
    },
    {
      name: "Earrings",
      slug: "earrings",
      children: ["Studs", "Hoops", "Drop / Jhumka"],
    },
    {
      name: "Pendants & Lockets",
      slug: "pendants-lockets",
      children: ["Daily wear", "Solitaire", "Cluster", "Alphabet"],
    },
    {
      name: "Bracelets",
      slug: "bracelets",
      children: [
        "Chain bracelet",
        "Adjustable bracelet",
        "Flexible bracelet",
        "Tennis bracelet",
      ],
    },
    {
      name: "Bangles",
      slug: "bangles",
      children: ["Daily-wear bangles", "Bridal bangles", "Noya"],
    },
    {
      name: "Mangalsutra",
      slug: "mangalsutra",
      children: [
        "Mangal sutra pendant chain",
        "Mangal sutra bracelet",
        "Solitaire mangalsutra",
      ],
    },
    {
      name: "Men's Collection",
      slug: "mens-collection",
      children: ["Rings", "Studs", "Bracelet", "Kada", "Chains", "Pendant"],
    },
    {
      name: "Kids Collection",
      slug: "kids-collection",
      children: ["Rings", "Bracelet / Bangles", "Pendants", "Earrings"],
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 text-[#0E2220]">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20 px-4 md:px-6 lg:px-8">

          {/* MOBILE MENU */}
          <div className="flex items-center gap-6">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#0E2220] hover:text-[#C8A46A]"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="w-80 bg-white text-[#0E2220]"
              >
                <div className="flex flex-col gap-6 mt-8">
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <span className="font-serif text-2xl text-[#C8A46A]">
                      Amiora Diamonds
                    </span>
                  </Link>

                  {/* MOBILE CATEGORY LIST */}
                  <div className="flex flex-col gap-4 mt-4">
                    {categories.map((cat) => (
                      <Link key={cat.slug} href={`/category/${cat.slug}`}>
                        <span className="text-lg text-[#0E2220]">{cat.name}</span>
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
                className="h-10 md:h-12 object-contain"
              />
            </Link>
          </div>

          {/* SEARCH BAR */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0E2220]" />
              <Input
                type="search"
                placeholder="Search for Diamond Jewellery & More..."
                className="pl-10 bg-white text-[#0E2220] placeholder:text-[#0E2220] border-gray-300"
              />
            </div>
          </div>

          {/* ICONS */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-[#0E2220] hover:text-[#C8A46A]">
              <Search className="h-5 w-5 md:hidden" />
            </Button>

            <Button variant="ghost" size="icon" className="text-[#0E2220] hover:text-[#C8A46A]">
              <Heart className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="text-[#0E2220] hover:text-[#C8A46A]">
              <User className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative text-[#0E2220] hover:text-[#C8A46A]"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-[#C8A46A] text-black">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center border-t border-gray-200 bg-white px-4 md:px-6 lg:px-8 text-[#0E2220]">
          <NavigationMenu>
            <NavigationMenuList>
              {categories.map((category) => (
                <NavigationMenuItem key={category.slug}>
                  <NavigationMenuTrigger className="h-12 font-normal text-[#0E2220] hover:text-[#C8A46A] bg-transparent">
                    {category.name}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="bg-white shadow-lg rounded-md">
                    <div className="flex flex-col gap-2 p-4 w-[260px]">

                      <Link href={`/category/${category.slug}`}>
                        <span className="font-medium cursor-pointer text-[#0E2220] hover:text-[#C8A46A]">
                          View all {category.name}
                        </span>
                      </Link>

                      <div className="mt-2 flex flex-col gap-1 pl-1 text-sm text-[#0E2220]">
                        {category.children.map((sub) => (
                          <span
                            key={sub}
                            className="cursor-pointer text-[#0E2220] hover:text-[#C8A46A]"
                          >
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
