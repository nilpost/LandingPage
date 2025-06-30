// JavaScript for Nil Postius Personal Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const ctaButtons = document.querySelectorAll('[data-scroll]');
    
    // Navigation scroll effect
    let lastScrollTop = 0;
    
    function handleNavScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Mobile menu toggle
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Close mobile menu when clicking on links
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Smooth scroll function
    function smoothScrollTo(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Handle CTA button clicks
    function handleCTAClick(event) {
        event.preventDefault();
        const targetId = event.target.getAttribute('data-scroll');
        smoothScrollTo(targetId);
        closeMobileMenu();
    }
    
    // Handle navigation link clicks
    function handleNavClick(event) {
        event.preventDefault();
        const href = event.target.getAttribute('href');
        const targetId = href.substring(1); // Remove the '#' from href
        smoothScrollTo(targetId);
        closeMobileMenu();
    }
    
    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Intersection Observer for animations
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate on scroll
        const animatedElements = document.querySelectorAll('.timeline-item, .skill-category, .testimonial-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }
    
    // Typing animation for hero headline
    function initTypingAnimation() {
        const headline = document.querySelector('.hero-headline');
        if (!headline) return;
        
        const text = headline.textContent;
        headline.textContent = '';
        headline.style.borderRight = '2px solid rgba(255, 255, 255, 0.7)';
        
        let index = 0;
        const typeSpeed = 50;
        
        function typeWriter() {
            if (index < text.length) {
                headline.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    headline.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }
    
    // Skill tags hover effect
    function initSkillTagsEffect() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Contact form enhancement (if a form is added later)
    function initContactForm() {
        const contactLinks = document.querySelectorAll('.contact-link');
        
        contactLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }
    
    // Parallax effect for hero background
    function initParallaxEffect() {
        const heroBackground = document.querySelector('.hero-background');
        if (!heroBackground) return;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
        
        // Use requestAnimationFrame for smooth parallax
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', () => {
            requestTick();
            ticking = false;
        });
    }
    
    // Initialize loading animation
    function initLoadingAnimation() {
        // Add fade-in animation to main sections
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Event Listeners
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Add click handlers for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Add click handlers for CTA buttons
    ctaButtons.forEach(button => {
        button.addEventListener('click', handleCTAClick);
    });
    
    // Scroll event listeners
    window.addEventListener('scroll', debounce(() => {
        handleNavScroll();
        updateActiveNav();
    }, 10));
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }, 250));
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Initialize all features
    function init() {
        setupScrollAnimations();
        initTypingAnimation();
        initSkillTagsEffect();
        initContactForm();
        initParallaxEffect();
        initLoadingAnimation();
        
        // Add CSS for active nav links
        const style = document.createElement('style');
        style.textContent = `
            .nav-link.active {
                color: var(--color-tech-secondary);
                position: relative;
            }
            .nav-link.active::after {
                content: '';
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 100%;
                height: 2px;
                background: var(--color-tech-secondary);
                border-radius: 1px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize everything
    init();
    
    // Add some console logging for debugging
    console.log('Nil Postius Personal Landing Page loaded successfully!');
    console.log('Features initialized: Navigation, Smooth Scroll, Animations, Mobile Menu');
    
    // Performance monitoring
    window.addEventListener('load', function() {
        console.log('Page fully loaded');
        
        // Remove any loading states
        document.body.classList.add('loaded');
        
        // Add loaded class styling
        const loadedStyle = document.createElement('style');
        loadedStyle.textContent = `
            body.loaded {
                overflow-x: hidden;
            }
            body.loaded .hero-content {
                animation: heroFadeIn 1s ease-out;
            }
            @keyframes heroFadeIn {
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
        document.head.appendChild(loadedStyle);
    });
});