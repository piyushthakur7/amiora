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

      {/* Bottom fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/25" />

      {/* Removed all text, headline, subtext, and button */}
      <div className="relative h-full flex items-center justify-center text-center px-6 z-10" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
    </section>
  );
}
