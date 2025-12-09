# Hill Country Sun

A modern newspaper/magazine website for the Hill Country Sun publication, serving Wimberley and the Texas Hill Country region since 1990.

Built with **Remix**, **Sanity CMS**, and **Tailwind CSS**.

## Features

- **Magazine Archive** - Browse digital editions with Issuu flipbook integration
- **Articles & Blog** - Local news, features, and community stories
  - Multi-select filtering by category, author, and year
  - Full-text search
  - URL-based state for shareable/bookmarkable filter links
  - Pagination with smart page number display
- **Authors Directory** - Browse all writers with dedicated profile pages
- **Events Calendar** - Upcoming events in the Hill Country
- **Regional Guides** - Welcome to Wimberley, River Region Guide, Hunting Guide
- **Contact & Newsletter** - Stay connected with the community
- **Clickable Badges** - Category and author badges link to filtered article views

## Tech Stack

- **Framework**: [Remix](https://remix.run/) with Vite
- **CMS**: [Sanity](https://www.sanity.io/) v3
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Headless UI](https://headlessui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/hill-country-sun.git
   cd hill-country-sun
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your Sanity project credentials:
   ```
   SANITY_PROJECT_ID=your-project-id
   SANITY_DATASET=production
   ```

### Development

Run the Remix development server:
```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Sanity Studio

The Sanity CMS studio is located in the `/sanity` folder.

1. Navigate to the sanity folder:
   ```bash
   cd sanity
   ```

2. Install Sanity dependencies:
   ```bash
   npm install
   ```

3. Update `sanity.config.ts` with your project ID:
   ```typescript
   projectId: 'your-project-id',
   dataset: 'production',
   ```

4. Run the Sanity studio:
   ```bash
   npm run dev
   ```

The studio will be available at [http://localhost:3333](http://localhost:3333).

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
hill-country-sun/
├── app/
│   ├── components/
│   │   ├── layout/        # Header, Footer, MobileMenu
│   │   ├── ui/            # Button, Card, Container, MultiSelect
│   │   ├── home/          # Hero, FeaturedArticles, etc.
│   │   ├── magazine/      # IssueCard, IssuuEmbed
│   │   ├── articles/      # ArticleCard
│   │   └── calendar/      # EventCard
│   ├── routes/            # Page routes
│   ├── lib/               # Utilities, Sanity client, queries
│   ├── root.tsx           # App root
│   └── tailwind.css       # Global styles
├── sanity/
│   ├── schemas/           # Content schemas
│   ├── scripts/           # Migration scripts
│   ├── sanity.config.ts   # Studio configuration
│   └── package.json
├── public/                # Static assets
├── package.json
├── tailwind.config.ts
└── vite.config.ts
```

## Sanity Schemas

- **Article** - Blog posts and news articles
- **Author** - Article authors
- **Category** - Article categories
- **Issue** - Magazine issues with Issuu embed
- **Event** - Calendar events
- **Guide** - Regional guides with sections
- **Site Settings** - Global site configuration

## Data Migration

To migrate mock data to Sanity CMS:

1. Add your Sanity API token to `.env`:
   ```
   SANITY_API_TOKEN=your-api-token
   ```

2. Run the migration script:
   ```bash
   npm run sanity:migrate
   ```

This will upload all mock articles, authors, categories, issues, events, and guides to your Sanity dataset. The script converts HTML content to Portable Text format and uploads images to Sanity's asset pipeline.

## Deployment

### Vercel

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The `vercel.json` file is already configured for Remix.

## Design System

### Colors

- **Primary**: Deep Teal (#1E3A3A) - Trust, nature
- **Secondary**: Warm Tan (#D4A574) - Hill Country earth tones
- **Accent**: Saddle Brown (#8B4513) - Warmth
- **Background**: Warm White (#FEFDFB)
- **Surface**: Warm Gray (#F5F3EF)

### Typography

- **Headings**: Merriweather (serif) - Editorial feel
- **Body**: Inter (sans-serif) - Clean readability

## License

© 2025 Hill Country Sun. All rights reserved.
