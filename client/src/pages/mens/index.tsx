import CategoryPageLayout, { SubcategoryItem } from "@/components/CategoryPageLayout";

export default function MensPage() {
  const subcategories: SubcategoryItem[] = [
    {
      name: "Rings",
      slug: "/mens-collection/rings",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-139-scaled.jpg"
    },
    {
      name: "Studs",
      slug: "/mens-collection/studs",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-284-scaled.jpg"
    },
    {
      name: "Bracelet",
      slug: "/mens-collection/bracelet",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-177-scaled.jpg"
    },
    {
      name: "Kada",
      slug: "/mens-collection/kada",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-174-scaled.jpg"
    },
    {
      name: "Chains",
      slug: "/mens-collection/chains",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-94-scaled.jpg"
    },
    {
      name: "Pendant",
      slug: "/mens-collection/pendant",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-91-scaled.jpg"
    }
  ];

  return (
    <CategoryPageLayout
      title="Men's Collection"
      description="Bold and elegant jewellery crafted for men"
      categorySlug="mens-collection" // Check if this matches categories.json slug
      subcategories={subcategories}
    />
  );
}
