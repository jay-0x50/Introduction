/**
 * Portfolio Animation Module
 * Handles all animations and interactive effects
 */

// ══════════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ══════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    initFadeInObserver();
    initParallaxEffect();
    initPageScrollIndicator();
    initStaggeredListAnimation();
    initCounter();
});

// ══════════════════════════════════════════════════════════════════════════════
// FADE-IN ANIMATION WITH INTERSECTION OBSERVER
// ══════════════════════════════════════════════════════════════════════════════

function initFadeInObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all pages
    document.querySelectorAll('.page').forEach((page, index) => {
        // 첫 페이지(index 0)는 바로 visible 표시
        if (index === 0) {
            page.classList.add('fade-in-visible');
        } else {
            page.classList.add('fade-in-element');
            page.style.animationDelay = `${index * 0.1}s`;
            observer.observe(page);
        }
    });

    // Add animation styles dynamically
    if (!document.getElementById('fade-in-styles')) {
        const style = document.createElement('style');
        style.id = 'fade-in-styles';
        style.textContent = `
            .fade-in-element {
                opacity: 0;
                transform: translateY(30px);
                animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }

            .fade-in-visible {
                animation: none !important;
                opacity: 1 !important;
                transform: translateY(0) !important;
            }

            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ══════════════════════════════════════════════════════════════════════════════
// PARALLAX EFFECT
// ══════════════════════════════════════════════════════════════════════════════

function initParallaxEffect() {
    const pages = document.querySelectorAll('.page');
    
    window.addEventListener('scroll', () => {
        pages.forEach((page) => {
            const rect = page.getBoundingClientRect();
            const scrollPercent = -rect.top / innerHeight;
            const parallaxDistance = scrollPercent * 30;
            
            // Apply parallax to page gradients
            page.style.transform = `translateY(${parallaxDistance}px)`;
        });
    }, { passive: true });
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE SCROLL INDICATOR
// ══════════════════════════════════════════════════════════════════════════════

function initPageScrollIndicator() {
    const style = document.createElement('style');
    style.textContent = `
        .scroll-indicator {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 100;
            opacity: 0.6;
            transition: opacity 0.3s;
        }

        .scroll-indicator:hover {
            opacity: 1;
        }

        .scroll-indicator__text {
            font-family: 'Inconsolata', monospace;
            font-size: 0.78rem;
            color: var(--neon);
            letter-spacing: 0.1em;
            text-align: right;
            margin-bottom: 8px;
        }

        .scroll-indicator__bar {
            width: 32px;
            height: 2px;
            background: var(--border);
            border-radius: 1px;
            position: relative;
            overflow: hidden;
        }

        .scroll-indicator__fill {
            height: 100%;
            background: linear-gradient(90deg, var(--neon), rgba(57, 255, 154, 0.5));
            border-radius: 1px;
            transition: width 0.2s ease;
        }

        @media (max-width: 768px) {
            .scroll-indicator {
                bottom: 16px;
                right: 16px;
            }

            .scroll-indicator__text {
                font-size: 0.7rem;
            }

            .scroll-indicator__bar {
                width: 24px;
            }
        }
    `;
    document.head.appendChild(style);

    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = `
        <div class="scroll-indicator__text">SCROLL</div>
        <div class="scroll-indicator__bar">
            <div class="scroll-indicator__fill"></div>
        </div>
    `;
    document.body.appendChild(indicator);

    const pages = document.querySelectorAll('.page');
    const totalPages = pages.length;

    window.addEventListener('scroll', () => {
        const scrollableHeight = document.documentElement.scrollHeight - innerHeight;
        const scrolled = window.scrollY / scrollableHeight;
        const fillPercent = Math.min(scrolled * 100, 100);

        indicator.querySelector('.scroll-indicator__fill').style.width = fillPercent + '%';

        const currentPage = Math.floor(scrolled * totalPages) + 1;
        indicator.querySelector('.scroll-indicator__text').textContent = `${currentPage} / ${totalPages}`;
    }, { passive: true });
}

// ══════════════════════════════════════════════════════════════════════════════
// STAGGERED LIST ANIMATION
// ══════════════════════════════════════════════════════════════════════════════

function initStaggeredListAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        .detail-list li {
            opacity: 1;
            animation: slideInLeft 0.6s ease forwards;
        }

        .detail-list li:nth-child(1) { animation-delay: 0.1s; }
        .detail-list li:nth-child(2) { animation-delay: 0.2s; }
        .detail-list li:nth-child(3) { animation-delay: 0.3s; }
        .detail-list li:nth-child(4) { animation-delay: 0.4s; }
        .detail-list li:nth-child(5) { animation-delay: 0.5s; }

        .stack-block {
            opacity: 1;
            animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .stack-block:nth-child(1) { animation-delay: 0.05s; }
        .stack-block:nth-child(2) { animation-delay: 0.1s; }
        .stack-block:nth-child(3) { animation-delay: 0.15s; }
        .stack-block:nth-child(4) { animation-delay: 0.2s; }
        .stack-block:nth-child(5) { animation-delay: 0.25s; }
        .stack-block:nth-child(6) { animation-delay: 0.3s; }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lists = entry.target.querySelectorAll('.detail-list');
                const stacks = entry.target.querySelectorAll('.stack-grid .stack-block');
                
                lists.forEach(list => {
                    list.style.animation = 'none';
                });
                
                stacks.forEach(stack => {
                    stack.style.animation = 'none';
                });
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.page').forEach(page => {
        observer.observe(page);
    });
}

// ══════════════════════════════════════════════════════════════════════════════
// COUNTER ANIMATION FOR NUMBERS
// ══════════════════════════════════════════════════════════════════════════════

function initCounter() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const pageNumber = entry.target.querySelector('.page-number');
                if (pageNumber) {
                    animateCounter(pageNumber);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.page').forEach(page => {
        observer.observe(page);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const match = text.match(/(\d+)/);
    
    if (!match) return;

    const finalNumber = parseInt(match[1]);
    const duration = 600;
    const startTime = Date.now();
    const prefix = text.substring(0, match.index);
    const suffix = text.substring(match.index + match[0].length);

    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentNumber = Math.floor(finalNumber * progress);
        
        element.textContent = prefix + String(currentNumber).padStart(2, '0') + suffix;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    animate();
}

// ══════════════════════════════════════════════════════════════════════════════
// HOVER EFFECTS FOR INTERACTIVE ELEMENTS
// ══════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .stack-block {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: crosshair;
        }

        .stack-block:hover {
            background: rgba(57, 255, 154, 0.08);
            border-color: rgba(57, 255, 154, 0.3);
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(57, 255, 154, 0.15);
        }

        .stack-block:hover .stack-title {
            color: #39ff9a;
            text-shadow: 0 0 12px rgba(57, 255, 154, 0.5);
        }

        .contact-item a {
            position: relative;
            transition: color 0.3s;
        }

        .contact-item a::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 1px;
            background: var(--neon);
            transition: width 0.3s;
        }

        .contact-item a:hover::after {
            width: 100%;
        }

        .card-link {
            position: relative;
            transition: all 0.3s;
        }

        .card-link:hover {
            color: var(--neon);
            padding-bottom: 4px;
        }
    `;
    document.head.appendChild(style);
});

// ══════════════════════════════════════════════════════════════════════════════
// SMOOTH SCROLL ENHANCEMENT
// ══════════════════════════════════════════════════════════════════════════════

// Already defined in CSS: html { scroll-behavior: smooth; }

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    const pages = Array.from(document.querySelectorAll('.page'));
    const currentPage = pages.find(page => {
        const rect = page.getBoundingClientRect();
        return rect.top >= -innerHeight/2 && rect.top <= innerHeight/2;
    });
    
    const currentIndex = pages.indexOf(currentPage);

    if (e.key === 'ArrowDown' && currentIndex < pages.length - 1) {
        e.preventDefault();
        pages[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        pages[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
    }
});

// ══════════════════════════════════════════════════════════════════════════════
// PAGE LOAD ANIMATION
// ══════════════════════════════════════════════════════════════════════════════

window.addEventListener('load', () => {
    const style = document.createElement('style');
    style.textContent = `
        body {
            animation: pageLoad 0.8s ease-out;
        }

        @keyframes pageLoad {
            from {
                opacity: 0;
                filter: blur(10px);
            }
            to {
                opacity: 1;
                filter: blur(0);
            }
        }
    `;
    document.head.appendChild(style);
});

// ══════════════════════════════════════════════════════════════════════════════
// UTILITY: LOG TO VERIFY LOADING
// ══════════════════════════════════════════════════════════════════════════════

console.log('Portfolio Animations Loaded Successfully ✓');
