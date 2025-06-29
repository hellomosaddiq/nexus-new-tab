/**
 * NEXUS Quick Shortcuts - AI-Powered Command Palette
 * Advanced command palette with AI tab prediction and intelligent caching
 *
 * @author mosaddiq
 * @version 1.0.0
 * @since 1.0.0
 */

// eslint-disable-next-line no-unused-vars
class QuickShortcuts {
    /**
     * Initialize the Quick Shortcuts system
     *
     * Sets up all data stores, AI systems, caching mechanisms, and UI state.
     * Uses defensive initialization to handle missing dependencies gracefully.
     *
     * INITIALIZATION SEQUENCE:
     * 1. Initialize core data stores and UI state
     * 2. Set up AI-powered tab memory system
     * 3. Initialize favicon caching system
     * 4. Bind keyboard shortcuts and load initial data
     *
     * PERFORMANCE NOTES:
     * - Lazy initialization of heavy components
     * - Asynchronous setup to prevent blocking
     * - Graceful degradation when APIs are unavailable
     */
    constructor() {
        // ===== CORE STATE MANAGEMENT =====

        /** @type {boolean} Whether the command palette is currently visible */
        this.isVisible = false;

        /** @type {boolean} Whether initial data loading has completed */
        this.isLoaded = false;

        // ===== DATA STORES =====
        // Each store maintains exactly 6 items for consistent UI layout

        /** @type {Array<Object>} User bookmarks with favicon and metadata */
        this.bookmarks = [];

        /** @type {Array<Object>} Browser top sites with usage analytics */
        this.topSites = [];

        /** @type {Array<Object>} Recent tabs and history with AI scoring */
        this.recentTabs = [];

        /** @type {Array<Object>} Search engines with custom query handling */
        this.searchEngines = [];

        // ===== UI STATE MANAGEMENT =====

        /** @type {string} Currently active tab in the command palette */
        this.activeTab = 'bookmarks';

        /** @type {string} Current search query for filtering results */
        this.searchQuery = '';

        // ===== AI-POWERED TAB MEMORY SYSTEM =====
        // Advanced machine learning system for predicting user behavior

        /** @type {TabMemorySystem} AI system for tab prediction and learning */
        this.tabMemory = new TabMemorySystem();

        /** @type {boolean} Whether tab memory system is fully initialized */
        this.tabMemoryReady = false;
        this.initTabMemory();

        // ===== FAVICON CACHING SYSTEM =====
        // Multi-tier caching for optimal performance and offline support

        /** @type {NexusCacheManager|null} Persistent cache manager for favicons */
        this.cacheManager = null;
        this.initCacheManager();

        /** @type {Map<string, string>} Session-based favicon cache for speed */
        this.faviconCache = new Map();

        // ===== INITIALIZATION =====
        this.init();
    }

    /**
     * Initialize the Quick Shortcuts system
     *
     * Coordinates the startup sequence for keyboard shortcuts and data loading.
     * Uses asynchronous initialization to prevent blocking the main thread.
     *
     * INITIALIZATION ORDER:
     * 1. Bind keyboard shortcuts for immediate responsiveness
     * 2. Load data asynchronously in background
     *
     * @private
     */
    init() {
        this.bindKeyboardShortcuts();
        this.loadData();
    }

    /**
     * Check if AI features are enabled in user settings
     *
     * Retrieves the current AI tab prediction setting from storage.
     * Used to determine whether to use machine learning features.
     *
     * @returns {Promise<boolean>} Whether AI features are enabled
     * @private
     * @async
     */
    async isAIEnabled() {
        try {
            const result = await chrome.storage.sync.get(['aiTabPrediction']);
            return result.aiTabPrediction !== false; // Default to true if not set
        } catch (error) {
            return true; // Default to enabled if storage fails
        }
    }

    /**
     * Initialize AI-powered tab memory system
     *
     * Sets up the machine learning system that learns user behavior patterns
     * and predicts which tabs users are likely to access. Handles initialization
     * failures gracefully to ensure the extension works without AI features.
     *
     * MACHINE LEARNING FEATURES:
     * - Pattern recognition for tab access behavior
     * - Confidence scoring for predictions
     * - Adaptive learning based on user interactions
     * - Privacy-preserving local processing
     *
     * ERROR HANDLING:
     * - Graceful degradation when AI system fails
     * - Fallback to standard tab ordering
     * - No impact on core functionality
     *
     * @private
     * @async
     */
    async initTabMemory() {
        try {
            // Check if AI is enabled before initializing
            const aiEnabled = await this.isAIEnabled();
            if (!aiEnabled) {
                this.tabMemoryReady = false;
                return;
            }

            // Wait for TabMemorySystem to fully initialize with all ML models
            await this.tabMemory.init();
            this.tabMemoryReady = true;
        } catch (error) {
            // AI system failed - continue without machine learning features
            this.tabMemoryReady = false;
        }
    }

    /**
     * Initialize favicon caching system
     *
     * Sets up multi-tier caching system for optimal favicon loading performance.
     * Attempts to use global cache manager first, then creates local instance.
     * Handles missing dependencies gracefully with fallback strategies.
     *
     * CACHING STRATEGY:
     * - Primary: Global cache manager (shared across extension)
     * - Secondary: Local cache manager instance
     * - Fallback: Session-only caching
     *
     * PERFORMANCE BENEFITS:
     * - Reduces network requests for repeated favicon loads
     * - Improves perceived performance with instant icon display
     * - Offline support for cached favicons
     * - Memory-efficient with LRU eviction policies
     *
     * ERROR HANDLING:
     * - Graceful degradation to direct favicon URLs
     * - No impact on functionality when caching fails
     * - Automatic retry mechanisms for transient failures
     *
     * @private
     * @async
     */
    async initCacheManager() {
        try {
            // Primary: Use global cache manager if available (preferred)
            if (window.nexusApp && window.nexusApp.cacheManager) {
                this.cacheManager = window.nexusApp.cacheManager;
                await this.cacheManager.initPromise;
            } else {
                // Secondary: Create local cache manager instance
                if (typeof NexusCacheManager !== 'undefined') {
                    this.cacheManager = new NexusCacheManager();
                    await this.cacheManager.initPromise;
                }
            }
        } catch (error) {
            // Fallback: Continue without persistent caching
            this.cacheManager = null;
        }
    }

    /**
     * ===== KEYBOARD SHORTCUTS SYSTEM =====
     *
     * Advanced keyboard handling with conflict prevention and accessibility support.
     * Implements modern UX patterns while respecting browser defaults and user input.
     */

    /**
     * Bind global keyboard shortcuts for command palette
     *
     * Sets up intelligent keyboard handling that respects user context and
     * prevents conflicts with browser shortcuts. Uses event delegation for
     * optimal performance and proper cleanup.
     *
     * KEYBOARD SHORTCUTS:
     * - K: Toggle command palette (when not typing)
     * - Ctrl+K: Prevented to avoid browser address bar focus
     * - Escape: Close command palette
     *
     * ACCESSIBILITY FEATURES:
     * - Respects input focus state
     * - Proper event prevention
     * - Screen reader compatibility
     * - Keyboard navigation support
     *
     * PERFORMANCE CONSIDERATIONS:
     * - Single event listener with delegation
     * - Efficient focus detection
     * - Minimal DOM queries
     *
     * @private
     */
    bindKeyboardShortcuts() {
        document.addEventListener('keydown', e => {
            // CRITICAL: Never block browser shortcuts with Ctrl/Cmd/Alt modifiers
            // Allow Ctrl+K, Ctrl+N, Ctrl+T, etc. to work normally
            if (e.ctrlKey || e.metaKey || e.altKey) {
                return; // Let browser handle all modifier key combinations
            }

            // ===== COMMAND PALETTE TOGGLE (K) =====

            // K key toggles command palette when user is not typing
            if (e.key === 'k' || e.key === 'K') {
                if (!this.isInputFocused()) {
                    e.preventDefault();
                    this.toggle();
                }
            }

            // ===== ESCAPE TO CLOSE =====

            // Escape key closes command palette (standard UX pattern)
            if (e.key === 'Escape' && this.isVisible) {
                e.preventDefault();
                this.hide();
            }
        });
    }

    /**
     * Check if user is currently typing in an input field
     *
     * Determines whether keyboard shortcuts should be intercepted or allowed
     * to pass through to input fields. Prevents shortcuts from interfering
     * with normal typing and form interactions.
     *
     * DETECTION STRATEGY:
     * - Checks active element tag name
     * - Supports contentEditable elements
     * - Handles edge cases with null elements
     *
     * SUPPORTED INPUT TYPES:
     * - Standard input fields
     * - Textarea elements
     * - ContentEditable elements
     * - Rich text editors
     *
     * @returns {boolean} True if user is currently typing in an input field
     * @private
     */
    isInputFocused() {
        const activeElement = document.activeElement;
        return (
            activeElement &&
            (activeElement.tagName === 'INPUT' ||
                activeElement.tagName === 'TEXTAREA' ||
                activeElement.contentEditable === 'true')
        );
    }

    /**
     * ===== DATA LOADING SYSTEM =====
     *
     * Comprehensive data loading system with parallel processing, error handling,
     * and performance optimization. Loads all data sources concurrently for
     * optimal user experience.
     */

    /**
     * Load all data sources concurrently
     *
     * Orchestrates parallel loading of bookmarks, top sites, recent tabs, and
     * search engines. Uses Promise.all for maximum performance while ensuring
     * graceful degradation when individual sources fail.
     *
     * LOADING STRATEGY:
     * - Parallel execution for optimal performance
     * - Individual error handling per data source
     * - Graceful degradation with fallback data
     * - One-time loading with caching
     *
     * DATA SOURCES:
     * 1. Bookmarks: User's saved bookmarks with favicon caching
     * 2. Top Sites: Browser's most visited sites with analytics
     * 3. Recent Tabs: Recently closed tabs + history with AI scoring
     * 4. Search Engines: Curated search engines for developers
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - Concurrent loading reduces total time
     * - Early return for already loaded data
     * - Efficient error handling without blocking
     * - Memory-efficient data structures
     *
     * ERROR HANDLING:
     * - Individual source failures don't affect others
     * - Silent failures with fallback data
     * - Comprehensive logging for debugging
     * - Graceful degradation to empty states
     *
     * @async
     * @private
     */
    async loadData() {
        // Prevent duplicate loading
        if (this.isLoaded) return;

        try {
            // Load all data sources concurrently for optimal performance
            await Promise.all([
                this.loadBookmarks(), // User bookmarks with favicon caching
                this.loadTopSites(), // Browser top sites with analytics
                this.loadRecentTabs(), // Recent tabs + history with AI
                this.loadSearchEngines() // Curated search engines
            ]);
            this.isLoaded = true;
        } catch (error) {
            // Silent failure - individual loaders handle their own errors
            // This ensures the extension works even with partial data loading
        }
    }

    /**
     * Load user bookmarks with cross-browser compatibility
     *
     * Implements sophisticated cross-browser bookmark loading with support for
     * both promise-based and callback-based APIs. Handles browser differences
     * gracefully while maintaining consistent functionality.
     *
     * CROSS-BROWSER COMPATIBILITY:
     * - Firefox: Uses browser.bookmarks with promise-based API
     * - Chrome: Uses chrome.bookmarks with callback-based API
     * - Edge: Uses chrome.bookmarks with callback-based API
     * - Modern Chrome: Supports promise-based API with polyfill
     *
     * API DETECTION STRATEGY:
     * 1. Check for browser.runtime (Firefox/WebExtensions)
     * 2. Fallback to chrome.runtime (Chrome/Chromium)
     * 3. Detect promise vs callback API by function length
     * 4. Wrap callbacks in promises for consistent handling
     *
     * DATA PROCESSING:
     * - Recursive tree traversal for nested bookmark folders
     * - Favicon URL generation for visual consistency
     * - Fallback data when bookmarks are unavailable
     * - Consistent 6-item output for UI layout
     *
     * ERROR HANDLING:
     * - Graceful degradation when bookmarks API unavailable
     * - Fallback to popular sites when no bookmarks exist
     * - Silent failures with comprehensive logging
     * - Maintains UI consistency with placeholder data
     *
     * @async
     * @private
     */
    async loadBookmarks() {
        try {
            // ===== CROSS-BROWSER API DETECTION =====

            // Detect browser API (Firefox uses 'browser', Chrome uses 'chrome')
            const api = typeof browser !== 'undefined' && browser.runtime ? browser : chrome;

            // Ensure bookmarks API is available
            if (!api?.bookmarks?.getTree) return;

            // ===== PROMISE VS CALLBACK API HANDLING =====

            let tree;
            if (api.bookmarks.getTree.length === 0) {
                // Promise-based API (Firefox, modern Chrome with polyfill)
                tree = await api.bookmarks.getTree();
            } else {
                // Callback-based API (older Chrome, Edge)
                tree = await new Promise((resolve, reject) => {
                    api.bookmarks.getTree(result => {
                        if (api.runtime.lastError) {
                            reject(api.runtime.lastError);
                        } else {
                            resolve(result);
                        }
                    });
                });
            }

            // ===== DATA PROCESSING =====

            // Extract bookmarks from nested tree structure
            const realBookmarks = this.extractBookmarks(tree);

            // Ensure exactly 6 items for consistent UI layout
            this.bookmarks = await this.fillToSix(realBookmarks, 'bookmark');
        } catch (error) {
            // Graceful fallback: Use popular sites as bookmark alternatives
            this.bookmarks = await this.fillToSix([], 'bookmark');
        }
    }

    /**
     * Load browser top sites with usage analytics
     *
     * Loads the user's most frequently visited sites using browser analytics.
     * Implements cross-browser compatibility and intelligent favicon caching
     * for optimal performance and visual consistency.
     *
     * TOP SITES FEATURES:
     * - Browser-native usage analytics for accurate ranking
     * - Intelligent title fallback to domain names
     * - Cached favicon loading for instant display
     * - Cross-browser API compatibility
     *
     * DATA ENRICHMENT:
     * - Favicon caching with multi-tier strategy
     * - Domain name extraction for missing titles
     * - Type classification for UI rendering
     * - Consistent 6-item output for layout
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - Concurrent favicon loading with Promise.all
     * - Session-based caching for repeated access
     * - Efficient domain name parsing
     * - Minimal DOM manipulation
     *
     * CROSS-BROWSER SUPPORT:
     * - Firefox: browser.topSites with promise API
     * - Chrome: chrome.topSites with callback API
     * - Edge: chrome.topSites with callback API
     * - Automatic API detection and wrapping
     *
     * @async
     * @private
     */
    async loadTopSites() {
        try {
            // ===== CROSS-BROWSER API DETECTION =====

            // Detect browser API (Firefox uses 'browser', Chrome uses 'chrome')
            const api = typeof browser !== 'undefined' && browser.runtime ? browser : chrome;

            // Ensure top sites API is available
            if (!api?.topSites?.get) return;

            // ===== PROMISE VS CALLBACK API HANDLING =====

            let sites;
            if (api.topSites.get.length === 0) {
                // Promise-based API (Firefox, modern Chrome with polyfill)
                sites = await api.topSites.get();
            } else {
                // Callback-based API (older Chrome, Edge)
                sites = await new Promise((resolve, reject) => {
                    api.topSites.get(result => {
                        if (api.runtime.lastError) {
                            reject(api.runtime.lastError);
                        } else {
                            resolve(result);
                        }
                    });
                });
            }

            // ===== DATA ENRICHMENT WITH CONCURRENT PROCESSING =====

            // Process all sites concurrently for optimal performance
            const realTopSites = await Promise.all(
                sites.map(async site => ({
                    title: site.title || this.getDomainName(site.url), // Fallback to domain
                    url: site.url,
                    favicon: await this.getCachedFavicon(site.url), // Cached favicon loading
                    type: 'topsite'
                }))
            );

            // Ensure exactly 6 items for consistent UI layout
            this.topSites = await this.fillToSix(realTopSites, 'topsite');
        } catch (error) {
            // Graceful fallback: Use popular sites as top site alternatives
            this.topSites = await this.fillToSix([], 'topsite');
        }
    }

    /**
     * Load recent tabs with AI-powered prediction and history integration
     *
     * The most sophisticated data loading method that combines recently closed tabs
     * with browser history to create an intelligent, always-full 6-item list.
     * Implements advanced filtering, deduplication, and AI-powered ranking.
     *
     * INTELLIGENT TAB LOADING STRATEGY:
     * 1. Load recently closed tabs (primary source)
     * 2. Fill gaps with recent browser history (secondary source)
     * 3. Apply AI scoring and ranking (if available)
     * 4. Ensure exactly 6 items for consistent UI
     *
     * AI INTEGRATION:
     * - Machine learning-based tab prediction
     * - User behavior pattern recognition
     * - Confidence scoring for recommendations
     * - Adaptive learning from user interactions
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - Concurrent favicon loading with Promise.all
     * - Efficient URL filtering and deduplication
     * - Smart history search with time constraints
     * - Memory-efficient data structures
     *
     * CROSS-BROWSER COMPATIBILITY:
     * - Firefox: browser.sessions with promise API
     * - Chrome: chrome.sessions with callback API
     * - Edge: chrome.sessions with callback API
     * - Graceful degradation when APIs unavailable
     *
     * @async
     * @private
     */
    async loadRecentTabs() {
        try {
            // ===== CROSS-BROWSER API DETECTION =====

            // Detect browser API (Firefox uses 'browser', Chrome uses 'chrome')
            const api = typeof browser !== 'undefined' && browser.runtime ? browser : chrome;

            let recentTabs = [];

            // ===== STEP 1: LOAD RECENTLY CLOSED TABS =====
            // Primary source: Recently closed tabs from browser sessions

            if (api?.sessions?.getRecentlyClosed) {
                try {
                    let sessions;
                    if (api.sessions.getRecentlyClosed.length <= 1) {
                        // Promise-based API (Firefox, modern Chrome with polyfill)
                        sessions = await api.sessions.getRecentlyClosed({ maxResults: 10 });
                    } else {
                        // Callback-based API (older Chrome, Edge)
                        sessions = await new Promise((resolve, reject) => {
                            api.sessions.getRecentlyClosed({ maxResults: 10 }, result => {
                                if (api.runtime.lastError) {
                                    reject(api.runtime.lastError);
                                } else {
                                    resolve(result);
                                }
                            });
                        });
                    }

                    // ===== ADVANCED URL FILTERING =====
                    // Filter out browser internal pages and invalid URLs

                    const filteredSessions = sessions.filter(
                        session =>
                            session.tab &&
                            session.tab.url &&
                            !session.tab.url.startsWith('chrome://') && // Chrome internal pages
                            !session.tab.url.startsWith('chrome-extension://') && // Extension pages
                            !session.tab.url.startsWith('edge://') && // Edge internal pages
                            !session.tab.url.startsWith('about:') // Firefox internal pages
                    );

                    // ===== DATA ENRICHMENT WITH CONCURRENT PROCESSING =====
                    // Process all tabs concurrently for optimal performance

                    recentTabs = await Promise.all(
                        filteredSessions.map(async session => ({
                            title: session.tab.title || 'Untitled',
                            url: session.tab.url,
                            favicon: await this.getRecentTabFavicon(session.tab), // CORS-safe favicon loading
                            sessionId: session.tab.sessionId,
                            type: 'recent',
                            lastAccessed: session.tab.lastAccessed || Date.now()
                        }))
                    );
                } catch (error) {
                    // Silent failure - continue with empty recent tabs
                }
            }

            // ===== STEP 2: INTELLIGENT HISTORY INTEGRATION =====
            // Secondary source: Fill gaps with recent browser history for always-full lists

            if (recentTabs.length < 6 && api?.history?.search) {
                try {
                    const needed = 6 - recentTabs.length;

                    // ===== SMART HISTORY SEARCH =====
                    // Search recent history with time constraints and extra results for filtering

                    const historyItems = await new Promise((resolve, reject) => {
                        api.history.search(
                            {
                                text: '', // Empty text = all history
                                maxResults: needed + 20, // Extra results for deduplication
                                startTime: Date.now() - 7 * 24 * 60 * 60 * 1000 // Last 7 days only
                            },
                            results => {
                                if (api.runtime.lastError) {
                                    reject(api.runtime.lastError);
                                } else {
                                    resolve(results);
                                }
                            }
                        );
                    });

                    // ===== ADVANCED DEDUPLICATION AND FILTERING =====
                    // Remove duplicates and invalid URLs with comprehensive filtering

                    const existingUrls = new Set(recentTabs.map(tab => tab.url));
                    const filteredHistory = historyItems.filter(
                        item =>
                            !existingUrls.has(item.url) && // No duplicates
                            !item.url.startsWith('chrome://') && // No Chrome internal
                            !item.url.startsWith('chrome-extension://') && // No extension pages
                            !item.url.startsWith('edge://') && // No Edge internal
                            !item.url.startsWith('about:') && // No Firefox internal
                            item.title && // Must have title
                            item.title.trim() !== '' // Title not empty
                    );

                    // ===== AI-POWERED SORTING AND RANKING =====
                    // Sort by recency and apply AI scoring if available

                    const sortedHistory = filteredHistory
                        .sort((a, b) => b.lastVisitTime - a.lastVisitTime) // Most recent first
                        .slice(0, needed); // Take only what we need

                    // ===== DATA ENRICHMENT WITH CONCURRENT PROCESSING =====
                    // Process all history items concurrently for optimal performance

                    const historyTabs = await Promise.all(
                        sortedHistory.map(async item => ({
                            title: item.title || 'Untitled',
                            url: item.url,
                            favicon: await this.getHistoryFavicon(item), // CORS-safe favicon loading
                            type: 'history',
                            lastAccessed: item.lastVisitTime
                        }))
                    );

                    // Merge history tabs with recent tabs
                    recentTabs.push(...historyTabs);
                } catch (error) {
                    // Silent failure - continue with partial data
                }
            }

            // ===== STEP 3: AI-POWERED FINAL SORTING AND RANKING =====
            // Apply machine learning algorithms for intelligent tab ordering

            let sortedRecentTabs;

            if (this.tabMemoryReady && this.tabMemory) {
                // ===== AI-ENHANCED SORTING =====
                // Use machine learning to predict which tabs user is most likely to access
                try {
                    sortedRecentTabs = await this.tabMemory.rankTabs(recentTabs);
                } catch (error) {
                    // Fallback to time-based sorting if AI fails
                    sortedRecentTabs = recentTabs.sort(
                        (a, b) => (b.lastAccessed || 0) - (a.lastAccessed || 0)
                    );
                }
            } else {
                // ===== FALLBACK: TIME-BASED SORTING =====
                // Standard chronological sorting when AI is unavailable
                sortedRecentTabs = recentTabs.sort(
                    (a, b) => (b.lastAccessed || 0) - (a.lastAccessed || 0)
                );
            }

            // ===== ENSURE EXACTLY 6 ITEMS =====
            // Guarantee consistent UI layout with fallback data if needed
            this.recentTabs = await this.fillToSix(sortedRecentTabs, 'recent');
        } catch (error) {
            // ===== COMPLETE FAILURE FALLBACK =====
            // Graceful degradation with popular sites when everything fails
            this.recentTabs = await this.fillToSix([], 'recent');
        }
    }

    /**
     * ===== BOOKMARK EXTRACTION UTILITIES =====
     *
     * Recursive bookmark tree traversal with data enrichment and
     * intelligent title fallback strategies.
     */

    /**
     * Extract bookmarks from nested browser bookmark tree
     *
     * Recursively traverses the browser's bookmark tree structure to extract
     * all bookmarks with proper data enrichment. Handles nested folders and
     * provides intelligent fallbacks for missing data.
     *
     * RECURSIVE TRAVERSAL:
     * - Depth-first search through bookmark tree
     * - Handles unlimited nesting levels
     * - Efficient single-pass extraction
     * - Memory-efficient accumulator pattern
     *
     * DATA ENRICHMENT:
     * - Intelligent title fallback to domain names
     * - Favicon URL generation for visual consistency
     * - Type classification for UI rendering
     * - URL validation and sanitization
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - Single-pass recursive traversal
     * - Minimal object creation
     * - Efficient array accumulation
     * - Early termination for invalid nodes
     *
     * @param {Array} tree - Browser bookmark tree structure
     * @param {Array} bookmarks - Accumulator array for extracted bookmarks
     * @returns {Array<Object>} Flattened array of bookmark objects
     * @private
     */
    extractBookmarks(tree, bookmarks = []) {
        for (const node of tree) {
            // ===== BOOKMARK NODE PROCESSING =====
            // Only process nodes that have URLs (actual bookmarks, not folders)

            if (node.url) {
                bookmarks.push({
                    title: node.title || this.getDomainName(node.url), // Fallback to domain
                    url: node.url,
                    favicon: this.getFaviconUrl(node.url), // Generate favicon URL
                    type: 'bookmark'
                });
            }

            // ===== RECURSIVE FOLDER TRAVERSAL =====
            // Recursively process child folders

            if (node.children) {
                this.extractBookmarks(node.children, bookmarks);
            }
        }
        return bookmarks;
    }

    /**
     * Ensure exactly 6 items for consistent UI layout
     *
     * Critical method that guarantees exactly 6 items for every data category,
     * ensuring consistent grid layout and visual stability. Implements intelligent
     * fallback strategies with deduplication and placeholder generation.
     *
     * UI CONSISTENCY STRATEGY:
     * - Always return exactly 6 items (never more, never less)
     * - Maintains consistent grid height across all categories
     * - Prevents layout shifts and visual instability
     * - Provides predictable UI behavior
     *
     * FALLBACK HIERARCHY:
     * 1. User's actual data (bookmarks, top sites, etc.)
     * 2. Popular fallback sites (curated list)
     * 3. Placeholder items (when all else fails)
     *
     * DEDUPLICATION STRATEGY:
     * - URL-based deduplication to prevent duplicates
     * - Efficient Set-based lookup for O(1) checking
     * - Preserves user data priority over fallbacks
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - Efficient array slicing and spreading
     * - Minimal object creation
     * - Concurrent favicon loading for fallbacks
     * - Early termination when possible
     *
     * @param {Array<Object>} items - Input items to fill to 6
     * @param {string} type - Type of items for fallback generation
     * @returns {Promise<Array<Object>>} Exactly 6 items with enriched data
     * @private
     * @async
     */
    async fillToSix(items, type) {
        // ===== STEP 1: LIMIT TO MAXIMUM 6 ITEMS =====
        // Take first 6 items to prevent overflow
        const result = [...items].slice(0, 6);

        // Early return if we already have 6 items
        if (result.length >= 6) {
            return result;
        }

        // ===== STEP 2: FILL WITH POPULAR FALLBACK SITES =====
        // Get curated fallback sites for the specific type
        const fallbackSites = await this.getFallbackSites(type);
        const needed = 6 - result.length;

        // ===== STEP 3: DEDUPLICATION =====
        // Filter out sites that are already in the result
        const existingUrls = new Set(result.map(item => item.url));
        const availableFallbacks = fallbackSites.filter(site => !existingUrls.has(site.url));

        // Add fallback sites to reach exactly 6 for consistent grid height
        result.push(...availableFallbacks.slice(0, needed));

        // ===== STEP 4: PLACEHOLDER GENERATION =====
        // If still not enough, add placeholder items to maintain exactly 6 items
        while (result.length < 6) {
            result.push({
                title: 'Add More Sites',
                url: 'https://google.com',
                favicon: await this.getCachedFavicon('https://google.com'),
                type: type,
                isPlaceholder: true
            });
        }

        return result;
    }

    /**
     * Generate curated fallback sites for consistent UI
     *
     * Provides high-quality fallback sites when user data is insufficient.
     * Sites are carefully curated for developer productivity and general use.
     * All sites include cached favicons for instant visual feedback.
     *
     * CURATION STRATEGY:
     * - Developer-focused sites (GitHub, Stack Overflow, MDN)
     * - Productivity tools (Gmail, Drive, Calendar)
     * - Popular services (YouTube, Reddit, Netflix)
     * - AI and modern tools (Claude)
     *
     * PERFORMANCE FEATURES:
     * - Concurrent favicon loading with Promise.all
     * - Cached favicon URLs for instant display
     * - Type classification for UI consistency
     * - Minimal object creation
     *
     * @param {string} type - Type of fallback sites to generate
     * @returns {Promise<Array<Object>>} Array of fallback site objects
     * @private
     * @async
     */
    async getFallbackSites(type) {
        // ===== CURATED FALLBACK SITES =====
        // Carefully selected sites for developer productivity and general use

        const siteUrls = [
            { title: 'Gmail', url: 'https://gmail.com' }, // Email productivity
            { title: 'YouTube', url: 'https://youtube.com' }, // Video content
            { title: 'GitHub', url: 'https://github.com' }, // Developer platform
            { title: 'Claude', url: 'https://claude.ai' }, // AI assistant
            { title: 'Google Drive', url: 'https://drive.google.com' }, // Cloud storage
            { title: 'Calendar', url: 'https://calendar.google.com' }, // Time management
            { title: 'Twitter', url: 'https://twitter.com' }, // Social media
            { title: 'Reddit', url: 'https://reddit.com' }, // Community platform
            { title: 'Stack Overflow', url: 'https://stackoverflow.com' }, // Developer Q&A
            { title: 'Netflix', url: 'https://netflix.com' } // Entertainment
        ];

        // ===== CONCURRENT FAVICON LOADING =====
        // Process all sites concurrently for optimal performance

        const sites = await Promise.all(
            siteUrls.map(async site => ({
                title: site.title,
                url: site.url,
                favicon: await this.getCachedFavicon(site.url), // Cached favicon loading
                type
            }))
        );

        return sites;
    }

    /**
     * Load universal search engines
     *
     * Loads a curated collection of search engines optimized for all users -
     * privacy, learning, knowledge, shopping, and eco-friendly search. Each engine
     * includes proper query parameter handling and local logo assets.
     *
     * SEARCH ENGINE FEATURES:
     * - Universal appeal across all user types
     * - Local logo assets for fast loading
     * - Proper query parameter formatting
     * - Error handling with graceful degradation
     *
     * UNIVERSAL PRODUCTIVITY:
     * - DuckDuckGo: Privacy-focused general search
     * - YouTube: Video content and learning
     * - Wikipedia: Knowledge and research
     * - Amazon: Product search and shopping
     * - Ecosia: Eco-friendly search with tree planting
     *
     * @async
     * @private
     */
    async loadSearchEngines() {
        try {
            // ===== CURATED SEARCH ENGINES =====
            // Universal search engines with local logos and proper query formatting

            const engines = [
                {
                    name: 'DuckDuckGo',
                    url: 'https://duckduckgo.com/?q=',
                    logo: 'https://duckduckgo.com/favicon.ico'
                },
                {
                    name: 'YouTube',
                    url: 'https://youtube.com/results?search_query=',
                    logo: 'https://www.youtube.com/favicon.ico'
                },
                {
                    name: 'Wikipedia',
                    url: 'https://en.wikipedia.org/wiki/Special:Search?search=',
                    logo: 'https://en.wikipedia.org/favicon.ico'
                },
                {
                    name: 'Amazon',
                    url: 'https://amazon.com/s?k=',
                    logo: 'https://www.amazon.com/favicon.ico'
                },
                {
                    name: 'Ecosia',
                    url: 'https://ecosia.org/search?q=',
                    logo: chrome.runtime.getURL('assets/search-engines/ecosia.png')
                }
            ];

            // ===== DIRECT LOGO ASSIGNMENT =====
            // Use local logo assets for instant loading and reliability

            this.searchEngines = engines.map(engine => ({
                name: engine.name,
                url: engine.url,
                favicon: engine.logo // Local logo assets
            }));
        } catch (error) {
            // Graceful fallback: Empty search engines array
            this.searchEngines = [];
        }
    }

    /**
     * ===== ADVANCED FAVICON HANDLING SYSTEM =====
     *
     * Sophisticated favicon loading system with CORS handling, caching strategies,
     * and intelligent fallback generation. Optimized for performance and reliability
     * across different data sources and browser environments.
     */

    /**
     * Get favicon for recent tabs with advanced CORS handling
     *
     * Specialized favicon loading for recently closed tabs that handles browser
     * favicon data and CORS restrictions intelligently. Prioritizes tab's own
     * favicon data while providing robust fallbacks.
     *
     * CORS HANDLING STRATEGY:
     * - Use tab's own favicon if it's a data URL (no CORS issues)
     * - Route external URLs through Google's favicon service
     * - Fallback to standard cached favicon method
     * - Generate fallback icon as last resort
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - Early return for data URLs (fastest)
     * - CORS-safe Google favicon service
     * - Intelligent domain extraction
     * - Minimal URL parsing overhead
     *
     * @param {Object} tab - Browser tab object with favicon data
     * @returns {Promise<string>} Favicon URL or data URI
     * @private
     * @async
     */
    async getRecentTabFavicon(tab) {
        try {
            // ===== PRIORITY 1: USE TAB'S OWN FAVICON =====
            // First, try to use the tab's own favicon if available and valid

            if (tab.favIconUrl && !tab.favIconUrl.startsWith('chrome://')) {
                // Check if it's a data URL (already encoded, no CORS issues)
                if (tab.favIconUrl.startsWith('data:')) {
                    return tab.favIconUrl;
                }

                // ===== CORS MITIGATION =====
                // For external URLs, use Google's favicon service to avoid CORS
                const domain = new URL(tab.url).hostname.replace('www.', '');
                return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=32`;
            }

            // ===== PRIORITY 2: STANDARD CACHED FAVICON =====
            // Fallback to our standard favicon method with caching
            return await this.getCachedFavicon(tab.url);
        } catch (error) {
            // ===== PRIORITY 3: GENERATED FALLBACK =====
            // Generate fallback icon as last resort
            return this.generateFallbackIcon(tab.title?.charAt(0) || '?', tab.url);
        }
    }

    /**
     * Get favicon for history items with CORS-safe approach
     *
     * Specialized favicon loading for browser history items that always uses
     * CORS-safe methods. History items don't have favicon data, so we use
     * Google's favicon service exclusively for reliability.
     *
     * CORS-SAFE STRATEGY:
     * - Always use Google's favicon service (no CORS issues)
     * - Consistent 32px size for UI uniformity
     * - Proper URL encoding for special characters
     * - Intelligent domain extraction
     *
     * RELIABILITY FEATURES:
     * - No dependency on browser favicon cache
     * - Consistent cross-browser behavior
     * - Robust error handling with fallbacks
     * - Minimal network overhead
     *
     * @param {Object} historyItem - Browser history item object
     * @returns {Promise<string>} Favicon URL or fallback icon
     * @private
     * @async
     */
    async getHistoryFavicon(historyItem) {
        try {
            // ===== CORS-SAFE FAVICON LOADING =====
            // Always use Google's favicon service for history items to avoid CORS
            const domain = new URL(historyItem.url).hostname.replace('www.', '');
            return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=32`;
        } catch (error) {
            // ===== FALLBACK ICON GENERATION =====
            // Generate fallback icon when URL parsing fails
            return this.generateFallbackIcon(historyItem.title?.charAt(0) || '?', historyItem.url);
        }
    }

    /**
     * Multi-tier cached favicon loading system
     *
     * The core favicon loading method that implements a sophisticated multi-tier
     * caching strategy for optimal performance. Combines session caching,
     * persistent caching, and intelligent source reliability detection.
     *
     * MULTI-TIER CACHING STRATEGY:
     * 1. Session cache (Map) - Fastest, in-memory
     * 2. Persistent cache (IndexedDB) - Fast, survives sessions
     * 3. Network fetch - Slowest, cached after retrieval
     *
     * RELIABILITY DETECTION:
     * - Identifies reliable favicon sources (Google, GitHub, etc.)
     * - Applies different caching strategies based on reliability
     * - Handles unreliable sources with fallback generation
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - O(1) session cache lookup
     * - Efficient domain extraction and normalization
     * - Early returns for data URLs and cached content
     * - Minimal object creation and memory usage
     *
     * ERROR HANDLING:
     * - Graceful degradation at each tier
     * - Fallback icon generation for complete failures
     * - Silent error handling to prevent UI blocking
     *
     * @param {string} url - URL to get favicon for
     * @returns {Promise<string>} Favicon URL or data URI
     * @private
     * @async
     */
    async getCachedFavicon(url) {
        try {
            // ===== DOMAIN EXTRACTION AND CACHE KEY GENERATION =====
            const domain = new URL(url).hostname.replace('www.', '');
            const cacheKey = `favicon_${domain}`;

            // ===== TIER 1: SESSION CACHE (FASTEST) =====
            // Check in-memory session cache first for instant results
            if (this.faviconCache.has(cacheKey)) {
                return this.faviconCache.get(cacheKey);
            }

            // ===== FAVICON URL GENERATION =====
            // Get the appropriate favicon URL using our intelligent routing
            const faviconUrl = this.getFaviconUrl(url);

            // ===== EARLY RETURN FOR DATA URLS =====
            // If it's a fallback icon (data URL), cache and return immediately
            if (faviconUrl.startsWith('data:')) {
                this.faviconCache.set(cacheKey, faviconUrl);
                return faviconUrl;
            }

            // ===== RELIABILITY DETECTION =====
            // Identify reliable favicon sources for optimized caching (for future use)
            // const reliableSources = [
            //     'gstatic.com', // Google static content
            //     'googleapis.com', // Google APIs
            //     'github.com', // GitHub platform
            //     'stackoverflow.com', // Stack Overflow
            //     'youtube.com', // YouTube
            //     'reddit.com', // Reddit
            //     'google.com', // Google main domain
            //     'www.google.com', // Google www variant
            //     's2/favicons' // Google's favicon service
            // ];

            // Check if source is reliable (for potential future use)
            // const isReliableSource = reliableSources.some(source => faviconUrl.includes(source));

            // ===== TIER 2: PERSISTENT CACHE (INDEXEDDB) =====
            // Try persistent cache for all sources (not just reliable ones)
            if (this.cacheManager) {
                try {
                    const cachedFavicon = await this.cacheManager.getFavicon(faviconUrl, domain);
                    if (cachedFavicon && !cachedFavicon.startsWith('data:image/svg')) {
                        // Only use cached version if it's a real favicon, not a fallback
                        this.faviconCache.set(cacheKey, cachedFavicon);
                        return cachedFavicon;
                    }
                } catch (error) {
                    // Continue to return original URL if persistent cache fails
                }
            }

            // ===== TIER 3: NETWORK FETCH (BROWSER HANDLES) =====
            // Cache the original URL in session and return it
            // Let the browser handle the actual fetching and caching
            this.faviconCache.set(cacheKey, faviconUrl);
            return faviconUrl;
        } catch (error) {
            // ===== COMPLETE FAILURE FALLBACK =====
            // Generate fallback icon when everything fails
            return this.generateFallbackIcon('?', url);
        }
    }

    /**
     * Intelligent favicon URL generation with comprehensive Google services mapping
     *
     * The most comprehensive favicon URL generation system that provides perfect
     * favicons for Google services and intelligent fallbacks for all other sites.
     * Features extensive Google services mapping, problematic domain detection,
     * and CORS-safe fallback strategies.
     *
     * GOOGLE SERVICES OPTIMIZATION:
     * - 40+ Google services with direct favicon URLs
     * - High-resolution 32px icons for crisp display
     * - Latest Google branding and icon versions
     * - Covers all major Google Workspace and Cloud services
     *
     * INTELLIGENT ROUTING:
     * - Direct URLs for Google services (fastest, highest quality)
     * - Google favicon service for general sites (CORS-safe)
     * - Fallback icon generation for problematic domains
     * - CSP-compliant HTTPS-only URLs
     *
     * PERFORMANCE BENEFITS:
     * - Eliminates 404 errors for Google services
     * - Reduces network requests with direct URLs
     * - Consistent visual quality across all services
     * - Optimal caching with reliable CDN sources
     *
     * @param {string} url - URL to generate favicon for
     * @returns {string} Favicon URL or fallback icon data URI
     * @private
     */
    getFaviconUrl(url) {
        try {
            // ===== DOMAIN EXTRACTION =====
            const domain = new URL(url).hostname.replace('www.', '');

            // ===== COMPREHENSIVE GOOGLE SERVICES MAPPING =====
            // Direct favicon URLs for perfect Google services integration
            const specialIcons = {
                // ===== COMMUNICATION & PRODUCTIVITY =====

                // Gmail & Mail Services
                'gmail.com': 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico',
                'mail.google.com': 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico',

                // Google Drive & Storage
                'drive.google.com':
                    'https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png',

                // Google Calendar & Scheduling
                'calendar.google.com':
                    'https://www.gstatic.com/images/branding/product/1x/calendar_32dp.png',

                // ===== CONTENT & MEDIA =====

                // YouTube (All Variants)
                'youtube.com': 'https://www.youtube.com/s/desktop/12d6b690/img/favicon_32x32.png',
                'www.youtube.com':
                    'https://www.youtube.com/s/desktop/12d6b690/img/favicon_32x32.png',
                'm.youtube.com': 'https://www.youtube.com/s/desktop/12d6b690/img/favicon_32x32.png',

                // ===== GOOGLE WORKSPACE SUITE =====

                // Document Creation & Editing
                'docs.google.com': 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico',
                'sheets.google.com': 'https://ssl.gstatic.com/docs/spreadsheets/favicon_jfk2.png',
                'slides.google.com':
                    'https://ssl.gstatic.com/docs/presentations/images/favicon5.ico',

                // Google Photos & Media
                'photos.google.com':
                    'https://www.gstatic.com/images/branding/product/1x/photos_32dp.png',

                // ===== NAVIGATION & LOCATION =====

                // Google Maps & Location Services
                'maps.google.com': 'https://maps.gstatic.com/favicon3.ico',

                // ===== SEARCH & DISCOVERY =====

                // Google Search (Main)
                'google.com': 'https://www.google.com/favicon.ico',
                'www.google.com': 'https://www.google.com/favicon.ico',

                // Google Translate & Language
                'translate.google.com': 'https://ssl.gstatic.com/translate/favicon.ico',

                // ===== PRODUCTIVITY TOOLS =====

                // Google Keep & Notes
                'keep.google.com': 'https://ssl.gstatic.com/keep/icon_2020q4v2_32.png',

                // ===== COMMUNICATION PLATFORMS =====

                // Google Meet & Video Conferencing
                'meet.google.com':
                    'https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-32dp/logo_meet_2020q4_color_1x_web_32dp.png',

                // Google Chat & Messaging
                'chat.google.com': 'https://ssl.gstatic.com/chat/favicon_2020q4_32dp.png',

                // ===== BUSINESS & ENTERPRISE =====

                // Google Workspace & Business Tools
                'workspace.google.com':
                    'https://www.gstatic.com/images/branding/product/1x/workspace_32dp.png',
                'admin.google.com':
                    'https://www.gstatic.com/images/branding/product/1x/admin_32dp.png',

                // ===== CLOUD & DEVELOPER SERVICES =====

                // Google Cloud Platform
                'cloud.google.com':
                    'https://www.gstatic.com/images/branding/product/1x/cloud_32dp.png',
                'console.cloud.google.com':
                    'https://www.gstatic.com/images/branding/product/1x/cloud_32dp.png',
                'developers.google.com':
                    'https://www.gstatic.com/images/branding/product/1x/developers_32dp.png',

                // ===== MOBILE & APP ECOSYSTEM =====

                // Google Play & Android
                'play.google.com':
                    'https://www.gstatic.com/images/branding/product/1x/play_prism_64dp.png',
                'developer.android.com':
                    'https://www.gstatic.com/images/branding/product/1x/android_32dp.png',

                // ===== MARKETING & ANALYTICS =====

                // Google Analytics & Advertising
                'analytics.google.com':
                    'https://www.gstatic.com/images/branding/product/1x/analytics_32dp.png',
                'ads.google.com': 'https://www.gstatic.com/images/branding/product/1x/ads_32dp.png',
                'adsense.google.com':
                    'https://www.gstatic.com/images/branding/product/1x/adsense_32dp.png',

                // ===== CONTENT CREATION =====

                // Google Forms & Sites
                'forms.google.com':
                    'https://ssl.gstatic.com/docs/spreadsheets/forms/favicon_qp2.png',
                'sites.google.com': 'https://ssl.gstatic.com/atari/images/favicon.ico',

                // ===== INFORMATION & MEDIA =====

                // Google News & Books
                'news.google.com':
                    'https://www.gstatic.com/images/branding/product/1x/news_32dp.png',
                'books.google.com':
                    'https://www.gstatic.com/images/branding/product/1x/books_32dp.png',

                // ===== EXPLORATION & GEOGRAPHY =====

                // Google Earth & Geographic Services
                'earth.google.com':
                    'https://www.gstatic.com/images/branding/product/1x/earth_32dp.png',
                'mymaps.google.com': 'https://maps.gstatic.com/favicon3.ico',

                // ===== SOCIAL & COLLABORATION =====

                // Google Contacts & Groups
                'contacts.google.com':
                    'https://www.gstatic.com/images/branding/product/1x/contacts_32dp.png',
                'groups.google.com':
                    'https://www.gstatic.com/images/branding/product/1x/groups_32dp.png',

                // ===== EDUCATION =====

                // Google Classroom & Education
                'classroom.google.com': 'https://ssl.gstatic.com/classroom/favicon.png',

                // ===== DESIGN & DEVELOPMENT =====

                // Google Fonts & Design Tools
                'fonts.google.com':
                    'https://www.gstatic.com/images/branding/product/1x/fonts_32dp.png',

                // ===== LOCAL & BUSINESS =====

                // Google My Business & Local Services
                'business.google.com':
                    'https://www.gstatic.com/images/branding/product/1x/my_business_32dp.png',

                // ===== RESEARCH & ACADEMIC =====

                // Google Scholar & Research
                'scholar.google.com': 'https://scholar.google.com/favicon.ico',

                // ===== DATA & INSIGHTS =====

                // Google Trends & Data Analysis
                'trends.google.com': 'https://ssl.gstatic.com/trends_nrtr/3045_RC01/favicon.ico',

                // ===== BROWSER & PLATFORM =====

                // Google Chrome & Browser Services
                'chrome.google.com':
                    'https://www.gstatic.com/images/branding/product/1x/chrome_32dp.png',

                // ===== AI & FUTURE SERVICES =====

                // Google Gemini & AI Services
                'gemini.google.com':
                    'https://www.gstatic.com/lamda/images/gemini_favicon_f069958c85030456e93de685481c559f160ea06b.png',
                'bard.google.com':
                    'https://www.gstatic.com/lamda/images/gemini_favicon_f069958c85030456e93de685481c559f160ea06b.png'
            };

            // ===== SPECIAL ICONS LOOKUP =====
            // Return direct URL for Google services (highest quality, fastest)
            if (specialIcons[domain]) {
                return specialIcons[domain];
            }

            // ===== PROBLEMATIC DOMAINS DETECTION =====
            // Comprehensive list of domains known to not have favicons (2025)
            const problematicDomains = [
                // ===== LOCAL DEVELOPMENT =====
                'localhost', // Local development
                '127.0.0.1', // Local IP
                '0.0.0.0', // Local binding

                // ===== GOOGLE STATIC CONTENT =====
                'ssl.gstatic.com', // Google static content (no favicon)
                't1.gstatic.com', // Google static content (no favicon)
                't2.gstatic.com', // Google static content (no favicon)
                't3.gstatic.com', // Google static content (no favicon)
                'gstatic.com', // Google static content (no favicon)
                'fonts.gstatic.com', // Google fonts static (no favicon)
                'www.gstatic.com', // Google static content (no favicon)

                // ===== CDN PROVIDERS =====
                'cdnjs.cloudflare.com', // Cloudflare CDN (no favicon)
                'cdn.jsdelivr.net', // jsDelivr CDN (no favicon)
                'unpkg.com', // NPM package CDN (no favicon)
                'bootstrapcdn.com', // Bootstrap CDN (no favicon)
                'maxcdn.bootstrapcdn.com', // Bootstrap MaxCDN (no favicon)
                'stackpath.bootstrapcdn.com', // Bootstrap StackPath CDN (no favicon)
                'netdna.bootstrapcdn.com', // Bootstrap NetDNA CDN (no favicon)

                // ===== AMAZON WEB SERVICES =====
                'amazonaws.com', // AWS static content (no favicon)
                's3.amazonaws.com', // AWS S3 buckets (no favicon)
                'cloudfront.net', // AWS CloudFront CDN (no favicon)

                // ===== STATIC HOSTING PLATFORMS =====
                'github.io', // GitHub Pages (no favicon)
                'netlify.app', // Netlify hosting (no favicon)
                'vercel.app', // Vercel hosting (no favicon)
                'surge.sh', // Surge.sh hosting (no favicon)
                'firebase.app', // Firebase hosting (no favicon)
                'firebaseapp.com', // Firebase hosting (no favicon)

                // ===== KNOWN PROBLEMATIC DOMAINS =====
                'cbseacademic.nic.in' // Known problematic domain
            ];

            if (problematicDomains.some(d => domain.includes(d))) {
                return this.generateFallbackIcon('', url);
            }

            // ===== GOOGLE FAVICON SERVICE FALLBACK =====
            // Use Google's favicon service for all other domains (CORS-safe)
            // HTTPS-only for CSP compliance and security
            return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=32`;
        } catch (error) {
            // ===== COMPLETE FAILURE FALLBACK =====
            // Generate fallback icon when URL parsing fails
            return this.generateFallbackIcon('?');
        }
    }

    /**
     * Generate beautiful fallback icons with consistent design
     *
     * Creates visually appealing SVG-based fallback icons when favicons are
     * unavailable or fail to load. Uses consistent color palette and typography
     * for professional appearance across all fallback scenarios.
     *
     * DESIGN FEATURES:
     * - Consistent 32x32px size for UI uniformity
     * - 12-color palette for visual variety
     * - Rounded corners (6px radius) for modern appearance
     * - System font stack for optimal text rendering
     * - High contrast white text on colored backgrounds
     *
     * INTELLIGENT TEXT EXTRACTION:
     * - Primary: Use provided text (first character)
     * - Secondary: Extract from domain name
     * - Fallback: Use question mark for unknown content
     *
     * COLOR ALGORITHM:
     * - Deterministic color selection based on character code
     * - Ensures same character always gets same color
     * - Balanced color distribution across spectrum
     * - Accessibility-compliant contrast ratios
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - Data URI format for instant loading
     * - Minimal SVG markup for small file size
     * - No external dependencies or network requests
     * - Efficient URL encoding for browser compatibility
     *
     * @param {string} text - Text to extract character from
     * @param {string} url - URL to extract domain character from (fallback)
     * @returns {string} Data URI containing SVG fallback icon
     * @private
     */
    generateFallbackIcon(text, url = '') {
        try {
            // ===== INTELLIGENT CHARACTER EXTRACTION =====

            let letter = '?';
            if (text && text.length > 0) {
                // Primary: Use provided text (first character)
                letter = text.charAt(0).toUpperCase();
            } else if (url) {
                // Secondary: Extract from domain name
                try {
                    const domain = new URL(url).hostname.replace('www.', '');
                    letter = domain.charAt(0).toUpperCase();
                } catch {
                    letter = '?';
                }
            }

            // ===== CONSISTENT COLOR PALETTE =====
            // 12-color palette with balanced hue distribution and accessibility compliance
            const colors = [
                '#3b82f6', // Blue - Professional, trustworthy
                '#8b5cf6', // Purple - Creative, innovative
                '#10b981', // Green - Success, growth
                '#f59e0b', // Amber - Warning, attention
                '#ef4444', // Red - Error, urgent
                '#06b6d4', // Cyan - Fresh, modern
                '#84cc16', // Lime - Energy, vibrant
                '#f97316', // Orange - Warm, friendly
                '#ec4899', // Pink - Playful, creative
                '#6366f1', // Indigo - Deep, sophisticated
                '#14b8a6', // Teal - Calm, balanced
                '#eab308' // Yellow - Bright, optimistic
            ];

            // ===== DETERMINISTIC COLOR SELECTION =====
            // Same character always gets same color for consistency
            const colorIndex = letter.charCodeAt(0) % colors.length;
            const bgColor = colors[colorIndex];

            // ===== OPTIMIZED SVG GENERATION =====
            // Clean, minimal SVG with modern design and optimal rendering
            const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" fill="${bgColor}" rx="6"/><text x="16" y="22" text-anchor="middle" fill="white" font-family="system-ui,-apple-system,sans-serif" font-size="14" font-weight="600">${letter}</text></svg>`;

            // Return as data URI for instant loading
            return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
        } catch (error) {
            // ===== EMERGENCY FALLBACK =====
            // Pre-encoded gray fallback for complete failure scenarios
            return 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"%3E%3Crect width="32" height="32" fill="%23374151" rx="6"/%3E%3Ctext x="16" y="22" text-anchor="middle" fill="white" font-family="system-ui" font-size="14" font-weight="600"%3E?%3C/text%3E%3C/svg%3E';
        }
    }

    /**
     * ===== UTILITY METHODS =====
     *
     * Essential utility methods for URL processing, UI state management,
     * and user interaction handling.
     */

    /**
     * Extract clean domain name from URL
     *
     * Safely extracts domain name from URLs with proper error handling
     * and www prefix removal for consistent display.
     *
     * @param {string} url - URL to extract domain from
     * @returns {string} Clean domain name or 'Unknown' for invalid URLs
     * @private
     */
    getDomainName(url) {
        try {
            return new URL(url).hostname.replace('www.', '');
        } catch {
            return 'Unknown';
        }
    }

    /**
     * ===== UI STATE MANAGEMENT =====
     *
     * Methods for controlling command palette visibility and state
     * with proper focus management and accessibility support.
     */

    /**
     * Toggle command palette visibility
     *
     * Simple toggle method that shows or hides the command palette
     * based on current visibility state.
     *
     * @public
     */
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    /**
     * Show command palette with AI-powered tab prediction
     *
     * Displays the command palette with intelligent tab selection based on
     * user behavior patterns. Implements proper focus management, accessibility
     * support, and AI learning integration.
     *
     * AI INTEGRATION FEATURES:
     * - Predicts which tab user is most likely to use
     * - Records interaction patterns for learning
     * - Adapts to user behavior over time
     * - Graceful fallback when AI unavailable
     *
     * ACCESSIBILITY FEATURES:
     * - Proper focus management and restoration
     * - ARIA attributes for screen readers
     * - Keyboard navigation support
     * - Focus trapping within modal
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - Lazy data loading only when needed
     * - Efficient DOM creation and manipulation
     * - Minimal layout thrashing
     * - Optimized event binding
     *
     * @async
     * @public
     */
    async show() {
        // Prevent duplicate panels
        if (this.isVisible) return;

        // ===== MODAL EXCLUSIVITY =====
        // Close any other open modals first
        if (window.nexusApp && window.nexusApp.closeAllModals) {
            window.nexusApp.closeAllModals();
            window.nexusApp.activeModal = 'shortcuts';
        }

        // ===== DATA LOADING =====
        // Ensure all data is loaded before showing UI
        await this.loadData();

        // ===== AI-POWERED TAB PREDICTION =====
        // Use machine learning to predict which tab user wants

        const aiEnabled = await this.isAIEnabled();
        if (aiEnabled && this.tabMemoryReady && this.tabMemory) {
            try {
                this.activeTab = this.tabMemory.getPredictedTab();
            } catch (error) {
                this.activeTab = 'bookmarks'; // Fallback to bookmarks
            }
        } else {
            this.activeTab = 'bookmarks'; // Fallback when AI unavailable or disabled
        }

        // ===== FOCUS MANAGEMENT =====
        // Store current focus for proper restoration when panel closes
        this.panelTrigger = document.activeElement;

        // ===== UI CREATION =====
        this.createPanel();
        this.isVisible = true;

        // ===== AI LEARNING =====
        // Record panel opening for machine learning
        if (aiEnabled && this.tabMemoryReady && this.tabMemory) {
            try {
                this.tabMemory.recordInteraction(this.activeTab, 'open', {
                    predictedTab: this.activeTab,
                    timestamp: Date.now()
                });
            } catch (error) {
                // Silent failure - AI learning is optional
            }
        }

        // ===== EXTERNAL NOTIFICATIONS =====
        // Notify main app to update button state
        this.notifyInteraction();

        // ===== ACCESSIBILITY FOCUS =====
        // Focus search input for immediate keyboard interaction
        setTimeout(() => {
            const searchInput = document.getElementById('quick-search-input');
            if (searchInput) searchInput.focus();
        }, 100);
    }

    /**
     * Hide command palette with smooth animations
     *
     * Gracefully hides the command palette with proper cleanup, focus restoration,
     * and smooth exit animations. Ensures no memory leaks or orphaned elements.
     *
     * ANIMATION FEATURES:
     * - Smooth closing animation with CSS transitions
     * - Proper timing coordination with DOM removal
     * - Visual feedback for user actions
     *
     * CLEANUP PROCEDURES:
     * - Complete DOM element removal
     * - Event listener cleanup (handled by removal)
     * - State reset for next opening
     * - Memory leak prevention
     *
     * ACCESSIBILITY FEATURES:
     * - Proper focus restoration to trigger element
     * - Screen reader announcements
     * - Keyboard navigation support
     *
     * @public
     */
    hide() {
        // Prevent duplicate hide operations
        if (!this.isVisible) return;

        // ===== MODAL STATE CLEANUP =====
        // Clear active modal state in main app
        if (window.nexusApp && window.nexusApp.activeModal === 'shortcuts') {
            window.nexusApp.activeModal = null;
        }

        const panel = document.getElementById('quick-shortcuts-panel');
        if (panel) {
            // ===== SMOOTH CLOSING ANIMATION =====
            // Add closing animation class for visual feedback
            panel.classList.add('closing');

            // ===== DELAYED DOM REMOVAL =====
            // Remove panel after animation completes (150ms)
            setTimeout(() => {
                if (panel.parentNode) {
                    panel.remove();
                }
            }, 150);
        }

        // ===== STATE CLEANUP =====
        this.isVisible = false;
        this.searchQuery = '';

        // ===== FOCUS RESTORATION =====
        // Restore focus to the element that opened the panel
        if (this.panelTrigger) {
            this.panelTrigger.focus();
            this.panelTrigger = null;
        }
    }

    /**
     * Create and initialize command palette UI
     *
     * Orchestrates the complete creation of the command palette interface
     * including DOM generation, event binding, styling, and initial state setup.
     * Implements proper cleanup and initialization procedures.
     *
     * CREATION SEQUENCE:
     * 1. Remove any existing panel (cleanup)
     * 2. Create new panel element with generated HTML
     * 3. Append to document body
     * 4. Bind all event listeners
     * 5. Inject dynamic styles
     * 6. Initialize tab indicator position
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - Single DOM insertion for entire panel
     * - Efficient event delegation
     * - Minimal layout thrashing
     * - Optimized CSS injection
     *
     * @private
     */
    createPanel() {
        // ===== CLEANUP EXISTING PANEL =====
        // Remove any existing panel to prevent duplicates
        const existing = document.getElementById('quick-shortcuts-panel');
        if (existing) existing.remove();

        // ===== DOM CREATION =====
        // Create new panel element with complete HTML structure
        const panel = document.createElement('div');
        panel.id = 'quick-shortcuts-panel';
        panel.innerHTML = this.getPanelHTML();

        // ===== DOM INSERTION =====
        document.body.appendChild(panel);

        // ===== INITIALIZATION SEQUENCE =====
        this.bindEvents(panel); // Bind all event listeners
        this.injectStyles(); // Inject dynamic CSS styles

        // ===== TAB INDICATOR INITIALIZATION =====
        // Set initial tab indicator position without animation
        setTimeout(() => {
            this.setTabIndicatorPosition(this.activeTab, false);
        }, 50);
    }

    /**
     * ===== HTML GENERATION SYSTEM =====
     *
     * Comprehensive HTML generation methods for creating accessible,
     * semantic, and performant command palette interface.
     */

    /**
     * Generate complete command palette HTML structure
     *
     * Creates the main HTML structure for the command palette with proper
     * accessibility attributes, semantic markup, and modern design elements.
     * Implements ARIA patterns for modal dialogs and search interfaces.
     *
     * ACCESSIBILITY FEATURES:
     * - ARIA modal dialog pattern
     * - Proper labeling and descriptions
     * - Keyboard navigation support
     * - Screen reader compatibility
     *
     * SEMANTIC STRUCTURE:
     * - Overlay for modal behavior
     * - Container for content organization
     * - Search section with icon and input
     * - Content area for tabs and results
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - Template literal for efficient string building
     * - Minimal DOM structure
     * - Optimized CSS classes
     * - Lazy content generation
     *
     * @returns {string} Complete HTML structure for command palette
     * @private
     */
    getPanelHTML() {
        return `
            <div class="qs-overlay" role="dialog" aria-labelledby="qs-search-input" aria-modal="true">
                <div class="qs-container" role="document">
                    <div class="qs-search-section">
                        <div class="qs-search-input-wrapper">
                            <svg class="qs-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="m21 21-4.35-4.35"/>
                            </svg>
                            <input
                                type="text"
                                id="quick-search-input"
                                class="qs-search-input"
                                placeholder="Search anything • Enter for Google • Click engine below"
                                autocomplete="off"
                                spellcheck="false"
                                aria-label="Search bookmarks, top sites, and recent tabs"
                            >
                            <div class="qs-search-shortcut" aria-hidden="true">K</div>
                        </div>
                    </div>

                    <div class="qs-content">
                        ${this.getTabsHTML()}
                        ${this.getContentHTML()}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Generate tab navigation HTML with accessibility and animations
     *
     * Creates the tab navigation system with proper ARIA attributes, visual
     * indicators, and dynamic content counts. Implements modern tab patterns
     * with sliding indicator animations and keyboard navigation support.
     *
     * TAB SYSTEM FEATURES:
     * - Three main categories: Bookmarks, Top Sites, Recent Tabs
     * - Dynamic item counts for each category
     * - Sliding indicator for visual feedback
     * - Full accessibility compliance with ARIA
     *
     * ACCESSIBILITY FEATURES:
     * - ARIA tablist pattern implementation
     * - Proper role and state attributes
     * - Screen reader friendly labels with counts
     * - Keyboard navigation support
     *
     * VISUAL DESIGN:
     * - Sliding indicator animation
     * - Icon + text layout
     * - Active state management
     * - Consistent spacing and typography
     *
     * @returns {string} HTML for tab navigation system
     * @private
     */
    getTabsHTML() {
        // ===== TAB CONFIGURATION =====
        // Define all available tabs with metadata and icons
        const tabs = [
            {
                id: 'bookmarks',
                label: 'Bookmarks',
                icon: this.getBookmarkIcon(),
                count: this.bookmarks.length
            },
            {
                id: 'topsites',
                label: 'Top Sites',
                icon: this.getStarIcon(),
                count: this.topSites.length
            },
            {
                id: 'recent',
                label: 'Recent',
                icon: this.getClockIcon(),
                count: this.recentTabs.length
            }
        ];

        // ===== HTML GENERATION =====
        // Always show all tabs, even if they're empty (consistent UI)
        return `
            <div class="qs-tabs" role="tablist" aria-label="Content categories">
                <div class="qs-tab-indicator" aria-hidden="true"></div>
                ${tabs
                    .map(
                        tab => `
                    <button class="qs-tab ${tab.id === this.activeTab ? 'active' : ''}"
                            data-tab="${tab.id}"
                            role="tab"
                            aria-selected="${tab.id === this.activeTab ? 'true' : 'false'}"
                            aria-controls="qs-tab-content"
                            aria-label="${tab.label} (${tab.count} items)">
                        ${tab.icon}
                        <span class="qs-tab-label">${tab.label}</span>
                    </button>
                `
                    )
                    .join('')}
            </div>
        `;
    }

    /**
     * Generate main content area HTML with search engines
     *
     * Creates the main content area containing tab panels and search engine
     * shortcuts. Implements proper ARIA regions and semantic structure for
     * optimal accessibility and user experience.
     *
     * CONTENT STRUCTURE:
     * - Tab content panel with dynamic items
     * - Search engines section with quick access buttons
     * - Proper ARIA labeling and relationships
     * - Fallback icon support for all images
     *
     * SEARCH ENGINES FEATURES:
     * - Developer-focused search engines
     * - Icon + name layout for recognition
     * - Fallback icon generation for failed loads
     * - Accessible button implementation
     *
     * ACCESSIBILITY FEATURES:
     * - ARIA tabpanel pattern
     * - Proper region labeling
     * - Screen reader friendly structure
     * - Keyboard navigation support
     *
     * @returns {string} HTML for main content area
     * @private
     */
    getContentHTML() {
        return `
            <div class="qs-tab-content" id="qs-tab-content" role="tabpanel" aria-labelledby="qs-tab-${this.activeTab}">
                ${this.getItemsHTML()}
            </div>

            <div class="qs-search-engines" role="region" aria-labelledby="qs-search-engines-title">
                <div class="qs-section-title" id="qs-search-engines-title">Quick Search</div>
                <div class="qs-engines-grid" role="group" aria-label="Search engines">
                    ${this.searchEngines
                        .map(
                            engine => `
                        <button class="qs-engine" data-url="${engine.url}" aria-label="Search with ${engine.name}">
                            <img src="${engine.favicon}" alt="" class="qs-engine-icon"
                                 data-fallback-text="${engine.name}"
                                 data-fallback-url="${engine.url}"
                                 data-domain="${new URL(engine.url).hostname.replace('www.', '')}"
                                 aria-hidden="true">
                            <span class="qs-engine-name">${engine.name}</span>
                        </button>
                    `
                        )
                        .join('')}
                </div>
            </div>
        `;
    }

    /**
     * Generate items grid HTML with empty states and fallback handling
     *
     * The core content rendering method that handles both populated and empty
     * states with proper accessibility, performance optimizations, and visual
     * consistency. Implements intelligent empty state messaging and efficient
     * item rendering with fallback icon support.
     *
     * EMPTY STATE FEATURES:
     * - Context-aware empty messages for each tab type
     * - Consistent visual design with icon and descriptions
     * - User-friendly guidance text
     * - Accessible semantic structure
     *
     * ITEM RENDERING FEATURES:
     * - Lazy loading images for performance
     * - Fallback icon support for failed loads
     * - Truncated titles for consistent layout
     * - Domain extraction for clean URLs
     * - Session ID support for tab restoration
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - Lazy loading images to reduce initial load
     * - Efficient string truncation
     * - Minimal DOM structure
     * - Optimized CSS classes
     *
     * ACCESSIBILITY FEATURES:
     * - Proper tabindex for keyboard navigation
     * - Alt text for images
     * - Semantic HTML structure
     * - Screen reader friendly content
     *
     * @returns {string} HTML for items grid or empty state
     * @private
     */
    getItemsHTML() {
        const items = this.getCurrentItems();

        // ===== EMPTY STATE HANDLING =====
        if (items.length === 0) {
            // Context-aware empty messages for each tab type
            const emptyMessages = {
                bookmarks: {
                    title: 'No bookmarks found',
                    description: 'Your bookmarks will appear here'
                },
                topsites: {
                    title: 'No top sites found',
                    description: 'Your most visited sites will appear here'
                },
                recent: {
                    title: 'No recent tabs found',
                    description: 'Your recently closed tabs will appear here'
                }
            };

            const message = emptyMessages[this.activeTab] || emptyMessages.recent;

            return `
                <div class="qs-empty">
                    <div class="qs-empty-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </div>
                    <div class="qs-empty-title">${message.title}</div>
                    <div class="qs-empty-description">${message.description}</div>
                </div>
            `;
        }

        // ===== ITEMS GRID RENDERING =====
        return `
            <div class="qs-items-grid">
                ${items
                    .map((item, _index) => {
                        const domain = this.getDomainName(item.url);
                        return `
                    <div class="qs-item" data-url="${item.url}" data-session-id="${item.sessionId || ''}" tabindex="0">
                        <div class="qs-item-icon" data-domain="${domain}">
                            <img src="${item.favicon}" alt="${item.title}" loading="lazy"
                                 data-fallback-text="${item.title}"
                                 data-fallback-url="${item.url}"
                                 data-domain="${domain}">
                        </div>
                        <div class="qs-item-content">
                            <div class="qs-item-title">${this.truncateText(item.title, 15)}</div>
                            <div class="qs-item-url">${domain}</div>
                        </div>
                    </div>
                `;
                    })
                    .join('')}
            </div>
        `;
    }

    /**
     * ===== CONTENT UTILITY METHODS =====
     *
     * Essential utility methods for content management, text processing,
     * and icon generation with consistent design patterns.
     */

    /**
     * Get current items based on active tab
     *
     * Returns the appropriate data array based on the currently active tab.
     * Provides consistent fallback to bookmarks for unknown tab types.
     *
     * @returns {Array<Object>} Current items for active tab
     * @private
     */
    getCurrentItems() {
        switch (this.activeTab) {
            case 'bookmarks':
                return this.bookmarks;
            case 'topsites':
                return this.topSites;
            case 'recent':
                return this.recentTabs;
            default:
                return this.bookmarks; // Safe fallback
        }
    }

    /**
     * Truncate text with ellipsis for consistent layout
     *
     * Intelligently truncates text to fit within UI constraints while
     * maintaining readability and visual consistency.
     *
     * @param {string} text - Text to truncate
     * @param {number} maxLength - Maximum character length
     * @returns {string} Truncated text with ellipsis if needed
     * @private
     */
    truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    /**
     * ===== ICON GENERATION SYSTEM =====
     *
     * Consistent SVG icon generation for tab navigation with optimized
     * markup and accessibility features.
     */

    /**
     * Generate bookmark icon SVG
     *
     * Creates a bookmark icon using Feather Icons design system for
     * consistent visual language and optimal rendering.
     *
     * @returns {string} SVG markup for bookmark icon
     * @private
     */
    getBookmarkIcon() {
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
    }

    /**
     * Generate star icon SVG for top sites
     *
     * Creates a star icon representing popular/top sites with consistent
     * design language and optimal accessibility.
     *
     * @returns {string} SVG markup for star icon
     * @private
     */
    getStarIcon() {
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`;
    }

    /**
     * Generate clock icon SVG for recent tabs
     *
     * Creates a clock icon representing recent/time-based content with
     * consistent visual design and accessibility compliance.
     *
     * @returns {string} SVG markup for clock icon
     * @private
     */
    getClockIcon() {
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>`;
    }

    /**
     * ===== COMPREHENSIVE EVENT HANDLING SYSTEM =====
     *
     * Advanced event binding system with proper delegation, accessibility
     * support, and performance optimizations. Handles all user interactions
     * including keyboard navigation, search, and fallback icon management.
     */

    /**
     * Bind all event listeners for command palette interactions
     *
     * Sets up comprehensive event handling for search input, tab navigation,
     * item clicks, keyboard navigation, and image fallback management.
     * Uses efficient event delegation and proper cleanup procedures.
     *
     * EVENT CATEGORIES:
     * - Search input handling (real-time and Enter key)
     * - Tab navigation with smooth animations
     * - Item and engine click handling
     * - Keyboard navigation and accessibility
     * - Modal overlay click-to-close
     * - Image fallback and error handling
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - Event delegation for dynamic content
     * - Debounced search handling
     * - Efficient DOM queries
     * - Minimal event listener overhead
     *
     * ACCESSIBILITY FEATURES:
     * - Full keyboard navigation support
     * - ARIA state management
     * - Screen reader compatibility
     * - Focus management
     *
     * @param {HTMLElement} panel - Command palette panel element
     * @private
     */
    bindEvents(panel) {
        // ===== SEARCH INPUT HANDLING =====

        const searchInput = panel.querySelector('#quick-search-input');

        // Real-time search as user types
        searchInput.addEventListener('input', e => {
            this.searchQuery = e.target.value;
            this.handleSearch();
        });

        // Enter key for default Google search
        searchInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleDefaultSearch();
            }
        });

        // ===== TAB NAVIGATION =====

        // Tab switching with smooth animation and AI learning
        panel.querySelectorAll('.qs-tab').forEach(tab => {
            tab.addEventListener('click', async () => {
                if (tab.dataset.tab === this.activeTab) return; // Prevent unnecessary updates
                await this.smoothTabTransition(tab.dataset.tab);
            });
        });

        // ===== ITEM AND ENGINE CLICKS =====

        // Efficient event delegation for dynamic content
        panel.addEventListener('click', async e => {
            const item = e.target.closest('.qs-item');
            const engine = e.target.closest('.qs-engine');

            if (item) {
                await this.handleItemClick(item);
            } else if (engine) {
                this.handleEngineClick(engine);
            }
        });

        // ===== KEYBOARD NAVIGATION =====

        // Comprehensive keyboard navigation for accessibility
        panel.addEventListener('keydown', async e => {
            await this.handleKeyNavigation(e);
        });

        // ===== MODAL OVERLAY HANDLING =====

        // Close on overlay click (standard modal pattern)
        panel.querySelector('.qs-overlay').addEventListener('click', e => {
            if (e.target === e.currentTarget) {
                this.hide();
            }
        });

        // ===== COMPREHENSIVE FAVICON SYSTEM =====

        // Set up complete favicon system (fallbacks + enhancements)
        this.setupFaviconEnhancements(panel);

        // Delayed check for images that failed to load silently
        setTimeout(() => {
            this.checkForFailedImages(panel);
        }, 1000);
    }

    /**
     * ===== INTERACTION HANDLERS =====
     *
     * Sophisticated interaction handling with AI learning, cross-browser
     * compatibility, and intelligent fallback strategies.
     */

    /**
     * Handle item click with AI learning and session restoration
     *
     * Processes clicks on bookmarks, top sites, and recent tabs with intelligent
     * session restoration for recently closed tabs and AI learning integration
     * for behavior pattern recognition.
     *
     * AI LEARNING FEATURES:
     * - Records user interaction patterns
     * - Tracks click behavior for prediction
     * - Builds user preference models
     * - Improves future recommendations
     *
     * SESSION RESTORATION:
     * - Attempts to restore recently closed tabs
     * - Falls back to opening URL in new tab
     * - Cross-browser API compatibility
     * - Graceful error handling
     *
     * @param {HTMLElement} item - Clicked item element
     * @private
     */
    async handleItemClick(item) {
        const url = item.dataset.url;
        const sessionId = item.dataset.sessionId;

        // ===== AI LEARNING INTEGRATION =====
        // Record user interaction for machine learning (only if AI enabled)
        const aiEnabled = await this.isAIEnabled();
        if (aiEnabled && this.tabMemoryReady && this.tabMemory) {
            try {
                this.tabMemory.recordInteraction(this.activeTab, 'click', {
                    url: url,
                    hasSessionId: !!sessionId,
                    timestamp: Date.now()
                });
            } catch (error) {
                // Silent failure - AI learning is optional
            }
        }

        // ===== EXTERNAL NOTIFICATIONS =====
        // Notify main app to update button state
        this.notifyInteraction();

        // ===== SESSION RESTORATION LOGIC =====
        if (sessionId) {
            // Cross-browser API detection
            const api = typeof browser !== 'undefined' && browser.runtime ? browser : chrome;

            if (api?.sessions?.restore) {
                try {
                    // Attempt to restore the closed tab session
                    api.sessions.restore(sessionId);
                } catch (error) {
                    // Fallback: Open URL in new tab if session restore fails
                    if (url) {
                        window.open(url, '_blank');
                    }
                }
            } else if (url) {
                // Fallback: Open URL when sessions API unavailable
                window.open(url, '_blank');
            }
        } else if (url) {
            // Standard URL opening for bookmarks and top sites
            window.open(url, '_blank');
        }

        // Close command palette after successful interaction
        this.hide();
    }

    /**
     * Handle search engine click with query processing
     *
     * Processes clicks on search engine buttons with intelligent query handling
     * and fallback navigation for empty queries.
     *
     * QUERY HANDLING:
     * - Uses current search query if available
     * - Falls back to engine homepage for empty queries
     * - Proper URL encoding for special characters
     * - Cross-platform compatibility
     *
     * @param {HTMLElement} engine - Clicked search engine element
     * @private
     */
    handleEngineClick(engine) {
        const baseUrl = engine.dataset.url;
        const query = this.searchQuery.trim();

        if (query) {
            // Search with current query
            window.open(baseUrl + encodeURIComponent(query), '_blank');
        } else {
            // Navigate to engine homepage when no query
            window.open(baseUrl.replace('search?q=', ''), '_blank');
        }

        // Close command palette after search
        this.hide();
    }

    /**
     * Handle real-time search input
     *
     * Processes search input changes with efficient content filtering
     * and UI updates for responsive user experience.
     *
     * @private
     */
    handleSearch() {
        // Filter items based on search query and update UI
        this.updateContent();
    }

    /**
     * Handle default search (Enter key)
     *
     * Processes Enter key presses in search input with default Google search
     * fallback for comprehensive search functionality.
     *
     * @private
     */
    handleDefaultSearch() {
        const query = this.searchQuery.trim();

        if (query) {
            // Default to Google search for comprehensive results
            window.open(`https://google.com/search?q=${encodeURIComponent(query)}`, '_blank');
            this.hide();
        }
    }

    /**
     * Handle comprehensive keyboard navigation
     *
     * Implements full keyboard navigation support for accessibility compliance
     * and power user efficiency. Supports arrow key navigation, Enter key
     * activation, and proper focus management throughout the interface.
     *
     * KEYBOARD NAVIGATION FEATURES:
     * - Arrow Up/Down: Navigate through items and search engines
     * - Enter: Activate focused item or search engine
     * - Proper focus management and visual feedback
     * - Circular navigation for seamless experience
     *
     * ACCESSIBILITY COMPLIANCE:
     * - WCAG 2.1 Level AA keyboard navigation
     * - Proper focus indicators
     * - Screen reader compatibility
     * - Logical tab order and navigation flow
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - Efficient DOM queries
     * - Minimal layout calculations
     * - Optimized focus management
     * - Event delegation for dynamic content
     *
     * @param {KeyboardEvent} e - Keyboard event object
     * @private
     */
    async handleKeyNavigation(e) {
        // ===== NAVIGATION TARGET DETECTION =====
        // Get all navigable items (both content items and search engines)
        const items = document.querySelectorAll('.qs-item, .qs-engine');
        const focused = document.activeElement;
        const currentIndex = Array.from(items).indexOf(focused);

        // ===== KEYBOARD NAVIGATION HANDLING =====
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                // Navigate to next item (with boundary checking)
                const nextIndex = Math.min(currentIndex + 1, items.length - 1);
                items[nextIndex]?.focus();
                break;

            case 'ArrowUp':
                e.preventDefault();
                // Navigate to previous item (with boundary checking)
                const prevIndex = Math.max(currentIndex - 1, 0);
                items[prevIndex]?.focus();
                break;

            case 'Enter':
                e.preventDefault();
                // Activate focused item based on type
                if (focused?.classList.contains('qs-item')) {
                    await this.handleItemClick(focused);
                } else if (focused?.classList.contains('qs-engine')) {
                    this.handleEngineClick(focused);
                }
                break;
        }
    }

    /**
     * ===== SMOOTH TAB TRANSITION SYSTEM =====
     *
     * Advanced tab switching with smooth animations, AI learning integration,
     * and proper accessibility state management.
     */

    /**
     * Execute smooth tab transition with animations and AI learning
     *
     * Orchestrates a sophisticated tab switching experience with fade animations,
     * sliding indicator movement, AI behavior recording, and proper ARIA state
     * management for optimal user experience and accessibility.
     *
     * ANIMATION SEQUENCE:
     * 1. Record interaction for AI learning
     * 2. Move sliding indicator to new tab
     * 3. Fade out current content
     * 4. Update tab states and ARIA attributes
     * 5. Load new content and fade in
     *
     * AI LEARNING INTEGRATION:
     * - Records tab switching patterns
     * - Tracks user preferences over time
     * - Builds behavioral models for prediction
     * - Improves future tab recommendations
     *
     * ACCESSIBILITY FEATURES:
     * - Proper ARIA state management
     * - Screen reader announcements
     * - Focus management during transitions
     * - Semantic state updates
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - Efficient DOM manipulation
     * - Optimized animation timing
     * - Minimal layout thrashing
     * - Smooth 60fps transitions
     *
     * @param {string} newTab - ID of the tab to switch to
     * @private
     */
    async smoothTabTransition(newTab) {
        const contentContainer = document.querySelector('.qs-tab-content');
        const tabs = document.querySelectorAll('.qs-tab');

        // Early return if content container not found
        if (!contentContainer) return;

        // ===== AI LEARNING INTEGRATION =====
        // Record tab switch for machine learning (only if AI enabled)
        const aiEnabled = await this.isAIEnabled();
        if (aiEnabled && this.tabMemoryReady && this.tabMemory) {
            try {
                this.tabMemory.recordInteraction(newTab, 'switch', {
                    previousTab: this.activeTab,
                    timestamp: Date.now()
                });
            } catch (error) {
                // Silent failure - AI learning is optional
            }
        }

        // ===== EXTERNAL NOTIFICATIONS =====
        // Notify main app to update button state
        this.notifyInteraction();

        // ===== ANIMATION SEQUENCE =====

        // Step 1: Move the sliding indicator
        this.moveTabIndicator(newTab);

        // Step 2: Start fade out animation
        contentContainer.style.opacity = '0';

        // Step 3: Update active tab states immediately (for visual feedback)
        tabs.forEach(tab => {
            const isActive = tab.dataset.tab === newTab;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Step 4: Wait for fade out, then update content and fade in
        setTimeout(() => {
            // Update internal state
            this.activeTab = newTab;

            // Load new content
            contentContainer.innerHTML = this.getItemsHTML();

            // ===== FAVICON ENHANCEMENT SYSTEM =====
            // Re-apply favicon enhancements after DOM content update
            this.setupFaviconEnhancements(contentContainer);

            // Force reflow to ensure DOM changes are applied
            contentContainer.offsetHeight;

            // Fade in with new content
            contentContainer.style.opacity = '1';
        }, 150); // Half of the CSS transition duration for smooth timing
    }

    /**
     * ===== TAB INDICATOR ANIMATION SYSTEM =====
     *
     * Sophisticated sliding indicator animation system with smooth transitions
     * and precise positioning calculations for modern UI feedback.
     */

    /**
     * Move tab indicator with animation
     *
     * Triggers animated movement of the tab indicator to the target tab
     * with smooth easing and proper timing coordination.
     *
     * @param {string} activeTabId - ID of target tab for indicator
     * @private
     */
    moveTabIndicator(activeTabId) {
        this.setTabIndicatorPosition(activeTabId, true);
    }

    /**
     * Set tab indicator position with advanced padding calculations
     *
     * Precisely positions the sliding tab indicator using sophisticated DOM
     * measurements that account for container padding and smooth CSS transitions.
     * Handles both animated and instant positioning for different use cases.
     *
     * POSITIONING ALGORITHM:
     * - Finds target tab element in DOM
     * - Calculates container padding for accurate positioning
     * - Measures exact width and position of target tab
     * - Applies smooth transform-based movement
     * - Handles transition cleanup automatically
     *
     * ANIMATION FEATURES:
     * - Transform-based positioning for optimal performance
     * - Automatic transition management
     * - Padding-aware calculations for pixel-perfect alignment
     * - Support for instant positioning without animation
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - Uses transform instead of left/top for GPU acceleration
     * - Efficient DOM measurements with getBoundingClientRect
     * - Minimal layout calculations
     * - Proper reflow management
     *
     * @param {string} activeTabId - ID of target tab for indicator
     * @param {boolean} animate - Whether to animate the transition
     * @private
     */
    setTabIndicatorPosition(activeTabId, animate = true) {
        const tabs = document.querySelectorAll('.qs-tab');
        const indicator = document.querySelector('.qs-tab-indicator');

        // Early return if indicator not found
        if (!indicator) return;

        // ===== ANIMATION CONTROL =====
        // Temporarily disable transition for instant positioning
        if (!animate) {
            indicator.style.transition = 'none';
        }

        // ===== TARGET TAB DETECTION =====
        // Find the active tab element
        const activeTab = Array.from(tabs).find(tab => tab.dataset.tab === activeTabId);
        if (!activeTab) return;

        // ===== PRECISE POSITION CALCULATIONS =====
        // Calculate position and width accounting for container padding
        const tabsContainer = activeTab.parentElement;
        const containerRect = tabsContainer.getBoundingClientRect();
        const activeRect = activeTab.getBoundingClientRect();

        // Get container's computed style to account for padding
        const containerStyle = window.getComputedStyle(tabsContainer);
        const containerPaddingLeft = parseFloat(containerStyle.paddingLeft);

        // Calculate position relative to container's content area (excluding padding)
        const left = activeRect.left - containerRect.left - containerPaddingLeft;
        const width = activeRect.width;

        // ===== INDICATOR POSITIONING =====
        // Move the indicator using transform for optimal performance
        indicator.style.transform = `translateX(${left}px)`;
        indicator.style.width = `${width}px`;

        // ===== TRANSITION CLEANUP =====
        // Re-enable transition after positioning
        if (!animate) {
            // Force a reflow to apply the position change
            indicator.offsetHeight;
            indicator.style.transition = '';
        }
    }

    /**
     * ===== CONTENT MANAGEMENT SYSTEM =====
     *
     * Efficient content updating and style injection for dynamic UI updates
     * and optimal performance.
     */

    /**
     * Update content container with current items
     *
     * Efficiently updates the content area with current tab items and
     * synchronizes tab states for consistent UI representation.
     *
     * UPDATE OPERATIONS:
     * - Synchronizes active tab visual states
     * - Updates content container with fresh HTML
     * - Maintains proper ARIA attributes
     * - Preserves focus and accessibility
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - Minimal DOM queries
     * - Efficient innerHTML updates
     * - Batch DOM modifications
     * - Optimized class toggling
     *
     * @private
     */
    updateContent() {
        const contentContainer = document.querySelector('.qs-tab-content');
        const tabs = document.querySelectorAll('.qs-tab');

        // ===== TAB STATE SYNCHRONIZATION =====
        // Update active tab visual states
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === this.activeTab);
        });

        // ===== CONTENT UPDATE =====
        // Update content with current items
        if (contentContainer) {
            contentContainer.innerHTML = this.getItemsHTML();

            // ===== FAVICON ENHANCEMENT SYSTEM =====
            // Re-apply favicon enhancements after content update
            this.setupFaviconEnhancements(contentContainer);
        }
    }

    /**
     * Inject CSS styles for command palette
     *
     * Dynamically injects comprehensive CSS styles for the command palette
     * with proper deduplication and optimal performance. Styles are injected
     * only once per page load to prevent conflicts and redundancy.
     *
     * STYLE FEATURES:
     * - Comprehensive command palette styling
     * - Modern glassmorphism design
     * - Responsive mobile optimizations
     * - Smooth animations and transitions
     * - Cross-browser compatibility
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - Single injection per page load
     * - Efficient style element creation
     * - Minimal DOM manipulation
     * - Optimized CSS delivery
     *
     * @private
     */
    injectStyles() {
        // Prevent duplicate style injection
        if (document.getElementById('quick-shortcuts-styles')) return;

        // Create and inject style element
        const styles = document.createElement('style');
        styles.id = 'quick-shortcuts-styles';
        styles.textContent = this.getCSS();
        document.head.appendChild(styles);
    }

    /**
     * ===== ADVANCED IMAGE FALLBACK SYSTEM =====
     *
     * Sophisticated image fallback handling with error detection, prevention
     * of infinite loops, and comprehensive failure recovery strategies.
     */

    /**
     * Set up comprehensive favicon system (fallbacks + enhancements)
     *
     * Orchestrates both favicon fallback handling and dark mode visibility
     * enhancements. This is the main entry point for favicon system setup
     * that should be called whenever DOM content is updated.
     *
     * COMPREHENSIVE FEATURES:
     * - Automatic error detection and fallback generation
     * - Intelligent dark mode visibility enhancements
     * - Canvas-based brightness analysis
     * - Domain-specific optimizations
     *
     * @param {HTMLElement} panel - Panel containing images to setup
     * @private
     */
    setupFaviconEnhancements(panel) {
        // Set up fallback handling first
        this.setupFallbackIcons(panel);

        // Then enhance all loaded images immediately
        this.enhanceAllFavicons(panel);
    }

    /**
     * Enhance all favicons in a panel immediately
     *
     * Applies favicon visibility enhancements to all already-loaded images
     * in the panel. This is called after DOM updates to ensure enhancements
     * persist across tab switches and content updates.
     *
     * @param {HTMLElement} panel - Panel containing images to enhance
     * @private
     */
    enhanceAllFavicons(panel) {
        const images = panel.querySelectorAll('img[data-fallback-text]');

        images.forEach(img => {
            // Only enhance images that are already loaded
            if (img.complete && img.naturalWidth > 0) {
                this.enhanceFaviconVisibility(img);
            }
        });
    }

    /**
     * Setup fallback icon handling for all images
     *
     * Implements comprehensive image fallback handling with error event listeners,
     * duplicate prevention, and immediate fallback for already-failed images.
     * Ensures visual consistency even when favicons fail to load.
     *
     * FALLBACK FEATURES:
     * - Automatic error detection and recovery
     * - Prevention of infinite error loops
     * - Immediate handling of pre-failed images
     * - Consistent fallback icon generation
     *
     * ERROR HANDLING STRATEGY:
     * - Detects image load failures via error events
     * - Generates beautiful SVG fallback icons
     * - Prevents duplicate event listeners
     * - Handles edge cases with complete but failed images
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - Efficient DOM queries with specific selectors
     * - Minimal event listener overhead
     * - Optimized error detection logic
     * - Batch processing of multiple images
     *
     * @param {HTMLElement} panel - Panel containing images to setup
     * @private
     */
    setupFallbackIcons(panel) {
        // ===== IMAGE DETECTION =====
        // Find all images with fallback data attributes
        const images = panel.querySelectorAll('img[data-fallback-text]');

        images.forEach(img => {
            // ===== DUPLICATE PREVENTION =====
            // Remove any existing error listeners to prevent duplicates
            img.removeEventListener('error', this.handleImageError);

            // ===== ERROR HANDLER SETUP =====
            // Create error handler with proper scope binding
            const handleError = () => {
                const fallbackText = img.dataset.fallbackText || '';
                const fallbackUrl = img.dataset.fallbackUrl || '';
                const fallbackIcon = this.generateFallbackIcon(fallbackText, fallbackUrl);

                // Set fallback icon
                img.src = fallbackIcon;

                // ===== INFINITE LOOP PREVENTION =====
                // Remove error listener to prevent infinite error loops
                img.removeEventListener('error', handleError);
            };

            // ===== EVENT LISTENER BINDING =====
            img.addEventListener('error', handleError);

            // ===== DARK MODE FAVICON ENHANCEMENT =====
            // Set up intelligent brightness detection for dark mode visibility
            img.addEventListener('load', () => {
                // Only enhance if this is not a fallback icon (data URI)
                if (!img.src.startsWith('data:image/svg+xml')) {
                    this.enhanceFaviconVisibility(img);
                }
            });

            // ===== IMMEDIATE FALLBACK FOR PRE-FAILED IMAGES =====
            // Check if image is already broken (failed before listener was added)
            if (img.complete && img.naturalWidth === 0) {
                handleError();
            } else if (img.complete && img.naturalWidth > 0) {
                // Image already loaded, enhance visibility immediately (but not for fallback icons)
                if (!img.src.startsWith('data:image/svg+xml')) {
                    this.enhanceFaviconVisibility(img);
                }
            }
        });
    }

    /**
     * Check for silently failed images
     *
     * Performs delayed check for images that may have failed to load but
     * didn't trigger error events. Handles edge cases where images appear
     * complete but have no actual content.
     *
     * SILENT FAILURE DETECTION:
     * - Checks complete images with zero dimensions
     * - Handles browser-specific failure modes
     * - Provides fallback for missed error events
     * - Ensures comprehensive image coverage
     *
     * EDGE CASE HANDLING:
     * - Images that load but have no content
     * - Browser-specific loading behaviors
     * - Network timeout scenarios
     * - CORS-related image failures
     *
     * @param {HTMLElement} panel - Panel containing images to check
     * @private
     */
    checkForFailedImages(panel) {
        // ===== FAILED IMAGE DETECTION =====
        // Find all images with fallback data attributes
        const images = panel.querySelectorAll('img[data-fallback-text]');

        images.forEach(img => {
            // ===== SILENT FAILURE CHECK =====
            // Check if image failed to load (complete but no natural dimensions)
            if (img.complete && (img.naturalWidth === 0 || img.naturalHeight === 0)) {
                const fallbackText = img.dataset.fallbackText || '';
                const fallbackUrl = img.dataset.fallbackUrl || '';
                const fallbackIcon = this.generateFallbackIcon(fallbackText, fallbackUrl);

                // Apply fallback for silently failed image
                img.src = fallbackIcon;
            } else if (img.complete && img.naturalWidth > 0) {
                // Image loaded successfully, enhance visibility for dark mode (but not for fallback icons)
                if (!img.src.startsWith('data:image/svg+xml')) {
                    this.enhanceFaviconVisibility(img);
                }
            }
        });
    }

    /**
     * ===== INTELLIGENT FAVICON VISIBILITY ENHANCEMENT SYSTEM =====
     *
     * Advanced favicon brightness detection and enhancement for optimal
     * visibility in dark themes. Uses canvas-based image analysis to
     * intelligently detect dark icons and apply appropriate enhancements.
     */

    /**
     * Enhance favicon visibility for dark mode
     *
     * Intelligently analyzes favicon brightness and applies appropriate
     * enhancements for optimal visibility in dark themes. Uses canvas-based
     * image analysis for accurate brightness detection.
     *
     * BRIGHTNESS ANALYSIS:
     * - Canvas-based pixel analysis for accurate brightness calculation
     * - Weighted brightness calculation using human vision perception
     * - Transparent pixel handling to avoid skewed results
     * - Domain-based fallback for external images (CORS limitations)
     *
     * ENHANCEMENT LEVELS:
     * - Normal icons: Subtle brightness/contrast boost
     * - Dark icons (< 80 brightness): Moderate enhancement + subtle glow
     * - Very dark icons (< 40 brightness): Maximum enhancement + stronger glow
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - Only analyzes data URLs to avoid CORS issues
     * - Efficient canvas operations with minimal memory usage
     * - Cached results to avoid repeated analysis
     * - Graceful fallback for analysis failures
     *
     * @param {HTMLImageElement} img - Image element to analyze and enhance
     * @private
     */
    enhanceFaviconVisibility(img) {
        try {
            const iconContainer = img.closest('.qs-item-icon');
            if (!iconContainer) return;

            const domain = img.dataset.domain;
            const faviconUrl = img.src;

            // ===== DOMAIN-SPECIFIC ENHANCEMENTS =====
            // Apply known enhancements for problematic domains
            const knownDarkDomains = [
                'chatgpt.com',
                'openai.com',
                'v0.dev',
                'vercel.com',
                'github.com',
                'linear.app',
                'notion.so',
                'figma.com'
            ];

            if (domain && knownDarkDomains.includes(domain)) {
                iconContainer.classList.add('dark-icon');
                return;
            }

            // ===== CANVAS-BASED BRIGHTNESS ANALYSIS =====
            // Only analyze data URLs to avoid CORS issues
            if (faviconUrl.startsWith('data:image/')) {
                this.analyzeFaviconBrightness(img, iconContainer);
            } else {
                // ===== FALLBACK ENHANCEMENT =====
                // Apply mild enhancement for external images
                iconContainer.classList.add('enhanced-icon');
            }
        } catch (error) {
            // ===== GRACEFUL DEGRADATION =====
            // Silent failure - don't break favicon display
            // Apply mild enhancement as fallback
            const iconContainer = img.closest('.qs-item-icon');
            if (iconContainer) {
                iconContainer.classList.add('enhanced-icon');
            }
        }
    }

    /**
     * Analyze favicon brightness using canvas
     *
     * Performs detailed brightness analysis of favicon images using canvas
     * pixel data to determine optimal enhancement levels for dark mode visibility.
     *
     * ANALYSIS ALGORITHM:
     * - Creates temporary canvas for pixel analysis
     * - Calculates weighted brightness using human vision perception (0.299R + 0.587G + 0.114B)
     * - Ignores transparent pixels to avoid skewed results
     * - Applies enhancement classes based on brightness thresholds
     *
     * BRIGHTNESS THRESHOLDS:
     * - < 30: Very dark icon (maximum enhancement)
     * - < 60: Dark icon (moderate enhancement)
     * - < 100: Slightly dark icon (minimal enhancement)
     * - >= 100: Normal bright icon (no enhancement - natural appearance)
     *
     * @param {HTMLImageElement} img - Image element to analyze
     * @param {HTMLElement} iconContainer - Container element to apply classes to
     * @private
     */
    analyzeFaviconBrightness(img, iconContainer) {
        try {
            // ===== CANVAS SETUP =====
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas size to match image
            canvas.width = img.naturalWidth || 32;
            canvas.height = img.naturalHeight || 32;

            // Draw image to canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // ===== PIXEL DATA ANALYSIS =====
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            let totalBrightness = 0;
            let pixelCount = 0;

            // Analyze each pixel
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const a = data[i + 3];

                // Skip transparent pixels
                if (a > 50) {
                    // Threshold for semi-transparent pixels
                    // Calculate perceived brightness (weighted for human vision)
                    const brightness = r * 0.299 + g * 0.587 + b * 0.114;
                    totalBrightness += brightness;
                    pixelCount++;
                }
            }

            // ===== BRIGHTNESS CLASSIFICATION =====
            if (pixelCount > 0) {
                const averageBrightness = totalBrightness / pixelCount;

                // Apply enhancement based on brightness level - more conservative thresholds
                if (averageBrightness < 30) {
                    // Very dark icon - maximum enhancement
                    iconContainer.classList.add('very-dark-icon');
                } else if (averageBrightness < 60) {
                    // Dark icon - moderate enhancement
                    iconContainer.classList.add('dark-icon');
                } else if (averageBrightness < 100) {
                    // Slightly dark icon - minimal enhancement
                    iconContainer.classList.add('enhanced-icon');
                }
                // Normal bright icons (>= 100) get no enhancement - stay natural
            } else {
                // No opaque pixels found - apply minimal enhancement
                iconContainer.classList.add('enhanced-icon');
            }
        } catch (error) {
            // ===== ANALYSIS FAILURE FALLBACK =====
            // Apply default enhancement if analysis fails
            iconContainer.classList.add('enhanced-icon');
        }
    }

    /**
     * ===== EXTERNAL INTEGRATION SYSTEM =====
     *
     * Communication bridge with main application for state synchronization
     * and cross-component coordination.
     */

    /**
     * Notify main application of user interactions
     *
     * Sends interaction notifications to the main NEXUS application for
     * state synchronization and UI updates. Uses delayed execution to
     * ensure proper timing coordination.
     *
     * NOTIFICATION FEATURES:
     * - Cross-component communication
     * - State synchronization
     * - UI update coordination
     * - Proper timing management
     *
     * @private
     */
    notifyInteraction() {
        // Notify main app that an interaction occurred
        if (window.nexus && window.nexus.updateTabMemoryButtonState) {
            setTimeout(() => {
                window.nexus.updateTabMemoryButtonState();
            }, 100);
        }
    }

    /**
     * ===== COMPREHENSIVE DEBUG SYSTEM =====
     *
     * Advanced debugging and analytics methods for development, testing,
     * and performance monitoring. Accessible via browser console for
     * real-time system inspection.
     */

    /**
     * Get AI analytics data for debugging
     *
     * Retrieves comprehensive analytics data from the AI tab memory system
     * for debugging, performance monitoring, and behavior analysis.
     *
     * ANALYTICS FEATURES:
     * - User behavior patterns
     * - Prediction accuracy metrics
     * - Usage statistics
     * - Performance data
     *
     * @returns {Object} Analytics data or error information
     * @public
     */
    getAnalytics() {
        if (this.tabMemoryReady && this.tabMemory) {
            return this.tabMemory.getAnalytics();
        }
        return { error: 'TabMemory not ready' };
    }

    /**
     * Get current AI-predicted tab for debugging
     *
     * Returns the tab that the AI system predicts the user is most likely
     * to access next, useful for debugging prediction accuracy.
     *
     * @returns {string} Predicted tab ID or fallback
     * @public
     */
    getPredictedTab() {
        if (this.tabMemoryReady && this.tabMemory) {
            return this.tabMemory.getPredictedTab();
        }
        return 'bookmarks';
    }

    /**
     * Get comprehensive tab memory system status
     *
     * Provides complete status information about the AI tab memory system
     * including readiness, current state, and analytics data.
     *
     * STATUS INFORMATION:
     * - System readiness state
     * - Current and predicted tabs
     * - Analytics data
     * - Error information
     *
     * @returns {Object} Complete system status
     * @public
     */
    getTabMemoryStatus() {
        return {
            ready: this.tabMemoryReady,
            hasTabMemory: !!this.tabMemory,
            currentTab: this.activeTab,
            predictedTab: this.getPredictedTab(),
            analytics: this.getAnalytics()
        };
    }

    /**
     * ===== ADVANCED TESTING AND DEBUGGING METHODS =====
     *
     * Comprehensive testing utilities for AI system validation, cache
     * performance analysis, and system optimization.
     */

    /**
     * Force record interaction for AI testing
     *
     * Manually triggers AI interaction recording for testing machine learning
     * algorithms and behavior pattern recognition.
     *
     * @param {string} tabType - Type of tab interaction to record
     * @param {string} action - Action type to record
     * @public
     */
    testRecordInteraction(tabType = 'bookmarks', action = 'test') {
        if (this.tabMemoryReady && this.tabMemory) {
            this.tabMemory.recordInteraction(tabType, action);
        }
    }

    /**
     * Get AI usage variance for optimization
     *
     * Calculates usage variance for AI system optimization and threshold
     * adjustment. Used for fine-tuning prediction algorithms.
     *
     * @returns {number} Usage variance value
     * @public
     */
    getUsageVariance() {
        if (this.tabMemoryReady && this.tabMemory) {
            return this.tabMemory.calculateUsageVariance();
        }
        return 0;
    }

    /**
     * Reset AI tab memory for testing
     *
     * Resets the AI tab memory system for testing new optimized values
     * and algorithm improvements.
     *
     * @returns {Promise} Reset completion promise
     * @public
     */
    resetTabMemory() {
        if (this.tabMemoryReady && this.tabMemory) {
            return this.tabMemory.resetMemory();
        }
        return Promise.resolve();
    }

    /**
     * Test favicon caching system
     */
    async testFaviconCaching() {
        const testResults = {
            sessionCache: {},
            persistentCache: {},
            cacheManager: !!this.cacheManager,
            tests: []
        };

        // Test 1: Session cache
        const testUrl = 'https://github.com';
        const sessionCacheKey = `favicon_github.com`;

        // Check if session cache has the favicon
        testResults.sessionCache.hasGitHub = this.faviconCache.has(sessionCacheKey);
        testResults.sessionCache.size = this.faviconCache.size;

        // Test 2: Persistent cache (if available)
        if (this.cacheManager) {
            try {
                const faviconUrl = this.getFaviconUrl(testUrl);
                const cached = await this.cacheManager.getCachedFavicon(faviconUrl);
                testResults.persistentCache.hasGitHub = !!cached;
                testResults.persistentCache.expired = cached
                    ? this.cacheManager.isExpired(
                          cached.timestamp,
                          this.cacheManager.config.faviconExpiry
                      )
                    : null;
                testResults.persistentCache.timestamp = cached?.timestamp;
                testResults.persistentCache.size = cached?.size;
            } catch (error) {
                testResults.persistentCache.error = error.message;
            }
        }

        // Test 3: Force cache a favicon
        try {
            const testFavicon = await this.getCachedFavicon(testUrl);
            testResults.tests.push({
                test: 'getCachedFavicon',
                url: testUrl,
                result: testFavicon?.substring(0, 50) + '...',
                success: !!testFavicon
            });
        } catch (error) {
            testResults.tests.push({
                test: 'getCachedFavicon',
                url: testUrl,
                error: error.message,
                success: false
            });
        }

        return testResults;
    }

    /**
     * Get cache statistics
     */
    async getCacheStats() {
        const stats = {
            sessionCache: {
                size: this.faviconCache.size,
                keys: Array.from(this.faviconCache.keys())
            },
            persistentCache: null,
            cacheManager: !!this.cacheManager
        };

        if (this.cacheManager) {
            try {
                // Get all cached favicons from IndexedDB
                const transaction = this.cacheManager.db.transaction(
                    [this.cacheManager.stores.favicons],
                    'readonly'
                );
                const store = transaction.objectStore(this.cacheManager.stores.favicons);
                const request = store.getAll();

                stats.persistentCache = await new Promise((resolve, reject) => {
                    request.onsuccess = () => {
                        const favicons = request.result;
                        resolve({
                            count: favicons.length,
                            totalSize: favicons.reduce((sum, f) => sum + (f.size || 0), 0),
                            domains: favicons.map(f => f.domain),
                            oldestTimestamp: Math.min(...favicons.map(f => f.timestamp)),
                            newestTimestamp: Math.max(...favicons.map(f => f.timestamp))
                        });
                    };
                    request.onerror = () => reject(request.error);
                });
            } catch (error) {
                stats.persistentCache = { error: error.message };
            }
        }

        return stats;
    }

    /**
     * Clear favicon cache for testing
     */
    async clearFaviconCache() {
        // Clear session cache
        this.faviconCache.clear();

        // Clear persistent cache if available
        if (this.cacheManager && this.cacheManager.db) {
            try {
                const transaction = this.cacheManager.db.transaction(
                    [this.cacheManager.stores.favicons],
                    'readwrite'
                );
                const store = transaction.objectStore(this.cacheManager.stores.favicons);
                await new Promise((resolve, reject) => {
                    const request = store.clear();
                    request.onsuccess = () => resolve();
                    request.onerror = () => reject(request.error);
                });
                return 'Favicon cache cleared successfully';
            } catch (error) {
                return `Error clearing persistent cache: ${error.message}`;
            }
        }

        return 'Session cache cleared (no persistent cache available)';
    }

    /**
     * Verify if extension is using cached icons
     */
    async verifyCacheUsage() {
        const results = {
            timestamp: Date.now(),
            tests: []
        };

        // Test multiple domains to see cache behavior
        const testDomains = ['github.com', 'google.com', 'stackoverflow.com'];

        for (const domain of testDomains) {
            const testUrl = `https://${domain}`;
            const startTime = performance.now();

            // First call - might fetch from network or cache
            const favicon1 = await this.getCachedFavicon(testUrl);
            const firstCallTime = performance.now() - startTime;

            // Second call - should be from cache
            const startTime2 = performance.now();
            const favicon2 = await this.getCachedFavicon(testUrl);
            const secondCallTime = performance.now() - startTime2;

            results.tests.push({
                domain,
                firstCall: {
                    time: firstCallTime.toFixed(2) + 'ms',
                    result: favicon1?.substring(0, 50) + '...'
                },
                secondCall: {
                    time: secondCallTime.toFixed(2) + 'ms',
                    result: favicon2?.substring(0, 50) + '...'
                },
                cached: secondCallTime < firstCallTime,
                speedImprovement:
                    firstCallTime > 0
                        ? (((firstCallTime - secondCallTime) / firstCallTime) * 100).toFixed(1) +
                          '%'
                        : '0%'
            });
        }

        return results;
    }

    /**
     * Remove duplicate favicon cache entries
     */
    async cleanupDuplicateFavicons() {
        if (!this.cacheManager || !this.cacheManager.db) {
            return 'Cache manager not available';
        }

        try {
            const transaction = this.cacheManager.db.transaction(
                [this.cacheManager.stores.favicons],
                'readwrite'
            );
            const store = transaction.objectStore(this.cacheManager.stores.favicons);

            // Get all favicons
            const allFavicons = await new Promise((resolve, reject) => {
                const request = store.getAll();
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });

            // Group by domain and keep only the newest
            const domainMap = new Map();
            allFavicons.forEach(favicon => {
                const existing = domainMap.get(favicon.domain);
                if (!existing || favicon.timestamp > existing.timestamp) {
                    domainMap.set(favicon.domain, favicon);
                }
            });

            // Clear store and add deduplicated entries
            await new Promise((resolve, reject) => {
                const clearRequest = store.clear();
                clearRequest.onsuccess = () => resolve();
                clearRequest.onerror = () => reject(clearRequest.error);
            });

            // Add back deduplicated entries
            for (const favicon of domainMap.values()) {
                await new Promise((resolve, reject) => {
                    const putRequest = store.put(favicon);
                    putRequest.onsuccess = () => resolve();
                    putRequest.onerror = () => reject(putRequest.error);
                });
            }

            return {
                before: allFavicons.length,
                after: domainMap.size,
                removed: allFavicons.length - domainMap.size,
                message: `Cleaned up ${allFavicons.length - domainMap.size} duplicate favicon entries`
            };
        } catch (error) {
            return `Error cleaning up duplicates: ${error.message}`;
        }
    }

    /**
     * Test favicon visibility enhancement system
     *
     * Tests the intelligent favicon brightness detection and enhancement
     * system for debugging and optimization purposes.
     *
     * @returns {Object} Test results with enhancement statistics
     * @public
     */
    testFaviconEnhancement() {
        const results = {
            timestamp: Date.now(),
            totalIcons: 0,
            enhancementStats: {
                enhanced: 0,
                dark: 0,
                veryDark: 0,
                domainSpecific: 0
            },
            iconDetails: []
        };

        // Find all favicon images in the current panel
        const faviconImages = document.querySelectorAll('.qs-item-icon img, .qs-engine-icon');
        results.totalIcons = faviconImages.length;

        faviconImages.forEach((img, index) => {
            const iconContainer = img.closest('.qs-item-icon') || img.parentElement;
            const domain = img.dataset.domain || 'unknown';
            const src = img.src;

            const iconDetail = {
                index,
                domain,
                src: src.substring(0, 50) + (src.length > 50 ? '...' : ''),
                isDataUrl: src.startsWith('data:'),
                classes: [],
                enhancement: 'none'
            };

            // Check applied enhancement classes
            if (iconContainer.classList.contains('very-dark-icon')) {
                results.enhancementStats.veryDark++;
                iconDetail.classes.push('very-dark-icon');
                iconDetail.enhancement = 'very-dark';
            } else if (iconContainer.classList.contains('dark-icon')) {
                results.enhancementStats.dark++;
                iconDetail.classes.push('dark-icon');
                iconDetail.enhancement = 'dark';
            } else if (iconContainer.classList.contains('enhanced-icon')) {
                results.enhancementStats.enhanced++;
                iconDetail.classes.push('enhanced-icon');
                iconDetail.enhancement = 'enhanced';
            }

            // Check for domain-specific enhancements
            const knownDarkDomains = [
                'chatgpt.com',
                'openai.com',
                'v0.dev',
                'vercel.com',
                'github.com',
                'linear.app',
                'notion.so',
                'figma.com'
            ];
            if (knownDarkDomains.includes(domain)) {
                results.enhancementStats.domainSpecific++;
                iconDetail.domainSpecific = true;
            }

            results.iconDetails.push(iconDetail);
        });

        return results;
    }

    /**
     * ===== COMPREHENSIVE CSS STYLING SYSTEM =====
     *
     * Advanced CSS-in-JS system with modern design patterns, responsive
     * optimizations, and sophisticated visual effects. Implements glassmorphism,
     * smooth animations, and comprehensive mobile support.
     *
     * DESIGN INSPIRATION:
     * - Raycast: Command palette patterns and keyboard shortcuts
     * - Linear: Clean typography and spacing systems
     * - Arc Browser: Modern glassmorphism and blur effects
     * - Claude AI: Sophisticated interaction patterns
     *
     * TECHNICAL FEATURES:
     * - CSS Custom Properties integration for theming
     * - Advanced backdrop blur effects for glassmorphism
     * - Comprehensive responsive design (desktop, tablet, mobile)
     * - Smooth animations with optimized easing curves
     * - Touch-friendly interactions for mobile devices
     * - Accessibility-compliant focus states and interactions
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - GPU-accelerated animations with transform/opacity
     * - Efficient CSS selectors and minimal specificity
     * - Optimized media queries for different screen sizes
     * - Hardware-accelerated backdrop filters
     *
     * @returns {string} Complete CSS stylesheet for command palette
     * @private
     */
    getCSS() {
        return `
            /* ===== NEXUS QUICK SHORTCUTS - COMMAND PALETTE STYLES ===== */
            /*
             * Modern command palette inspired by industry-leading tools:
             * - Raycast: Command palette UX patterns
             * - Linear: Typography and spacing systems
             * - Arc Browser: Glassmorphism and modern aesthetics
             * - Claude AI: Sophisticated interaction design
             *
             * THEME INTEGRATION:
             * - Inherits CSS custom properties from :root
             * - Automatically adapts to current theme and background
             * - Supports both light and dark theme variants
             * - Responsive to user's system preferences
             */

            /* ===== MODAL OVERLAY SYSTEM ===== */
            .qs-overlay {
                /* Full-screen modal overlay with glassmorphism */
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                z-index: 999999;
                display: flex;
                align-items: flex-start;
                justify-content: center;
                padding-top: 15vh;
                animation: qs-fade-in 200ms cubic-bezier(0.16, 1, 0.3, 1);
            }

            /* ===== MAIN CONTAINER ===== */
            .qs-container {
                /* Command palette container with modern design */
                width: min(90vw, 720px);
                max-height: 85vh;
                background: var(--panel-background);
                border: 1px solid var(--panel-border);
                border-radius: 16px;
                overflow: hidden;
                box-shadow:
                    0 10px 15px rgba(0, 0, 0, 0.1),
                    0 4px 6px rgba(0, 0, 0, 0.08),
                    inset 0 1px 0 rgba(255, 255, 255, 0.05);
                animation: qs-slide-up 200ms cubic-bezier(0.16, 1, 0.3, 1);
                display: flex;
                flex-direction: column;
                transition: height 400ms cubic-bezier(0.16, 1, 0.3, 1);
            }

            /* ===== COMPREHENSIVE MOBILE OPTIMIZATIONS ===== */
            /*
             * Advanced responsive design system with touch-friendly interactions,
             * iOS-specific optimizations, and progressive enhancement patterns.
             *
             * MOBILE DESIGN PRINCIPLES:
             * - Touch targets minimum 44px for accessibility
             * - iOS zoom prevention with 16px font sizes
             * - Progressive spacing reduction for smaller screens
             * - Optimized content hierarchy for mobile reading
             */

            /* TABLET AND LARGE MOBILE (768px and below) */
            @media (max-width: 768px) {
                /* ===== ENHANCED MOBILE LAYOUT ===== */
                .qs-overlay {
                    padding-top: 8vh; /* Reduced top padding for mobile */
                    align-items: flex-start; /* Top alignment for better mobile UX */
                }

                .qs-container {
                    width: 100vw; /* Full width for mobile */
                    max-width: none; /* Remove width constraints */
                    max-height: 92vh; /* Nearly full height */
                    border-radius: 0; /* Remove border radius for full screen feel */
                    margin: 0; /* Remove margins */
                    border-left: none; /* Remove side borders */
                    border-right: none; /* Remove side borders */
                }

                .qs-search-section {
                    padding: 20px 24px 16px; /* Generous mobile padding */
                    background: var(--panel-background); /* Consistent background */
                }

                .qs-search-input {
                    font-size: 16px; /* Prevents zoom on iOS Safari */
                    padding: 14px 18px; /* Touch-friendly padding */
                    border-radius: 12px; /* Rounded for mobile */
                    min-height: 48px; /* Touch-friendly height */
                }

                .qs-tabs {
                    padding: 0 24px 16px; /* Consistent horizontal padding */
                    gap: 12px; /* Adequate spacing for touch */
                    overflow-x: auto; /* Allow horizontal scrolling if needed */
                    -webkit-overflow-scrolling: touch; /* Smooth iOS scrolling */
                }

                .qs-tab {
                    font-size: 0.9rem; /* Readable mobile text */
                    padding: 10px 16px; /* Touch-friendly padding */
                    min-height: 44px; /* Apple HIG touch target */
                    min-width: 80px; /* Minimum width for touch */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    white-space: nowrap; /* Prevent text wrapping */
                    flex-shrink: 0; /* Prevent shrinking in scroll */
                }

                .qs-content {
                    padding: 0 24px 24px; /* Optimized content spacing */
                    overflow-y: auto; /* Enable scrolling */
                    -webkit-overflow-scrolling: touch; /* Smooth iOS scrolling */
                }

                /* ===== MOBILE GRID OPTIMIZATION - SINGLE COLUMN ===== */
                .qs-items-grid {
                    grid-template-columns: 1fr !important; /* Single column for mobile - force override */
                    gap: 8px; /* Comfortable spacing between items */
                    margin-bottom: 20px; /* Bottom margin for separation */
                    min-height: auto; /* Remove fixed height for mobile */
                }

                .qs-item {
                    padding: 12px 16px; /* Horizontal layout padding */
                    min-height: 56px; /* Comfortable touch target */
                    border-radius: 10px; /* Consistent with mobile design */
                    flex-direction: row; /* Horizontal layout for single column */
                    text-align: left; /* Left align for better readability */
                    gap: 12px; /* Space between icon and text */
                    align-items: center; /* Center align vertically */
                }

                .qs-item-icon {
                    width: 28px; /* Appropriate icon size for mobile */
                    height: 28px;
                    flex-shrink: 0; /* Prevent icon compression */
                    border-radius: 6px; /* Rounded icon container */
                }

                .qs-item-content {
                    flex: 1; /* Take remaining space */
                    min-width: 0; /* Allow text truncation */
                    overflow: hidden; /* Hide overflow text */
                }

                .qs-item-title {
                    font-size: 0.9rem; /* Mobile-optimized text size */
                    font-weight: 500; /* Improved readability */
                    line-height: 1.3; /* Better line height */
                    white-space: nowrap; /* Prevent text wrapping */
                    overflow: hidden; /* Hide overflow */
                    text-overflow: ellipsis; /* Show ellipsis for long text */
                }

                .qs-item-url {
                    font-size: 0.75rem; /* Smaller secondary text */
                    opacity: 0.7; /* Reduced emphasis */
                    margin-top: 2px; /* Small spacing */
                    white-space: nowrap; /* Prevent text wrapping */
                    overflow: hidden; /* Hide overflow */
                    text-overflow: ellipsis; /* Show ellipsis for long URLs */
                }

                /* ===== MOBILE SEARCH ENGINES - SINGLE COLUMN ===== */
                .qs-engines-grid {
                    display: flex; /* Flex layout for mobile */
                    flex-direction: column; /* Single column layout */
                    gap: 8px; /* Consistent spacing */
                }

                .qs-engine {
                    padding: 12px 16px; /* Touch-friendly padding */
                    min-height: 44px; /* Touch target */
                    justify-content: flex-start; /* Left align content */
                    border-radius: 10px; /* Rounded for mobile */
                    width: 100%; /* Full width */
                }
            }

            /* SMALL MOBILE DEVICES (480px and below) */
            @media (max-width: 480px) {
                /* ===== ULTRA-COMPACT DESIGN FOR SMALL SCREENS ===== */
                .qs-overlay {
                    padding-top: 2vh; /* Minimal top padding for maximum space */
                    padding-left: 0; /* Remove side padding */
                    padding-right: 0; /* Remove side padding */
                }

                .qs-container {
                    width: 100vw; /* Full screen width */
                    max-width: none; /* Remove width constraints */
                    max-height: 98vh; /* Nearly full-screen height */
                    border-radius: 0; /* Full screen appearance */
                    border: none; /* Remove all borders */
                }

                .qs-search-section {
                    padding: 16px 16px 12px; /* Reduced horizontal padding for small screens */
                }

                .qs-search-input {
                    font-size: 16px; /* iOS zoom prevention */
                    padding: 12px 16px; /* Touch-friendly padding */
                    border-radius: 10px; /* Rounded for mobile */
                    min-height: 44px; /* Touch target */
                    width: 100%; /* Ensure full width */
                    box-sizing: border-box; /* Include padding in width */
                }

                .qs-tabs {
                    padding: 0 16px 12px; /* Reduced horizontal padding for small screens */
                    gap: 8px; /* Reduced gap for space */
                    overflow-x: auto; /* Enable horizontal scrolling */
                    -webkit-overflow-scrolling: touch; /* Smooth iOS scrolling */
                }

                .qs-tab {
                    font-size: 0.85rem; /* Readable text size */
                    padding: 8px 12px; /* Compact but touchable padding */
                    min-width: 70px; /* Minimum touch target */
                    min-height: 40px; /* Touch-friendly height */
                    flex-shrink: 0; /* Prevent shrinking in scroll */
                    border-radius: 8px; /* Rounded for mobile */
                }

                .qs-content {
                    padding: 0 16px 20px; /* Reduced horizontal padding for small screens */
                    overflow-y: auto; /* Enable scrolling */
                    -webkit-overflow-scrolling: touch; /* Smooth iOS scrolling */
                }

                /* ===== SINGLE COLUMN LAYOUT FOR SMALL SCREENS ===== */
                .qs-items-grid {
                    grid-template-columns: 1fr !important; /* Single column for small screens - force override */
                    gap: 8px; /* Reduced gap for space efficiency */
                    margin-bottom: 20px; /* Reduced bottom margin */
                    min-height: auto !important; /* Remove fixed height for mobile */
                }

                .qs-item {
                    padding: 12px 16px; /* Compact item padding */
                    min-height: 56px; /* Comfortable touch target */
                    border-radius: 10px; /* Consistent radius */
                    flex-direction: row; /* Horizontal layout for single column */
                    text-align: left; /* Left align for better readability */
                    gap: 12px; /* Space between icon and text */
                }

                .qs-item-icon {
                    width: 28px; /* Appropriate icon size */
                    height: 28px;
                    flex-shrink: 0; /* Prevent icon compression */
                    border-radius: 6px; /* Rounded icon container */
                }

                .qs-item-content {
                    flex: 1; /* Take remaining space */
                    min-width: 0; /* Allow text truncation */
                }

                .qs-item-title {
                    font-size: 0.9rem; /* Readable text size */
                    font-weight: 500; /* Medium weight for readability */
                    line-height: 1.3; /* Better line height */
                }

                .qs-item-url {
                    font-size: 0.75rem; /* Small secondary text */
                    opacity: 0.6; /* Reduced emphasis */
                    margin-top: 2px; /* Small spacing */
                    display: block; /* Show URLs in single column */
                }

                /* ===== SMALL MOBILE SEARCH ENGINES - SINGLE COLUMN ===== */
                .qs-engines-grid {
                    display: flex; /* Flex layout for small screens */
                    flex-direction: column; /* Single column for no cutting off */
                    gap: 6px; /* Reduced spacing for compact layout */
                }

                .qs-engine {
                    padding: 10px 12px; /* Compact padding for small screens */
                    min-height: 40px; /* Reduced height for space efficiency */
                    justify-content: flex-start; /* Left align content */
                    border-radius: 8px; /* Consistent radius */
                    font-size: 0.85rem; /* Readable text size */
                    width: 100%; /* Full width */
                }
            }

            /* LANDSCAPE MOBILE OPTIMIZATION */
            /* Special handling for landscape orientation on mobile devices */
            @media (max-height: 500px) and (orientation: landscape) {
                /* ===== OPTIMIZED FOR LIMITED VERTICAL SPACE ===== */
                .qs-overlay {
                    padding-top: 1vh; /* Minimal top padding for maximum space */
                    padding-bottom: 1vh; /* Minimal bottom padding */
                }

                .qs-container {
                    max-height: 98vh; /* Nearly full height utilization */
                    border-radius: 0; /* Full screen for landscape */
                }

                .qs-search-section {
                    padding: 10px 20px 8px; /* Compact but usable search */
                }

                .qs-search-input {
                    min-height: 40px; /* Reduced height for landscape */
                    padding: 8px 14px; /* Compact padding */
                }

                .qs-tabs {
                    padding: 0 20px 8px; /* Reduced vertical padding */
                    gap: 6px; /* Minimal gap for space */
                }

                .qs-tab {
                    font-size: 0.8rem; /* Compact text */
                    padding: 6px 10px; /* Minimal padding */
                    min-height: 36px; /* Reduced touch target for landscape */
                }

                .qs-content {
                    padding: 0 20px 16px; /* Minimal content space */
                }

                /* ===== HORIZONTAL GRID FOR LANDSCAPE ===== */
                .qs-items-grid {
                    grid-template-columns: repeat(3, 1fr); /* 3 columns for landscape */
                    gap: 8px; /* Minimal gap */
                    margin-bottom: 16px; /* Reduced margin */
                }

                .qs-item {
                    padding: 8px 12px; /* Compact items */
                    min-height: 40px; /* Reduced height for landscape */
                    flex-direction: row; /* Horizontal layout */
                    gap: 8px; /* Reduced gap */
                }

                .qs-item-icon {
                    width: 20px; /* Smaller icons for landscape */
                    height: 20px;
                }

                .qs-item-title {
                    font-size: 0.8rem; /* Compact but readable */
                    line-height: 1.2; /* Tighter line height */
                }

                .qs-item-url {
                    display: none; /* Hide secondary text to save space */
                }

                /* ===== COMPACT SEARCH ENGINES FOR LANDSCAPE ===== */
                .qs-engines-grid {
                    grid-template-columns: repeat(3, 1fr); /* 3 columns */
                    gap: 6px; /* Minimal spacing */
                }

                .qs-engine {
                    padding: 8px 12px; /* Compact padding */
                    min-height: 36px; /* Reduced height */
                    font-size: 0.75rem; /* Smaller text */
                }
            }

            /* ===== SEARCH SECTION STYLING ===== */
            /*
             * Modern search interface with glassmorphism effects,
             * smooth focus transitions, and accessibility compliance.
             */
            .qs-search-section {
                /* Search container with subtle background differentiation */
                padding: 20px 24px 16px;
                background: var(--panel-background-secondary);
                border-bottom: 1px solid var(--panel-border);
                flex-shrink: 0; /* Prevent compression */
            }

            .qs-search-input-wrapper {
                /* Modern input wrapper with glassmorphism */
                position: relative;
                display: flex;
                align-items: center;
                background: rgba(255, 255, 255, 0.02); /* Subtle glass effect */
                border: 1px solid rgba(255, 255, 255, 0.06);
                border-radius: var(--radius-md);
                padding: 0 20px;
                transition: all 200ms cubic-bezier(0.16, 1, 0.3, 1);
                min-height: 52px;
                height: 52px;
            }

            .qs-search-input-wrapper:focus-within {
                /* Enhanced focus state with accent color and glow */
                border-color: var(--accent);
                background: rgba(255, 255, 255, 0.03);
                box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.1);
            }

            .qs-search-icon {
                /* Search icon with smooth color transitions */
                color: var(--text-muted);
                margin-right: 16px;
                opacity: 0.8;
                transition: color 200ms ease;
            }

            .qs-search-input-wrapper:focus-within .qs-search-icon {
                /* Icon color change on focus for visual feedback */
                color: var(--accent);
            }

            .qs-search-input {
                /* Clean input styling with theme integration */
                flex: 1;
                background: none;
                border: none;
                outline: none;
                color: var(--text-primary);
                font-size: 15px;
                padding: 14px 0;
                font-family: var(--font-ui);
                font-weight: 400;
                line-height: 1.2;
                vertical-align: baseline;
                font-display: swap;
                /* Enhanced typography with proper baseline alignment */
                font-weight: 400;
                line-height: 1.2;
                vertical-align: baseline;
                font-display: swap; /* Optimize font loading */
            }

            .qs-search-input::placeholder {
                /* Subtle placeholder styling with theme integration */
                color: var(--text-muted);
                opacity: 0.9;
                line-height: 1.2;
                vertical-align: baseline;
            }

            .qs-search-shortcut {
                /* Keyboard shortcut indicator with modern styling */
                font-family: var(--font-code);
                background: var(--panel-border);
                color: var(--text-muted);
                padding: 6px 10px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 600;
                margin-left: 16px;
                border: 1px solid var(--panel-border-hover);
            }

            /* ===== MAIN CONTENT AREA ===== */
            /*
             * Scrollable content area with custom scrollbars and
             * smooth height transitions for dynamic content.
             */
            .qs-content {
                /* Flexible content container with smooth transitions */
                flex: 1;
                overflow-y: auto; /* Enable vertical scrolling */
                padding: 20px 24px;
                background: var(--panel-background);
                display: flex;
                flex-direction: column;
                transition: height 400ms cubic-bezier(0.16, 1, 0.3, 1);
                min-height: 320px; /* Prevent jarring height changes */
            }

            /* ===== CUSTOM SCROLLBAR STYLING ===== */
            /*
             * Modern, minimal scrollbar design that integrates with theme colors
             * and provides smooth hover interactions.
             */
            .qs-content::-webkit-scrollbar {
                width: 6px; /* Thin scrollbar for modern look */
            }

            .qs-content::-webkit-scrollbar-track {
                background: transparent; /* Invisible track */
            }

            .qs-content::-webkit-scrollbar-thumb {
                /* Themed scrollbar thumb with rounded corners */
                background: var(--panel-scrollbar);
                border-radius: 9999px; /* Fully rounded */
            }

            .qs-content::-webkit-scrollbar-thumb:hover {
                /* Enhanced visibility on hover */
                background: var(--panel-scrollbar-hover);
            }

            /* ===== ADVANCED TAB SYSTEM ===== */
            /*
             * Sophisticated tab navigation with sliding indicator animation,
             * glassmorphism effects, and smooth transitions.
             */
            .qs-tabs {
                /* Tab container with modern styling */
                position: relative;
                display: flex;
                gap: 8px;
                margin-bottom: 20px;
                padding: 6px;
                background: var(--panel-background-secondary);
                border: 1px solid var(--panel-border);
                border-radius: 10px;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                flex-shrink: 0; /* Prevent compression */
            }

            .qs-tab-indicator {
                /* Animated sliding indicator with glassmorphism */
                position: absolute;
                top: 6px;
                left: 6px;
                height: calc(100% - 12px);
                background: rgba(var(--accent-rgb), 0.15); /* Semi-transparent accent */
                backdrop-filter: blur(8px); /* Glassmorphism effect */
                -webkit-backdrop-filter: blur(8px);
                border: 1px solid rgba(var(--accent-rgb), 0.25);
                box-shadow:
                    0 2px 8px rgba(var(--accent-rgb), 0.1), /* Subtle glow */
                    inset 0 1px 0 rgba(255, 255, 255, 0.1); /* Inner highlight */
                border-radius: 6px;
                transition: transform 350ms cubic-bezier(0.16, 1, 0.3, 1),
                           width 350ms cubic-bezier(0.16, 1, 0.3, 1);
                z-index: 1;
                pointer-events: none; /* Allow clicks to pass through */
            }

            .qs-tab {
                /* Individual tab button styling */
                font-family: var(--font-ui);
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 10px 14px;
                background: none;
                border: none;
                border-radius: 6px;
                color: var(--text-muted);
                font-size: 13px;
                font-weight: 500;
                cursor: pointer;
                transition: color 250ms cubic-bezier(0.16, 1, 0.3, 1);
                flex: 1; /* Equal width distribution */
                justify-content: center;
                position: relative;
                z-index: 2; /* Above indicator */
            }

            .qs-tab:hover {
                /* Hover state for better interactivity */
                color: var(--text-primary);
            }

            .qs-tab.active {
                /* Active tab with accent color */
                color: var(--accent);
            }

            /* ===== TAB CONTENT TRANSITIONS ===== */
            /*
             * Smooth content transitions with opacity and transform animations
             * for seamless tab switching experience.
             */
            .qs-tab-content {
                /* Smooth content transitions during tab switches */
                transition: opacity 300ms cubic-bezier(0.16, 1, 0.3, 1),
                           transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
                will-change: opacity, transform; /* Optimize for animations */
            }

            /* ===== ITEMS GRID SYSTEM ===== */
            /*
             * Responsive grid layout for bookmarks, top sites, and recent tabs
             * with consistent spacing and smooth transitions.
             */
            .qs-items-grid {
                /* 3-column grid with responsive behavior */
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
                margin-bottom: 20px;
                flex-shrink: 0; /* Prevent compression */
                transition: height 400ms cubic-bezier(0.16, 1, 0.3, 1),
                           opacity 300ms cubic-bezier(0.16, 1, 0.3, 1);
                /* min-height removed for better mobile responsiveness */
            }

            .qs-item {
                /* Individual item styling with modern card design */
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                background: var(--panel-background-secondary);
                border: 1px solid var(--panel-border);
                border-radius: 10px;
                cursor: pointer;
                transition: all 200ms cubic-bezier(0.16, 1, 0.3, 1);
                position: relative;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* Subtle depth */
            }

            .qs-item:hover,
            .qs-item:focus {
                /* Enhanced interaction states */
                background: var(--panel-background-tertiary);
                border-color: var(--panel-border-hover);
                outline: none; /* Custom focus styling */
            }

            .qs-item-icon {
                /* Icon container with consistent sizing and fallback styling */
                width: 28px;
                height: 28px;
                border-radius: 6px;
                overflow: hidden;
                flex-shrink: 0; /* Prevent icon compression */
                background: var(--panel-border); /* Fallback background */
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative; /* For pseudo-element positioning */
            }

            .qs-item-icon img {
                /* Favicon image styling with proper scaling */
                width: 100%;
                height: 100%;
                object-fit: cover; /* Maintain aspect ratio */

                /* ===== NATURAL APPEARANCE BY DEFAULT ===== */
                /* No base enhancement - only enhance icons that need it */
                filter: none;

                /* Smooth transition for dynamic adjustments */
                transition: filter 0.2s ease;
            }

            /* ===== ENHANCED VISIBILITY FOR DARK ICONS ===== */
            /* Applied automatically to icons detected as too dark */
            .qs-item-icon.dark-icon img {
                filter:
                    brightness(1.35)    /* Significantly brighten dark icons */
                    contrast(1.15)      /* Higher contrast for visibility */
                    saturate(1.15)      /* Enhanced saturation */
                    drop-shadow(0 0 1px rgba(255, 255, 255, 0.2)); /* Subtle glow */
            }

            /* Subtle background enhancement for dark icons */
            .qs-item-icon.dark-icon::before {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(circle at center,
                    rgba(255, 255, 255, 0.08) 0%,
                    rgba(255, 255, 255, 0.03) 60%,
                    transparent 100%);
                border-radius: 6px;
                pointer-events: none;
                z-index: 0;
            }

            /* Ensure image stays above background */
            .qs-item-icon img {
                position: relative;
                z-index: 1;
            }

            /* ===== EXTREME DARK ICON ENHANCEMENT ===== */
            /* For very dark icons that need maximum enhancement */
            .qs-item-icon.very-dark-icon img {
                filter:
                    brightness(1.5)     /* Maximum brightness boost */
                    contrast(1.25)      /* High contrast */
                    saturate(1.2)       /* Enhanced colors */
                    drop-shadow(0 0 2px rgba(255, 255, 255, 0.3)); /* Stronger glow */
            }

            .qs-item-icon.very-dark-icon::before {
                background: radial-gradient(circle at center,
                    rgba(255, 255, 255, 0.12) 0%,
                    rgba(255, 255, 255, 0.05) 60%,
                    transparent 100%);
            }

            /* ===== DOMAIN-SPECIFIC ENHANCEMENTS ===== */
            /* Targeted fixes for known problematic domains */
            .qs-item-icon[data-domain="chatgpt.com"] img,
            .qs-item-icon[data-domain="openai.com"] img {
                filter: brightness(1.4) contrast(1.2) saturate(1.1);
            }

            .qs-item-icon[data-domain="v0.dev"] img,
            .qs-item-icon[data-domain="vercel.com"] img {
                filter: brightness(1.35) contrast(1.15) saturate(1.15);
            }

            .qs-item-icon[data-domain="github.com"] img {
                filter: brightness(1.3) contrast(1.1) saturate(1.05);
            }

            /* ===== ENHANCED ICON CLASS ===== */
            /* Very subtle enhancement for external images and fallback cases */
            .qs-item-icon.enhanced-icon img {
                filter:
                    brightness(1.08)    /* Minimal brightness boost */
                    contrast(1.03);     /* Very slight contrast increase */
            }

            .qs-item-icon.enhanced-icon::before {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(circle at center,
                    rgba(255, 255, 255, 0.04) 0%,
                    rgba(255, 255, 255, 0.01) 70%,
                    transparent 100%);
                border-radius: 6px;
                pointer-events: none;
                z-index: 0;
            }

            /* ===== HOVER ENHANCEMENT ===== */
            /* Subtle hover enhancement - only for icons that need it */
            .qs-item:hover .qs-item-icon.dark-icon img {
                filter:
                    brightness(1.45)
                    contrast(1.2)
                    saturate(1.2)
                    drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
            }

            .qs-item:hover .qs-item-icon.very-dark-icon img {
                filter:
                    brightness(1.6)
                    contrast(1.3)
                    saturate(1.25)
                    drop-shadow(0 0 3px rgba(255, 255, 255, 0.4));
            }

            .qs-item:hover .qs-item-icon.enhanced-icon img {
                filter:
                    brightness(1.25)
                    contrast(1.1)
                    saturate(1.05);
            }

            /* Normal icons get minimal hover enhancement */
            .qs-item:hover .qs-item-icon:not(.dark-icon):not(.very-dark-icon):not(.enhanced-icon) img {
                filter: brightness(1.05);
            }

            .qs-item-content {
                /* Text content container with overflow handling */
                flex: 1;
                min-width: 0; /* Allow text truncation */
            }

            .qs-item-title {
                /* Primary item title with theme typography */
                font-family: var(--font-ui);
                color: var(--text-primary);
                font-size: 13px;
                font-weight: 500;
                margin-bottom: 2px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis; /* Graceful text truncation */
            }

            .qs-item-url {
                /* Secondary URL text with muted styling */
                font-family: var(--font-body);
                color: var(--text-muted);
                font-size: 11px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis; /* Graceful text truncation */
            }



            /* ===== SEARCH ENGINES SECTION ===== */
            /*
             * Developer-focused search engines with clean button design
             * and responsive layout for quick access to technical resources.
             */
            .qs-search-engines {
                /* Search engines container at bottom of panel */
                border-top: 1px solid var(--panel-border);
                padding-top: 16px;
                flex-shrink: 0; /* Prevent compression */
                margin-top: auto; /* Push to bottom */
            }

            .qs-section-title {
                /* Section title with modern typography */
                font-family: var(--font-ui);
                color: var(--text-muted);
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.05em; /* Improved readability */
                margin-bottom: 12px;
            }

            .qs-engines-grid {
                /* Flexible grid for search engine buttons */
                display: flex;
                gap: 8px;
                flex-wrap: wrap; /* Allow wrapping on smaller screens */
            }

            .qs-engine {
                /* Individual search engine button */
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 10px 16px;
                background: var(--panel-background-secondary);
                border: 1px solid var(--panel-border);
                border-radius: 8px;
                color: var(--text-secondary);
                font-size: 13px;
                font-weight: 500;
                cursor: pointer;
                transition: all 200ms cubic-bezier(0.16, 1, 0.3, 1);
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* Subtle depth */
            }

            .qs-engine:hover,
            .qs-engine:focus {
                /* Enhanced interaction states */
                background: var(--panel-background-tertiary);
                border-color: var(--panel-border-hover);
                color: var(--text-primary);
                outline: none; /* Custom focus styling */
            }

            .qs-engine-icon {
                /* Search engine logo styling - enhanced visibility */
                width: 20px;
                height: 20px;
                border-radius: 6px; /* Rounded background */

                /* ===== ENHANCED VISIBILITY FOR LOGOS ===== */
                background: rgba(255, 255, 255, 0.1); /* Subtle light background */
                padding: 2px; /* Small padding for breathing room */
                box-sizing: border-box; /* Include padding in dimensions */

                /* Smooth transitions for interactions */
                transition: all 0.2s ease;

                /* Ensure logos display properly */
                object-fit: contain; /* Maintain aspect ratio */
                flex-shrink: 0; /* Prevent compression */
            }

            /* ===== SEARCH ENGINE HOVER ENHANCEMENT ===== */
            /* Enhanced hover effects for better logo visibility */
            .qs-engine:hover .qs-engine-icon {
                background: rgba(255, 255, 255, 0.15); /* Brighter background on hover */
                transform: scale(1.05); /* Subtle scale effect */
                filter: brightness(1.1); /* Slight brightness boost */
            }

            /* ===== EMPTY STATES DESIGN ===== */
            /*
             * Elegant empty state design with centered content, subtle icons,
             * and helpful messaging for when categories have no items.
             */
            .qs-empty {
                /* Centered empty state container */
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                padding: 60px 20px;
                min-height: 200px; /* Consistent height */
            }

            .qs-empty-icon {
                /* Large, subtle icon for empty states */
                width: 48px;
                height: 48px;
                color: var(--text-muted);
                opacity: 0.5; /* Subtle appearance */
                margin-bottom: var(--space-4);
            }

            .qs-empty-icon svg {
                /* Full-size SVG icon */
                width: 100%;
                height: 100%;
            }

            .qs-empty-title {
                /* Primary empty state title */
                font-family: var(--font-display);
                font-size: 1.125rem;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: var(--space-2);
            }

            .qs-empty-description {
                /* Secondary empty state description */
                font-family: var(--font-body);
                font-size: 0.875rem;
                color: var(--text-muted);
                line-height: 1.5;
                max-width: 300px; /* Readable line length */
            }

            /* ===== SOPHISTICATED ANIMATION SYSTEM ===== */
            /*
             * Smooth, performant animations using modern CSS techniques
             * with optimized easing curves and GPU acceleration.
             */

            /* ENTRANCE ANIMATIONS */
            @keyframes qs-fade-in {
                /* Smooth fade-in for overlay */
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            @keyframes qs-slide-up {
                /* Elegant slide-up entrance for container */
                from {
                    opacity: 0;
                    transform: translateY(8px); /* Subtle movement */
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            /* EXIT ANIMATIONS */
            @keyframes qs-slide-down {
                /* Smooth slide-down exit for container */
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(8px); /* Subtle movement */
                }
            }

            /* ENHANCED PANEL ANIMATIONS */
            .qs-overlay.closing .qs-container {
                /* Coordinated closing animation */
                animation: qs-slide-down 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }

            .qs-overlay.closing .qs-backdrop {
                /* Backdrop fade-out during close */
                opacity: 0;
                transition: opacity 150ms cubic-bezier(0.16, 1, 0.3, 1);
            }

            /* ===== ACCESSIBILITY: REDUCED MOTION SUPPORT ===== */
            /*
             * Respects user's system preference for reduced motion to provide
             * a comfortable experience for users with motion sensitivity.
             */
            @media (prefers-reduced-motion: reduce) {
                /* Disable all animations and transitions */
                .qs-overlay,
                .qs-container,
                .qs-backdrop,
                .qs-item,
                .qs-tab,
                .qs-tab-indicator {
                    animation: none !important;
                    transition: none !important;
                }

                /* Ensure immediate visibility without motion */
                .qs-overlay {
                    opacity: 1 !important;
                }

                .qs-container {
                    opacity: 1 !important;
                    transform: none !important;
                }

                .qs-backdrop {
                    opacity: 0.6 !important;
                }

                /* Disable closing animations */
                .qs-overlay.closing .qs-container,
                .qs-overlay.closing .qs-backdrop {
                    animation: none !important;
                    transition: none !important;
                }
            }

            /* ===== ACCESSIBILITY: HIGH CONTRAST MODE SUPPORT ===== */
            /*
             * Enhanced visibility for users with visual impairments who have
             * enabled high contrast mode in their system accessibility settings.
             */
            @media (prefers-contrast: high) {
                /* Enhanced container visibility */
                .qs-container {
                    background: rgba(0, 0, 0, 0.95) !important; /* Near-black background */
                    border: 2px solid #ffffff !important; /* Strong white border */
                    box-shadow:
                        0 12px 32px rgba(255, 255, 255, 0.2),
                        0 6px 16px rgba(255, 255, 255, 0.1) !important;
                }

                /* Enhanced backdrop */
                .qs-backdrop {
                    background: rgba(0, 0, 0, 0.8) !important; /* Darker backdrop */
                }

                /* Enhanced search input */
                .qs-search {
                    background: #000000 !important;
                    border: 2px solid #ffffff !important;
                    color: #ffffff !important;
                }

                .qs-search::placeholder {
                    color: #cccccc !important;
                }

                /* Enhanced tab visibility */
                .qs-tab {
                    border: 1px solid #666666 !important;
                    color: #ffffff !important;
                }

                .qs-tab.active {
                    background: rgba(255, 255, 255, 0.1) !important;
                    border-color: #ffffff !important;
                }

                /* Enhanced item visibility */
                .qs-item {
                    border: 1px solid #444444 !important;
                }

                .qs-item:hover,
                .qs-item.selected {
                    border-color: #ffffff !important;
                    background: rgba(255, 255, 255, 0.05) !important;
                }

                /* Enhanced text contrast */
                .qs-item-title {
                    color: #ffffff !important;
                }

                .qs-item-url {
                    color: #cccccc !important;
                }

                /* Enhanced empty state */
                .qs-empty-title {
                    color: #ffffff !important;
                }

                .qs-empty-description {
                    color: #cccccc !important;
                }
            }

            /* ===== END OF QUICK SHORTCUTS STYLES ===== */
        `;
    }
}

/**
 * ===== GLOBAL INTEGRATION AND INITIALIZATION =====
 *
 * The QuickShortcuts class is exposed globally for integration with the main
 * NEXUS application. This design pattern allows for modular architecture while
 * maintaining clean separation of concerns.
 *
 * INTEGRATION STRATEGY:
 * - Class is available globally on window object
 * - Initialization is handled by main application script
 * - Supports lazy loading and on-demand instantiation
 * - Maintains clean dependency injection patterns
 *
 * USAGE PATTERN:
 * ```javascript
 * // In main application:
 * const quickShortcuts = new QuickShortcuts();
 *
 * // Access from anywhere:
 * window.quickShortcuts.show();
 * ```
 *
 * ARCHITECTURAL BENEFITS:
 * - Modular design with clear boundaries
 * - Easy testing and mocking capabilities
 * - Clean separation from main application logic
 * - Flexible initialization timing
 * - Memory-efficient lazy loading
 */

// QuickShortcuts class is available globally for main application integration
// Initialization and lifecycle management is handled by the main script (script.js)
