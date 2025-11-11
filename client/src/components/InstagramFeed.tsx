import { Card, CardContent } from "@/components/ui/card";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import ringImage from "@assets/generated_images/Diamond_ring_hero_image_34710d71.png";
import necklaceImage from "@assets/generated_images/Gold_necklace_product_12d0663a.png";
import earringsImage from "@assets/generated_images/Diamond_earrings_product_c3def0c1.png";
import braceletImage from "@assets/generated_images/Rose_gold_bracelet_781a6a9b.png";
import bridalImage from "@assets/generated_images/Bridal_jewelry_collection_67832531.png";
import mensImage from "@assets/generated_images/Men's_wedding_band_96c51b11.png";

const instagramPosts = [
  { id: 1, image: ringImage, alt: "Diamond ring detail" },
  { id: 2, image: necklaceImage, alt: "Gold necklace styling" },
  { id: 3, image: earringsImage, alt: "Diamond earrings close-up" },
  { id: 4, image: braceletImage, alt: "Rose gold bracelet" },
  { id: 5, image: bridalImage, alt: "Bridal jewelry set" },
  { id: 6, image: mensImage, alt: "Men's wedding band" }
];

export function InstagramFeed() {
  return (
    <section className="py-16 md:py-24 bg-accent/20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Instagram className="h-6 w-6 text-primary" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Follow @AmioraDiamonds
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our community and get inspired by our latest designs, customer stories, and jewelry styling tips
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <Card
              key={post.id}
              className="group overflow-hidden border-card-border cursor-pointer hover-elevate transition-all duration-300"
              data-testid={`instagram-post-${post.id}`}
            >
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300 flex items-center justify-center">
                    <Instagram className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg" data-testid="button-follow-instagram">
            <Instagram className="h-4 w-4 mr-2" />
            Follow on Instagram
          </Button>
        </div>
      </div>
    </section>
  );
}
