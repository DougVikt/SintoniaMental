// --- Navbar hide/show on scroll (navbar.js) ---
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const cur = window.scrollY;
  if (cur > lastScroll && cur > 80) {
    nav.style.top = '-72px';
    nav.style.opacity = '0.6';
  } else {
    nav.style.top = '0';
    nav.style.opacity = '1';
  }
  lastScroll = cur;
});

// --- Reveal on scroll ---
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (i % 3) * 0.1 + 's';
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));

// --- Animated counter ---
;
  requestAnimationFrame(step);
}

// Trigger counter when hero is visible
const statNum = document.querySelector('[data-count="500"]');
if (statNum) {
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) animateCount(statNum, 500);
  }, { threshold: .5 }).observe(statNum);
}

// --- Active nav link on scroll ---
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  document.querySelectorAll('.sty-link-nav').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});
