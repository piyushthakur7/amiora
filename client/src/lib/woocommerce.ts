import { mapCategory } from "./mapCategory";

// Load environment variables
const base = import.meta.env.VITE_WC_URL;
const key = import.meta.env.VITE_WC_CONSUMER_KEY;
const secret = import.meta.env.VITE_WC_CONSUMER_SECRET;

// Debug logs (optional – remove in production)
console.log("WooCommerce Base URL:", base);
console.log("Consumer Key:", key);
console.log("Consumer Secret:", secret);

// Fetch ALL products (mapped to correct category bucket)
export async function getProducts(page: number = 1) {
  const url =
    `${base}/wp-json/wc/v3/products` +
    `?consumer_key=${key}` +
    `&consumer_secret=${secret}` +
    `&per_page=100` +
    `&page=${page}` +
    `&status=publish`;

  console.log("Fetching:", url);

  const res = await fetch(url);

  if (!res.ok) {
    console.error("WooCommerce fetch failed:", await res.text());
    throw new Error("Failed to load products");
  }

  const products = await res.json();

  // Attach mapped bucket to each product
  const mapped = products
    .map((p: any) => {
      const rawCat = p.categories?.[0]?.name || "";
      const bucket = mapCategory(rawCat);

      // hide products with categories not in your mapping table
      if (!bucket) return null;

      return {
        ...p,
        bucket
      };
    })
    .filter(Boolean);

  return mapped;
}

// Fetch single product + mapped bucket
export async function getProduct(id: number) {
  const url =
    `${base}/wp-json/wc/v3/products/${id}` +
    `?consumer_key=${key}` +
    `&consumer_secret=${secret}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to load product");
  }

  const product = await res.json();

  const rawCat = product.categories?.[0]?.name || "";
  const bucket = mapCategory(rawCat);

  return {
    ...product,
    bucket
  };
}

// Fetch WooCommerce categories (optional)
export async function getCategories() {
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
