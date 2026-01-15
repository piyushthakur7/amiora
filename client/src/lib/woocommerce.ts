import type { Product } from "@/types/Product";
import categoriesData from "@/data/categories.json";

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
   DUMMY DATA HELPERS
------------------------------------------------- */
const DUMMY_PRODUCTS: Product[] = [
  {
    id: 99999,
    name: "Classic Diamond Solitaire Ring",
    slug: "classic-diamond-solitaire-ring",
    price: "45000",
    regularPrice: "50000",
    onSale: true,
    images: [
      { src: "https://images.unsplash.com/photo-1605100804763-ebea24ea3391?auto=format&fit=crop&q=80&w=800", alt: "Diamond Ring" }
    ],
    description: "A stunning piece of jewelry crafted with precision.",
    shortDescription: "Elegant and timeless.",
    sku: "DUMMY-001",
    categories: [{ id: 101, name: "Rings", slug: "rings" }]
  },
  {
    id: 99998,
    name: "Gold Plated Necklace",
    slug: "gold-necklace",
    price: "12000",
    regularPrice: "15000",
    onSale: false,
    images: [
      { src: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=800", alt: "Necklace" }
    ],
    description: "Beautiful gold plated necklace.",
    shortDescription: "Perfect for daily wear.",
    sku: "DUMMY-002",
    categories: [{ id: 105, name: "Necklaces", slug: "necklaces" }]
  },
  {
    id: 99997,
    name: "Elegant Drop Earrings",
    slug: "elegant-drop-earrings",
    price: "25000",
    images: [
      { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800", alt: "Earrings" }
    ],
    description: "Sophisticated drop earrings.",
    shortDescription: "Add a touch of class.",
    sku: "DUMMY-003",
    categories: [{ id: 102, name: "Earrings", slug: "earrings" }]
  }
];

// Transform categories.json into a flat list of WcCategory
const getLocalCategories = (): WcCategory[] => {
  const cats: WcCategory[] = [];
  let pIdCounter = 1000;

  Object.entries(categoriesData).forEach(([slug, data]) => {
    const parentId = pIdCounter++;

    // Parent
    cats.push({
      id: parentId,
      name: data.name,
      slug: slug,
      parent: 0,
      description: data.name + " Collection",
      image: { src: data.image || "" }
    });

    // Children
    if (data.subcategories) {
      data.subcategories.forEach((sub: any, idx: number) => {
        cats.push({
          id: parentId * 100 + idx,
          name: sub.name,
          slug: sub.slug,
          parent: parentId,
          description: sub.name,
          // Use parent image or placeholder if specific image missing, or rotate dummy images
          image: { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500" }
        });
      });
    }
  });

  return cats;
};

/* -------------------------------------------------
   GET ALL PRODUCTS
------------------------------------------------- */
export async function getProducts(params: Record<string, any> = {}): Promise<Product[]> {
  // Always return dummy products
  return DUMMY_PRODUCTS;

  /* 
  // REAL API IMPLEMENTATION (Preserved for future)
  const query = new URLSearchParams({
    per_page: "50", 
    status: "publish",
    ...params,
  });

  if (params.category && typeof params.category === "string" && isNaN(Number(params.category))) {
    const cat = await getCategoryBySlug(params.category);
    if (cat) {
      query.set("category", cat.id.toString());
    } else {
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
  */
}

/* -------------------------------------------------
   GET SINGLE PRODUCT
------------------------------------------------- */
export async function getProduct(id: number): Promise<Product> {
  const dummy = DUMMY_PRODUCTS.find(p => p.id === id);
  if (dummy) return dummy;

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
  return getLocalCategories();

  /*
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
  */
}

/* -------------------------------------------------
   GET CATEGORY BY SLUG
------------------------------------------------- */
export async function getCategoryBySlug(slug: string): Promise<WcCategory | null> {
  const cats = getLocalCategories();
  const matched = cats.find(c => c.slug === slug);
  return matched || null;
}

/* -------------------------------------------------
   GET SUBCATEGORIES (BY PARENT ID)
------------------------------------------------- */
export async function getSubcategories(parentId: number): Promise<WcCategory[]> {
  const cats = getLocalCategories();
  return cats.filter(c => c.parent === parentId);
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
