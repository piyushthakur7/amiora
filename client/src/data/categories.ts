// client/src/data/categories.ts
export interface CategoryItem {
  name: string;
  slug: string;
  children: string[];
}

export interface CollectionItem {
  name: string;
  slug: string;
}

export const NAV_CATEGORIES: CategoryItem[] = [
  {
    name: "Necklaces",
    slug: "necklaces",
    children: ["Daily Wear", "Solitaire", "Bridal", "Choker", "Y", "Bar", "Adjustable"],
  },
  {
    name: "Nosepins",
    slug: "nosepins",
    children: ["Solitaire", "Designer", "Rings", "Nath"],
  },
  {
    name: "Rings",
    slug: "rings",
    children: ["Daily Wear", "Solitaires", "Bands", "Cocktail", "Platinum"],
  },
  {
    name: "Earrings",
    slug: "earrings",
    children: ["Studs", "Hoops", "Drop / Jhumka"],
  },
  {
    name: "Pendants & Lockets",
    slug: "pendants-lockets",
    children: ["Daily Wear", "Solitaire", "Cluster", "Alphabet"],
  },
  {
    name: "Bracelets",
    slug: "bracelets",
    children: [
      "Chain Bracelet",
      "Adjustable Bracelet",
      "Flexible Bracelet",
      "Tennis Bracelet",
    ],
  },
  {
    name: "Bangles",
    slug: "bangles",
    children: ["Daily-Wear Bangles", "Bridal Bangles", "Noya"],
  },
  {
    name: "Mangalsutra",
    slug: "mangalsutra",
    children: [
      "Mangal Sutra Pendant Chain",
      "Mangal Sutra Bracelet",
      "Solitaire Mangal Sutra",
    ],
  },
  {
    name: "Men's Collection",
    slug: "mens-collection",
    children: ["Rings", "Studs", "Bracelet", "Kada", "Chains", "Pendant"],
  },
  {
    name: "Kids Collection",
    slug: "kids-collection",
    children: ["Rings", "Bracelet / Bangles", "Pendants", "Earrings"],
  },
];

export const NAV_COLLECTIONS: CollectionItem[] = [
  { name: "Wedding", slug: "wedding" },
  { name: "Festive", slug: "festive" },
  { name: "Daily Wear", slug: "daily-wear" },
  { name: "Gifting", slug: "gifting" },
  { name: "Trending", slug: "trending" },
  { name: "Personalized", slug: "personalized" },
];
