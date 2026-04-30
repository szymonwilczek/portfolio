---
title: "Hati"
excerpt: "Native cursor highlighter for GNOME that defies Wayland isolation. Powered by GLSL shaders."
date: "2026-01-28"
tags:
  - "JavaScript"
  - "GLSL"
thumbnail: "/images/hati/main.png"
carousel:
  - "/images/hati/cursor.png"
  - "/images/hati/settings.png"
github: "https://github.com/szymonwilczek/hati"
links:
  - url: "https://szymon-wilczek.me/projects/hati"
    name: "Blog Article"
  - url: "https://extensions.gnome.org/extension/9209/hati-cursor-highlighter/"
    name: "GNOME Extension"
---

# Preview


<video src="/videos/hati/preview.mp4" controls></video>

## :icon[Flame]{.text-red-500 .inline-block .mr-1 .mb-1} Features

1. **Physics & Inertia**

The ring doesn't just teleport. It has inertia. It feels smooth. It respects the laws of physics. It drags slightly behind and snaps into place. It makes your cursor movements look smooth and professional, even if you clearly had too much coffee.

2. **Spotlight Mode**

Sometimes you need to focus. Press a key, and the whole screen goes dark - except for a flashlight beam around your cursor. Great for guiding attention during complex demos.

3. **Shareable Presets**

You spent 20 minutes tweaking the perfect "Cyberpunk Neon" look?

- **Export**: Saves to a JSON file.
- **Import**: Send it to a friend (or your other laptop). Hati handles type conversions and versioning, so your config doesn't break.

4. **GPU Magnifier**

Need to show that one pixel-perfect alignment? Hold `Ctrl` (or your custom key). Hati spawns a magnified view of the UI under the cursor. No blurry upscaling - it grabs the texture from the compositor.

## :icon[Wrench]{.text-gray-400 .inline-block .mr-1 .mb-1} Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| **Core** | GJS (JavaScript)| Because GNOME Shell is basically a JS engine with a desktop attached |
| **Rendering** | OpenGL / GLSL| For that sweet, sweet 60+ FPS |
| **Logic** | Clutter / Meta | The backbone of GNOME's scene graph |
| **UI** | GTK4 + Libadwaita | Preferences window that LOOK (native) |
