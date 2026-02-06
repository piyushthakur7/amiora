import { Instagram, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

// Local video files - place your reel videos in client/public/videos/
// Name them: reel1.mp4, reel2.mp4, reel3.mp4, reel4.mp4
const reelVideos = [
  { src: "/videos/reel1.mp4", link: "https://www.instagram.com/reel/DUFh9LRgYZJ/" },
  { src: "/videos/reel2.mp4", link: "https://www.instagram.com/reel/DT9gZdFE-zn/" },
  { src: "/videos/reel3.mp4", link: "https://www.instagram.com/reel/DT2xoRmE5Zm/" },
  { src: "/videos/reel4.mp4", link: "https://www.instagram.com/reel/DTnDLv9E82L/" }
];

function VideoCard({ src, link }: { src: string; link: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden shadow-xl border border-gold/20 group cursor-pointer">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        onClick={togglePlay}
      />

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      {/* Play/Pause indicator when paused */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Play className="w-16 h-16 text-white fill-white" />
        </div>
      )}

      {/* Instagram link overlay on hover */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <Instagram className="w-5 h-5" />
        <span>View on Instagram</span>
      </a>
    </div>
  );
}

export function InstagramFeed() {
  return (
    <section className="py-24 overflow-hidden bg-[#FDFBF7]">
      <div className="container mx-auto px-4 text-center mb-12">
        <span className="text-gold font-sans uppercase tracking-[0.2em] text-xs font-bold mb-3 block">
          ✨ @AmioraDiamonds
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-primary">
          Follow our Journey
        </h2>
        <p className="text-muted-foreground font-serif italic text-lg mt-4 max-w-2xl mx-auto">
          Get inspired by our latest creations and behind-the-scenes moments.
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {reelVideos.map((reel, index) => (
            <VideoCard key={index} src={reel.src} link={reel.link} />
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <a
          href="https://www.instagram.com/amioradiamonds/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            className="border-gold text-gold hover:bg-gold hover:text-white px-8 py-6 h-auto text-lg font-serif rounded-none tracking-wide transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <Instagram className="mr-2 h-5 w-5" />
            Follow on Instagram
          </Button>
        </a>
      </div>
    </section>
  );
}
