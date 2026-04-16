
// Trigger counter when hero is visible
const statNum = document.querySelector('[data-count="500"]');
if (statNum) {
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) animateCount(statNum, 500);
  }, { threshold: .5 }).observe(statNum);
}
// --- Reveal on scroll ---
const reveals = document.querySelectorAll('.reveal');

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

