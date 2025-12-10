import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiVisa, SiMastercard, SiPaypal } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-24 pb-12 border-t border-gold/20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

          {/* ABOUT */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-gold">
              Amiora Diamonds
            </h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed font-sans max-w-xs">
              Meticulously handcrafted jewelry that bridges the gap between timeless tradition and modern elegance.
              Designed for the extraordinary.
            </p>
            <div className="flex gap-4 pt-2">
              <Button variant="ghost" size="icon" className="hover:bg-gold/10 text-gold hover:text-gold-light transition-colors">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gold/10 text-gold hover:text-gold-light transition-colors">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gold/10 text-gold hover:text-gold-light transition-colors">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gold/10 text-gold hover:text-gold-light transition-colors">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-serif text-lg mb-6 text-gold">
              Customer Care
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Delivery Information", href: "/info/delivery" },
                { label: "Returns & Exchange", href: "/info/returns-exchange" },
                { label: "Find a Store", href: "/info/find-store" },
                { label: "Book an Appointment", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-sm text-primary-foreground/70 hover:text-gold transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* INFORMATION */}
          <div>
            <h3 className="font-serif text-lg mb-6 text-gold">
              The World of Amiora
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Our Story", href: "/about" },
                { label: "Blog & Journal", href: "/blog" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "FAQs", href: "/faqs" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-sm text-primary-foreground/70 hover:text-gold transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-serif text-lg mb-6 text-gold">
              Contact Us
            </h3>
            <ul className="space-y-4 text-primary-foreground/80 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span>+91 1800-XXX-XXXX<br /><span className="text-xs opacity-60">Mon-Sat, 10am - 7pm</span></span>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span>hello@amioradiamonds.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM STRIP */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 opacity-70">
          <p className="text-xs font-sans tracking-wide">
            © 2025 Amiora Diamonds. All rights reserved.
          </p>

          <div className="flex gap-4 text-white/50">
            <SiVisa className="h-6 w-8 hover:text-white transition-colors" />
            <SiMastercard className="h-6 w-8 hover:text-white transition-colors" />
            <SiPaypal className="h-6 w-8 hover:text-white transition-colors" />
          </div>
        </div>

      </div>
    </footer>
  );
}
