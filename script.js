/* Global JavaScript */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
    mobileNav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') mobileNav.classList.remove('open');
    });
  }

  // IntersectionObserver for fade-in sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Counter animation
  const counters = document.querySelectorAll('.counter');
  const animateCount = (el, target) => {
    let start = 0;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / target));
    const timer = setInterval(() => {
      start += 1;
      el.textContent = start;
      if (start >= target) clearInterval(timer);
    }, stepTime);
  };
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.dataset.target;
        animateCount(entry.target, target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => counterObserver.observe(counter));

  // Projects filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.filter;
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      projectCards.forEach(card => {
        const cat = card.dataset.category;
        if (category === 'all' || cat === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Contact form validation (simple)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const name = contactForm.querySelector('[name="name"]').value.trim();
      const email = contactForm.querySelector('[name="email"]').value.trim();
      if (!name || !email) {
        e.preventDefault();
        alert('Please fill in required fields.');
      }
    });
  }

  // Careers form validation (similar)
  const careersForm = document.getElementById('career-form');
  if (careersForm) {
    careersForm.addEventListener('submit', (e) => {
      const name = careersForm.querySelector('[name="name"]').value.trim();
      const email = careersForm.querySelector('[name="email"]').value.trim();
      if (!name || !email) {
        e.preventDefault();
        alert('Please fill in required fields.');
      }
    });
  }

  // Floating WhatsApp button
  const waBtn = document.createElement('a');
  waBtn.href = 'https://wa.me/919999999999'; // placeholder number
  waBtn.className = 'whatsapp-float';
  waBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12c0 2.14.66 4.13 1.78 5.8L2 22l4.33-1.71c1.56.86 3.38 1.36 5.31 1.36 5.52 0 10-4.48 10-10s-4.48-10-10-10zm-.62 14.68l-.55-.16c-.86-.26-2.5-1.01-3.5-2.38l-.21-.34c-.24-.39-.76-1.3-.08-2.68.24-.49 1.1-2.22 2.8-4 2.02-2.13 4.48-2.82 5.55-1.86.31.27.45.73.48 1.06.03.33-1.04.8-1.2.86-.31.11-.55.18-.86.07-.31-.11-1.41-.46-2.79-1.17-.33-.18-.77-.6-.95-.88-.19-.27-.77-.15-.87-.13-3.33 1.42-5.73 5.73-6.02 6.27-.29.53-.81 2.09-.45 2.53.35.44.78.32 1.47.18.68-.13 1.46-.28 2.06-.62 2.9-1.62 5.2-2.47 8.44-3.24.34-.08.91-.12.93.37.01.2-1.29 2.12-1.88 2.88-.16.2-.43.45-.84.69z" fill="#25D366"/></svg>';
  document.body.appendChild(waBtn);
});
