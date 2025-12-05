import { Link } from "wouter";
import ProductGrid from "@/components/ProductGrid";

const KIDS_WC_ID = 1007;

export default function KidsPage() {
  return (
    <div className="container mx-auto px-4 py-12">

      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Kids Collection</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Jewellery designed especially for kids
        </p>
      </div>

      {/* Subcategories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

        {/* Kids Rings */}
        <Link href="/kids-collection/rings">
          <div className="border rounded-2xl overflow-hidden hover:shadow-xl bg-white cursor-pointer transition">
            <div className="h-56 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-121-scaled.jpg"
                alt="Kids Rings"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5 text-center text-xl font-semibold">Rings</div>
          </div>
        </Link>

        {/* Kids Bracelets & Bangles */}
        <Link href="/kids-collection/bracelets-bangles">
          <div className="border rounded-2xl overflow-hidden hover:shadow-xl bg-white cursor-pointer transition">
            <div className="h-56 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-3-scaled.jpg"
                alt="Kids Bracelets & Bangles"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5 text-center text-xl font-semibold">
              Bracelets & Bangles
            </div>
          </div>
        </Link>

        {/* Kids Pendants */}
        <Link href="/kids-collection/pendants">
          <div className="border rounded-2xl overflow-hidden hover:shadow-xl bg-white cursor-pointer transition">
            <div className="h-56 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-86-scaled.jpg"
                alt="Kids Pendants"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5 text-center text-xl font-semibold">Pendants</div>
          </div>
        </Link>

        {/* Kids Earrings */}
        <Link href="/kids-collection/earrings">
          <div className="border rounded-2xl overflow-hidden hover:shadow-xl bg-white cursor-pointer transition">
            <div className="h-56 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-288-scaled.jpg"
                alt="Kids Earrings"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5 text-center text-xl font-semibold">Earrings</div>
          </div>
        </Link>

      </div>

      {/* Product Grid */}
      <ProductGrid categoryId={KIDS_WC_ID} />
    </div>
  );
}
