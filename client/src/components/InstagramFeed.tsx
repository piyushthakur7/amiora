import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InstagramFeed() {
  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <div className="flex justify-center mb-6">
          <Instagram size={40} className="text-pink-600" />
        </div>

        <h2 className="text-3xl font-semibold mb-4">Instagram Feed</h2>
        <p className="text-gray-600 mb-6">
          Follow us on Instagram for more stunning jewelry inspiration.
        </p>

        <Button
          asChild
          variant="outline"
          className="border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Instagram
          </a>
        </Button>
      </div>
    </section>
  );
}
