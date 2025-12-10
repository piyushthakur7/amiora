import { Truck, ShieldCheck, Gem, RefreshCw } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      icon: Truck,
      title: "Free Insured Shipping",
      description: "On all domestic orders over ₹50,000",
    },
    {
      icon: Gem,
      title: "Certified Authenticity",
      description: "Every piece comes with a certificate",
    },
    {
      icon: RefreshCw,
      title: "Lifetime Exchange",
      description: "Upgrade your jewelry anytime",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      description: "100% secure payment processing",
    },
  ];

  return (
    <section className="py-20 border-y border-border/50 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="mb-4 p-4 rounded-full bg-white shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <badge.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-lg font-medium text-foreground mb-2">
                {badge.title}
              </h3>
              <p className="text-sm text-muted-foreground font-sans max-w-[200px]">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
