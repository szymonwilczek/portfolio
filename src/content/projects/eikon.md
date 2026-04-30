---
title: "Eikon"
excerpt: "Self-hosted photo management with AI auto-tagging and secure sharing. Your memories, your rules."
date: "2026-04-21"
tags:
  - "Java"
  - "React"
  - "PostgreSQL"
thumbnail: "/images/eikon/main.png"
carousel:
  - "/images/eikon/grid_view.png"
  - "/images/eikon/graph_view.png"
github: "https://github.com/szymonwilczek/2026_tab_5_wilczek"
links:
  - url: "https://szymon-wilczek.me/projects/eikon"
    name: "Blog Article"
  - url: "https://github.com/szymonwilczek/2026_tab_5_wilczek/tree/main/Documentation"
    name: "Documentation"
  - url: "https://2026-tab-5-wilczek.vercel.app/preview"
    name: "Eikon Preview"
---

## :icon[Wrench]{.text-gray-400 .inline-block .mr-1 .mb-1} Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| **Backend Core** | Java 25 + Spring Boot | Enterprise stability, great async support |
| **Frontend** | React + Vite + Tailwind | Fast, component-driven UI |
| **Database** | PostgreSQL | Because data integrity matters |
| **Migrations** | Liquibase | Version control for the database schema |
| **Intelligence** | Gemini AI | For automated, human-like image tagging |
| **Security** | Firebase Auth | User session management |
| **Deployment** | Docker & Compose | `docker-compose up -d` and it runs anywhere |

## :icon[Star]{.text-yellow-500 .inline-block .mr-1 .mb-1} Features

- **AI Tagging** - Gemini looks at your photos so you don't have to. :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
- **Virtual File System** - Move and rename folders instantly via DB logic without breaking physical storage. :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
- **Deep EXIF Extraction** - ISO, Shutter Speed, Focal Length - all indexed and searchable. :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
- **Streaming Exports** - Download massive collections without server RAM spikes. :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
- **Secure Public Sharing** - Rate-limited, CAPTCHA-protected, token-based links. :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
