import { Link } from "wouter";
import ProductGrid from "@/components/ProductGrid";

const BRACELETS_WC_ID = 1003;

export default function BraceletsPage() {
  return (
    <div className="container mx-auto px-4 py-12">

      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Bracelets</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our range of beautifully crafted bracelets
        </p>
      </div>

      {/* Subcategories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">

        {/* Chain Bracelet */}
        <Link href="/bracelets-bangles/chain-bracelet">
          <div className="border rounded-xl overflow-hidden hover:shadow-lg transition bg-white cursor-pointer">
            <div className="h-40 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-23-scaled.jpg"
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
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-23-scaled.jpg"
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
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-21-scaled.jpg"
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
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-18-scaled.jpg"
                alt="Tennis Bracelet"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Tennis Bracelet</div>
          </div>
        </Link>

      </div>

      {/* Product Grid */}
      <ProductGrid categoryId={BRACELETS_WC_ID} />
    </div>
  );
}
