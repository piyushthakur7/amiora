import { useState } from "react";
import { Link, useLocation } from "wouter";
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
} from "@/components/ui/navigation-menu";
import { CartDrawer } from "@/components/CartDrawer";
import { useCart } from "@/lib/cart-store";

export function Header() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  const categories = [
    { name: "Rings", slug: "rings" },
    { name: "Earrings", slug: "earrings" },
    { name: "Neckwear", slug: "neckwear" },
    { name: "Wristwear", slug: "wristwear" },
    { name: "Men's Jewelry", slug: "mens-jewelry" },
    { name: "All Jewellery", slug: "all" }
  ];

  const collections = [
    { name: "Wedding", slug: "wedding" },
    { name: "Festive", slug: "festive" },
    { name: "Daily Wear", slug: "daily-wear" },
    { name: "Gifting", slug: "gifting" },
    { name: "Trending", slug: "trending" },
    { name: "Personalized", slug: "personalized" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20 px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" data-testid="button-menu-toggle">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="flex flex-col gap-6 mt-8">
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <span className="font-serif text-2xl">Amiora Diamonds</span>
                  </Link>
                  <nav className="flex flex-col gap-4">
                    <Link href="/shop" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start" data-testid="link-shop">Shop All</Button>
                    </Link>
                    <Link href="/collections/bridal" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start" data-testid="link-bridal">Bridal</Button>
                    </Link>
                    <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start" data-testid="link-about">About Us</Button>
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/" data-testid="link-home">
              <img
                src="https://github.com/piyushthakur7/bm-scrubber-images-/blob/main/Amiora-final-logo-01.png?raw=true"
                alt="Amiora Diamonds"
                className="h-10 md:h-12 object-contain"
              />
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for Diamond Jewellery & More..."
                className="pl-10 bg-accent/30 border-border"
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" data-testid="button-search-mobile" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" data-testid="button-wishlist">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" data-testid="button-account">
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
              data-testid="button-cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  data-testid="badge-cart-count"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
        
        <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

        <nav className="hidden lg:flex items-center justify-center gap-1 border-t border-border px-4 md:px-6 lg:px-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/collections/diamond" data-testid="link-diamond">
                  <Button variant="ghost" className="h-12 font-normal">Diamond</Button>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-12 font-normal" data-testid="menu-categories">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        data-testid={`link-category-${category.slug}`}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start hover-elevate"
                        >
                          {category.name}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-12 font-normal" data-testid="menu-collections">
                  Collections
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                    {collections.map((collection) => (
                      <Link
                        key={collection.slug}
                        href={`/collections/${collection.slug}`}
                        data-testid={`link-collection-${collection.slug}`}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start hover-elevate"
                        >
                          {collection.name}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/collections/daily-wear" data-testid="link-daily-wear">
                  <Button variant="ghost" className="h-12 font-normal">Daily Wear</Button>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/collections/wedding" data-testid="link-wedding">
                  <Button variant="ghost" className="h-12 font-normal">Wedding</Button>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/collections/gifting" data-testid="link-gifting">
                  <Button variant="ghost" className="h-12 font-normal">Gifting</Button>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/offers" data-testid="link-offers">
                  <Button variant="ghost" className="h-12 font-normal text-primary">Offer</Button>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-12 font-normal" data-testid="menu-more">
                  More
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[300px]">
                    <Link href="/about" data-testid="link-about-nav">
                      <Button variant="ghost" className="w-full justify-start hover-elevate">
                        About Us
                      </Button>
                    </Link>
                    <Link href="/faq" data-testid="link-faq">
                      <Button variant="ghost" className="w-full justify-start hover-elevate">
                        FAQ
                      </Button>
                    </Link>
                    <Link href="/blog" data-testid="link-blog">
                      <Button variant="ghost" className="w-full justify-start hover-elevate">
                        Blog
                      </Button>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>
    </header>
  );
}
