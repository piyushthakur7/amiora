import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">

      <video
        className="absolute inset-0 w-full h-full object-cover scale-110 animate-slowzoom"
        src="/header.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Cinematic depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />

      {/* Vignette for premium look */}
      <div className="absolute inset-0 pointer-events-none bg-black/20 mix-blend-multiply" />

      {/* Soft gold bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#C8A46A]/20 to-transparent" />

      {/* Light sheen overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 mix-blend-overlay" />

    </section>
  );
}
