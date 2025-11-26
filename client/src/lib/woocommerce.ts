import { mapCategory } from "./mapCategory";
import type { Product } from "@/types/Product";

// Load environment variables
const base = import.meta.env.VITE_WC_URL;
const key = import.meta.env.VITE_WC_CONSUMER_KEY;
const secret = import.meta.env.VITE_WC_CONSUMER_SECRET;

// Fetch ALL products (mapped to category bucket)
export async function getProducts(page: number = 1): Promise<Product[]> {
  const url =
    `${base}/wp-json/wc/v3/products` +
    `?consumer_key=${key}` +
    `&consumer_secret=${secret}` +
    `&per_page=100` +
    `&page=${page}` +
    `&status=publish`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to load products");
  }

  const products = await res.json();

  const mapped: Product[] = products
    .map((p: any) => {
      const rawCat = p.categories?.[0]?.name || "";
      const bucket = mapCategory(rawCat);

      if (!bucket) return null;

      return {
        ...p,
        bucket
      } as Product;
    })
    .filter(Boolean);

  return mapped;
}

// Fetch a single product
export async function getProduct(id: number): Promise<Product> {
  const url =
    `${base}/wp-json/wc/v3/products/${id}` +
    `?consumer_key=${key}` +
    `&consumer_secret=${secret}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to load product");
  }

  const p = await res.json();

  const rawCat = p.categories?.[0]?.name || "";
  const bucket = mapCategory(rawCat);

  return {
    ...p,
    bucket
  } as Product;
}

// Fetch categories
export async function getCategories(): Promise<
  { id: number; name: string }[]
> {
  const url =
    `${base}/wp-json/wc/v3/products/categories` +
    `?consumer_key=${key}` +
    `&consumer_secret=${secret}` +
    `&per_page=100`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to load categories");
  }

  return res.json();
}
