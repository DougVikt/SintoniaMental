const nav_logo = document.querySelector('.nav-logo-span');
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll && currentScroll > 80) {
    nav.style.top = '-72px';
    nav.style.opacity = '0.6';

    nav_logo.style.transitionDelay = '0.1s';
    nav_logo.classList.add('expanded');
  } 
  else if (currentScroll < lastScroll) {
    nav.style.top = '0';
    nav.style.opacity = '1';

    nav_logo.classList.remove('expanded');
  }
  // Se currentScroll === lastScroll, não faz nada (evita flickering)
  
  lastScroll = currentScroll;
});

// --- Reveal on scroll ---
const reveals = document.querySelectorAll('.anim-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (i % 3) * 0.1 + 's';
      e.target.classList.add('visible');
      
    }else {
      e.target.classList.remove('visible');
      
    }
  });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));

// --- Animated counter ---
function animateCount(el, target, duration = 1500) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target) + '+';
    if (progress < 1) requestAnimationFrame(step);
  };
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
  document.querySelectorAll('.nav-link-item').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});