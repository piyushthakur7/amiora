import { useEffect, useState } from "react";

export function Preloader() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHide(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-white flex items-center justify-center transition-opacity duration-500 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ zIndex: 9999 }}
    >
      <img 
        src="https://github.com/piyushthakur7/bm-scrubber-images-/blob/main/Amiora-final-logo-01.png?raw=true" 
        alt="Brand Logo" 
        className="w-40 h-auto animate-pulse"
      />
    </div>
  );
}
