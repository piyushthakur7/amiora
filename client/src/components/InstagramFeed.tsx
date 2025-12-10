import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InstagramFeed() {
  // Mock Instagram images
  const shots = [
    "/images/insta-1.jpg",
    "/images/insta-2.jpg",
    "/images/insta-3.jpg",
    "/images/insta-4.jpg",
  ];

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-12">
        <p className="text-gold font-sans uppercase tracking-[0.2em] text-sm mb-3">
          @AmioraDiamonds
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-primary">
          Follow our Journey
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 w-full">
        {shots.map((src, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden bg-secondary">
            {/* Since we don't have real images, we use placeholders or mock logic if available, 
                 but for refined look we'll use a grayscale tint that reveals color on hover if we had real images.
                 For now, let's assume valid placeholders. */}
            <img
              src={`https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3`} // Generic jewelry placeholder
              alt="Instagram shot"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Instagram className="text-white h-8 w-8 drop-shadow-lg" />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 h-auto text-lg font-serif">
          View Gallery
        </Button>
      </div>
    </section>
  );
}
