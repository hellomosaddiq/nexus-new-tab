// Blog posts data
const posts = [
    {
        id: 1,
        title: 'Building NEXUS: How I Created a Premium Chrome Extension Without Frameworks',
        excerpt:
            'A deep dive into building a Chrome extension with vanilla JavaScript, covering architecture, AI features, minimalist todo system, and the challenges of avoiding frameworks.',
        category: 'development',
        tags: ['chrome-extension', 'vanilla-js', 'ai', 'performance', 'architecture', 'todo'],
        date: '2025-06-25',
        readTime: '12 min read'
    },
    {
        id: 2,
        title: 'The Architecture Behind NEXUS: Enterprise-Grade Extension Development',
        excerpt:
            'How I designed a modular system that handles AI predictions, caches 45MB of data, and loads in under 100ms – all while maintaining clean, readable code.',
        category: 'technical',
        tags: ['architecture', 'modular-design', 'performance', 'cross-browser', 'error-handling'],
        date: '2025-07-02',
        readTime: '15 min read'
    },
    {
        id: 3,
        title: 'From Idea to Reality: 6 Months of Building NEXUS New Tab',
        excerpt:
            'The real story behind building a 15,000+ line Chrome extension – the mistakes, breakthroughs, and lessons that shaped NEXUS from a simple idea to a professional product.',
        category: 'development',
        tags: [
            'journey',
            'lessons-learned',
            'development-process',
            'chrome-extension',
            'personal-growth'
        ],
        date: '2025-07-09',
        readTime: '18 min read'
    },
    {
        id: 4,
        title: 'Building AI-Powered Tab Prediction and Hidden Features with Vanilla JavaScript',
        excerpt:
            'How I built machine learning algorithms that learn user browsing patterns and predict tabs with 85%+ accuracy, plus the sophisticated hidden features that make NEXUS feel polished and professional.',
        category: 'technical',
        tags: ['ai', 'machine-learning', 'vanilla-js', 'algorithms', 'privacy'],
        date: '2025-07-16',
        readTime: '18 min read'
    },
    {
        id: 5,
        title: 'Creating a Dynamic Accent Color System with CSS Custom Properties',
        excerpt:
            'How I turned a technical limitation into a design strength – building 9 beautiful accent colors that eliminate flickering and provide instant personality switching.',
        category: 'design',
        tags: ['css', 'design-system', 'theming', 'performance', 'user-experience'],
        date: '2025-07-23',
        readTime: '14 min read'
    },
    {
        id: 6,
        title: 'IndexedDB Mastery: Building a 45MB Intelligent Caching System',
        excerpt:
            'How I built an enterprise-grade caching system that stores 45MB of data, reduces network requests by 95%, and makes the extension feel lightning-fast with intelligent cleanup.',
        category: 'technical',
        tags: ['indexeddb', 'caching', 'performance', 'storage', 'optimization'],
        date: '2025-07-30',
        readTime: '19 min read'
    },
    {
        id: 7,
        title: 'Cross-Browser Extension Development: One Codebase, Four Browsers',
        excerpt:
            'How I achieved 95%+ feature parity across Chrome, Firefox, Edge, and Safari with intelligent API detection, polyfills, and graceful degradation strategies.',
        category: 'technical',
        tags: ['cross-browser', 'compatibility', 'polyfills', 'api-detection', 'testing'],
        date: '2025-08-06',
        readTime: '15 min read'
    },
    {
        id: 8,
        title: 'Designing for Everyone: WCAG 2.1 AA Accessibility in Practice',
        excerpt:
            'How I achieved full WCAG 2.1 AA compliance with comprehensive screen reader support, keyboard navigation, and real assistive technology testing.',
        category: 'design',
        tags: [
            'accessibility',
            'wcag',
            'screen-readers',
            'keyboard-navigation',
            'inclusive-design'
        ],
        date: '2025-08-13',
        readTime: '16 min read'
    },
    {
        id: 9,
        title: 'Typography in Extensions: 5 Premium Font Combinations That Actually Work',
        excerpt:
            'How I curated 5 premium font combinations that transform the feel of the entire extension, each telling a different story and appealing to different user preferences.',
        category: 'design',
        tags: ['typography', 'design-system', 'fonts', 'user-experience', 'performance'],
        date: '2025-08-20',
        readTime: '18 min read'
    },
    {
        id: 10,
        title: 'From Frustration to Open Source Success: Lessons from Building NEXUS',
        excerpt:
            'The complete journey from frustrated 19-year-old developer to open source success. 15,000+ lines of code, 6 months of development, and the lessons learned along the way.',
        category: 'development',
        tags: [
            'open-source',
            'lessons-learned',
            'development-journey',
            'chrome-extension',
            'success-story'
        ],
        date: '2025-08-27',
        readTime: '17 min read'
    },
    {
        id: 11,
        title: "Design Philosophy: Why NEXUS Does Less (And Why That's Better)",
        excerpt:
            'The story behind every design decision I made, the philosophy that guided NEXUS, and heartfelt acknowledgments to the people and tools that shaped this extension.',
        category: 'development',
        tags: [
            'design-philosophy',
            'development-journey',
            'acknowledgments',
            'minimalism',
            'user-experience',
            'open-source'
        ],
        date: '',
        readTime: '15 min read'
    }
];

// App state
let currentFilter = 'all';

// DOM elements
const preloader = document.getElementById('preloader');
const postsGrid = document.getElementById('postsGrid');
const navItems = document.querySelectorAll('.nav-item');
const floatingNav = document.getElementById('floatingNav');

// Minimal Preloader with percentage counter
function animatePreloader() {
    const counter = document.getElementById('preloaderCounter');
    if (!counter) return;

    let progress = 0;
    const duration = 800; // 0.8 seconds - optimized for modern UX
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        progress = Math.min((elapsed / duration) * 100, 100);

        counter.textContent = Math.floor(progress) + '%';

        if (progress < 100) {
            requestAnimationFrame(updateCounter);
        } else {
            // Small delay before hiding
            setTimeout(hidePreloader, 200);
        }
    }

    requestAnimationFrame(updateCounter);
}

function hidePreloader() {
    if (preloader) {
        preloader.classList.add('hidden');
        // Remove from DOM after transition
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 800); // Match CSS transition duration
    }
}

// Initialize app
function init() {
    setupEventListeners();
    renderPosts();
    addScrollEffects();

    // Start preloader animation
    animatePreloader();
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', handleNavClick);
    });

    // Post clicks
    document.addEventListener('click', e => {
        const postCard = e.target.closest('.post-card');
        if (postCard) {
            handlePostClick(postCard.dataset.id);
        }
    });

    // Throttled scroll for better performance
    let scrollTimeout;
    document.addEventListener(
        'scroll',
        () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(handleScroll, 10);
        },
        { passive: true }
    );

    // Handle window resize to recalculate hero height
    window.addEventListener(
        'resize',
        () => {
            clearTimeout(scrollTimeout);
            handleScroll();
        },
        { passive: true }
    );

    // Initial scroll check
    handleScroll();
}

// Handle navigation click with smooth scroll
function handleNavClick(e) {
    const filter = e.currentTarget.dataset.filter;

    // Update active state
    navItems.forEach(item => item.classList.remove('active'));
    e.currentTarget.classList.add('active');

    // Smooth scroll to posts section first
    const postsSection = document.getElementById('posts') || postsGrid;
    if (postsSection) {
        postsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });

        // Add transitioning class for subtle fade
        postsGrid.classList.add('transitioning');

        // Update filter and render after scroll starts
        setTimeout(() => {
            currentFilter = filter;
            renderPosts();

            // Remove transitioning class after render
            setTimeout(() => {
                postsGrid.classList.remove('transitioning');
            }, 100);
        }, 150);
    } else {
        // Fallback if no posts section found
        currentFilter = filter;
        renderPosts();
    }
}

// Handle post click
function handlePostClick(postId) {
    window.location.href = `post.html?id=${postId}`;
}

// Handle scroll (matching documentation behavior)
function handleScroll() {
    // Only handle scroll effects if floating nav exists (homepage only)
    if (!floatingNav) return;

    const scrollY = window.scrollY;
    const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;

    // Show/hide floating nav - appear after scrolling past 30% of hero (same as docs)
    if (scrollY > heroHeight * 0.3) {
        floatingNav.classList.add('visible');
    } else {
        floatingNav.classList.remove('visible');
    }
}

// Render posts - Clean and simple
function renderPosts() {
    const filteredPosts =
        currentFilter === 'all' ? posts : posts.filter(post => post.category === currentFilter);

    // Clear existing posts
    postsGrid.innerHTML = '';

    // Add posts without animations
    filteredPosts.forEach(post => {
        const postElement = createPostElement(post);
        postsGrid.appendChild(postElement);
    });
}

// Create post element
function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'post-card';
    article.dataset.category = post.category;
    article.dataset.id = post.id;

    const formattedDate = formatDate(post.date);

    article.innerHTML = `
        <div class="post-meta">
            <span class="post-category">${post.category}</span>
            <span class="post-date">${formattedDate}</span>
            <span class="post-read-time">${post.readTime}</span>
        </div>
        <h2 class="post-title">${post.title}</h2>
        <p class="post-excerpt">${post.excerpt}</p>
        <div class="post-tags">
            ${post.tags
                .slice(0, 4)
                .map(tag => `<span class="post-tag">${tag}</span>`)
                .join('')}
        </div>
    `;

    return article;
}

// Format date elegantly
function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Add scroll-triggered animations
function addScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe post cards as they're added
    const cards = document.querySelectorAll('.post-card');
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
