import { Link } from "wouter";
import ProductGrid from "@/components/ProductGrid";

const PENDANTS_WC_ID = 1002;

export default function PendantsPage() {
  return (
    <div className="container mx-auto px-4 py-12">

      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Pendants & Lockets</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover elegant pendants crafted to perfection
        </p>
      </div>

      {/* Subcategories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">

        {/* Daily Wear */}
        <Link href="/pendants-lockets/daily-wear">
          <div className="border rounded-xl overflow-hidden bg-white hover:shadow-lg cursor-pointer transition">
            <div className="h-40 w-full">
              <img
                src="__DAILY_WEAR_PENDANT_IMG__"
                alt="Daily Wear Pendant"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Daily Wear</div>
          </div>
        </Link>

        {/* Solitaire */}
        <Link href="/pendants-lockets/solitaire">
          <div className="border rounded-xl overflow-hidden bg-white hover:shadow-lg cursor-pointer transition">
            <div className="h-40 w-full">
              <img
                src="__SOLITAIRE_PENDANT_IMG__"
                alt="Solitaire Pendant"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Solitaire</div>
          </div>
        </Link>

        {/* Cluster */}
        <Link href="/pendants-lockets/cluster">
          <div className="border rounded-xl overflow-hidden bg-white hover:shadow-lg cursor-pointer transition">
            <div className="h-40 w-full">
              <img
                src="__CLUSTER_PENDANT_IMG__"
                alt="Cluster Pendant"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Cluster</div>
          </div>
        </Link>

        {/* Alphabet */}
        <Link href="/pendants-lockets/alphabet">
          <div className="border rounded-xl overflow-hidden bg-white hover:shadow-lg cursor-pointer transition">
            <div className="h-40 w-full">
              <img
                src="__ALPHABET_PENDANT_IMG__"
                alt="Alphabet Pendant"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Alphabet</div>
          </div>
        </Link>

      </div>

      {/* Product Grid */}
      <ProductGrid categoryId={PENDANTS_WC_ID} />
    </div>
  );
}
