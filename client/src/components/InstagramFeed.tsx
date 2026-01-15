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
    <section className="py-24 overflow-hidden bg-[#FDFBF7]">
      <div className="container mx-auto px-4 text-center mb-12">
        <p className="text-[#B59863] font-sans uppercase tracking-[0.2em] text-sm mb-3">
          @AmioraDiamonds
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-[#003C32]">
          Follow our Journey
        </h2>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            "https://www.instagram.com/reel/DS9FCC7E3cK/embed",
            "https://www.instagram.com/reel/DSwnnKSkSu9/embed",
            "https://www.instagram.com/reel/DSwVtBSAVaC/embed",
            "https://www.instagram.com/reel/DSrJp5oE2zy/embed"
          ].map((url, i) => (
            <div key={i} className="aspect-[9/16] w-full rounded-xl overflow-hidden shadow-lg border border-[#e4d7b8]">
              <iframe
                src={url}
                className="w-full h-full object-cover"
                frameBorder="0"
                allowFullScreen
                scrolling="no"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" className="border-[#003C32] text-[#003C32] hover:bg-[#003C32] hover:text-white px-8 py-6 h-auto text-lg font-serif rounded-none tracking-wide">
          View Gallery
        </Button>
      </div>
    </section>
  );
}
