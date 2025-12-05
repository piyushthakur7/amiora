'use client';
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: { src: string };
  permalink: string;
}

interface ProductGridProps {
  categorySlug?: string;
  categoryId?: number;
}

export default function ProductGrid({ categorySlug, categoryId }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [categorySlug, categoryId]);

  const fetchProducts = async () => {
    try {
      let url = "/api/woocommerce/products?";

      if (categoryId) {
        url += `categoryId=${categoryId}`;
      } else if (categorySlug) {
        url += `category=${categorySlug}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg">
          <img
            src={product.image?.src || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <p className="text-xl font-bold text-gray-900">{product.price}</p>

          <a
            href={product.permalink}
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            View Product
          </a>
        </div>
      ))}
    </div>
  );
}
