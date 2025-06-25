// Documentation pages JavaScript - Only preloader functionality

// DOM elements
const preloader = document.getElementById('preloader');

// Minimal Preloader with percentage counter (EXACT copy from blog)
function animatePreloader() {
    const counter = document.getElementById('preloaderCounter');
    if (!counter) return;

    let progress = 0;
    const duration = 800; // 0.8 seconds - optimized for modern UX
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        progress = Math.min((elapsed / duration) * 100, 100);
        
        counter.textContent = Math.floor(progress) + '%';

        if (progress < 100) {
            requestAnimationFrame(updateCounter);
        } else {
            // Small delay before hiding
            setTimeout(hidePreloader, 200);
        }
    }

    requestAnimationFrame(updateCounter);
}

function hidePreloader() {
    if (preloader) {
        preloader.classList.add('hidden');
        // Remove from DOM after transition
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 800); // Match CSS transition duration
    }
}

// Initialize preloader on page load
document.addEventListener('DOMContentLoaded', animatePreloader);
