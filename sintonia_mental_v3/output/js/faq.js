  /* ---- ACCORDION ---- */
  function toggleFAQ(questionEl) {
    const item   = questionEl.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    // close all
    document.querySelectorAll('.faq-item.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-answer').classList.remove('open');
    });

    if (!isOpen) {
      item.classList.add('open');
      answer.classList.add('open');
    }
  }

  /* ---- HELPFUL VOTE ---- */
  function voteHelpful(btn, positive) {
    const wrap = btn.closest('.faq-helpful');
    wrap.querySelectorAll('.helpful-btn').forEach(b => b.classList.remove('voted'));
    btn.classList.add('voted');
    btn.innerHTML = positive
      ? '<i class="bi bi-hand-thumbs-up-fill"></i> Obrigado!'
      : '<i class="bi bi-hand-thumbs-down-fill"></i> Vamos melhorar!';
  }

  /* ---- CATEGORY FILTER ---- */
  function filterCat(cat, el) {
    // update active cat
    document.querySelectorAll('.cat-item').forEach(c => c.classList.remove('active'));
    el.classList.add('active');

    // clear search
    document.getElementById('searchInput').value = '';
    document.getElementById('searchCount').style.display = 'none';

    const sections = document.querySelectorAll('.faq-section');
    sections.forEach(s => {
      s.style.display = (cat === 'all' || s.dataset.cat === cat) ? 'block' : 'none';
    });
    document.getElementById('noResults').style.display = 'none';
    document.getElementById('contato').style.display = 'flex';
  }

  /* ---- SEARCH ---- */
  function searchFAQ(query) {
    const q = query.trim().toLowerCase();
    const countEl  = document.getElementById('searchCount');
    const clearBtn = document.getElementById('searchClear');

    clearBtn.style.display = q ? 'flex' : 'none';

    if (!q) {
      countEl.style.display = 'none';
      // restore all
      document.querySelectorAll('.faq-item').forEach(item => {
        item.style.display = 'block';
        // remove highlights
        item.querySelector('.faq-q-text').innerHTML =
          item.querySelector('.faq-q-text').textContent;
      });
      document.querySelectorAll('.faq-section').forEach(s => s.style.display = 'block');
      document.getElementById('noResults').style.display = 'none';
      document.getElementById('contato').style.display = 'flex';
      // reset cat
      document.querySelectorAll('.cat-item').forEach(c => c.classList.remove('active'));
      document.querySelector('.cat-item').classList.add('active');
      return;
    }

    let total = 0;
    document.querySelectorAll('.faq-section').forEach(section => {
      let sectionHits = 0;
      section.querySelectorAll('.faq-item').forEach(item => {
        const qText = item.querySelector('.faq-q-text').textContent.toLowerCase();
        const aText = item.querySelector('.faq-answer-inner').textContent.toLowerCase();
        const match = qText.includes(q) || aText.includes(q);
        item.style.display = match ? 'block' : 'none';
        if (match) {
          sectionHits++;
          total++;
          // highlight in question
          const orig = item.querySelector('.faq-q-text').textContent;
          const re   = new RegExp(`(${q})`, 'gi');
          item.querySelector('.faq-q-text').innerHTML = orig.replace(re, '<span class="highlight-match">$1</span>');
        } else {
          item.querySelector('.faq-q-text').innerHTML = item.querySelector('.faq-q-text').textContent;
        }
      });
      section.style.display = sectionHits > 0 ? 'block' : 'none';
    });

    countEl.style.display = 'block';
    document.getElementById('searchCountNum').textContent = total;
    document.getElementById('searchTerm').textContent = query.trim();
    document.getElementById('noResults').style.display = total === 0 ? 'block' : 'none';
    document.getElementById('contato').style.display = total === 0 ? 'flex' : 'flex';

    // reset cat active
    document.querySelectorAll('.cat-item').forEach(c => c.classList.remove('active'));
  }

  function clearSearch() {
    document.getElementById('searchInput').value = '';
    searchFAQ('');
    document.getElementById('searchInput').focus();
  }

  /* ---- REVEAL ON SCROLL ---- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  /* ---- SMOOTH SCROLL to section on cat click ---- */
  function filterCat(cat, el) {
    document.querySelectorAll('.cat-item').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('searchInput').value = '';
    document.getElementById('searchCount').style.display = 'none';

    const sections = document.querySelectorAll('.faq-section');
    sections.forEach(s => {
      s.style.display = (cat === 'all' || s.dataset.cat === cat) ? 'block' : 'none';
    });
    document.getElementById('noResults').style.display = 'none';

    if (cat !== 'all') {
      const target = document.getElementById(`section-${cat}`);
      if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
