import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { getProducts } from "@/lib/woocommerce";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { mapCategory } from "@/lib/mapCategory";
import { CATEGORY_BUCKETS } from "@/lib/categoryBuckets";

// Frontend category metadata
const categoryData: Record<
  string,
  { title: string; description: string; bucket: string }
> = {
  rings: {
    title: "Rings",
    description: "Discover our stunning collection of diamond and gold rings",
    bucket: "rings",
  },
  earrings: {
    title: "Earrings",
    description: "Elegant earrings to complement every occasion",
    bucket: "earrings",
  },
  neckwear: {
    title: "Neckwear",
    description: "Exquisite necklaces and pendants crafted with precision",
    bucket: "necklaces",
  },
  wristwear: {
    title: "Wristwear",
    description: "Beautiful bracelets and bangles for timeless elegance",
    bucket: "bracelets",
  },
  "mens-jewelry": {
    title: "Men's Jewelry",
    description: "Sophisticated jewelry designed for the modern gentleman",
    bucket: "mens",
  },
  bridal: {
    title: "Bridal",
    description: "Complete bridal sets for your special day",
    bucket: "necklaces",
  },
  custom: {
    title: "Custom Jewelry",
    description: "Create your own unique piece with our customization service",
    bucket: "custom",
  },
  all: {
    title: "All Jewellery",
    description: "Browse our complete collection of fine jewelry",
    bucket: "all",
  },
};

export default function Category() {
  const params = useParams();
  const categorySlug = params.slug || "";

  const category =
    categoryData[categorySlug] || {
      title: "Category",
      description: "Explore our jewelry collection",
      bucket: "all",
    };

  const { data: products, isLoading } = useQuery({
    queryKey: ["/api/products", "category", categorySlug],
    queryFn: () => getProducts(),
  });

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    if (category.bucket === "all") {
      return products;
    }

    return products.filter((product: any) => {
      const wcCategories = product.categories || [];

      for (const wcCat of wcCategories) {
        const mapped = mapCategory(wcCat.name);
        if (mapped === category.bucket) {
          return true;
        }
      }
      return false;
    });
  }, [products, category.bucket]);

  useEffect(() => {
    document.title = `${category.title} | Amiora Diamonds`;
  }, [category.title]);

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{category.title}</span>
        </nav>

        <h1
          className="font-serif text-4xl md:text-5xl font-bold mb-4"
          data-testid="text-category-title"
        >
          {category.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {category.description}
        </p>
      </div>

      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length} products
        </p>
      </div>

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
          <div className="text-center py-16 col-span-full">
            <p className="text-muted-foreground text-lg">
              No products available in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
