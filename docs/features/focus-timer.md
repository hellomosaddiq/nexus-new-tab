# Focus Timer (Pomodoro)

NEXUS includes a built-in Pomodoro focus timer designed to boost productivity through structured work sessions. The timer features visual progress tracking, smart notifications, and seamless integration with your workflow.

## 🍅 Pomodoro Technique

### What is the Pomodoro Technique?
The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.

#### **Core Principles**
1. **25-Minute Work Sessions** - Focused, uninterrupted work periods
2. **5-Minute Short Breaks** - Brief rest between sessions
3. **15-30 Minute Long Breaks** - Extended rest after 4 sessions
4. **Task Focus** - One task per Pomodoro session
5. **No Interruptions** - Maintain focus during active sessions

#### **Benefits**
- **Improved Focus** - Eliminates distractions during work periods
- **Better Time Awareness** - Develops sense of time estimation
- **Reduced Mental Fatigue** - Regular breaks prevent burnout
- **Increased Productivity** - Structured approach to task completion
- **Enhanced Motivation** - Clear progress tracking and achievements

## ⏱️ Timer Features

### Visual Progress Display
The NEXUS focus timer provides clear visual feedback:

#### **Circular Progress Ring**
- **Animated Progress** - Smooth countdown visualization
- **Color-Coded States** - Different colors for work/break periods
- **Percentage Display** - Exact progress percentage shown
- **Time Remaining** - Minutes and seconds countdown
- **Smooth Animations** - 60fps progress updates

#### **Status Indicators**
- **Work Session** - Blue progress ring with focus icon
- **Short Break** - Green progress ring with rest icon
- **Long Break** - Purple progress ring with extended rest icon
- **Paused State** - Orange ring with pause indicator
- **Completed** - Gold ring with completion celebration

### Timer Controls
Intuitive controls for managing your focus sessions:

#### **Start/Stop Controls**
- **Start Button** - Begin a new 25-minute focus session
- **Pause Button** - Temporarily pause the current session
- **Resume Button** - Continue paused session from where you left off
- **Reset Button** - Stop current session and reset to 25 minutes
- **Skip Button** - Move to break period early (if needed)

#### **Keyboard Shortcuts**
- **Space Bar** - Start/pause timer
- **R** - Reset current session
- **Esc** - Stop timer and close
- **Enter** - Start new session after completion

### Smart Notifications
Intelligent notification system that respects your workflow:

#### **Session Completion**
- **Visual Alert** - Prominent completion notification
- **Audio Notification** - Optional sound alert (can be disabled)
- **Browser Notification** - System notification if tab not active
- **Progress Celebration** - Visual feedback for completed sessions

#### **Break Reminders**
- **Break Start** - Notification when break period begins
- **Break End Warning** - 1-minute warning before break ends
- **Return to Work** - Gentle reminder to start next session
- **Long Break Suggestion** - Recommendation after 4 sessions

## 🎯 Session Management

### Session Types
NEXUS supports different types of focus sessions:

#### **Standard Pomodoro (25 minutes)**
- **Default Duration** - Classic 25-minute work session
- **Optimal Focus** - Research-backed optimal focus period
- **Universal Application** - Works for most tasks and users
- **Proven Effectiveness** - Decades of productivity research

#### **Custom Durations**
- **15-Minute Sessions** - For shorter tasks or beginners
- **30-Minute Sessions** - For deep work requiring longer focus
- **45-Minute Sessions** - For complex tasks needing extended attention
- **60-Minute Sessions** - For intensive work periods

#### **Break Periods**
- **5-Minute Short Breaks** - Standard rest between sessions
- **10-Minute Extended Breaks** - Longer rest for mental recovery
- **15-30 Minute Long Breaks** - Extended rest after 4 sessions
- **Custom Break Lengths** - User-configurable break durations

### Session Tracking
Comprehensive tracking of your focus sessions:

#### **Daily Statistics**
- **Sessions Completed** - Number of Pomodoros finished today
- **Total Focus Time** - Cumulative focused work time
- **Break Time Taken** - Total break duration
- **Productivity Score** - Efficiency rating based on completion rate
- **Streak Counter** - Consecutive days with completed sessions

#### **Weekly/Monthly Analytics**
- **Trend Analysis** - Focus patterns over time
- **Peak Performance** - Best focus times and days
- **Goal Progress** - Progress toward focus time goals
- **Habit Formation** - Consistency tracking and insights

### State Persistence
Your timer state is preserved across sessions:

#### **Session Recovery**
- **Browser Restart** - Timer continues after browser restart
- **Tab Switching** - Timer runs in background when switching tabs
- **System Sleep** - Handles computer sleep/wake cycles
- **Extension Reload** - Recovers state after extension updates

#### **Progress Saving**
- **Automatic Saves** - Progress saved every 30 seconds
- **Crash Recovery** - Recovers from unexpected browser crashes
- **Cross-Device Sync** - Timer state synced across devices (if enabled)
- **Backup Storage** - Multiple storage strategies for reliability

## ⚙️ Configuration Options

### Timer Settings
Customize the focus timer to match your workflow:

#### **Duration Settings**
```javascript
// Default durations (customizable)
const TIMER_DURATIONS = {
  work: 25 * 60,        // 25 minutes
  shortBreak: 5 * 60,   // 5 minutes
  longBreak: 15 * 60,   // 15 minutes
  longBreakInterval: 4   // After 4 sessions
};
```

#### **Notification Preferences**
- **Sound Alerts** - Enable/disable audio notifications
- **Visual Alerts** - Control visual notification style
- **Browser Notifications** - System notifications when tab inactive
- **Break Reminders** - Customize break reminder timing

#### **Display Options**
- **Progress Ring Style** - Choose from different visual styles
- **Color Themes** - Timer colors match selected theme
- **Size Options** - Compact or expanded timer display
- **Position** - Timer placement on the new tab page

### Accessibility Features
The focus timer is designed for all users:

#### **Visual Accessibility**
- **High Contrast** - Enhanced visibility for low vision users
- **Color Independence** - Information not conveyed by color alone
- **Large Text Options** - Scalable text for better readability
- **Focus Indicators** - Clear focus states for keyboard navigation

#### **Audio Accessibility**
- **Screen Reader Support** - Full ARIA implementation
- **Audio Descriptions** - Spoken timer status updates
- **Customizable Alerts** - Various notification sound options
- **Silent Mode** - Visual-only notifications available

#### **Motor Accessibility**
- **Keyboard Control** - Full functionality via keyboard
- **Large Click Targets** - Easy-to-click buttons and controls
- **Voice Control** - Compatible with voice control software
- **Gesture Support** - Touch-friendly on supported devices

## 🎨 Visual Design

### Progress Visualization
The timer uses sophisticated visual design:

#### **Circular Progress Ring**
```css
/* Smooth progress animation */
.timer-progress {
  stroke-dasharray: 283; /* Circumference */
  stroke-dashoffset: 283;
  transition: stroke-dashoffset 1s linear;
  transform-origin: center;
}

/* Color states */
.work-session { stroke: var(--accent-color); }
.short-break { stroke: #10b981; }
.long-break { stroke: #8b5cf6; }
.paused { stroke: #f59e0b; }
```

#### **Animation System**
- **60fps Updates** - Smooth progress animation
- **Easing Functions** - Natural movement curves
- **State Transitions** - Smooth transitions between states
- **Performance Optimized** - Hardware-accelerated animations

### Theme Integration
The timer seamlessly integrates with NEXUS themes:

- **Color Harmony** - Timer colors match selected theme
- **Typography Consistency** - Uses theme typography settings
- **Visual Cohesion** - Maintains design language consistency
- **Adaptive Styling** - Adjusts to light/dark theme preferences

## 🔧 Technical Implementation

### Timer Architecture
```javascript
class FocusTimer {
  constructor() {
    this.duration = 25 * 60; // 25 minutes in seconds
    this.remaining = this.duration;
    this.isRunning = false;
    this.isPaused = false;
    this.sessionType = 'work';
    this.completedSessions = 0;
  }

  start() {
    this.isRunning = true;
    this.isPaused = false;
    this.tick();
  }

  pause() {
    this.isPaused = true;
    this.saveState();
  }

  reset() {
    this.remaining = this.duration;
    this.isRunning = false;
    this.isPaused = false;
    this.updateDisplay();
  }
}
```

### Performance Optimization
- **Efficient Updates** - Only updates when necessary
- **Background Operation** - Minimal CPU usage when tab inactive
- **Memory Management** - Automatic cleanup of timer resources
- **Battery Friendly** - Optimized for mobile device battery life

### Storage Strategy
```javascript
// Timer state persistence
const timerState = {
  remaining: this.remaining,
  isRunning: this.isRunning,
  isPaused: this.isPaused,
  sessionType: this.sessionType,
  startTime: this.startTime,
  completedSessions: this.completedSessions
};

// Save to multiple storage locations
chrome.storage.local.set({ timerState });
localStorage.setItem('nexus-timer', JSON.stringify(timerState));
```

## 🛠️ Troubleshooting

### Timer Not Starting
If the timer won't start:

1. **Check Permissions** - Ensure NEXUS has necessary permissions
2. **Clear Cache** - Reset timer cache in settings
3. **Reload Extension** - Refresh NEXUS in chrome://extensions/
4. **Check Console** - Look for JavaScript errors

### Timer Losing State
If timer resets unexpectedly:

1. **Storage Issues** - Check browser storage permissions
2. **Extension Updates** - Timer may reset after updates
3. **Browser Crashes** - Unexpected shutdowns can affect state
4. **Manual Reset** - Check if timer was manually reset

### Performance Issues
If timer affects browser performance:

1. **Disable Animations** - Turn off visual animations
2. **Reduce Update Frequency** - Lower timer update rate
3. **Close Other Tabs** - Reduce overall browser load
4. **Check System Resources** - Monitor CPU and memory usage

---

**The NEXUS Focus Timer provides a powerful, accessible, and beautifully designed Pomodoro timer that integrates seamlessly with your productivity workflow. Whether you're new to the Pomodoro Technique or a seasoned practitioner, the timer adapts to your needs while maintaining focus and motivation.**
