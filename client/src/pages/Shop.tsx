import { useLocation, useSearch } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories, type WcCategory } from "@/lib/woocommerce";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/Product";
import { SidebarFilter } from "@/components/SidebarFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

export default function Shop() {
  const [location, setLocation] = useLocation();
  const searchStr = useSearch();
  const params = new URLSearchParams(searchStr);
  const searchQuery = params.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [isPriceInitialized, setIsPriceInitialized] = useState(false);

  // Sync internal state with URL
  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  const { data: allProducts, isLoading: isProductsLoading } = useQuery<Product[]>({
    queryKey: ["products-all-shop"],
    queryFn: () => getProducts(),
  });

  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery<WcCategory[]>({
    queryKey: ["categories-list"],
    queryFn: () => getCategories(),
  });

  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
  };

  // 1. Filter by Search Query first
  const searchedProducts = useMemo(() => {
    if (!allProducts) return [];
    if (!searchQuery) return allProducts;

    const query = searchQuery.toLowerCase();
    return allProducts.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query) ||
      p.shortDescription?.toLowerCase().includes(query)
    );
  }, [allProducts, searchQuery]);

  // 2. Calculate Min/Max Price from searched products
  const { minPrice, maxPrice } = useMemo(() => {
    if (!searchedProducts.length) return { minPrice: 0, maxPrice: 1000 };
    const prices = searchedProducts.map(p => parsePrice(p.price));
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices)
    };
  }, [searchedProducts]);

  useEffect(() => {
    if (searchedProducts.length > 0 && !isPriceInitialized) {
      setPriceRange([minPrice, maxPrice]);
      setIsPriceInitialized(true);
    }
  }, [minPrice, maxPrice, searchedProducts.length, isPriceInitialized]);

  // 3. Filter by Price
  const filteredProducts = useMemo(() => {
    return searchedProducts.filter(p => {
      const price = parsePrice(p.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });
  }, [searchedProducts, priceRange]);

  // 4. Sidebar Categories (Top level)
  const sidebarCategories = useMemo(() => {
    if (!categoriesData || !allProducts) return [];

    return categoriesData
      .filter(c => c.parent === 0)
      .map(cat => {
        const count = allProducts.filter(p => p.categories?.some(pc => pc.slug === cat.slug)).length;
        return {
          name: cat.name,
          slug: cat.slug,
          count: count,
          isActive: false
        };
      });
  }, [categoriesData, allProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchStr);
    if (searchTerm) {
      newParams.set("search", searchTerm);
    } else {
      newParams.delete("search");
    }
    setLocation(`/shop?${newParams.toString()}`);
  };

  const isLoading = isProductsLoading || isCategoriesLoading;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-serif text-primary mb-2">
            {searchQuery ? `Results for "${searchQuery}"` : "Shop All Collection"}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts?.length} products found
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative w-full md:w-80">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="pl-10 rounded-full border-gold/30 focus-visible:ring-gold"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </form>
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
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square w-full rounded-md" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-xl font-medium mb-4">No products found</h2>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms.</p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setLocation("/shop");
                    setPriceRange([0, 1000000]); // Reset to wide range, relying on useEffect to clamp
                  }}
                >
                  Clear Search & Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
