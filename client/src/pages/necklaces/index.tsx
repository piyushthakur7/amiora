import CategoryPageLayout, { SubcategoryItem } from "@/components/CategoryPageLayout";

export default function NecklacesPage() {
  const subcategories: SubcategoryItem[] = [
    {
      name: "Chains",
      slug: "/necklaces/chains",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-80-scaled.jpg"
    },
    {
      name: "Pendants",
      slug: "/necklaces/pendants",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-79-scaled.jpg"
    },
    {
      name: "Chokers",
      slug: "/necklaces/chokers",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-75-scaled.jpg"
    },
    {
      name: "Statement",
      slug: "/necklaces/statement",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-78-scaled.jpg"
    }
  ];

  return (
    <CategoryPageLayout
      title="Necklaces"
      description="Discover our stunning collection of necklaces"
      categorySlug="necklaces"
      subcategories={subcategories}
    />
  );
}
