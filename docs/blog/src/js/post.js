// Blog Post Renderer
class BlogPostRenderer {
    constructor() {
        this.article = document.getElementById('article');
        this.postNav = document.getElementById('postNav');
    }

    // Get current post ID from URL
    getCurrentPostId() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('id')) || 1;
    }

    // Render the blog post
    renderPost(post) {
        if (!post) {
            this.article.innerHTML = '<h1 class="heading-1">Post not found</h1>';
            return;
        }

        // Update page title
        document.title = `${post.title} — Mosaddiq`;

        // Render header
        const header = this.renderHeader(post);

        // Render content
        const content = this.renderContent(post.content);

        // Combine and set
        this.article.innerHTML = header + content;

        // Render navigation
        this.renderNavigation(post.navigation);

        // Highlight code blocks
        hljs.highlightAll();
    }

    // Render post header
    renderHeader(post) {
        return `
            <header class="meta">
                <h1 class="heading-1">${post.title}</h1>
                <p class="subtitle">${post.subtitle}</p>
                <div class="meta-info">
                    <span>${post.date}</span>
                    <span>${post.category}</span>
                    <span>${post.readTime}</span>
                </div>
            </header>
        `;
    }

    // Render content blocks
    renderContent(content) {
        // Preprocess content to handle markdown-style headings
        const processedContent = this.preprocessContent(content);

        return processedContent.map(block => {
            switch (block.type) {
                case 'paragraph':
                    return `<p class="paragraph">${this.processText(block.text)}</p>`;

                case 'heading':
                    return `<h${block.level} class="heading-${block.level}">${this.processText(block.text)}</h${block.level}>`;

                case 'list':
                    const items = block.items.map(item => `<li class="list-item">${this.processText(item)}</li>`).join('');
                    return `<ul class="list">${items}</ul>`;

                case 'table':
                    return this.renderTable(block);

                case 'quote':
                    return `<blockquote class="quote">${this.processText(block.text)}</blockquote>`;

                case 'code':
                    return `<div class="code-block"><pre><code class="language-${block.language}">${this.escapeHtml(block.code)}</code></pre></div>`;

                case 'divider':
                    return `<div class="divider"></div>`;

                case 'legend':
                    return this.renderLegend(block);

                default:
                    return '';
            }
        }).join('');
    }

    // Preprocess content to handle markdown-style headings and tables
    preprocessContent(content) {
        const processedContent = [];
        let i = 0;

        while (i < content.length) {
            const block = content[i];

            // Check if paragraph contains markdown heading
            if (block.type === 'paragraph' && block.text) {
                const headingMatch = block.text.match(/^(#{1,6})\s+(.+)$/);
                if (headingMatch) {
                    const level = headingMatch[1].length; // Count # symbols
                    const text = headingMatch[2].trim();
                    processedContent.push({
                        type: 'heading',
                        level: level,
                        text: text
                    });
                    i++;
                    continue;
                }

                // Check if paragraph contains markdown table header
                const tableHeaderMatch = block.text.match(/^\|(.+)\|$/);
                if (tableHeaderMatch && i + 1 < content.length) {
                    const nextBlock = content[i + 1];
                    // Check if next block is table separator (|---|---|)
                    if (nextBlock.type === 'paragraph' && nextBlock.text.match(/^\|[\s\-\|]+\|$/)) {
                        // Parse the table
                        const table = this.parseMarkdownTable(content, i);
                        if (table) {
                            processedContent.push(table.tableBlock);
                            i = table.nextIndex;
                            continue;
                        }
                    }
                }
            }

            processedContent.push(block);
            i++;
        }

        return processedContent;
    }

    // Parse markdown table starting from headerIndex
    parseMarkdownTable(content, headerIndex) {
        const headers = [];
        const rows = [];
        let legend = null;

        // Parse header row
        const headerText = content[headerIndex].text;
        const headerMatch = headerText.match(/^\|(.+)\|$/);
        if (!headerMatch) return null;

        const headerCells = headerMatch[1].split('|').map(cell => cell.trim());
        headers.push(...headerCells);

        // Skip separator row (already validated)
        let currentIndex = headerIndex + 2;

        // Parse data rows
        while (currentIndex < content.length) {
            const block = content[currentIndex];
            if (block.type !== 'paragraph') break;

            const rowMatch = block.text.match(/^\|(.+)\|$/);
            if (!rowMatch) {
                // Check if this is a legend line that follows the table
                if (block.text.includes('Legend') || block.text.includes('legend')) {
                    legend = block.text;
                    currentIndex++;
                }
                break;
            }

            const rowCells = rowMatch[1].split('|').map(cell => cell.trim());
            rows.push(rowCells);
            currentIndex++;
        }

        return {
            tableBlock: {
                type: 'table',
                headers: headers,
                rows: rows,
                legend: legend
            },
            nextIndex: currentIndex
        };
    }

    // Render table
    renderTable(tableData) {
        if (!tableData.headers || !tableData.rows) return '';

        const headers = tableData.headers.map(header =>
            `<th class="table-header">${this.processText(header)}</th>`
        ).join('');

        const rows = tableData.rows.map(row => {
            const cells = row.map(cell =>
                `<td class="table-cell">${this.processText(cell)}</td>`
            ).join('');
            return `<tr class="table-row">${cells}</tr>`;
        }).join('');

        const legendFooter = tableData.legend ?
            `<tfoot class="table-footer">
                <tr>
                    <td colspan="${tableData.headers.length}" class="table-legend">
                        ${this.processText(tableData.legend)}
                    </td>
                </tr>
            </tfoot>` : '';

        return `
            <div class="table-container">
                <table class="data-table">
                    <thead class="table-head">
                        <tr class="table-row">${headers}</tr>
                    </thead>
                    <tbody class="table-body">
                        ${rows}
                    </tbody>
                    ${legendFooter}
                </table>
            </div>
        `;
    }

    // Render legend component
    renderLegend(legendData) {
        if (!legendData.items || !Array.isArray(legendData.items)) return '';

        const items = legendData.items.map(item => `
            <div class="legend-item">
                <div class="legend-icon">${this.processText(item.icon)}</div>
                <div class="legend-content">
                    <div class="legend-label">${this.processText(item.label)}</div>
                    <div class="legend-description">${this.processText(item.description)}</div>
                </div>
            </div>
        `).join('');

        return `
            <div class="legend">
                <div class="legend-items">
                    ${items}
                </div>
            </div>
        `;
    }

    // Process text with markdown-like formatting and SVG icons
    processText(text) {
        return text
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            // Handle emojis - order matters to avoid double replacement
            .replace(/⚠️/g, this.getSvgIcon('warning'))  // Handle compound emoji first
            .replace(/✅/g, this.getSvgIcon('check'))
            .replace(/❌/g, this.getSvgIcon('cross'));
    }

    // Get SVG icon by name
    getSvgIcon(name) {
        const icons = {
            check: `<svg class="icon icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6L9 17l-5-5"/>
            </svg>`,

            warning: `<svg class="icon icon-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>`,

            cross: `<svg class="icon icon-cross" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>`
        };

        return icons[name] || '';
    }

    // Escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Render navigation
    renderNavigation(nav) {
        if (!nav.next && !nav.prev) {
            this.postNav.style.display = 'none';
            return;
        }

        let navHtml = '';

        if (nav.prev) {
            navHtml += `
                <a href="post.html?id=${nav.prev.id}" class="nav-link nav-prev">
                    <div class="nav-label">Previous</div>
                    <div class="nav-title">${nav.prev.title}</div>
                </a>
            `;
        }

        if (nav.next) {
            navHtml += `
                <a href="post.html?id=${nav.next.id}" class="nav-link nav-next">
                    <div class="nav-label">Next</div>
                    <div class="nav-title">${nav.next.title}</div>
                </a>
            `;
        }

        this.postNav.innerHTML = navHtml;
    }
}

// Minimal Preloader for blog posts
function animatePreloader() {
    const counter = document.getElementById('preloaderCounter');
    if (!counter) return;

    let progress = 0;
    const duration = 600; // 0.6 seconds - faster for content pages
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        progress = Math.min((elapsed / duration) * 100, 100);

        counter.textContent = Math.floor(progress) + '%';

        if (progress < 100) {
            requestAnimationFrame(updateCounter);
        } else {
            // Small delay before hiding
            setTimeout(hidePreloader, 150);
        }
    }

    requestAnimationFrame(updateCounter);
}

function hidePreloader() {
    const preloader = document.getElementById('preloader');
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const renderer = new BlogPostRenderer();
    const postId = renderer.getCurrentPostId();

    // Handle different blog posts
    let post = null;

    if (postId === 1 && typeof blogPost01 !== 'undefined') {
        post = blogPost01;
    } else if (postId === 2 && typeof blogPost02 !== 'undefined') {
        post = blogPost02;
    } else if (postId === 3 && typeof blogPost03 !== 'undefined') {
        post = blogPost03;
    } else if (postId === 4 && typeof blogPost04 !== 'undefined') {
        post = blogPost04;
    } else if (postId === 5 && typeof blogPost05 !== 'undefined') {
        post = blogPost05;
    } else if (postId === 6 && typeof blogPost06 !== 'undefined') {
        post = blogPost06;
    } else if (postId === 7 && typeof blogPost07 !== 'undefined') {
        post = blogPost07;
    } else if (postId === 8 && typeof blogPost08 !== 'undefined') {
        post = blogPost08;
    } else if (postId === 9 && typeof blogPost09 !== 'undefined') {
        post = blogPost09;
    } else if (postId === 10 && typeof blogPost10 !== 'undefined') {
        post = blogPost10;
    } else if (postId === 11 && typeof blogPost11 !== 'undefined') {
        post = blogPost11;
    }

    renderer.renderPost(post);

    // Start preloader animation
    animatePreloader();
});
