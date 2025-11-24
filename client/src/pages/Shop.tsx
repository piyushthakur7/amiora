import { useEffect, useState, useMemo } from "react";
import { getProducts } from "../lib/woocommerce";
import { ProductCard } from "@/components/ProductCard";
import { mapCategory } from "../lib/mapCategory";  

export default function Shop() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data: any[]) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.error("WooCommerce fetch failed:", err);
        setLoading(false);
      });
  }, []);

  // Optional: map WooCommerce categories for future filtering
  const productsWithBuckets = useMemo(() => {
    return items.map((product: any) => {
      const wcCategories = product.categories || [];
      const mappedBuckets = wcCategories
        .map((c: any) => mapCategory(c.name))
        .filter(Boolean); // remove null

      return { ...product, buckets: mappedBuckets };
    });
  }, [items]);

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

      {/* 
        You can add category filters here later.
        productsWithBuckets[x].buckets contains the mapped bucket names.
      */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productsWithBuckets.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
