import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "wouter"
import { cn } from "@/lib/utils"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

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
        <div className="w-full space-y-4">
            {/* Categories Section (Always Visible) */}
            <div className="pb-4 border-b border-border/50">
                <h3 className="font-serif text-xl font-medium text-foreground mb-4">Shop By Category</h3>
                <div className="space-y-1">
                    {categories.map((category) => (
                        <Link key={category.slug} href={`/category/${category.slug}`}>
                            <div
                                className={cn(
                                    "flex items-center justify-between py-2 px-2 rounded-md cursor-pointer transition-all",
                                    category.isActive
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                )}
                            >
                                <span className="text-sm">{category.name}</span>
                                <span className="text-xs opacity-60">({category.count})</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Accordion Filters */}
            <Accordion type="multiple" defaultValue={['price', 'metal']} className="w-full">

                {/* Price Filter */}
                <AccordionItem value="price" className="border-border/50">
                    <AccordionTrigger className="text-lg font-serif">Price Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="px-1 pt-2 pb-4">
                            <Slider
                                defaultValue={[minPrice, maxPrice]}
                                value={[priceRange[0], priceRange[1]]}
                                min={minPrice}
                                max={maxPrice}
                                step={1000}
                                onValueChange={(val) => onPriceChange([val[0], val[1]])}
                                className="my-6"
                            />
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Range:</span>
                                <span className="font-medium text-primary">
                                    {formatPrice(priceRange[0])} — {formatPrice(priceRange[1])}
                                </span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Metal Filter */}
                <AccordionItem value="metal" className="border-border/50">
                    <AccordionTrigger className="text-lg font-serif">Metal Type</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-2">
                            {METALS.map((metal) => (
                                <div key={metal} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`metal-${metal}`}
                                        checked={selectedMetals.includes(metal)}
                                        onCheckedChange={() => onMetalChange && onMetalChange(metal)}
                                        className="border-muted-foreground/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
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
                    </AccordionContent>
                </AccordionItem>

                {/* Purity Filter */}
                <AccordionItem value="purity" className="border-border/50">
                    <AccordionTrigger className="text-lg font-serif">Purity</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-2">
                            {PURITIES.map((purity) => (
                                <div key={purity} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`purity-${purity}`}
                                        checked={selectedPurities.includes(purity)}
                                        onCheckedChange={() => onPurityChange && onPurityChange(purity)}
                                        className="border-muted-foreground/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
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
                    </AccordionContent>
                </AccordionItem>

                {/* Gender Filter */}
                <AccordionItem value="gender" className="border-border/50">
                    <AccordionTrigger className="text-lg font-serif">Gender</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-2">
                            {GENDERS.map((gender) => (
                                <div key={gender} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`gender-${gender}`}
                                        checked={selectedGenders.includes(gender)}
                                        onCheckedChange={() => onGenderChange && onGenderChange(gender)}
                                        className="border-muted-foreground/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
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
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {onFilterApply && (
                <div className="pt-6">
                    <Button
                        onClick={onFilterApply}
                        className="w-full bg-[#0E2220] text-white hover:bg-[#1a3b38] py-6 text-lg font-serif tracking-wide shadow-md hover:shadow-lg transition-all"
                    >
                        Apply Filters
                    </Button>
                </div>
            )}
        </div>
    )
}
