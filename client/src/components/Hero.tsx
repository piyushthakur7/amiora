import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Hero() {
  return (
    <section className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden">

      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://www.pexels.com/download/video/5106444/"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/80" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl animate-in fade-in duration-1000">
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Where Craft Meets Forever
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover timeless elegance in our curated collection of fine jewelry
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button
                size="lg"
                className="text-base px-8 py-6 backdrop-blur-sm"
                data-testid="button-explore-collection"
              >
                Explore Collection
              </Button>
            </Link>

            {/* <a
              href="https://www.pexels.com/video/elegant-diamond-ring-on-rustic-background-5106444/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium underline text-foreground hover:text-primary transition-colors"
            >
              Watch Video
            </a> */}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
