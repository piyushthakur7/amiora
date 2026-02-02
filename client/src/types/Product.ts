export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regularPrice?: string;
  onSale?: boolean;
  stockStatus?: string;
  images: {
    src: string;
    alt?: string;
  }[];
  description?: string;
  shortDescription?: string;
  sku?: string;
  categories?: {
    id: number;
    name: string;
    slug: string;
  }[];
  attributes?: {
    id: number;
    name: string;
    options: string[];
  }[];
}
