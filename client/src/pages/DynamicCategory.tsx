import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getCategoryBySlug, getSubcategories, getProducts, WcCategory } from "@/lib/woocommerce";
import { Product } from "@/types/Product";
import CategoryPageLayout, { SubcategoryItem } from "@/components/CategoryPageLayout";
import SubCategoryGeneric from "./SubCategoryGeneric";

// Wrapper to determine if we are showing a Parent Category (with sub-cards) OR a Subcategory view
export default function DynamicCategoryWrapper() {
    // We need to match /:slug OR /:parent/:child
    // Wouter matching is tricky for catch-alls in one component if not defined in Switch.
    // But here we are likely instantiated by the router for a specific path pattern.

    // Actually, we'll use this component for the /:categorySlug route.
    // For /:parent/:child, we might use the same or a different one.
    // Let's assume this handles the TOP LEVEL category (e.g. /rings).

    const [match, params] = useRoute("/:slug");
    const slug = match ? params!.slug : "";

    const { data: category, isLoading: isCatLoading } = useQuery({
        queryKey: ["category", slug],
        queryFn: () => getCategoryBySlug(slug),
        enabled: !!slug
    });

    const { data: subcategories = [], isLoading: isSubLoading } = useQuery({
        queryKey: ["subcategories", category?.id],
        queryFn: () => category ? getSubcategories(category.id) : [],
        enabled: !!category
    });

    if (isCatLoading || isSubLoading) {
        return <div className="text-center py-20">Loading Category...</div>;
    }

    if (!category) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">Category Not Found</h1>
                <p>We couldn't find the category "{slug}".</p>
            </div>
        );
    }

    // Transform WC Categories to SubcategoryItem for the layout
    const subcategoryItems: SubcategoryItem[] = subcategories.map(sub => ({
        name: sub.name,
        slug: `/${category.slug}/${sub.slug}`, // Construct full URL: /parent/child
        image: sub.image?.src || "https://placehold.co/400x400?text=No+Image" // Fallback
    }));

    return (
        <CategoryPageLayout
            title={category.name}
            description={category.description || `Explore our collection of ${category.name}`}
            categorySlug={category.slug}
            subcategories={subcategoryItems}
        />
    );
}
