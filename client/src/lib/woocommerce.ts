// Load environment variables
const base = import.meta.env.VITE_WC_URL;
const key = import.meta.env.VITE_WC_CONSUMER_KEY;
const secret = import.meta.env.VITE_WC_CONSUMER_SECRET;

// Debug logs (optional – remove in production)
console.log("WooCommerce Base URL:", base);
console.log("Consumer Key:", key);
console.log("Consumer Secret:", secret);

// Fetch all products (100 per page)
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

  return res.json();
}

// Fetch single product by ID
export async function getProduct(id: number) {
  const url =
    `${base}/wp-json/wc/v3/products/${id}` +
    `?consumer_key=${key}` +
    `&consumer_secret=${secret}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to load product");
  }

  return res.json();
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
