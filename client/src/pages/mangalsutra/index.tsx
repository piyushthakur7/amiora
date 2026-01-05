import CategoryPageLayout, { SubcategoryItem } from "@/components/CategoryPageLayout";

export default function MangalsutraPage() {
  const subcategories: SubcategoryItem[] = [
    {
      name: "Pendant",
      slug: "/mangalsutra/mangalsutra-pendant",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-227-scaled.jpg"
    },
    {
      name: "Chain",
      slug: "/mangalsutra/mangalsutra-chain",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-226-scaled.jpg"
    },
    {
      name: "Bracelet",
      slug: "/mangalsutra/mangalsutra-bracelet",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-225-scaled.jpg"
    },
    {
      name: "Solitaire",
      slug: "/mangalsutra/solitaire-mangalsutra",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-223-scaled.jpg"
    }
  ];

  return (
    <CategoryPageLayout
      title="Mangalsutra"
      description="Timeless and elegant mangalsutra designs"
      categorySlug="mangalsutra"
      subcategories={subcategories}
    />
  );
}
