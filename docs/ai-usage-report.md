# AI Usage Report
## SWE363 – Assignment 4 | Fahad Alzubaidi (202271360)

This report documents all use of Artificial Intelligence tools during the development of the **"SWE363 - Assignment 4: Production-Ready Portfolio"** project. It covers specific use cases, prompts, outcomes, challenges, and responsible-use practices.

---

## 1. AI Tool Used

| Tool | Provider | Role |
|------|----------|------|
| **Antigravity** | Google DeepMind (powered by Claude Sonnet) | Primary agentic coding assistant for architecture, implementation, debugging, and documentation |

---

## 2. Feature-by-Feature AI Use Cases

### 2.1 Particle Canvas Background
- **What AI did:** Designed a self-contained IIFE (Immediately Invoked Function Expression) that initialises a `<canvas>` element covering the full viewport, generates particle objects with random position, velocity, and opacity, and runs an `requestAnimationFrame` draw loop. It also handled the `resize` event to rebuild the particle pool when the viewport changes.
- **What I did:** Chose particle density, tuned the colour to match the site's indigo/cyan palette, and verified it didn't cause layout reflow or performance degradation on mobile.

### 2.2 Typewriter Hero Effect
- **What AI did:** Implemented a character-by-character typewriter with role cycling, a configurable pause at the end of each word, and a deletion phase before moving to the next role.
- **What I did:** Defined the actual role array (`'Software Engineer'`, `'Data Analyst'`, `'ML Enthusiast'`, etc.) based on my real background, and added `'Data Automation Engineer'` and `'Data Analyst'` after reflecting on my CV experience.

### 2.3 Experience & Education Timeline
- **What AI did:** Built the alternating left/right vertical timeline layout with scroll-triggered fade-in cards using `IntersectionObserver`.
- **What I did:** All content was filled in personally from my **real CV** — including the KIKX Administrative Assistant role, Unipal Marketing Coordinator, KISEF Tech Committee Leader, and KFUPM education entry with actual GPA (3.525/4.0) and dates. I replaced the placeholder job entries the AI had assumed.

### 2.4 Animated Skill Progress Bars
- **What AI did:** Implemented the skill bar component using a CSS `--target-width` custom property animated via a class toggle triggered on `IntersectionObserver`. Added `Data Analysis` (80%) and `Data Automation` (78%) bars after I requested them.
- **What I did:** Set all percentage values based on my honest self-assessment. I added `Data Analysis` and `Data Automation` categories after reviewing my actual skill set.

### 2.5 Live Stats Counter
- **What AI did:** Built `animateCounter()` using `requestAnimationFrame` with a linear step to count from 0 to a target value, triggered once when the section enters the viewport.
- **What I did:** Set the stat targets: I corrected "2 years" to **3 years** of study (2022–2025) and changed "Projects" to **"Professional Roles"** (3+) to better reflect actual experience. I also set Technologies to **10+** after counting my CV skill list.

### 2.6 Project Modal Popups
- **What AI did:** Built the modal overlay system — `openModal()` / `closeModal()` functions, backdrop click to close, Escape key listener, focus trap to the close button, and `overflow: hidden` on `body` while open.
- **What I did:** Wrote all modal content (project descriptions, metrics, tags) from personal project knowledge. I also ensured all `aria-*` attributes were correct for accessibility.

### 2.7 Floating Profile Badges
- **What AI did:** On my request, added two additional floating badges (left-middle: 📈 Data Analysis; bottom-right: 💡 Open to Work) with staggered `animation-delay` values so all four badges float independently.
- **What I did:** Decided which labels to use, confirmed the positions looked balanced visually, and verified the responsive CSS collapsed them inward on mobile so they don't overflow.

### 2.8 Back-to-Top Button
- **What AI did:** Implemented scroll-event listener checking `window.scrollY > 400` to toggle a `.visible` class that controls opacity and `translateY`.
- **What I did:** Reviewed the scroll threshold value and CSS transition for feel.


---

## 3. Prompts Used

| # | Prompt Summary | Feature Built |
|---|---|---|
| 1 | *"Rewrite script.js to support: typewriter, particle canvas, stats counter, skill bars, project modals, back-to-top, and GitHub lazy-load."* | Full JS rewrite for Assignment 4 |
| 2 | *"Fix the Experience timeline to match my real CV — KIKX, Unipal, KISEF — with correct titles, dates, and bullet points."* | CV-accurate timeline |
| 3 | *"Add Data Analysis and Data Automation to skill bars, skill cards, typewriter roles, and project filter."* | Skills & filter expansion |
| 4 | *"Add 2 more floating badges around the profile photo."* | 4 floating badges total |

---

## 4. Benefits & Challenges

### Benefits
- **Speed**: Complex features like the particle canvas and modal focus-trap would have taken days of solo research — the AI implemented them in minutes, leaving me time to personalise and validate.
- **Code Quality**: The AI consistently applied best practices: `'use strict'`, XSS escaping, `aria-*` attributes, `rel="noopener noreferrer"` on external links, and `IntersectionObserver` for performance instead of scroll event polling.
- **Architecture Guidance**: Suggested using a single `filterProjects()` pipeline to combine search, category, and sort rather than three separate handlers — a significantly cleaner pattern.

### Challenges
- **Placeholder Content**: The AI initially filled timeline entries with fake job titles (e.g., "IT Intern @ SABIC") since it didn't know my real history. I had to give it my CV to correct this.
- **CSS File Size**: The AI expanded the stylesheet significantly. I reviewed for duplicate rules and redundant selectors before accepting changes.

---

## 5. Learning Outcomes

- **Canvas API**: Learned how to use `requestAnimationFrame` for smooth, non-blocking 60fps animation loops.
- **CSS Custom Properties as Animation Targets**: Using `--target-width` as a variable inside a `@keyframes` rule is a powerful pattern I'll apply in future projects.
- **IntersectionObserver Patterns**: Confirmed that it's always preferable to use IO over scroll event listeners for viewport-triggered logic — no jank.
- **XSS Prevention**: `escapeHtml()` via a temporary `div` node is a simple, zero-dependency method to sanitise untrusted text before inserting it into the DOM.
- **Modal Accessibility**: Learned that dialogs require `aria-modal="true"`, `role="dialog"`, `aria-labelledby`, and a focus trap to be accessible — not just visually styled.

---

## 6. Responsible Use & Modifications

This section addresses the academic integrity requirements of the assignment rubric. All AI-generated code and content was reviewed, modified, and validated before being accepted into the project.

| AI Suggestion | What I Reviewed | Modification Made |
|---|---|---|
| Particle canvas IIFE | Verified no memory leaks — `resize` listener removes old particles before rebuilding | Tuned density constant from `/10000` to `/14000` for sparser, cleaner look |
| Timeline HTML entries | AI used fake placeholder job titles ("SABIC IT Intern") | Replaced 100% of content with real CV data — jobs, dates, bullet points |
| Skill bar percentages | AI used round numbers (80%, 70%) | Adjusted to honest self-assessed values based on actual experience |
| `filterProjects()` | Initial sort mutated the DOM in-place causing UI flicker | Rewrote to use array `.sort()` then `appendChild()` re-ordering |
| `escapeHtml()` helper | Verified it sanitises `<`, `>`, `"`, and `&` | Confirmed it was applied to all 4 user-visible GitHub API fields |
| GitHub error state HTML | AI used `onclick="fetchGitHubRepos()"` inline handler | Reviewed and kept — function is global-scoped so this is safe |
| Stats counter targets | AI set "2 years of study" and "5 technologies" | Corrected to **3 years** (2022→2025) and **10+ technologies** from CV |
| CSS design tokens | AI used generic `hsl(210, …)` blue | Updated to the project's existing indigo palette `hsl(235, 86%, 65%)` |

---

## 7. Risks & Mitigations

| Risk | What Happened | How I Mitigated It |
|------|--------------|-------------------|
| **Hallucinated personal information** | AI invented "IT Intern @ SABIC" and other fake experience entries | Replaced all content with real CV data; AI cannot know my personal history |
| **Over-engineered CSS** | Badge left/right positions used `calc()` unnecessarily | Simplified to plain percentage values after testing |
| **Dead code risk** | New skill categories added to JS filter logic that didn't match any `data-category` in HTML | Cross-checked every `data-filter` button value against all `data-category` attributes in `index.html` |

---


## 7. What AI Did NOT Do

To preserve academic integrity, the following were done entirely by me:
- All **personal content** (bio text, project descriptions, job titles, GPA, skills list, contact details)
- All **design decisions** (colour palette choice, which badges to add, which emojis to use)
- All **content validation** (ensuring the CV data in the timeline is accurate to my actual history)
- All **testing** (opening the site in a browser, checking responsiveness, verifying API responses)

---

## Summary

AI was an essential productivity tool for Assignment 4, enabling a premium, multi-feature portfolio that would have taken significantly longer to build manually. However, the AI required consistent human direction, content correction, and validation at every step.
