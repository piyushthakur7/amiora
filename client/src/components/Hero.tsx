import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      <video
        className="absolute inset-0 w-full h-full object-cover scale-110 animate-slowzoom"
        src="/header.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Cinematic depth - Darker overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />

      {/* Vignette for premium look */}
      <div className="absolute inset-0 pointer-events-none bg-black/20 mix-blend-multiply" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 drop-shadow-2xl opacity-0 animate-fade-in-up transition-all duration-1000 delay-300">
          Where Craft <br className="md:hidden" /> Meets Forever
        </h1>

        <p className="font-sans text-white/90 text-lg md:text-xl tracking-widest uppercase mb-10 max-w-2xl opacity-0 animate-fade-in-up transition-all duration-1000 delay-700">
          Timeless Elegance &bull; Modern Luxury &bull; Ethical Beauty
        </p>

        <div className="opacity-0 animate-fade-in-up transition-all duration-1000 delay-1000">
          <Link href="/shop">
            <Button
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/40 text-white font-serif text-xl px-10 py-8 rounded-none tracking-wider hover:scale-105 transition-all duration-500 hover:border-[#C8A46A] hover:text-[#C8A46A]"
            >
              Explore Collection
            </Button>
          </Link>
        </div>
      </div>

      {/* Soft gold bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0E2220] to-transparent" />

    </section>
  );
}
