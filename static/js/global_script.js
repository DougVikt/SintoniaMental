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