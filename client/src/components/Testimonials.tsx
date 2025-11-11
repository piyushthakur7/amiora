import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Priya Sharma",
    initials: "PS",
    rating: 5,
    text: "Absolutely stunning craftsmanship! My engagement ring is beyond beautiful. The team at Amiora made the entire experience special and memorable.",
    location: "Mumbai"
  },
  {
    name: "Rahul Mehta",
    initials: "RM",
    rating: 5,
    text: "Purchased a diamond necklace for my wife's anniversary. The quality and design exceeded our expectations. Highly recommend Amiora Diamonds!",
    location: "Delhi"
  },
  {
    name: "Anjali Desai",
    initials: "AD",
    rating: 5,
    text: "The bridal collection is exquisite! Every piece tells a story. The customer service was exceptional, helping me choose the perfect set for my wedding.",
    location: "Bangalore"
  }
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-4">
          What Our Customers Say
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Join thousands of happy customers who trust Amiora Diamonds for their special moments
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-card-border" data-testid={`card-testimonial-${index}`}>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-sm text-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
