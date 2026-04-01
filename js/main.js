// ========================================
// ALPHA APPLIED ANALYTICS SOLUTIONS
// Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== NAVBAR SHADOW ON SCROLL =====
    const navbar = document.querySelector('.navbar');
    function updateNavbarShadow() {
        if (window.pageYOffset > 20) {
            navbar.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        }
    }
    
    window.addEventListener('scroll', updateNavbarShadow);
    updateNavbarShadow(); // Initial call
    
    // ===== MOBILE MENU TOGGLE =====
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
    
    // ===== FADE-IN ANIMATIONS FOR CARDS =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Apply animations to all cards and stats
    document.querySelectorAll('.service-card, .tool-card, .stat-box').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // ===== ANIMATED COUNTER FOR STATS =====
    const statNumbers = document.querySelectorAll('.stat-num');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const text = entry.target.textContent;
                
                // Skip if stat is a fraction (like "24/7")
                if (text.includes('/')) {
                    return;
                }
                
                const hasPercent = text.includes('%');
                const hasK = text.includes('K');
                const hasPlus = text.includes('+');
                
                let targetValue = parseFloat(text.replace(/[^\d.]/g, ''));
                if (hasK) targetValue *= 1000;
                
                let currentValue = 0;
                const duration = 2000; // 2 seconds
                const steps = 60;
                const increment = targetValue / steps;
                const stepDuration = duration / steps;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        currentValue = targetValue;
                        clearInterval(timer);
                    }
                    
                    let displayValue;
                    if (hasK) {
                        displayValue = (currentValue / 1000).toFixed(1) + 'K' + (hasPlus ? '+' : '');
                    } else if (hasPercent) {
                        displayValue = currentValue.toFixed(1) + '%';
                    } else {
                        displayValue = Math.floor(currentValue);
                    }
                    
                    entry.target.textContent = displayValue;
                }, stepDuration);
            }
        });
    }, { 
        threshold: 0.6 
    });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
    
    // ===== PARALLAX EFFECT FOR HERO =====
    const hero = document.querySelector('.hero');
    const heroOverlay = document.querySelector('.hero-overlay');
    
    if (hero && heroOverlay) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroOverlay.style.opacity = Math.min(0.75 + (scrolled / window.innerHeight) * 0.25, 1);
            }
        });
    }
    
    // ===== HOVER EFFECT FOR SERVICE CARDS =====
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===== BUTTON RIPPLE EFFECT =====
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255,255,255,0.5)';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // ===== LAZY LOADING FOR IMAGES =====
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
    
    // ===== CONSOLE MESSAGE =====
    console.log('%c🔷 Alpha Applied Analytics Solutions', 'color: #1A5490; font-size: 18px; font-weight: bold;');
    console.log('%c🔴 AI-Powered Legal & Financial Analytics', 'color: #C1272D; font-size: 14px;');
    console.log('%cWebsite loaded successfully!', 'color: #6B7280; font-size: 12px;');
});

// ===== CSS ANIMATION FOR RIPPLE EFFECT =====
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);