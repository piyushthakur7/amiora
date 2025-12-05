import { Link } from "wouter";
import ProductGrid from "@/components/ProductGrid";

const MENS_WC_ID = 1006;

export default function MensPage() {
  return (
    <div className="container mx-auto px-4 py-12">

      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Men's Collection</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Bold and elegant jewellery crafted for men
        </p>
      </div>

      {/* Subcategories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">

        {/* Men's Rings */}
        <Link href="/mens-collection/rings">
          <div className="border rounded-xl overflow-hidden bg-white hover:shadow-lg cursor-pointer transition">
            <div className="h-40 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-139-scaled.jpg"
                alt="Men's Rings"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Rings</div>
          </div>
        </Link>

        {/* Men's Studs */}
        <Link href="/mens-collection/studs">
          <div className="border rounded-xl overflow-hidden bg-white hover:shadow-lg cursor-pointer transition">
            <div className="h-40 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-284-scaled.jpg"
                alt="Men's Studs"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Studs</div>
          </div>
        </Link>

        {/* Men's Bracelet */}
        <Link href="/mens-collection/bracelet">
          <div className="border rounded-xl overflow-hidden bg-white hover:shadow-lg cursor-pointer transition">
            <div className="h-40 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-177-scaled.jpg"
                alt="Men's Bracelet"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Bracelet</div>
          </div>
        </Link>

        {/* Men's Kada */}
        <Link href="/mens-collection/kada">
          <div className="border rounded-xl overflow-hidden bg-white hover:shadow-lg cursor-pointer transition">
            <div className="h-40 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-174-scaled.jpg"
                alt="Men's Kada"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Kada</div>
          </div>
        </Link>

        {/* Men's Chains */}
        <Link href="/mens-collection/chains">
          <div className="border rounded-xl overflow-hidden bg-white hover:shadow-lg cursor-pointer transition">
            <div className="h-40 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-94-scaled.jpg"
                alt="Men's Chains"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Chains</div>
          </div>
        </Link>

        {/* Men's Pendant */}
        <Link href="/mens-collection/pendant">
          <div className="border rounded-xl overflow-hidden bg-white hover:shadow-lg cursor-pointer transition">
            <div className="h-40 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-91-scaled.jpg"
                alt="Men's Pendant"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Pendant</div>
          </div>
        </Link>

      </div>

      {/* Product Grid */}
      <ProductGrid categoryId={MENS_WC_ID} />
    </div>
  );
}
