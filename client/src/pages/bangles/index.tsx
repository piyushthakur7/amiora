import CategoryPageLayout, { SubcategoryItem } from "@/components/CategoryPageLayout";

export default function BanglesPage() {
  const subcategories: SubcategoryItem[] = [
    {
      name: "Chain Bracelet",
      slug: "/bracelets-bangles/chain-bracelet",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-171-scaled.jpg"
    },
    {
      name: "Adjustable Bracelet",
      slug: "/bracelets-bangles/adjustable-bracelet",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-180-scaled.jpg"
    },
    {
      name: "Flexible Bracelet",
      slug: "/bracelets-bangles/flexible-bracelet",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-180-scaled.jpg"
    },
    {
      name: "Tennis Bracelet",
      slug: "/bracelets-bangles/tennis-bracelet",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-176-scaled.jpg"
    },
    {
      name: "Daily Wear Bangles",
      slug: "/bracelets-bangles/daily-wear-bangles",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-181-scaled.jpg"
    },
    {
      name: "Bridal Bangles",
      slug: "/bracelets-bangles/bridal-bangles",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-174-scaled.jpg"
    },
    {
      name: "Noya Collection",
      slug: "/bracelets-bangles/noya",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-175-scaled.jpg"
    }
  ];

  return (
    <CategoryPageLayout
      title="Bangles"
      description="Explore our full range of bangles and bracelets"
      categorySlug="bangles"
      subcategories={subcategories}
    />
  );
}
