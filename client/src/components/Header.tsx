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
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.07)]">
      <div className="container mx-auto">


        {/* TOP BAR */}
        <div className="flex items-center justify-between h-16 px-4 md:px-6 lg:px-8">


          {/* MOBILE MENU */}
          <div className="flex items-center gap-5">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-[#0E2220] hover:text-[#C8A46A]">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>


              <SheetContent side="left" className="w-80 bg-white text-[#0E2220]">
                <div className="flex flex-col gap-6 mt-8">


                  {/* Mobile Logo */}
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <span className="font-serif text-3xl bg-gradient-to-r from-[#C8A46A] to-[#E6D1A3] text-transparent bg-clip-text">
                      Amiora Diamonds
                    </span>
                  </Link>


                  {/* Mobile Categories */}
                  <div className="flex flex-col gap-5 mt-4">
                    {categories.map((cat) => (
                      <Link key={cat.slug} href={`/category/${cat.slug}`}>
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
                className="h-14 md:h-16 lg:h-18 object-contain transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </div>


          {/* SEARCH BAR */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for Diamond Jewellery & More…"
                className="pl-12 rounded-full border-gray-300 focus:border-[#C8A46A] focus:ring-[#C8A46A]/40 text-[#0E2220]"
              />
            </div>
          </div>


          {/* ICONS */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden text-[#0E2220]">
              <Search className="h-6 w-6" />
            </Button>


            <Button variant="ghost" size="icon" className="hover:text-[#C8A46A]">
              <Heart className="h-6 w-6" />
            </Button>


            <Button variant="ghost" size="icon" className="hover:text-[#C8A46A]">
              <User className="h-6 w-6" />
            </Button>


            <Button variant="ghost" size="icon" className="relative hover:text-[#C8A46A]" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-br from-[#C8A46A] to-[#E6D1A3] text-black flex items-center justify-center text-xs p-0 shadow-md">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>


        </div>


        <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />


        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center border-t border-gray-100 px-6 bg-white">
          <NavigationMenu>
            <NavigationMenuList>
              {categories.map((category) => (
                <NavigationMenuItem key={category.slug}>
                  <NavigationMenuTrigger
                    className="h-12 font-medium text-[#0E2220] hover:text-[#C8A46A] bg-transparent transition"
                  >
                    {category.name}
                  </NavigationMenuTrigger>


                  <NavigationMenuContent className="bg-white shadow-xl rounded-xl border border-gray-100">
                    <div className="flex flex-col gap-2 p-5 w-[260px]">
                      <Link href={`/category/${category.slug}`}>
                        <span className="font-semibold hover:text-[#C8A46A]">
                          View all {category.name}
                        </span>
                      </Link>


                      <div className="mt-2 flex flex-col gap-1 text-sm">
                        {category.children.map((sub) => (
                          <span key={sub} className="cursor-pointer hover:text-[#C8A46A]">
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