import CategoryPageLayout, { SubcategoryItem } from "@/components/CategoryPageLayout";

export default function NosepinsPage() {
  const defaultImage = "https://darkgray-rail-803191.hostingersite.com/wp-content/uploads/2025/11/ADJUSTABLE-AND-CHAIN-Brecelet-merged-images-185-scaled.jpg";

  const subcategories: SubcategoryItem[] = [
    {
      name: "Solitaire",
      slug: "/nosepin/solitaire",
      image: defaultImage
    },
    {
      name: "Designer",
      slug: "/nosepin/designer",
      image: defaultImage
    },
    {
      name: "Rings",
      slug: "/nosepin/rings",
      image: defaultImage
    },
    {
      name: "Nathi",
      slug: "/nosepin/nathi",
      image: defaultImage
    }
  ];

  return (
    <CategoryPageLayout
      title="Nosepins"
      description="Elegant nosepins crafted for every style"
      categorySlug="nosepin"
      subcategories={subcategories}
    />
  );
}
