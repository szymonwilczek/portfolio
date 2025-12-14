# 🐺 My Portfolio

> **An over-engineered 3D voxel portfolio that nobody asked for, but everyone deserves.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-szymon--wilczek.me-blue?style=for-the-badge)](https://szymon-wilczek.me)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React Three Fiber](https://img.shields.io/badge/R3F-Three.js-orange?style=for-the-badge)](https://docs.pmnd.rs/react-three-fiber)

---

![Landing Page](/public/images/portfolio/portfolio.png)

## 🎮 What Is This?

This is not your typical developer portfolio with a hero section, grid of cards, and a contact form that goes to `/dev/null`.

This is a **fully interactive 3D voxel world** built from scratch. Everything you see was modeled in Blender, optimized for the web, and rendered in real-time using WebGL.

### ✨ Features

- **3D Voxel Environment** - Complete desk setup with a working monitor
- **Vim Simulation** - The screen displays an animated Vim editor (yes, really)
- **Seasonal Effects** - Snow in winter, sakura in spring, leaves in autumn
- **Dark/Light Mode** - System preference detection with smooth transitions
- **Responsive Design** - Works on desktop and mobile
- **Markdown Projects** - Easy-to-update project pages with custom Lucide icon syntax
- **Performance Optimized** - Instanced meshes, throttled rendering and more

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router) |
| **3D Engine** | React Three Fiber + Drei |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Framer Motion |
| **3D Modeling** | Blender |
| **Icons** | Lucide React (with custom remark plugin) |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repo 
git clone https://github.com/szymonwilczek/wolfie-portfolio.git
cd wolfie-portfolio

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

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/                # API routes (GitHub, Spotify, WakaTime)
│   ├── projects/           # Project detail pages
│   └── feed/               # Activity feed page
├── components/
│   ├── 3d/                 # Three.js components (Scene, Model, VimScreen)
│   ├── layout/             # Navbar, Footer, Section components
│   ├── feed/               # GitHub heatmap, Spotify, WakaTime widgets
│   └── seasonal/           # Seasonal particle effects
├── content/
│   └── projects/           # Markdown project files
└── lib/                    # Utilities and custom plugins
```

---

## 🎨 Custom Lucide Icons in Markdown

This project includes a custom remark plugin for using Lucide icons directly in markdown:

```markdown
### :icon[ShoppingCart]{.text-orange-500 .inline-block .mr-2} Feature Title
```

Supports any Lucide icon with Tailwind classes!

---

## 📝 License

MIT License - feel free to use this as inspiration for your own portfolio!

---

## 🐺 About the Wolf

His name is Simon. He's made of polygons. No, you cannot pet him.

---

*Built with plenty of tea by [Szymon Wilczek](https://github.com/szymonwilczek)*
