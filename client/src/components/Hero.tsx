import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Diamond_ring_hero_image_34710d71.png";

export function Hero() {
  return (
    <section className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: 'center 40%'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80" />
      </div>

      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl animate-in fade-in duration-1000">
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Where Craft Meets Forever
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover timeless elegance in our curated collection of fine jewelry
          </p>
          <Link href="/shop">
            <Button
              size="lg"
              className="text-base px-8 py-6 backdrop-blur-sm"
              data-testid="button-explore-collection"
            >
              Explore Collection
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
