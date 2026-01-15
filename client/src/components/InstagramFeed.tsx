import { Instagram, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InstagramFeed() {
  // Using public stock video URLs for demo purposes since we don't have the specific local videos yet.
  // These simulate the "Reel" look - tall aspect ratio, looping, no controls.
  const videos = [
    "https://videos.pexels.com/video-files/5354512/5354512-hd_1080_1920_25fps.mp4", // Jewelry box handling
    "https://videos.pexels.com/video-files/3882963/3882963-hd_1080_1920_30fps.mp4", // Woman wearing ring
    "https://videos.pexels.com/video-files/6917684/6917684-hd_1080_1920_25fps.mp4", // Necklace closeup
    "https://videos.pexels.com/video-files/4058142/4058142-hd_1080_1920_30fps.mp4"  // Earrings
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {videos.map((src, i) => (
            <div key={i} className="relative aspect-[9/16] w-full rounded-xl overflow-hidden shadow-lg border border-[#e4d7b8] group">
              <video
                src={src}
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Optional overlay to make it look clickable/interactive */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" className="border-[#003C32] text-[#003C32] hover:bg-[#003C32] hover:text-white px-8 py-6 h-auto text-lg font-serif rounded-none tracking-wide">
          <Instagram className="mr-2 h-5 w-5" />
          Follow on Instagram
        </Button>
      </div>
    </section>
  );
}

