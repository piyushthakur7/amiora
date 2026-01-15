
import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <>
      <footer className="bg-primary/5 text-primary pt-16 pb-8 font-sans">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">

          {/* TOP SECTION: 4 COLUMNS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">

            {/* COLUMN 1: CUSTOMER SERVICE */}
            <div>
              <h3 className="font-serif text-lg mb-4 opacity-80">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact"><span className="hover:opacity-70 cursor-pointer">Contact Us</span></Link></li>
                <li><Link href="/customize"><span className="hover:opacity-70 cursor-pointer">Customize</span></Link></li>
                <li><Link href="/size-chart"><span className="hover:opacity-70 cursor-pointer">Size Chart</span></Link></li>
                <li><Link href="/faqs"><span className="hover:opacity-70 cursor-pointer">FAQs</span></Link></li>
              </ul>
            </div>

            {/* COLUMN 2: ABOUT US */}
            <div>
              <h3 className="font-serif text-lg mb-4 opacity-80">About Us</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about"><span className="hover:opacity-70 cursor-pointer">About Amiora</span></Link></li>
                <li><Link href="/guide"><span className="hover:opacity-70 cursor-pointer">Lab Grown Diamond Guide</span></Link></li>
                <li><Link href="/blog"><span className="hover:opacity-70 cursor-pointer">Blogs</span></Link></li>
              </ul>
            </div>

            {/* COLUMN 3: POLICIES */}
            <div>
              <h3 className="font-serif text-lg mb-4 opacity-80">Policies</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms"><span className="hover:opacity-70 cursor-pointer">Terms of Service</span></Link></li>
                <li><Link href="/privacy-policy"><span className="hover:opacity-70 cursor-pointer">Privacy Policy</span></Link></li>
                <li><Link href="/shipping"><span className="hover:opacity-70 cursor-pointer">Shipping Policy</span></Link></li>
                <li><Link href="/returns"><span className="hover:opacity-70 cursor-pointer">Return & Refund Policy</span></Link></li>
              </ul>
            </div>

            {/* COLUMN 4: CONNECT WITH US */}
            <div>
              <h3 className="font-serif text-lg mb-4 opacity-80">Connect With Us</h3>
              <div className="flex gap-4 mb-6">
                <Instagram className="h-5 w-5 hover:opacity-70 cursor-pointer" />
                <Facebook className="h-5 w-5 hover:opacity-70 cursor-pointer" />
                <Linkedin className="h-5 w-5 hover:opacity-70 cursor-pointer" />
                <Youtube className="h-5 w-5 hover:opacity-70 cursor-pointer" />
              </div>
              <div className="flex gap-3">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-sm px-6 uppercase text-xs tracking-wider">
                  Call Us
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-sm px-6 uppercase text-xs tracking-wider">
                  Whatsapp
                </Button>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: POPULAR LINKS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 pt-8 border-t border-primary/10">

            {/* POPULAR CATEGORIES */}
            <div>
              <h3 className="font-serif text-lg mb-6 opacity-80 text-primary">Popular Categories</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <Link href="/rings"><span className="hover:opacity-70 cursor-pointer block">Lab Grown Diamond Rings</span></Link>
                <Link href="/earrings"><span className="hover:opacity-70 cursor-pointer block">Lab Grown Diamond Earrings</span></Link>
                <Link href="/neckwear"><span className="hover:opacity-70 cursor-pointer block">Lab Grown Diamond Neckwear</span></Link>
                <Link href="/bracelets"><span className="hover:opacity-70 cursor-pointer block">Lab Grown Diamond Wristwear</span></Link>
                <Link href="/mens"><span className="hover:opacity-70 cursor-pointer block">Lab Grown Diamond Men's</span></Link>
                <Link href="/shop"><span className="hover:opacity-70 cursor-pointer block">Lab Grown Diamond All Jewellery</span></Link>
              </div>
            </div>

            {/* POPULAR SEARCH */}
            <div>
              <h3 className="font-serif text-lg mb-6 opacity-80 text-primary">Popular Search</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <Link href="/rings"><span className="hover:opacity-70 cursor-pointer block">Lab Grown Diamond Rings</span></Link>
                <Link href="/earrings"><span className="hover:opacity-70 cursor-pointer block">Lab Grown Diamond Earrings</span></Link>
                <Link href="/mangalsutra"><span className="hover:opacity-70 cursor-pointer block">Lab Grown Diamond Mangalsutra</span></Link>
                <Link href="/bangles"><span className="hover:opacity-70 cursor-pointer block">Lab Grown Diamond Bangles</span></Link>
                <Link href="/bracelets"><span className="hover:opacity-70 cursor-pointer block">Lab Grown Diamond Bracelets</span></Link>
                <Link href="/pendants"><span className="hover:opacity-70 cursor-pointer block">Lab Grown Diamond Pendants</span></Link>
              </div>
            </div>

          </div>

          {/* COPYRIGHT */}
          <div className="text-center pt-8 border-t border-primary/10 text-xs opacity-60">
            <p>© 2026 Amiora Diamonds. All rights reserved.</p>
          </div>

        </div>
      </footer>

      <div className="bg-white py-12 border-t border-gray-100 text-sm font-sans">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 space-y-8">

          {/* GOLD SEO */}
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Top Searches in Gold Jewellery</h4>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-gray-500 leading-relaxed">
              {[
                "Gold Jewellery", "Gold Rings", "Gold Earrings", "Gold Pendants",
                "Gold Necklaces", "Gold Mangalsutras", "Gold Bangles", "Women Gold Rings",
                "Men's Gold Earrings", "Gold Chains for Men", "Dailywear Gold Earrings", "Dailywear Gold Bangles"
              ].map((item, i, arr) => (
                <span key={i} className="flex gap-2 items-center">
                  <Link href="/shop" className="hover:text-primary transition-colors cursor-pointer">{item}</Link>
                  {i < arr.length - 1 && <span className="text-gray-300">|</span>}
                </span>
              ))}
            </div>
          </div>

          {/* DIAMOND SEO */}
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Top Searches in Diamond Jewellery</h4>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-gray-500 leading-relaxed">
              {[
                "Diamond Jewellery", "Diamond Rings", "Diamond Earrings", "Diamond Pendants",
                "Diamond Necklaces", "Diamond Mangalsutras", "Diamond Bangles", "Diamond Bracelets",
                "Women Diamond Rings", "Men's Diamond Earrings", "Men's Diamond Rings", "Men's Diamond Bracelets"
              ].map((item, i, arr) => (
                <span key={i} className="flex gap-2 items-center">
                  <Link href="/shop" className="hover:text-primary transition-colors cursor-pointer">{item}</Link>
                  {i < arr.length - 1 && <span className="text-gray-300">|</span>}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
