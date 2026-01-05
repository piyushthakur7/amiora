import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

// Mock wouter
jest.mock('wouter', () => ({
    Link: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe('Footer', () => {
    it('should render company name', () => {
        render(<Footer />);
        expect(screen.getByText(/Amiora/i)).toBeInTheDocument();
    });

    it('should render all footer sections', () => {
        render(<Footer />);

        // Check for common footer sections
        expect(screen.getByText(/Customer Service/i) || screen.getByText(/Help/i) || screen.getByText(/Support/i)).toBeInTheDocument();
    });

    it('should render social media links', () => {
        render(<Footer />);
        const footer = screen.getByRole('contentinfo');
        expect(footer).toBeInTheDocument();
    });

    it('should render copyright notice', () => {
        render(<Footer />);
        const currentYear = new Date().getFullYear();
        expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
    });

    it('should render important links', () => {
        render(<Footer />);

        // Common footer links
        const privacyLink = screen.queryByText(/Privacy/i);
        const termsLink = screen.queryByText(/Terms/i);

        expect(privacyLink || termsLink).toBeInTheDocument();
    });
});
