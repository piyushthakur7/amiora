import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Testimonials() {
  const reviews = [
    {
      text: "The craftsmanship is absolutely stunning. I bought a diamond pendant for my wife, and she hasn't taken it off since. Truly timeless pieces.",
      author: "Rajesh K.",
      location: "Mumbai",
    },
    {
      text: "Amiora's collection is unlike anything else. The attention to detail and the quality of the diamonds are simply world-class. Highly recommended.",
      author: "Priya S.",
      location: "Bangalore",
    },
    {
      text: "I was looking for something unique for my engagement, and Amiora delivered perfection. The service was as exquisite as the ring itself.",
      author: "Aditya M.",
      location: "Delhi",
    },
    {
      text: "Elegant, sophisticated, and pure luxury. Every time I wear my Amiora bracelet, I get compliments. It's my favorite piece of jewelry.",
      author: "Sneha R.",
      location: "Hyderabad",
    },
  ];

  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor"></circle>
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Quote className="h-12 w-12 text-gold mx-auto mb-6 opacity-80" />
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">
            Words from our Collectors
          </h2>
          <div className="h-1 w-20 bg-gold mx-auto" />
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="bg-white/5 border-white/10 text-white backdrop-blur-sm">
                    <CardContent className="flex flex-col p-8 h-full min-h-[250px] justify-between">
                      <p className="text-lg leading-relaxed italic font-serif text-white/90">
                        "{review.text}"
                      </p>
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <p className="font-semibold text-gold tracking-wide">
                          {review.author}
                        </p>
                        <p className="text-xs text-white/60 uppercase tracking-widest mt-1">
                          {review.location}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 bg-transparent border-white/20 text-white hover:bg-gold hover:text-primary hover:border-gold" />
          <CarouselNext className="hidden md:flex -right-12 bg-transparent border-white/20 text-white hover:bg-gold hover:text-primary hover:border-gold" />
        </Carousel>
      </div>
    </section>
  );
}
