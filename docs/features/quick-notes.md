# Quick Notes

NEXUS includes a simple quick notes system that allows you to capture thoughts, ideas, and information instantly without leaving your new tab. The system features auto-save functionality and seamless integration with your workflow.

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
- **Plain Text** - Simple text notepad without formatting
- **Character Counter** - 100K character limit with real-time counter
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
- **Plain Text Only** - Simple text input without formatting
- **Character Counter** - Shows character count with 100K limit
- **Auto-Resize** - Text area adjusts to content

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
// Primary storage (local device only)
chrome.storage.local.set({
  'quickNotesContent': noteContent
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
- **Local Storage** - Simple local storage without conflicts
- **Data Validation** - Ensures data integrity across saves

## 📝 Simple Text Features

### Plain Text Notepad
Basic text editing capabilities:

#### **Text Input**
- **Plain Text** - Simple text input without formatting
- **Line Wrapping** - Automatic text wrapping for long lines
- **Character Counter** - Real-time character count with 100K limit
- **Auto-Save** - Automatic saving with 1-second debounce

#### **Basic Features**
- **Persistent Storage** - Notes saved across browser sessions
- **Dual Storage** - Extension storage with localStorage fallback
- **Modal Interface** - Clean overlay design with glassmorphism
- **Responsive Design** - Adapts to different screen sizes

## ⌨️ Keyboard Shortcuts

### Essential Shortcuts
Master these shortcuts for efficient note-taking:

#### **Basic Shortcuts**
- **`N`** - Toggle notes overlay
- **`Esc`** - Close notes overlay
- **Standard text editing** - Cut, copy, paste, select all work as expected

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

### Basic Configuration
```javascript
// Simple notes configuration
const notesConfig = {
  autoSave: true,
  saveDelay: 1000,        // 1 second after typing stops
  maxLength: 100000,      // 100KB character limit
  syncEnabled: false,     // Notes stored locally only
  fontFamily: 'inherit',  // Uses theme font
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

#### **Basic Data Management**
- **Manual Copy** - Copy notes text manually
- **No Export Features** - No built-in export functionality
- **No Backup System** - No automatic backup features
- **Local Storage Only** - Notes stored on device only

#### **Data Cleanup**
- **Clear All Notes** - Complete notes reset option
- **Selective Deletion** - Remove specific sections or content
- **Storage Cleanup** - Remove orphaned or corrupted data
- **Local Reset** - Reset local storage state

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

1. **Check Local Storage** - Notes are stored locally only
2. **Storage Recovery** - Check localStorage fallback
3. **Recent Changes** - Look for accidental deletion
4. **Extension Reload** - Try reloading the extension

#### **Storage Issues**
If notes aren't saving properly:

1. **Local Storage** - Check browser local storage availability
2. **Storage Permissions** - Check extension storage permissions
3. **Storage Quota** - Verify browser storage isn't full
4. **Extension Reload** - Try reloading the extension

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
