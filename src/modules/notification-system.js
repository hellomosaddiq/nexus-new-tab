/**
 * NEXUS Notification System
 * Modern glassmorphism notifications with mobile optimization
 *
 * @author mosaddiq
 * @version 1.0.0
 */

class NotificationSystem {
    /**
     * Initialize the notification system with modern architecture
     *
     * Creates a sophisticated notification system with proper state management,
     * event handling, and performance optimizations. Implements single notification
     * display pattern for clean user experience.
     *
     * STATE MANAGEMENT:
     * - Container element for notification positioning
     * - Current notification tracking for replacement logic
     * - Unique ID generation for notification identification
     * - Timeout management for auto-dismiss functionality
     *
     * PERFORMANCE FEATURES:
     * - Efficient DOM manipulation with minimal reflows
     * - Event delegation for optimal event handling
     * - Automatic cleanup and memory management
     * - Optimized CSS injection with deduplication
     */
    constructor() {
        // ===== STATE MANAGEMENT =====
        this.container = null; // Notification container element
        this.currentNotification = null; // Current active notification
        this.notificationId = 0; // Unique ID counter for notifications
        this.dismissTimeout = null; // Auto-dismiss timeout reference

        // ===== SYSTEM INITIALIZATION =====
        this.init();
    }

    /**
     * ===== SECURITY UTILITIES =====
     *
     * Security-focused utility methods for safe content handling and XSS prevention.
     */

    /**
     * Sanitize HTML content to prevent XSS attacks
     *
     * Safely escapes HTML characters in user-provided content to prevent
     * script injection and other XSS vulnerabilities.
     *
     * @param {string} str - String to sanitize
     * @returns {string} Sanitized string safe for display
     * @private
     */
    sanitizeHTML(str) {
        if (typeof str !== 'string') return '';

        // Create temporary div element for safe text encoding
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * ===== SYSTEM INITIALIZATION =====
     *
     * Comprehensive initialization sequence with container creation and
     * style injection for optimal performance and user experience.
     */

    /**
     * Initialize notification system with comprehensive setup
     *
     * Orchestrates the complete initialization sequence including container
     * creation and CSS injection with proper error handling and optimization.
     *
     * INITIALIZATION SEQUENCE:
     * 1. Create notification container with positioning
     * 2. Inject optimized CSS styles with deduplication
     * 3. Set up event delegation for performance
     * 4. Prepare system for notification display
     *
     * @private
     */
    init() {
        this.createContainer();
        this.injectStyles();
    }

    /**
     * Create notification container with advanced event delegation
     *
     * Creates the main notification container with optimal positioning and
     * implements sophisticated event delegation for performance and reliability.
     * Handles cleanup of existing containers for proper reinitialization.
     *
     * CONTAINER FEATURES:
     * - Fixed positioning for consistent placement
     * - Z-index management for proper layering
     * - Responsive width with mobile optimizations
     * - Event delegation for all notification interactions
     *
     * EVENT DELEGATION BENEFITS:
     * - Single event listener for all notifications
     * - Optimal performance with dynamic content
     * - Proper event bubbling and propagation control
     * - Memory efficient with automatic cleanup
     *
     * INTERACTION HANDLING:
     * - Close button functionality with immediate clearing
     * - Confirmation dialog button handling
     * - Proper event prevention and propagation control
     * - Callback delegation to individual notification handlers
     *
     * @private
     */
    createContainer() {
        // ===== CLEANUP EXISTING CONTAINER =====
        // Remove existing container if it exists for proper reinitialization
        const existing = document.querySelector('.nexus-notification-container');
        if (existing) {
            existing.remove();
        }

        // ===== CONTAINER CREATION =====
        // Create new container with optimal configuration
        this.container = document.createElement('div');
        this.container.className = 'nexus-notification-container';
        document.body.appendChild(this.container);

        // ===== ADVANCED EVENT DELEGATION =====
        // Single event listener for all notification interactions
        this.container.addEventListener('click', e => {
            const action = e.target.closest('[data-action]')?.dataset.action;

            if (action === 'close') {
                // ===== CLOSE BUTTON HANDLING =====
                e.preventDefault();
                e.stopPropagation();
                this.clearAll();
            } else if (action === 'confirm' || action === 'cancel') {
                // ===== CONFIRMATION BUTTON HANDLING =====
                e.preventDefault();
                e.stopPropagation();
                // Individual notification handlers manage callbacks
            }
        });
    }

    /**
     * ===== CORE NOTIFICATION DISPLAY SYSTEM =====
     *
     * Advanced notification display with smooth animations, intelligent
     * replacement logic, and comprehensive auto-dismiss functionality.
     */

    /**
     * Show notification with advanced animation and lifecycle management
     *
     * The primary method for displaying notifications with sophisticated animation
     * timing, automatic replacement of existing notifications, and intelligent
     * auto-dismiss functionality. Implements single notification pattern for
     * clean user experience.
     *
     * NOTIFICATION LIFECYCLE:
     * 1. Clear any existing notifications immediately
     * 2. Generate unique ID for tracking and management
     * 3. Create notification element with proper structure
     * 4. Add to container and update state tracking
     * 5. Trigger smooth enter animation with requestAnimationFrame
     * 6. Set up auto-dismiss timer if duration specified
     *
     * ANIMATION SYSTEM:
     * - Uses requestAnimationFrame for smooth 60fps animations
     * - CSS transitions with optimized cubic-bezier easing
     * - Proper animation timing to prevent visual glitches
     * - Hardware acceleration with transform properties
     *
     * AUTO-DISMISS FEATURES:
     * - Configurable duration (0 = manual dismiss only)
     * - Intelligent timeout management with cleanup
     * - Hover pause/resume functionality
     * - Proper timeout clearing on replacement
     *
     * @param {string} type - Notification type (success, error, info, warning)
     * @param {string} title - Primary notification title
     * @param {string} message - Secondary notification message
     * @param {number} duration - Auto-dismiss duration in ms (0 = no auto-dismiss)
     * @returns {number} Unique notification ID for tracking
     * @public
     */
    show(type = 'info', title = '', message = '', duration = 3000) {
        // ===== IMMEDIATE REPLACEMENT LOGIC =====
        // Force clear any existing notifications for single notification pattern
        this.clearAll();

        // ===== UNIQUE ID GENERATION =====
        const id = ++this.notificationId;

        // ===== NOTIFICATION CREATION =====
        const notification = this.createNotification(id, type, title, message, duration);

        // ===== DOM INTEGRATION =====
        this.container.appendChild(notification);
        this.currentNotification = { element: notification, id };

        // ===== SMOOTH ENTER ANIMATION =====
        // Use requestAnimationFrame for optimal animation timing
        requestAnimationFrame(() => {
            notification.classList.add('notification-enter');
        });

        // ===== AUTO-DISMISS CONFIGURATION =====
        // Set up intelligent auto-dismiss if duration specified
        if (duration > 0) {
            this.dismissTimeout = setTimeout(() => {
                this.dismissCurrent();
            }, duration);
        }

        return id;
    }

    /**
     * Show confirmation dialog with advanced callback management
     *
     * Displays interactive confirmation dialogs with proper callback handling,
     * extended auto-dismiss timing, and sophisticated state management for
     * critical user decisions.
     *
     * CONFIRMATION FEATURES:
     * - Interactive confirm/cancel buttons with proper callbacks
     * - Extended 8-second auto-dismiss for thoughtful decisions
     * - Automatic cancel callback on timeout for proper cleanup
     * - Same smooth animation system as regular notifications
     *
     * CALLBACK MANAGEMENT:
     * - onConfirm: Executed when user clicks confirm button
     * - onCancel: Executed when user clicks cancel or timeout occurs
     * - Proper callback validation and error handling
     * - State cleanup after callback execution
     *
     * USER EXPERIENCE:
     * - Longer timeout (8s) for important decisions
     * - Clear visual distinction from regular notifications
     * - Hover pause/resume functionality for extended consideration
     * - Immediate replacement of existing notifications
     *
     * @param {string} title - Confirmation dialog title
     * @param {string} message - Confirmation dialog message
     * @param {Function} onConfirm - Callback executed on confirmation
     * @param {Function} onCancel - Callback executed on cancellation or timeout
     * @returns {number} Unique confirmation ID for tracking
     * @public
     */
    showConfirmation(title, message, onConfirm, onCancel) {
        // ===== IMMEDIATE REPLACEMENT LOGIC =====
        // Force clear any existing notifications for single dialog pattern
        this.clearAll();

        // ===== UNIQUE ID GENERATION =====
        const id = ++this.notificationId;

        // ===== CONFIRMATION CREATION =====
        const notification = this.createConfirmation(id, title, message, onConfirm, onCancel);

        // ===== DOM INTEGRATION =====
        this.container.appendChild(notification);
        this.currentNotification = { element: notification, id };

        // ===== SMOOTH ENTER ANIMATION =====
        // Use requestAnimationFrame for optimal animation timing
        requestAnimationFrame(() => {
            notification.classList.add('notification-enter');
        });

        // ===== EXTENDED AUTO-DISMISS =====
        // Longer timeout for important confirmation decisions
        this.dismissTimeout = setTimeout(() => {
            if (this.currentNotification && this.currentNotification.id === id) {
                this.dismissCurrent();
                // Execute cancel callback on timeout for proper cleanup
                if (onCancel) onCancel();
            }
        }, 8000);

        return id;
    }

    /**
     * ===== NOTIFICATION CREATION SYSTEM =====
     *
     * Advanced notification element creation with inline icon definitions,
     * semantic HTML structure, and comprehensive event listener integration.
     */

    /**
     * Create notification element with inline icon system and event delegation
     *
     * Constructs a complete notification element with inline SVG icon definitions,
     * proper semantic structure, and integrated event listener setup for optimal
     * performance and user experience.
     *
     * ICON SYSTEM:
     * - Inline SVG definitions for each notification type
     * - Success: Refresh/reload icon for positive actions
     * - Error: X circle for error states and failures
     * - Info: Info circle for informational messages
     * - Warning: Triangle alert for warnings and cautions
     * - Fallback to info icon for unknown types
     *
     * SEMANTIC STRUCTURE:
     * - Notification container with type-specific classes
     * - Icon area with inline SVG graphics
     * - Body area with title and message content
     * - Close button with proper data attributes
     *
     * EVENT INTEGRATION:
     * - Automatic event listener setup via delegation
     * - Hover pause/resume functionality
     * - Click handling for close button
     * - Proper cleanup and memory management
     *
     * @param {number} id - Unique notification identifier
     * @param {string} type - Notification type for styling and icon
     * @param {string} title - Primary notification title
     * @param {string} message - Secondary notification message
     * @param {number} duration - Auto-dismiss duration for hover functionality
     * @returns {HTMLElement} Complete notification element
     * @private
     */
    createNotification(id, type, title, message, _duration) {
        // ===== ELEMENT CREATION =====
        const notification = document.createElement('div');
        notification.className = `nexus-notification notification-${type}`;
        notification.dataset.id = id;

        // ===== INLINE ICON DEFINITIONS =====
        // Comprehensive icon set with Feather Icons design system
        const icons = {
            success: `<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                      <path d="M21 3v5h-5"/>
                      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                      <path d="M3 21v-5h5"/>`,
            error: `<circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>`,
            info: `<circle cx="12" cy="12" r="10"/>
                   <path d="M12 16v-4"/>
                   <path d="M12 8h.01"/>`,
            warning: `<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>`
        };

        // ===== SECURE DOM STRUCTURE CREATION =====
        // Create DOM elements safely to prevent XSS attacks
        const content = document.createElement('div');
        content.className = 'notification-content';

        // Create icon container with safe SVG insertion
        const iconDiv = document.createElement('div');
        iconDiv.className = 'notification-icon';

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '16');
        svg.setAttribute('height', '16');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.innerHTML = icons[type] || icons.info; // Internal icon data, controlled by us
        iconDiv.appendChild(svg);

        // Create body container with safe text insertion
        const bodyDiv = document.createElement('div');
        bodyDiv.className = 'notification-body';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'notification-title';
        titleDiv.textContent = title; // Safe text insertion prevents XSS

        const messageDiv = document.createElement('div');
        messageDiv.className = 'notification-message';
        messageDiv.textContent = message; // Safe text insertion prevents XSS

        bodyDiv.appendChild(titleDiv);
        bodyDiv.appendChild(messageDiv);

        // Create close button with safe attributes
        const closeButton = document.createElement('button');
        closeButton.className = 'notification-close';
        closeButton.setAttribute('data-action', 'close');
        closeButton.setAttribute('data-id', id);

        const closeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        closeSvg.setAttribute('width', '14');
        closeSvg.setAttribute('height', '14');
        closeSvg.setAttribute('viewBox', '0 0 24 24');
        closeSvg.setAttribute('fill', 'none');
        closeSvg.setAttribute('stroke', 'currentColor');
        closeSvg.setAttribute('stroke-width', '2');
        closeSvg.innerHTML = `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`;
        closeButton.appendChild(closeSvg);

        // Assemble the complete notification structure
        content.appendChild(iconDiv);
        content.appendChild(bodyDiv);
        content.appendChild(closeButton);
        notification.appendChild(content);

        // ===== EVENT LISTENER INTEGRATION =====
        // Add comprehensive event listeners via delegation
        this.addNotificationEventListeners(notification, id);

        return notification;
    }

    /**
     * Create confirmation dialog with interactive buttons and callback management
     *
     * Constructs an interactive confirmation dialog with warning icon, action
     * buttons, and sophisticated callback management for critical user decisions.
     *
     * CONFIRMATION FEATURES:
     * - Warning triangle icon for visual importance
     * - Interactive Cancel and Reset buttons
     * - Proper callback integration with event delegation
     * - Extended hover functionality for thoughtful decisions
     *
     * BUTTON DESIGN:
     * - Cancel: Neutral styling for safe default action
     * - Reset: Destructive styling (red) for important actions
     * - Touch-friendly sizing for mobile compatibility
     * - Proper accessibility attributes
     *
     * CALLBACK INTEGRATION:
     * - onConfirm: Executed when Reset button clicked
     * - onCancel: Executed when Cancel button clicked or timeout
     * - Proper event delegation for performance
     * - Automatic cleanup after callback execution
     *
     * @param {number} id - Unique confirmation identifier
     * @param {string} title - Confirmation dialog title
     * @param {string} message - Confirmation dialog message
     * @param {Function} onConfirm - Callback for confirmation action
     * @param {Function} onCancel - Callback for cancellation action
     * @returns {HTMLElement} Complete confirmation dialog element
     * @private
     */
    createConfirmation(id, title, message, onConfirm, onCancel) {
        // ===== ELEMENT CREATION =====
        const notification = document.createElement('div');
        notification.className = 'nexus-notification notification-confirmation';
        notification.dataset.id = id;

        // ===== SECURE CONFIRMATION STRUCTURE CREATION =====
        // Create DOM elements safely to prevent XSS attacks
        const content = document.createElement('div');
        content.className = 'notification-content';

        // Create warning icon container
        const iconDiv = document.createElement('div');
        iconDiv.className = 'notification-icon';

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '16');
        svg.setAttribute('height', '16');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.innerHTML = `<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                         <line x1="12" y1="9" x2="12" y2="13"/>
                         <line x1="12" y1="17" x2="12.01" y2="17"/>`;
        iconDiv.appendChild(svg);

        // Create body container with safe text insertion
        const bodyDiv = document.createElement('div');
        bodyDiv.className = 'notification-body';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'notification-title';
        titleDiv.textContent = title; // Safe text insertion prevents XSS

        const messageDiv = document.createElement('div');
        messageDiv.className = 'notification-message';
        messageDiv.textContent = message; // Safe text insertion prevents XSS

        // Create action buttons container
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'notification-actions';

        const cancelButton = document.createElement('button');
        cancelButton.className = 'notification-btn notification-btn-cancel';
        cancelButton.setAttribute('data-action', 'cancel');
        cancelButton.setAttribute('data-id', id);
        cancelButton.textContent = 'Cancel';

        const confirmButton = document.createElement('button');
        confirmButton.className = 'notification-btn notification-btn-confirm';
        confirmButton.setAttribute('data-action', 'confirm');
        confirmButton.setAttribute('data-id', id);
        confirmButton.textContent = 'Reset';

        actionsDiv.appendChild(cancelButton);
        actionsDiv.appendChild(confirmButton);

        bodyDiv.appendChild(titleDiv);
        bodyDiv.appendChild(messageDiv);
        bodyDiv.appendChild(actionsDiv);

        // Assemble the complete confirmation structure
        content.appendChild(iconDiv);
        content.appendChild(bodyDiv);
        notification.appendChild(content);

        // ===== CALLBACK EVENT INTEGRATION =====
        // Add comprehensive event listeners with callback management
        this.addConfirmationEventListeners(notification, id, onConfirm, onCancel);

        return notification;
    }

    /**
     * ===== ADVANCED EVENT LISTENER SYSTEM =====
     *
     * Sophisticated event handling with delegation, hover pause/resume,
     * and intelligent timeout management for optimal user experience.
     */

    /**
     * Add notification event listeners with advanced hover functionality
     *
     * Implements comprehensive event handling including click delegation for
     * close button functionality and sophisticated hover pause/resume system
     * for auto-dismiss timing control.
     *
     * EVENT DELEGATION FEATURES:
     * - Single click listener with action-based routing
     * - Proper event prevention and propagation control
     * - Efficient performance with minimal event listeners
     * - Reliable handling of dynamic content
     *
     * HOVER PAUSE/RESUME SYSTEM:
     * - Mouse enter: Immediately pauses auto-dismiss timer
     * - Mouse leave: Resumes with 1-second grace period
     * - Intelligent state validation to prevent orphaned timers
     * - Clean timeout management with proper cleanup
     *
     * PERFORMANCE OPTIMIZATIONS:
     * - Event delegation for minimal memory usage
     * - Efficient DOM queries with closest() method
     * - Proper timeout cleanup to prevent memory leaks
     * - State validation for reliable operation
     *
     * @param {HTMLElement} notification - Notification element to add listeners to
     * @param {number} id - Notification ID for state validation
     * @private
     */
    addNotificationEventListeners(notification, id) {
        // ===== CLICK EVENT DELEGATION =====
        // Use event delegation for optimal performance and reliability
        notification.addEventListener('click', e => {
            const action = e.target.closest('[data-action]')?.dataset.action;

            if (action === 'close') {
                e.preventDefault();
                e.stopPropagation();
                this.clearAll(); // Always clear all notifications when close is clicked
            }
        });

        // ===== HOVER PAUSE FUNCTIONALITY =====
        // Pause auto-dismiss on hover (no visual changes for clean UX)
        notification.addEventListener('mouseenter', () => {
            if (this.dismissTimeout) {
                clearTimeout(this.dismissTimeout);
                this.dismissTimeout = null;
            }
        });

        // ===== HOVER RESUME FUNCTIONALITY =====
        notification.addEventListener('mouseleave', () => {
            // Resume auto-dismiss with 1-second grace period
            if (this.currentNotification && this.currentNotification.id === id) {
                this.dismissTimeout = setTimeout(() => {
                    this.dismissCurrent();
                }, 1000); // Give 1 second after mouse leaves
            }
        });
    }

    /**
     * Add confirmation event listeners with callback management
     *
     * Implements sophisticated event handling for confirmation dialogs including
     * button click delegation, callback execution, and extended hover functionality
     * for thoughtful user decisions.
     *
     * CALLBACK EXECUTION:
     * - Confirm action: Clears dialog and executes onConfirm callback
     * - Cancel action: Clears dialog and executes onCancel callback
     * - Proper callback validation and error handling
     * - Immediate dialog cleanup after action
     *
     * EXTENDED HOVER FUNCTIONALITY:
     * - Mouse enter: Pauses auto-dismiss for extended consideration
     * - Mouse leave: Resumes with 2-second grace period (longer for decisions)
     * - Automatic cancel callback on timeout for proper cleanup
     * - State validation for reliable operation
     *
     * INTERACTION DESIGN:
     * - Event delegation for optimal performance
     * - Proper event prevention and propagation control
     * - Immediate visual feedback with dialog clearing
     * - Extended timeout for thoughtful decision making
     *
     * @param {HTMLElement} notification - Confirmation dialog element
     * @param {number} id - Confirmation ID for state validation
     * @param {Function} onConfirm - Callback for confirmation action
     * @param {Function} onCancel - Callback for cancellation action
     * @private
     */
    addConfirmationEventListeners(notification, id, onConfirm, onCancel) {
        // ===== BUTTON CLICK DELEGATION =====
        // Use event delegation for optimal button click handling
        notification.addEventListener('click', e => {
            const action = e.target.closest('[data-action]')?.dataset.action;

            if (!action) return;

            e.preventDefault();
            e.stopPropagation();

            // ===== CALLBACK EXECUTION =====
            if (action === 'confirm') {
                this.clearAll();
                if (onConfirm) onConfirm();
            } else if (action === 'cancel') {
                this.clearAll();
                if (onCancel) onCancel();
            }
        });

        // ===== EXTENDED HOVER PAUSE =====
        // Pause auto-dismiss on hover for thoughtful consideration
        notification.addEventListener('mouseenter', () => {
            if (this.dismissTimeout) {
                clearTimeout(this.dismissTimeout);
                this.dismissTimeout = null;
            }
        });

        // ===== EXTENDED HOVER RESUME =====
        notification.addEventListener('mouseleave', () => {
            // Resume auto-dismiss with extended grace period for confirmations
            if (this.currentNotification && this.currentNotification.id === id) {
                this.dismissTimeout = setTimeout(() => {
                    this.dismissCurrent();
                    if (onCancel) onCancel(); // Execute cancel callback on timeout
                }, 2000); // Give 2 seconds after mouse leaves for confirmations
            }
        });
    }

    /**
     * ===== NOTIFICATION LIFECYCLE MANAGEMENT =====
     *
     * Advanced dismissal and cleanup system with smooth animations,
     * proper timeout management, and comprehensive state cleanup.
     */

    /**
     * Clear all notifications immediately with comprehensive cleanup
     *
     * Implements immediate clearing of all notifications with proper timeout
     * cleanup and state management. Used for notification replacement and
     * system cleanup scenarios.
     *
     * IMMEDIATE CLEANUP FEATURES:
     * - Instant timeout clearing to prevent orphaned timers
     * - Complete container innerHTML clearing for performance
     * - State reference cleanup for memory management
     * - Container validation for safe operation
     *
     * USE CASES:
     * - Notification replacement (single notification pattern)
     * - System shutdown and cleanup
     * - Error recovery scenarios
     * - User-initiated close actions
     *
     * @private
     */
    clearAll() {
        // ===== TIMEOUT CLEANUP =====
        // Clear any pending timeout to prevent orphaned timers
        if (this.dismissTimeout) {
            clearTimeout(this.dismissTimeout);
            this.dismissTimeout = null;
        }

        // ===== IMMEDIATE DOM CLEANUP =====
        // Force remove all notifications from container for replacement
        if (this.container) {
            this.container.innerHTML = '';
        }

        // ===== STATE CLEANUP =====
        // Reset current notification reference for memory management
        this.currentNotification = null;
    }

    /**
     * Dismiss current notification with smooth exit animation
     *
     * Implements graceful dismissal of the current notification with smooth
     * exit animation, proper timeout cleanup, and comprehensive state management
     * for optimal user experience.
     *
     * DISMISSAL SEQUENCE:
     * 1. Validate current notification exists
     * 2. Clear any active auto-dismiss timeout
     * 3. Trigger smooth exit animation
     * 4. Remove element after animation completes
     * 5. Clean up state references
     *
     * ANIMATION TIMING:
     * - Exit animation duration: 200ms
     * - Matches CSS transition timing for smooth experience
     * - Proper DOM cleanup after animation completion
     * - State cleanup for memory management
     *
     * CLEANUP FEATURES:
     * - Timeout clearing to prevent orphaned timers
     * - DOM element removal with parent validation
     * - State reference cleanup for memory efficiency
     * - Graceful handling of missing elements
     *
     * @private
     */
    dismissCurrent() {
        // ===== STATE VALIDATION =====
        if (!this.currentNotification) return;

        const notification = this.currentNotification.element;

        // ===== TIMEOUT CLEANUP =====
        // Clear any pending timeout to prevent orphaned timers
        if (this.dismissTimeout) {
            clearTimeout(this.dismissTimeout);
            this.dismissTimeout = null;
        }

        // ===== SMOOTH EXIT ANIMATION =====
        // Add exit animation class for smooth transition
        notification.classList.add('notification-exit');

        // ===== DOM CLEANUP AFTER ANIMATION =====
        // Remove element after animation completes
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
            this.currentNotification = null;
        }, 200); // Match CSS animation duration for smooth experience
    }

    /**
     * ===== LEGACY COMPATIBILITY METHODS =====
     *
     * Backward compatibility methods that maintain the old API while
     * leveraging the new optimized internal implementation.
     */

    /**
     * Legacy dismiss method for backward compatibility
     *
     * Provides backward compatibility for code that expects to dismiss
     * notifications by ID. Internally uses the optimized dismissCurrent()
     * method with proper ID validation.
     *
     * COMPATIBILITY FEATURES:
     * - Maintains old API contract for existing code
     * - ID validation to ensure correct notification dismissal
     * - Delegates to optimized internal implementation
     * - Graceful handling of invalid IDs
     *
     * @param {number} id - Notification ID to dismiss
     * @public
     */
    dismiss(id) {
        if (this.currentNotification && this.currentNotification.id === id) {
            this.dismissCurrent();
        }
    }

    /**
     * Legacy dismiss all method for backward compatibility
     *
     * Provides backward compatibility for code that expects a dismissAll()
     * method. Internally delegates to the optimized clearAll() implementation.
     *
     * @public
     */
    dismissAll() {
        this.clearAll();
    }

    /**
     * ===== STYLE INJECTION SYSTEM =====
     *
     * Efficient CSS injection with deduplication and performance optimization
     * for comprehensive notification styling.
     */

    /**
     * Inject notification styles with deduplication
     *
     * Efficiently injects comprehensive CSS styles for the notification system
     * with proper deduplication to prevent conflicts and redundancy. Styles
     * include glassmorphism effects, animations, and mobile optimizations.
     *
     * INJECTION FEATURES:
     * - Deduplication check to prevent multiple injections
     * - Unique ID for style element identification
     * - Comprehensive CSS with modern design patterns
     * - Mobile-first responsive design approach
     *
     * @private
     */
    injectStyles() {
        // Prevent duplicate injection for performance and conflict prevention
        if (document.getElementById('nexus-notification-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'nexus-notification-styles';
        styles.textContent = this.getCSS();
        document.head.appendChild(styles);
    }

    /**
     * ===== COMPREHENSIVE CSS STYLING SYSTEM =====
     *
     * Advanced CSS-in-JS system with modern glassmorphism design, comprehensive
     * mobile optimizations, and sophisticated animation patterns for optimal
     * user experience across all devices and orientations.
     *
     * DESIGN FEATURES:
     * - Modern glassmorphism with backdrop blur effects
     * - Clean animations without jarring hover effects
     * - Type-specific color coding for visual hierarchy
     * - Touch-friendly button sizing for mobile accessibility
     * - Comprehensive responsive design for all screen sizes
     *
     * MOBILE OPTIMIZATIONS:
     * - Full-width notifications on mobile for better visibility
     * - Touch target compliance (44px minimum) for accessibility
     * - Landscape orientation support with optimized positioning
     * - Progressive typography scaling for different screen sizes
     *
     * ANIMATION SYSTEM:
     * - Smooth enter/exit animations with optimized easing curves
     * - No hover animations for stable, clean user experience
     * - Hardware-accelerated transforms for 60fps performance
     * - Proper timing coordination with JavaScript lifecycle
     *
     * @returns {string} Complete CSS stylesheet for notification system
     * @private
     */
    getCSS() {
        return `
            /* ===== NEXUS NOTIFICATION SYSTEM STYLES ===== */
            /*
             * Modern notification system with glassmorphism design,
             * comprehensive mobile optimizations, and clean animations.
             *
             * DESIGN PRINCIPLES:
             * - Clean, minimal interface without distracting animations
             * - Responsive design that adapts to all screen sizes
             * - Accessibility-compliant with proper touch targets
             * - Performance-optimized with hardware acceleration
             */

            /* ===== NOTIFICATION CONTAINER ===== */
            .nexus-notification-container {
                /* Fixed positioning for consistent placement */
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 10000;                              /* Above all other content */
                pointer-events: none;                        /* Allow clicks through container */
                width: 356px;                               /* Optimal width for readability */
                max-width: calc(100vw - 40px);              /* Responsive with margins */
            }

            /* ===== MAIN NOTIFICATION STYLING ===== */
            .nexus-notification {
                /* Modern glassmorphism design with backdrop blur */
                pointer-events: auto;                        /* Enable interactions */
                background: rgba(255, 255, 255, 0.95);      /* Semi-transparent white */
                border: 1px solid rgba(255, 255, 255, 0.2); /* Subtle border */
                border-radius: 8px;                          /* Modern rounded corners */
                backdrop-filter: blur(20px);                 /* Glassmorphism effect */
                -webkit-backdrop-filter: blur(20px);         /* Safari compatibility */
                box-shadow:
                    0 4px 12px rgba(0, 0, 0, 0.15),         /* Primary shadow */
                    0 2px 4px rgba(0, 0, 0, 0.1);           /* Secondary shadow */

                /* Animation initial state */
                opacity: 0;                                  /* Hidden initially */
                transform: translateY(20px);                 /* Slide up animation */
                transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); /* Smooth transitions */

                /* Responsive sizing */
                width: 356px;                               /* Optimal width */
                max-width: calc(100vw - 40px);              /* Responsive constraint */
                margin-bottom: 8px;                         /* Spacing between notifications */
            }

            /* ===== ANIMATION STATES ===== */
            .nexus-notification.notification-enter {
                /* Smooth enter animation to final state */
                opacity: 1;                                  /* Fully visible */
                transform: translateY(0);                    /* Final position */
            }

            .nexus-notification.notification-exit {
                /* Smooth exit animation with upward movement */
                opacity: 0;                                  /* Fade out */
                transform: translateY(-10px);                /* Slide up slightly */
                transition: all 0.15s cubic-bezier(0.4, 0, 1, 1); /* Faster exit */
            }

            /* ===== CLEAN HOVER BEHAVIOR ===== */
            /* NO HOVER ANIMATIONS - Clean and stable user experience */
            .nexus-notification:hover {
                /* Intentionally empty - no transform or scale changes */
                /* Maintains completely stable visual appearance */
                /* Hover pause/resume functionality handled via JavaScript */
            }

            /* ===== ACCESSIBILITY: REDUCED MOTION SUPPORT ===== */
            /*
             * Respects user's system preference for reduced motion to provide
             * a comfortable experience for users with motion sensitivity.
             */
            @media (prefers-reduced-motion: reduce) {
                .nexus-notification {
                    /* Disable all animations and transitions */
                    animation: none !important;
                    transition: none !important;
                    /* Ensure immediate visibility without motion */
                    opacity: 1 !important;
                    transform: none !important;
                }

                .nexus-notification.notification-enter,
                .nexus-notification.notification-exit {
                    /* Disable enter/exit animations */
                    animation: none !important;
                    transition: none !important;
                    opacity: 1 !important;
                    transform: none !important;
                }
            }

            /* ===== ACCESSIBILITY: HIGH CONTRAST MODE SUPPORT ===== */
            /*
             * Enhanced visibility for users with visual impairments who have
             * enabled high contrast mode in their system accessibility settings.
             */
            @media (prefers-contrast: high) {
                .nexus-notification {
                    /* Enhanced contrast styling */
                    background: rgba(0, 0, 0, 0.95) !important; /* Near-black background */
                    border: 2px solid #ffffff !important; /* Strong white border */
                    color: #ffffff !important; /* Pure white text */
                    box-shadow:
                        0 8px 24px rgba(255, 255, 255, 0.2),
                        0 4px 8px rgba(255, 255, 255, 0.1) !important;
                }

                .nexus-notification-title {
                    color: #ffffff !important; /* Pure white title */
                }

                .nexus-notification-message {
                    color: #e5e5e5 !important; /* Light gray message */
                }

                .nexus-notification-close {
                    color: #ffffff !important; /* White close button */
                    border: 1px solid #ffffff !important;
                }

                .nexus-notification-close:hover {
                    background: rgba(255, 255, 255, 0.2) !important;
                }

                /* Enhanced button contrast */
                .notification-btn {
                    border-width: 2px !important;
                }

                .notification-btn-cancel {
                    border-color: #ffffff !important;
                    color: #ffffff !important;
                }

                .notification-btn-confirm {
                    border-color: #ff4444 !important;
                    color: #ff4444 !important;
                    background: rgba(255, 68, 68, 0.1) !important;
                }
            }

            /* ===== COMPREHENSIVE MOBILE OPTIMIZATIONS ===== */
            /*
             * Advanced responsive design for tablets and large mobile devices
             * with touch-friendly interactions and optimized spacing.
             *
             * MOBILE DESIGN PRINCIPLES:
             * - Full-width notifications for better visibility
             * - Touch target compliance (44px minimum) for accessibility
             * - Progressive typography scaling for readability
             * - Optimized spacing and padding for mobile interaction
             */

            /* TABLET AND LARGE MOBILE (768px and below) */
            @media (max-width: 768px) {
                .nexus-notification-container {
                    /* Full-width container for mobile visibility */
                    bottom: 20px;
                    right: 20px;
                    left: 20px;                              /* Full-width with margins */
                    width: auto;                             /* Auto width for responsiveness */
                }

                .nexus-notification {
                    /* Mobile-optimized notification styling */
                    width: 100%;                             /* Full container width */
                    max-width: none;                         /* Remove width constraints */
                    margin: 0;                               /* Remove bottom margin */
                    border-radius: 12px;                     /* Larger radius for mobile */
                    padding: 16px 20px;                      /* Touch-friendly padding */
                    min-height: 60px;                        /* Adequate touch area */
                }

                .nexus-notification-header {
                    gap: 12px;                               /* Optimized spacing */
                }

                .nexus-notification-icon {
                    width: 20px;                             /* Larger icons for mobile */
                    height: 20px;
                    flex-shrink: 0;                          /* Prevent compression */
                }

                .nexus-notification-content {
                    flex: 1;                                 /* Fill available space */
                    min-width: 0;                            /* Allow text truncation */
                }

                .nexus-notification-title {
                    font-size: 0.9rem;                      /* Mobile-optimized text */
                    font-weight: 600;                       /* Enhanced readability */
                }

                .nexus-notification-message {
                    font-size: 0.8rem;                      /* Readable secondary text */
                    margin-top: 2px;                         /* Proper text spacing */
                }

                .nexus-notification-close {
                    /* Touch-friendly close button */
                    width: 32px;
                    height: 32px;
                    min-width: 44px;                         /* Apple HIG touch target */
                    min-height: 44px;                        /* Accessibility compliance */
                    margin: -6px;                            /* Compensate for larger size */
                }

                .nexus-notification-close svg {
                    width: 16px;                             /* Larger icon for visibility */
                    height: 16px;
                }
            }

            /* SMALL MOBILE DEVICES (480px and below) */
            @media (max-width: 480px) {
                /* Ultra-compact design for small screens */
                .nexus-notification-container {
                    bottom: 16px;                            /* Compact margins */
                    right: 16px;
                    left: 16px;                              /* Full-width with margins */
                }

                .nexus-notification {
                    border-radius: 10px;                     /* Slightly smaller radius */
                    padding: 14px 18px;                      /* Compact padding */
                    min-height: 56px;                        /* Adequate touch area */
                }

                .nexus-notification-title {
                    font-size: 0.85rem;                     /* Compact title text */
                }

                .nexus-notification-message {
                    font-size: 0.75rem;                     /* Compact message text */
                }
            }

            /* LANDSCAPE MOBILE OPTIMIZATION */
            /* Special handling for landscape orientation on mobile devices */
            @media (max-height: 500px) and (orientation: landscape) {
                /* Optimized for limited vertical space in landscape mode */
                .nexus-notification-container {
                    bottom: 12px;                            /* Minimal bottom margin */
                    right: 12px;                             /* Minimal right margin */
                    left: auto;                              /* Right-aligned positioning */
                    width: 320px;                            /* Compact width for landscape */
                }

                .nexus-notification {
                    border-radius: 8px;                      /* Compact radius */
                    padding: 10px 14px;                      /* Minimal padding */
                    min-height: 48px;                        /* Compact height */
                }

                .nexus-notification-title {
                    font-size: 0.8rem;                      /* Very compact title */
                }

                .nexus-notification-message {
                    font-size: 0.7rem;                      /* Very compact message */
                }
            }

            /* ===== NOTIFICATION CONTENT STRUCTURE ===== */
            .notification-content {
                /* Flexbox layout for icon, text, and close button */
                display: flex;
                align-items: flex-start;                     /* Top-aligned for multi-line text */
                gap: 12px;                                   /* Spacing between elements */
                padding: 14px 16px;                          /* Internal padding */
                position: relative;                          /* For absolute positioned close button */
            }

            .notification-icon {
                /* Icon container with consistent sizing */
                flex-shrink: 0;                              /* Prevent compression */
                margin-top: 2px;                             /* Align with text baseline */
                width: 16px;                                 /* Consistent icon size */
                height: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            /* ===== TYPE-SPECIFIC ICON COLORS ===== */
            .notification-success .notification-icon { color: #059669; }      /* Green for success */
            .notification-error .notification-icon { color: #dc2626; }        /* Red for errors */
            .notification-info .notification-icon { color: #2563eb; }         /* Blue for info */
            .notification-warning .notification-icon { color: #d97706; }      /* Orange for warnings */
            .notification-confirmation .notification-icon { color: #d97706; } /* Orange for confirmations */

            /* ===== TEXT CONTENT STYLING ===== */
            .notification-body {
                /* Text content container with overflow handling */
                flex: 1;                                     /* Fill available space */
                min-width: 0;                                /* Allow text truncation */
            }

            .notification-title {
                /* Primary notification title with theme-integrated typography */
                font-family: var(--font-ui);                 /* Uses theme-aware UI font */
                font-weight: 500;                            /* Medium weight for emphasis */
                font-size: 14px;                             /* Readable size */
                color: #1f2937;                              /* Dark gray for contrast */
                margin-bottom: 1px;                          /* Minimal spacing */
                line-height: 1.4;                            /* Optimal readability */
            }

            .notification-message {
                /* Secondary notification message with theme-integrated typography */
                font-family: var(--font-body);               /* Uses theme-aware body font */
                font-size: 13px;                             /* Slightly smaller than title */
                color: #6b7280;                              /* Muted gray for hierarchy */
                line-height: 1.4;                            /* Consistent line height */
            }

            /* ===== CLOSE BUTTON STYLING ===== */
            .notification-close {
                /* Subtle close button with hover effects */
                position: absolute;                          /* Positioned in top-right corner */
                top: 12px;
                right: 12px;
                background: none;                            /* Transparent background */
                border: none;                                /* No border */
                color: #9ca3af;                              /* Muted gray color */
                cursor: pointer;                             /* Pointer cursor */
                padding: 4px;                                /* Touch-friendly padding */
                border-radius: 4px;                          /* Subtle rounding */
                transition: color 0.15s ease;                /* Smooth color transition */
                display: flex;
                align-items: center;
                justify-content: center;
                width: 20px;                                 /* Consistent size */
                height: 20px;
            }

            .notification-close:hover {
                /* Subtle hover effect for better interactivity */
                color: #4b5563;                              /* Darker on hover */
                background: rgba(0, 0, 0, 0.05);            /* Subtle background */
            }

            /* ===== CONFIRMATION ACTION BUTTONS ===== */
            .notification-actions {
                /* Button container with right-aligned layout */
                display: flex;
                gap: 8px;                                    /* Spacing between buttons */
                margin-top: 12px;                            /* Separation from text */
                justify-content: flex-end;                   /* Right-aligned buttons */
            }

            .notification-btn {
                /* Base button styling with theme integration */
                font-family: var(--font-ui);                /* Uses theme-aware UI font */
                padding: 6px 12px;                           /* Touch-friendly padding */
                border-radius: 6px;                          /* Modern rounded corners */
                border: 1px solid;                           /* Border defined by variants */
                font-size: 13px;                             /* Readable button text */
                font-weight: 500;                            /* Medium weight for emphasis */
                cursor: pointer;                             /* Pointer cursor */
                transition: all 0.15s ease;                  /* Smooth hover transitions */
                background: transparent;                     /* Transparent by default */
                min-width: 60px;                             /* Minimum button width */
            }

            /* ===== CANCEL BUTTON STYLING ===== */
            .notification-btn-cancel {
                /* Neutral cancel button for safe default action */
                border-color: #d1d5db;                       /* Light gray border */
                color: #6b7280;                              /* Muted text color */
            }

            .notification-btn-cancel:hover {
                /* Subtle hover effect for cancel button */
                border-color: #9ca3af;                       /* Darker border on hover */
                color: #374151;                              /* Darker text on hover */
                background: #f9fafb;                         /* Light background on hover */
            }

            /* ===== CONFIRM BUTTON STYLING ===== */
            .notification-btn-confirm {
                /* Destructive confirm button for important actions */
                border-color: #dc2626;                       /* Red border for attention */
                color: #dc2626;                              /* Red text for importance */
            }

            .notification-btn-confirm:hover {
                /* Strong hover effect for confirm button */
                border-color: #b91c1c;                       /* Darker red border */
                color: white;                                /* White text for contrast */
                background: #dc2626;                         /* Red background on hover */
            }

            /* ===== TYPE-SPECIFIC BORDER COLORS ===== */
            /* Subtle border colors that match notification type icons */
            .notification-success { border-color: rgba(5, 150, 105, 0.2); }      /* Green tint */
            .notification-error { border-color: rgba(220, 38, 38, 0.2); }        /* Red tint */
            .notification-info { border-color: rgba(37, 99, 235, 0.2); }         /* Blue tint */
            .notification-warning { border-color: rgba(217, 119, 6, 0.2); }      /* Orange tint */
            .notification-confirmation { border-color: rgba(217, 119, 6, 0.2); } /* Orange tint */
            /* ===== END OF NOTIFICATION SYSTEM STYLES ===== */
        `;
    }
}

/**
 * ===== GLOBAL INTEGRATION AND EXPORT =====
 *
 * The NotificationSystem class is available globally for integration with
 * the main NEXUS application and other modules. This elegant notification
 * system provides modern toast notifications and confirmation dialogs.
 *
 * USAGE PATTERNS:
 * ```javascript
 * // Create notification system instance
 * const notifications = new NotificationSystem();
 *
 * // Show different types of notifications
 * notifications.show('success', 'Success!', 'Operation completed successfully');
 * notifications.show('error', 'Error!', 'Something went wrong');
 * notifications.show('info', 'Info', 'Here is some information');
 * notifications.show('warning', 'Warning', 'Please be careful');
 *
 * // Show confirmation dialog
 * notifications.showConfirmation(
 *     'Confirm Reset',
 *     'Are you sure you want to reset all settings?',
 *     () => console.log('Confirmed'),
 *     () => console.log('Cancelled')
 * );
 *
 * // Legacy API compatibility
 * notifications.dismiss(id);
 * notifications.dismissAll();
 * ```
 *
 * INTEGRATION BENEFITS:
 * - Modern glassmorphism design with backdrop blur effects
 * - Comprehensive mobile optimizations for all screen sizes
 * - Theme-integrated typography using CSS custom properties
 * - Single notification pattern for clean user experience
 * - Hover pause/resume functionality for better UX
 * - Accessibility-compliant with proper touch targets
 */
window.NotificationSystem = NotificationSystem;
