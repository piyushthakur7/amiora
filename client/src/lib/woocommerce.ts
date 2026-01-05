import type { Product } from "@/types/Product";

/* -------------------------------------------------
   CONFIG
------------------------------------------------- */
const WC_API_URL = "/api/wc";
// Text placeholders to be replaced by the user with real keys
const CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY || "";
const CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET || "";

// Basic Auth Header
const getAuthHeader = () => {
  return {
    Authorization: `Basic ${btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`)}`,
    "Content-Type": "application/json"
  };
};

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
   GET ALL PRODUCTS
   Example params: { category: 'rings', per_page: 50 }
------------------------------------------------- */
export async function getProducts(params: Record<string, any> = {}): Promise<Product[]> {
  const query = new URLSearchParams({
    per_page: "50", // Default fetch 50 products
    status: "publish",
    ...params,
  });

  // Handle 'category' param: WC API expects 'category' (ID) or 'category_slug' (custom handling needed?)
  // WC API standard param is 'category' which takes ID.
  // If we have a slug, we first need to find the category ID or filter client-side (bad for perf) or use 'slug' param?
  // NOTE: WC API doesn't filter products by category SLUG directly in top-level list endpoint easily without a plugin or looking up ID first.
  // BUT recent versions might support `category` as ID.
  // We will assume `params.category` is passed as ID if number, or we handle slug lookup.

  // Checking previous usage in ProductGrid: it passed `category: categoryId` OR `category: categorySlug`.
  // If it's a slug, we need to resolve it to an ID because WC API usually expects ID for `category` param.

  // Let's resolve slug to ID if needed.
  if (params.category && typeof params.category === "string" && isNaN(Number(params.category))) {
    // required lookup
    const cat = await getCategoryBySlug(params.category);
    if (cat) {
      query.set("category", cat.id.toString());
    } else {
      // Category not found, standard fallback or return empty
      console.warn(`Category slug '${params.category}' not found.`);
      return [];
    }
  }

  try {
    const res = await fetch(`${WC_API_URL}/products?${query.toString()}`, {
      headers: getAuthHeader(),
    });

    if (!res.ok) {
      throw new Error(`WooCommerce API Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data as Product[];
  } catch (err) {
    console.error("Failed to fetch products from WooCommerce", err);
    return [];
  }
}

/* -------------------------------------------------
   GET SINGLE PRODUCT
------------------------------------------------- */
export async function getProduct(id: number): Promise<Product> {
  try {
    const res = await fetch(`${WC_API_URL}/products/${id}`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Product not found");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/* -------------------------------------------------
   GET ALL CATEGORIES
------------------------------------------------- */
export async function getCategories(): Promise<WcCategory[]> {
  try {
    const res = await fetch(`${WC_API_URL}/products/categories?per_page=100&hide_empty=true`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

/* -------------------------------------------------
   GET CATEGORY BY SLUG
------------------------------------------------- */
export async function getCategoryBySlug(slug: string): Promise<WcCategory | null> {
  // Optimization: WC API supports filtering categories by slug? Yes: ?slug=...
  try {
    const res = await fetch(`${WC_API_URL}/products/categories?slug=${slug}`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.length > 0 ? data[0] : null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/* -------------------------------------------------
   GET SUBCATEGORIES (BY PARENT ID)
------------------------------------------------- */
export async function getSubcategories(parentId: number): Promise<WcCategory[]> {
  try {
    const res = await fetch(`${WC_API_URL}/products/categories?parent=${parentId}&per_page=100`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

/* -------------------------------------------------
   GET SUBCATEGORIES (BY SLUG)
------------------------------------------------- */
export async function getSubcategoriesBySlug(slug: string) {
  const parent = await getCategoryBySlug(slug);
  if (!parent) return [];
  return getSubcategories(parent.id);
}

/* -------------------------------------------------
   RESOLVE CATEGORY PATH
------------------------------------------------- */
export async function resolveCategoryPath(slugs: string[]): Promise<WcCategory[] | null> {
  // ... (keep logic but use async API calls?)
  // This is recursive/sequential and might be slow if we do many fetches.
  // Better to fetch all categories and filter locally if possible, OR standard lookup.
  // For now, let's keep it simple or implement if needed. 
  // Let's implement a simplified version looking up the last one?
  // Or just return null as it's typically used for breadcrumbs.

  // Implementation using getCategoryBySlug sequentially
  // Note: This logic was local previously.
  if (!slugs.length) return [];
  const path: WcCategory[] = [];

  try {
    // Very naive implementation: fetch each slug
    // API /products/categories?slug=X might return multiple if slug is not unique (unlikely for cats)
    for (const slug of slugs) {
      const cat = await getCategoryBySlug(slug);
      if (cat) path.push(cat);
    }
    return path;
  } catch (e) {
    return null;
  }
}

/* -------------------------------------------------
   CREATE ORDER (Pending) & GET PAYMENT URL
------------------------------------------------- */
export async function createOrder(items: { product_id: number; quantity: number }[]) {
  try {
    const res = await fetch(`${WC_API_URL}/orders`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify({
        payment_method: "bacs", // Default fallback, user changes on checkout page
        payment_method_title: "Direct Bank Transfer",
        set_paid: false,
        status: "pending",
        line_items: items,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create order");
    }

    const data = await res.json();
    // Return the payment URL key.
    return data.payment_url || null;
  } catch (err) {
    console.error("Order creation failed", err);
    throw err;
  }
}
