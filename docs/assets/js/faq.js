/**
 * ===== NEXUS FAQ PAGE FUNCTIONALITY =====
 *
 * Interactive FAQ system with search, filtering, and elegant animations.
 * Follows NEXUS design principles with smooth interactions and accessibility.
 */

class FAQSystem {
    constructor() {
        this.faqData = null;
        this.currentFilter = 'all';
        this.searchQuery = '';
        
        // DOM elements
        this.searchInput = document.getElementById('faq-search');
        this.dropdownButton = document.getElementById('faq-dropdown-button');
        this.dropdownMenu = document.getElementById('faq-dropdown-menu');
        this.dropdownText = document.getElementById('dropdown-text');
        this.dropdownIcon = document.getElementById('dropdown-icon');
        this.contentContainer = document.getElementById('faq-content');
        this.noResultsContainer = document.getElementById('faq-no-results');
        
        this.init();
    }

    async init() {
        try {
            await this.loadFAQData();
            this.setupEventListeners();
            this.renderDropdown();
            this.renderFAQ();
        } catch (error) {
            console.error('Error initializing FAQ system:', error);
            this.showError();
        }
    }

    async loadFAQData() {
        try {
            // Try relative path first, then absolute path as fallback
            let response;
            try {
                response = await fetch('../assets/data/faq.json');
            } catch (e) {
                // Fallback to absolute path from docs root
                response = await fetch('/docs/assets/data/faq.json');
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.faqData = data.faq;
        } catch (error) {
            console.error('Error loading FAQ data:', error);
            // Fallback to inline data if fetch fails
            this.loadFallbackData();
        }
    }

    loadFallbackData() {
        // Minimal fallback data to ensure page works
        this.faqData = {
            categories: [
                {
                    id: 'installation',
                    title: 'Installation & Setup',
                    icon: 'download',
                    questions: [
                        {
                            id: 'install-chrome',
                            question: 'How do I install NEXUS New Tab Extension?',
                            answer: 'Download the latest version from our GitHub releases, extract the ZIP file, open Chrome\'s extension page (chrome://extensions/), enable Developer mode, and click \'Load unpacked\' to select the NEXUS folder.',
                            tags: ['installation', 'chrome', 'setup']
                        }
                    ]
                }
            ]
        };
    }

    setupEventListeners() {
        // Search input
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.renderFAQ();
            });
        }

        // Dropdown button
        if (this.dropdownButton) {
            this.dropdownButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDropdown();
            });
        }

        // Dropdown menu clicks
        if (this.dropdownMenu) {
            this.dropdownMenu.addEventListener('click', (e) => {
                const dropdownItem = e.target.closest('.faq-dropdown-item');
                if (dropdownItem) {
                    this.selectCategory(dropdownItem.dataset.filter);
                    this.closeDropdown();
                }
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.faq-category-dropdown')) {
                this.closeDropdown();
            }
        });

        // FAQ item clicks (event delegation)
        if (this.contentContainer) {
            this.contentContainer.addEventListener('click', (e) => {
                const faqQuestion = e.target.closest('.faq-question');
                if (faqQuestion) {
                    this.toggleFAQItem(faqQuestion.parentElement);
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && !e.target.matches('input, textarea, button')) {
                e.preventDefault();
                this.searchInput?.focus();
            }

            if (e.key === 'Escape') {
                this.closeDropdown();
            }
        });
    }

    renderDropdown() {
        if (!this.dropdownMenu || !this.faqData) return;

        const categories = [
            { id: 'all', title: 'All Questions', icon: 'list' },
            ...this.faqData.categories.map(cat => ({
                id: cat.id,
                title: cat.title,
                icon: cat.icon
            }))
        ];

        const dropdownHTML = categories.map(category => `
            <div class="faq-dropdown-item ${category.id === this.currentFilter ? 'active' : ''}"
                 data-filter="${category.id}">
                <div class="dropdown-item-icon">
                    ${this.getIconSVG(category.icon)}
                </div>
                <span class="dropdown-item-text">${category.title}</span>
            </div>
        `).join('');

        this.dropdownMenu.innerHTML = dropdownHTML;
        this.updateDropdownButton();
    }

    updateDropdownButton() {
        const categories = [
            { id: 'all', title: 'All Questions', icon: 'list' },
            ...this.faqData.categories.map(cat => ({
                id: cat.id,
                title: cat.title,
                icon: cat.icon
            }))
        ];

        const currentCategory = categories.find(cat => cat.id === this.currentFilter);
        if (currentCategory && this.dropdownText && this.dropdownIcon) {
            this.dropdownText.textContent = currentCategory.title;
            this.dropdownIcon.innerHTML = this.getIconSVG(currentCategory.icon);
        }
    }

    toggleDropdown() {
        if (!this.dropdownButton || !this.dropdownMenu) return;

        const isActive = this.dropdownButton.classList.contains('active');
        if (isActive) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        if (!this.dropdownButton || !this.dropdownMenu) return;

        this.dropdownButton.classList.add('active');
        this.dropdownMenu.classList.add('active');
        this.dropdownButton.setAttribute('aria-expanded', 'true');
    }

    closeDropdown() {
        if (!this.dropdownButton || !this.dropdownMenu) return;

        this.dropdownButton.classList.remove('active');
        this.dropdownMenu.classList.remove('active');
        this.dropdownButton.setAttribute('aria-expanded', 'false');
    }

    selectCategory(filter) {
        this.setFilter(filter);
        this.updateDropdownButton();

        // Update dropdown item states
        document.querySelectorAll('.faq-dropdown-item').forEach(item => {
            item.classList.toggle('active', item.dataset.filter === filter);
        });
    }

    renderFAQ() {
        if (!this.contentContainer || !this.faqData) return;

        const filteredQuestions = this.getFilteredQuestions();

        if (filteredQuestions.length === 0) {
            this.showNoResults();
            return;
        }

        this.hideNoResults();

        // Group questions by category
        const groupedQuestions = this.groupQuestionsByCategory(filteredQuestions);

        const faqHTML = Object.entries(groupedQuestions).map(([categoryId, questions]) => {
            const category = this.faqData.categories.find(cat => cat.id === categoryId);
            if (!category) return '';

            return `
                <div class="faq-section">
                    <h2 class="faq-section-title">
                        <div class="faq-section-icon">
                            ${this.getIconSVG(category.icon)}
                        </div>
                        ${category.title}
                    </h2>
                    ${questions.map(question => this.renderFAQItem(question)).join('')}
                </div>
            `;
        }).join('');

        this.contentContainer.innerHTML = faqHTML;
    }

    renderFAQItem(question) {
        return `
            <div class="faq-item" data-id="${question.id}">
                <div class="faq-question">
                    <h3 class="faq-question-text">${this.highlightSearchTerm(question.question)}</h3>
                    <div class="faq-question-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6,9 12,15 18,9"></polyline>
                        </svg>
                    </div>
                </div>
                <div class="faq-answer">
                    <p>${this.highlightSearchTerm(question.answer)}</p>
                    ${question.tags ? `
                        <div class="faq-tags">
                            ${question.tags.map(tag => `<span class="faq-tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    getFilteredQuestions() {
        if (!this.faqData) return [];

        let allQuestions = [];
        
        // Collect all questions from all categories
        this.faqData.categories.forEach(category => {
            category.questions.forEach(question => {
                allQuestions.push({
                    ...question,
                    categoryId: category.id
                });
            });
        });

        // Apply category filter
        if (this.currentFilter !== 'all') {
            allQuestions = allQuestions.filter(q => q.categoryId === this.currentFilter);
        }

        // Apply search filter
        if (this.searchQuery) {
            allQuestions = allQuestions.filter(question => {
                const searchableText = `${question.question} ${question.answer} ${question.tags?.join(' ') || ''}`.toLowerCase();
                return searchableText.includes(this.searchQuery);
            });
        }

        return allQuestions;
    }

    groupQuestionsByCategory(questions) {
        const grouped = {};
        
        questions.forEach(question => {
            if (!grouped[question.categoryId]) {
                grouped[question.categoryId] = [];
            }
            grouped[question.categoryId].push(question);
        });

        return grouped;
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.renderFAQ();
    }

    toggleFAQItem(faqItem) {
        const isActive = faqItem.classList.contains('active');
        
        // Close all other items for accordion behavior
        document.querySelectorAll('.faq-item.active').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });

        // Toggle current item
        faqItem.classList.toggle('active', !isActive);
    }

    highlightSearchTerm(text) {
        if (!this.searchQuery) return text;
        
        const regex = new RegExp(`(${this.escapeRegExp(this.searchQuery)})`, 'gi');
        return text.replace(regex, '<mark style="background: rgba(59, 130, 246, 0.3); color: inherit; padding: 0;">$1</mark>');
    }

    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    showNoResults() {
        this.contentContainer.style.display = 'none';
        this.noResultsContainer.style.display = 'block';
    }

    hideNoResults() {
        this.contentContainer.style.display = 'block';
        this.noResultsContainer.style.display = 'none';
    }

    showError() {
        if (this.contentContainer) {
            this.contentContainer.innerHTML = `
                <div class="faq-error">
                    <h3>Unable to load FAQ</h3>
                    <p>Please refresh the page or try again later.</p>
                </div>
            `;
        }
    }

    getIconSVG(iconName) {
        const icons = {
            list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
            download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" x2="12" y1="15" y2="3"/>',
            shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
            star: '<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>',
            palette: '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
            tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
            settings: '<circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m17-4a4 4 0 0 1-8 0 4 4 0 0 1 8 0zM7 17a4 4 0 0 1-8 0 4 4 0 0 1 8 0z"/>'
        };

        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${icons[iconName] || icons.list}</svg>`;
    }
}

// Initialize FAQ system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FAQSystem();
});
