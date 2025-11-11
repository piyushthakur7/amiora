import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  price: z.string(),
  regularPrice: z.string().optional(),
  salePrice: z.string().optional(),
  onSale: z.boolean().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  images: z.array(z.object({
    id: z.number(),
    src: z.string(),
    alt: z.string().optional(),
  })),
  categories: z.array(z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
  })),
  attributes: z.array(z.object({
    id: z.number(),
    name: z.string(),
    options: z.array(z.string()),
  })).optional(),
  stockStatus: z.string().optional(),
  stockQuantity: z.number().nullable().optional(),
  sku: z.string().optional(),
  tags: z.array(z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
  })).optional(),
});

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  image: z.object({
    id: z.number().optional(),
    src: z.string().optional(),
    alt: z.string().optional(),
  }).optional(),
  count: z.number().optional(),
  parent: z.number().optional(),
});

export const cartItemSchema = z.object({
  id: z.number(),
  productId: z.number(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  image: z.string(),
  sku: z.string().optional(),
});

export const orderSchema = z.object({
  id: z.number().optional(),
  billing: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address1: z.string(),
    address2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postcode: z.string(),
    country: z.string(),
  }),
  shipping: z.object({
    firstName: z.string(),
    lastName: z.string(),
    address1: z.string(),
    address2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postcode: z.string(),
    country: z.string(),
  }).optional(),
  lineItems: z.array(z.object({
    productId: z.number(),
    quantity: z.number(),
  })),
  paymentMethod: z.string().optional(),
  total: z.string(),
});

export type Product = z.infer<typeof productSchema>;
export type Category = z.infer<typeof categorySchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type Order = z.infer<typeof orderSchema>;

export const filterOptionsSchema = z.object({
  priceRange: z.object({
    min: z.number(),
    max: z.number(),
  }).optional(),
  metal: z.array(z.string()).optional(),
  stone: z.array(z.string()).optional(),
  style: z.array(z.string()).optional(),
  occasion: z.array(z.string()).optional(),
  category: z.string().optional(),
  sortBy: z.enum(['popularity', 'price-asc', 'price-desc', 'newest']).optional(),
});

export type FilterOptions = z.infer<typeof filterOptionsSchema>;
