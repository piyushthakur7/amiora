import { Link } from "wouter";
import { useState } from "react";
import categories from "@/data/categories.json";
import { cn } from "@/lib/utils";

export function CategoryRail() {
    const categoryList = Object.entries(categories).map(([slug, data]) => ({
        slug,
        ...data,
    }));

    return (
        <div className="w-full bg-background border-b border-gold/10 overflow-hidden">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-start justify-start gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
                    {categoryList.map((category) => (
                        <Link key={category.slug} href={`/${category.slug === 'rings' ? 'rings' : category.slug}`}>
                            <div className="flex flex-col items-center gap-3 min-w-[80px] md:min-w-[100px] cursor-pointer group snap-start">
                                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full p-1 border border-transparent group-hover:border-gold transition-all duration-300">
                                    <div className="w-full h-full rounded-full overflow-hidden bg-secondary relative">
                                        <ImageWithFallback
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                                <span className="text-sm font-serif text-center font-medium text-primary group-hover:text-gold transition-colors whitespace-nowrap">
                                    {category.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ImageWithFallback({ src, alt, className }: { src: string; alt: string; className?: string }) {
    const [error, setError] = useState(false);

    // Fallback image (elegant placeholder)
    const fallbackSrc = "https://images.unsplash.com/photo-1573408301185-a1d3106839b9?q=80&w=300&auto=format&fit=crop";

    return (
        <img
            src={error ? fallbackSrc : src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            loading="lazy"
        />
    );
}
