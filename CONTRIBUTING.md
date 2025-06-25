# Contributing to NEXUS New Tab

Thank you for your interest in contributing to NEXUS! This document provides guidelines and information for contributors.

## 📚 **Development Status**

**Important**: NEXUS is currently maintained by a student developer with upcoming exams. Response times may be slower over the next 6-8 months, but all contributions are welcome and will be reviewed post-exam.

## 🚀 **Getting Started**

### **Prerequisites**
- **Node.js** 16+ and npm
- **Chrome/Edge** browser for testing
- **Git** for version control
- **Code editor** (VS Code recommended)

### **Development Setup**

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/nexus-new-tab.git
   cd nexus-new-tab
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Load Extension for Testing**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `src/` folder
   - Open a new tab to test NEXUS

4. **Run Development Tools**
   ```bash
   # Lint JavaScript
   npm run lint

   # Format code
   npm run format

   # Validate all code
   npm run validate
   ```

## 🛠️ **Development Guidelines**

### **Code Standards**
- **ESLint** configuration must pass
- **Prettier** formatting required
- **Comprehensive comments** for complex logic
- **JSDoc** documentation for functions
- **Semantic variable names** and clear structure

### **Architecture Principles**
- **Vanilla JavaScript** only (no frameworks)
- **Modular design** with clear separation of concerns
- **Performance-first** approach
- **Accessibility** compliance (WCAG 2.1 AA)
- **Cross-browser** compatibility

### **File Structure**
```
src/
├── pages/newtab/          # Main interface
│   ├── script.js          # Core orchestration (6,300+ lines)
│   ├── styles.css         # Design system (6,100+ lines)
│   └── index.html         # Main page structure
├── modules/               # Feature modules
│   ├── tab-memory.js      # AI prediction engine
│   ├── quick-shortcuts.js # Command palette system
│   ├── cache-manager.js   # IndexedDB caching
│   └── notification-system.js # User feedback
└── background/            # Service worker
    └── background.js      # Extension background
```

## 🎯 **How to Contribute**

### **1. Bug Reports**
- **Search existing issues** before creating new ones
- **Use the bug report template** when available
- **Provide detailed steps** to reproduce
- **Include browser version** and extension version
- **Add screenshots** if relevant

### **2. Feature Requests**
- **Check the roadmap** in README.md first
- **Explain the use case** and user benefit
- **Consider performance impact** on the extension
- **Align with NEXUS philosophy** (lightweight, fast, privacy-first)

### **3. Code Contributions**

#### **Small Changes**
- **Typo fixes**, **documentation updates**, **minor bug fixes**
- **Create a pull request** directly

#### **Major Changes**
- **Open an issue first** to discuss the approach
- **Wait for maintainer feedback** before starting work
- **Follow the development guidelines** strictly

### **4. Documentation**
- **Improve existing docs** for clarity
- **Add missing documentation** for features
- **Update screenshots** if UI changes
- **Fix broken links** or outdated information

## 📝 **Pull Request Process**

### **Before Submitting**
1. **Test thoroughly** in Chrome and Edge
2. **Run all validation** (`npm run validate`)
3. **Update documentation** if needed
4. **Add/update tests** if applicable
5. **Follow commit message format**

### **Commit Message Format**
```
type(scope): brief description

Detailed explanation if needed

- List specific changes
- Reference issues: Fixes #123
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

### **Pull Request Template**
- **Clear title** describing the change
- **Detailed description** of what and why
- **Testing steps** for reviewers
- **Screenshots** for UI changes
- **Breaking changes** clearly marked

## 🧪 **Testing Guidelines**

### **Manual Testing**
- **Load extension** in Chrome/Edge
- **Test all affected features** thoroughly
- **Check performance** (load times, memory usage)
- **Verify accessibility** (keyboard navigation, screen readers)
- **Test edge cases** and error scenarios

### **Browser Testing**
- **Primary**: Chrome 88+
- **Secondary**: Edge 88+
- **Future**: Firefox 85+ (when supported)

## 🎨 **Design Guidelines**

### **UI/UX Principles**
- **Minimal and clean** interface
- **Fast and responsive** interactions
- **Consistent with** existing design system
- **Accessible** to all users
- **Privacy-focused** (no external tracking)

### **Visual Standards**
- **Follow existing** color schemes and typography
- **Use Lucide icons** for consistency
- **Maintain responsive** design principles
- **Test in dark theme** (default)

## 🔒 **Security Guidelines**

### **Privacy Requirements**
- **No external API calls** without user consent
- **All data stored locally** (IndexedDB/localStorage)
- **No tracking or analytics** code
- **Secure handling** of user data

### **Code Security**
- **Validate all inputs** from users
- **Sanitize HTML** content properly
- **Use CSP-compliant** code only
- **Avoid eval()** and similar functions

## 📋 **Issue Labels**

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to docs
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `priority: high` - Critical issues
- `priority: low` - Nice to have
- `student-dev` - Delayed due to exams

## 🎓 **Student Developer Context**

### **Current Situation**
- **Primary focus**: Class 12 exams (next 6-8 months)
- **Response time**: May be slower than usual
- **Commitment**: Long-term maintenance guaranteed
- **Quality**: All contributions will be thoroughly reviewed

### **Post-Exam Plans**
- **Active maintenance** and feature development
- **Community building** and user support
- **Cross-browser expansion** (Firefox, Safari)
- **Performance optimizations** and new features

## 🙏 **Recognition**

All contributors will be:
- **Listed in CONTRIBUTORS.md** (when created)
- **Mentioned in release notes** for significant contributions
- **Credited in documentation** for major features
- **Appreciated** in the community

## 📞 **Questions?**

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For general questions
- **Documentation**: [hellomosaddiq.github.io/nexus-new-tab](https://hellomosaddiq.github.io/nexus-new-tab/)

---

**Thank you for contributing to NEXUS! Your help makes this project better for everyone.** 🚀
