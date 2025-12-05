import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getProducts } from "@/lib/woocommerce";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Category() {
  const { slug } = useParams();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products-by-category", slug],
    queryFn: () => getProducts(),
  });

  // Filter based on WooCommerce category slug
  const filteredProducts =
    products?.filter((p: any) =>
      p.categories?.some((c: any) => c.slug === slug)
    ) || [];

  useEffect(() => {
    document.title = `${slug} | Amiora Diamonds`;
  }, [slug]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <nav className="text-sm text-muted-foreground mb-4">
          <Link href="/">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground capitalize">{slug}</span>
        </nav>

        <h1 className="text-4xl font-bold capitalize mb-3">{slug}</h1>
        <p className="text-muted-foreground">
          Browse our collection of {slug}
        </p>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {filteredProducts.length} products
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-muted-foreground text-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
