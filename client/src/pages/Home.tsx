import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductCard } from "@/components/ProductCard";
import { TrustBadges } from "@/components/TrustBadges";
import { Testimonials } from "@/components/Testimonials";
import InstagramFeed from "@/components/InstagramFeed";
import { getProducts } from "@/lib/woocommerce";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Preloader } from "@/components/Pre";
import type { Product } from "@/types/Product";

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
      <CategoryGrid />

      <section className="py-16 md:py-24 bg-accent/10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-accent/20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                New Arrivals
              </h2>
              <p className="text-muted-foreground">
                Discover our latest collection of exquisite jewelry
              </p>
            </div>
            <Link href="/shop?sort=newest">
              <Button variant="outline" data-testid="button-view-all-new">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loadingNew
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
              : newArrivals?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                Best Sellers
              </h2>
              <p className="text-muted-foreground">
                Our most loved pieces chosen by our customers
              </p>
            </div>
            <Link href="/shop?sort=popular">
              <Button variant="outline" data-testid="button-view-all-best">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loadingBest
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
              : bestSellers?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </div>
      </section>

      <TrustBadges />
      <Testimonials />
      <InstagramFeed />
    </div>
  );
}
