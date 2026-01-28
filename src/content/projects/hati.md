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
---

# Preview


<video src="/videos/hati/preview.mp4" controls></video>

# The Problem

Presenting software on Wayland is a nightmare.

On X11, you could just slap a transparent window over the entire screen, draw a red circle where the mouse is, and call it a day. Simple.

On Wayland? "Security says no."

Apps don't know where the cursor is (unless they have focus). Apps can't draw over other apps. So if you try to use a traditional "highlighter" tool, it either:

1. Doesn't show up at all.
2. Lags 5 frames behind your actual cursor (the "drunk ghost" effect).
3. Works fine until you open a menu, and then vanishes because the menu is a "different surface."

I wanted a highlighter that feels hardware-accelerated. One that sticks to the cursor like glue. 144Hz glue.

# The Solution

**Hati.**

Named after the wolf from Norse mythology that chases the moon (because it chases your cursor... get it?), Hati takes a different approach.

If you can't build an app on top of the compositor... become the compositor.

Hati is a GNOME Shell extension. It injects itself directly into the shell's rendering pipeline. It doesn't "simulate" a circle; it tells the GPU: "Hey, while you're rendering the scene, run this pixel shader."

---

## :icon[Zap]{.text-yellow-500 .inline-block .mr-1 .mb-1} The "Zero Copy" Architecture

Most highlighters work by polling the cursor position (CPU) and updating a window (GPU). That trip takes time.

Hati runs inside the Shell process. It hooks into the native Clutter input events. When you move your mouse:

1. Input event fires.
2. Hati updates the physics model (mass-spring-damper, because linear movement is boring).
3. The coordinates are passed directly to a GLSL Fragment Shader.
4. The GPU renders the ring/highlight in the same pass as the rest of the UI.

Latency? **Effectively zero.** It feels like part of the operating system

---

## :icon[Flame]{.text-red-500 .inline-block .mr-1 .mb-1} Features (That I Actually Use)

I didn't just want a red dot. I wanted a toolset.

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

# Result

Hati is currently the most performant cursor highlighter for GNOME on Wayland. 
It solves the isolation problem by ignoring it and going straight to the source.

It's valid, it's fast, and it lets me pretend I'm a professional presenter.

Check the code (it's surprisingly clean for a GNOME extension) on GitHub.

