import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import ringImage from "@assets/generated_images/Diamond_ring_hero_image_34710d71.png";
import necklaceImage from "@assets/generated_images/Gold_necklace_product_12d0663a.png";
import earringsImage from "@assets/generated_images/Diamond_earrings_product_c3def0c1.png";
import braceletImage from "@assets/generated_images/Rose_gold_bracelet_781a6a9b.png";
import bridalImage from "@assets/generated_images/Bridal_jewelry_collection_67832531.png";
import mensImage from "@assets/generated_images/Men's_wedding_band_96c51b11.png";

const categories = [
  { name: "Rings", slug: "rings", image: ringImage },
  { name: "Neckwear", slug: "neckwear", image: necklaceImage },
  { name: "Earrings", slug: "earrings", image: earringsImage },
  { name: "Wristwear", slug: "wristwear", image: braceletImage },
  { name: "Bridal", slug: "bridal", image: bridalImage },
  { name: "Men's Jewelry", slug: "mens-jewelry", image: mensImage },
];

export function CategoryGrid() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
          Shop by Category
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <Card className="group overflow-hidden border-card-border hover-elevate transition-all duration-300" data-testid={`card-category-${category.slug}`}>
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground text-center">
                        {category.name}
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
