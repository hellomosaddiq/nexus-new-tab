# GitHub Pages Deployment Guide

This guide will help you deploy the NEXUS website to GitHub Pages from the docs/ folder.

## 🚀 Quick Setup

### 1. Repository Settings
1. Go to your repository: `https://github.com/hellomosaddiq/nexus-new-tab`
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)

### 2. Configure GitHub Pages
1. **Source**: Select "Deploy from a branch"
2. **Branch**: Select `main`
3. **Folder**: Select `/docs`
4. Click **Save**

### 3. Wait for Deployment
- GitHub will automatically build and deploy your site
- This usually takes 1-2 minutes
- You'll see a green checkmark when it's ready

### 4. Access Your Website
Your website will be available at:
```
https://hellomosaddiq.github.io/nexus-new-tab/
```

## 📁 File Structure

The docs/ folder contains:
```
docs/
├── index.html              # Main landing page
├── styles.css              # NEXUS-inspired styling
├── script.js               # Interactive features
├── _config.yml             # GitHub Pages configuration
├── assets/
│   ├── icons/              # Extension icons + keyboard SVG
│   └── screenshots/        # Extension screenshots
├── README.md               # Documentation index
├── installation.md         # Installation guide
├── user-guide.md          # User manual
├── keyboard-shortcuts.md   # Shortcuts reference
├── troubleshooting.md     # Troubleshooting guide
├── architecture.md        # Technical architecture
├── development.md         # Development guide
├── api-reference.md       # API documentation
└── features/              # Feature-specific docs
```

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
- `NEXUS_01_Hero_Blue_1920x1080.png.png` - Main interface
- `NEXUS_02_Shortcuts_Purple_1920x1080.png.png` - AI shortcuts
- `NEXUS_03_Settings_Themes_1920x1080.png.png` - Theme settings
- `NEXUS_04_FocusTimer_Orange_1920x1080.png.png` - Focus timer
- `NEXUS_05_QuickNotes_Cyan_1920x1080.png.png` - Quick notes

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
