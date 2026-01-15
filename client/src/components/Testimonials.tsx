import { Quote, Star } from "lucide-react";
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
      text: "I had a wonderful experience at Amiora Gold, Chinar Park. The quality of the jewellery is excellent, with beautiful designs and great finishing. The prices are reasonable and transparent, making it truly value for money. The staff was very polite and helpful. I highly recommend this place to anyone looking for fine jewellery.",
      author: "Subhaajit Mandal",
      rating: 5,
    },
    {
      text: "Very friendly place with good service, good jewellery variety and designs with pocket friendly items. Love to visit again. Highly recommended for daily wear and occasion wear diamonds.",
      author: "Happy Maddheshiya",
      rating: 5,
    },
    {
      text: "Excellent product quality with beautiful finishing. Looks premium and elegant. Special thanks to Trisha Das for her great support and professional guidance. Highly recommended!",
      author: "Jit Sardar",
      rating: 5,
    },
    {
      text: "It was a wonderful Experience with my Minimum Expense and Maximum Service... The entire environment was awesome... Specially the behaviour of Mir Neha was so nice and helpful to us... #Amazing_Amiora",
      author: "Md Aziz",
      rating: 5,
    },
    {
      text: "All staff behaviour very good. The products of the shop are very nice. And many things are available at low prices. And thank you Neha for guiding me. Everyone should visit, very good product.",
      author: "Sayra Sarma",
      rating: 5,
    },
    {
      text: "Absolutely stunning collection! I bought a solitaire ring for my engagement, and it sparkles like a dream. The certification process gave me total peace of mind. Thank you Amiora!",
      author: "Priya Roy",
      rating: 5,
    },
    {
      text: "The best place for modern jewelry. I love how lightweight and elegant their necklace designs are. Perfect for office wear and parties alike. Great service by the team.",
      author: "Anjali Gupta",
      rating: 5,
    },
    {
      text: "Transparent pricing is what I liked the most. No hidden charges, and the gold rate was competitive. The showroom ambiance is also very luxurious and welcoming.",
      author: "Rahul Verma",
      rating: 5,
    },
    {
      text: "I was looking for a unique anniversary gift and found the perfect diamond bracelet here. My wife loved it! The packaging was also very premium. Will definitely return.",
      author: "Amit Debnath",
      rating: 5,
    },
    {
      text: "Courteous staff and a vast collection of earrings. Whether you want traditional or contemporary, they have it all. Very happy with my purchase.",
      author: "Sneha Biswas",
      rating: 5,
    },
    {
      text: "A hidden gem in Kolkata! The designs are exquisite and very different from regular stores. Their custom order service is also top-notch.",
      author: "Vikram Chatterjee",
      rating: 5,
    },
    {
      text: "Visited for a nose pin, ended up buying earrings too! The affordable diamond range is surprisingly good. Good finish and shine.",
      author: "Megha Sen",
      rating: 5,
    }
  ];

  return (
    <section className="py-24 bg-background text-[#0E2220] relative overflow-hidden text-center">
      {/* Background Pattern - Subtle Gold Sheen */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C8A46A]/5 to-transparent opacity-40" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Quote className="h-12 w-12 text-[#C8A46A] mx-auto mb-6 opacity-80" />
          <h2 className="font-serif text-4xl md:text-5xl text-[#0E2220] mb-4 tracking-tight">
            Words from our Collectors
          </h2>
          <div className="h-0.5 w-24 bg-[#C8A46A] mx-auto mt-6" />
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-2 h-full">
                  <Card className="bg-card border border-[#C8A46A]/20 shadow-sm hover:shadow-xl hover:shadow-[#C8A46A]/10 transition-all duration-500 h-full group">
                    <CardContent className="flex flex-col p-8 h-full justify-between gap-6 relative">

                      {/* Decorative Quote Mark */}
                      <span className="absolute top-4 right-6 text-6xl text-[#C8A46A]/10 font-serif leading-none">"</span>

                      <div className="flex gap-1 mb-2 justify-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-[#C8A46A] text-[#C8A46A]" />
                        ))}
                      </div>

                      <p className="text-lg leading-relaxed italic font-serif text-gray-700 line-clamp-6 text-center">
                        "{review.text}"
                      </p>

                      <div className="pt-4 border-t border-gray-200 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#C8A46A] flex items-center justify-center text-[#003C32] font-bold text-lg">
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 tracking-wide text-sm">
                            {review.author}
                          </p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                            Google Review
                          </p>
                        </div>
                      </div>

                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* NAVIGATION BUTTONS - Now Visible on Light Background */}
          <CarouselPrevious className="hidden md:flex -left-12 bg-white border-[#C8A46A]/50 text-[#0E2220] hover:bg-[#C8A46A] hover:text-white transition-colors h-12 w-12" />
          <CarouselNext className="hidden md:flex -right-12 bg-white border-[#C8A46A]/50 text-[#0E2220] hover:bg-[#C8A46A] hover:text-white transition-colors h-12 w-12" />
        </Carousel>

        <div className="text-center mt-12">
          <a
            href="https://share.google/RBFTHyla5UDqymiYh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white hover:bg-[#003C32] text-[#003C32] hover:text-white border border-[#003C32] rounded-none transition-all duration-300 font-serif text-lg tracking-wide uppercase"
          >
            Review us on Google
          </a>
        </div>
      </div>
    </section>
  );
}
