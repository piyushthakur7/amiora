import CategoryPageLayout, { SubcategoryItem } from "@/components/CategoryPageLayout";

export default function EarringsPage() {
  const subcategories: SubcategoryItem[] = [
    {
      name: "Studs",
      slug: "/earrings/studs",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-287-scaled.jpg"
    },
    {
      name: "Hoops",
      slug: "/earrings/hoops",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-279-scaled.jpg"
    },
    {
      name: "Drop & Jhumka",
      slug: "/earrings/drop-jhumka",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-284-scaled.jpg"
    }
  ];

  return (
    <CategoryPageLayout
      title="Earrings"
      description="Elegant earrings for every occasion"
      categorySlug="earrings"
      subcategories={subcategories}
    />
  );
}
