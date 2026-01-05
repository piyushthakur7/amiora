import CategoryPageLayout, { SubcategoryItem } from "@/components/CategoryPageLayout";

export default function KidsPage() {
  const subcategories: SubcategoryItem[] = [
    {
      name: "Rings",
      slug: "/kids-collection/rings",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-121-scaled.jpg"
    },
    {
      name: "Bracelets & Bangles",
      slug: "/kids-collection/bracelets-bangles",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-3-scaled.jpg"
    },
    {
      name: "Pendants",
      slug: "/kids-collection/pendants",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-86-scaled.jpg"
    },
    {
      name: "Earrings",
      slug: "/kids-collection/earrings",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-288-scaled.jpg"
    }
  ];

  return (
    <CategoryPageLayout
      title="Kids Collection"
      description="Jewellery designed especially for kids"
      categorySlug="kids-collection"
      subcategories={subcategories}
    />
  );
}
