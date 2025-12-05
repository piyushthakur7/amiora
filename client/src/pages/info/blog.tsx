export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "How to Choose the Perfect Gold Necklace",
      excerpt: "Necklaces come in lengths, styles, and designs that completely change how they sit on the body. Here’s how to choose one that matches your features and your wardrobe.",
      image: "https://images.unsplash.com/photo-1603575446315-47aa3b9c53ff"
    },
    {
      id: 2,
      title: "Different Types of Earrings and What They Say About You",
      excerpt: "Studs, hoops, drops — each carries its own vibe. Learn which earring styles subtly shape your look.",
      image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e"
    },
    {
      id: 3,
      title: "Kids’ Jewelry: What’s Safe and What’s Not",
      excerpt: "Kids love shiny things, but not every material is ideal for sensitive skin. Here’s a breakdown of safe metals and safe designs.",
      image: "https://images.unsplash.com/photo-1617038220319-fd615a9c22e8"
    },
    {
      id: 4,
      title: "How to Identify Real Silver",
      excerpt: "Sterling silver has tells that fakes can’t replicate. Learn the quick tests you can do at home.",
      image: "https://images.unsplash.com/photo-1611599537791-3e77c0e7f4d3"
    },
    {
      id: 5,
      title: "Why Minimalist Jewelry Never Goes Out of Style",
      excerpt: "Styles change constantly, but minimal pieces survive every trend cycle. Here’s why they work forever.",
      image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1"
    },
    {
      id: 6,
      title: "Best Jewelry Gifts for Birthdays",
      excerpt: "From personalized pendants to gemstone studs, here are fail-safe gift ideas that don’t feel generic.",
      image: "https://images.unsplash.com/photo-1585943791715-4a26c3aa9e3d"
    },
    {
      id: 7,
      title: "How to Clean Gold at Home Without Damaging It",
      excerpt: "Your gold jewelry collects oils and dirt over time. A simple cleaning routine keeps it looking new.",
      image: "https://images.unsplash.com/photo-1600187588545-d294bbd839a7"
    },
    {
      id: 8,
      title: "Pendant Shapes and Their Meanings",
      excerpt: "Hearts, circles, religious symbols — pendants often carry more meaning than we realize.",
      image: "https://images.unsplash.com/photo-1617037520178-42928d0b9230"
    },
    {
      id: 9,
      title: "Why Hoop Earrings Are a Timeless Essential",
      excerpt: "Hoops have survived centuries of fashion shifts. Here’s what makes them universal.",
      image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e"
    },
    {
      id: 10,
      title: "Understanding Gemstone Cuts",
      excerpt: "Round, princess, emerald, oval — the cut changes how a stone handles light. Here’s the quick guide.",
      image: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd"
    },
    {
      id: 11,
      title: "The Rise of Personalized Jewelry",
      excerpt: "Name pendants and birthstone rings are everywhere. Here’s why customization is dominating modern jewelry.",
      image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3"
    },
    {
      id: 12,
      title: "Matching Jewelry With Outfits",
      excerpt: "Jewelry should support your outfit, not fight it. Here’s how to pair metals, colors, and silhouettes.",
      image: "https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 py-16">
      <div className="container mx-auto px-6">

        {/* Page Heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Jewelry Blog</h1>
          <p className="text-xl text-gray-700">
            Articles, guides, and insights about jewelry.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map(post => (
            <div
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-5">
                <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <button className="text-indigo-600 font-medium hover:underline">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
