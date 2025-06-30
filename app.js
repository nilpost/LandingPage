// Language switching functionality
class LanguageSwitcher {
    constructor() {
        this.currentLanguage = 'en';
        this.init();
    }

    init() {
        this.bindEvents();
        this.setInitialLanguage();
    }

    bindEvents() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
    }

    setInitialLanguage() {
        // Check if user has a language preference stored or use browser language
        const browserLang = navigator.language.slice(0, 2);
        const preferredLang = ['en', 'es'].includes(browserLang) ? browserLang : 'en';
        this.switchLanguage(preferredLang);
    }

    switchLanguage(lang) {
        if (lang === this.currentLanguage) return;

        this.currentLanguage = lang;
        this.updateContent(lang);
        this.updateActiveButton(lang);
        document.documentElement.lang = lang;
    }

    updateContent(lang) {
        const elements = document.querySelectorAll('[data-en][data-es]');
        elements.forEach(element => {
            const content = element.getAttribute(`data-${lang}`);
            if (content) {
                element.textContent = content;
            }
        });
    }

    updateActiveButton(lang) {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-lang') === lang) {
                button.classList.add('active');
            }
        });
    }
}

// Mobile navigation
class MobileNavigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navLinks = document.querySelector('.nav-links');
        this.navLinksItems = document.querySelectorAll('.nav-links a');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMenu();
            });
        }

        // Close menu when clicking on nav links
        this.navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-menu') && this.navLinks.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.navLinks.classList.toggle('active');
        this.hamburger.classList.toggle('active');
    }

    closeMenu() {
        this.navLinks.classList.remove('active');
        this.hamburger.classList.remove('active');
    }
}

// Smooth scrolling and active nav highlighting
class NavigationScroller {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        this.sections = document.querySelectorAll('section[id]');
        this.init();
    }

    init() {
        this.bindEvents();
        this.highlightActiveSection();
    }

    bindEvents() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        window.addEventListener('scroll', () => {
            this.highlightActiveSection();
        });
    }

    highlightActiveSection() {
        const scrollPosition = window.scrollY + 100;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.updateActiveNavLink(sectionId);
            }
        });
    }

    updateActiveNavLink(activeId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }
}

// Intersection Observer for fade-in animations
class AnimationObserver {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupObserver();
        this.markElementsForAnimation();
    }

    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, this.observerOptions);
    }

    markElementsForAnimation() {
        const elementsToAnimate = [
            '.hero-content',
            '.about-content',
            '.timeline-item',
            '.education-item',
            '.skill-category',
            '.testimonial-card',
            '.contact-content'
        ];

        elementsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                element.classList.add('fade-in');
                element.style.transitionDelay = `${index * 0.1}s`;
                this.observer.observe(element);
            });
        });
    }
}

// Navbar scroll effect
class NavbarScroller {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScrollY = window.scrollY;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            this.navbar.style.boxShadow = 'var(--shadow-lg)';
        } else {
            this.navbar.style.boxShadow = 'none';
        }

        this.lastScrollY = currentScrollY;
    }
}

// Skill tags hover effect
class SkillTagsEffects {
    constructor() {
        this.skillTags = document.querySelectorAll('.skill-tag');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                this.addHoverEffect(tag);
            });

            tag.addEventListener('mouseleave', () => {
                this.removeHoverEffect(tag);
            });
        });
    }

    addHoverEffect(tag) {
        tag.style.boxShadow = 'var(--shadow-md)';
    }

    removeHoverEffect(tag) {
        tag.style.boxShadow = 'none';
    }
}

// Contact form interactions (for future enhancement)
class ContactInteractions {
    constructor() {
        this.emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        this.linkedinLinks = document.querySelectorAll('a[href*="linkedin"]');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.emailLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackInteraction('email_click');
            });
        });

        this.linkedinLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackInteraction('linkedin_click');
            });
        });
    }

    trackInteraction(action) {
        // Console log for development - can be replaced with analytics
        console.log(`User interaction: ${action}`);
    }
}

// Theme detection and handling
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        this.detectTheme();
        this.bindEvents();
    }

    detectTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.updateTheme(prefersDark.matches ? 'dark' : 'light');
    }

    bindEvents() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        prefersDark.addEventListener('change', (e) => {
            this.updateTheme(e.matches ? 'dark' : 'light');
        });
    }

    updateTheme(theme) {
        document.documentElement.setAttribute('data-color-scheme', theme);
    }
}

// Loading and performance optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.handlePageLoad();
    }

    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }

    handlePageLoad() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            this.removeLoadingStates();
        });
    }

    removeLoadingStates() {
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(element => {
            element.classList.remove('loading');
        });
    }
}

// Error handling and fallbacks
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        this.handleErrors();
    }

    handleErrors() {
        window.addEventListener('error', (e) => {
            console.warn('Application error handled:', e.error);
            this.showFallbackContent();
        });
    }

    showFallbackContent() {
        // Ensure basic functionality works even if JavaScript fails
        const fallbackStyles = document.createElement('style');
        fallbackStyles.textContent = `
            .nav-links { display: flex !important; }
            .fade-in { opacity: 1 !important; transform: none !important; }
        `;
        document.head.appendChild(fallbackStyles);
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Core functionality
        new LanguageSwitcher();
        new MobileNavigation();
        new NavigationScroller();
        new NavbarScroller();
        
        // Enhanced features
        new AnimationObserver();
        new SkillTagsEffects();
        new ContactInteractions();
        new ThemeManager();
        new PerformanceOptimizer();
        new ErrorHandler();
        
        console.log('Nil Postius Portfolio: All components initialized successfully');
    } catch (error) {
        console.warn('Some components failed to initialize:', error);
        // Fallback to basic functionality
        new ErrorHandler();
    }
});

// Export for testing if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LanguageSwitcher,
        MobileNavigation,
        NavigationScroller,
        AnimationObserver
    };
}