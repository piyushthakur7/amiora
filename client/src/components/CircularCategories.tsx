
import { Link } from "wouter";

const categories = [
    {
        name: "Rings",
        slug: "rings",
        image: "https://images.unsplash.com/photo-1605100804763-ebea46631e57?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
        name: "Earrings",
        slug: "earrings",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
        name: "Neckwear",
        slug: "necklaces",
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
        name: "Wristwear",
        slug: "bracelets",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
        name: "Men's",
        slug: "mens",
        image: "https://images.unsplash.com/photo-1617038220319-88af1199a7cd?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
        name: "All Jewellery",
        slug: "shop",
        image: "https://images.unsplash.com/photo-1573408301185-a1d3106839b9?auto=format&fit=crop&q=80&w=400&h=400"
    }
];

export function CircularCategories() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-[#3A6B65] text-2xl md:text-3xl font-sans mb-10 text-left font-normal pl-4">
                    Your favorites, by category.
                </h2>

                <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
                    {categories.map((cat) => (
                        <Link key={cat.slug} href={`/${cat.slug}`}>
                            <div className="flex flex-col items-center gap-4 group cursor-pointer">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-transparent group-hover:border-[#C8A46A]/50 transition-all duration-300 shadow-md hover:shadow-xl">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <span className="font-serif text-[#1A1A1A] text-lg font-medium group-hover:text-[#C8A46A] transition-colors">
                                    {cat.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
