# Technical Documentation
## SWE363 – Assignment 4 | Fahad Alzubaidi (202271360)

---

## 1. Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Structure | **HTML5** | Semantic markup, accessibility (`aria-*`), modals, canvas element |
| Presentation | **CSS3** + Custom Properties | Design tokens, animations, responsive layout, dark/light themes |
| Logic | **Vanilla JavaScript (ES6+)** | All interactivity — no frameworks, no build step |
| External APIs | **GitHub REST API v3** | Live repository data fetched client-side |
| Fonts | **Google Fonts** (Inter + Outfit) | Professional typography |

**Zero npm packages. Zero runtime dependencies.**

---

## 2. Project Structure

```
├── index.html                    # Single-page application entry point
├── css/
│   └── styles.css                # Complete design system (2100+ lines)
├── js/
│   └── script.js                 # All interactivity (~850 lines)
├── assets/
│   ├── cv/Fahad_Alzubaidi_CV.pdf # Downloadable CV
│   └── images/                   # profile.jpg, project1-3.jpg
├── docs/
│   ├── technical-documentation.md
│   └── ai-usage-report.md
└── README.md
```

---

## 3. Feature Architecture

### 3.1 Particle Canvas Background

A self-contained IIFE draws floating particles over the hero section using the **Canvas 2D API**:

```javascript
(function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function Particle() {
        this.x  = Math.random() * W;
        this.y  = Math.random() * H;
        this.r  = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.alpha = Math.random() * 0.4 + 0.1;
    }

    function drawParticles() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;
        });
        requestAnimationFrame(drawParticles);
    }

    buildParticles();
    drawParticles();
})();
```

**Key decisions:**
- Particle count scales with viewport area (`W * H / 14000`) so density stays consistent from mobile to 4K.
- Uses `requestAnimationFrame` — zero `setInterval` polling, no main-thread blocking.
- Particle color reads the active theme (`data-theme`) so it adapts to dark/light mode.

---

### 3.2 Typewriter Effect

Cycles through an array of professional roles character-by-character:

```javascript
const typewriterRoles = [
    'Software Engineer', 'Data Analyst', 'ML Enthusiast',
    'Web Developer', 'Data Automation Engineer', 'Problem Solver', 'KFUPM Student'
];

function runTypewriter() {
    const currentRole = typewriterRoles[typeIndex];
    if (isDeleting) {
        typewriterEl.textContent = currentRole.slice(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = currentRole.slice(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 60 : 100;
    if (!isDeleting && charIndex === currentRole.length) {
        delay = 1800; isDeleting = true;         // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typeIndex = (typeIndex + 1) % typewriterRoles.length;
        delay = 400;
    }
    setTimeout(runTypewriter, delay);
}
```

---

### 3.3 Experience & Education Timeline

A CSS alternating-column layout (`timeline-item--left` / `--right`) with `IntersectionObserver` scroll reveal:

```javascript
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            timelineObserver.unobserve(entry.target);     // Observe once only
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.timeline-card').forEach(card =>
    timelineObserver.observe(card)
);
```

**Content (from CV):**
| Entry | Organisation | Period |
|-------|-------------|--------|
| 🎓 B.Sc. Software Engineering | KFUPM — GPA 3.525/4.0 | 2022 – 2027 |
| 🏢 Administrative Assistant (Part-time) | KIKX | Sep 2024 – Present |
| 📱 Marketing & Biz Dev Coordinator (Part-time) | Unipal | May – Aug 2025 |
| 💡 Tech Committee Leader | KISEF Forum | Jan – May 2025 |

---

### 3.4 Animated Skill Progress Bars

Uses a CSS Custom Property `--target-width` as the animation target, toggled by a class:

```css
.skill-bar-fill {
    width: 0;
    transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.skill-bar-fill.animate {
    width: var(--target-width);
}
```

```javascript
const skillBarsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        document.querySelectorAll('.skill-bar-fill').forEach(bar =>
            bar.classList.add('animate')
        );
        skillBarsObserver.disconnect();   // Trigger once
    }
}, { threshold: 0.3 });
```

**Skill levels defined:**

| Skill | Level |
|-------|-------|
| Python | 85% |
| JavaScript | 80% |
| HTML & CSS | 90% |
| Java | 70% |
| Machine Learning | 75% |
| SQL / MongoDB | 65% |
| Data Analysis | 80% |
| Data Automation | 78% |

---

### 3.5 Animated Stats Counter

`requestAnimationFrame` based counter triggered by `IntersectionObserver`:

```javascript
function animateCounter(element, target, suffix, duration = 1500) {
    let start = 0;
    const step = target / (duration / 16);  // ~60fps

    function update() {
        start = Math.min(start + step, target);
        element.textContent = Math.floor(start) + suffix;
        if (start < target) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}
```

**Stats defined:**

| Stat | Target | Label |
|------|--------|-------|
| 3+ | Professional Roles | Real work history |
| 10+ | Technologies | From CV skills list |
| 4 | Years of Study | 2022 → 2026 |
| 100% | Passion for Code | — |

---

### 3.6 Project Modals

A focus-trapped, keyboard-accessible overlay system:

```javascript
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';   // Prevent background scroll
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) setTimeout(() => closeBtn.focus(), 100);  // Focus trap
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape')
        document.querySelectorAll('.modal-overlay.active').forEach(closeModal);
});
```

**Accessibility attributes:**
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` on every modal
- Close button has `aria-label="Close modal"`

---

### 3.7 GitHub API Integration

Live fetch, lazy-loaded, and XSS-safe:

```javascript
async function fetchGitHubRepos() {
    const res = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
        { headers: { Accept: 'application/vnd.github.v3+json' } }
    );
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const repos = await res.json();
    repos.forEach(repo => {
        card.innerHTML = `<h3>${escapeHtml(repo.name)}</h3>...`;   // XSS-safe
    });
}

// XSS prevention helper
function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// Lazy-load: only fetch when section is visible
const githubObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        fetchGitHubRepos();
        githubObserver.disconnect();
    }
}, { threshold: 0.1 });
```

---

### 3.8 Project Filter + Sort

Single unified pipeline combining three inputs:

```javascript
function filterProjects() {
    const searchTerm   = projectSearch.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter;
    const sortValue    = projectSort.value;

    // Step 1: Partition into matching / hidden
    projectCards.forEach(card => {
        const title    = card.querySelector('.project-title').textContent.toLowerCase();
        const tags     = Array.from(card.querySelectorAll('.tag'))
                             .map(t => t.textContent.toLowerCase());
        const category = card.dataset.category;

        const matchesSearch   = !searchTerm || title.includes(searchTerm)
                                || tags.some(t => t.includes(searchTerm));
        const matchesCategory = activeFilter === 'all' || category === activeFilter;
        (matchesSearch && matchesCategory ? matching : hidden).push(card);
    });

    // Step 2: Sort matching cards
    matching.sort((a, b) => { /* title-asc, title-desc, tags-asc, tags-desc */ });

    // Step 3: Re-order DOM + animate in
    [...matching, ...hidden].forEach(card => grid.appendChild(card));
}
```

**Filter categories:** All · Machine Learning · Web Development · Automation · Data

---

### 3.9 Theme Toggle (Dark / Light Mode)

```javascript
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});
```

All colors are CSS Custom Properties declared in `:root` and overridden in `[data-theme="dark"]`:

```css
:root {
    --color-primary:    hsl(235, 86%, 65%);
    --color-bg-primary: hsl(220, 20%, 97%);
    --color-text-primary: hsl(215, 25%, 15%);
}

[data-theme="dark"] {
    --color-primary:    hsl(235, 86%, 70%);
    --color-bg-primary: hsl(215, 28%, 9%);
    --color-text-primary: hsl(210, 20%, 96%);
}
```

---

### 3.10 State Management

All user state uses `localStorage` — no backend required:

| Key | Value | Purpose |
|-----|-------|---------|
| `theme` | `'dark'` or `'light'` | Persist theme across sessions |
| `visitorName` | String | Personalised greeting on return visits |

---

## 4. CSS Design System

| Token Category | Example Token | Value |
|---------------|--------------|-------|
| Primary colour | `--color-primary` | `hsl(235, 86%, 65%)` — Indigo |
| Accent colour | `--color-accent` | `hsl(190, 85%, 50%)` — Cyan |
| Secondary | `--color-secondary` | `hsl(340, 82%, 60%)` — Rose |
| Background | `--color-bg-primary` | Theme-aware |
| Spacing unit | `--spacing-md` | `1.5rem` |
| Border radius | `--radius-lg` | `1rem` |
| Transition | `--transition-base` | `250ms cubic-bezier(0.4, 0, 0.2, 1)` |
| Font display | `--font-display` | Outfit |
| Font body | `--font-primary` | Inter |

---

## 5. Performance Optimisations

| Optimisation | Implementation |
|---|---|
| **Lazy image loading** | `loading="lazy"` on all `<img>` except the hero photo (`loading="eager"`) |
| **Deferred API fetch** | GitHub API only called when section enters viewport (`IntersectionObserver`) |
| **rAF-based animations** | Counters and particles use `requestAnimationFrame`, not `setInterval` |
| **One-time observers** | All `IntersectionObserver` instances call `.disconnect()` or `.unobserve()` after triggering |
| **Zero external JS libs** | No jQuery, no Lodash, no animation library — all custom |
| **CSS-driven animations** | Skill bars, timeline reveals, and badge floats are pure CSS — no JS per-frame cost |

---

## 6. Responsive Breakpoints

| Breakpoint | Target | Key Changes |
|-----------|--------|-------------|
| `≤ 1024px` | Tablets | Hero switches to column layout |
| `≤ 768px` | Mobile | Hamburger nav, single-column timeline |
| `≤ 480px` | Small phones | Font scaling, badge snapped inward |

---


## 7. Known Limitations

| Limitation | Reason | Planned Fix |
|-----------|--------|-------------|
| **Contact form doesn't send real email** | No backend; exposing an API key client-side is a security risk | EmailJS or FormSubmit.co integration in future |
| **GitHub API rate-limited (60 req/hr)** | Unauthenticated public token | Add a serverless proxy to authenticate with a GitHub token server-side |
| **Particle canvas disabled on low-end CPU** | Not yet implemented | Add a `prefers-reduced-motion` media query check to skip particles |

---

## 8. Customisation Guide

### Adding a New Project Card
```html
<article class="project-card" data-category="data" data-modal="modal-new">
    <div class="project-image">
        <img src="assets/images/newproject.jpg" alt="Project Name" loading="lazy">
        <div class="project-overlay">
            <button class="overlay-btn" data-modal-target="modal-new">View Details</button>
        </div>
    </div>
    <div class="project-content">
        <h3 class="project-title">Project Name</h3>
        <p class="project-description">Short description here.</p>
        <div class="project-tags">
            <span class="tag">Python</span>
        </div>
    </div>
</article>
```
Valid `data-category` values: `machine-learning`, `web-development`, `automation`, `data`

### Adding a New Skill Bar
```html
<div class="skill-bar-item" data-skill="New Skill" data-level="70">
    <div class="skill-bar-header">
        <span class="skill-bar-name">🔧 New Skill</span>
        <span class="skill-bar-pct">70%</span>
    </div>
    <div class="skill-bar-track">
        <div class="skill-bar-fill" style="--target-width: 70%"></div>
    </div>
</div>
```

### Updating GitHub Username
In `js/script.js`, line ~555:
```javascript
const username = 'your-github-handle';
```

### Modifying the Design System
All design tokens are in `css/styles.css` inside `:root` and `[data-theme="dark"]`. Change one variable and it propagates everywhere.
