import { useEffect, useState } from "react";

export function Preloader() {
  const [hide, setHide] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content immediately
    setShowContent(true);

    // Hide preloader after animation completes
    const hideTimer = setTimeout(() => setHide(true), 2500);

    return () => clearTimeout(hideTimer);
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-150%) skewX(-20deg); }
            50% { transform: translateX(150%) skewX(-20deg); }
            100% { transform: translateX(150%) skewX(-20deg); }
          }
          .animate-shimmer {
            animation: shimmer 2.5s infinite;
          }
        `}
      </style>
      <div
        className={`fixed inset-0 
          bg-[#0A1817] 
          flex flex-col items-center justify-center
          transition-opacity duration-700 ease-in-out
          ${hide ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        style={{ zIndex: 9999 }}
      >
        {/* Logo Container with Shine Effect */}
        <div
          className={`relative overflow-hidden p-2 transition-all duration-1000 ease-out transform
            ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <img
            src="/images/Amiora-final-logo-02.png"
            alt="Amiora Diamonds"
            className="w-48 sm:w-64 md:w-80 h-auto object-contain drop-shadow-2xl"
          />

          {/* Shine Overlay */}
          <div
            className="absolute inset-0 pointer-events-none animate-shimmer"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 30%, rgba(200,164,106,0.6) 50%, rgba(255,255,255,0.1) 70%, transparent 100%)',
              mixBlendMode: 'overlay',
            }}
          />
        </div>
      </div>
    </>
  );
}
