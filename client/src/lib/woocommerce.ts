const base = import.meta.env.VITE_WC_URL;
const key = import.meta.env.VITE_WC_CONSUMER_KEY;
const secret = import.meta.env.VITE_WC_CONSUMER_SECRET;

export async function getProducts() {
  const url = `${base}/wp-json/wc/v3/products?consumer_key=${key}&consumer_secret=${secret}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to load products");
  }

  return res.json();
}
