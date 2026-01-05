import { render, screen } from '@testing-library/react';
import { ProductCard } from '../ProductCard';
import type { Product } from '@/types/Product';
import { BrowserRouter } from 'react-router-dom';

// Mock the cart store
jest.mock('@/lib/cart-store', () => ({
    useCart: () => ({
        addItem: jest.fn(),
    }),
}));

// Mock wouter
jest.mock('wouter', () => ({
    Link: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

const mockProduct: Product = {
    id: 1,
    name: 'Diamond Ring',
    slug: 'diamond-ring',
    price: '5000',
    regularPrice: '6000',
    images: [
        { src: 'https://example.com/ring.jpg', alt: 'Diamond Ring' },
    ],
    sku: 'DR-001',
    description: 'Beautiful diamond ring',
    shortDescription: 'Diamond ring',
    categories: [],
    stockStatus: 'instock',
    onSale: true,
};

describe('ProductCard', () => {
    it('should render product name', () => {
        render(<ProductCard product={mockProduct} />);
        expect(screen.getByText('Diamond Ring')).toBeInTheDocument();
    });

    it('should render product image', () => {
        render(<ProductCard product={mockProduct} />);
        const image = screen.getByAltText('Diamond Ring');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'https://example.com/ring.jpg');
    });

    it('should render sale price when on sale', () => {
        render(<ProductCard product={mockProduct} />);
        expect(screen.getByText(/5000/)).toBeInTheDocument();
    });

    it('should render regular price when on sale', () => {
        render(<ProductCard product={mockProduct} />);
        expect(screen.getByText(/6000/)).toBeInTheDocument();
    });

    it('should render only price when not on sale', () => {
        const productNotOnSale = { ...mockProduct, onSale: false, regularPrice: undefined };
        render(<ProductCard product={productNotOnSale} />);
        expect(screen.getByText(/5000/)).toBeInTheDocument();
    });

    it('should have link to product detail page', () => {
        render(<ProductCard product={mockProduct} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/product/diamond-ring');
    });

    it('should render fallback image when no images provided', () => {
        const productNoImage = { ...mockProduct, images: [] };
        render(<ProductCard product={productNoImage} />);
        const image = screen.getByAltText('Diamond Ring');
        expect(image).toBeInTheDocument();
    });
});
