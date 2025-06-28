/**
 * NEXUS Background Script
 * Service worker for extension lifecycle and settings management
 *
 * @author mosaddiq
 * @version 1.0.0
 */

// Cross-browser polyfill loading
if (typeof importScripts !== 'undefined') {
    try {
        // Load WebExtensions polyfill for Firefox compatibility
        importScripts('../lib/browser-polyfill.js');
    } catch (e) {
        // Fallback to native chrome API if polyfill unavailable
    }
}

// Cross-browser API detection
const api = typeof browser !== 'undefined' && browser.runtime ? browser : chrome;

// Extension installation and default settings
api.runtime.onInstalled.addListener(async details => {
    if (details.reason === 'install') {
        try {
            // ===== PRIMARY STORAGE: SYNC STORAGE =====
            // Use sync storage for cross-device settings synchronization
            await api.storage.sync.set({
                // ===== TIME DISPLAY SETTINGS =====
                timeFormat24: false, // 12-hour format (most common)
                showSeconds: false, // Clean time display

                // ===== VISUAL APPEARANCE =====
                gridBackground: true, // Modern grid background
                smoothAnimations: true, // Smooth user experience
                colorTheme: 'blue', // Professional blue theme

                // ===== TYPOGRAPHY =====
                typographyTheme: 'classic-pro', // Inter + SF Mono (excellent readability)
                clockFont: 'JetBrains Mono', // Optimal monospace for time

                // ===== SMART FEATURES (OPTIMIZED FOR VALUE & MOTIVATION) =====
                smartDateFeatures: true, // Enable smart date with valuable insights
                selectedSmartDateFeatures: [
                    'week-number', // Week 51 - useful for planning & business context
                    'year-progress', // 98% - motivational & creates time awareness
                    'days-to-weekend' // 3d - universal motivation (everyone loves weekends!)
                ],

                // ===== PRODUCTIVITY FEATURES =====
                // Following 2024-2025 UX best practices: selective defaults for personality
                focusTimer: false, // Disabled by default - advanced feature
                quickNotes: false, // Disabled by default - advanced feature
                dailyQuotes: true, // Enabled by default - low cognitive load, shows personality
                todoList: false // Disabled by default - advanced feature
            });
        } catch (error) {
            // Fallback to local storage
            try {
                await api.storage.local.set({
                    // Essential settings with reduced feature set for local storage
                    timeFormat24: false,
                    showSeconds: false,
                    gridBackground: true,
                    smoothAnimations: true,
                    colorTheme: 'blue',
                    clockFont: 'JetBrains Mono',
                    smartDateFeatures: true,
                    focusTimer: false,
                    quickNotes: false
                });
            } catch (localError) {
                // Silent fail - extension will use hardcoded defaults
            }
        }
    }
});

// Extension icon click handler
if (api.action && api.action.onClicked) {
    api.action.onClicked.addListener(tab => {
        // Check if already on new tab
        const isNewTab =
            tab.url.includes('chrome://newtab/') || // Chrome new tab
            tab.url.includes('moz-extension://') || // Firefox extension pages
            tab.url.includes('safari-web-extension://') || // Safari extension pages
            tab.url.includes('extension://'); // Generic extension pages

        // Only create new tab if not already on one
        if (!isNewTab) {
            api.tabs.create({ url: 'chrome://newtab/' });
        }
        // If already on new tab, do nothing
    });
}

// Error handling for production stability
self.addEventListener('error', _event => {
    // Silent error handling for production stability
});

self.addEventListener('unhandledrejection', _event => {
    // Silent promise rejection handling
});
