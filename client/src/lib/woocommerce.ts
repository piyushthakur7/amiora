import type { Product, Category } from "@shared/schema";

const WC_URL = import.meta.env.VITE_WC_URL || '';
const WC_CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY || '';
const WC_CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET || '';

const isDemoMode = !WC_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET;

export async function fetchProducts(params?: {
  category?: string;
  perPage?: number;
  page?: number;
  orderby?: string;
  order?: 'asc' | 'desc';
  onSale?: boolean;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}): Promise<Product[]> {
  if (isDemoMode) {
    return getDemoProducts();
  }

  const queryParams = new URLSearchParams();
  if (params?.category) queryParams.append('category', params.category);
  if (params?.perPage) queryParams.append('per_page', params.perPage.toString());
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.orderby) queryParams.append('orderby', params.orderby);
  if (params?.order) queryParams.append('order', params.order);
  if (params?.onSale) queryParams.append('on_sale', 'true');
  if (params?.featured) queryParams.append('featured', 'true');
  if (params?.minPrice) queryParams.append('min_price', params.minPrice.toString());
  if (params?.maxPrice) queryParams.append('max_price', params.maxPrice.toString());
  if (params?.search) queryParams.append('search', params.search);

  const response = await fetch(
    `${WC_URL}/wp-json/wc/v3/products?${queryParams}&consumer_key=${WC_CONSUMER_KEY}&consumer_secret=${WC_CONSUMER_SECRET}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
}

export async function fetchProduct(id: number): Promise<Product> {
  if (isDemoMode) {
    const products = getDemoProducts();
    const product = products.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  }

  const response = await fetch(
    `${WC_URL}/wp-json/wc/v3/products/${id}?consumer_key=${WC_CONSUMER_KEY}&consumer_secret=${WC_CONSUMER_SECRET}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  return response.json();
}

export async function fetchCategories(): Promise<Category[]> {
  if (isDemoMode) {
    return getDemoCategories();
  }

  const response = await fetch(
    `${WC_URL}/wp-json/wc/v3/products/categories?consumer_key=${WC_CONSUMER_KEY}&consumer_secret=${WC_CONSUMER_SECRET}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
}

function getDemoProducts(): Product[] {
  return [
    {
      id: 1,
      name: "Eternal Brilliance Diamond Ring",
      slug: "eternal-brilliance-diamond-ring",
      price: "₹125,000",
      regularPrice: "₹145,000",
      salePrice: "₹125,000",
      onSale: true,
      shortDescription: "Exquisite solitaire diamond ring in 18K white gold",
      description: "A timeless masterpiece featuring a brilliant-cut diamond set in platinum, perfect for engagements and special occasions.",
      images: [
        { id: 1, src: "/assets/generated_images/Diamond_ring_hero_image_34710d71.png", alt: "Diamond Ring" }
      ],
      categories: [{ id: 1, name: "Rings", slug: "rings" }],
      stockStatus: "instock",
      stockQuantity: 5,
      sku: "DR-001",
      attributes: [
        { id: 1, name: "Metal", options: ["White Gold", "Platinum"] },
        { id: 2, name: "Stone", options: ["Diamond"] }
      ]
    },
    {
      id: 2,
      name: "Rose Gold Diamond Necklace",
      slug: "rose-gold-diamond-necklace",
      price: "₹95,000",
      shortDescription: "Elegant diamond pendant in rose gold",
      description: "A stunning necklace featuring a delicate diamond pendant in 18K rose gold, perfect for everyday elegance.",
      images: [
        { id: 2, src: "/assets/generated_images/Gold_necklace_product_12d0663a.png", alt: "Rose Gold Necklace" }
      ],
      categories: [{ id: 2, name: "Neckwear", slug: "neckwear" }],
      stockStatus: "instock",
      sku: "NK-002"
    },
    {
      id: 3,
      name: "Diamond Stud Earrings",
      slug: "diamond-stud-earrings",
      price: "₹65,000",
      shortDescription: "Classic diamond studs in white gold",
      description: "Timeless elegance with these brilliant-cut diamond stud earrings set in 18K white gold.",
      images: [
        { id: 3, src: "/assets/generated_images/Diamond_earrings_product_c3def0c1.png", alt: "Diamond Earrings" }
      ],
      categories: [{ id: 3, name: "Earrings", slug: "earrings" }],
      stockStatus: "instock",
      sku: "ER-003"
    },
    {
      id: 4,
      name: "Delicate Rose Gold Bracelet",
      slug: "delicate-rose-gold-bracelet",
      price: "₹45,000",
      regularPrice: "₹55,000",
      salePrice: "₹45,000",
      onSale: true,
      shortDescription: "Feminine rose gold bracelet with diamonds",
      description: "A delicate bracelet adorned with small diamonds, crafted in rose gold for everyday luxury.",
      images: [
        { id: 4, src: "/assets/generated_images/Rose_gold_bracelet_781a6a9b.png", alt: "Rose Gold Bracelet" }
      ],
      categories: [{ id: 4, name: "Wristwear", slug: "wristwear" }],
      stockStatus: "instock",
      sku: "BR-004"
    },
    {
      id: 5,
      name: "Bridal Jewelry Set",
      slug: "bridal-jewelry-set",
      price: "₹285,000",
      shortDescription: "Complete bridal set with ring, necklace, and earrings",
      description: "An exquisite bridal collection featuring a diamond ring, matching necklace, and earrings in platinum.",
      images: [
        { id: 5, src: "/assets/generated_images/Bridal_jewelry_collection_67832531.png", alt: "Bridal Set" }
      ],
      categories: [{ id: 5, name: "Bridal", slug: "bridal" }],
      stockStatus: "instock",
      sku: "BS-005"
    },
    {
      id: 6,
      name: "Platinum Men's Wedding Band",
      slug: "platinum-mens-wedding-band",
      price: "₹55,000",
      shortDescription: "Sophisticated platinum wedding band for men",
      description: "A timeless platinum wedding band with a brushed finish, perfect for the modern gentleman.",
      images: [
        { id: 6, src: "/assets/generated_images/Men's_wedding_band_96c51b11.png", alt: "Men's Wedding Band" }
      ],
      categories: [{ id: 6, name: "Men's Jewelry", slug: "mens-jewelry" }],
      stockStatus: "instock",
      sku: "MB-006"
    }
  ];
}

function getDemoCategories(): Category[] {
  return [
    { id: 1, name: "Rings", slug: "rings", count: 24 },
    { id: 2, name: "Neckwear", slug: "neckwear", count: 18 },
    { id: 3, name: "Earrings", slug: "earrings", count: 32 },
    { id: 4, name: "Wristwear", slug: "wristwear", count: 15 },
    { id: 5, name: "Bridal", slug: "bridal", count: 12 },
    { id: 6, name: "Men's Jewelry", slug: "mens-jewelry", count: 8 },
    { id: 7, name: "Custom Jewelry", slug: "custom", count: 6 }
  ];
}
