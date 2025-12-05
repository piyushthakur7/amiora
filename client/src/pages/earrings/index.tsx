import { Link } from "wouter";
import ProductGrid from "@/components/ProductGrid";

const EARRINGS_WC_ID = 1001;

export default function EarringsPage() {
  return (
    <div className="container mx-auto px-4 py-12">

      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Earrings</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Elegant earrings for every occasion
        </p>
      </div>

      {/* Subcategories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">

        {/* Studs */}
        <Link href="/earrings/studs">
          <div className="border rounded-xl overflow-hidden hover:shadow-lg transition bg-white cursor-pointer">
            <div className="h-40 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-287-scaled.jpg"
                alt="Stud Earrings"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Studs</div>
          </div>
        </Link>

        {/* Hoops */}
        <Link href="/earrings/hoops">
          <div className="border rounded-xl overflow-hidden hover:shadow-lg transition bg-white cursor-pointer">
            <div className="h-40 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-279-scaled.jpg"
                alt="Hoop Earrings"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Hoops</div>
          </div>
        </Link>

        {/* Drop & Jhumka */}
        <Link href="/earrings/drop-jhumka">
          <div className="border rounded-xl overflow-hidden hover:shadow-lg transition bg-white cursor-pointer">
            <div className="h-40 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-284-scaled.jpg"
                alt="Drop & Jhumka Earrings"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Drop & Jhumka</div>
          </div>
        </Link>

      </div>

      {/* Product Grid */}
      <ProductGrid categoryId={EARRINGS_WC_ID} />
    </div>
  );
}
