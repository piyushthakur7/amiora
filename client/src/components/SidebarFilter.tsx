import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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

    // New Filters States
    selectedMetals?: string[];
    onMetalChange?: (metal: string) => void;

    selectedPurities?: string[];
    onPurityChange?: (purity: string) => void;

    selectedGenders?: string[];
    onGenderChange?: (gender: string) => void;

    onFilterApply?: () => void;
}

const METALS = ["Gold", "Silver", "Platinum", "Rose Gold"];
const PURITIES = ["14k", "18k", "22k", "24k"];
const GENDERS = ["Women", "Men", "Kids", "Unisex"];
// const OCCASIONS = ["Daily Wear", "Party", "Wedding", "Gift"];

export function SidebarFilter({
    categories,
    minPrice,
    maxPrice,
    priceRange,
    onPriceChange,
    selectedMetals = [],
    onMetalChange,
    selectedPurities = [],
    onPurityChange,
    selectedGenders = [],
    onGenderChange,
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
                    step={1000}
                    onValueChange={(val) => onPriceChange([val[0], val[1]])}
                    className="my-6"
                />

                <div className="flex items-center justify-between">
                    <div className="text-sm text-foreground">
                        Price: <span className="font-medium">{formatPrice(priceRange[0])} — {formatPrice(priceRange[1])}</span>
                    </div>
                </div>
            </div>

            <div className="h-px bg-border my-6" />

            {/* Metal Filter */}
            <div className="space-y-4">
                <h3 className="font-serif text-lg font-medium text-foreground">Metal Type</h3>
                <div className="space-y-3">
                    {METALS.map((metal) => (
                        <div key={metal} className="flex items-center space-x-2">
                            <Checkbox
                                id={`metal-${metal}`}
                                checked={selectedMetals.includes(metal)}
                                onCheckedChange={() => onMetalChange && onMetalChange(metal)}
                            />
                            <label
                                htmlFor={`metal-${metal}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                                {metal}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-px bg-border my-6" />

            {/* Purity Filter */}
            <div className="space-y-4">
                <h3 className="font-serif text-lg font-medium text-foreground">Purity</h3>
                <div className="space-y-3">
                    {PURITIES.map((purity) => (
                        <div key={purity} className="flex items-center space-x-2">
                            <Checkbox
                                id={`purity-${purity}`}
                                checked={selectedPurities.includes(purity)}
                                onCheckedChange={() => onPurityChange && onPurityChange(purity)}
                            />
                            <label
                                htmlFor={`purity-${purity}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                                {purity}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-px bg-border my-6" />

            {/* Gender Filter */}
            <div className="space-y-4">
                <h3 className="font-serif text-lg font-medium text-foreground">Gender</h3>
                <div className="space-y-3">
                    {GENDERS.map((gender) => (
                        <div key={gender} className="flex items-center space-x-2">
                            <Checkbox
                                id={`gender-${gender}`}
                                checked={selectedGenders.includes(gender)}
                                onCheckedChange={() => onGenderChange && onGenderChange(gender)}
                            />
                            <label
                                htmlFor={`gender-${gender}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                                {gender}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {onFilterApply && (
                <div className="pt-6">
                    <Button
                        onClick={onFilterApply}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        Apply Filters
                    </Button>
                </div>
            )}
        </div>
    )
}

