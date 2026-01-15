import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import categoriesData from "@/data/categories.json";

export function CategoryGrid() {
  const entries = Object.entries(categoriesData);

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="font-serif text-4xl md:text-5xl font-medium text-center mb-4 text-primary">
          Collections
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto font-sans tracking-wide">
          Explore our curated selections of fine jewelry, designed to celebrate life's most precious moments.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {entries.map(([slug, cat]) => (
            <Link key={slug} href={`/${slug}`}>
              <div
                className="relative group overflow-hidden cursor-pointer aspect-[3/4] rounded-lg shadow-md hover:shadow-xl transition-all"
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500 z-10" />

                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
                  }}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-4 text-center">
                  <h3 className="font-serif text-xl md:text-2xl text-white tracking-wide mb-2 opacity-95 group-hover:opacity-100 transition-opacity drop-shadow-md">
                    {cat.name}
                  </h3>
                  <span className="text-white/90 font-sans tracking-widest text-xs uppercase opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border-b border-white/60 pb-1">
                    Explore
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
