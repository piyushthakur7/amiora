import type { Product } from '@/types/Product';

export const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Diamond Solitaire Ring',
        slug: 'diamond-solitaire-ring',
        price: '5000',
        regularPrice: '6000',
        images: [
            { src: 'https://example.com/ring1.jpg', alt: 'Diamond Ring' },
        ],
        sku: 'DR-001',
        description: 'Beautiful diamond solitaire ring with 18k gold band',
        shortDescription: 'Diamond solitaire ring',
        categories: [{ id: 1, name: 'Rings', slug: 'rings' }],
        onSale: true,
    },
    {
        id: 2,
        name: 'Gold Necklace',
        slug: 'gold-necklace',
        price: '3000',
        regularPrice: '3500',
        images: [
            { src: 'https://example.com/necklace1.jpg', alt: 'Gold Necklace' },
        ],
        sku: 'GN-001',
        description: '22k gold necklace with intricate design',
        shortDescription: 'Gold necklace',
        categories: [{ id: 2, name: 'Necklaces', slug: 'necklaces' }],
        onSale: true,
    },
    {
        id: 3,
        name: 'Pearl Earrings',
        slug: 'pearl-earrings',
        price: '1500',
        images: [
            { src: 'https://example.com/earrings1.jpg', alt: 'Pearl Earrings' },
        ],
        sku: 'PE-001',
        description: 'Elegant pearl drop earrings',
        shortDescription: 'Pearl earrings',
        categories: [{ id: 3, name: 'Earrings', slug: 'earrings' }],
        onSale: false,
    },
    {
        id: 4,
        name: 'Diamond Bangles',
        slug: 'diamond-bangles',
        price: '8000',
        regularPrice: '9000',
        images: [
            { src: 'https://example.com/bangles1.jpg', alt: 'Diamond Bangles' },
        ],
        sku: 'DB-001',
        description: 'Set of 2 diamond-studded gold bangles',
        shortDescription: 'Diamond bangles',
        categories: [{ id: 4, name: 'Bangles', slug: 'bangles' }],
        onSale: true,
    },
    {
        id: 5,
        name: 'Ruby Nosepin',
        slug: 'ruby-nosepin',
        price: '500',
        images: [
            { src: 'https://example.com/nosepin1.jpg', alt: 'Ruby Nosepin' },
        ],
        sku: 'RN-001',
        description: 'Delicate ruby nosepin in gold',
        shortDescription: 'Ruby nosepin',
        categories: [{ id: 5, name: 'Nosepins', slug: 'nosepins' }],
        onSale: false,
    },
];

export const mockUser = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
};

export const mockCartItems = [
    {
        id: 1,
        productId: 1,
        name: 'Diamond Solitaire Ring',
        price: 5000,
        regularPrice: 6000,
        image: 'https://example.com/ring1.jpg',
        quantity: 2,
        sku: 'DR-001',
        slug: 'diamond-solitaire-ring',
    },
    {
        id: 2,
        productId: 2,
        name: 'Gold Necklace',
        price: 3000,
        regularPrice: 3500,
        image: 'https://example.com/necklace1.jpg',
        quantity: 1,
        sku: 'GN-001',
        slug: 'gold-necklace',
    },
];
