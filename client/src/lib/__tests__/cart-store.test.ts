import { renderHook, act } from '@testing-library/react';
import { useCart } from '../cart-store';
import type { Product } from '@/types/Product';

describe('Cart Store', () => {
    beforeEach(() => {
        // Clear the cart before each test
        const { result } = renderHook(() => useCart());
        act(() => {
            result.current.clearCart();
        });
    });

    const mockProduct: Product = {
        id: 1,
        name: 'Diamond Ring',
        slug: 'diamond-ring',
        price: '5000',
        regularPrice: '6000',
        images: [{ src: 'https://example.com/ring.jpg', alt: 'Diamond Ring' }],
        sku: 'DR-001',
        description: 'Beautiful diamond ring',
        shortDescription: 'Diamond ring',
        categories: [],
        onSale: true,
    };

    describe('addItem', () => {
        it('should add a new item to the cart', () => {
            const { result } = renderHook(() => useCart());

            act(() => {
                result.current.addItem(mockProduct);
            });

            expect(result.current.items).toHaveLength(1);
            expect(result.current.items[0].name).toBe('Diamond Ring');
            expect(result.current.items[0].quantity).toBe(1);
        });

        it('should add item with custom quantity', () => {
            const { result } = renderHook(() => useCart());

            act(() => {
                result.current.addItem(mockProduct, 3);
            });

            expect(result.current.items[0].quantity).toBe(3);
        });

        it('should increment quantity if item already exists', () => {
            const { result } = renderHook(() => useCart());

            act(() => {
                result.current.addItem(mockProduct, 2);
                result.current.addItem(mockProduct, 1);
            });

            expect(result.current.items).toHaveLength(1);
            expect(result.current.items[0].quantity).toBe(3);
        });

        it('should parse price correctly', () => {
            const { result } = renderHook(() => useCart());

            act(() => {
                result.current.addItem(mockProduct);
            });

            expect(result.current.items[0].price).toBe(5000);
            expect(result.current.items[0].regularPrice).toBe(6000);
        });
    });

    describe('removeItem', () => {
        it('should remove item from cart', () => {
            const { result } = renderHook(() => useCart());

            act(() => {
                result.current.addItem(mockProduct);
            });

            const itemId = result.current.items[0].id;

            act(() => {
                result.current.removeItem(itemId);
            });

            expect(result.current.items).toHaveLength(0);
        });

        it('should not affect other items when removing', () => {
            const { result } = renderHook(() => useCart());
            const product2 = { ...mockProduct, id: 2, name: 'Gold Necklace' };

            act(() => {
                result.current.addItem(mockProduct);
                result.current.addItem(product2);
            });

            const firstItemId = result.current.items[0].id;

            act(() => {
                result.current.removeItem(firstItemId);
            });

            expect(result.current.items).toHaveLength(1);
            expect(result.current.items[0].name).toBe('Gold Necklace');
        });
    });

    describe('updateQuantity', () => {
        it('should update item quantity', () => {
            const { result } = renderHook(() => useCart());

            act(() => {
                result.current.addItem(mockProduct, 1);
            });

            const itemId = result.current.items[0].id;

            act(() => {
                result.current.updateQuantity(itemId, 5);
            });

            expect(result.current.items[0].quantity).toBe(5);
        });

        it('should remove item if quantity is 0 or less', () => {
            const { result } = renderHook(() => useCart());

            act(() => {
                result.current.addItem(mockProduct, 2);
            });

            const itemId = result.current.items[0].id;

            act(() => {
                result.current.updateQuantity(itemId, 0);
            });

            expect(result.current.items).toHaveLength(0);
        });
    });

    describe('clearCart', () => {
        it('should remove all items from cart', () => {
            const { result } = renderHook(() => useCart());

            act(() => {
                result.current.addItem(mockProduct);
                result.current.addItem({ ...mockProduct, id: 2 });
                result.current.addItem({ ...mockProduct, id: 3 });
            });

            expect(result.current.items).toHaveLength(3);

            act(() => {
                result.current.clearCart();
            });

            expect(result.current.items).toHaveLength(0);
        });
    });

    describe('getTotalItems', () => {
        it('should return total number of items', () => {
            const { result } = renderHook(() => useCart());

            act(() => {
                result.current.addItem(mockProduct, 2);
                result.current.addItem({ ...mockProduct, id: 2 }, 3);
            });

            expect(result.current.getTotalItems()).toBe(5);
        });

        it('should return 0 for empty cart', () => {
            const { result } = renderHook(() => useCart());

            expect(result.current.getTotalItems()).toBe(0);
        });
    });

    describe('getSubtotal', () => {
        it('should calculate correct subtotal', () => {
            const { result } = renderHook(() => useCart());

            act(() => {
                result.current.addItem(mockProduct, 2); // 5000 * 2 = 10000
            });

            expect(result.current.getSubtotal()).toBe(10000);
        });

        it('should calculate subtotal for multiple items', () => {
            const { result } = renderHook(() => useCart());
            const product2 = { ...mockProduct, id: 2, price: '3000' };

            act(() => {
                result.current.addItem(mockProduct, 1); // 5000
                result.current.addItem(product2, 2); // 3000 * 2 = 6000
            });

            expect(result.current.getSubtotal()).toBe(11000);
        });

        it('should return 0 for empty cart', () => {
            const { result } = renderHook(() => useCart());

            expect(result.current.getSubtotal()).toBe(0);
        });
    });
});
