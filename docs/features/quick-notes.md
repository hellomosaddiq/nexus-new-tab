# Quick Notes

NEXUS includes a powerful quick notes system that allows you to capture thoughts, ideas, and information instantly without leaving your new tab. The system features auto-save functionality, rich text support, and seamless integration with your workflow.

## 📝 Overview

### What are Quick Notes?
Quick Notes provide an instant, always-accessible notepad directly in your new tab. Perfect for:

- **Meeting Notes** - Capture key points during video calls
- **Ideas & Inspiration** - Jot down creative thoughts as they come
- **Task Lists** - Create quick to-do items and reminders
- **Research Notes** - Save important information while browsing
- **Code Snippets** - Store useful code fragments and commands
- **Contact Information** - Temporarily store phone numbers, emails, addresses

### Key Features
- **Instant Access** - Available on every new tab
- **Auto-Save** - Automatic saving every second while typing
- **Persistent Storage** - Notes survive browser restarts and crashes
- **Cross-Device Sync** - Sync notes across devices (if enabled)
- **Rich Text Support** - Basic formatting and structure
- **Keyboard Shortcuts** - Quick access and navigation
- **Privacy-First** - All data stored locally on your device

## ⚡ Quick Access

### Opening Quick Notes
Multiple ways to access your notes:

#### **Keyboard Shortcut**
- **Primary**: Press `N` to toggle notes overlay
- **Alternative**: `Ctrl/Cmd + Shift + N` for system-wide access
- **Quick Toggle**: `Esc` to close notes overlay

#### **Visual Interface**
- **Notes Button** - Click the notes icon in the interface
- **Context Menu** - Right-click for notes options
- **Settings Panel** - Enable/disable notes from settings

#### **Auto-Open Behavior**
- **Remember State** - Notes can stay open between sessions
- **Smart Positioning** - Notes appear in optimal screen position
- **Focus Management** - Automatic focus when opening

### Interface Design
The notes interface is designed for minimal distraction:

#### **Overlay Design**
- **Translucent Background** - Subtle backdrop that doesn't obstruct content
- **Glassmorphism Effect** - Modern blur effect for visual appeal
- **Adaptive Sizing** - Automatically adjusts to content length
- **Theme Integration** - Matches your selected NEXUS theme

#### **Text Area Features**
- **Large Text Area** - Generous space for writing
- **Monospace Option** - Switch to monospace font for code
- **Line Numbers** - Optional line numbering for structured notes
- **Word Count** - Real-time character and word counting

## 💾 Auto-Save System

### Intelligent Auto-Save
The notes system uses sophisticated auto-save technology:

#### **Save Triggers**
- **Keystroke Debouncing** - Saves 1 second after you stop typing
- **Focus Loss** - Immediate save when clicking away from notes
- **Tab Switch** - Automatic save when switching browser tabs
- **Browser Close** - Emergency save before browser shutdown

#### **Dual Storage Strategy**
```javascript
// Primary storage (synced across devices)
chrome.storage.sync.set({
  'quickNotesContent': noteContent,
  'lastModified': Date.now()
});

// Fallback storage (immediate local access)
localStorage.setItem('nexus-quick-notes', noteContent);
```

#### **Save Indicators**
- **Save Status** - Visual indicator showing save state
- **Last Saved** - Timestamp of most recent save
- **Sync Status** - Cross-device synchronization indicator
- **Error Handling** - Clear feedback if saving fails

### Data Reliability
Multiple layers ensure your notes are never lost:

#### **Redundant Storage**
- **Extension Storage** - Primary storage with sync capability
- **Local Storage** - Immediate fallback for instant access
- **Session Storage** - Temporary backup during active session
- **Memory Cache** - In-memory copy for performance

#### **Recovery Features**
- **Crash Recovery** - Automatic recovery after browser crashes
- **Version History** - Basic undo/redo functionality
- **Conflict Resolution** - Smart handling of sync conflicts
- **Data Validation** - Ensures data integrity across saves

## 🎨 Formatting & Features

### Text Formatting
Basic formatting options for better organization:

#### **Markdown Support**
- **Headers** - Use `#`, `##`, `###` for different header levels
- **Bold Text** - Wrap text in `**bold**` for emphasis
- **Italic Text** - Use `*italic*` for subtle emphasis
- **Code Blocks** - Wrap code in backticks for `inline code`
- **Lists** - Use `-` or `*` for bullet points

#### **Smart Text Features**
- **Auto-Indentation** - Intelligent indentation for lists and code
- **Tab Support** - Tab key for indentation (doesn't lose focus)
- **Line Wrapping** - Soft wrap for long lines
- **Smart Quotes** - Automatic quote formatting

### Organization Features
Tools to keep your notes organized:

#### **Search & Navigation**
- **Find in Notes** - `Ctrl/Cmd + F` to search within notes
- **Quick Jump** - Navigate to specific sections quickly
- **Bookmark Lines** - Mark important lines for quick access
- **Fold Sections** - Collapse sections for better overview

#### **Content Structure**
- **Section Dividers** - Use `---` for visual section breaks
- **Date Stamps** - Automatic date insertion with shortcuts
- **Templates** - Quick insertion of common note structures
- **Tags** - Simple tagging system for categorization

## ⌨️ Keyboard Shortcuts

### Essential Shortcuts
Master these shortcuts for efficient note-taking:

#### **Access & Navigation**
- **`N`** - Toggle notes overlay
- **`Esc`** - Close notes overlay
- **`Ctrl/Cmd + S`** - Manual save (auto-save is automatic)
- **`Ctrl/Cmd + A`** - Select all text

#### **Text Editing**
- **`Tab`** - Indent line or selection
- **`Shift + Tab`** - Unindent line or selection
- **`Ctrl/Cmd + Z`** - Undo last change
- **`Ctrl/Cmd + Y`** - Redo last undone change

#### **Quick Insertion**
- **`Ctrl/Cmd + D`** - Insert current date
- **`Ctrl/Cmd + T`** - Insert current time
- **`Ctrl/Cmd + L`** - Insert horizontal line divider
- **`Ctrl/Cmd + /`** - Toggle comment formatting

### Advanced Shortcuts
Power user features for enhanced productivity:

#### **Selection & Movement**
- **`Ctrl/Cmd + L`** - Select entire line
- **`Ctrl/Cmd + Up/Down`** - Move line up/down
- **`Ctrl/Cmd + D`** - Duplicate current line
- **`Ctrl/Cmd + Shift + K`** - Delete current line

#### **Multi-Cursor Support**
- **`Ctrl/Cmd + Click`** - Add cursor at click position
- **`Ctrl/Cmd + Shift + L`** - Add cursor to all selected text
- **`Alt + Up/Down`** - Add cursor above/below current line
- **`Esc`** - Return to single cursor

## 🔧 Configuration Options

### Notes Settings
Customize the notes experience:

#### **Display Options**
- **Font Family** - Choose between sans-serif and monospace
- **Font Size** - Adjust text size for comfort
- **Line Height** - Optimize line spacing for readability
- **Theme Integration** - Match notes appearance to selected theme

#### **Behavior Settings**
- **Auto-Open** - Automatically open notes on new tab
- **Remember Position** - Save notes overlay position
- **Save Frequency** - Adjust auto-save timing
- **Sync Settings** - Configure cross-device synchronization

#### **Privacy Options**
- **Local Only** - Keep notes on device only (no sync)
- **Encrypted Storage** - Additional encryption for sensitive notes
- **Auto-Clear** - Automatically clear notes after specified time
- **Backup Options** - Export/import notes for backup

### Advanced Configuration
```javascript
// Notes configuration object
const notesConfig = {
  autoSave: true,
  saveDelay: 1000,        // 1 second after typing stops
  maxLength: 100000,      // 100KB character limit
  syncEnabled: true,
  fontFamily: 'monospace',
  fontSize: '14px',
  lineHeight: 1.5,
  showLineNumbers: false,
  wordWrap: true
};
```

## 🛡️ Privacy & Security

### Data Protection
Your notes are protected with multiple security measures:

#### **Local Storage Priority**
- **Device-First** - Notes stored primarily on your device
- **No External Servers** - No third-party note storage services
- **Sync Control** - You control if/when notes sync across devices
- **Encryption Options** - Additional encryption available for sensitive content

#### **Access Control**
- **Extension-Only** - Notes only accessible through NEXUS
- **No External Access** - Other websites cannot access your notes
- **Secure Storage** - Uses browser's secure storage APIs
- **Permission-Based** - Requires explicit user permission for sync

### Data Management
Tools to manage your notes data:

#### **Export & Backup**
- **Text Export** - Export notes as plain text file
- **Markdown Export** - Export with formatting preserved
- **JSON Export** - Export with metadata for full backup
- **Scheduled Backups** - Automatic periodic backups

#### **Data Cleanup**
- **Clear All Notes** - Complete notes reset option
- **Selective Deletion** - Remove specific sections or content
- **Storage Cleanup** - Remove orphaned or corrupted data
- **Sync Reset** - Reset synchronization state

## 🛠️ Troubleshooting

### Common Issues

#### **Notes Not Saving**
If auto-save isn't working:

1. **Check Storage Permissions** - Ensure NEXUS has storage access
2. **Storage Quota** - Check if browser storage is full
3. **Extension State** - Reload NEXUS extension
4. **Manual Save** - Try `Ctrl/Cmd + S` to force save

#### **Notes Disappeared**
If notes are missing:

1. **Check Sync Status** - Notes may be syncing from another device
2. **Storage Recovery** - Check localStorage fallback
3. **Recent Changes** - Look for accidental deletion
4. **Backup Restore** - Restore from recent backup if available

#### **Sync Issues**
If notes aren't syncing across devices:

1. **Chrome Sync** - Ensure Chrome sync is enabled
2. **Storage Permissions** - Check extension sync permissions
3. **Network Connection** - Verify internet connectivity
4. **Conflict Resolution** - Manually resolve sync conflicts

### Performance Optimization

#### **Large Notes**
For very large notes:

1. **Split Content** - Break large notes into smaller sections
2. **Archive Old Content** - Move old notes to external files
3. **Reduce Auto-Save Frequency** - Increase save delay for large content
4. **Use External Editor** - For very large documents, use dedicated editor

#### **Memory Usage**
To optimize memory usage:

1. **Clear Unused Notes** - Remove old or unnecessary content
2. **Disable Sync** - Turn off sync for local-only usage
3. **Reduce History** - Limit undo/redo history depth
4. **Close When Unused** - Close notes overlay when not needed

---

**Quick Notes in NEXUS provides a powerful, secure, and user-friendly note-taking experience that integrates seamlessly with your browsing workflow. Whether you need to jot down a quick thought or maintain detailed project notes, the system adapts to your needs while keeping your data safe and accessible.**
