import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductCard } from "@/components/ProductCard";
import { TrustBadges } from "@/components/TrustBadges";
import { Testimonials } from "@/components/Testimonials";
import { InstagramFeed } from "@/components/InstagramFeed";
import { getProducts } from "@/lib/woocommerce";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Preloader } from "@/components/Pre"; // ← Added this

export default function Home() {
  useEffect(() => {
    document.title =
      "Amiora Diamonds - Luxury Fine Jewelry | Rings, Necklaces, Earrings";
  }, []);

  const { data: newArrivals, isLoading: loadingNew } = useQuery({
    queryKey: ["/api/products", "new"],
    queryFn: () => getProducts(),
  });

  const { data: bestSellers, isLoading: loadingBest } = useQuery({
    queryKey: ["/api/products", "popular"],
    queryFn: () => getProducts(),
  });

  return (
    <div>
      <Preloader /> {/* Logo intro overlay */}

      <Hero />
      <CategoryGrid />

      <section className="py-16 md:py-24 bg-accent/10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                Rings
              </h2>
              <p className="text-muted-foreground">Platinum Rings</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              "https://raw.githubusercontent.com/piyushthakur7/amiora-images-ring-/main/Platinum%20rings_page-0001.jpg?raw=1",
              "https://raw.githubusercontent.com/piyushthakur7/amiora-images-ring-/main/Platinum%20rings_page-0002.jpg?raw=1",
              "https://raw.githubusercontentusercontent.com/piyushthakur7/amiora-images-ring-/main/Platinum%20rings_page-0003.jpg?raw=1",
              "https://raw.githubusercontent.com/piyushthakur7/amiora-images-ring-/main/Platinum%20rings_page-0004.jpg?raw=1",
              "https://raw.githubusercontent.com/piyushthakur7/amiora-images-ring-/main/Platinum%20rings_page-0005.jpg?raw=1",
              "https://raw.githubusercontent.com/piyushthakur7/amiora-images-ring-/main/Platinum%20rings_page-0006.jpg?raw=1",
              "https://raw.githubusercontent.com/piyushthakur7/amiora-images-ring-/main/Platinum%20rings_page-0007.jpg?raw=1",
              "https://raw.githubusercontent.com/piyushthakur7/amiora-images-ring-/main/Platinum%20rings_page-0008.jpg?raw=1",
              "https://raw.githubusercontent.com/piyushthakur7/amiora-images-ring-/main/Platinum%20rings_page-0009.jpg?raw=1",
              "https://raw.githubusercontent.com/piyushthakur7/amiora-images-ring-/main/Platinum%20rings_page-0010.jpg?raw=1",
              "https://raw.githubusercontent.com/piyushthakur7/amiora-images-ring-/main/Platinum%20rings_page-0011.jpg?raw=1",
            ].map((src, index) => (
              <motion.div
                key={index}
                className="rounded-lg overflow-hidden border bg-white shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <img
                  src={src}
                  alt={`Platinum Ring ${index + 1}`}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium">
                    Platinum Ring {index + 1}
                  </h3>
                </div>
              </motion.div>
            ))}
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
