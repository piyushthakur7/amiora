import CategoryPageLayout, { SubcategoryItem } from "@/components/CategoryPageLayout";

export default function RingsPage() {
  const subcategories: SubcategoryItem[] = [
    {
      name: "Bands",
      slug: "/rings/bands",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-160-scaled.jpg"
    },
    {
      name: "Cocktail Rings",
      slug: "/rings/cocktail",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-134-scaled.jpg"
    },
    {
      name: "Daily Wear Rings",
      slug: "/rings/daily-wear",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-150-scaled.jpg"
    },
    {
      name: "Platinum Rings",
      slug: "/rings/platinum",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/Platinum-rings_page-0003.jpg"
    },
    {
      name: "Solitaire Rings",
      slug: "/rings/solitaire",
      image: "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-159-scaled.jpg"
    }
  ];

  return (
    <CategoryPageLayout
      title="Rings"
      description="Explore our curated selection of rings"
      categorySlug="rings"
      subcategories={subcategories}
    />
  );
}
