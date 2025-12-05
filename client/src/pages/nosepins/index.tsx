import { Link } from "wouter";
import ProductGrid from "@/components/ProductGrid";

const NOSEPINS_WC_ID = 1008;

export default function NosepinsPage() {
  return (
    <div className="container mx-auto px-4 py-12">

      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Nosepins</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Elegant nosepins crafted for every style
        </p>
      </div>

      {/* Subcategories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">

        {/* Solitaire Nosepins */}
        <Link href="/nosepin/solitaire">
          <div className="border rounded-xl overflow-hidden bg-white hover:shadow-lg cursor-pointer transition">
            <div className="h-40 w-full">
              <img
                src="__NOSEPIN_SOLITAIRE_IMG__"
                alt="Solitaire Nosepin"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Solitaire</div>
          </div>
        </Link>

        {/* Designer Nosepins */}
        <Link href="/nosepin/designer">
          <div className="border rounded-xl overflow-hidden bg-white hover:shadow-lg cursor-pointer transition">
            <div className="h-40 w-full">
              <img
                src="__NOSEPIN_DESIGNER_IMG__"
                alt="Designer Nosepin"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Designer</div>
          </div>
        </Link>

        {/* Nose Rings */}
        <Link href="/nosepin/rings">
          <div className="border rounded-xl overflow-hidden bg-white hover:shadow-lg cursor-pointer transition">
            <div className="h-40 w-full">
              <img
                src="__NOSEPIN_RINGS_IMG__"
                alt="Nose Rings"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Rings</div>
          </div>
        </Link>

        {/* Nathi */}
        <Link href="/nosepin/nathi">
          <div className="border rounded-xl overflow-hidden bg-white hover:shadow-lg cursor-pointer transition">
            <div className="h-40 w-full">
              <img
                src="__NOSEPIN_NATHI_IMG__"
                alt="Nathi"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-lg font-semibold">Nathi</div>
          </div>
        </Link>

      </div>

      {/* Product Grid */}
      <ProductGrid categoryId={NOSEPINS_WC_ID} />
    </div>
  );
}
