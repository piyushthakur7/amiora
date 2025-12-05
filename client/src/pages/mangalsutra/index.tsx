import { Link } from "wouter";
import ProductGrid from "@/components/ProductGrid";

const MANGALSUTRA_WC_ID = 1005;

export default function MangalsutraPage() {
  return (
    <div className="container mx-auto px-4 py-12">

      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Mangalsutra</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Timeless and elegant mangalsutra designs
        </p>
      </div>

      {/* Subcategories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">

        {/* Mangalsutra Pendant */}
        <Link href="/mangalsutra/mangalsutra-pendant">
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:-translate-y-1">
            <img
              src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-227-scaled.jpg"
              alt="Mangalsutra Pendant"
              className="w-full h-56 object-cover"
            />
            <div className="p-5 text-center text-lg font-semibold">Pendant</div>
          </div>
        </Link>

        {/* Mangalsutra Chain */}
        <Link href="/mangalsutra/mangalsutra-chain">
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:-translate-y-1">
            <img
              src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-226-scaled.jpg"
              alt="Mangalsutra Chain"
              className="w-full h-56 object-cover"
            />
            <div className="p-5 text-center text-lg font-semibold">Chain</div>
          </div>
        </Link>

        {/* Mangalsutra Bracelet */}
        <Link href="/mangalsutra/mangalsutra-bracelet">
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:-translate-y-1">
            <img
              src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-225-scaled.jpg"
              alt="Mangalsutra Bracelet"
              className="w-full h-56 object-cover"
            />
            <div className="p-5 text-center text-lg font-semibold">Bracelet</div>
          </div>
        </Link>

        {/* Solitaire Mangalsutra */}
        <Link href="/mangalsutra/solitaire-mangalsutra">
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:-translate-y-1">
            <img
              src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-223-scaled.jpg"
              alt="Solitaire Mangalsutra"
              className="w-full h-56 object-cover"
            />
            <div className="p-5 text-center text-lg font-semibold">Solitaire</div>
          </div>
        </Link>

      </div>

      {/* Product Grid */}
      <ProductGrid categoryId={MANGALSUTRA_WC_ID} />
    </div>
  );
}
