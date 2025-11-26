import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiVisa, SiMastercard, SiPaypal } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-[#0E2220] text-white mt-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div>
            <h3 className="font-serif text-xl mb-4" style={{ color: "#C8A46A" }}>
              About Our Store
            </h3>
            <p className="text-white/90 text-sm leading-relaxed">
              Amiora Diamonds brings you the finest collection of handcrafted jewelry. 
              Every piece tells a story of timeless elegance and superior craftsmanship.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-4" style={{ color: "#C8A46A" }}>
              Quick Links
            </h3>
            <ul className="space-y-2">

              <li>
                <Link href="/delivery-info">
                  <Button 
                    variant="ghost" 
                    className="text-white/90 hover:text-white p-0 h-auto bg-transparent"
                  >
                    Delivery Information
                  </Button>
                </Link>
              </li>

              <li>
                <Link href="/track-order">
                  <Button 
                    variant="ghost" 
                    className="text-white/90 hover:text-white p-0 h-auto bg-transparent"
                  >
                    Track Your Order
                  </Button>
                </Link>
              </li>

              <li>
                <Link href="/returns">
                  <Button 
                    variant="ghost" 
                    className="text-white/90 hover:text-white p-0 h-auto bg-transparent"
                  >
                    Returns & Exchange
                  </Button>
                </Link>
              </li>

              <li>
                <Link href="/stores">
                  <Button 
                    variant="ghost" 
                    className="text-white/90 hover:text-white p-0 h-auto bg-transparent"
                  >
                    Find a Store
                  </Button>
                </Link>
              </li>

            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-4" style={{ color: "#C8A46A" }}>
              Information
            </h3>
            <ul className="space-y-2">

              <li>
                <Link href="/blog">
                  <Button 
                    variant="ghost" 
                    className="text-white/90 hover:text-white p-0 h-auto bg-transparent"
                  >
                    Blog
                  </Button>
                </Link>
              </li>

              <li>
                <Link href="/faq">
                  <Button 
                    variant="ghost" 
                    className="text-white/90 hover:text-white p-0 h-auto bg-transparent"
                  >
                    Help & FAQs
                  </Button>
                </Link>
              </li>

              <li>
                <Link href="/privacy">
                  <Button 
                    variant="ghost" 
                    className="text-white/90 hover:text-white p-0 h-auto bg-transparent"
                  >
                    Privacy Policy
                  </Button>
                </Link>
              </li>

              <li>
                <Link href="/terms">
                  <Button 
                    variant="ghost" 
                    className="text-white/90 hover:text-white p-0 h-auto bg-transparent"
                  >
                    Terms & Conditions
                  </Button>
                </Link>
              </li>

            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-4" style={{ color: "#C8A46A" }}>
              Contact Us
            </h3>

            <ul className="space-y-3 text-white/90 text-sm">
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
              <h4 className="text-sm mb-3" style={{ color: "#C8A46A" }}>Stay Connected</h4>

              <div className="flex gap-3">
                <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                  <Youtube className="h-5 w-5" />
                </Button>
              </div>

            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
              <span>Secure Payments</span>
              <div className="flex gap-2">
                <SiVisa className="h-6 w-8" />
                <SiMastercard className="h-6 w-8" />
                <SiPaypal className="h-6 w-8" />
              </div>
            </div>

            <p className="text-white/70 text-sm text-center">
              © 2024 Amiora Diamonds. All rights reserved.
            </p>

          </div>
        </div>

      </div>
    </footer>
  );
}
