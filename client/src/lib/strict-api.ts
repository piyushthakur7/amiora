/* -------------------------------------------------
   GET PRODUCTS BY STRICT CATEGORY (Mock Logic)
   Validates PARENT and CHILD slugs against product categories
------------------------------------------------- */
export async function getProductsByStrictCategory(parentSlug: string, childSlug: string): Promise<Product[]> {
    // Simulate network
    await new Promise(resolve => setTimeout(resolve, 300));

    console.log(`[MockAPI] Fetching products for: ${parentSlug} > ${childSlug}`);

    // 1. Validate inputs
    if (!parentSlug || !childSlug) {
        console.error("[MockAPI] Missing category slugs");
        return [];
    }

    // 2. Filter Products
    const filtered = localProducts.filter(product => {
        // Check if product has ANY category matching the parent slug
        const hasParent = product.categories?.some(c => c.slug === parentSlug.toLowerCase());

        // Check if product has ANY category matching the child slug
        // Note: Data might user 'tag' or 'slug' or just 'name'. 
        // We will check slug and name for robustness in this mock.
        const hasChild = product.categories?.some(c =>
            c.slug === childSlug.toLowerCase() ||
            c.name.toLowerCase().replace(/\s+/g, '-') === childSlug.toLowerCase()
        );

        // 3. Strict match: MUST have both
        return hasParent && hasChild;
    });

    return filtered;
}
