/* ================================================
   SCT_WD_1 – script.js
   Nova Studio – Responsive Landing Page
   ================================================ */

// ── DOM REFERENCES ─────────────────────────────────
const navbar      = document.getElementById('navbar');
const hamburgerBtn = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('navLinks');
const navLinks    = document.querySelectorAll('.nav-links a');
const sections    = document.querySelectorAll('section[id]');
const revealEls   = document.querySelectorAll('.reveal');
const submitBtn   = document.getElementById('submitBtn');

// ── NAVBAR: SCROLL BEHAVIOUR ────────────────────────
// Switches nav between transparent (top) and frosted-glass (scrolled)
// Also highlights the active nav link based on scroll position

function handleNavbarScroll() {
  // 1. Toggle scrolled style
  if (window.scrollY > 50) {
    navbar.classList.remove('transparent');
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.add('transparent');
    navbar.classList.remove('scrolled');
  }

  // 2. Active link detection
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 130;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll(); // run once on page load

// ── HAMBURGER MENU ──────────────────────────────────
// Toggles the mobile slide-out drawer and animates the icon

hamburgerBtn.addEventListener('click', () => {
  hamburgerBtn.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a nav link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburgerBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ── SCROLL REVEAL ───────────────────────────────────
// Observes .reveal elements; adds .visible class with a staggered delay
// when they enter the viewport

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // stagger sibling reveals by 80ms each
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      revealObserver.unobserve(entry.target); // only animate once
    }
  });
}, {
  threshold: 0.12
});

revealEls.forEach(el => revealObserver.observe(el));

// ── CONTACT FORM ────────────────────────────────────
// Basic form submission feedback (no back-end required)

if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const nameVal    = document.getElementById('name').value.trim();
    const emailVal   = document.getElementById('email').value.trim();
    const messageVal = document.getElementById('message').value.trim();

    if (!nameVal || !emailVal || !messageVal) {
      // Shake the button if fields are empty
      submitBtn.style.transform = 'translateX(-6px)';
      setTimeout(() => submitBtn.style.transform = 'translateX(6px)', 80);
      setTimeout(() => submitBtn.style.transform = 'translateX(0)',   160);
      return;
    }

    // Success state
    submitBtn.textContent = 'Message Sent ✓';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;

    // Reset after 3 seconds
    setTimeout(() => {
      submitBtn.textContent = 'Send Message →';
      submitBtn.style.opacity = '1';
      submitBtn.disabled = false;
      document.getElementById('name').value    = '';
      document.getElementById('email').value   = '';
      document.getElementById('message').value = '';
    }, 3000);
  });
}