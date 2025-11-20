const base = import.meta.env.VITE_WC_URL;
const key = import.meta.env.VITE_WC_CONSUMER_KEY;
const secret = import.meta.env.VITE_WC_CONSUMER_SECRET;

// Debug logs
console.log("WC Base URL:", base);
console.log("WC Key:", key);
console.log("WC Secret:", secret);

export async function getProducts() {
  const url = `${base}/wp-json/wc/v3/products?consumer_key=${key}&consumer_secret=${secret}`;
  console.log("Fetching:", url);

  const res = await fetch(url);

  if (!res.ok) {
    console.error("WooCommerce fetch failed:", await res.text());
    throw new Error("Failed to load products");
  }

  return res.json();
}
