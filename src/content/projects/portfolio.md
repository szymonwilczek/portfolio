---
title: "This Portfolio"
excerpt: "You're looking at it right now. Yes, this one. The very website you're reading this on. Meta, isn't it?"
date: "2024-04-10"
tags:
  - "React Three Fiber"
  - "WebGL"
  - "Blender"
thumbnail: "/images/portfolio/portfolio_landing.png"
github: "https://github.com/szymonwilczek/wolfie-portfolio"
links:
  - url: "https://szymon-wilczek.me"
    name: "You're Already Here"
---

# The Problem

I needed a portfolio website. 

You know, one of those things where you show off your projects to potential employers who will spend approximately 4.7 seconds looking at it before moving on to the next candidate. Standard stuff.

But here's the thing - every developer portfolio looks the same:
- Hero section ✓
- "About Me" that nobody reads ✓
- Grid of project cards ✓
- Contact form that goes to `/dev/null` ✓

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

## 🎮 The Voxel World

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

## ⚡ Performance Optimization (A Rant)

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

## 🛠️ Tech Stack

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

## 🎨 The Voxel Aesthetic

I chose voxels because:
1. They're charming
2. They're forgiving (no need for perfect topology)
3. They give off that indie game nostalgia
4. I can't model realistic humans and this is my coping mechanism

Every model was created in Blender using manual voxel-by-voxel placement. Yes, I placed individual cubes. For hours.

---

## 📊 Features (The Serious Section)

Okay, jokes aside, here's what this portfolio actually does:

- ✅ **Fully responsive** - works on mobile (mostly)
- ✅ **Dark/Light mode** - system preference respected
- ✅ **Markdown-based projects** - easy to update
- ✅ **Image gallery with lightbox** - for showing off screenshots
- ✅ **Project links system** - GitHub, live demos, docs
- ✅ **Autoplay carousel** - because static is boring
- ✅ **Performance optimized** - throttled rendering, efficient shaders
- ✅ **Accessible** - semantic HTML, keyboard navigation
- ✅ **SEO friendly** - meta tags, proper headings

---

## 🤔 Meta Commentary

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

