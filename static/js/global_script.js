// --- Navbar hide/show on scroll (navbar.js) ---
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  
  if (currentScroll > lastScroll && currentScroll > 80) {
    nav.style.top = '-72px';
    nav.style.opacity = '0.6';
  } 
  else if (currentScroll < lastScroll) {
    nav.style.top = '0';
    nav.style.opacity = '1';
  }
  // Se currentScroll === lastScroll, não faz nada (evita flickering)
  
  lastScroll = currentScroll;
});