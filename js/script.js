/* ===================================================
   Fahad Alzubaidi — Portfolio Script
   SWE363 Assignment 4
   =================================================== */

'use strict';

// ===========================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ===========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });

            // Close mobile menu if open
            const mobileMenu = document.getElementById('navMenu');
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// ===========================================
// MOBILE MENU TOGGLE
// ===========================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// ===========================================
// NAVBAR SCROLL EFFECT
// ===========================================
const navbar = document.getElementById('navbar');
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Add/remove scrolled shadow
    if (currentScroll > 80) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    // Back-to-top visibility
    if (backToTopBtn) {
        if (currentScroll > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
});

// Back-to-top button click handler
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===========================================
// DARK / LIGHT THEME TOGGLE
// ===========================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Apply saved preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);

        // Spin animation
        themeToggle.style.transform = 'rotate(360deg) scale(1.1)';
        setTimeout(() => { themeToggle.style.transform = 'rotate(0deg) scale(1)'; }, 350);
    });
}

// ===========================================
// TIME-BASED GREETING
// ===========================================
function updateGreeting() {
    const greetingEl = document.getElementById('greeting');
    if (!greetingEl) return;
    const hour = new Date().getHours();
    let text, emoji;

    if      (hour >= 5  && hour < 12) { text = 'Good Morning';   emoji = '☀️'; }
    else if (hour >= 12 && hour < 17) { text = 'Good Afternoon'; emoji = '🌤️'; }
    else if (hour >= 17 && hour < 21) { text = 'Good Evening';   emoji = '🌆'; }
    else                               { text = 'Good Night';     emoji = '🌙'; }

    greetingEl.textContent = `${emoji} ${text}!`;
}
updateGreeting();

// ===========================================
// TYPEWRITER EFFECT
// ===========================================
const typewriterRoles = [
    'Software Engineer',
    'Data Analyst',
    'ML Enthusiast',
    'Web Developer',
    'Data Automation Engineer',
    'Problem Solver',
    'KFUPM Student',
];

let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriterText');

function runTypewriter() {
    if (!typewriterEl) return;

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
        delay = 1800; // pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typeIndex = (typeIndex + 1) % typewriterRoles.length;
        delay = 400;
    }

    setTimeout(runTypewriter, delay);
}

runTypewriter();

// ===========================================
// PARTICLE CANVAS BACKGROUND
// ===========================================
(function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    let W = window.innerWidth;
    let H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;

    function Particle() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.r = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.alpha = Math.random() * 0.4 + 0.1;
    }

    function buildParticles() {
        const count = Math.floor((W * H) / 14000);
        particles = Array.from({ length: count }, () => new Particle());
    }

    function drawParticles() {
        ctx.clearRect(0, 0, W, H);

        // Determine particle color based on theme
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const base = isDark ? '180, 180, 255' : '99, 102, 241';

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${base}, ${p.alpha})`;
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

    window.addEventListener('resize', () => {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
        buildParticles();
    });
})();

// ===========================================
// ANIMATED STATS COUNTER
// ===========================================
function animateCounter(element, target, suffix, duration = 1500) {
    let start = 0;
    const step = target / (duration / 16);

    function update() {
        start = Math.min(start + step, target);
        element.textContent = Math.floor(start) + suffix;
        if (start < target) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const statsSection = document.querySelector('.stats-section');
let statsAnimated = false;

if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !statsAnimated) {
            statsAnimated = true;
            document.querySelectorAll('.stat-item').forEach(item => {
                const numEl     = item.querySelector('.stat-number');
                const target    = parseInt(item.dataset.target, 10);
                const suffix    = item.dataset.suffix || '';
                animateCounter(numEl, target, suffix);
            });
            statsObserver.disconnect();
        }
    }, { threshold: 0.4 });

    statsObserver.observe(statsSection);
}

// ===========================================
// TIMELINE REVEAL ANIMATION
// ===========================================
const timelineCards = document.querySelectorAll('.timeline-card');

if (timelineCards.length) {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    timelineCards.forEach(card => timelineObserver.observe(card));
}

// ===========================================
// SKILL BARS ANIMATION
// ===========================================
const skillBarsContainer = document.getElementById('skillBars');

if (skillBarsContainer) {
    const skillBarsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            document.querySelectorAll('.skill-bar-fill').forEach(bar => {
                bar.classList.add('animate');
            });
            skillBarsObserver.disconnect();
        }
    }, { threshold: 0.3 });

    skillBarsObserver.observe(skillBarsContainer);
}

// ===========================================
// PROJECT MODALS
// ===========================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus trap: set focus to the close button
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) setTimeout(() => closeBtn.focus(), 100);
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Open via the overlay buttons on cards
document.querySelectorAll('[data-modal-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(btn.dataset.modalTarget);
    });
});

// Close via close button
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.closest('.modal-overlay')));
});

// Close when clicking the backdrop
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal(overlay);
    });
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(closeModal);
    }
});

// ===========================================
// CONTACT FORM VALIDATION AND SUBMISSION
// ===========================================
const contactForm   = document.getElementById('contactForm');
const formStatus    = document.getElementById('formStatus');
const messageInput  = document.getElementById('message');
const charCountEl   = document.getElementById('charCount');

// Live character count
if (messageInput && charCountEl) {
    messageInput.addEventListener('input', () => {
        const len = messageInput.value.length;
        charCountEl.textContent = `${len} / 500 characters`;
        charCountEl.style.color = len > 450
            ? 'hsl(0, 76%, 55%)'
            : 'var(--color-text-tertiary)';
    });
}

function showFieldError(input, errorEl, message) {
    input.classList.add('is-invalid');
    if (errorEl) errorEl.textContent = message;
}

function clearFieldError(input, errorEl) {
    input.classList.remove('is-invalid');
    if (errorEl) errorEl.textContent = '';
}

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
}

if (contactForm) {
    // Real-time clear on typing
    ['name', 'email', 'message'].forEach(id => {
        const input = document.getElementById(id);
        const error = document.getElementById(`${id}Error`);
        if (input) {
            input.addEventListener('input', () => clearFieldError(input, error));
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput    = document.getElementById('name');
        const emailInput   = document.getElementById('email');
        const msgInput     = document.getElementById('message');
        const nameError    = document.getElementById('nameError');
        const emailError   = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');
        const submitBtn    = document.getElementById('submitBtn');

        const name    = nameInput.value.trim();
        const email   = emailInput.value.trim();
        const message = msgInput.value.trim();
        const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let hasError = false;

        // Clear previous errors
        clearFieldError(nameInput, nameError);
        clearFieldError(emailInput, emailError);
        clearFieldError(msgInput, messageError);
        formStatus.style.display = 'none';

        // Validate
        if (!name) {
            showFieldError(nameInput, nameError, 'Name is required.');
            hasError = true;
        }
        if (!email || !emailRx.test(email)) {
            showFieldError(emailInput, emailError, 'Please enter a valid email address.');
            hasError = true;
        }
        if (!message) {
            showFieldError(msgInput, messageError, 'Message cannot be empty.');
            hasError = true;
        } else if (message.length > 500) {
            showFieldError(msgInput, messageError, 'Message must be 500 characters or less.');
            hasError = true;
        }

        if (hasError) {
            showFormStatus('⚠️ Please fix the highlighted fields before sending.', 'error');
            return;
        }

        // Simulate submission (loading state)
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            showFormStatus(
                `✅ Message sent! Thanks ${name}, I'll get back to you soon.`,
                'success'
            );
            contactForm.reset();
            if (charCountEl) charCountEl.textContent = '0 / 500 characters';

            // Auto-dismiss after 6s
            setTimeout(() => { formStatus.style.display = 'none'; }, 6000);
        }, 1800);
    });
}

// ===========================================
// PROJECT FILTERING AND SORTING
// ===========================================
const projectSearch = document.getElementById('projectSearch');
const filterBtns    = document.querySelectorAll('.filter-btn');
const projectSort   = document.getElementById('projectSort');

function getProjectCards() {
    return Array.from(document.querySelectorAll('.project-card'));
}

/**
 * Core filter + sort function.
 * Reads the current search term, active category, and sort order,
 * then shows/hides and reorders cards accordingly.
 */
function filterProjects() {
    const searchTerm  = projectSearch ? projectSearch.value.toLowerCase() : '';
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const sortValue   = projectSort ? projectSort.value : 'default';

    const grid        = document.getElementById('projectsGrid');
    const projectCards = getProjectCards();

    const matching = [];
    const hidden   = [];

    projectCards.forEach(card => {
        const title       = card.querySelector('.project-title').textContent.toLowerCase();
        const description = card.querySelector('.project-description').textContent.toLowerCase();
        const tags        = Array.from(card.querySelectorAll('.tag')).map(t => t.textContent.toLowerCase());
        const category    = card.dataset.category;

        const matchesSearch   = !searchTerm ||
            title.includes(searchTerm) ||
            description.includes(searchTerm) ||
            tags.some(t => t.includes(searchTerm));

        const matchesCategory = (activeFilter === 'all' || category === activeFilter);

        (matchesSearch && matchesCategory ? matching : hidden).push(card);
    });

    // Sort matching cards
    matching.sort((a, b) => {
        const titleA   = a.querySelector('.project-title').textContent.trim();
        const titleB   = b.querySelector('.project-title').textContent.trim();
        const tagsA    = a.querySelectorAll('.tag').length;
        const tagsB    = b.querySelectorAll('.tag').length;

        switch (sortValue) {
            case 'title-asc':  return titleA.localeCompare(titleB);
            case 'title-desc': return titleB.localeCompare(titleA);
            case 'tags-asc':   return tagsA - tagsB;
            case 'tags-desc':  return tagsB - tagsA;
            default:           return 0;
        }
    });

    // Remove empty state
    const existing = document.getElementById('emptySearchMessage');
    if (existing) existing.remove();

    // Re-append in order (matching first, hidden after)
    [...matching, ...hidden].forEach(card => grid.appendChild(card));

    // Show/hide cards
    hidden.forEach(card => {
        card.style.display = 'none';
        card.style.opacity = '0';
    });
    matching.forEach((card, i) => {
        card.style.display = 'block';
        card.style.opacity = '0';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, i * 50);
    });

    // Show empty state if nothing matches
    if (matching.length === 0) {
        const empty = document.createElement('div');
        empty.id = 'emptySearchMessage';
        empty.style.cssText = 'grid-column:1/-1;text-align:center;padding:3rem 1rem;color:var(--color-text-tertiary)';
        empty.innerHTML = `
            <div style="font-size:3rem;margin-bottom:1rem">🔍</div>
            <h3 style="font-size:1.25rem;margin-bottom:0.5rem">No projects found</h3>
            <p>Try adjusting your search or filter. Click <strong>All</strong> to reset.</p>
        `;
        grid.appendChild(empty);
    }
}

if (projectSearch) projectSearch.addEventListener('input', filterProjects);
if (projectSort)   projectSort.addEventListener('change', filterProjects);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProjects();
    });
});

// ===========================================
// GITHUB API — FETCH REPOS
// ===========================================
async function fetchGitHubRepos() {
    const container = document.getElementById('github-repos-container');
    if (!container) return;

    const username = 'fahadalzubaidi';

    try {
        const res = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=owner`,
            { headers: { Accept: 'application/vnd.github.v3+json' } }
        );

        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

        const repos = await res.json();

        if (!repos.length) {
            container.innerHTML = '<div class="error-state"><p>No public repositories found.</p></div>';
            return;
        }

        container.innerHTML = '';

        repos.forEach((repo, i) => {
            const card = document.createElement('div');
            card.className = 'github-repo-card';
            card.style.cssText = `opacity:0;transform:translateY(20px);transition:all 0.5s ease ${i * 0.08}s`;

            const langIcon = {
                JavaScript: '🟨',
                Python:     '🐍',
                HTML:       '🌐',
                Java:       '☕',
                TypeScript: '🔷',
                CSS:        '🖥️',
            }[repo.language] || '📦';

            card.innerHTML = `
                <div class="repo-header">
                    <span class="repo-icon">${langIcon}</span>
                    <div class="repo-stat">
                        <span>⭐</span>
                        <span>${repo.stargazers_count}</span>
                    </div>
                </div>
                <h3 class="repo-name">${escapeHtml(repo.name)}</h3>
                <p class="repo-description">${escapeHtml(repo.description || 'No description provided.')}</p>
                <div class="repo-stats">
                    <div class="repo-stat">
                        <span>🔤</span>
                        <span>${escapeHtml(repo.language || 'Mixed')}</span>
                    </div>
                    <div class="repo-stat">
                        <span>🍴</span>
                        <span>${repo.forks_count}</span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer"
                        class="repo-link" aria-label="View ${escapeHtml(repo.name)} on GitHub">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                    </a>
                </div>
            `;

            container.appendChild(card);
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + i * 80);
        });

    } catch (err) {
        console.error('GitHub fetch error:', err);
        container.innerHTML = `
            <div class="error-state">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p>Couldn't load GitHub repositories. Check your connection and try again.</p>
                <button onclick="fetchGitHubRepos()" class="btn btn-secondary"
                    style="margin-top:1rem;padding:0.5rem 1rem;font-size:0.8rem">
                    Retry
                </button>
            </div>
        `;
    }
}

// Helper: prevent XSS from API data
function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// Lazy-load GitHub section when visible
const githubSection = document.getElementById('github');
if (githubSection) {
    const githubObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            fetchGitHubRepos();
            githubObserver.disconnect();
        }
    }, { threshold: 0.1 });
    githubObserver.observe(githubSection);
}

// ===========================================
// SCROLL REVEAL ANIMATIONS
// ===========================================
const revealEls = document.querySelectorAll(
    '.project-card, .skill-card, .info-item, .github-repo-card, .stat-item'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// ===========================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ===========================================
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function highlightNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const top    = section.offsetTop;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);
highlightNav(); // run once on load

// ===========================================
// CURSOR GLOW EFFECT (Desktop only)
// ===========================================
if (window.matchMedia('(min-width: 768px) and (hover: hover)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.cssText = `
        position:fixed;width:24px;height:24px;border-radius:50%;
        background:radial-gradient(circle,rgba(99,102,241,0.35) 0%,transparent 70%);
        pointer-events:none;z-index:9999;
        transition:transform 0.12s ease;display:none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left  = (e.clientX - 12) + 'px';
        cursor.style.top   = (e.clientY - 12) + 'px';
    });

    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2.5)'; });
        el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; });
    });
}

// ===========================================
// VISITOR TIMER — time spent on page
// ===========================================
const timerDisplay = document.getElementById('timerDisplay');
let visitSeconds = 0;

function formatTime(secs) {
    if (secs < 60)   return `${secs}s`;
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
}

if (timerDisplay) {
    setInterval(() => {
        visitSeconds++;
        timerDisplay.textContent = formatTime(visitSeconds);
    }, 1000);
}

// ===========================================
// VISITOR NAME — state management (localStorage)
// ===========================================
const visitorNameInput = document.getElementById('visitorNameInput');
const visitorNameBtn   = document.getElementById('visitorNameBtn');
const visitorGreeting  = document.getElementById('visitorGreeting');
const visitorInputRow  = document.getElementById('visitorInputRow');

function showVisitorGreeting(name) {
    if (!visitorGreeting || !visitorInputRow) return;
    visitorGreeting.textContent = `👋 Welcome, ${name}! Enjoy browsing my portfolio.`;
    visitorGreeting.style.display = 'block';
    visitorInputRow.style.display = 'none';
}

// Restore from previous session
const savedName = localStorage.getItem('visitorName');
if (savedName) showVisitorGreeting(savedName);

if (visitorNameBtn) {
    visitorNameBtn.addEventListener('click', () => {
        const name = visitorNameInput ? visitorNameInput.value.trim() : '';
        if (!name) {
            if (visitorNameInput) {
                visitorNameInput.classList.add('is-invalid');
                visitorNameInput.placeholder = 'Please enter your name first!';
            }
            return;
        }
        localStorage.setItem('visitorName', name);
        showVisitorGreeting(name);
    });
}

if (visitorNameInput) {
    visitorNameInput.addEventListener('input', () => {
        visitorNameInput.classList.remove('is-invalid');
        visitorNameInput.placeholder = 'Enter your name for a personal greeting';
    });
    // Allow pressing Enter to submit
    visitorNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') visitorNameBtn?.click();
    });
}

// ===========================================
// LAZY LOADING IMAGES
// ===========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// ===========================================
// CONSOLE EASTER EGG
// ===========================================
console.log('%c🦦 Hello, Developer!', 'font-size:20px;font-weight:bold;color:#6366f1;');
console.log('%cWelcome to Fahad Alzubaidi\'s portfolio!', 'font-size:14px;color:#64748b;');
console.log('%cInterested in the code? → https://github.com/fahadalzubaidi', 'font-size:12px;color:#94a3b8;');
