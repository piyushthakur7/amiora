import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getProducts } from "@/lib/woocommerce";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

const categoryData: Record<string, { title: string; description: string }> = {
  rings: {
    title: "Rings",
    description: "Discover our stunning collection of diamond and gold rings"
  },
  earrings: {
    title: "Earrings",
    description: "Elegant earrings to complement every occasion"
  },
  neckwear: {
    title: "Neckwear",
    description: "Exquisite necklaces and pendants crafted with precision"
  },
  wristwear: {
    title: "Wristwear",
    description: "Beautiful bracelets and bangles for timeless elegance"
  },
  "mens-jewelry": {
    title: "Men's Jewelry",
    description: "Sophisticated jewelry designed for the modern gentleman"
  },
  bridal: {
    title: "Bridal",
    description: "Complete bridal sets for your special day"
  },
  custom: {
    title: "Custom Jewelry",
    description: "Create your own unique piece with our customization service"
  },
  all: {
    title: "All Jewellery",
    description: "Browse our complete collection of fine jewelry"
  }
};

export default function Category() {
  const params = useParams();
  const categorySlug = params.slug || '';
  const category = categoryData[categorySlug] || {
    title: "Category",
    description: "Explore our jewelry collection"
  };

  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products', 'category', categorySlug],
    queryFn: () => getProducts()
  });

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

        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4" data-testid="text-category-title">
          {category.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {category.description}
        </p>
      </div>

      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {products?.length || 0} products
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
        ) : (
          products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {!isLoading && products && products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            No products available in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}
