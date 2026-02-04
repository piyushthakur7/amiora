import type { Product } from "@/types/Product";

/* -------------------------------------------------
   CONFIG
------------------------------------------------- */
const WC_API_URL = "/api/wc";
// Keys should be in .env.local or .env
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
   MAPPERS
------------------------------------------------- */
function mapProduct(p: any): Product {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    regularPrice: p.regular_price,
    onSale: p.on_sale,
    images: p.images?.map((img: any) => ({
      src: img.src,
      alt: img.alt || p.name
    })) || [],
    description: p.description,
    shortDescription: p.short_description,
    sku: p.sku,
    categories: p.categories?.map((c: any) => ({
      id: c.id,
      name: c.name,
      slug: c.slug
    })) || [],
    attributes: p.attributes?.map((a: any) => ({
      id: a.id,
      name: a.name,
      options: a.options
    })) || []
  };
}

/* -------------------------------------------------
   GET ALL PRODUCTS
------------------------------------------------- */
export async function getProducts(params: Record<string, any> = {}): Promise<Product[]> {
  const query = new URLSearchParams({
    per_page: "50",
    status: "publish",
    ...params,
  });

  // If filtering by category slug (which assumes the internal logic passes slugs)
  // WC API expects 'category' param to be ID, not slug. 
  // If the caller passes 'category' as a slug, we need to resolve it to an ID.
  if (params.category && typeof params.category === "string" && isNaN(Number(params.category))) {
    try {
      const cat = await getCategoryBySlug(params.category);
      if (cat) {
        query.set("category", cat.id.toString());
      } else {
        // Category not found, return empty
        return [];
      }
    } catch (e) {
      console.error("Error resolving category slug:", e);
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
    if (!Array.isArray(data)) return [];

    return data.map(mapProduct);
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
    const data = await res.json();
    return mapProduct(data);
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
    const res = await fetch(`${WC_API_URL}/products/categories?per_page=100&hide_empty=false`, {
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
  if (!slugs.length) return [];
  const path: WcCategory[] = [];

  try {
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
        payment_method: "bacs",
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
    return data.payment_url || null;
  } catch (err) {
    console.error("Order creation failed", err);
    throw err;
  }
}
