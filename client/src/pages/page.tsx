import { useEffect, useState } from "react";
import { getProducts } from "@/lib/woocommerce";
import { ProductCard } from "@/components/ProductCard";

export default function Shop() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()   // <-- FIXED
      .then((data: any) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.error("WooCommerce fetch failed:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-3xl font-bold mb-8">Shop</h1>
        <p>Loading products…</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl font-bold mb-8">Shop</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
