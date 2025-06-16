# API Reference

This document provides a comprehensive reference for NEXUS's internal APIs, modules, and extension points.

## 🏗️ Core Application API

### Nexus Class
The main application class that orchestrates all functionality.

```javascript
class Nexus {
    constructor()
    async init()
    updateClock()
    updateSmartDateFeatures()
    updateTheme()
    // ... other methods
}
```

#### Key Methods

##### `init()`
**Purpose**: Initialize the entire NEXUS application  
**Returns**: `Promise<void>`  
**Usage**: Called automatically on page load  

```javascript
const nexus = new Nexus();
await nexus.init();
```

##### `updateSettings(newSettings)`
**Purpose**: Update application settings and persist to storage  
**Parameters**: 
- `newSettings` (Object) - Partial settings object to merge
**Returns**: `Promise<void>`

```javascript
await nexus.updateSettings({
    colorTheme: 'purple',
    timeFormat: '24h'
});
```

##### `updateTheme()`
**Purpose**: Apply current theme to the interface  
**Returns**: `void`  
**Side Effects**: Updates CSS custom properties

## 🚀 Quick Shortcuts API

### QuickShortcuts Class
Manages the AI-powered shortcuts panel with machine learning predictions.

```javascript
class QuickShortcuts {
    constructor(nexus)
    async init()
    async show()
    hide()
    async loadData()
    // ... other methods
}
```

#### Key Methods

##### `show()`
**Purpose**: Display the shortcuts panel with AI predictions  
**Returns**: `Promise<void>`  
**Side Effects**: Loads data, applies AI predictions, shows UI

```javascript
const shortcuts = new QuickShortcuts(nexusInstance);
await shortcuts.show();
```

##### `loadData()`
**Purpose**: Load all data sources (bookmarks, top sites, recent tabs)  
**Returns**: `Promise<void>`  
**Data Sources**: Bookmarks, Top Sites, Recent Tabs, Search Engines

##### `getPredictedTab()`
**Purpose**: Get AI prediction for preferred tab type  
**Returns**: `string` - Tab type ('bookmarks', 'topsites', 'recent', 'search')  
**Algorithm**: Uses TabMemory system with confidence scoring

## 🧠 Tab Memory API

### TabMemory Class
Machine learning system for user behavior prediction.

```javascript
class TabMemory {
    constructor()
    recordInteraction(tabType, timestamp)
    getPredictedTab()
    getConfidenceScore()
    // ... other methods
}
```

#### Key Methods

##### `recordInteraction(tabType, timestamp)`
**Purpose**: Record user interaction for learning  
**Parameters**:
- `tabType` (string) - Type of tab clicked
- `timestamp` (number) - Interaction timestamp
**Returns**: `void`

##### `getPredictedTab()`
**Purpose**: Get predicted tab type based on learned patterns  
**Returns**: `string` - Predicted tab type  
**Algorithm**: Confidence scoring with 0.42 threshold

##### `getAnalytics()`
**Purpose**: Get analytics data for debugging  
**Returns**: `Object` - Analytics data including confidence scores

## 💾 Cache Manager API

### CacheManager Class
High-performance IndexedDB caching system.

```javascript
class CacheManager {
    constructor()
    async init()
    async getFavicon(url)
    async cacheFavicon(url, faviconData)
    async cleanup()
    // ... other methods
}
```

#### Key Methods

##### `getFavicon(url)`
**Purpose**: Get cached favicon or fetch if not available  
**Parameters**: 
- `url` (string) - Website URL
**Returns**: `Promise<string>` - Favicon data URL or generated icon

##### `cacheFavicon(url, faviconData)`
**Purpose**: Store favicon in cache  
**Parameters**:
- `url` (string) - Website URL  
- `faviconData` (string) - Favicon data URL
**Returns**: `Promise<void>`

##### `getStorageUsage()`
**Purpose**: Get current cache storage usage  
**Returns**: `Promise<Object>` - Usage statistics

```javascript
const usage = await cacheManager.getStorageUsage();
// Returns: { used: 25000000, quota: 45000000, percentage: 55.6 }
```

## 🔔 Notification System API

### NotificationSystem Class
User feedback and notification management.

```javascript
class NotificationSystem {
    constructor()
    show(type, title, message, duration)
    hide(notificationId)
    clear()
    // ... other methods
}
```

#### Key Methods

##### `show(type, title, message, duration)`
**Purpose**: Display notification to user  
**Parameters**:
- `type` (string) - 'success', 'error', 'warning', 'info'
- `title` (string) - Notification title
- `message` (string) - Notification message  
- `duration` (number) - Auto-hide duration in ms
**Returns**: `string` - Notification ID

```javascript
const id = notificationSystem.show(
    'success', 
    'Settings Saved', 
    'Your preferences have been updated',
    3000
);
```

## 🎨 Theme System API

### Theme Configuration
Theme system uses CSS custom properties for dynamic theming.

#### Available Themes
```javascript
const colorThemes = [
    'blue', 'purple', 'green', 'orange', 
    'pink', 'red', 'cyan', 'yellow', 'indigo'
];

const typographyThemes = [
    'classic-pro',      // Inter + SF Mono
    'modern-tech',      // Geist + JetBrains Mono
    'creative-designer', // Satoshi + Cascadia Code
    'apple-ecosystem',  // SF Pro + SF Mono
    'microsoft-modern'  // Segoe UI + Cascadia Code
];
```

#### Theme Variables
```css
:root {
    --accent-color: #3b82f6;
    --accent-hover: #2563eb;
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
    --background-primary: #ffffff;
    --background-secondary: #f9fafb;
    /* ... other variables */
}
```

## 📊 Settings API

### Settings Schema
Complete settings object structure:

```javascript
const defaultSettings = {
    // Display settings
    timeFormat: '12h',           // '12h' | '24h'
    showSeconds: false,          // boolean
    gridBackground: true,        // boolean
    smoothAnimations: true,      // boolean
    
    // Appearance settings
    clockFont: 'JetBrains Mono', // string
    colorTheme: 'blue',          // string
    typographyTheme: 'classic-pro', // string
    
    // Feature settings
    smartDateFeatures: true,     // boolean
    selectedSmartDateFeatures: [ // array of strings
        'week-number',
        'year-progress', 
        'weekend-status'
    ],
    focusTimer: false,           // boolean
    quickNotes: false            // boolean
};
```

### Settings Validation
```javascript
function validateSettings(settings) {
    // Validates settings object structure
    // Returns: { valid: boolean, errors: string[] }
}
```

## 🌐 Cross-Browser API

### Browser Detection
```javascript
// Unified API access
const api = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;

// Feature detection
if (api?.storage?.sync) {
    // Modern API available
} else {
    // Use fallback strategy
}
```

### Storage API Abstraction
```javascript
class StorageManager {
    async get(keys)
    async set(data)
    async remove(keys)
    async clear()
    // Handles both chrome.storage and browser.storage
}
```

## 🔧 Utility Functions

### Date Utilities
```javascript
// Smart date calculations
function getWeekNumber(date)        // ISO week number
function getYearProgress(date)      // Year completion %
function getQuarterProgress(date)   // Quarter completion %
function getMoonPhase(date)         // Lunar phase
function getSeason(date)            // Current season
```

### Performance Utilities
```javascript
function debounce(func, delay)      // Debounce function calls
function throttle(func, limit)      // Throttle function calls
function memoize(func)              // Memoize expensive calculations
```

### DOM Utilities
```javascript
function createElement(tag, props, children)  // Create DOM elements
function addClass(element, className)         // Add CSS class
function removeClass(element, className)      // Remove CSS class
function toggleClass(element, className)      // Toggle CSS class
```

## 📈 Performance Monitoring

### Performance Metrics
```javascript
// Built-in performance tracking
const metrics = {
    loadTime: performance.now(),
    memoryUsage: performance.memory?.usedJSHeapSize,
    cacheSize: await cacheManager.getStorageUsage(),
    renderTime: performance.getEntriesByType('measure')
};
```

### Debug API
```javascript
// Debug utilities (development only)
window.NEXUS_DEBUG = {
    getSettings: () => nexus.settings,
    getCacheStats: () => cacheManager.getStats(),
    getTabMemory: () => tabMemory.getAnalytics(),
    clearCache: () => cacheManager.clear(),
    resetSettings: () => nexus.resetToDefaults()
};
```

## 🔒 Security Considerations

### Content Security Policy
```javascript
// CSP-compliant code patterns
// No eval() or Function() constructors
// No inline event handlers
// No external script loading
```

### Data Sanitization
```javascript
function sanitizeInput(input) {
    // Sanitizes user input for safe DOM insertion
    return DOMPurify.sanitize(input);
}
```

## 📝 Extension Points

### Adding New Smart Date Features
```javascript
// Register new smart date feature
nexus.registerSmartDateFeature({
    id: 'custom-feature',
    name: 'Custom Feature',
    description: 'Custom date insight',
    calculate: (date) => {
        // Return calculated value
        return 'Custom: ' + date.getDate();
    }
});
```

### Adding New Themes
```javascript
// Register new color theme
nexus.registerColorTheme({
    id: 'custom-theme',
    name: 'Custom Theme',
    variables: {
        '--accent-color': '#custom-color',
        // ... other CSS variables
    }
});
```

---

This API reference covers the main interfaces for extending and integrating with NEXUS. For implementation details, see the source code and [Architecture Guide](architecture.md).
