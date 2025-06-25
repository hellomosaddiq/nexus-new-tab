/**
 * ===== NEXUS PERFORMANCE-OPTIMIZED THEME INITIALIZATION =====
 *
 * Lightning-fast theme initialization script that executes before CSS loads
 * to prevent theme flash and ensure instant visual consistency. Implements
 * sophisticated dual storage strategy for optimal performance and reliability.
 *
 * PERFORMANCE OPTIMIZATION STRATEGY:
 * - Executes before CSS parsing to prevent FOUC (Flash of Unstyled Content)
 * - Synchronous localStorage access for instant theme application
 * - Asynchronous chrome.storage sync for persistence and cross-device sync
 * - Immediate DOM attribute application for CSS custom property activation
 *
 * DUAL STORAGE ARCHITECTURE:
 * - Primary: localStorage for instant synchronous access (no async delay)
 * - Secondary: chrome.storage.sync for persistence and cross-device sync
 * - Intelligent fallback chain: localStorage → chrome.storage → defaults
 * - Graceful degradation for storage unavailability scenarios
 *
 * VISUAL CONSISTENCY BENEFITS:
 * - Zero theme flash on page load (FOUC prevention)
 * - Instant theme application before CSS parsing
 * - Seamless user experience across page refreshes
 * - Consistent theming even with slow storage access
 *
 * TECHNICAL IMPLEMENTATION:
 * - IIFE pattern for clean global scope isolation
 * - Synchronous execution for immediate visual effect
 * - Asynchronous enhancement for future loads
 * - Comprehensive error boundaries with silent degradation
 *
 * @author mosaddiq
 * @version 1.0.0
 * @since 1.0.0
 * @performance Critical path optimization for zero visual flash
 */

/**
 * ===== IMMEDIATE THEME INITIALIZATION IIFE =====
 *
 * Self-executing function that runs immediately when script loads,
 * before CSS parsing, to ensure instant theme application.
 */
(function () {
    try {
        // ===== CROSS-BROWSER API DETECTION =====
        // Intelligent API selection for cross-browser compatibility
        const api = typeof browser !== 'undefined' && browser.runtime ? browser : chrome;

        // ===== DEFAULT THEME CONFIGURATION =====
        // Safe defaults for immediate application
        let colorTheme = 'blue'; // Professional blue theme as default

        // ===== SYNCHRONOUS LOCALSTORAGE ACCESS =====
        // Critical path: Synchronous access for instant theme application
        try {
            // Retrieve cached settings from localStorage for immediate access
            const savedSettings = localStorage.getItem('nexus-settings');
            if (savedSettings) {
                // Parse and extract theme settings with fallback validation
                const settings = JSON.parse(savedSettings);
                colorTheme = settings.colorTheme || 'blue'; // Theme color with fallback
            }
        } catch (e) {
            // ===== GRACEFUL JSON PARSING DEGRADATION =====
            // Silent failure - use safe defaults if localStorage is corrupted
            // This ensures the page loads even with corrupted storage data
        }

        // ===== IMMEDIATE DOM ATTRIBUTE APPLICATION =====
        // Critical performance optimization: Apply theme before CSS parsing
        document.documentElement.setAttribute('data-theme', colorTheme);

        /**
         * PERFORMANCE RATIONALE:
         * - These attributes activate CSS custom properties immediately
         * - Prevents FOUC (Flash of Unstyled Content) during page load
         * - Ensures consistent theming before main CSS finishes parsing
         * - Zero visual delay for theme application
         */

        // ===== ASYNCHRONOUS STORAGE SYNC ENHANCEMENT =====
        // Non-blocking enhancement for cross-device synchronization
        if (api?.storage?.sync) {
            /**
             * Asynchronous chrome.storage.sync access for enhanced functionality:
             * - Cross-device theme synchronization
             * - Persistent storage beyond localStorage
             * - Future load optimization
             * - Settings consistency across browser instances
             */
            api.storage.sync
                .get(['colorTheme'])
                .then(result => {
                    // ===== INTELLIGENT THEME UPDATE =====
                    // Only update if chrome.storage has different values than localStorage
                    if (result.colorTheme && result.colorTheme !== colorTheme) {
                        document.documentElement.setAttribute('data-theme', result.colorTheme);
                        // Update localStorage cache for future instant access
                        try {
                            const currentSettings = JSON.parse(
                                localStorage.getItem('nexus-settings') || '{}'
                            );
                            currentSettings.colorTheme = result.colorTheme;
                            localStorage.setItem('nexus-settings', JSON.stringify(currentSettings));
                        } catch (e) {
                            // Silent localStorage update failure
                        }
                    }
                })
                .catch(() => {
                    // ===== SILENT ASYNC FAILURE =====
                    // Silently fail - localStorage fallback is already applied
                    // This ensures the page works even if chrome.storage is unavailable
                });
        }
    } catch (e) {
        // ===== COMPREHENSIVE ERROR RECOVERY =====
        // Ultimate fallback: Apply safe defaults if everything fails
        document.documentElement.setAttribute('data-theme', 'blue');

        /**
         * ERROR HANDLING PHILOSOPHY:
         * - Silent failure is better than breaking the page
         * - Safe defaults ensure the extension always works
         * - User experience is prioritized over error reporting
         * - Graceful degradation maintains functionality
         */
    }
})();

/**
 * ===== THEME INITIALIZATION ARCHITECTURE SUMMARY =====
 *
 * This performance-critical script implements a sophisticated theme loading
 * strategy that ensures zero visual flash and optimal user experience.
 *
 * PERFORMANCE OPTIMIZATIONS:
 * - Pre-CSS execution prevents FOUC (Flash of Unstyled Content)
 * - Synchronous localStorage access for instant theme application
 * - Asynchronous chrome.storage enhancement for persistence
 * - Immediate DOM attribute application for CSS activation
 *
 * STORAGE STRATEGY:
 * - localStorage: Instant synchronous access for immediate theming
 * - chrome.storage.sync: Cross-device synchronization and persistence
 * - Intelligent fallback chain: localStorage → chrome.storage → defaults
 * - Automatic cache synchronization between storage layers
 *
 * ERROR RESILIENCE:
 * - Comprehensive try-catch blocks at every level
 * - Silent error handling for production stability
 * - Graceful degradation to safe defaults
 * - No single point of failure in the theme loading process
 *
 * INTEGRATION BENEFITS:
 * - Zero theme flash on page load
 * - Instant visual consistency across page refreshes
 * - Cross-device theme synchronization
 * - Bulletproof error handling for production reliability
 * - Minimal performance impact with maximum visual benefit
 *
 * TECHNICAL EXCELLENCE:
 * - IIFE pattern for clean global scope isolation
 * - Synchronous critical path with asynchronous enhancement
 * - Intelligent storage layer coordination
 * - Production-ready error boundaries
 */
