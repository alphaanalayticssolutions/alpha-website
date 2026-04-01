// ========================================
// ALPHA APPLIED ANALYTICS SOLUTIONS
// Main JavaScript - All Interactive Features
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
  
  // ===== SMOOTH SCROLLING FOR NAVIGATION =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      // Skip bare # links
      if (href === '#') {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) navLinks.classList.remove('show');
      }
    });
  });
  
  // ===== MOBILE MENU TOGGLE =====
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      this.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove('show');
        mobileToggle.classList.remove('active');
      }
    });
  }
  
  // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Apply fade-in animation to cards
  document.querySelectorAll('.service-card, .platform-card, .audience-card, .about-stat').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease ${index * 0.08}s`;
    fadeInObserver.observe(el);
  });
  
  // ===== NUMBER COUNTER ANIMATION =====
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateNumber(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.hero-trust-num, .about-stat-num').forEach(num => {
    counterObserver.observe(num);
  });
  
  function animateNumber(element) {
    const text = element.textContent;
    
    // Skip if it contains slash (like "24/7")
    if (text.includes('/')) return;
    
    const hasPercent = text.includes('%');
    const hasK = text.includes('K');
    const hasPlus = text.includes('+');
    const hasX = text.includes('x');
    const hasDash = text.includes('-');
    
    let targetValue = parseFloat(text.replace(/[^\d.]/g, ''));
    if (hasK) targetValue *= 1000;
    
    let currentValue = 0;
    const duration = 1500;
    const steps = 50;
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
      } else if (hasX) {
        displayValue = Math.floor(currentValue) + 'x';
      } else if (hasDash) {
        displayValue = Math.floor(currentValue) + '-Tab';
      } else {
        displayValue = Math.floor(currentValue) + (hasPlus ? '+' : '');
      }
      
      element.textContent = displayValue;
    }, stepDuration);
  }
  
  // ===== PARALLAX EFFECT FOR HERO =====
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
      }
    });
  }
  
  // ===== CARD HOVER EFFECTS =====
  document.querySelectorAll('.service-card, .platform-card, .audience-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-6px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // ===== BUTTON RIPPLE EFFECT =====
  document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(button => {
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
      ripple.style.animation = 'ripple-effect 0.6s ease-out';
      ripple.style.pointerEvents = 'none';
      
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
          imageObserver.unobserve(img);
        }
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
  
  // ===== CONSOLE BRANDING =====
  console.log('%c🔷 Alpha Applied Analytics Solutions', 'color: #0B1D33; font-size: 18px; font-weight: bold;');
  console.log('%c🔴 AI-Powered Forensic Financial Analysis', 'color: #B91C1C; font-size: 14px;');
  console.log('%c✨ Premium Website Loaded Successfully', 'color: #C5A572; font-size: 12px;');
  
});

// ===== CSS ANIMATION FOR RIPPLE =====
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-effect {
    to {
      width: 300px;
      height: 300px;
      opacity: 0;
    }
  }
  
  .mobile-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  .mobile-toggle.active span:nth-child(2) {
    opacity: 0;
  }
  .mobile-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
`;
document.head.appendChild(style);