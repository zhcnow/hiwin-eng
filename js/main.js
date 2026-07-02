// =============================================
// HIWIN TECHNOLOGIES INC. — Main JavaScript v2
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // === Particle Network Background ===
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };
  let animFrame;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      // Mouse interaction
      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          this.vx -= dx * 0.002;
          this.vy -= dy * 0.002;
          // Clamp velocity
          const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
          if (speed > 1.5) {
            this.vx = (this.vx / speed) * 1.5;
            this.vy = (this.vy / speed) * 1.5;
          }
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(96, 165, 250, ${this.alpha})`;
      ctx.fill();
    }
  }

  // Create particles
  const count = Math.min(Math.floor(canvas.width * canvas.height / 12000), 80);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(96, 165, 250, ${0.06 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawLines();
    animFrame = requestAnimationFrame(animate);
  }

  animate();

  // Mouse tracking
  canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // === Mobile Nav Toggle ===
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // === Scroll Active Link ===
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

  // === Navbar background ===
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 50
      ? 'rgba(10,10,15,0.92)'
      : 'rgba(10,10,15,0.8)';
  });

  // === Counter Animation ===
  const counters = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.count);
        const duration = 2000;
        const start = performance.now();

        function updateCounter(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          entry.target.textContent = current;
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.textContent = target;
          }
        }
        requestAnimationFrame(updateCounter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // === Scroll Reveal ===
  const revealElements = document.querySelectorAll('[data-aos]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  // === Contact Form ===
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm?.addEventListener('submit', () => {
    formStatus.textContent = 'Sending...';
    formStatus.className = 'form-status';
    // Form will submit to FormSubmit which handles the rest
    return true;
  });

  // === Smooth Scroll for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
