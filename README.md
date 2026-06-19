# My Portfolio

> **Who said I can't do UI?**

![Landing Page](/public/images/portfolio/portfolio.png)

## Overview

This is an **interactive 3D voxel world** built from scratch.

The wolf you see was modeled in Blender, optimized for the web, and rendered in real-time using WebGL.

### Features

- **3D Voxel Environment** - Complete desk setup with a working monitor
- **Vim Simulation** - The screen displays an animated Vim editor (yes, really)
- **Seasonal Effects** - Snow in winter, sakura in spring, leaves in autumn and lack of idea for the summer
- **Dark/Light Mode** - System preference detection with smooth transitions
- **Responsive Design** - Works on desktop and mobile
- **Markdown Projects** - Easy-to-update project pages with custom Lucide icon syntax
- **Performance Optimized** - Instanced meshes, throttled rendering and more

## You want it yourself?

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repo 
git clone https://github.com/szymonwilczek/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

```env
# GitHub (for contributions heatmap)
GITHUB_TOKEN=your_github_token

# Spotify (for now playing widget)
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token

# WakaTime (for coding stats)
WAKATIME_API_KEY=your_api_key
```

## Custom Lucide Icons in Markdown

This project includes a custom remark plugin for using Lucide icons directly in markdown:

```markdown
### :icon[ShoppingCart]{.text-orange-500 .inline-block .mr-2} Feature Title
```

Supports any Lucide icon with Tailwind classes!

## 🐺 About the Wolf

His name is Simon. He's made of polygons. No, you cannot pet him.


## License

MIT License - feel free to use this as inspiration for your own portfolio!

---

*Built with plenty of tea by [Szymon Wilczek](https://github.com/szymonwilczek)*
