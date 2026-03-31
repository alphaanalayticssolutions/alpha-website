// ============================================
// ALPHA APPLIED ANALYTICS SOLUTIONS
// Professional JavaScript Interactions
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            }
        });
        
        // Close on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    const spans = mobileToggle.querySelectorAll('span');
                    spans[0].style.transform = '';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = '';
                }
            });
        });
    }
    
    // ===== SMOOTH SCROLL =====
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
            navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.12)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.08)';
        }
    });
    
    // ===== FADE IN ANIMATION =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate elements
    const animateElements = document.querySelectorAll(
        '.service-card-premium, .tool-card, .stat-card'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.08}s`;
        fadeObserver.observe(el);
    });
    
    // ===== STATS COUNTER ANIMATION =====
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = element.textContent;
        const hasPercent = target.includes('%');
        const hasK = target.includes('K');
        const hasPlus = target.includes('+');
        const hasSlash = target.includes('/');
        
        if (hasSlash) return; // Don't animate "24/7"
        
        let numericValue;
        if (hasK) {
            numericValue = parseFloat(target.replace(/[^\d.]/g, '')) * 1000;
        } else {
            numericValue = parseFloat(target.replace(/[^\d.]/g, ''));
        }
        
        if (isNaN(numericValue)) return;
        
        const duration = 1800;
        const steps = 60;
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
            } else if (hasPercent) {
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
    }, { threshold: 0.6 });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
    
    // ===== ACTIVE NAV LINK =====
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
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
    
    // ===== ACCESSIBILITY =====
    document.querySelectorAll('.btn-premium, .nav-link').forEach(element => {
        element.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // ===== PAGE LOAD FADE IN =====
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ===== CONSOLE BRANDING =====
    console.log('%cAlpha Applied Analytics Solutions', 
        'color: #1A5490; font-size: 20px; font-weight: bold;');
    console.log('%cAI-Powered Legal & Financial Analytics', 
        'color: #6B7280; font-size: 14px;');
});