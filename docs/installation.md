# Installation Guide

This guide will help you install NEXUS - New Tab Productivity Hub on your browser.

## 🚀 Chrome Web Store (Recommended)

### Coming Soon
NEXUS will be available on the Chrome Web Store soon. This is the recommended installation method for most users.

1. Visit the Chrome Web Store (link coming soon)
2. Click "Add to Chrome"
3. Confirm the installation
4. Open a new tab to start using NEXUS

## 🛠️ Manual Installation (Developer Mode)

### Prerequisites
- **Chrome Browser** (version 88 or higher)
- **Git** (for cloning the repository)

### Step-by-Step Installation

#### 1. Download NEXUS
```bash
# Clone the repository
git clone https://github.com/hellomosaddiq/nexus-new-tab.git

# Navigate to the project folder
cd nexus-new-tab
```

#### 2. Enable Developer Mode in Chrome
1. Open Chrome and navigate to `chrome://extensions/`
2. Toggle "Developer mode" in the top right corner
3. The toggle should be blue/enabled

#### 3. Load the Extension
1. Click "Load unpacked" button
2. Select the `nexus-new-tab` folder you just downloaded
3. NEXUS should now appear in your extensions list

#### 4. Verify Installation
1. Open a new tab in Chrome
2. You should see the NEXUS interface
3. If you see the default Chrome new tab, refresh the page

### Troubleshooting Installation

#### Extension Not Loading
- **Check Chrome version**: Ensure you're using Chrome 88+
- **Verify folder selection**: Make sure you selected the root folder containing `manifest.json`
- **Check developer mode**: Ensure developer mode is enabled

#### New Tab Not Changing
- **Refresh the page**: Press F5 or Ctrl+R on the new tab
- **Check for conflicts**: Disable other new tab extensions
- **Restart Chrome**: Close and reopen Chrome completely

#### Permission Errors
- **Check folder permissions**: Ensure the folder is readable
- **Try different location**: Move the folder to your Desktop and try again
- **Run as administrator**: Try running Chrome as administrator (Windows)

## 🔄 Updating NEXUS

### Manual Updates
Since you're using the manual installation, you'll need to update manually:

1. **Pull latest changes**:
   ```bash
   cd nexus-new-tab
   git pull origin main
   ```

2. **Reload the extension**:
   - Go to `chrome://extensions/`
   - Find NEXUS in the list
   - Click the refresh/reload button

### Future Automatic Updates
Once NEXUS is available on the Chrome Web Store, updates will be automatic.

## 🌐 Other Browsers

### Firefox
NEXUS is designed to be cross-browser compatible. Firefox support is planned for future releases.

### Edge
Edge (Chromium-based) should work with the manual installation method, though it's not officially tested.

### Safari
Safari support is planned for future releases with Web Extensions.

## 🔧 Development Installation

If you're planning to contribute to NEXUS, see the [Development Guide](development.md) for additional setup steps.

## 📞 Need Help?

- **Installation Issues**: Check [Troubleshooting](troubleshooting.md)
- **General Questions**: Open a [GitHub Discussion](https://github.com/hellomosaddiq/nexus-new-tab/discussions)
- **Bug Reports**: Create a [GitHub Issue](https://github.com/hellomosaddiq/nexus-new-tab/issues)

---

**Next Steps**: Check out the [User Guide](user-guide.md) to learn about all the features!
