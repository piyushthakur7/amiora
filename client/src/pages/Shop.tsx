import { useLocation, useSearch } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/woocommerce";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/Product";
import { Preloader } from "@/components/Pre";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function Shop() {
  const [location, setLocation] = useLocation();
  const searchStr = useSearch();
  const params = new URLSearchParams(searchStr);
  const searchQuery = params.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(searchQuery);

  // Sync internal state with URL
  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: () => getProducts(),
  });

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

  // Filter products based on search
  const filteredProducts = products?.filter(p => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query) ||
      p.shortDescription?.toLowerCase().includes(query)
    );
  });

  if (isLoading) return <Preloader />;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-serif text-primary mb-2">
            {searchQuery ? `Results for "${searchQuery}"` : "Shop All Collection"}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts?.length} products found
          </p>
        </div>

        {/* Mobile-friendly inner search if needed */}
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

      {filteredProducts && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-xl font-medium mb-4">No products found</h2>
          <p className="text-muted-foreground mb-6">Try adjusting your search terms.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setLocation("/shop");
            }}
          >
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
}
