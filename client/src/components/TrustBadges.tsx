import { Truck, RefreshCw, Award, Sparkles } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above ₹50,000"
  },
  {
    icon: RefreshCw,
    title: "Easy Exchange",
    description: "30-day return policy"
  },
  {
    icon: Award,
    title: "100% Certified",
    description: "Authentic diamonds & gold"
  },
  {
    icon: Sparkles,
    title: "Lifetime Service",
    description: "Free cleaning & repairs"
  }
];

export function TrustBadges() {
  return (
    <section className="py-12 md:py-16 bg-accent/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-3" data-testid={`badge-trust-${index}`}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <badge.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{badge.title}</h3>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
