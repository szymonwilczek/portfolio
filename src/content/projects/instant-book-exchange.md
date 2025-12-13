---
title: "Instant Book Exchange"
excerpt: "Social platform for book enthusiasts enabling seamless book swaps."
date: "2024-02-15"
tags:
  - "Next.js"
  - "TypeScript"
  - "MongoDB"
thumbnail: "/images/instant-book-exchange/landing.png"
github: "https://github.com/szymonwilczek/instant-book-exchange"
carousel:
  - "/images/instant-book-exchange/landing.png"
  - "/images/instant-book-exchange/cart.png"
  - "/images/instant-book-exchange/transaction.png"
  - "/images/instant-book-exchange/transactions_pending.png"
  - "/images/instant-book-exchange/profile.png"
  - "/images/instant-book-exchange/achievements.png"
  - "/images/instant-book-exchange/leaderboard.png"
---

# The Problem

Traditional book exchanges often rely on clunky forums, Facebook groups, or physical meetups. There's no single platform that combines **book discovery**, **trading**, **real-time communication**, and **user engagement** in one cohesive experience.

This project was developed as part of the **Software Engineering** course at **Silesian University of Technology** (Politechnika Śląska), with the goal of building a production-ready, full-stack application addressing these challenges.

*In other words: "build something for class" turned into "build an entire social network because scope creep is my love language."*

# The Solution

**Instant Book Exchange** is a modern web platform that enables users to swap books with each other. Key differentiators include:

- :icon[Repeat]{.text-purple-500 .inline-block .mr-1 .mb-1} **Two-way exchange system** - Offer your books, wishlist others, and match with traders
- :icon[MessageCircle]{.text-neutral-500 .inline-block .mr-1 .mb-1} **Real-time messaging** - Socket.io-powered chat for negotiating exchanges
- :icon[Trophy]{.text-yellow-500 .inline-block .mr-1 .mb-1} **Gamified ranking system** - Earn points, climb tiers, and unlock achievements
- :icon[Globe]{.text-blue-500 .inline-block .mr-1 .mb-1} **Internationalization** - Full support for Polish and English

Is it overengineered for a university project? **Spectacularly.**  
Did I get a good grade? **Don't know yet. I'll update this.**  

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 15** | App Router, React 19, SSR |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Styling |
| **shadcn/ui** | Component library |
| **Framer Motion** | Animations |
| **Lucide React** | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| **MongoDB** | Database |
| **Mongoose** | ODM |
| **NextAuth.js v5** | Authentication (credentials + OAuth) |
| **Socket.io** | Real-time messaging |
| **next-intl** | Internationalization |

*Yes, I used every buzzword in the book. The book is on my wishlist, by the way.*

---

## Core Features Deep Dive

### :icon[BookOpen]{.text-blue-500 .inline-block .mr-1 .mb-1} Book Management

Users can manage two distinct book lists:

1. **Offered Books** - Books you're willing to trade
2. **Wishlist** - Books you want to receive

The system automatically finds **matches** between users when someone's offered book appears on another user's wishlist and vice versa.

```typescript
// Simplified matching logic
interface BookMatch {
  user1: string;
  user2: string;
  user1Offers: Book;
  user2Offers: Book;
}

function findMatches(users: User[]): BookMatch[] {
  // Algorithm scans all users' offered vs wishlist combinations
  // Returns potential 1:1 or many-to-many trade opportunities
}
```

*It's basically Tinder, but for books. And somehow even more disappointing when there's no match.*

### :icon[ShoppingCart]{.text-orange-500 .inline-block .mr-1 .mb-1} Drag & Drop Checkout

The exchange interface features an intuitive **drag and drop** system built with `@dnd-kit`:

1. Browse your book inventory on the left
2. Drag books you want to offer into the exchange zone
3. Select books you want from the other user's inventory
4. Confirm and initiate the transaction

*I spent way too long making the drag animation smooth. No one noticed. Such is the life of a developer.*

### :icon[MessageCircle]{.text-green-500 .inline-block .mr-1 .mb-1} Real-Time Messaging

Every transaction creates a **conversation room** where both parties can communicate:

```typescript
// Socket.io event handling
socket.on("send-message", async (data) => {
  const message = await Message.create({
    content: data.content,
    sender: data.userId,
    conversation: data.conversationId,
  });
  
  io.to(data.conversationId).emit("new-message", message);
});
```

Features include:
- Message history with pagination
- Real-time delivery indicators
- Notification sounds
- File attachments support

### :icon[Trophy]{.text-yellow-500 .inline-block .mr-1 .mb-1} Ranking System

The platform features a sophisticated **tier-based ranking system**:

| Tier | Score Range | Perks |
|------|-------------|-------|
| 🥉 **Bronze** | 0 - 499 | Basic access |
| 🥈 **Silver** | 500 - 999 | Profile badge |
| 🥇 **Gold** | 1000 - 1999 | Featured listings |
| 💎 **Diamond** | 2000+ | Priority support |

*The Diamond tier perks are theoretical because no one has reached it yet. Including me. Even during intense testing.*

### :icon[Medal]{.text-amber-500 .inline-block .mr-1 .mb-1} Achievements System

Gamification is central to user engagement. The platform includes an **achievement engine** with unlockable badges. Each of the category has it's own *je ne sais quoi*.

*Nothing motivates reading like fake internet points. Don't @ me.*

### :icon[Globe]{.text-blue-500 .inline-block .mr-1 .mb-1} Internationalization

Full i18n support using `next-intl`:

```
/messages
├── en.json  # English translations
└── pl.json  # Polish translations
```

All UI text, error messages, and notifications are localized. The middleware automatically detects browser locale and redirects to the appropriate language route (`/en/*` or `/pl/*`).

---

## API Architecture

The backend exposes a comprehensive **REST API**:

### Authentication
```http
POST /api/auth/register
POST /api/auth/[...nextauth]
```

### Books
```http
GET  /api/books/available
GET  /api/books/search?q=query
POST /api/books/create
GET  /api/books/[id]/view
```

### Transactions
```http
POST /api/transactions
GET  /api/transactions/[id]
PUT  /api/transactions/[id]/accept
PUT  /api/transactions/[id]/reject
```

### Messaging
```http
GET  /api/messages?conversationId=...&limit=50
POST /api/messages
```

### Ranking
```http
GET /api/ranking/leaderboard?page=1&limit=100
```

---

## Project Structure Highlights

```
lib/
├── achievements/    # Achievement rules and checking engines
├── ranking/         # Score calculation and tier logic
├── matching.ts      # Book matching algorithms
├── models/          # Mongoose schemas (User, Book, Transaction, Message)
└── context/         # React contexts (Cart, Socket.io)

components/
├── checkout/        # Drag & drop exchange interface
├── messages/        # Chat UI components
├── ranking/         # Leaderboard tables and comparison tools
└── achievements/    # Badge cards and carousels
```

---

# Result

The platform successfully demonstrates **full-stack engineering** concepts:

- **Authentication** with NextAuth.js (credentials + OAuth ready)
- **Real-time** communication via Socket.io
- **NoSQL** data modeling with Mongoose
- **Gamification** to drive user engagement
- **i18n** for multi-language support
- **Modern UI** with Tailwind, shadcn, and Framer Motion

This project showcases how to build a **production-grade** social platform with complex business logic, real-time features, and engaging gamification mechanics.

---

*P.S. - If you want to trade books, I'm still looking for a first edition of "Clean Code". I'll trade you three medium articles about why you shouldn't read it.*

