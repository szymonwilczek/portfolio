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
---

# Preview

<video src="/videos/slab/preview.mp4" controls></video>

# The Problem

Most GNOME extensions that add tiling capabilities feel... "bolted on". You move a window, there's a split-second delay, a frame of jitter, or a visual glitch before everything snaps into place. It breaks the flow. It feels sluggish.

I wanted something that feels instantaneous. I want my window manager to move as fast as I think.

Also, I want **simplicity**. I don't need 50 different layouts. I need one good one that works.

# The Solution

**SLAB.**

A high-performance tiling window manager extension for GNOME Shell that adheres to an **"Actor-First"** philosophy.

It implements a rock-solid Master-Stack layout with zero visual latency.

---

## :icon[Zap]{.text-yellow-500 .inline-block .mr-1 .mb-1} "Actor-First" Architecture

The secret sauce is how SLAB handles window movement.

Traditional extensions often wait for the window manager protocol to confirm a move before updating the visual state. This round-trip causes lag.

**SLAB does it backwards (in a good way):**
1.  **Manipulate the Actor:** We grab the underlying Clutter Actor (the visual representation of the window in the compositor) and move it *instantly*.
2.  **Sync the Logic:** We tell the window manager "Oh, by the way, the window is here now" in the background.

The result? Visual updates happen in the same frame as your input. It feels 144Hz smooth even if the protocol is lagging behind.

---

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

---

# Result

SLAB is currently in **BETA**, but it's mostly usable. It brings the speed of a standalone Tiling WM to the comfort of the GNOME desktop.

Give it a try if you want your windows to finally keep up with you.
