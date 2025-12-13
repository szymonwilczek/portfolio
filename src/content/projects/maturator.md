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
  - url: "https://maturator.vercel.app"
    name: "Maturator"
  - url: "https://github.com/wolfie-university/matura-engine"
    name: "Engine Repository"
  - url: "https://math-api-azure.vercel.app"
    name: "Deployed Math API"
---

# The Problem

Preparing for the Polish Matura exam in mathematics has a fundamental flaw: **you eventually run out of practice problems**. Textbooks have limited exercises, past exams get memorized, and online banks are finite. Once you've seen a problem, solving it again doesn't build the same skills.

I wanted to create a platform where students could practice **forever** - with unique, algorithmically-generated problems every single time.

*"Just make a quiz app," the reasonable part of me suggested.*

# The Solution

**Maturator** is an advanced educational platform that generates **infinite, unique math problems** in real-time. Unlike static question banks, every problem is created on-the-fly with randomized values, contexts, and solutions.

You can solve the same *type* of task 100 times, and the numbers, scenarios, and correct answers will be different every single time.

Is this overkill for exam prep? **Perhaps.**  
Will students run out of problems? **Literally impossible.**  

**Live Webpage:** [maturator.vercel.app](https://maturator.vercel.app)

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

## :icon[Brain]{.text-pink-500 .inline-block .mr-1 .mb-1} The Engine - matura-engine

This isn't just a frontend consuming a third-party API. I built the **entire generation engine from scratch**:

**Repository:** [wolfie-university/matura-engine](https://github.com/wolfie-university/matura-engine)  
**Live API:** [math-api-azure.vercel.app](https://math-api-azure.vercel.app)

*Because using an existing math API would've been too easy. And where's the fun in that?*

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

### API Endpoints

```http
# Specific topic generator
GET /api/v2/generator/:topic?difficulty=medium&count=5

# Random mix of all topics
GET /api/v2/generator/random?count=10

# Full exam simulation (30+ tasks)
GET /api/v2/exam/full?difficulty=hard
```

### Response Structure

```json
{
  "meta": {
    "type": "QuadraticGenerator",
    "difficulty": "medium"
  },
  "content": {
    "question_text": "Determine the vertex of the parabola:",
    "question_latex": "f(x) = 2x^2 - 4x + 1",
    "image_svg": "<svg>...</svg>",
    "variables": { "a": 2, "b": -4, "c": 1, "p": 1, "q": -1 }
  },
  "answers": {
    "type": "closed",
    "correct": "W(1, -1)",
    "distractors": ["W(-1, -1)", "W(-1, 1)", "W(1, 1)"]
  },
  "solution": {
    "steps": [
      "Formula for p: $$p = -b/2a$$",
      "Calculate: $$p = 4/4 = 1$$",
      "Calculate q: $$q = f(1) = -1$$",
      "Result: $$W(1, -1)$$"
    ]
  }
}
```

### Difficulty Levels
| Level | Description |
|-------|-------------|
| `easy` | Simpler numbers, fewer steps |
| `medium` | Standard exam complexity |
| `hard` | Extended ranges, edge cases |

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


# Result

Maturator demonstrates **full-stack engineering** with a focus on algorithmic problem generation:

- **Custom math engine** - 12 topic-specific generators :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 
- **Infinite randomization** - No two problems are identical :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 
- **Dynamic visualizations** - SVG graphs generated per-problem :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 
- **LaTeX integration** - Beautiful math rendering :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 
- **Full exam simulation** - 30+ tasks, timer, scoring :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 
- **Modern frontend** - Next.js, TypeScript, shadcn :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 
- **REST API design** - Clean, documented endpoints :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 

The platform is **live and used by students** preparing for the Polish Matura exam. It proves that educational software doesn't have to be static - with the right algorithmic approach, you can create **unlimited learning content**.

**License:** MIT - fork it for your own exam system!

---

*P.S. - If you use this to pass your Matura, you're welcome. If you still fail, I take no responsibility. Math is not for everyone I guess (but I strongly do not believe it - I built 12 modules proving it).*

