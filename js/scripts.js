// scripts.js - basic interactivity: theme toggle, smooth scroll, contact form saving (localStorage), small helpers
document.addEventListener('DOMContentLoaded', function () {

  // THEME TOGGLE
  const themeToggleButtons = document.querySelectorAll('#themeToggle');
  function setTheme(t) {
    if (t === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggleButtons.forEach(b => b.innerHTML = '<i class="bi bi-sun"></i>');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggleButtons.forEach(b => b.innerHTML = '<i class="bi bi-moon"></i>');
    }
    localStorage.setItem('theme', t);
  }
  // initialize theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  themeToggleButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  });

  // SMOOTH SCROLL helper used by hero button
  window.scrollToSection = function (id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // CONTACT FORM HANDLING (store messages to localStorage)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // basic html5 validation
      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
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

      // read existing, push, save
      const stored = JSON.parse(localStorage.getItem('medly_contacts') || '[]');
      stored.push(data);
      localStorage.setItem('medly_contacts', JSON.stringify(stored));

      // show success modal (Bootstrap)
      const modalEl = document.getElementById('successModal');
      if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
      }

      contactForm.reset();
      contactForm.classList.remove('was-validated');
    });
  }

  // quick helper: add simple fade-in for feature cards when in viewport (optional)
  const obs = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.classList.add('in-view');
        obs.unobserve(ent.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.feature-card, .service-card, .team-card, .hero-card').forEach(el => obs.observe(el));
});
