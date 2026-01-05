import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '../Home';

// Mock components
jest.mock('@/components/Hero', () => ({
    Hero: () => <div data-testid="hero">Hero Component</div>,
}));

jest.mock('@/components/CategoryGrid', () => ({
    CategoryGrid: () => <div data-testid="category-grid">Category Grid</div>,
}));

jest.mock('@/components/ProductCard', () => ({
    ProductCard: ({ product }: any) => (
        <div data-testid={`product-${product.id}`}>{product.name}</div>
    ),
}));

jest.mock('@/components/TrustBadges', () => ({
    TrustBadges: () => <div data-testid="trust-badges">Trust Badges</div>,
}));

jest.mock('@/components/Testimonials', () => ({
    Testimonials: () => <div data-testid="testimonials">Testimonials</div>,
}));

jest.mock('@/components/InstagramFeed', () => ({
    InstagramFeed: () => <div data-testid="instagram-feed">Instagram Feed</div>,
}));

jest.mock('@/components/SectionDivider', () => ({
    SectionDivider: () => <div data-testid="section-divider">Divider</div>,
}));

jest.mock('@/components/Pre', () => ({
    Preloader: () => <div data-testid="preloader">Loading...</div>,
}));

jest.mock('wouter', () => ({
    Link: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// Mock WooCommerce API
jest.mock('@/lib/woocommerce', () => ({
    getProducts: jest.fn(() =>
        Promise.resolve([
            {
                id: 1,
                name: 'Diamond Ring',
                slug: 'diamond-ring',
                price: '5000',
                images: [{ src: 'test.jpg', alt: 'Ring' }],
            },
            {
                id: 2,
                name: 'Gold Necklace',
                slug: 'gold-necklace',
                price: '3000',
                images: [{ src: 'test2.jpg', alt: 'Necklace' }],
            },
        ])
    ),
}));

const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

describe('Home Page', () => {
    it('should render all main sections', async () => {
        const queryClient = createTestQueryClient();

        render(
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        );

        // Check for main sections
        expect(screen.getByTestId('hero')).toBeInTheDocument();
        expect(screen.getByTestId('category-grid')).toBeInTheDocument();
        expect(screen.getByTestId('trust-badges')).toBeInTheDocument();
        expect(screen.getByTestId('testimonials')).toBeInTheDocument();
        expect(screen.getByTestId('instagram-feed')).toBeInTheDocument();
    });

    it('should render brand narrative section', () => {
        const queryClient = createTestQueryClient();

        render(
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        );

        expect(screen.getByText(/Timeless Elegance/i)).toBeInTheDocument();
    });

    it('should render new arrivals section', async () => {
        const queryClient = createTestQueryClient();

        render(
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        );

        expect(screen.getByText(/New Arrivals/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByTestId('product-1')).toBeInTheDocument();
        });
    });

    it('should render best sellers section', async () => {
        const queryClient = createTestQueryClient();

        render(
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        );

        expect(screen.getByText(/Most Loved/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByTestId('product-2')).toBeInTheDocument();
        });
    });

    it('should render Royal Collection feature banner', () => {
        const queryClient = createTestQueryClient();

        render(
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        );

        expect(screen.getByText(/The Royal Collection/i)).toBeInTheDocument();
        expect(screen.getByText(/Exquisite Craftsmanship/i)).toBeInTheDocument();
    });

    it('should set correct page title', () => {
        const queryClient = createTestQueryClient();

        render(
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        );

        expect(document.title).toContain('Amiora Diamonds');
    });
});
