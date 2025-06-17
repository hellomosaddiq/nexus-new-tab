# MkDocs GitHub Pages Deployment Guide

This guide explains how NEXUS documentation is automatically deployed to GitHub Pages using MkDocs and GitHub Actions.

## 🚀 Automatic Deployment

### How It Works
The documentation is automatically built and deployed using GitHub Actions whenever changes are pushed to the `main` branch.

### 1. Repository Settings
1. Go to your repository: `https://github.com/hellomosaddiq/nexus-new-tab`
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)

### 2. Configure GitHub Pages
1. **Source**: Select "GitHub Actions"
2. The workflow will automatically deploy from the `main` branch
3. No manual folder selection needed

### 3. Automatic Workflow
- GitHub Actions automatically builds and deploys the site using MkDocs
- Triggered on every push to `main` branch that affects documentation
- Build time: ~2-3 minutes
- You'll see a green checkmark when deployment is complete

### 4. Access Your Website
Your website will be available at:
```
https://hellomosaddiq.github.io/nexus-new-tab/
```

## 📁 MkDocs Structure

The documentation is built from:
```
docs/
├── index.md                # Homepage
├── installation.md         # Installation guide
├── user-guide.md          # User manual
├── keyboard-shortcuts.md   # Shortcuts reference
├── troubleshooting.md     # Troubleshooting guide
├── architecture.md        # Technical architecture
├── development.md         # Development guide
├── api-reference.md       # API documentation
├── features/              # Feature documentation
│   ├── ai-prediction.md
│   ├── daily-quotes.md
│   ├── focus-timer.md
│   ├── quick-notes.md
│   ├── smart-date.md
│   └── themes.md
└── technical/             # Technical documentation
    ├── accessibility.md
    ├── cross-browser.md
    ├── performance.md
    └── security.md
```

## 🔧 MkDocs Configuration

The site is configured via `mkdocs.yml` in the root directory:
- **Theme**: Material Design (dark theme)
- **Colors**: Blue primary and accent (matching NEXUS)
- **Typography**: Inter + JetBrains Mono
- **Features**: Search, navigation, code highlighting

## 🎨 Design Features

The website matches your NEXUS extension design:
- ✅ **Blue theme** with accent colors
- ✅ **Inter + JetBrains Mono** typography
- ✅ **Static grid background** (matching extension)
- ✅ **Glassmorphism effects** with blur
- ✅ **Smooth animations** and transitions
- ✅ **Mobile responsive** design
- ✅ **Accessibility compliant** (WCAG 2.1 AA)

## 🖼️ Assets Included

### Icons
- `nexus-16.png` - Favicon
- `nexus-32.png` - Favicon
- `nexus-48.png` - Navigation logo
- `nexus-128.png` - Apple touch icon
- `keyboard-layout.svg` - Your beautiful animated keyboard

### Screenshots
- `NEXUS_01_Hero_Blue_1920x1080.png` - Main interface
- `NEXUS_02_Shortcuts_Purple_1920x1080.png` - AI shortcuts
- `NEXUS_03_Settings_Themes_1920x1080.png` - Theme settings
- `NEXUS_04_FocusTimer_Orange_1920x1080.png` - Focus timer
- `NEXUS_05_QuickNotes_Cyan_1920x1080.png` - Quick notes

## 🔧 Customization

### Update Content
- Edit `index.html` for main content
- Modify `styles.css` for design changes
- Update `script.js` for interactive features

### Add New Pages
1. Create new `.html` files in docs/
2. Link them in navigation
3. Update `_config.yml` if needed

### Change Colors
Update CSS custom properties in `styles.css`:
```css
:root {
    --accent-color: #3b82f6;  /* Change this */
    --accent-hover: #2563eb;  /* And this */
}
```

## 📊 SEO & Social Media

The website includes:
- ✅ **Open Graph** meta tags for social sharing
- ✅ **Twitter Card** support
- ✅ **Structured data** for search engines
- ✅ **Sitemap** generation (automatic)
- ✅ **SEO-friendly** URLs and content

## 🔍 Analytics (Optional)

To add analytics, edit `script.js` and add your tracking code:
```javascript
// Google Analytics example
gtag('config', 'GA_MEASUREMENT_ID');

// Or Plausible Analytics
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

## 🌐 Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to docs/ with your domain
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings

Example CNAME file:
```
nexus-extension.com
```

## 🚀 Performance

The website is optimized for:
- ⚡ **Fast loading** - No external dependencies
- 📱 **Mobile performance** - Responsive design
- ♿ **Accessibility** - Screen reader friendly
- 🔍 **SEO** - Search engine optimized

## 🔄 Updates

To update the website:
1. Edit files in the docs/ folder
2. Commit and push to GitHub
3. GitHub Pages will automatically rebuild
4. Changes appear in 1-2 minutes

## 🆘 Troubleshooting

### Site Not Loading
- Check GitHub Pages settings
- Ensure docs/ folder is selected
- Wait 5-10 minutes for initial deployment

### Images Not Showing
- Verify file paths in HTML
- Check that assets were copied correctly
- Ensure case-sensitive file names match

### CSS Not Applied
- Check for syntax errors in styles.css
- Verify file paths are correct
- Clear browser cache

---

**Your NEXUS website is now ready to showcase your amazing Chrome extension!** 🎉

Visit: https://hellomosaddiq.github.io/nexus-new-tab/
