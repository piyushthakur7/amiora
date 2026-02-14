'use client';
import { useState, useEffect } from 'react';
import { getProducts } from "@/lib/woocommerce";

import { Product } from "@/types/Product";

interface ProductGridProps {
  categorySlug?: string;
  categoryId?: number;
  title?: string;
}

export default function ProductGrid({ categorySlug, categoryId, title }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [categorySlug, categoryId]);

  const fetchProducts = async () => {
    try {
      const params: any = {};
      if (categoryId) {
        params.category = categoryId;
      } else if (categorySlug) {
        params.category = categorySlug;
      }

      const data = await getProducts(params);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <div>
      {title && (
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">{title}</h1>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg">
            <img
              src={product.images?.[0]?.src || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <p className="text-xl font-bold text-gray-900">{product.price}</p>

            <a
              href={`/product/${product.slug}`} // Assuming product page route
              className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              View Product
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
