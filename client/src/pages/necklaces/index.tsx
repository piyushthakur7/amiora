// app/necklaces/page.tsx
import ProductGrid from "@/components/ProductGrid";

export default function NecklacesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Necklaces</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our stunning collection of necklaces
        </p>
      </div>

      {/* Subcategory cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        <a
          href="/necklaces/chains"
          className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1"
        >
          <img
            src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-80-scaled.jpg"
            alt="Chains"
            className="w-full h-56 object-cover"
          />
          <div className="p-5 text-center text-lg font-semibold">Chains</div>
        </a>

        <a
          href="/necklaces/pendants"
          className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1"
        >
          <img
            src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-79-scaled.jpg"
            alt="Pendants"
            className="w-full h-56 object-cover"
          />
          <div className="p-5 text-center text-lg font-semibold">Pendants</div>
        </a>

        <a
          href="/necklaces/chokers"
          className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1"
        >
          <img
            src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-75-scaled.jpg"
            alt="Chokers"
            className="w-full h-56 object-cover"
          />
          <div className="p-5 text-center text-lg font-semibold">Chokers</div>
        </a>

        <a
          href="/necklaces/statement"
          className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1"
        >
          <img
            src="https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-78-scaled.jpg"
            alt="Statement"
            className="w-full h-56 object-cover"
          />
          <div className="p-5 text-center text-lg font-semibold">Statement</div>
        </a>
      </div>

      {/* Products */}
      <ProductGrid categorySlug="necklaces" />
    </div>
  );
}
