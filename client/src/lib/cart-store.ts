import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types/Product';

interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  regularPrice?: number;
  image: string;
  quantity: number;
  sku?: string;
  slug: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find(item => item.productId === product.id);

        if (existingItem) {
          set({
            items: items.map(item =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          const price = parseFloat(String(product.price).replace(/[^\d.]/g, '')) || 0;
          const regularPrice = product.regularPrice
            ? parseFloat(String(product.regularPrice).replace(/[^\d.]/g, ''))
            : undefined;

          set({
            items: [
              ...items,
              {
                id: Date.now(),
                productId: product.id,
                name: product.name,
                price,
                regularPrice,
                image: product.images[0]?.src || '',
                quantity,
                sku: product.sku,
                slug: product.slug
              }
            ]
          });
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter(item => item.id !== id)
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'amiora-cart'
    }
  )
);
