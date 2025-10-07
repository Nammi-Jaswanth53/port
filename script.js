// Portfolio JavaScript - Pure Vanilla JS Implementation

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Toast notification system
function showToast(title, description) {
    const toast = document.getElementById('toast');
    const toastTitle = toast.querySelector('.toast-title');
    const toastDescription = toast.querySelector('.toast-description');
    
    toastTitle.textContent = title;
    toastDescription.textContent = description;
    
    toast.classList.remove('hidden');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 300);
    }, 3000);
}

// Form validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return errors;
}

// Contact form handler
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    const errors = validateForm(data);
    
    if (errors.length > 0) {
        showToast('Validation Error', errors[0]);
        return;
    }
    
    // Simulate form submission (replace with actual API call)
    showToast('Message Sent!', "Thank you for your message. I'll get back to you soon!");
    
    // Reset form
    form.reset();
}

// Animation on scroll
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-card, .project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${index * 100}ms`;
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach((el) => {
        observer.observe(el);
    });
}

// Add staggered animation delays to skill cards
function setupStaggeredAnimations() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.setProperty('--i', index);
    });
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 100}ms`;
    });
}

// Navbar scroll effect (if you want to add a navbar later)
function handleNavbarScroll() {
    // This function can be used later if you add a navigation bar
    // that changes appearance on scroll
}

// Parallax effect for hero background
function handleParallax() {
    const hero = document.querySelector('.hero-section');
    const heroBackground = document.querySelector('.hero-background');
    
    if (!hero || !heroBackground) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize floating animations with random delays
function initializeFloatingElements() {
    const floatingDots = document.querySelectorAll('.float-dot');
    floatingDots.forEach((dot, index) => {
        const randomDelay = Math.random() * 3;
        dot.style.animationDelay = `${randomDelay}s`;
    });
}

// Theme toggle (for future dark/light mode implementation)
function toggleTheme() {
    // This can be implemented later for theme switching
    document.body.classList.toggle('light-theme');
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Debounce function for resize events
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

// Handle window resize
function handleResize() {
    // Recalculate any responsive elements if needed
    // This is where you'd handle any resize-specific logic
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Setup form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Setup animations
    setupStaggeredAnimations();
    handleScrollAnimations();
    initializeFloatingElements();
    
    // Setup parallax effect
    handleParallax();
    
    // Add throttled scroll handler
    window.addEventListener('scroll', throttle(() => {
        // Any scroll-based effects can be added here
    }, 16)); // ~60fps
    
    // Add debounced resize handler
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation completion
    document.body.classList.add('loaded');
    
    console.log('Portfolio initialized successfully! 🚀');
});

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    // ESC key to close any modals or overlays
    if (event.key === 'Escape') {
        // Close any open modals, dropdowns, etc.
    }
    
    // Enter key on buttons
    if (event.key === 'Enter' && event.target.tagName === 'BUTTON') {
        event.target.click();
    }
});

// Add focus management for accessibility
document.addEventListener('focusin', function(event) {
    if (event.target.matches('button, a, input, textarea, select')) {
        event.target.classList.add('focused');
    }
});

document.addEventListener('focusout', function(event) {
    if (event.target.matches('button, a, input, textarea, select')) {
        event.target.classList.remove('focused');
    }
});

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add loading states to buttons
function addLoadingState(button, loadingText = 'Loading...') {
    const originalText = button.textContent;
    button.textContent = loadingText;
    button.disabled = true;
    
    return function removeLoadingState() {
        button.textContent = originalText;
        button.disabled = false;
    };
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToSection,
        showToast,
        validateForm,
        handleFormSubmit,
        throttle,
        debounce,
        isInViewport,
        addLoadingState
    };
}