---
title: "Wavelength"
excerpt: "High-performance desktop communication platform built with C++ and Qt 5. OpenGL rendering engine & real-time WebSockets."
date: "2023-12-15"
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
---

# The Problem

Modern communication platforms sacrifice privacy for convenience. They store your data, analyze your conversations, and require heavyweight Electron-based apps that consume gigabytes of RAM. 

I wanted to build something different: a **blazing-fast**, **privacy-focused**, **native desktop application** that doesn't compromise on features or performance.

*Discord was using 3GB of RAM to display a chat window and I took it personally.*

This project was developed as a semester credit at **Silesian University of Technology** (Faculty of Automation, Electronics and Computer Science), but evolved into a fully-featured, production-ready communication system.

# The Solution

**Wavelength** is a next-generation real-time communication system built from the ground up in **C++20** with **Qt5**. It doesn't store any of your data. *Really.*

---

## 🌟 Core Features

### 💬 Sophisticated Text Chat
Reliable, lightning-fast text messaging (imitating retro communication) with an intuitively designed interface. Supports various formatting options and is optimized for long conversations with efficient memory usage.

### 🎙️ Push-To-Talk (PTT) Voice
Inspired by walkie-talkies, the PTT system is optimized for **exceptionally low latency**. Perfect for dynamic discussions where instant voice communication is key. Integrates seamlessly into the chat view for quick text-to-voice switching.

*Walkie-Talkie in the big 2024. No, I don't want to talk about it. Over.*

### 📁 Multimedia Support
Send and receive images, videos, and audio files effortlessly. Powered by **FFmpeg** for comprehensive codec support:
- Direct in-chat previews
- Efficient streaming and playback
- Hardware-accelerated decoding

### 🎨 OpenGL-Powered UI
The entire interface is rendered with **OpenGL**, providing:
- 90+ FPS fluid animations
- GPU-accelerated visual effects
- Minimal CPU overhead
- Smooth experience even on modest hardware

*Ahh, game engine for rendering approach for a chat app. Lovely.*

### ⚙️ Extensive Customization
- Custom notification settings
- Shortcut Manager for keyboard power users
- Granular UI element control

### 🤖 Joy - Your AI Companion
To create even more immersion, I've added **Joy**, an AI companion that imitates the character Joi from *Blade Runner 2049*. She's yours now. Fully in 3D acting as a virus. That's the app easter egg.
She was crafted with OpenGL for 3D optimization, from scratch. Only vertices. How cool is that?

*I spent days modeling a 3D holographic woman for a university project. I have maybe a few regrets. I also gave _her_ an artifical voice, did you hear it?*

<video src="https://github.com/user-attachments/assets/1253dc7f-7c4e-4006-875a-ce8aec678975" controls="controls" style="max-width: 730px;"/>

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

*At this point I'm basically a Qt contributor. They should pay me. They don't.*

### Server Stack
The backend is a **Node.js** WebSocket server that can be self-hosted:
```bash
cd server && npm install && npm start
```

---

## Architecture Highlights

### Real-Time Communication Pipeline

```
┌─────────────────┐     WebSocket      ┌─────────────────┐
│   Wavelength    │◄──────────────────►│     Node.js     │
│   C++ Client    │    JSON Events     │     WS Server   │
└────────┬────────┘                    └────────┬────────┘
         │                                      │
    ┌────▼────┐                           ┌─────▼─────┐
    │ OpenGL  │                           │ PostgreSQL│
    │ Render  │                           │ Database  │
    └─────────┘                           └───────────┘
```

### Key Components

| Component | Description |
|-----------|-------------|
| **Chat View** | Central hub for text interactions |
| **Navbar** | Quick navigation across app sections |
| **Network Status Widget** | Real-time connection quality indicator |
| **Settings Tab** | Appearance, shortcuts, server config |
| **Joy Integration** | AI companion Easter egg |

### OpenGL Rendering Pipeline
The UI leverages direct GPU access for efficient rendering:
- Custom vertex/fragment shaders (GLSL)
- Hardware-accelerated animations
- Double-buffered rendering for tear-free display
- Optimized for OpenGL 3.3+ (with 2.1 fallback)

---

## Technical Challenges & Solutions

### 🎯 Low-Latency Audio
**Challenge:** PTT requires near-instant voice transmission.  
**Solution:** Custom audio pipeline with minimal buffering, direct hardware access via Qt Multimedia, and optimized WebSocket event handling.

### 🎯 Cross-Platform Audio on Linux
**Challenge:** Arch Linux has minimal pre-installed audio configurations.  
**Solution:** Created dedicated `archlinux-audio-fix` branch with PipeWire integration:
```bash
sudo pacman -S pipewire-pulse pipewire-alsa pipewire-jack
systemctl --user restart pipewire pipewire-pulse wireplumber
```

And also added bunch of nullptr checks to prevent app from crashing on arch.

*Debugging audio on Arch Linux is a rite of passage. I passed. Barely.*

### 🎯 Multimedia Format Support
**Challenge:** Supporting diverse audio/video formats.  
**Solution:** FFmpeg integration for comprehensive codec coverage (libavcodec, libavformat, libavutil).

### 🎯 Performance on Low-End Hardware
**Challenge:** Maintaining not 60 but a 90+ FPS on modest systems.  
**Solution:** OpenGL rendering with aggressive optimization, minimal RAM footprint, and efficient event processing.

*If it doesn't run at 90fps, it's not a feature, it's a bug. This is the hill I will die on.*

---

## System Requirements

| Requirement | Specification |
|-------------|---------------|
| **OS** | Windows 10/11 / Linux (tested on Fedora and Arch) |
| **Processor** | Any modern CPU |
| **RAM** | 2 GB minimum |
| **Graphics** | OpenGL 2.1+ (3.3+ recommended) |
| **Network** | Stable internet for real-time features |

> *The requirements are really low by today's standards - that was exactly my goal. Take notes, Electron.*

---

## Documentation

Comprehensive technical documentation is available:

- 📖 **Online Docs (Doxygen):** [wavelength-docs.vercel.app](https://wavelength-docs.vercel.app/)
- 📄 **PDF Documentation:** [Detailed architecture, class diagrams, API specs](https://github.com/szymonwilczek/wavelength/blob/main/wavelength.pdf)

---

# Result

Wavelength demonstrates **advanced C++ engineering** concepts:

- ✅ **Modern C++20** with RAII, smart pointers, and move semantics
- ✅ **Qt5 mastery** across Core, GUI, Widgets, Network, and OpenGL modules
- ✅ **Real-time communication** with WebSocket protocol
- ✅ **GPU rendering** with custom OpenGL pipeline
- ✅ **Multimedia processing** with FFmpeg integration
- ✅ **Cross-platform** support (Windows, Linux)
- ✅ **Privacy-first** architecture - no data retention

The project showcases how to build a **production-grade native desktop application** that rivals commercial communication platforms in features while maintaining minimal resource usage and maximum privacy.

**License:** MIT - free to use, modify, and distribute.

---

*P.S. - If Electron apps are "good enough", this project is my passive-aggressive disagreement in 50,000 lines of C++.*
