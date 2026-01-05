import { getProducts, getCategoryBySlug } from "./woocommerce";
import type { Product } from "@/types/Product";

/* -------------------------------------------------
   GET PRODUCTS BY STRICT CATEGORY (Real API)
------------------------------------------------- */
export async function getProductsByStrictCategory(parentSlug: string, childSlug: string): Promise<Product[]> {
    console.log(`[StrictAPI] Fetching products for: ${parentSlug} > ${childSlug}`);

    if (!childSlug) return [];

    // 1. Resolve Child Slug to ID
    // We assume the child slug is the specific one we want products for.
    const category = await getCategoryBySlug(childSlug);

    if (!category) {
        console.warn(`[StrictAPI] Category not found: ${childSlug}`);
        return [];
    }

    // 2. Fetch Products by Category ID
    return getProducts({ category: category.id });
}
