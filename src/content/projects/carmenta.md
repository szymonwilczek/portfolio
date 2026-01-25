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
  - url: "https://copr.fedorainfracloud.org/coprs/szymon-wilczek/carmenta/"
    name: "Fedora COPR"
  - url: "https://extensions.gnome.org/extension/9179/carmenta/"
    name: "GNOME Extension"
---

# Preview


<video src="/videos/carmenta/preview.mp4" controls></video>

# The Problem

I like emojis. 

But do you know what I don't like? Emoji pickers that vanish into the void the moment you click **one** emoji. 

I wanted to send three emojis. Not one. Three. Why do I have to re-open the app three times? Who designed this?

Also, I'm a Linux user. Specifically, a GNOME user. I want my apps to look like they belong there, not like an Electron app pretending to be native while eating 400MB of RAM just to render a smiley face.

And then came **Wayland**.
Wayland is great. It's secure. It's modern.
It also effectively said: *"Oh, you want to programmatically insert text into another window? That sounds dangerous. No."*

So, my requirements were simple (impossible):
1.  **Fast.** Starts before I forget which emoji I wanted.
2.  **Native.** Written in Rust + GTK4.
3.  **Persistent.** "Always on Top" mode so I can spam emojis.
4.  **Functional.** Actually types the emoji into the window I was using.

# The Solution

**Carmenta.**

Named after the Roman goddess, it's a native GNOME app that solves all of the above.

It sure does work excellent.

---

## :icon[Zap]{.text-yellow-500 .inline-block .mr-1 .mb-1} The "Wayland Problem" (And The Hacky Solution)

The biggest technical hurdle was **input injection on Wayland**. 

On X11, you could just grab a window handle and simulate keystrokes. On Wayland, isolation prevents this. An app cannot verify which window is focused, let alone type into it.

**My workaround? A customized GNOME Shell Extension.**

I built a "Trojan Horse" architecture:
1.  **The App (Rust):** Runs as a standalone GTK4 window. User selects an emoji.
2.  **The IPC (DBus):** The app sends a signal via DBus: `InsertText("🔥")`.
3.  **The Extension (JavaScript):** Since it lives inside the Shell process, it *is* the compositor. It has god-mode privileges.
4.  **The Injection:** The extension switches focus *back* to your text editor, simulates `Ctrl+V` using a virtual keyboard device, and then switches focus *back* to Carmenta.

It all happens in about 50ms. It feels instant. It feels native. But under the hood, it's a carefully choreographed dance between two separate processes.

---

## :icon[Rocket]{.text-red-500 .inline-block .mr-1 .mb-1} Performance Optimization

I didn't want another laggy search bar.

-   **Language:** Rust. Obviously.
-   **UI Toolkit:** GTK4 + Libadwaita. No webviews here.
-   **Search Algorithm:** Custom debounce implementation (because even Rust can choke if you search 5000 glyphs on every keystroke).
-   **Startup Time:** < 200ms cold start.

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

---

# Result

Carmenta is now my daily driver. It's built for speed and it respects my workflow.

If you are on **Fedora**, you can grab it from my COPR.

If you are on **anything else**... well, you can install it yourself from GitHub repository.

