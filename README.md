# VIBE - Gen Z Fashion E-commerce Demo

A fully functional demo e-commerce website built with Next.js 14, React, TypeScript, and Tailwind CSS.

## Features Implemented (Phase 1)

### Homepage
- ✅ Announcement bar with rotating text
- ✅ Hero banner slider with collection links
- ✅ Collection tiles
- ✅ Best Sellers and New Arrivals grids with visible prices
- ✅ Brand story section with founder note
- ✅ Social proof numbers (editable from data file)
- ✅ Customer reviews and photos section
- ✅ Email signup form
- ✅ Instagram-style customer gallery

### Shop & Discovery
- ✅ Product filtering (category, price range)
- ✅ Sorting options (featured, newest, price)
- ✅ Quick view and quick add-to-cart
- ✅ Sold-out and low-stock labels
- ✅ Search functionality (UI ready)

### Product Page
- ✅ Multi-image gallery with zoom capability
- ✅ Size selector with size chart pop-up
- ✅ Color variants
- ✅ Fabric, fit and care details (accordion)
- ✅ Fit guide (model info)
- ✅ Customer reviews with ratings
- ✅ Related products ("Complete the look")
- ✅ Back-in-stock notification button
- ✅ Wishlist and share buttons

### Cart & Checkout
- ✅ Slide-out cart drawer
- ✅ Discount code field (UI ready)
- ✅ Guest checkout
- ✅ Multiple payment methods (UPI, cards, net banking, COD)
- ✅ Order confirmation (simulated)

### Customer Features
- ✅ Wishlist functionality
- ✅ Cart management (add, remove, update quantity)
- ✅ Persistent state (localStorage)

### Trust & Support
- ✅ About Us page with brand story
- ✅ Contact page with form
- ✅ FAQ page with accordion
- ✅ Floating WhatsApp chat button
- ✅ All policy pages linked in footer
- ✅ Business details in footer

### Gen Z Design
- ✅ Bold typography
- ✅ Clean layout with ample white space
- ✅ Smooth hover effects and micro-interactions
- ✅ Mobile-first responsive design
- ✅ High-quality placeholder images from Unsplash
- ✅ Casual, confident microcopy

### Technical Features
- ✅ Built with Next.js 14 App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Zustand for state management
- ✅ React Hot Toast for notifications
- ✅ Framer Motion ready for animations
- ✅ Fully responsive design

## Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
clothing-brand-demo/
├── app/                    # Next.js 14 App Router pages
│   ├── about/             # About page
│   ├── checkout/          # Checkout page
│   ├── collections/[id]/  # Dynamic collection pages
│   ├── contact/           # Contact page
│   ├── faq/               # FAQ page
│   ├── product/[id]/      # Dynamic product pages
│   ├── shop/              # Shop all page
│   ├── wishlist/          # Wishlist page
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer with links
│   ├── CartDrawer.tsx     # Slide-out cart
│   └── ProductCard.tsx    # Product card component
├── lib/                   # Utilities and data
│   ├── store.ts           # Zustand state management
│   ├── data.ts            # Demo product data
│   └── utils.ts           # Utility functions
└── README.md              # This file
```

## Key Technologies

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **Lucide React**: Icon library
- **React Hot Toast**: Toast notifications

## Demo Data

All product images, customer reviews, and content are placeholder data from Unsplash and are for demonstration purposes only.

## Customization

### Update Products
Edit `lib/data.ts` to modify products, collections, reviews, and FAQs.

### Update Styling
- Colors and spacing: Edit Tailwind classes in components
- Global styles: Modify `app/globals.css`
- Typography: Update font in `app/layout.tsx`

### Add Real Payment Integration
Replace the simulated payment in `app/checkout/page.tsx` with actual payment gateway (Razorpay, Cashfree, Stripe).

### Add Real Backend
- Replace local state with API calls
- Integrate with a CMS for content management
- Add authentication for customer accounts
- Connect to a real database

## Features Ready for Real Implementation

The following features have UI/UX implemented and are ready to connect to a backend:

1. **User Authentication**: Account pages are linked, ready for auth implementation
2. **Search**: Search bar is present, needs search API integration
3. **Email Newsletter**: Form is ready, needs email service integration
4. **Payment Processing**: Payment selection UI ready for gateway integration
5. **Order Management**: Order history structure ready for backend
6. **Reviews**: Review display ready, needs moderation and submission backend
7. **Inventory Management**: Stock status ready for real-time inventory sync

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This is a demo project for presentation purposes.
