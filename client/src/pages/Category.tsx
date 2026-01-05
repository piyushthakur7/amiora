import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import { getProducts, getCategories, type WcCategory } from "@/lib/woocommerce";
import { ProductCard } from "@/components/ProductCard";
import { SidebarFilter } from "@/components/SidebarFilter";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types/Product";

export default function Category() {
  const { slug } = useParams();

  // State for filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [isPriceInitialized, setIsPriceInitialized] = useState(false);

  // Fetch all products to calculate counts and global price range
  const { data: allProducts, isLoading: isProductsLoading } = useQuery<Product[]>({
    queryKey: ["products-all"],
    queryFn: () => getProducts(),
  });

  // Fetch categories for the sidebar list
  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery<WcCategory[]>({
    queryKey: ["categories-list"],
    queryFn: () => getCategories(),
  });

  // Helper to parse price
  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
  };

  // 1. Calculate min/max price for the ENTIRE collection (or current category? usually category)
  // The screenshot implies filtering within the view, but the category list allows switching.
  // Let's filter products by the current category slug first to determine the view.

  const categoryProducts = useMemo(() => {
    if (!allProducts || !slug) return [];
    return allProducts.filter(p => p.categories?.some(c => c.slug === slug));
  }, [allProducts, slug]);

  const { minPrice, maxPrice } = useMemo(() => {
    if (!categoryProducts.length) return { minPrice: 0, maxPrice: 1000 };
    const prices = categoryProducts.map(p => parsePrice(p.price));
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices)
    };
  }, [categoryProducts]);

  // Initialize price range once when data loads
  useEffect(() => {
    if (categoryProducts.length > 0 && !isPriceInitialized) {
      setPriceRange([minPrice, maxPrice]);
      setIsPriceInitialized(true);
    }
  }, [minPrice, maxPrice, categoryProducts.length, isPriceInitialized]);

  // Reset initialization when slug changes
  useEffect(() => {
    setIsPriceInitialized(false);
  }, [slug]);


  // 2. Prepare Sidebar Categories with counts based on ALL products
  const sidebarCategories = useMemo(() => {
    if (!categoriesData || !allProducts) return [];

    // We want top-level categories or siblings. 
    // The screenshot shows "Pendant Sets" (current) alongside "Bridal Sets", "Necklaces", etc.
    // Let's map over fetched categories and count products for each.

    return categoriesData
      .filter(c => c.parent === 0) // Assuming we only show top-level or relevant ones
      .map(cat => {
        const count = allProducts.filter(p => p.categories?.some(pc => pc.slug === cat.slug)).length;
        return {
          name: cat.name,
          slug: cat.slug,
          count: count,
          isActive: cat.slug === slug
        };
      });
  }, [categoriesData, allProducts, slug]);


  // 3. Filter products based on current price range
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter(p => {
      const price = parsePrice(p.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });
  }, [categoryProducts, priceRange]);


  useEffect(() => {
    document.title = `${slug} | Amiora Diamonds`;
  }, [slug]);

  const isLoading = isProductsLoading || isCategoriesLoading;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="mb-6 md:mb-10">
        <nav className="text-sm text-muted-foreground mb-4">
          <Link href="/">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground capitalize">{slug?.replace(/-/g, ' ')}</span>
        </nav>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <SidebarFilter
            categories={sidebarCategories}
            minPrice={minPrice}
            maxPrice={maxPrice}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
          />
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            {/* Header for Category */}
            {/* We can hide this if we want to match screenshot exactly which has no big header above grid, 
                 but it has "Home / Pendant Sets" and a toolbar "Show 9 / 12...". 
                 Let's keep it simple for now or adding a toolbar. */}
            <div>
              <h1 className="text-2xl font-serif text-primary capitalize hidden md:block">
                {slug?.replace(/-/g, ' ')}
              </h1>
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
