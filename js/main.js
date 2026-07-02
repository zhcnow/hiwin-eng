// =============================================
// HIWIN TECHNOLOGIES INC. — Main JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // === Mobile Nav Toggle ===
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close nav on link click
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // === Active Nav Link on Scroll ===
  const sections = document.querySelectorAll('section[id]');

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 120;
    let current = '';

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  // === Navbar background on scroll ===
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10,10,15,0.95)';
    } else {
      navbar.style.background = 'rgba(10,10,15,0.85)';
    }
  });

  // === Contact Form (EmailJS-free version — sends via backend) ===
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    formStatus.textContent = 'Sending...';
    formStatus.className = 'form-status';

    try {
      // For now show a success message
      // In production, replace with a real backend endpoint
      setTimeout(() => {
        formStatus.textContent = 'Thank you! Your message has been received. We will get back to you shortly.';
        formStatus.className = 'form-status success';
        contactForm.reset();
      }, 1000);
    } catch (err) {
      formStatus.textContent = 'Failed to send. Please email us directly at info@hiwin-eng.com';
      formStatus.className = 'form-status error';
    }
  });

  // === Scroll Reveal Animation ===
  const revealElements = document.querySelectorAll('.service-card, .stat-card, .highlight-item');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });

});
