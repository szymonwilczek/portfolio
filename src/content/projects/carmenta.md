---
title: "Carmenta"
excerpt: "Emoji picker for Linux that actually works on Wayland. Written in Rust, extremely efficient."
date: "2026-01-17"
tags:
  - "Rust"
  - "GTK4"
thumbnail: "/images/carmenta/main.png"
github: "https://github.com/szymonwilczek/carmenta"
links:
  - url: "https://szymon-wilczek.me/projects/carmenta"
    name: "Blog Article"
  - url: "https://copr.fedorainfracloud.org/coprs/szymon-wilczek/carmenta/"
    name: "Fedora COPR"
  - url: "https://extensions.gnome.org/extension/9179/carmenta/"
    name: "GNOME Extension"
---

# Preview


<video src="/videos/carmenta/preview.mp4" controls></video>

---

## :icon[Rocket]{.text-red-500 .inline-block .mr-1 .mb-1} Performance Optimization

| Metric | Result |
| :--- | :--- |
| **Startup** | ~135ms (Internal logic) |
| **Latency** | ~1.2ms (Insertion) |
| **RAM** | ~105MB (It's GUI, okay? GTK needs its space - still better than most) |

## :icon[Wrench]{.text-gray-400 .inline-block .mr-1 .mb-1} Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| **Core** | Rust | Memory safety go brr |
| **UI** | GTK4 | THE standard for GNOME |
| **Styling** | Libadwaita | To make it LOOK on Linux |
| **IPC** | zbus | For talking to the shell capability |
| **Extension** | GJS / JavaScript | Because GNOME Shell speaks JS |
| **Data** | Unicode Standards | Because parsing emojis is painful |
| **Build System** | Cargo | Kept it simple |

## :icon[Star]{.text-yellow-500 .inline-block .mr-1 .mb-1} Features

- **"Always on Top" Pinning** - The window floats above your work. :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
- **Categories & Search** - Emojis, Kaomojis (Japanese), Symbols (math, currency, arrows, etc.) :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
- **Skin Tone Support** - ✌️✌🏻✌🏼✌🏽✌🏾✌🏿 :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
- **Smart History** - It remembers you use the skull emoji 💀 way too often. :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
- **COPR Distribution** - `dnf install carmenta` just works. :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
