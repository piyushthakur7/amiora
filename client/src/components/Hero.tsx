import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      <video
        className="absolute inset-0 w-full h-full object-cover scale-105 animate-slowzoom brightness-110 saturate-125 contrast-110"
        src="/header.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Cinematic depth - Lighter gradient to show video clearly but keep text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />

      {/* Subtle Gold Glamour Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#C8A46A]/20 via-transparent to-[#C8A46A]/10 mix-blend-overlay pointer-events-none" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">

        <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl text-white mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] opacity-0 animate-fade-in-up transition-all duration-1000 delay-300 tracking-tight">
          Where Craft <br className="md:hidden" /> Meets Forever
        </h1>

        <p className="font-sans text-white text-lg md:text-2xl tracking-[0.25em] uppercase mb-12 max-w-3xl opacity-0 animate-fade-in-up transition-all duration-1000 delay-700 drop-shadow-md font-light">
          Timeless Elegance &bull; Modern Luxury &bull; Ethical Beauty
        </p>

        <div className="opacity-0 animate-fade-in-up transition-all duration-1000 delay-1000">
          <Link href="/shop">
            <Button
              className="bg-white/10 hover:bg-[#C8A46A] hover:text-white backdrop-blur-sm border border-white/60 text-white font-serif text-xl px-12 py-8 rounded-none tracking-widest hover:scale-105 transition-all duration-500 hover:border-[#C8A46A] shadow-[0_0_40px_rgba(200,164,106,0.3)] hover:shadow-[0_0_60px_rgba(200,164,106,0.6)]"
            >
              EXPLORE COLLECTION
            </Button>
          </Link>
        </div>
      </div>

      {/* Soft dark bottom fade to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0E2220] via-[#0E2220]/60 to-transparent" />

    </section>
  );
}
