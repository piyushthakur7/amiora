import { Link } from "wouter";
import ProductGrid from "../../components/ProductGrid";

export default function RingsPage() {
  return (
    <div className="container mx-auto px-4 py-12">

      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Rings</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our curated selection of rings
        </p>
      </div>

      {/* Subcategory Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

        {/* Bands */}
        <Link href="/rings/bands">
          <div className="rounded-2xl overflow-hidden cursor-pointer transition 
                          bg-gradient-to-b from-gray-50 to-gray-200 hover:shadow-2xl">
            <div className="h-60 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-160-scaled.jpg"
                alt="Bands"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5 text-center text-lg font-semibold">Bands</div>
          </div>
        </Link>

        {/* Cocktail Rings */}
        <Link href="/rings/cocktail">
          <div className="rounded-2xl overflow-hidden cursor-pointer transition 
                          bg-gradient-to-b from-gray-50 to-gray-200 hover:shadow-2xl">
            <div className="h-60 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-134-scaled.jpg"
                alt="Cocktail Rings"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5 text-center text-lg font-semibold">Cocktail Rings</div>
          </div>
        </Link>

        {/* Daily Wear */}
        <Link href="/rings/daily-wear">
          <div className="rounded-2xl overflow-hidden cursor-pointer transition 
                          bg-gradient-to-b from-gray-50 to-gray-200 hover:shadow-2xl">
            <div className="h-60 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-150-scaled.jpg"
                alt="Daily Wear Rings"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5 text-center text-lg font-semibold">Daily Wear Rings</div>
          </div>
        </Link>

        {/* Platinum Rings */}
        <Link href="/rings/platinum">
          <div className="rounded-2xl overflow-hidden cursor-pointer transition 
                          bg-gradient-to-b from-gray-50 to-gray-200 hover:shadow-2xl">
            <div className="h-60 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/Platinum-rings_page-0003.jpg"
                alt="Platinum Rings"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5 text-center text-lg font-semibold">Platinum Rings</div>
          </div>
        </Link>

        {/* Solitaire Rings */}
        <Link href="/rings/solitaire">
          <div className="rounded-2xl overflow-hidden cursor-pointer transition 
                          bg-gradient-to-b from-gray-50 to-gray-200 hover:shadow-2xl">
            <div className="h-60 w-full">
              <img
                src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-159-scaled.jpg"
                alt="Solitaire Rings"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5 text-center text-lg font-semibold">Solitaire Rings</div>
          </div>
        </Link>

      </div>

      {/* Product Grid From WooCommerce */}
      <ProductGrid categorySlug="rings" />
    </div>
  );
}
