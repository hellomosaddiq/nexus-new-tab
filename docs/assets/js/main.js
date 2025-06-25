// Documentation data (using same structure as blog posts)
const posts = [
    {
        id: 1,
        title: 'Installation Guide',
        excerpt:
            'Step-by-step instructions for installing NEXUS New Tab Extension from the Chrome Web Store or manual installation for developers.',
        category: 'getting-started',
        tags: ['installation', 'chrome-web-store', 'setup', 'getting-started'],
        readTime: '5 min read'
    },
    {
        id: 2,
        title: 'Quick Start Guide',
        excerpt:
            'Get up and running with NEXUS in minutes. Learn the essential features and keyboard shortcuts to boost your productivity immediately.',
        category: 'getting-started',
        tags: ['quick-start', 'basics', 'keyboard-shortcuts', 'productivity'],
        readTime: '5 min read'
    },
    {
        id: 3,
        title: 'Keyboard Shortcuts Reference',
        excerpt:
            'Complete reference of all keyboard shortcuts in NEXUS. Master single-key shortcuts for maximum efficiency and workflow optimization.',
        category: 'getting-started',
        tags: ['keyboard-shortcuts', 'productivity', 'workflow', 'reference'],
        readTime: '4 min read'
    },
    {
        id: 4,
        title: 'Smart Date Features',
        excerpt:
            'Discover all 12 intelligent date insights including week progress, year progress, moon phases, and seasonal information for enhanced time awareness.',
        category: 'features',
        tags: ['smart-date', 'time-awareness', 'productivity', 'insights'],
        readTime: '8 min read'
    },
    {
        id: 5,
        title: 'Focus Timer',
        excerpt:
            'Master the built-in Pomodoro timer with visual progress indicators, keyboard controls, and productivity tracking for enhanced focus sessions.',
        category: 'features',
        tags: ['focus-timer', 'pomodoro', 'productivity', 'time-management'],
        readTime: '6 min read'
    },
    {
        id: 6,
        title: 'Todo List',
        excerpt:
            'Complete guide to the built-in task management system with persistent storage, keyboard shortcuts, and efficient workflow integration.',
        category: 'features',
        tags: ['todo-list', 'task-management', 'productivity', 'organization'],
        readTime: '7 min read'
    },
    {
        id: 7,
        title: 'Daily Quotes',
        excerpt:
            'Explore the intelligent quote system with 200+ curated quotes, context-aware selection, and daily motivation for sustained inspiration.',
        category: 'features',
        tags: ['daily-quotes', 'motivation', 'inspiration', 'productivity'],
        readTime: '5 min read'
    },
    {
        id: 8,
        title: 'AI Tab Prediction',
        excerpt:
            'Deep dive into the machine learning algorithms that learn your browsing patterns and predict tabs with advanced contextual intelligence.',
        category: 'features',
        tags: ['ai', 'machine-learning', 'tab-prediction', 'algorithms'],
        readTime: '12 min read'
    },
    {
        id: 9,
        title: 'Quick Shortcuts',
        excerpt:
            'Master the AI-powered command palette and quick access system for instant navigation and enhanced productivity workflows.',
        category: 'features',
        tags: ['quick-shortcuts', 'command-palette', 'navigation', 'productivity'],
        readTime: '6 min read'
    },
    {
        id: 10,
        title: 'Themes and Colors',
        excerpt:
            'Explore 9 beautiful color themes and accent colors. Learn how to customize the visual appearance to match your personal style and workflow.',
        category: 'customization',
        tags: ['themes', 'colors', 'customization', 'design'],
        readTime: '7 min read'
    },
    {
        id: 11,
        title: 'Typography Options',
        excerpt:
            'Discover 5 premium font combinations including Classic Professional, Modern Tech, Creative Designer, and Apple Ecosystem typography themes.',
        category: 'customization',
        tags: ['typography', 'fonts', 'design', 'customization'],
        readTime: '6 min read'
    },
    {
        id: 12,
        title: 'Advanced Settings',
        excerpt:
            'Complete guide to advanced configuration options, feature toggles, data management, and power user customization techniques.',
        category: 'customization',
        tags: ['advanced-settings', 'configuration', 'power-user', 'customization'],
        readTime: '9 min read'
    }
];

// State
let currentFilter = 'all';

// DOM elements
const preloader = document.getElementById('preloader');
const postsGrid = document.getElementById('postsGrid');
const navItems = document.querySelectorAll('.nav-item');
const floatingNav = document.getElementById('floatingNav');

// Mobile menu elements
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileMenuPanel = document.getElementById('mobile-menu-panel');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

// Initialize app
function init() {
    // Only run homepage functionality if we're on the homepage
    if (postsGrid) {
        setupEventListeners();
        renderPosts();
        addScrollEffects();
    }

    // Setup mobile menu (always available)
    setupMobileMenu();

    // Always run preloader animation
    animatePreloader();
}

// Setup event listeners
function setupEventListeners() {
    // Only setup if elements exist
    if (!navItems || !postsGrid) return;

    // Navigation clicks
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            handleNavClick(item.dataset.filter);
        });
    });

    // Post clicks
    document.addEventListener('click', e => {
        const postCard = e.target.closest('.post-card');
        if (postCard) {
            handlePostClick(postCard.dataset.id);
        }
    });

    // Scroll effects
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Handle navigation click
function handleNavClick(filter) {
    // Update active state
    navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.filter === filter);
    });

    if (currentFilter !== filter) {
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
}

// Handle post click
function handlePostClick(postId) {
    // Map post IDs to URLs
    const postUrls = {
        1: 'getting-started/installation.html',
        2: 'getting-started/quick-start.html',
        3: 'getting-started/keyboard-shortcuts.html',
        4: 'features/smart-date-features.html',
        5: 'features/focus-timer.html',
        6: 'features/todo-list.html',
        7: 'features/daily-quotes.html',
        8: 'features/ai-tab-prediction.html',
        9: 'features/quick-shortcuts.html',
        10: 'customization/themes-and-colors.html',
        11: 'customization/typography.html',
        12: 'customization/advanced-settings.html'
    };

    const url = postUrls[postId];
    if (url) {
        window.location.href = url;
    }
}

// Handle scroll
function handleScroll() {
    // Only handle scroll effects if floating nav exists (homepage only)
    if (!floatingNav) return;

    const scrollY = window.scrollY;
    const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;

    // Show/hide floating nav - adjusted for hero with image
    // Appear after scrolling past the hero text content but before the image
    if (scrollY > heroHeight * 0.3) {
        floatingNav.classList.add('visible');
    } else {
        floatingNav.classList.remove('visible');
    }
}

// ===== MOBILE MENU SYSTEM =====

// Setup mobile menu functionality
function setupMobileMenu() {
    if (!mobileMenuButton || !mobileMenuOverlay || !mobileMenuPanel) return;

    // Mobile menu button click
    mobileMenuButton.addEventListener('click', toggleMobileMenu);

    // Overlay click to close
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    // Mobile navigation items
    mobileNavItems.forEach(item => {
        item.addEventListener('click', e => {
            handleMobileNavClick(item.dataset.filter);
            closeMobileMenu();
        });
    });

    // Escape key to close
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobileMenuPanel.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Prevent body scroll when menu is open
    const preventScroll = e => e.preventDefault();

    // Add scroll prevention when menu opens
    mobileMenuOverlay.addEventListener('transitionstart', () => {
        if (mobileMenuOverlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('touchmove', preventScroll, { passive: false });
        }
    });

    // Remove scroll prevention when menu closes
    mobileMenuOverlay.addEventListener('transitionend', () => {
        if (!mobileMenuOverlay.classList.contains('active')) {
            document.body.style.overflow = '';
            document.removeEventListener('touchmove', preventScroll);
        }
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    const isActive = mobileMenuPanel.classList.contains('active');

    if (isActive) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

// Open mobile menu
function openMobileMenu() {
    mobileMenuButton.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    mobileMenuPanel.classList.add('active');

    // Focus management for accessibility
    mobileMenuPanel.focus();
}

// Close mobile menu
function closeMobileMenu() {
    mobileMenuButton.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    mobileMenuPanel.classList.remove('active');

    // Return focus to menu button
    mobileMenuButton.focus();
}

// Handle mobile navigation click
function handleMobileNavClick(filter) {
    // Update active state for mobile nav items
    mobileNavItems.forEach(item => {
        item.classList.toggle('active', item.dataset.filter === filter);
    });

    // Also update desktop nav items if they exist
    if (navItems) {
        navItems.forEach(item => {
            item.classList.toggle('active', item.dataset.filter === filter);
        });
    }

    // Handle the filter change (reuse existing logic)
    if (currentFilter !== filter && postsGrid) {
        const postsSection = document.getElementById('posts') || postsGrid;
        if (postsSection) {
            postsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });

            postsGrid.classList.add('transitioning');

            setTimeout(() => {
                currentFilter = filter;
                renderPosts();

                setTimeout(() => {
                    postsGrid.classList.remove('transitioning');
                }, 100);
            }, 150);
        } else {
            currentFilter = filter;
            renderPosts();
        }
    }
}

// Render posts - Clean and simple (EXACT copy from blog)
function renderPosts() {
    // Only render if postsGrid exists (homepage only)
    if (!postsGrid) return;

    const filteredPosts =
        currentFilter === 'all' ? posts : posts.filter(post => post.category === currentFilter);

    // Clear existing posts
    postsGrid.innerHTML = '';

    // Add posts without animations (matches blog)
    filteredPosts.forEach(post => {
        const postElement = createPostElement(post);
        postsGrid.appendChild(postElement);
    });
}

// Create post element (EXACT copy from blog)
function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'post-card';
    article.dataset.category = post.category;
    article.dataset.id = post.id;

    article.innerHTML = `
        <div class="post-meta">
            <span class="post-category">${post.category}</span>
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

// Add scroll effects (simplified to match blog)
function addScrollEffects() {
    // Minimal scroll effects to match blog
}

// Minimal Preloader with percentage counter (EXACT copy from blog)
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

// Start the app
document.addEventListener('DOMContentLoaded', init);
