import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">

      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/header.mp4"
        autoPlay
        muted
        loop
        playsInline
      ></video>

      {/* Global vignette */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Gold ambience tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#C8A46A]/30 via-transparent to-transparent pointer-events-none" />

      {/* Bottom fade overlay for luxury depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/25" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-6 z-10">
        <div className="max-w-3xl animate-in fade-in duration-1000">

          {/* Headline with brand gold */}
          <h2
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight 
                       bg-gradient-to-r from-[#C8A46A] via-[#D8B77D] to-[#E8C88F] text-transparent bg-clip-text
                       drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)]"
          >
            Where Craft Meets Forever
          </h2>

          {/* Subtext – teal but readable */}
          <p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto 
                       text-[#1F4C46] font-medium
                       drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]"
          >
            Discover timeless elegance in our curated collection of fine jewelry
          </p>

          {/* Luxury button aligned with brand palette */}
          <Link href="/shop">
            <Button
              size="lg"
              className="text-base px-10 py-6 
                         border border-[#C8A46A]/60 
                         bg-white/10 backdrop-blur-sm text-white
                         hover:bg-[#C8A46A] hover:text-black
                         transition-all shadow-lg"
            >
              Explore Collection
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom fade for smooth section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
    </section>
  );
}
