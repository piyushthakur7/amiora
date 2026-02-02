import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getCategories, type WcCategory } from "@/lib/woocommerce";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoryGrid() {
  const { data: categories = [], isLoading } = useQuery<WcCategory[]>({
    queryKey: ["component-category-grid"],
    queryFn: () => getCategories(),
  });

  // Filter only parent categories (parent === 0)
  const parentCategories = categories.filter(c => c.parent === 0);

  if (isLoading) {
    return (
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-center mb-4 text-primary">
            Collections
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-16">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-xl w-full" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="font-serif text-4xl md:text-5xl font-medium text-center mb-4 text-primary">
          Collections
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto font-sans tracking-wide">
          Explore our curated selections of fine jewelry, designed to celebrate life's most precious moments.
        </p>

        {/* Updated Grid: 5 columns on large screens for 'small and tidy' look */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {parentCategories.map((cat) => (
            <Link key={cat.slug} href={`/${cat.slug}`}>
              <div
                className="relative group overflow-hidden cursor-pointer aspect-square rounded-xl shadow-sm hover:shadow-lg transition-all"
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500 z-10" />

                <img
                  src={cat.image?.src || "/placeholder-image.jpg"}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
                  }}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-4 text-center">
                  <h3 className="font-serif text-lg md:text-xl text-white tracking-wide mb-2 opacity-95 group-hover:opacity-100 transition-opacity drop-shadow-md">
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
