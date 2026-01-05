import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"
import { cn } from "@/lib/utils"

interface SidebarFilterProps {
    categories: {
        name: string;
        slug: string;
        count: number;
        isActive?: boolean;
    }[];
    minPrice: number;
    maxPrice: number;
    priceRange: [number, number];
    onPriceChange: (value: [number, number]) => void;
    onFilterApply?: () => void;
}

export function SidebarFilter({
    categories,
    minPrice,
    maxPrice,
    priceRange,
    onPriceChange,
    onFilterApply,
}: SidebarFilterProps) {

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    }

    return (
        <div className="w-full space-y-8">
            {/* Categories Section */}
            <div className="space-y-4">
                <h3 className="font-serif text-xl font-medium text-foreground">Shop By Category</h3>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <Link key={category.slug} href={`/category/${category.slug}`}>
                            <div
                                className={cn(
                                    "flex items-center justify-between py-2 cursor-pointer group transition-colors",
                                    category.isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
                                )}
                            >
                                <span className="text-sm">{category.name}</span>
                                <span
                                    className={cn(
                                        "text-xs px-2 py-0.5 rounded-full border",
                                        category.isActive
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "bg-transparent border-muted-foreground/30 group-hover:border-primary/50"
                                    )}
                                >
                                    {category.count}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="h-px bg-border my-6" />

            {/* Price Filter Section */}
            <div className="space-y-6">
                <h3 className="font-serif text-xl font-medium text-foreground">Filter By Price</h3>

                <Slider
                    defaultValue={[minPrice, maxPrice]}
                    value={[priceRange[0], priceRange[1]]}
                    min={minPrice}
                    max={maxPrice}
                    step={100}
                    onValueChange={(val) => onPriceChange([val[0], val[1]])}
                    className="my-6"
                />

                <div className="flex items-center justify-between">
                    <div className="text-sm text-foreground">
                        Price: <span className="font-medium">{formatPrice(priceRange[0])} — {formatPrice(priceRange[1])}</span>
                    </div>
                    {onFilterApply && (
                        <Button
                            onClick={onFilterApply}
                            size="sm"
                            className="h-8 bg-amber-500 hover:bg-amber-600 text-white"
                        >
                            Filter
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
