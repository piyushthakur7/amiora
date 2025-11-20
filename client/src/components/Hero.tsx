import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">

      {/* Background image (sharp, no blur) */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="https://images.pexels.com/photos/3266703/pexels-photo-3266703.jpeg"
        alt="Luxury diamond ring"
        loading="lazy"
      />

      {/* Soft vignette to keep edges elegant */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Gold tinted gradient from bottom (brand-driven focus) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#C8A46A]/40 via-transparent to-transparent pointer-events-none" />

      {/* Subtle text-specific shadow layer (not global blur) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-6 z-10">
        <div className="max-w-3xl animate-in fade-in duration-1000">

          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            Where Craft Meets Forever
          </h2>

          <p className="text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            Discover timeless elegance in our curated collection of fine jewelry
          </p>

          <Link href="/shop">
            <Button
              size="lg"
              className="text-base px-10 py-6 bg-white/20 border border-white/50 text-white 
                         hover:bg-white hover:text-black transition-all shadow-xl backdrop-blur-[1px]"
            >
              Explore Collection
            </Button>
          </Link>

        </div>
      </div>

      {/* Fade to bottom section for clean transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
    </section>
  );
}
