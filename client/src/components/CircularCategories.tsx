
import { Link } from "wouter";

const categories = [
    {
        name: "Rings",
        slug: "rings",
        image: "/images/categories/category_rings_1770383089715.png"
    },
    {
        name: "Earrings",
        slug: "earrings",
        image: "/images/categories/category_earrings_1770383108629.png"
    },
    {
        name: "Neckwear",
        slug: "necklaces",
        image: "/images/categories/category_neckwear_1770383124444.png"
    },
    {
        name: "Wristwear",
        slug: "bracelets",
        image: "/images/categories/category_wristwear_1770383156233.png"
    },
    {
        name: "Bangles",
        slug: "bangles",
        image: "/images/categories/category_bangles_1770383252331.png"
    },
    {
        name: "Pendants",
        slug: "pendants",
        image: "/images/categories/category_pendants_1770383227454.png"
    },
    {
        name: "Mangalsutra",
        slug: "mangalsutra",
        image: "/images/categories/category_mangalsutra_1770383194966.png"
    },
    {
        name: "Nosepins",
        slug: "nosepins",
        image: "/images/categories/category_nosepins_1770383211469.png"
    },
    {
        name: "Men's",
        slug: "mens",
        image: "/images/categories/category_mens_1770383170415.png"
    },
    {
        name: "Kids",
        slug: "kids",
        image: "/images/categories/category_kids_1770383281734.png"
    }
];

export function CircularCategories() {
    return (
        <section className="py-16 bg-background">
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
