/*------------------------------------------
  Yazdani Bakery - Main JavaScript
  Version: 1.0
--------------------------------------------*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initMobileMenu();
    initStickyHeader();
    initTestimonialSlider();
    initAnimations();
    initNewsletter();
    
    // Handle page-specific initializations
    const currentPage = getCurrentPage();
    if (currentPage === 'products') {
        initProductFilters();
    } else if (currentPage === 'contact') {
        initFaqAccordion();
    }
});

/**
 * Get the current page based on URL
 */
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('about.html')) {
        return 'about';
    } else if (path.includes('products.html')) {
        return 'products';
    } else if (path.includes('gallery.html')) {
        return 'gallery';
    } else if (path.includes('contact.html')) {
        return 'contact';
    } else {
        return 'home';
    }
}

/**
 * Mobile menu toggle functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Change toggle icon between bars and times
        const icon = menuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

/**
 * Sticky header on scroll
 */
function initStickyHeader() {
    const header = document.querySelector('header');
    let scrollTrigger = 100;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY >= scrollTrigger) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Testimonial slider functionality
 */
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    
    if (!slides.length || !dots.length) return;
    
    let currentSlide = 0;
    
    // Set up auto-slideshow
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Show the specified slide
    function showSlide(n) {
        // Reset interval to prevent quick transitions
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
        
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide and activate corresponding dot
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }
    
    // Next slide function
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Previous slide function
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Event listeners for controls
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
        });
    }
    
    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
}

/**
 * Product category filter functionality
 */
function initProductFilters() {
    const categoryFilters = document.querySelectorAll('.category-filter');
    const productItems = document.querySelectorAll('.product-item');
    
    if (!categoryFilters.length || !productItems.length) return;
    
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Update active filter button
            categoryFilters.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Show/hide products based on category
            productItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/**
 * FAQ accordion functionality
 */
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (!faqQuestions.length) return;
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle the faq item
            const parent = this.parentElement;
            const answer = parent.querySelector('.faq-answer');
            const toggle = this.querySelector('.faq-toggle');
            
            // Close all other answers
            document.querySelectorAll('.faq-answer').forEach(item => {
                if (item !== answer) {
                    item.style.display = 'none';
                    item.parentElement.querySelector('.faq-toggle').classList.remove('active');
                }
            });
            
            // Toggle current answer
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                toggle.classList.remove('active');
            } else {
                answer.style.display = 'block';
                toggle.classList.add('active');
            }
        });
    });
}

/**
 * Simple animations on scroll
 */
function initAnimations() {
    const elementsToAnimate = document.querySelectorAll('[data-aos]');
    
    if (!elementsToAnimate.length) return;
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Add animation class when element enters viewport
    function checkAnimations() {
        elementsToAnimate.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animate-fade-in');
                element.classList.add('animated');
                
                // Apply delay if specified
                const delay = element.getAttribute('data-aos-delay');
                if (delay) {
                    element.style.animationDelay = delay + 'ms';
                }
            }
        });
    }
    
    // Run on scroll and page load
    window.addEventListener('scroll', checkAnimations);
    window.addEventListener('resize', checkAnimations);
    checkAnimations();
}

/**
 * Newsletter form handling
 */
function initNewsletter() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    if (!newsletterForms.length) return;
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real implementation, this would send the data to a server
            // For demonstration purposes, we'll just show a success message
            emailInput.value = '';
            
            // Create a temporary success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('newsletter-success');
            successMessage.innerHTML = '<p>Thank you for subscribing!</p>';
            successMessage.style.color = 'var(--success)';
            successMessage.style.fontSize = '0.9rem';
            successMessage.style.marginTop = '10px';
            
            // Remove any existing message
            const existingMessage = form.querySelector('.newsletter-success');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Add the success message
            form.appendChild(successMessage);
            
            // Remove the message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    });
}

/**
 * Simple email validation
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
