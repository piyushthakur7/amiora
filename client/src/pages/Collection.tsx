import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getProducts } from "@/lib/woocommerce";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import bridalImage from "@assets/generated_images/Bridal_jewelry_collection_67832531.png";

const collectionData: Record<string, { title: string; description: string; image: string }> = {
  wedding: {
    title: "Wedding Collection",
    description: "Celebrate your special day with our exquisite bridal jewelry collection",
    image: bridalImage
  },
  festive: {
    title: "Festive Collection",
    description: "Sparkle and shine during celebrations with our festive jewelry",
    image: bridalImage
  },
  "daily-wear": {
    title: "Daily Wear Collection",
    description: "Elegant pieces perfect for everyday luxury",
    image: bridalImage
  },
  gifting: {
    title: "Gifting Collection",
    description: "Thoughtful jewelry gifts for your loved ones",
    image: bridalImage
  },
  trending: {
    title: "Trending Now",
    description: "Discover the latest trends in fine jewelry",
    image: bridalImage
  },
  personalized: {
    title: "Personalized Jewelry",
    description: "Create something unique with our customization options",
    image: bridalImage
  },
  diamond: {
    title: "Diamond Collection",
    description: "Timeless brilliance in our diamond jewelry collection",
    image: bridalImage
  },
  bridal: {
    title: "Bridal Collection",
    description: "Complete bridal sets for your perfect wedding day",
    image: bridalImage
  }
};

export default function Collection() {
  const params = useParams();
  const collectionSlug = params.slug || '';
  const collection = collectionData[collectionSlug] || {
    title: "Collection",
    description: "Explore our curated jewelry collection",
    image: bridalImage
  };

  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products', collectionSlug],
    queryFn: () => getProducts()
  });

  useEffect(() => {
    document.title = `${collection.title} | Amiora Diamonds`;
  }, [collection.title]);

  return (
    <div>
      <div
        className="relative h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${collection.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        <div className="relative container mx-auto px-4 md:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4" data-testid="text-collection-title">
            {collection.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            {collection.description}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <p className="text-sm text-muted-foreground">
            {products?.length || 0} products
          </p>
          <nav className="text-sm text-muted-foreground">
            <Link href="/">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{collection.title}</span>
          </nav>
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
              No products available in this collection yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
