import { useEffect, useState } from "react";

export function Preloader() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHide(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`fixed inset-0 
        bg-[#0F2A28] 
        flex items-center justify-center pt-4
        transition-opacity duration-700
        ${hide ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      style={{ zIndex: 9999 }}
    >
      <img
        src="https://github.com/piyushthakur7/bm-scrubber-images-/blob/main/Amiora-final-logo-01.png?raw=true"
        alt="Brand Logo"
        className="w-40 sm:w-48 md:w-56 lg:w-64 h-auto drop-shadow-[0_0_18px_rgba(255,215,160,0.35)]"
      />
    </div>
  );
}
