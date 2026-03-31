// ===================================
// ALPHA APPLIED ANALYTICS SOLUTIONS
// Professional Interactions
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
            
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    
                    const spans = mobileMenuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== NAVBAR SHADOW ON SCROLL =====
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 20) {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // ===== FADE-IN ON SCROLL (MINIMAL) =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Subtle fade-in for cards
    const fadeElements = document.querySelectorAll('.service-card, .tool-card, .stat-box');
    fadeElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.5s ease ${index * 0.05}s`;
        fadeObserver.observe(el);
    });
    
    // ===== ACTIVE NAV LINK =====
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ===== STATS COUNTER =====
    const statsNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const hasK = target.includes('K');
        const hasPlus = target.includes('+');
        
        let numericValue;
        if (hasK) {
            numericValue = parseFloat(target.replace(/[^\d.]/g, '')) * 1000;
        } else {
            numericValue = parseFloat(target.replace(/[^\d.]/g, ''));
        }
        
        if (isNaN(numericValue) || target.includes('/')) return;
        
        const duration = 1500;
        const steps = 50;
        const increment = numericValue / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            let displayValue;
            if (hasK) {
                displayValue = (current / 1000).toFixed(1) + 'K' + (hasPlus ? '+' : '');
            } else if (isPercentage) {
                displayValue = current.toFixed(1) + '%';
            } else {
                displayValue = Math.floor(current).toLocaleString();
            }
            
            element.textContent = displayValue;
        }, duration / steps);
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsNumbers.forEach(stat => statsObserver.observe(stat));
    
    // ===== ACCESSIBILITY =====
    document.querySelectorAll('.btn, .nav-link').forEach(element => {
        element.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // ===== PAGE LOAD =====
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.4s ease';
            document.body.style.opacity = '1';
        }, 50);
    });
    
    // ===== CONSOLE BRANDING =====
    console.log('%cAlpha Applied Analytics Solutions', 'color: #2E5C8A; font-size: 20px; font-weight: bold;');
    console.log('%cAI-Powered Legal & Financial Analytics', 'color: #6B7280; font-size: 14px;');
});