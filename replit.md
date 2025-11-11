# Amiora Diamonds - Luxury Jewelry E-Commerce Frontend

## Overview
A stunning React frontend for Amiora Diamonds luxury jewelry e-commerce website, designed to integrate with WordPress and WooCommerce backend via REST API.

## Design Language
- **Visual Style**: Feminine luxury with soft, refined elegance inspired by high-end jewelry brands
- **Color Palette**: 
  - Base: Ivory white, soft beige, champagne tones
  - Accents: Rose gold (#B76E79) for CTAs and highlights
  - Emerald: Deep emerald green for footer and strategic accents
- **Typography**:
  - Headings: Playfair Display (serif, classic elegance)
  - Body: Lato (clean, readable sans-serif)

## Features Implemented

### Core Pages
1. **Home Page**
   - Cinematic hero section with jewelry imagery
   - Shop by Category grid (Rings, Neckwear, Earrings, Wristwear, Bridal, Men's)
   - New Arrivals section
   - Best Sellers section
   - Trust badges (Free Shipping, Easy Exchange, 100% Certified, Lifetime Service)
   - Customer testimonials
   - Dark emerald footer with social links

2. **Shop Page**
   - Complete product catalog with grid layout
   - Smart filtering sidebar (Price range, Metal, Stone, Style, Occasion)
   - Sorting options (Popularity, Price, Newest)
   - Responsive mobile filters
   - Empty states and loading skeletons

3. **Product Detail Page**
   - Large image gallery with thumbnails
   - Product information (price, description, specifications)
   - Quantity selector
   - Add to cart and wishlist buttons
   - Tabbed content (Description, Details, Size Guide, Delivery & Returns)
   - Related products carousel
   - Trust badges and shipping information

4. **Collections Pages**
   - Wedding, Festive, Daily Wear, Gifting, Trending, Personalized
   - Hero banner with collection imagery
   - Product grid for each collection

5. **Category Pages**
   - Rings, Earrings, Neckwear, Wristwear, Men's Jewelry, Bridal, Custom
   - Category-specific product listings

### Components
- **Header**: Two-tier navigation with logo, search, wishlist, cart, and mega menus
- **Footer**: Dark emerald background with quick links, information, contact, and social media
- **ProductCard**: Elegant hover animations, sale badges, quick actions
- **Hero**: Full-screen banner with overlay text and CTA
- **CategoryGrid**: Visual category navigation
- **TrustBadges**: Service promises display
- **Testimonials**: Customer reviews with ratings

## WooCommerce Integration

### Setup Instructions
The frontend is configured to work with WordPress/WooCommerce REST API.

#### Environment Variables Required
Create a `.env` file with the following:

```env
VITE_WC_URL=https://your-wordpress-site.com
VITE_WC_CONSUMER_KEY=ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_WC_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Getting WooCommerce API Credentials
1. Log in to your WordPress admin panel
2. Go to WooCommerce > Settings > Advanced > REST API
3. Click "Add Key"
4. Set Description (e.g., "Amiora Diamonds Frontend")
5. Set User to your admin account
6. Set Permissions to "Read/Write"
7. Click "Generate API Key"
8. Copy the Consumer Key and Consumer Secret

### Demo Mode
Currently running in **demo mode** with sample jewelry products. The frontend will automatically use demo data if WooCommerce credentials are not configured.

### API Integration Features
- Product fetching with filtering and sorting
- Category management
- Real-time inventory status
- Price formatting (₹ INR)
- Image galleries
- Product attributes and variations

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Header.tsx - Two-tier navigation
│   │   ├── Footer.tsx - Dark emerald footer
│   │   ├── Hero.tsx - Cinematic hero section
│   │   ├── ProductCard.tsx - Product display card
│   │   ├── CategoryGrid.tsx - Category navigation
│   │   ├── TrustBadges.tsx - Service promises
│   │   ├── Testimonials.tsx - Customer reviews
│   │   └── ui/ - Shadcn UI components
│   ├── pages/
│   │   ├── Home.tsx - Landing page
│   │   ├── Shop.tsx - Product catalog with filters
│   │   ├── ProductDetail.tsx - Individual product page
│   │   ├── Collection.tsx - Collection pages
│   │   └── Category.tsx - Category pages
│   ├── lib/
│   │   ├── woocommerce.ts - WooCommerce API client
│   │   └── queryClient.ts - React Query configuration
│   └── App.tsx - Main app with routing
shared/
└── schema.ts - TypeScript types for products, categories, cart
```

## Tech Stack
- **Frontend**: React 18 with TypeScript
- **Routing**: Wouter (lightweight router)
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Shadcn UI
- **State Management**: React Query (TanStack Query)
- **API**: WooCommerce REST API v3
- **Fonts**: Playfair Display + Lato (Google Fonts)

## Design Principles
1. **Generous Whitespace**: Luxury feel with breathing room
2. **Elegant Typography**: Serif headings, sans-serif body
3. **Subtle Animations**: Hover effects, gentle transitions
4. **Responsive Design**: Mobile-first approach
5. **Accessibility**: Proper ARIA labels, semantic HTML
6. **Performance**: Lazy loading, optimized images, code splitting

## Running the Project

```bash
npm install
npm run dev
```

The application will be available at the URL provided by Replit.

## Next Steps

### Phase 2: Backend Integration (When ready to connect to actual WooCommerce)
1. Set up WordPress with WooCommerce
2. Configure API credentials in environment variables
3. Test product sync
4. Implement cart persistence
5. Add checkout flow with WooCommerce checkout API

### Phase 3: Advanced Features
1. User authentication with WordPress users
2. Wishlist with local storage persistence
3. Product reviews integration
4. Advanced search with auto-suggestions
5. Order tracking
6. Blog integration
7. Newsletter subscription
8. Multi-language support

## Customization Guide

### Changing Colors
Edit `client/src/index.css` to modify the color palette:
- `--primary`: Rose gold accent color
- `--emerald`: Deep emerald green for footer
- `--background`: Base background color
- `--foreground`: Text color

### Changing Fonts
Fonts are loaded from Google Fonts in `client/index.html`. Update the font-family in `index.css`:
- `--font-serif`: Heading font
- `--font-sans`: Body font

### Adding New Categories/Collections
1. Update category data in respective page components
2. Add category images to `attached_assets/generated_images/`
3. Import and use in CategoryGrid or collection pages

## Notes
- Currency is set to INR (₹) throughout
- Demo products include: rings, necklaces, earrings, bracelets, bridal sets, men's jewelry
- All images are AI-generated luxury jewelry photography
- Fully responsive design for mobile, tablet, and desktop
- Dark mode support included in design system

## Contact
For questions about integrating with your WordPress/WooCommerce backend, refer to the WooCommerce REST API documentation: https://woocommerce.github.io/woocommerce-rest-api-docs/
