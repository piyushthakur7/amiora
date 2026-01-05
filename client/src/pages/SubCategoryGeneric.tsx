import { useQuery } from "@tanstack/react-query";
import { getProductsByStrictCategory } from "@/lib/strict-api";
import { getProducts, getCategories, type WcCategory } from "@/lib/woocommerce";
import { ProductCard } from "@/components/ProductCard";
import { SidebarFilter } from "@/components/SidebarFilter";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types/Product";
import { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";

interface SubCategoryPageProps {
    parentSlug: string;
    childSlug: string;
    title: string;
}

export default function SubCategoryGeneric({ parentSlug, childSlug, title }: SubCategoryPageProps) {
    // State for filters
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
    const [isPriceInitialized, setIsPriceInitialized] = useState(false);

    // Fetch products for THIS subcategory
    const { data: products, isLoading: isProductsLoading } = useQuery<Product[]>({
        queryKey: ["products", parentSlug, childSlug],
        queryFn: () => getProductsByStrictCategory(parentSlug, childSlug),
    });

    // Fetch categories for sidebar
    const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery<WcCategory[]>({
        queryKey: ["categories-list"],
        queryFn: () => getCategories(),
    });

    const parsePrice = (priceStr: string) => {
        return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
    };

    // Calculate Min/Max Price from CURRENT products
    const { minPrice, maxPrice } = useMemo(() => {
        if (!products || !products.length) return { minPrice: 0, maxPrice: 1000 };
        const prices = products.map(p => parsePrice(p.price));
        return {
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices)
        };
    }, [products]);

    useEffect(() => {
        if (products && products.length > 0 && !isPriceInitialized) {
            setPriceRange([minPrice, maxPrice]);
            setIsPriceInitialized(true);
        }
    }, [minPrice, maxPrice, products, isPriceInitialized]);

    // Reset initialization when slugs change
    useEffect(() => {
        setIsPriceInitialized(false);
    }, [parentSlug, childSlug]);

    // Filter products by price
    const filteredProducts = useMemo(() => {
        if (!products) return [];
        return products.filter(p => {
            const price = parsePrice(p.price);
            return price >= priceRange[0] && price <= priceRange[1];
        });
    }, [products, priceRange]);

    // Sidebar Categories
    const sidebarCategories = useMemo(() => {
        if (!categoriesData) return [];
        return categoriesData
            .filter(c => c.parent === 0)
            .map(cat => {
                // Use API count if available
                return {
                    name: cat.name,
                    slug: cat.slug,
                    count: cat.count || 0,
                    isActive: cat.slug === parentSlug
                };
            });
    }, [categoriesData, parentSlug]);

    const isLoading = isProductsLoading || isCategoriesLoading;

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="mb-6 md:mb-10">
                <nav className="text-sm text-muted-foreground mb-4">
                    <Link href="/">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href={`/category/${parentSlug}`} className="hover:text-primary capitalize">{parentSlug.replace(/-/g, ' ')}</Link>
                    <span className="mx-2">/</span>
                    <span className="text-foreground capitalize">{title}</span>
                </nav>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <SidebarFilter
                        categories={sidebarCategories}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        priceRange={priceRange}
                        onPriceChange={setPriceRange}
                    />
                </aside>

                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-serif text-primary text-left bg-transparent p-0 mb-1 capitalize">
                                {title}
                            </h1>
                            <p className="text-sm text-muted-foreground capitalize">
                                {parentSlug.replace(/-/g, ' ')} Collection
                            </p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Showing {filteredProducts.length} results
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="space-y-4">
                                    <Skeleton className="aspect-square w-full rounded-md" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            ))
                        ) : filteredProducts && filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-secondary/10 rounded-xl">
                                <h3 className="text-xl font-medium mb-2">No products found</h3>
                                <p className="text-muted-foreground">
                                    We couldn't find any items explicitly tagged "{title}" in {parentSlug} within this price range.
                                </p>
                                <button
                                    onClick={() => setPriceRange([minPrice, maxPrice])}
                                    className="mt-4 text-primary hover:underline"
                                >
                                    Reset Filter
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
