---
title: "Maturator - Infinite Math Platform"
excerpt: "Advanced educational platform for the Polish Matura Exam. Custom algorithmic engine to generate infinite, unique mathematical problems."
date: "2025-12-10"
tags:
  - "TypeScript"
  - "LaTeX"
  - "Math"
  - "Next.js"
thumbnail: "/images/maturator/landing.png"
carousel:
  - "/images/maturator/landing.png"
  - "/images/maturator/trening.png"
  - "/images/maturator/sample_task.png"
  - "/images/maturator/exam_canvas.png"
  - "/images/maturator/exam_task.png"
  - "/images/maturator/good_answer.png"
  - "/images/maturator/bad_answer.png"
github: "https://github.com/wolfie-university/maturator"
links:
  - url: "https://szymon-wilczek.me/projects/maturator"
    name: "Blog Article"
  - url: "https://maturator.vercel.app"
    name: "Maturator"
  - url: "https://github.com/wolfie-university/matura-engine"
    name: "Engine Repository"
  - url: "https://math-api-azure.vercel.app"
    name: "Deployed Math API"
---


## Key Features

### :icon[Infinity]{.text-purple-500 .inline-block .mr-2 .mb-1} Infinite Problem Generation
No static databases, no memorizing answers. Every request generates fresh problems with randomized:
- Numerical values
- Variable names
- Geometric configurations
- Graph parameters

*Try memorizing your way out of infinity. I'll wait.*

### :icon[BookOpen]{.text-blue-500 .inline-block .mr-1 .mb-1} Two Study Modes

| Mode | Description |
|------|-------------|
| **Thematic Training** | Focus on specific topics (Algebra, Geometry, Functions, Probability...) |
| **Exam Simulator** | Full-scale 30+ task simulation with 180-minute timer and detailed scoring |

### :icon[ChartColumn]{.text-green-500 .inline-block .mr-1 .mb-1} Dynamic Visualizations
Problems come with live-generated SVG graphics:
- Function graphs with precise plotted curves
- Geometric figures with labeled vertices
- Statistical charts (histograms, box plots)
- Coordinate systems with marked points

*Yes, I checked my high school notes.* 

### :icon[Calculator]{.text-cyan-500 .inline-block .mr-1 .mb-1} Smart Math Input
Custom input interface for easy typing of:
- Fractions: `1/2` → $\frac{1}{2}$
- Roots: `sqrt(x)` → $\sqrt{x}$
- Powers: `x^2` → $x^2$
- Greek letters and symbols

### :icon[Zap]{.text-yellow-500 .inline-block .mr-1 .mb-1} Instant Feedback
- Immediate validation for closed (ABCD) questions
- Open-ended answer checking with tolerance
- Step-by-step solution reveal

---

### 12 Specialized Generator Modules

| Topic | Coverage |
|-------|----------|
| **Algebra** | Powers, Roots, Logarithms, Percentages |
| **Functions (General)** | Properties, Linear functions, Graphs |
| **Quadratic** | Vertex, Roots, Inequalities, Viète's formulas |
| **Optimization** | Revenue problems, Geometry optimization |
| **Sequences** | Arithmetic, Geometric, General properties |
| **Analytic Geometry** | Lines, Circles, Intersections, Coordinates |
| **Planimetry** | Triangles, Quadrilaterals, Angles, Theorems |
| **Stereometry** | Solids, Angles in 3D, Cross-sections |
| **Trigonometry** | Identities, Equations, Geometry applications |
| **Combinatorics** | Permutations, Combinations, Variations |
| **Probability** | Dice, Coins, Urns, Set operations |
| **Statistics** | Mean, Median, Mode, Standard Deviation |

## Tech Stack

### Frontend (Maturator)
| Technology | Purpose |
|------------|---------|
| **Next.js** | App Router, SSR |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **shadcn/ui** | Components |
| **KaTeX** | LaTeX rendering |
| **React Query** | Data fetching |

### Backend (matura-engine)
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime |
| **Express** | REST API |
| **Custom SVG** | Dynamic graphics |
| **LaTeX strings** | Math formatting |
