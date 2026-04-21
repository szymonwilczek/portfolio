---
title: "Eikon"
excerpt: "Self-hosted photo management with AI auto-tagging and secure sharing. Your memories, your rules."
date: "2026-04-21"
tags:
  - "Java"
  - "React"
  - "PostgreSQL"
thumbnail: "/images/eikon/main.png"
carousel:
  - "/images/eikon/grid_view.png"
  - "/images/eikon/graph_view.png"
github: "https://github.com/szymonwilczek/2026_tab_5_wilczek"
links:
  - url: "https://github.com/szymonwilczek/2026_tab_5_wilczek/tree/main/Documentation"
    name: "Documentation"
  - url: "https://2026-tab-5-wilczek.vercel.app/preview"
    name: "Eikon Preview"
---

# The Problem

Cloud providers scanning my private galleries to train their AI models, then compressing the soul out of my pixels. *Not good* - a one could think.

I wanted to organize thousands of photos. Not manually. Who does that. Why do I have to type `dog` under 50 pictures of my dog?

I wanted my files on my own VPS, structured properly, without giving up modern conveniences.

And then came the **Sharing Problem**.
Sharing photos is mandatory. But commercial clouds effectively say: *"Oh, you want to share a folder with your family? Here is a 40-page privacy policy they must accept, and we will plaster ads all over the screen."*

So, my requirements were simple (*impossible*):
1.  **Private.** Runs entirely on my own hardware (currently on VPS).
2.  **Smart.** Auto-tags everything using AI and extracts EXIF telemetry in the background.
3.  **Efficient.** Handles massive ZIP exports without OOM crashing the server (hopefully, there were some issues).
4.  **Shareable.** Generates secure, rate-limited, read-only public links that *just work*.

# The Solution

**Eikon.**

I'm following my Greek convention, so I've named this project after the Greek word for image. It's a full-stack application that acts as a self-hosted digital brain for your media.

---

## :icon[Zap]{.text-yellow-500 .inline-block .mr-1 .mb-1} The "AI & Processing Pipeline"

The biggest technical hurdle was handling heavy uploads without blocking the main thread. Extracting metadata and prompting an LLM takes time.

**Workaround? A strictly Event-Driven Architecture.**

When a file hits the server, it doesn't just save to disk. It triggers a cascade:
1.  **The API (Spring Boot):** Validates the file, checks storage quotas, saves physical bytes, and immediately returns a `200 OK` to the frontend.
2.  **The Event:** The system publishes a `PhotoUploadedEvent`.
3.  **The Workers (@Async):** Background threads wake up. They generate optimized thumbnails, parse deep EXIF telemetry (camera model, exposure, focal length), and send the image context to the **AI API** (currently - *Gemini*, but can be converted to any LLM that has photo recognition features).
4.  **The Result:** Gemini acts as an automated librarian, returning contextual tags that are saved to the database.

It all happens asynchronously. The UI stays snappy, and the server processes the heavy lifting in the background.

---

## :icon[Shield]{.text-blue-500 .inline-block .mr-1 .mb-1} The "Grandma Problem" (Public Previews)

How do you expose a private VPS to the public internet securely? 

With a dedicated **Preview Showcase** layer. When someone visits a shared link, they are not hitting the main API. They are given a temporary session token.
-   **Cloudflare Turnstile:** Stops bots from scraping the shared links.
-   **In-Memory Rate Limiting:** Prevents malicious users from spamming the download endpoint.
-   **Read-Only Paradigm:** I wrote a custom `PreviewReadOnlyInterceptor` that explicitly blocks any `POST`, `PUT`, or `DELETE` requests for guest sessions at the framework level.

And what if they want to download a whole category with 500 photos?
Instead of loading a 3GB ZIP file into the server's RAM (which would kill the VPS), Eikon uses **Streaming ZIP Export**. It streams bytes directly from the hard drive to the client's browser on the fly. Zero memory bloat.

---

## :icon[Wrench]{.text-gray-400 .inline-block .mr-1 .mb-1} Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| **Backend Core** | Java 25 + Spring Boot | Enterprise stability, great async support |
| **Frontend** | React + Vite + Tailwind | Fast, component-driven UI |
| **Database** | PostgreSQL | Because data integrity matters |
| **Migrations** | Liquibase | Version control for the database schema |
| **Intelligence** | Gemini AI | For automated, human-like image tagging |
| **Security** | Firebase Auth | User session management |
| **Deployment** | Docker & Compose | `docker-compose up -d` and it runs anywhere |

## :icon[Star]{.text-yellow-500 .inline-block .mr-1 .mb-1} Features

- **AI Tagging** - Gemini looks at your photos so you don't have to. :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
- **Virtual File System** - Move and rename folders instantly via DB logic without breaking physical storage. :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
- **Deep EXIF Extraction** - ISO, Shutter Speed, Focal Length - all indexed and searchable. :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
- **Streaming Exports** - Download massive collections without server RAM spikes. :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}
- **Secure Public Sharing** - Rate-limited, CAPTCHA-protected, token-based links. :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1}

---

# Result

Eikon was created as a university project; now it's my personal media hub. It respects privacy (because you're the one who hosts it), automates the boring parts of photo management, and proves that you don't need a Big Tech cloud to have smart, AI-driven galleries.

You can check out the full source code, extensive UML diagrams, and documentation on GitHub. I know the link is not there yet, and the URL may be a little bit off for now - I'll update this article when we (because it's a group project) - will be done with the acceptance from the course tutor at college.
