// ALPHA APPLIED ANALYTICS SOLUTIONS
// Professional JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // Navbar shadow on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 20) {
            navbar.style.boxShadow = '0 4px 16px rgba(193,39,45,0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 12px rgba(193,39,45,0.1)';
        }
    });
    
    // Fade in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.service-card-image, .tool-card, .stat-card').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `all 0.6s ease ${i * 0.1}s`;
        observer.observe(el);
    });
    
    // Stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const target = entry.target.textContent;
                
                if (target.includes('/')) return; // Skip 24/7
                
                const isPercent = target.includes('%');
                const hasK = target.includes('K');
                const hasPlus = target.includes('+');
                
                let value = parseFloat(target.replace(/[^\d.]/g, ''));
                if (hasK) value *= 1000;
                
                let current = 0;
                const duration = 2000;
                const steps = 60;
                const increment = value / steps;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= value) {
                        current = value;
                        clearInterval(timer);
                    }
                    
                    let display;
                    if (hasK) {
                        display = (current / 1000).toFixed(1) + 'K' + (hasPlus ? '+' : '');
                    } else if (isPercent) {
                        display = current.toFixed(1) + '%';
                    } else {
                        display = Math.floor(current);
                    }
                    
                    entry.target.textContent = display;
                }, duration / steps);
            }
        });
    }, { threshold: 0.6 });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
});