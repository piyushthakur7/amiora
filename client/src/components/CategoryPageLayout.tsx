import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import { getProducts, getCategories, type WcCategory } from "@/lib/woocommerce";
import { ProductCard } from "@/components/ProductCard";
import { SidebarFilter } from "@/components/SidebarFilter";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types/Product";

export interface SubcategoryItem {
    name: string;
    slug: string; // full path e.g. /rings/bands
    image: string;
}

interface CategoryPageLayoutProps {
    title: string;
    description?: string;
    categorySlug: string; // Used to filter products e.g. 'rings'
    subcategories?: SubcategoryItem[];
}

export default function CategoryPageLayout({
    title,
    description,
    categorySlug,
    subcategories
}: CategoryPageLayoutProps) {

    // -- FILTER STATE --
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
    const [isPriceInitialized, setIsPriceInitialized] = useState(false);

    // -- DATA FETCHING --
    // Fetch products for THIS category
    const { data: categoryProducts = [], isLoading: isProductsLoading } = useQuery<Product[]>({
        queryKey: ["products", categorySlug],
        queryFn: () => getProducts({ category: categorySlug, per_page: 100 }), // Fetch more for better price range
    });

    // Fetch Categories for Sidebar
    const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery<WcCategory[]>({
        queryKey: ["categories-list"],
        queryFn: () => getCategories(),
    });

    // -- HELPER --
    const parsePrice = (priceStr: string) => {
        return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
    };

    // -- DERIVED DATA --

    // 1. Min/Max Price from FETCHED products
    const { minPrice, maxPrice } = useMemo(() => {
        if (!categoryProducts.length) return { minPrice: 0, maxPrice: 1000 };
        const prices = categoryProducts.map(p => parsePrice(p.price));
        return {
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices)
        };
    }, [categoryProducts]);

    // 2. Initialize Filter Range
    useEffect(() => {
        if (categoryProducts.length > 0 && !isPriceInitialized) {
            setPriceRange([minPrice, maxPrice]);
            setIsPriceInitialized(true);
        }
    }, [minPrice, maxPrice, categoryProducts.length, isPriceInitialized]);

    // Reset if category changes
    useEffect(() => {
        setIsPriceInitialized(false);
    }, [categorySlug]);

    // 3. Filter products by Price Range
    const filteredProducts = useMemo(() => {
        return categoryProducts.filter(p => {
            const price = parsePrice(p.price);
            return price >= priceRange[0] && price <= priceRange[1];
        });
    }, [categoryProducts, priceRange]);

    // 4. Sidebar Categories (Top level + Children)
    const sidebarCategories = useMemo(() => {
        if (!categoriesData) return [];
        return categoriesData
            .filter(c => c.parent === 0)
            .map(cat => {
                // Find subcategories for this parent
                const children = categoriesData
                    .filter(c => c.parent === cat.id)
                    .map(child => ({
                        name: child.name,
                        slug: child.slug,
                        count: child.count || 0
                    }));

                return {
                    name: cat.name,
                    slug: cat.slug,
                    count: cat.count || 0,
                    isActive: cat.slug === categorySlug,
                    children: children // Include children in the structure
                };
            });
    }, [categoriesData, categorySlug]);

    const isLoading = isProductsLoading || isCategoriesLoading;

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">

            {/* Page Heading */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4 font-serif text-primary">{title}</h1>
                {description && (
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {description}
                    </p>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                {/* SIDEBAR */}
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <SidebarFilter
                        categories={sidebarCategories}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        priceRange={priceRange}
                        onPriceChange={setPriceRange}
                    />
                </aside>

                {/* MAIN CONTENT */}
                <div className="flex-1">

                    {/* Subcategory Cards Grid */}
                    {subcategories && subcategories.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                            {subcategories.map((sub) => (
                                <Link key={sub.slug} href={sub.slug}>
                                    <div className="group cursor-pointer">
                                        <div className="relative overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-lg transition-all duration-300">
                                            <div className="aspect-[4/3] w-full overflow-hidden">
                                                <img
                                                    src={sub.image}
                                                    alt={sub.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="p-4 text-center">
                                                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                                                    {sub.name}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Product Grid Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-serif text-primary">All {title}</h2>
                        <div className="text-sm text-muted-foreground">
                            Showing {filteredProducts.length} results
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="space-y-4">
                                    <Skeleton className="aspect-square w-full rounded-md" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            ))
                        ) : filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-secondary/10 rounded-xl">
                                <p className="text-muted-foreground text-lg">
                                    No products found within this price range.
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
