# DeepFabric Community Site

DeepFabric Community Site - built with Next.js 15, TypeScript, and Tailwind CSS.

## Getting Started

### Want to write blog?

We would love that! Let us know in discord https://discord.com/invite/pPcjYzGvbS

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

## Customization

### Adding Blog Posts

Create a new `.md` file in `content/blog/`:

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

### Adding Images to Blog Posts

Place images in the `/public` folder, then reference them in markdown:

```markdown
![Alt text description](/image-name.png)
```

#### Image Sizing

Control image size using the syntax `![Alt text|size](/image.png)`:

**Preset sizes:**
| Syntax | Result |
|--------|--------|
| `![Description\|small](/img.png)` | 25% width |
| `![Description\|medium](/img.png)` | 50% width |
| `![Description\|large](/img.png)` | 75% width |
| `![Description\|full](/img.png)` | 100% width (default) |
| `![Description\|center](/img.png)` | 50% width, centered |

**Percentage sizes:**
```markdown
![Diagram|25%](/diagram.png)
![Screenshot|50%](/screenshot.png)
![Chart|75%](/chart.png)
```

**Pixel sizes:**
```markdown
![Logo|300px](/logo.png)
![Banner|500px](/banner.png)
```

The alt text (before the `|`) will be displayed as a caption below the image.
