import { mapCategory } from "./mapCategory";
import type { Product } from "@/types/Product";

// Environment variables
const base = import.meta.env.VITE_WC_URL;
const key = import.meta.env.VITE_WC_CONSUMER_KEY;
const secret = import.meta.env.VITE_WC_CONSUMER_SECRET;

// Helper: Build WooCommerce REST URL
function wcURL(path: string, params: Record<string, any> = {}) {
  const q = new URLSearchParams({
    consumer_key: key,
    consumer_secret: secret,
    ...params
  });

  return `${base}/wp-json/wc/v3/${path}?${q.toString()}`;
}

/* ---------------------------------------------------
   1. GET ALL PRODUCTS (Replaces old getProducts)
------------------------------------------------------ */
export async function getProducts(): Promise<Product[]> {
  let page = 1;
  let all: Product[] = [];

  while (true) {
    const res = await fetch(
      wcURL("products", {
        per_page: 100,
        page,
        status: "publish"
      })
    );

    if (!res.ok) {
      throw new Error("Failed to load products");
    }

    const items = await res.json();

    if (items.length === 0) break;

    const mapped = items.map((p: any) => {
      const rawCat = p.categories?.[0]?.name || "Uncategorized";

      return {
        ...p,
        bucket: mapCategory(rawCat) ?? "other"
      } as Product;
    });

    all = [...all, ...mapped];
    page++;
  }

  return all;
}

/* ---------------------------------------------------
   2. GET SINGLE PRODUCT
------------------------------------------------------ */
export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(wcURL(`products/${id}`));

  if (!res.ok) {
    throw new Error("Failed to load product");
  }

  const p = await res.json();
  const rawCat = p.categories?.[0]?.name || "Uncategorized";

  return {
    ...p,
    bucket: mapCategory(rawCat) ?? "other"
  } as Product;
}

/* ---------------------------------------------------
   3. GET CATEGORIES
------------------------------------------------------ */
export async function getCategories(): Promise<{ id: number; name: string }[]> {
  const res = await fetch(
    wcURL("products/categories", {
      per_page: 100
    })
  );

  if (!res.ok) {
    throw new Error("Failed to load categories");
  }

  return res.json();
}
