// client/src/lib/woocommerce.ts
import type { Product } from "@/types/Product";

/* -------------------------------------------------
   CATEGORY TYPE
------------------------------------------------- */
export interface WcCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description?: string;
  count?: number;
  image?: {
    id?: number;
    src?: string;
    name?: string;
    alt?: string;
  } | null;
}

/* -------------------------------------------------
   ENV VARIABLES
------------------------------------------------- */
const base = import.meta.env.VITE_WC_URL || "";
const key = import.meta.env.VITE_WC_CONSUMER_KEY || "";
const secret = import.meta.env.VITE_WC_CONSUMER_SECRET || "";

/* -------------------------------------------------
   BUILD WC API URL
------------------------------------------------- */
function wcURL(path: string, params: Record<string, any> = {}): string {
  const qp: Record<string, any> = {
    consumer_key: key,
    consumer_secret: secret,
  };

  Object.assign(qp, params);

  return `${base.replace(/\/$/, "")}/wp-json/wc/v3/${path}?${new URLSearchParams(qp)}`;
}

/* -------------------------------------------------
   GET ALL PRODUCTS
------------------------------------------------- */
export async function getProducts(params: Record<string, any> = {}): Promise<Product[]> {
  let page = 1;
  const perPage = params.per_page ?? 100;
  const all: Product[] = [];

  while (true) {
    const res = await fetch(
      wcURL("products", {
        per_page: perPage,
        page,
        status: "publish",
        ...params,
      })
    );

    if (!res.ok) throw new Error(`Failed to load products: ${res.status}`);

    const items: Product[] = await res.json();
    if (!items.length) break;

    all.push(...items);
    if (items.length < perPage) break;

    page++;
  }

  return all;
}

/* -------------------------------------------------
   GET SINGLE PRODUCT
------------------------------------------------- */
export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(wcURL(`products/${id}`));
  if (!res.ok) throw new Error("Failed to load product");
  return res.json();
}

/* -------------------------------------------------
   GET ALL CATEGORIES  ⭐ FIXED ⭐
------------------------------------------------- */
export async function getCategories(): Promise<WcCategory[]> {
  const res = await fetch(
    wcURL("products/categories", {
      per_page: 100,
      orderby: "menu_order",
      order: "asc",
      hide_empty: false, // <--- REQUIRED
    })
  );

  // Debug log
  const data = await res.clone().json();
  console.log("🔥 CATEGORIES FROM API:", data);

  if (!res.ok) {
    throw new Error(`Failed to load categories: ${res.status}`);
  }

  return data;
}

/* -------------------------------------------------
   GET CATEGORY BY SLUG
------------------------------------------------- */
export async function getCategoryBySlug(slug: string): Promise<WcCategory | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

/* -------------------------------------------------
   GET SUBCATEGORIES (BY PARENT ID)
------------------------------------------------- */
export async function getSubcategories(parentId: number): Promise<WcCategory[]> {
  const categories = await getCategories();
  return categories.filter((c) => c.parent === parentId);
}

/* -------------------------------------------------
   GET SUBCATEGORIES (BY SLUG)
------------------------------------------------- */
export async function getSubcategoriesBySlug(slug: string) {
  try {
    const categories = await getCategories();
    const parent = categories.find((c) => c.slug === slug);

    if (!parent) return [];

    return categories.filter((c) => c.parent === parent.id);
  } catch (err) {
    console.error("❌ getSubcategoriesBySlug failed:", err);
    return [];
  }
}

/* -------------------------------------------------
   RESOLVE CATEGORY PATH
------------------------------------------------- */
export async function resolveCategoryPath(slugs: string[]): Promise<WcCategory[] | null> {
  if (!slugs.length) return [];

  const categories = await getCategories();
  let parent = 0;
  const path: WcCategory[] = [];

  for (const slug of slugs) {
    const found = categories.find((c) => c.slug === slug && c.parent === parent);
    if (!found) return null;

    path.push(found);
    parent = found.id;
  }

  return path;
}

/* -------------------------------------------------
   GET PRODUCTS FOR CATEGORY SLUG
------------------------------------------------- */
export async function getProductsForCategoryPath(slug: string): Promise<Product[]> {
  try {
    const category = await getCategoryBySlug(slug);
    if (!category) return [];

    const res = await fetch(
      wcURL("products", {
        per_page: 100,
        category: category.id,
      })
    );

    if (!res.ok) return [];

    return await res.json();
  } catch (err) {
    console.error("❌ Product load failed:", err);
    return [];
  }
}
