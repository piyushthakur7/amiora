import { useQuery } from "@tanstack/react-query";
import { getProductsByStrictCategory } from "@/lib/strict-api";
import { ProductCard } from "@/components/ProductCard";
import { Preloader } from "@/components/Pre";
import { Product } from "@/types/Product";

interface SubCategoryPageProps {
    parentSlug: string;
    childSlug: string;
    title: string;
}

export default function SubCategoryGeneric({ parentSlug, childSlug, title }: SubCategoryPageProps) {
    const { data: products, isLoading } = useQuery<Product[]>({
        queryKey: ["products", parentSlug, childSlug],
        queryFn: () => getProductsByStrictCategory(parentSlug, childSlug),
    });

    if (isLoading) return <Preloader />;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="font-serif text-3xl md:text-4xl text-primary text-center mb-2 capitalize">
                {title}
            </h1>
            <p className="text-center text-muted-foreground mb-10 capitalize">
                {parentSlug.replace(/-/g, ' ')} Collection
            </p>

            {products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-secondary/10 rounded-xl">
                    <h3 className="text-xl font-medium mb-2">No products found</h3>
                    <p className="text-muted-foreground">
                        We couldn't find any items explicitly tagged "{title}" in {parentSlug}.
                    </p>
                </div>
            )}
        </div>
    );
}
