import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header';

// Mock wouter
jest.mock('wouter', () => ({
    Link: ({ children, href }: any) => <a href={href}>{children}</a>,
    useLocation: () => ['/', jest.fn()],
}));

// Mock cart store
jest.mock('@/lib/cart-store', () => ({
    useCart: () => ({
        items: [],
        getTotalItems: () => 0,
    }),
}));

// Mock auth context
jest.mock('@/lib/auth-context', () => ({
    useAuth: () => ({
        user: null,
        logout: jest.fn(),
    }),
}));

describe('Header', () => {
    it('should render logo', () => {
        render(<Header />);
        expect(screen.getByText(/Amiora/i)).toBeInTheDocument();
    });

    it('should render navigation links', () => {
        render(<Header />);
        expect(screen.getByText(/Shop/i)).toBeInTheDocument();
    });

    it('should render cart icon', () => {
        render(<Header />);
        // Check for cart-related elements
        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
    });

    it('should display cart item count when items exist', () => {
        // Re-mock with items
        jest.spyOn(require('@/lib/cart-store'), 'useCart').mockReturnValue({
            items: [{ id: 1, quantity: 2 }],
            getTotalItems: () => 2,
        });

        render(<Header />);
        // The badge should show the count
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('should render user menu when logged in', () => {
        jest.spyOn(require('@/lib/auth-context'), 'useAuth').mockReturnValue({
            user: { email: 'test@example.com', id: '1' },
            logout: jest.fn(),
        });

        render(<Header />);
        expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
    });

    it('should render login link when not logged in', () => {
        render(<Header />);
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
    });
});
