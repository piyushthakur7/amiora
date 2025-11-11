# Amiora Diamonds - Luxury Jewelry E-Commerce Design Guidelines

## Design Approach
**Reference-Based:** Inspired by Ethera's aesthetic with feminine luxury, modern elegance, and emotional warmth. Cinematic, high-end jewelry presentation with conversion-focused e-commerce functionality.

## Core Design Elements

### Typography
- **Headings:** Playfair Display or Cormorant Garamond (serif, classic elegance)
- **Body Text:** Lato, Nunito Sans, or Poppins (clean, readable sans-serif)
- **Hierarchy:** Large, graceful headings with generous spacing; clean, legible body text

### Color Palette
- **Base:** Ivory white (#FFFFF0), soft beige (#F5F5DC), champagne tones (#F7E7CE)
- **Accents:** Rose gold (#B76E79) for CTAs and highlights, deep emerald green (#0C4B33) for footer and strategic accents
- **Text:** Charcoal or deep brown for primary content

### Layout System
**Spacing:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32 for consistent rhythm
- Generous whitespace throughout for luxury feel
- Section padding: py-16 to py-32 on desktop, py-12 to py-20 on mobile
- Component spacing: gap-8 to gap-12 for grids, mb-6 to mb-8 for content blocks

## Component Library

### Navigation (Two-Tier Header)
**Top Bar:**
- Logo (left-aligned, elegant script or refined serif)
- Centered search bar: "Search for Diamond Jewellery & More…" with subtle border
- Right-aligned icons: Wishlist ♥, User 👤, Cart 🛒 (rose gold on hover)

**Primary Menu:**
Horizontal navigation: Diamond | Categories | Collections | Daily Wear | Wedding | Gifting | Offer | More
- Mega menu dropdowns with product imagery and elegant grid layout
- Sticky header with smooth scroll transition and subtle shadow
- Mobile: Hamburger menu with elegant slide-in drawer

### Hero Section
**Cinematic Video Background:**
- Full-width hero (80-90vh) with slow-motion jewelry footage
- Soft gradient overlay (ivory to transparent) for text readability
- Centered overlay text with elegant hierarchy:
  - Main headline: "Where Craft Meets Forever" (Playfair Display, large)
  - CTA Button: "Explore Collection" (rose gold, backdrop-blur-md glass effect, no hover interactions)
- Graceful fade-in animations for text elements
- Mobile: Poster image fallback with same overlay treatment

### Product Grids
**Shop by Category (Home):**
- 3-4 column grid on desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- Cards with high-quality product images, subtle shadow on hover
- Elegant image zoom effect on hover (transform scale-105)
- Category name overlay at bottom with gradient background

**Product Listings:**
- Clean grid layout with smart filters sidebar (Price, Metal, Stone, Style, Occasion)
- Each product card: large image, product name, price in rose gold, quick add-to-cart icon
- Sorting dropdown: Popularity, Price, Newness
- Pagination with elegant number styling

### Product Detail Page
**Gallery:**
- Large main image with thumbnail strip below
- Lightbox zoom on click with smooth transitions
- 4-6 product angles minimum

**Product Info Panel:**
- Product name (Playfair Display, large)
- Price (prominent, rose gold accent)
- Availability badge, certification details
- Add to Cart (primary rose gold button), Wishlist, Share icons
- Tabs: Product Details | Size Guide | Reviews | Delivery & Return
- Suggested products carousel below

### Collections Sections
**Layouts:**
- Staggered masonry grid for visual variety
- Featured collection cards with full-width imagery
- Category overlays with elegant typography
- Collections: Wedding, Festive, Daily Wear, Gifting, Trending, Personalized

### Trust Badges (Home Page)
Row of icons with text:
- Free Shipping | Easy Exchange | 100% Certified | Lifetime Service
- Subtle emerald green icons, ivory background, centered layout

### Testimonials
- Clean card-based layout with customer photo (circular), quote, name, rating
- 3-column grid on desktop, carousel on mobile
- Soft shadow, generous padding

### Instagram Feed Preview
- 6-image grid linking to Instagram
- "Follow @AmioraDiamonds" heading
- Hover effect: slight opacity change

### Footer (Dark Emerald Background)
**Layout:** 4-column grid on desktop, stacked on mobile
- **Column 1:** About Our Store (brand intro)
- **Column 2:** Quick Links (Delivery, Track Order, Returns, Find a Store)
- **Column 3:** Information (Blog, FAQs, Privacy, Terms)
- **Column 4:** Contact Us (phone, WhatsApp, social icons)

**Styling:**
- Champagne gold headings
- Light text for readability
- Email subscription box with rose gold submit button
- Payment method icons row at bottom
- Social icons: Instagram, Facebook, LinkedIn, YouTube

### E-Commerce Components
**Cart Icon:** Badge with item count, smooth slide-in cart drawer
**Checkout:** Multi-step with progress indicator, clean form fields
**Payment:** Stripe integration with card icons displayed
**Discount Code:** Input field with rose gold "Apply" button
**Currency:** INR (₹) throughout

## Images
**Hero Section:** Cinematic video of jewelry - close-up diamond sparkle, elegant hand movements, soft lighting (fallback: high-res still image)

**Product Images:** High-quality jewelry photography on ivory/champagne backgrounds, multiple angles, lifestyle shots where appropriate

**Category Cards:** Curated product imagery representing each category

**About/Brand Story:** Craftsmanship imagery, artisan at work, close-up details

**Collection Banners:** Full-width lifestyle imagery showcasing jewelry in context

## Animations
- Minimal, graceful transitions only
- Hero text: gentle fade-in on load
- Product hover: subtle scale and shadow
- Page transitions: smooth fades
- No distracting scroll animations

## Responsive Behavior
- Desktop: Full mega menus, multi-column grids
- Tablet: 2-column layouts, simplified menus
- Mobile: Single column, hamburger menu, touch-optimized spacing, video poster image fallback

## Brand Personality
Elegant, trustworthy, feminine luxury with emotional warmth - every element should feel premium, refined, and intimate.