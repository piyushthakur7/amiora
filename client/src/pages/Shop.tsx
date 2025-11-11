import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/woocommerce";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Product } from "@shared/schema";

export default function Shop() {
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [priceRange, setPriceRange] = useState<[number]>([500000]);
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [selectedStones, setSelectedStones] = useState<string[]>([]);

  const { data: allProducts, isLoading } = useQuery({
    queryKey: ['/api/products'],
    queryFn: () => fetchProducts({ perPage: 100 })
  });

  useEffect(() => {
    document.title = "Shop All Jewellery | Amiora Diamonds";
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    if (!allProducts) return [];
    
    let filtered = [...allProducts];

    const maxPrice = priceRange[0];
    filtered = filtered.filter(product => {
      const price = parseFloat(product.price.replace(/[₹,]/g, ''));
      return price <= maxPrice;
    });

    if (selectedMetals.length > 0 || selectedStones.length > 0) {
      filtered = filtered.filter(product => {
        const hasMatchingMetal = selectedMetals.length === 0 || product.attributes?.some(
          attr => attr.name === "Metal" && attr.options.some(opt => selectedMetals.includes(opt))
        );
        const hasMatchingStone = selectedStones.length === 0 || product.attributes?.some(
          attr => attr.name === "Stone" && attr.options.some(opt => selectedStones.includes(opt))
        );
        return hasMatchingMetal && hasMatchingStone;
      });
    }

    filtered.sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[₹,]/g, ''));
      const priceB = parseFloat(b.price.replace(/[₹,]/g, ''));
      
      switch (sortBy) {
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'date':
          return b.id - a.id;
        default:
          return 0;
      }
    });

    return filtered;
  }, [allProducts, priceRange, selectedMetals, selectedStones, sortBy]);

  const products = filteredAndSortedProducts;

  const metals = ["Gold", "White Gold", "Rose Gold", "Platinum", "Silver"];
  const stones = ["Diamond", "Emerald", "Ruby", "Sapphire", "Pearl"];

  const toggleFilter = (value: string, filters: string[], setFilters: (v: string[]) => void) => {
    if (filters.includes(value)) {
      setFilters(filters.filter(f => f !== value));
    } else {
      setFilters([...filters, value]);
    }
  };

  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4">Sort By</h3>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger data-testid="select-sort">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="date">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={500000}
          step={10000}
          className="mb-2"
          data-testid="slider-price"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹0</span>
          <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Metal</h3>
        <div className="space-y-3">
          {metals.map((metal) => (
            <div key={metal} className="flex items-center gap-2">
              <Checkbox
                id={`metal-${metal}`}
                checked={selectedMetals.includes(metal)}
                onCheckedChange={() => toggleFilter(metal, selectedMetals, setSelectedMetals)}
                data-testid={`checkbox-metal-${metal.toLowerCase().replace(' ', '-')}`}
              />
              <Label htmlFor={`metal-${metal}`} className="cursor-pointer">
                {metal}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Stone</h3>
        <div className="space-y-3">
          {stones.map((stone) => (
            <div key={stone} className="flex items-center gap-2">
              <Checkbox
                id={`stone-${stone}`}
                checked={selectedStones.includes(stone)}
                onCheckedChange={() => toggleFilter(stone, selectedStones, setSelectedStones)}
                data-testid={`checkbox-stone-${stone.toLowerCase()}`}
              />
              <Label htmlFor={`stone-${stone}`} className="cursor-pointer">
                {stone}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setPriceRange([500000]);
          setSelectedMetals([]);
          setSelectedStones([]);
        }}
        data-testid="button-clear-filters"
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
          All Jewellery
        </h1>
        <p className="text-muted-foreground">
          Explore our complete collection of handcrafted fine jewelry
        </p>
      </div>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <FilterContent />
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              {products?.length || 0} products
            </p>

            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="sm" data-testid="button-filters-mobile">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            ) : (
              products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>

          {!isLoading && products && products.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No products found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
