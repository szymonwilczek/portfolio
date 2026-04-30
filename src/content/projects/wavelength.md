---
title: "Wavelength"
excerpt: "High-performance desktop communication platform built with C++ and Qt 5. OpenGL rendering engine & real-time WebSockets."
date: "2023-06-14"
tags:
  - "C++"
  - "OpenGL"
  - "GLSL"
  - "Qt 5"
thumbnail: "/images/wavelength/landing.png"
carousel:
  - "/images/wavelength/landing.png"
  - "/images/wavelength/chat_view.png"
  - "/images/wavelength/audio_file.png"
  - "/images/wavelength/ptt_on.png"
  - "/images/wavelength/settings_tab.png"
github: "https://github.com/szymonwilczek/wavelength"
links:
  - url: "https://szymon-wilczek.me/projects/wavelength"
    name: "Blog Article"
  - url: "https://wavelength-docs.vercel.app/"
    name: "Project Documentation"
---

## Tech Stack

### Core Technologies

| Technology | Purpose |
|------------|---------|
| **C++20** | Core language with modern features |
| **Qt5** | Cross-platform UI framework |
| **OpenGL 2.1+** | GPU-accelerated rendering |
| **WebSocket** | Real-time bidirectional communication |
| **FFmpeg** | Multimedia encoding/decoding |
| **PostgreSQL** | Server-side data persistence |
| **libpqxx** | C++ PostgreSQL client library |

### Qt Modules Used
```
Qt Core • Qt GUI • Qt Widgets • Qt Network • Qt Multimedia • Qt OpenGL
```

### Server Stack
The backend is a **Node.js** WebSocket server that can be self-hosted:
```bash
cd server && npm install && npm start
```

---

## Key Components

| Component | Description |
|-----------|-------------|
| **Chat View** | Central hub for text interactions |
| **Navbar** | Quick navigation across app sections |
| **Network Status Widget** | Real-time connection quality indicator |
| **Settings Tab** | Appearance, shortcuts, server config |
| **Joy Integration** | AI companion Easter egg |

## System Requirements

| Requirement | Specification |
|-------------|---------------|
| **OS** | Windows 10/11 / Linux (tested on Fedora and Arch) |
| **Processor** | Any modern CPU |
| **RAM** | 2 GB minimum |
| **Graphics** | OpenGL 2.1+ (3.3+ recommended) |
| **Network** | Stable internet for real-time features |


## Documentation

Comprehensive technical documentation is available:

- :icon[BookOpen]{.text-gray-400 .inline-block .mr-1 .mb-1} **Online Docs (Doxygen):** [wavelength-docs.vercel.app](https://wavelength-docs.vercel.app/)
- :icon[File]{.text-gray-400 .inline-block .mr-1 .mb-1} **PDF Documentation:** [Detailed architecture, class diagrams, API specs](https://github.com/szymonwilczek/wavelength/blob/main/wavelength.pdf)
