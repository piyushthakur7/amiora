export interface Product {
  id: number;
  name: string;
  price: string;
  images: {
    src: string;
  }[];
  description?: string;
  short_description?: string;
}
