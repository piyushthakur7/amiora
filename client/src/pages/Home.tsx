import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductCard } from "@/components/ProductCard";
import { TrustBadges } from "@/components/TrustBadges";
import { Testimonials } from "@/components/Testimonials";
import { InstagramFeed } from "@/components/InstagramFeed";
import { SectionDivider } from "@/components/SectionDivider";
import { getProducts } from "@/lib/woocommerce";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Preloader } from "@/components/Pre";
import type { Product } from "@/types/Product";

import { CategoryRail } from "@/components/CategoryRail";

export default function Home() {
  useEffect(() => {
    document.title =
      "Amiora Diamonds - Luxury Fine Jewelry | Rings, Necklaces, Earrings";
  }, []);

  const { data: newArrivals, isLoading: loadingNew } = useQuery<Product[]>({
    queryKey: ["/api/products", "new"],
    queryFn: () => getProducts(),
  });

  const { data: bestSellers, isLoading: loadingBest } = useQuery<Product[]>({
    queryKey: ["/api/products", "popular"],
    queryFn: () => getProducts(),
  });

  return (
    <div>
      <Preloader />

      <Hero />

      {/* BRAND NARRATIVE */}
      <section className="py-20 text-center bg-transparent">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionDivider variant="ornate" className="mb-8" />
          <h2 className="font-serif text-3xl md:text-5xl text-primary mb-6">
            Timeless Elegance, Crafted for You
          </h2>
          <p className="font-serif text-lg md:text-xl text-muted-foreground leading-relaxed italic">
            "We believe that jewelry is more than just an accessory. It is a reflection of your unique journey, a celebration of your most cherished moments, and an heirloom to be passed down through generations."
          </p>
          <SectionDivider className="mt-8" />
        </div>
      </section>

      <CategoryGrid />

      <SectionDivider variant="ornate" />

      {/* NEW ARRIVALS */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-gold font-sans uppercase tracking-[0.2em] text-xs font-bold mb-2 block">
                Fresh from the Atelier
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-primary">
                New Arrivals
              </h2>
            </div>
            <Link href="/shop?sort=newest">
              <Button variant="link" className="text-primary hover:text-gold transition-colors p-0 h-auto font-serif text-lg italic">
                View Collection &rarr;
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
            {loadingNew
              ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[3/4] w-full" />
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </div>
              ))
              : newArrivals?.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>

      {/* FEATURE BANNER */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden my-12 border-y border-gold/10">
        <div className="absolute inset-0 bg-primary/5 pattern-grid-lg opacity-10" />
        <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="absolute -inset-4 border border-gold/30 rounded-full animate-spin-slow opacity-50" />
            <div className="aspect-square bg-white p-4 shadow-xl rotate-3 max-w-md mx-auto relative z-10">
              <img
                src="https://images.unsplash.com/photo-1573408301185-a1d3106839b9?q=80&w=2070&auto=format&fit=crop"
                alt="Featured Ring"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="order-1 md:order-2 text-center md:text-left">
            <span className="text-gold font-sans uppercase tracking-[0.2em] text-xs font-bold mb-4 block">
              Exquisite Craftsmanship
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-primary mb-6 leading-tight">
              The Royal Collection
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto md:mx-0 font-sans leading-relaxed">
              Inspired by the grandeur of heritage palaces, our Royal Collection features intricate designs and rare gemstones that define luxury.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white font-serif tracking-wide px-8 py-6 text-lg rounded-none shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              Explore the Collection
            </Button>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-primary mb-3">
              Most Loved
            </h2>
            <SectionDivider variant="simple" className="my-4" />
            <p className="text-muted-foreground font-serif italic text-xl">
              Chosen by you, crafted by us.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
            {loadingBest
              ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[3/4] w-full" />
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </div>
              ))
              : bestSellers?.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/shop?sort=popular">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 h-auto font-serif text-lg tracking-wide rounded-none uppercase">
                View All Best Sellers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <TrustBadges />
      <Testimonials />
      <InstagramFeed />
    </div>
  );
}
