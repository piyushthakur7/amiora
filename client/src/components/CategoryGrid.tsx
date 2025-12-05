import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import categoriesData from "@/data/categories.json";

export function CategoryGrid() {
  const entries = Object.entries(categoriesData);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {entries.map(([slug, cat]) => (
            <Link key={slug} href={`/${slug}`}>
              <Card className="group overflow-hidden border-card-border hover-elevate transition-all duration-300 cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground text-center">
                        {cat.name}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
