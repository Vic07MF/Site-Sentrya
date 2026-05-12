// ========================================
// SENTRYA - Vanilla JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  initMobileMenu();
  
  // Scroll Animations
  initScrollAnimations();
  
  // Navbar Scroll Effect
  initNavbarScroll();
  
  // Generate Dashboard Chart Bars
  generateChartBars();
  
  // Smooth Scroll for Anchor Links
  initSmoothScroll();
});

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
  const closeIcon = mobileMenuBtn.querySelector('.close-icon');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  mobileMenuBtn.addEventListener('click', function() {
    const isOpen = !mobileMenu.classList.contains('hidden');
    
    if (isOpen) {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    } else {
      mobileMenu.classList.remove('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    }
  });

  // Close menu when clicking on a link
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(function(el) {
    observer.observe(el);
  });
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      navbar.style.background = 'rgba(20, 32, 38, 0.9)';
    } else {
      navbar.style.background = 'rgba(20, 32, 38, 0.6)';
    }

    lastScrollY = currentScrollY;
  });
}

// ========================================
// GENERATE DASHBOARD CHART BARS
// ========================================
function generateChartBars() {
  const chartContainer = document.getElementById('vibration-chart');
  if (!chartContainer) return;

  // Generate 24 bars for 24 hours
  for (let i = 0; i < 24; i++) {
    const bar = document.createElement('div');
    bar.className = 'chart-bar';
    
    // Random height between 20% and 80%
    const height = Math.floor(Math.random() * 60) + 20;
    bar.style.height = height + '%';
    
    // Mark some bars as anomalies
    if (i === 15 || i === 19) {
      bar.classList.add('anomaly');
    } else {
      bar.classList.add('normal');
    }
    
    chartContainer.appendChild(bar);
  }

  // Animate bars on load with slight delay
  const bars = chartContainer.querySelectorAll('.chart-bar');
  bars.forEach(function(bar, index) {
    const finalHeight = bar.style.height;
    bar.style.height = '0';
    
    setTimeout(function() {
      bar.style.transition = 'height 0.5s ease';
      bar.style.height = finalHeight;
    }, index * 30);
  });
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// UTILITY: Throttle Function
// ========================================
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(function() {
        inThrottle = false;
      }, limit);
    }
  };
}

// ========================================
// ADDITIONAL INTERACTIVE FEATURES
// ========================================

// Add hover effects to cards
document.querySelectorAll('.card, .tech-card, .benefit-card, .step-card').forEach(function(card) {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-4px)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(function(button) {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(function() {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation to stylesheet
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Animate health bars when they come into view
const healthObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.health-fill');
      fills.forEach(function(fill) {
        const width = fill.style.width;
        fill.style.width = '0';
        setTimeout(function() {
          fill.style.width = width;
        }, 100);
      });
      healthObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const healthList = document.querySelector('.health-list');
if (healthList) {
  healthObserver.observe(healthList);
}

// Counter animation for stats
function animateCounter(element, target, duration) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(function() {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      const statValues = entry.target.querySelectorAll('.stat-value');
      statValues.forEach(function(stat) {
        const text = stat.textContent;
        const numMatch = text.match(/[\d.]+/);
        if (numMatch) {
          const num = parseFloat(numMatch[0]);
          if (!isNaN(num) && num < 1000) {
            const suffix = text.replace(numMatch[0], '');
            stat.textContent = '0' + suffix;
            animateCounter(stat, num, 1000);
            // Re-add suffix after animation
            setTimeout(function() {
              stat.textContent = text;
            }, 1100);
          }
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsRow = document.querySelector('.stats-row');
if (statsRow) {
  statsObserver.observe(statsRow);
}
