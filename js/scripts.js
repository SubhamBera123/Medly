// Enhanced scripts.js - Advanced interactivity with animations, scroll effects, and modern UI features
document.addEventListener('DOMContentLoaded', function () {

  // ENHANCED THEME TOGGLE with smooth transitions
  const themeToggleButtons = document.querySelectorAll('#themeToggle');
  function setTheme(t) {
    // Add transition class for smooth theme switching
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    if (t === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggleButtons.forEach(b => {
        b.innerHTML = '<i class="bi bi-sun"></i>';
        b.style.transform = 'rotate(180deg)';
      });
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggleButtons.forEach(b => {
        b.innerHTML = '<i class="bi bi-moon"></i>';
        b.style.transform = 'rotate(0deg)';
      });
    }
    localStorage.setItem('theme', t);
    
    // Remove transition after theme change
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }
  
  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  themeToggleButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  });

  // SCROLL EFFECTS
  let lastScrollTop = 0;
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Navbar scroll effect
    if (scrollTop > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollTop / scrollHeight) * 100;
      scrollIndicator.style.transform = `scaleX(${scrollProgress / 100})`;
    }
    
    lastScrollTop = scrollTop;
  });

  // Add scroll indicator to body
  if (!document.querySelector('.scroll-indicator')) {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
  }

  // ENHANCED SMOOTH SCROLL with animation
  window.scrollToSection = function (id) {
    const el = document.getElementById(id);
    if (el) {
      // Add a subtle animation to the target element
      el.style.transform = 'translateY(20px)';
      el.style.opacity = '0.8';
      
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Reset animation after scroll
      setTimeout(() => {
        el.style.transform = 'translateY(0)';
        el.style.opacity = '1';
      }, 800);
    }
  };

  // Parallax disabled per request; hero stays fixed. Smooth scroll remains enabled.

  // ENHANCED CARD INTERACTIONS
  const cards = document.querySelectorAll('.feature-card, .service-card, .team-card, .hero-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // LOADING ANIMATIONS
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  // Observe all cards for animation
  cards.forEach(card => {
    card.style.animationPlayState = 'paused';
    observer.observe(card);
  });

  // ENHANCED CONTACT FORM with loading states and animations
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Show loading state
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      // Simulate form submission delay for better UX
      setTimeout(() => {
        // Basic HTML5 validation
        if (!contactForm.checkValidity()) {
          contactForm.classList.add('was-validated');
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          return;
        }

        const data = {
          id: Date.now(),
          name: contactForm.name.value.trim(),
          email: contactForm.email.value.trim(),
          subject: contactForm.subject.value.trim(),
          message: contactForm.message.value.trim(),
          time: new Date().toISOString()
        };

        // Read existing, push, save
        const stored = JSON.parse(localStorage.getItem('medly_contacts') || '[]');
        stored.push(data);
        localStorage.setItem('medly_contacts', JSON.stringify(stored));

        // Show success state
        submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';

        // Show success modal with animation
        const modalEl = document.getElementById('successModal');
        if (modalEl) {
          const modal = new bootstrap.Modal(modalEl);
          modal.show();
        }

        // Reset form after delay
        setTimeout(() => {
          contactForm.reset();
          contactForm.classList.remove('was-validated');
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          submitBtn.style.background = '';
        }, 2000);
      }, 1000);
    });

    // Real-time form validation with visual feedback
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        if (this.checkValidity()) {
          this.style.borderColor = '#28a745';
          this.style.boxShadow = '0 0 0 0.2rem rgba(40, 167, 69, 0.25)';
        } else {
          this.style.borderColor = '#dc3545';
          this.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
        }
      });
      
      input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--accent)';
        this.style.boxShadow = '0 0 0 0.2rem rgba(91, 141, 239, 0.25)';
      });
    });
  }

  // ENHANCED INTERSECTION OBSERVER for animations
  const obs = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.classList.add('in-view');
        obs.unobserve(ent.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.feature-card, .service-card, .team-card, .hero-card').forEach(el => obs.observe(el));

  // TYPING ANIMATION for hero text
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--accent)';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        setTimeout(() => {
          heroTitle.style.borderRight = 'none';
        }, 1000);
      }
    };
    
    setTimeout(typeWriter, 500);
  }

  // ENHANCED CAROUSEL with auto-play and pause on hover
  const carousel = document.querySelector('#testiCarousel');
  if (carousel) {
    const carouselInstance = new bootstrap.Carousel(carousel, {
      interval: 5000,
      wrap: true
    });
    
    carousel.addEventListener('mouseenter', () => {
      carouselInstance.pause();
    });
    
    carousel.addEventListener('mouseleave', () => {
      carouselInstance.cycle();
    });
  }

  // PARTICLE EFFECT for hero section
  function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.background = 'var(--accent)';
      particle.style.borderRadius = '50%';
      particle.style.opacity = '0.3';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
      particle.style.animationDelay = Math.random() * 2 + 's';
      hero.appendChild(particle);
    }
  }
  
  createParticles();

  // SMOOTH REVEAL ANIMATION for stats
  const stats = document.querySelectorAll('.box-info h5');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = target.textContent;
        const isNumber = !isNaN(finalValue);
        
        if (isNumber) {
          const numericValue = parseInt(finalValue);
          let current = 0;
          const increment = numericValue / 50;
          
          const counter = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
              target.textContent = finalValue;
              clearInterval(counter);
            } else {
              target.textContent = Math.floor(current);
            }
          }, 30);
        }
        
        statsObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  
  stats.forEach(stat => statsObserver.observe(stat));

  // KEYBOARD NAVIGATION ENHANCEMENTS
  document.addEventListener('keydown', function(e) {
    // Toggle theme with Ctrl/Cmd + T
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
      e.preventDefault();
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    }
  });

  // PERFORMANCE OPTIMIZATION: Debounce scroll events
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

  // Apply debouncing to scroll events
  const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
  }, 10);
  
  window.addEventListener('scroll', debouncedScrollHandler);
});
