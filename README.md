# DeepFabric

A retro-futuristic arcade-themed static website built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Arcade/Space Theme**: Neon colors, pixel fonts, and cosmic vibes
- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Static Export**: Deploy anywhere with full SSG
- **Blog System**: Full markdown support with code syntax highlighting
- **Responsive Design**: Mobile-first, works on all devices
- **Animated Elements**: Floating spacemen, twinkling stars, neon glows

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
# Create static export
npm run build

# The static files will be in the 'out' directory
```

## Project Structure

```
deepfabric-site/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with StarField
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── blog/              # Blog pages
│   ├── community/         # Community page
│   └── docs/              # Documentation page
├── components/            # Reusable components
│   ├── ArcadeButton.tsx   # Neon button component
│   ├── ArcadeCard.tsx     # Glowing card component
│   ├── CodeBlock.tsx      # Syntax-highlighted code
│   ├── Footer.tsx         # Site footer
│   ├── Header.tsx         # Navigation header
│   ├── SectionTitle.tsx   # Styled section headers
│   ├── SpacemanFloat.tsx  # Animated spaceman
│   └── StarField.tsx      # Canvas starfield background
├── content/
│   └── blog/              # MDX blog posts
├── lib/
│   ├── blog.ts            # Blog utilities
│   └── markdown.ts        # Markdown processing
├── spaceman/              # Spaceman character images
└── public/                # Static assets
```

## Technology Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Markdown**: MDX with react-markdown
- **Date Handling**: date-fns
- **Syntax Highlighting**: Shiki

## Color Palette

- **Neon Cyan**: `#06FFF0` - Primary accent
- **Neon Pink**: `#FF006E` - Secondary accent
- **Neon Purple**: `#8338EC` - Tertiary accent
- **Neon Blue**: `#3A86FF` - Additional accent
- **Space Dark**: `#0A0E27` - Background
- **Space Darker**: `#050814` - Deeper background

## Customization

### Adding Blog Posts

Create a new `.mdx` file in `content/blog/`:

```markdown
---
title: "Your Post Title"
date: "2025-01-15"
author: "Your Name"
description: "Post description"
tags: ["tag1", "tag2"]
---

# Your content here
```

### Modifying Theme

Edit `tailwind.config.ts` to customize colors, fonts, and animations.

## Deployment

The site is configured for static export and can be deployed to:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop the `out` folder
- **GitHub Pages**: Push the `out` folder to `gh-pages` branch
- **Any static host**: Upload the `out` folder

## License

Open source project - feel free to use and modify!

## Contributing

Contributions are welcome! Check out the [Community page](/community) for guidelines.

---

Built with cosmic vibes by the DeepFabric crew
