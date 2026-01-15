import { useEffect, useState } from "react";

export function Preloader() {
  const [hide, setHide] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after brief delay
    const contentTimer = setTimeout(() => setShowContent(true), 100);

    // Hide preloader after animation completes
    const hideTimer = setTimeout(() => setHide(true), 2500);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 
        bg-[#0F2A28] 
        flex flex-col items-center justify-center gap-6
        transition-opacity duration-700
        ${hide ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      style={{ zIndex: 9999 }}
    >
      {/* Logo with fade and scale animation */}
      <div className={`transition-all duration-1000 ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
        <img
          src="https://github.com/piyushthakur7/bm-scrubber-images-/blob/main/Amiora-final-logo-01.png?raw=true"
          alt="Brand Logo"
          className="w-32 sm:w-40 md:w-48 h-auto drop-shadow-[0_0_20px_rgba(200,164,106,0.4)]"
        />
      </div>

      {/* Animated text */}
      <div className="flex gap-1 overflow-hidden">
        {["A", "M", "I", "O", "R", "A"].map((letter, index) => (
          <span
            key={index}
            className={`font-serif text-3xl md:text-4xl tracking-[0.3em] text-[#C8A46A] transition-all duration-500`}
            style={{
              opacity: showContent ? 1 : 0,
              transform: showContent ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${index * 100 + 300}ms`
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Subtitle */}
      <div
        className={`font-sans text-xs md:text-sm tracking-[0.4em] text-[#C8A46A]/60 uppercase transition-all duration-700`}
        style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? "translateY(0)" : "translateY(10px)",
          transitionDelay: "900ms"
        }}
      >
        DIAMONDS
      </div>
    </div>
  );
}
