import { Link } from "wouter";
import ProductGrid from "@/components/ProductGrid";

const BANGLES_WC_ID = 1004;

export default function BanglesPage() {
  return (
    <div className="container mx-auto px-4 py-12">

      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Bangles</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our full range of bangles and bracelets
        </p>
      </div>

      {/* Subcategories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">

        {/* Chain Bracelet */}
        <Link href="/bracelets-bangles/chain-bracelet">
          <div className="border rounded-xl overflow-hidden hover:shadow-lg transition bg-white cursor-pointer">
            <div className="h-40 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-171-scaled.jpg"
                alt="Chain Bracelet"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Chain Bracelet</div>
          </div>
        </Link>

        {/* Adjustable Bracelet */}
        <Link href="/bracelets-bangles/adjustable-bracelet">
          <div className="border rounded-xl overflow-hidden hover:shadow-lg transition bg-white cursor-pointer">
            <div className="h-40 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-180-scaled.jpg"
                alt="Adjustable Bracelet"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Adjustable Bracelet</div>
          </div>
        </Link>

        {/* Flexible Bracelet */}
        <Link href="/bracelets-bangles/flexible-bracelet">
          <div className="border rounded-xl overflow-hidden hover:shadow-lg transition bg-white cursor-pointer">
            <div className="h-40 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-180-scaled.jpg"
                alt="Flexible Bracelet"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Flexible Bracelet</div>
          </div>
        </Link>

        {/* Tennis Bracelet */}
        <Link href="/bracelets-bangles/tennis-bracelet">
          <div className="border rounded-xl overflow-hidden hover:shadow-lg transition bg-white cursor-pointer">
            <div className="h-40 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-176-scaled.jpg"
                alt="Tennis Bracelet"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Tennis Bracelet</div>
          </div>
        </Link>

        {/* Daily Wear Bangles */}
        <Link href="/bracelets-bangles/daily-wear-bangles">
          <div className="border rounded-xl overflow-hidden hover:shadow-lg transition bg-white cursor-pointer">
            <div className="h-40 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-181-scaled.jpg"
                alt="Daily Wear Bangles"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Daily Wear Bangles</div>
          </div>
        </Link>

        {/* Bridal Bangles */}
        <Link href="/bracelets-bangles/bridal-bangles">
          <div className="border rounded-xl overflow-hidden hover:shadow-lg transition bg-white cursor-pointer">
            <div className="h-40 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-174-scaled.jpg"
                alt="Bridal Bangles"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Bridal Bangles</div>
          </div>
        </Link>

        {/* Noya Collection */}
        <Link href="/bracelets-bangles/noya">
          <div className="border rounded-xl overflow-hidden hover:shadow-lg transition bg-white cursor-pointer">
            <div className="h-40 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-175-scaled.jpg"
                alt="Noya Collection"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Noya Collection</div>
          </div>
        </Link>

      </div>

      {/* Product Grid */}
      <ProductGrid categoryId={BANGLES_WC_ID} />
    </div>
  );
}
