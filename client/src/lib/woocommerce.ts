// client/src/lib/woocommerce.ts
import type { Product } from "@/types/Product";
import { products as localProducts } from "../data/products";
import categoriesData from "../data/categories.json";

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
   GET ALL PRODUCTS (MOCK)
------------------------------------------------- */
export async function getProducts(params: Record<string, any> = {}): Promise<Product[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filtered = [...localProducts];

  // Simple filtering (expand as needed)
  if (params.category) {
    filtered = filtered.filter(p =>
      p.categories?.some(c => c.id === params.category || c.slug === params.category)
    );
  }

  // Sorting
  if (params.orderby === 'price') {
    filtered.sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
      const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
      return params.order === 'desc' ? priceB - priceA : priceA - priceB;
    });
  }

  // Pagination (basic)
  if (params.limit) {
    filtered = filtered.slice(0, params.limit);
  }

  return filtered;
}

/* -------------------------------------------------
   GET SINGLE PRODUCT (MOCK)
------------------------------------------------- */
export async function getProduct(id: number): Promise<Product> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const product = localProducts.find(p => p.id === id);
  if (!product) throw new Error("Product not found");
  return product;
}

/* -------------------------------------------------
   GET ALL CATEGORIES (MOCK)
------------------------------------------------- */
export async function getCategories(): Promise<WcCategory[]> {
  await new Promise(resolve => setTimeout(resolve, 300));

  // Transform categories.json to WcCategory array
  const cats: WcCategory[] = [];
  let idCounter = 100;

  Object.entries(categoriesData).forEach(([slug, data]: [string, any]) => {
    const parentId = idCounter++;
    cats.push({
      id: parentId,
      name: data.name,
      slug: slug,
      parent: 0,
      image: { src: data.image }
    });

    if (data.subcategories) {
      data.subcategories.forEach((sub: any) => {
        cats.push({
          id: idCounter++,
          name: sub.name,
          slug: sub.slug,
          parent: parentId
        });
      });
    }
  });

  return cats;
}

/* -------------------------------------------------
   GET CATEGORY BY SLUG (MOCK)
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
  const categories = await getCategories();
  const parent = categories.find((c) => c.slug === slug);

  if (!parent) return [];

  return categories.filter((c) => c.parent === parent.id);
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
   GET PRODUCTS FOR CATEGORY SLUG (MOCK)
------------------------------------------------- */
export async function getProductsForCategoryPath(slug: string): Promise<Product[]> {
  const category = await getCategoryBySlug(slug);
  if (!category) return [];

  // In a real mock, we would filter by category ID or hierarchically
  // For now, just return all or random subset to show something
  return localProducts.filter(p => p.categories?.some(c => c.slug === slug || c.slug === category.slug));
}
