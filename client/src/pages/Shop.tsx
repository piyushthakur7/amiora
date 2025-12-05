import { Link } from "wouter";

export default function Shop() {
  const categories = [
    { name: "Necklaces", slug: "necklaces" },
    { name: "Nosepins", slug: "nosepins" },
    { name: "Rings", slug: "rings" },
    { name: "Earrings", slug: "earrings" },
    { name: "Pendants & Lockets", slug: "pendants-lockets" },
    { name: "Bracelets", slug: "bracelets" },
    { name: "Bangles", slug: "bangles" },
    { name: "Mangalsutra", slug: "mangalsutra" },
    { name: "Men's Collection", slug: "mens-collection" },
    { name: "Kids Collection", slug: "kids-collection" },
  ];

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Shop All Categories</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/${cat.slug}`}
            className="p-6 border rounded-xl hover:shadow-lg cursor-pointer transition bg-white text-center"
          >
            <h3 className="text-xl font-semibold">{cat.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
