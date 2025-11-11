import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiVisa, SiMastercard, SiPaypal } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-emerald text-emerald-foreground mt-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="font-serif text-xl mb-4" style={{ color: '#D4AF37' }}>
              About Our Store
            </h3>
            <p className="text-emerald-foreground/90 text-sm leading-relaxed">
              Amiora Diamonds brings you the finest collection of handcrafted jewelry. 
              Every piece tells a story of timeless elegance and superior craftsmanship.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-4" style={{ color: '#D4AF37' }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/delivery-info">
                  <Button variant="link" className="text-emerald-foreground/90 hover:text-emerald-foreground p-0 h-auto" data-testid="link-delivery">
                    Delivery Information
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/track-order">
                  <Button variant="link" className="text-emerald-foreground/90 hover:text-emerald-foreground p-0 h-auto" data-testid="link-track">
                    Track Your Order
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/returns">
                  <Button variant="link" className="text-emerald-foreground/90 hover:text-emerald-foreground p-0 h-auto" data-testid="link-returns">
                    Returns & Exchange
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/stores">
                  <Button variant="link" className="text-emerald-foreground/90 hover:text-emerald-foreground p-0 h-auto" data-testid="link-stores">
                    Find a Store
                  </Button>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-4" style={{ color: '#D4AF37' }}>
              Information
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog">
                  <Button variant="link" className="text-emerald-foreground/90 hover:text-emerald-foreground p-0 h-auto" data-testid="link-blog-footer">
                    Blog
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <Button variant="link" className="text-emerald-foreground/90 hover:text-emerald-foreground p-0 h-auto" data-testid="link-faq-footer">
                    Help & FAQs
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <Button variant="link" className="text-emerald-foreground/90 hover:text-emerald-foreground p-0 h-auto" data-testid="link-privacy">
                    Privacy Policy
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <Button variant="link" className="text-emerald-foreground/90 hover:text-emerald-foreground p-0 h-auto" data-testid="link-terms">
                    Terms & Conditions
                  </Button>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-4" style={{ color: '#D4AF37' }}>
              Contact Us
            </h3>
            <ul className="space-y-3 text-emerald-foreground/90 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 1800-XXX-XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@amioradiamonds.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm mb-3" style={{ color: '#D4AF37' }}>Stay Connected</h4>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-emerald-foreground/10"
                  data-testid="link-instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-emerald-foreground/10"
                  data-testid="link-facebook"
                >
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-emerald-foreground/10"
                  data-testid="link-linkedin"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-emerald-foreground/10"
                  data-testid="link-youtube"
                >
                  <Youtube className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-emerald-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap items-center gap-4 text-emerald-foreground/70 text-sm">
              <span>Secure Payments</span>
              <div className="flex gap-2">
                <SiVisa className="h-6 w-8" />
                <SiMastercard className="h-6 w-8" />
                <SiPaypal className="h-6 w-8" />
              </div>
            </div>
            <p className="text-emerald-foreground/70 text-sm text-center">
              © 2024 Amiora Diamonds. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
