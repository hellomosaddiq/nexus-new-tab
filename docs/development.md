# Development Guide

This guide will help you set up a development environment for NEXUS and understand the development workflow.

## 🚀 Quick Start

### Prerequisites
- **Chrome Browser** (version 88+) - Primary development target
- **Git** - For version control
- **Text Editor** - VS Code recommended with extensions:
  - JavaScript (ES6) code snippets
  - HTML CSS Support
  - Chrome Extension Development

### 1-Minute Setup
```bash
# Clone the repository
git clone https://github.com/hellomosaddiq/nexus-new-tab.git
cd nexus-new-tab

# Load in Chrome
# 1. Open chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the nexus-new-tab folder
# 5. Open new tab to see NEXUS
```

## 🛠️ Development Environment

### No Build Process Required
NEXUS is built with vanilla JavaScript and requires **no compilation, bundling, or build tools**. This makes development incredibly simple:

- **Edit any file** → **Reload extension** → **See changes**
- **No npm install** - No dependencies to manage
- **No webpack/babel** - Direct JavaScript execution
- **No compilation** - Instant feedback loop

### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "ms-vscode.vscode-json",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### Browser Setup
1. **Enable Developer Mode** in `chrome://extensions/`
2. **Pin NEXUS** to toolbar for easy access
3. **Open DevTools** with F12 for debugging
4. **Use Console** for error checking and debugging

## 📁 Project Structure Deep Dive

### Core Files
```
src/pages/newtab/
├── index.html          # Main UI structure (WCAG 2.1 AA)
├── script.js           # Core application logic (4,273 lines)
├── styles.css          # Complete design system
└── theme-init.js       # Performance-optimized theme loading
```

### Modular Architecture
```
src/modules/
├── cache-manager.js        # IndexedDB caching system
├── quick-shortcuts.js      # AI-powered shortcuts
├── tab-memory.js          # Machine learning system
└── notification-system.js # User feedback system
```

### Supporting Files
```
src/
├── background/
│   └── background.js      # Service worker
├── lib/
│   └── browser-polyfill.js # Cross-browser compatibility
└── utils/                 # Utility functions
```

## 🔄 Development Workflow

### Making Changes
1. **Edit files** in your preferred editor
2. **Go to chrome://extensions/**
3. **Click refresh icon** next to NEXUS
4. **Open new tab** to see changes
5. **Check console** for any errors

### Testing Changes
```bash
# Quick test checklist
1. Open new tab - Does NEXUS load?
2. Press 'S' - Do settings open?
3. Press 'K' - Do shortcuts work?
4. Press 'N' - Do notes work?
5. Change theme - Does it apply?
```

### Debugging
```javascript
// Add debug logging
console.log('Debug info:', data);

// Check extension errors
// Go to chrome://extensions/
// Click "Errors" button next to NEXUS

// Use Chrome DevTools
// F12 on new tab
// Check Console, Network, Performance tabs
```

## 🧪 Testing Guidelines

### Manual Testing Checklist

#### Core Functionality
- [ ] Extension loads without errors
- [ ] Clock displays correct time
- [ ] Smart date features work
- [ ] Theme switching works
- [ ] Settings persist after reload

#### Keyboard Shortcuts
- [ ] `K` opens Quick Shortcuts
- [ ] `S` opens Settings
- [ ] `N` opens Quick Notes
- [ ] `Esc` closes panels

#### Cross-Browser Testing
- [ ] Chrome (primary target)
- [ ] Firefox (with polyfill)
- [ ] Edge (Chromium-based)

#### Accessibility Testing
- [ ] Tab navigation works
- [ ] Screen reader compatibility
- [ ] High contrast mode
- [ ] Keyboard-only usage

### Performance Testing
```javascript
// Memory usage check
// Press Shift+Esc in Chrome
// Look for NEXUS memory usage (should be <50MB)

// Load time testing
console.time('NEXUS Load');
// ... after full load
console.timeEnd('NEXUS Load');
// Should be <100ms
```

## 🎨 Theme Development

### Adding New Color Themes
1. **Edit styles.css**
2. **Add new theme variables**:
```css
[data-theme="new-theme"] {
  --accent-color: #your-color;
  --accent-hover: #your-hover-color;
  /* ... other variables */
}
```
3. **Update theme selector** in script.js
4. **Test across all components**

### Typography Themes
1. **Add font files** to `assets/fonts/`
2. **Update font loading** in script.js
3. **Add theme option** to settings
4. **Test readability** and performance

## 🤖 AI System Development

### Tab Memory System
```javascript
// Located in src/modules/tab-memory.js
// Key concepts:
- Confidence scoring (threshold: 0.42)
- Adaptive algorithms
- Pattern recognition
- Behavioral analysis
```

### Adding New Prediction Features
1. **Understand current algorithm** in tab-memory.js
2. **Add new data collection** points
3. **Update confidence calculation**
4. **Test with various usage patterns**

## 📊 Performance Optimization

### Key Metrics to Monitor
- **Load Time**: <100ms for initial render
- **Memory Usage**: <50MB total
- **Cache Size**: <45MB IndexedDB quota
- **Animation FPS**: 60fps for smooth experience

### Optimization Techniques
```javascript
// Debounced operations
const debouncedSave = debounce(saveFunction, 1000);

// Efficient DOM updates
const fragment = document.createDocumentFragment();
// ... add elements to fragment
container.appendChild(fragment);

// Memory cleanup
window.addEventListener('beforeunload', cleanup);
```

## 🔧 Code Quality Standards

### JavaScript Style
- **ES6+ features** - Use modern JavaScript
- **Const/let** - No var declarations
- **Arrow functions** - For concise syntax
- **Template literals** - For string interpolation
- **Destructuring** - For cleaner code

### Documentation Requirements
```javascript
/**
 * Function description with WHY not just WHAT
 * 
 * ARCHITECTURAL EXPLANATION:
 * - Design decision rationale
 * - Performance considerations
 * - Cross-browser compatibility notes
 * 
 * @param {Type} param - Parameter description
 * @returns {Type} Return value description
 */
function exampleFunction(param) {
    // Implementation
}
```

### Error Handling
```javascript
try {
    // Risky operation
} catch (error) {
    // Graceful degradation
    console.warn('Feature unavailable:', error);
    // Fallback behavior
}
```

## 🌐 Cross-Browser Development

### API Compatibility
```javascript
// Always use cross-browser API detection
const api = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;

// Check for feature availability
if (api?.storage?.sync) {
    // Use modern API
} else {
    // Fallback strategy
}
```

### Testing Strategy
1. **Primary**: Chrome (latest)
2. **Secondary**: Firefox (with polyfill)
3. **Tertiary**: Edge (Chromium)
4. **Future**: Safari (Web Extensions)

## 🐛 Debugging Tips

### Common Issues
```javascript
// Extension not loading
// Check manifest.json syntax
// Verify file paths
// Check permissions

// Settings not saving
// Check storage permissions
// Verify API availability
// Test storage quota

// Performance issues
// Use Chrome DevTools Performance tab
// Check memory leaks
// Monitor cache size
```

### Debug Tools
```javascript
// Extension debugging
chrome.runtime.getBackgroundPage(console.log);

// Storage inspection
chrome.storage.local.get(console.log);

// Performance monitoring
performance.mark('start');
// ... code to measure
performance.mark('end');
performance.measure('operation', 'start', 'end');
```

## 📝 Contributing Workflow

### Before Making Changes
1. **Read CONTRIBUTING.md** thoroughly
2. **Check existing issues** for similar work
3. **Create feature branch** from main
4. **Test thoroughly** across browsers

### Code Review Checklist
- [ ] Follows existing code style
- [ ] Includes comprehensive JSDoc comments
- [ ] Tested across multiple browsers
- [ ] No performance regressions
- [ ] Maintains accessibility compliance
- [ ] Updates documentation if needed

### Pull Request Process
1. **Create descriptive PR title**
2. **Fill out PR template** completely
3. **Include screenshots** for UI changes
4. **Test instructions** for reviewers
5. **Link related issues**

---

**Happy coding!** 🚀 

For questions, check the [Architecture Guide](architecture.md) or open a [GitHub Discussion](https://github.com/hellomosaddiq/nexus-new-tab/discussions).
