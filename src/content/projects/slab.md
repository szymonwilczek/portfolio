---
title: "SLAB"
excerpt: "High-performance tiling window manager for GNOME. Actor-First philosophy, zero latency."
date: "2026-01-17"
tags:
  - "TypeScript"
  - "GNOME"
  - "GJS"
thumbnail: "/images/slab/main.png"
github: "https://github.com/szymonwilczek/slab"
links:
  - url: "https://szymon-wilczek.me/projects/slab"
    name: "Blog Article"
---

# Preview

<video src="/videos/slab/preview.mp4" controls></video>

## :icon[Wrench]{.text-gray-400 .inline-block .mr-1 .mb-1} Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| **Core** | GJS | Native GNOME scripting |
| **Logic** | TypeScript | Type safety for complex tiling math |
| **Visuals** | Metacity / Clutter | Direct compositor access |
| **Layout** | Master-Stack | The most efficient workflow |
| **Build** | tsc | Standard TypeScript compiler |

## :icon[Star]{.text-yellow-500 .inline-block .mr-1 .mb-1} Features

- **Zero-Latency Tiling** - Visuals update instantly. :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
- **Master-Stack Layout** - Primary focus on the left, stack on the right. :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
- **Instant Toggle** - `Super + Shift + T` enables/disables it per monitor. :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
- **Native Feel** - Integrates perfectly with GNOME 49+. :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
