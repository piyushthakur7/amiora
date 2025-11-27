import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">

      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/header.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Light global darkening */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Softer bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

      {/* Content container (empty) */}
      <div className="relative h-full flex items-center justify-center z-10" />

      {/* Bottom edge fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
    </section>
  );
}
