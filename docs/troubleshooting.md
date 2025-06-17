# Troubleshooting Guide

Having issues with NEXUS? This comprehensive guide will help you resolve common problems and get back to productivity.

## 🚨 Common Issues

### Extension Not Loading

#### Symptoms
- Default Chrome new tab appears instead of NEXUS
- Extension shows as installed but not working
- Error messages in Chrome extensions page

#### Solutions
1. **Check Chrome Version**
   - Ensure Chrome 88 or higher
   - Update Chrome: `chrome://settings/help`

2. **Verify Installation**
   - Go to `chrome://extensions/`
   - Ensure NEXUS is enabled (toggle switch is blue)
   - Check for error messages

3. **Reload Extension**
   - Click the refresh icon next to NEXUS
   - Or disable/enable the extension

4. **Check Developer Mode**
   - Ensure "Developer mode" is enabled (for manual installation)
   - Toggle off and on if needed

### Settings Not Saving

#### Symptoms
- Theme changes don't persist
- Smart date features reset
- Settings revert to defaults

#### Solutions
1. **Check Storage Permissions**
   - Go to `chrome://extensions/`
   - Click "Details" on NEXUS
   - Ensure all permissions are granted

2. **Clear Extension Data**
   - Right-click NEXUS in extensions
   - Select "Options" or "Extension options"
   - Look for "Reset" or "Clear data" option

3. **Browser Storage Issues**
   - Check available storage space
   - Clear browser cache: `chrome://settings/clearBrowserData`
   - Restart Chrome completely

### Theme Not Applying

#### Symptoms
- Theme selection doesn't change colors
- Stuck on default blue theme
- Colors appear incorrect

#### Solutions
1. **Refresh New Tab**
   - Press `F5` or `Ctrl+R` on new tab
   - Close and open new tab

2. **Check for Conflicts**
   - Disable other new tab extensions
   - Disable other theme extensions
   - Test with extensions disabled

3. **Clear Theme Cache**
   - Open Settings (`S`)
   - Switch to different theme
   - Switch back to desired theme

### Performance Issues

#### Symptoms
- Slow loading times
- Laggy animations
- High memory usage
- Browser freezing

#### Solutions
1. **Optimize Settings**
   - Disable unused smart date features
   - Turn off grid background
   - Disable smooth animations

2. **Clear Cache**
   - Go to `chrome://settings/clearBrowserData`
   - Select "Cached images and files"
   - Clear data

3. **Reduce Features**
   - Limit smart date features to 1-2
   - Disable Focus Timer if not used
   - Disable Quick Notes if not needed

### Quick Shortcuts Not Working

#### Symptoms
- Shortcuts panel doesn't open
- No bookmarks/sites showing
- Search not working

#### Solutions
1. **Check Permissions**
   - Ensure bookmarks permission granted
   - Check topSites permission
   - Verify history permission

2. **Reload Data**
   - Close and reopen shortcuts panel
   - Restart Chrome
   - Check if bookmarks exist in browser

3. **Clear Shortcut Cache**
   - Open shortcuts panel
   - Wait for data to reload
   - Try searching for known items

## 🔧 Advanced Troubleshooting

### Browser Console Errors

#### How to Check
1. Open new tab with NEXUS
2. Press `F12` to open Developer Tools
3. Click "Console" tab
4. Look for red error messages

#### Common Errors
- **Storage quota exceeded** - Clear browser data
- **Permission denied** - Check extension permissions
- **Script errors** - Reload extension

### Extension Conflicts

#### Identifying Conflicts
1. **Disable all other extensions**
2. **Test NEXUS functionality**
3. **Re-enable extensions one by one**
4. **Identify conflicting extension**

#### Common Conflicting Extensions
- Other new tab replacements
- Ad blockers (sometimes)
- Theme extensions
- Productivity extensions

### Memory Issues

#### Symptoms
- Chrome becomes slow
- High memory usage in Task Manager
- Browser crashes

#### Solutions
1. **Check Memory Usage**
   - Press `Shift+Esc` in Chrome
   - Look for NEXUS memory usage
   - Should be under 50MB

2. **Optimize Usage**
   - Close unused tabs
   - Restart Chrome regularly
   - Disable heavy features

## 🌐 Browser-Specific Issues

### Chrome Issues
- **Settings sync problems** - Sign out/in to Chrome account (affects settings only)
- **Profile corruption** - Create new Chrome profile
- **Update issues** - Manually update Chrome

### Firefox (Future Support)
- Currently not supported
- Cross-browser version planned

### Edge Issues
- **Chromium Edge** - Should work like Chrome
- **Legacy Edge** - Not supported

## 📱 Platform-Specific Issues

### Windows
- **Antivirus interference** - Add Chrome to exceptions
- **Windows Defender** - Allow Chrome extensions
- **User permissions** - Run Chrome as administrator

### macOS
- **Gatekeeper issues** - Allow Chrome in Security settings
- **Permission dialogs** - Grant requested permissions
- **Spotlight conflicts** - None known

### Linux
- **Package manager** - Install Chrome via official package
- **Permissions** - Check file system permissions
- **Display issues** - Check graphics drivers

## 🔄 Reset and Recovery

### Soft Reset
1. **Disable extension**
2. **Re-enable extension**
3. **Refresh new tab**

### Hard Reset
1. **Remove extension completely**
2. **Restart Chrome**
3. **Reinstall extension**
4. **Reconfigure settings**

### Data Recovery
- **Settings backup** - Currently not available
- **Notes backup** - Check localStorage manually
- **Bookmarks** - Stored in browser, not affected

## 📞 Getting Help

### Before Reporting Issues
1. **Try troubleshooting steps** above
2. **Check existing issues** on GitHub
3. **Gather system information**:
   - Chrome version
   - Operating system
   - Extension version
   - Error messages

### How to Report Bugs
1. **Go to GitHub Issues**: [nexus-new-tab/issues](https://github.com/hellomosaddiq/nexus-new-tab/issues)
2. **Use bug report template**
3. **Include detailed information**:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots/videos
   - System information

### Community Support
- **GitHub Discussions**: [nexus-new-tab/discussions](https://github.com/hellomosaddiq/nexus-new-tab/discussions)
- **Search existing topics** before posting
- **Be specific** about your issue
- **Help others** when you can

## 🛡️ Prevention Tips

### Best Practices
- **Keep Chrome updated** - Enable automatic updates
- **Regular maintenance** - Clear cache monthly
- **Monitor performance** - Check memory usage occasionally
- **Backup settings** - Note your preferred configuration

### Avoiding Issues
- **Don't install conflicting extensions**
- **Grant necessary permissions**
- **Keep reasonable number of bookmarks**
- **Restart Chrome weekly**

---

**Still having issues?** Open a [GitHub Issue](https://github.com/hellomosaddiq/nexus-new-tab/issues) with detailed information, and we'll help you out! 🚀
