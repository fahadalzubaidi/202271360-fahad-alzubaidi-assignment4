# Fahad Alzubaidi — Portfolio | SWE363 Assignment 4

![Portfolio Preview](assets/images/profile.jpg)

## 🔗 Live Demo
> **[fahadalzubaidi.github.io/202271360-fahad-alzubaidi-assignment4](https://fahadalzubaidi.github.io/202271360-fahad-alzubaidi-assignment4/)**

---

## 📋 Project Description

A premium, production-ready personal portfolio website for **Fahad Alzubaidi**, built from the ground up with vanilla HTML, CSS, and JavaScript. The portfolio demonstrates advanced front-end development techniques including real-time API integration, complex animations, interactive UI components, and full responsive design.

---

## ✨ Features

### Core Functionality
- **Typewriter Hero Effect** — Animated multi-role cycling text in the hero section
- **Animated Particle Background** — Subtle floating particle canvas across the entire site
- **Live Stats Counter** — Animated number counters triggered on scroll (projects, technologies, years)
- **Experience Timeline** — Interactive vertical timeline showcasing internships, projects, and education (from CV)
- **Project Modals** — Click-to-open overlay popups with full project details, rich metadata, and skill tags
- **Animated Skill Bars** — Proficiency percentage bars that animate when scrolled into view
- **GitHub API Integration** — Live repository cards fetched and rendered dynamically with language icons
- **Project Filtering + Sorting** — Real-time search, category filtering, and multi-field sorting
- **Contact Form** — Full validation with inline field errors, character counter, and loading state
- **Visitor Widget** — Personalized greeting with localStorage persistence + live session timer

### Design & UX
- **Dark / Light Mode Toggle** — System-aware default, persisted in `localStorage`
- **Animated Floating Badges** — Profile image overlaid with KFUPM and interest badges
- **Availability Badge** — Pulsing green indicator on the contact section
- **Back-to-Top Button** — Smooth-scroll button that appears after scrolling 400px
- **Custom Cursor Glow** — Radial gradient cursor follower on desktop (hover-aware only)
- **Scroll-Reveal Animations** — `IntersectionObserver`-powered staggered reveal for all cards
- **Active Nav Highlighting** — Precise section-aware navigation link highlighting
- **Mobile-First Responsive** — Fully tested at 320px, 480px, 768px, 1024px, 1440px+

---

## 🏗 Project Structure

```
├── index.html                     # Main entry point
├── css/
│   └── styles.css                 # Full design system & component styles
├── js/
│   └── script.js                  # Interactive logic, API, animations
├── assets/
│   ├── cv/
│   │   └── Fahad_Alzubaidi_CV.pdf # Downloadable CV
│   └── images/
│       ├── profile.jpg            # Hero profile photo
│       ├── project1.jpg           # ML project thumbnail
│       ├── project2.jpg           # Inventory system thumbnail
│       └── project3.jpg           # KISEF website thumbnail
├── docs/
│   ├── technical-documentation.md # Architecture, features, testing, customisation
│   └── ai-usage-report.md         # Full AI usage log with responsible-use section
├── presentation/
│   ├── slides.pdf                 # Presentation slide deck
│   └── demo-video.mp4             # Recorded demo video (5–7 min)
├── .gitignore
└── README.md
```

---

## 🚀 Setup & Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/fahadalzubaidi/202271360-fahad-alzubaidi-assignment4.git
   ```
2. **Open the site** — Simply open `index.html` in any modern browser (Edge, Chrome, Firefox, Safari).  
   No build step or server required.
3. **Dependencies** — None. Pure vanilla HTML, CSS, JS for maximum compatibility and performance.

---

## 🧭 How to Use This Portfolio

### Navigation
- Click any nav link to **smooth-scroll** to that section
- The active section is **auto-highlighted** in the nav bar as you scroll
- On mobile, tap the **☰ hamburger icon** to open/close the menu

### Dark / Light Mode
- Click the **☀️/🌙 icon** (top-right) to toggle themes
- Preference is **saved across sessions** via `localStorage`

### Experience Timeline
- Scroll to the **Experience & Education** section to see the interactive timeline
- Cards **fade in** as they enter the viewport

### Projects
- Use the **search bar** to filter by keyword (title, description, or tech stack)
- Use the **category buttons** (All / ML / Web / Automation) to filter
- Use the **Sort dropdown** to reorder results
- **Click any project card** (or "View Details") to open a full detail modal with metrics

### Skills
- Scroll to the **Skills** section to see the proficiency bars **animate in** with percentages

### GitHub Activity
- The **Latest Repositories** section fetches live data from the GitHub API
- Each card shows the repo name, language, star count, forks, and a direct link
- If the API fails, a **retry button** appears

### Contact Form
- Fill in name, email, (optional subject), and message
- **Inline errors** appear for each invalid field
- A **character counter** tracks your message length
- On success, a confirmation message appears and the form resets

### Visitor Widget
- Type your name and click **Say Hi 👋** in the hero section for a personalized greeting
- Your name is **remembered** across sessions via `localStorage`
- A live **session timer** shows how long you've been on the site

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary | `hsl(235, 86%, 65%)` — Indigo/Violet |
| Accent  | `hsl(190, 85%, 50%)` — Cyan |
| Secondary | `hsl(340, 82%, 60%)` — Rose |
| Font (Display) | Outfit 400/600/700/800 |
| Font (Body) | Inter 300/400/500/600/700 |
| Border Radius | 4px → 9999px scale |
| Transition | 150ms / 250ms / 400ms cubic-bezier |

---

## 🤝 AI Integration Summary

| Tool | Provider | Primary Use Cases |
|------|----------|------------------|
| **Antigravity** | Google DeepMind (Claude Sonnet) | Architecture design, feature implementation, debugging, documentation |

### What AI Helped With
- **Particle canvas background** — Canvas 2D API animation loop with `requestAnimationFrame`
- **Typewriter effect** — Character-by-character cycling with delete/retype phases
- **IntersectionObserver patterns** — Scroll-triggered stat counters, skill bars, and timeline reveals
- **Project modal system** — Accessible overlay with focus trap, Escape key handler, and backdrop close
- **GitHub API integration** — Lazy-loaded fetch with XSS-safe `escapeHtml()` helper and error retry UI
- **Form validation** — Inline field errors, character counter, and loading state
- **Responsive layout strategies** — Mobile-first breakpoints at 320px, 480px, 768px, 1024px

### Responsible Use
Every AI suggestion was manually reviewed before being accepted:
- All **personal content** (bio, job history, descriptions, GPA) written by me independently
- **Placeholder data** invented by AI was replaced with real CV information
- All **CSS tokens** were mapped to the project's existing design system, not AI defaults
- **Testing** was performed by me in the browser — the AI could not run the code

*Full disclosure with per-feature breakdown → [docs/ai-usage-report.md](docs/ai-usage-report.md)*

---

## 📄 License

© 2026 Fahad Alzubaidi. All rights reserved.
