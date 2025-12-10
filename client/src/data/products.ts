import { Product } from "@/types/Product";

export const products: Product[] = [
  // --- RINGS ---
  {
    id: 1,
    name: "Classic Diamond Solitaire Ring",
    slug: "classic-diamond-solitaire-ring",
    price: "₹45,000",
    regularPrice: "₹55,000",
    onSale: true,
    images: [
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800" },
      { src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800" }
    ],
    description: "A timeless classic featuring a brilliant round-cut diamond set in 18k gold. Perfect for engagements or special occasions.",
    shortDescription: "Brilliant round-cut diamond solitaire ring in 18k gold.",
    sku: "RNG-001",
    categories: [{ id: 101, name: "Rings", slug: "rings" }],
    attributes: [
      { id: 1, name: "Gold Purity", options: ["18k", "22k"] },
      { id: 2, name: "Diamond Clarity", options: ["VVS", "VS"] }
    ]
  },
  {
    id: 2,
    name: "Rose Gold Stackable Band",
    slug: "rose-gold-stackable-band",
    price: "₹22,000",
    images: [
      { src: "https://images.unsplash.com/photo-1598560977286-9dc5552b2178?auto=format&fit=crop&q=80&w=800" }
    ],
    description: "Elegant rose gold band with pave-set diamonds. Mix and match for a trendy stacked look.",
    shortDescription: "Rose gold band with pave-set diamonds.",
    sku: "RNG-002",
    categories: [{ id: 101, name: "Rings", slug: "rings" }],
    attributes: []
  },
  {
    id: 3,
    name: "Sapphire Cocktail Ring",
    slug: "sapphire-cocktail-ring",
    price: "₹85,000",
    images: [
      { src: "https://images.unsplash.com/photo-1576406240292-1dc3188d3e5b?auto=format&fit=crop&q=80&w=800" }
    ],
    description: "Statement cocktail ring featuring a deep blue sapphire surrounded by a halo of diamonds.",
    shortDescription: "Statement ring with blue sapphire and diamond halo.",
    sku: "RNG-003",
    categories: [{ id: 101, name: "Rings", slug: "rings" }],
    attributes: []
  },

  // --- NECKLACES ---
  {
    id: 11,
    name: "Diamond Pendant Necklace",
    slug: "diamond-pendant-necklace",
    price: "₹35,000",
    images: [
      { src: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=800" }
    ],
    description: "Delicate chain with a sparkling diamond pendant. Simple yet sophisticated.",
    shortDescription: "Delicate chain with a sparkling diamond pendant.",
    sku: "NCK-001",
    categories: [{ id: 102, name: "Necklaces", slug: "necklaces" }],
    attributes: []
  },
  {
    id: 12,
    name: "Gold Choker Necklace",
    slug: "gold-choker-necklace",
    price: "₹120,000",
    images: [
      { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800" }
    ],
    description: "Intricate gold choker design, perfect for bridal wear or grand events.",
    shortDescription: "Intricate gold choker design for special occasions.",
    sku: "NCK-002",
    categories: [{ id: 102, name: "Necklaces", slug: "necklaces" }],
    attributes: []
  },

  // --- EARRINGS ---
  {
    id: 21,
    name: "Diamond Stud Earrings",
    slug: "diamond-stud-earrings",
    price: "₹28,000",
    images: [
      { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800" }
    ],
    description: "Classic diamond studs that add a touch of sparkle to any outfit.",
    shortDescription: "Classic diamond studs.",
    sku: "EAR-001",
    categories: [{ id: 103, name: "Earrings", slug: "earrings" }],
    attributes: []
  },
  {
    id: 22,
    name: "Gold Jhumka Earrings",
    slug: "gold-jhumka-earrings",
    price: "₹65,000",
    images: [
      { src: "https://images.unsplash.com/photo-1630134443906-8ddd87968595?auto=format&fit=crop&q=80&w=800" }
    ],
    description: "Traditional gold Jhumkas with intricate detailing.",
    shortDescription: "Traditional gold Jhumkas.",
    sku: "EAR-002",
    categories: [{ id: 103, name: "Earrings", slug: "earrings" }],
    attributes: []
  },

   // --- BRACELETS ---
   {
    id: 31,
    name: "Tennis Bracelet",
    slug: "tennis-bracelet",
    price: "₹150,000",
    images: [
      { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800" } 
    ],
    description: "A continuous line of diamonds set in white gold. A symbol of eternal elegance.",
    shortDescription: "Continuous line of diamonds set in white gold.",
    sku: "BRA-001",
    categories: [{ id: 104, name: "Bracelets", slug: "bracelets" }],
    attributes: []
  }
];
