import { useQuery } from "@tanstack/react-query";
import { getProductsByStrictCategory } from "@/lib/strict-api";
import { ProductCard } from "@/components/ProductCard";
import { Preloader } from "@/components/Pre";
import { Product } from "@/types/Product";

export default function DailyWearRings() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products", "rings", "daily-wear"],
    queryFn: () => getProductsByStrictCategory("rings", "daily-wear"),
  });

  if (isLoading) return <Preloader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-serif text-4xl text-primary text-center mb-8">Daily Wear Rings</h1>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          No items found in this collection explicitly tagged "Rings" and "Daily Wear".
        </div>
      )}
    </div>
  );
}
