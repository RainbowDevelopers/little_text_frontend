# LittleText Frontend

A premium, minimalist blogging platform frontend built with Next.js 14+, TypeScript, and Tailwind CSS. Inspired by Apple's design philosophy: clean, spacious, and sophisticated.

## Features

- **Modern Stack**: Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Premium Design**: Apple-inspired minimalist aesthetic with grayscale palette
- **Responsive**: Fully responsive design that works on all devices
- **Blog Components**: Complete set of blog components (PostCard, PostGrid, PostHero, RichContent)
- **Form Handling**: Contact forms with validation using React Hook Form and Zod
- **API Integration**: Ready-to-use API client for backend integration
- **Animations**: Smooth animations with Framer Motion
- **Icons**: Lucide React icons for clean, minimal iconography

## Design System

### Color Palette (Grayscale Only)
- Black: `#000000`
- White: `#FFFFFF`
- Gray 50: `#FAFAFA`
- Gray 100: `#F5F5F5`
- Gray 200: `#E5E5E5`
- Gray 400: `#A3A3A3`
- Gray 600: `#525252`
- Gray 900: `#171717`

### Typography
- Font Family: System fonts (`-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI"`)
- Spacing: 8px base unit
- Font Weights: 300, 400, 500, 600, 700

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Homepage
│   ├── posts/
│   │   ├── page.tsx       # Posts list
│   │   └── [slug]/page.tsx # Single post
│   ├── about/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   ├── blog/              # Blog-specific components
│   │   ├── PostCard.tsx
│   │   ├── PostGrid.tsx
│   │   ├── PostHero.tsx
│   │   └── RichContent.tsx
│   └── ui/                # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
└── lib/
    ├── api.ts             # API client
    ├── types.ts           # TypeScript types
    └── utils.ts           # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see backend setup)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.local.example .env.local
```

3. Update the API URL in `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

Build for production:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Pages

### Homepage (`/`)
- Hero section with large headline and CTAs
- Featured posts grid (6 posts)
- About teaser section

### Posts List (`/posts`)
- Grid layout showing all posts
- Pagination
- Responsive 3-column grid (1 on mobile, 2 on tablet, 3 on desktop)

### Single Post (`/posts/[slug]`)
- Post hero with featured image, title, author, and metadata
- Rich content with proper typography
- Related posts section
- Tags display

### About (`/about`)
- Mission statement
- Values cards
- Story section

### Contact (`/contact`)
- Contact form with validation
- Email and response time info
- Success/error states

## API Integration

The app uses a centralized API client (`src/lib/api.ts`) with the following endpoints:

- `postsAPI.getAll()` - Get all posts with pagination
- `postsAPI.getFeatured()` - Get featured posts
- `postsAPI.getBySlug()` - Get single post by slug
- `postsAPI.getRelated()` - Get related posts
- `categoriesAPI.getAll()` - Get all categories
- `contactAPI.submit()` - Submit contact form

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright © 2025 LittleText. All rights reserved.
