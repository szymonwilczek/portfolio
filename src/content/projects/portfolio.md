---
title: "This Portfolio"
excerpt: "You're looking at it right now. Yes, this one. The very website you're reading this on. Meta, isn't it?"
date: "2025-12-13"
tags:
  - "React Three Fiber"
  - "WebGL"
  - "Blender"
thumbnail: "/images/portfolio/portfolio.png"
github: "https://github.com/szymonwilczek/wolfie-portfolio"
links:
  - url: "https://szymon-wilczek.me"
    name: "You're Already Here"
---

# The Problem

I needed a portfolio website. 

You know, one of those things where you show off your projects to potential employers who will spend approximately 4.7 seconds looking at it before moving on to the next candidate. Standard stuff.

But here's the thing - every developer portfolio looks the same:
- Hero section :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
- "About Me" that nobody reads :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
- Grid of project cards :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
- Contact form that goes to `/dev/null` :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}

**Boring.**

I wanted something that would make people go "wait, what?" and actually *stay* for more than those 4.7 seconds.

# The Solution

You're looking at it.

*Gestures broadly at everything*

This is a **3D interactive voxel world** built entirely from scratch. Every pixel you see (well, voxel) was placed with questionable precision in Blender, exported, optimized, and then rendered in your browser using WebGL.

Is it practical? **No.**  
Is it performant on a 2015 MacBook Air? **Maybe, I don't have one so hard to tell.**  
Did I spend way too much time on this? **Also maybe.**  
Do I regret it? **Also maybe, but in a good way.**

---

## :icon[Gamepad2]{.text-purple-500 .inline-block .mr-1 .mb-1} The Voxel World

The entire landing page is a 3D scene. Not a background. Not an image. A fully interactive, explorable environment with:

- **A desk** - with a monitor that shows a working Vim simulation
- **A wolf*** - named Simon, because you know... priorities.
- **Ambient particles** - for that *cozy indie game* aesthetic
- **Day/night cycle** - to prevent your eyes from burning 
- **Date/event recognition** - because why not?

### The Vim Screen (Yes, Really)

The monitor in the 3D scene displays a **working Vim simulation**. It types code, switches modes, navigates files - all animated in real-time on a texture that's applied to a 3D mesh.

Why? Because nothing says "hire me" like an unnecessary Vim flexing.

---

## :icon[Zap]{.text-yellow-500 .inline-block .mr-1 .mb-1} Performance Optimization (A Rant)

Let me tell you about the four stages of 3D web development:

1. **Excitement** - "This is going to be so cool!"
2. **Implementation** - "Why is my GPU fan louder than a jet engine?"
3. **Optimization** - "If I remove one more polygon, it'll be a 2D website"
4. **Acceptance** - "It runs at 15fps on mobile and that's fine"

I went through all four. Multiple times.

### What I Did To Not Melt Your CPU:
- **Baked lighting** - because real-time shadows are expensive and I'm cheap
- **Texture atlases** - one texture to rule them all
- **Instanced meshes** - for repeating elements
- **Frustum culling** - don't render what you can't see
- **LOD (Level of Detail)** - far things get less triangles
- **Throttled animations** - 60fps is a luxury, not a right

Is it still heavy? Yes. But now it's *acceptable* heavy.

---

## :icon[Wrench]{.text-gray-400 .inline-block .mr-1 .mb-1} Tech Stack

| Layer | What | Why |
|-------|------|-----|
| **Framework** | Next.js 15 | App Router is nice, fight me |
| **3D Engine** | React Three Fiber | Three.js but with React vibes |
| **Physics** | @react-three/rapier | For when things need to fall |
| **Animation** | Framer Motion | Smooth like butter |
| **Styling** | Tailwind CSS | Utility classes go brr |
| **3D Modeling** | Blender | Free and powerful |
| **Shaders** | Custom GLSL | For that extra ✨ |
| **Markdown** | MDX-ish | For these very words |
| **Deployment** | Vercel | One-click deploys |

## :icon[Palette]{.text-pink-500 .inline-block .mr-1 .mb-1} The Voxel Aesthetic

I chose voxels because:
1. They're charming
2. They're forgiving (no need for perfect topology)
3. They give off that indie game nostalgia
4. I can't model realistic humans and this is my coping mechanism

Every model was created in Blender using manual voxel-by-voxel placement. Yes, I placed individual cubes. For hours.

---

## :icon[Sparkles]{.text-yellow-500 .inline-block .mr-1 .mb-1} Features (The Serious Section)

Okay, jokes aside, here's what this portfolio actually does:

- **Fully responsive** - works on mobile (mostly) :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 
- **Dark/Light mode** - system preference respected :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 
- **Markdown-based projects** - easy to update :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 
- **Image gallery with lightbox** - for showing off screenshots :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 
- **Project links system** - GitHub, live demos, docs :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 
- **Autoplay carousel** - because static is boring :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 
- **Performance optimized** - throttled rendering, efficient shaders :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 
- **Accessible** - semantic HTML, keyboard navigation :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 
- **SEO friendly** - meta tags, proper headings :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 

---

## :icon[RectangleGoggles]{.text-purple-500 .inline-block .mr-1 .mb-1} Meta Commentary

You are currently reading a project description about the very website that contains this project description.

This page exists within the portfolio it describes. The code that renders these words is documented by these words. The thumbnail for this project could theoretically be a 3d scene wrapper of this project, which would contain a smaller version of the 3d model, infinitely recursing until your browser crashes.

I chose not to do that. You're welcome.

---

# Result

Is this portfolio over-engineered? **Absolutely.**

Will it help me get hired? **Hopefully?**

Did I learn a lot? **Definitely.**

Would I do it again? **Ask me after the next refactor.**

---

*P.S. - No, you cannot pet the wolf. He's made of polygons.*

*P.P.S. - If you're a recruiter and you've read this far, I'm impressed. And available for hire.*

