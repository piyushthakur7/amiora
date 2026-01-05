import CategoryPageLayout, { SubcategoryItem } from "@/components/CategoryPageLayout";

export default function BraceletsPage() {
  const subcategories: SubcategoryItem[] = [
    {
      name: "Chain Bracelet",
      slug: "/bracelets-bangles/chain-bracelet",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-23-scaled.jpg"
    },
    {
      name: "Adjustable Bracelet",
      slug: "/bracelets-bangles/adjustable-bracelet",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-23-scaled.jpg"
    },
    {
      name: "Flexible Bracelet",
      slug: "/bracelets-bangles/flexible-bracelet",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-21-scaled.jpg"
    },
    {
      name: "Tennis Bracelet",
      slug: "/bracelets-bangles/tennis-bracelet",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-18-scaled.jpg"
    }
  ];

  return (
    <CategoryPageLayout
      title="Bracelets"
      description="Explore our range of beautifully crafted bracelets"
      categorySlug="bracelets"
      subcategories={subcategories}
    />
  );
}
