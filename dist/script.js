const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.getElementById('year').textContent = String(new Date().getFullYear());
const revealItems = document.querySelectorAll('.reveal');
revealItems.forEach((item) => { const siblings = [...item.parentElement.children].filter((el) => el.classList.contains('reveal')); if (siblings.length > 1) item.style.setProperty('--stagger', `${siblings.indexOf(item) * 90}ms`); });
document.querySelectorAll('.spotlight').forEach((card) => card.addEventListener('pointermove', (event) => { const rect = card.getBoundingClientRect(); card.style.setProperty('--x', `${event.clientX - rect.left}px`); card.style.setProperty('--y', `${event.clientY - rect.top}px`); }, { passive: true }));
if (reduceMotion || !('IntersectionObserver' in window)) revealItems.forEach((item) => item.classList.add('visible'));
else { const observer = new IntersectionObserver((entries, instance) => { entries.forEach((entry) => { if (!entry.isIntersecting) return; entry.target.classList.add('visible'); instance.unobserve(entry.target); }); }, { threshold: .12 }); revealItems.forEach((item) => observer.observe(item)); }
const navLinks = [...document.querySelectorAll('.site-header nav a')];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) { const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (!entry.isIntersecting) return; navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)); }); }, { rootMargin: '-30% 0px -60% 0px' }); sections.forEach((section) => observer.observe(section)); }
if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) { const glow = document.querySelector('.cursor-glow'); window.addEventListener('pointermove', (event) => { glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; }, { passive: true }); }
if (!reduceMotion && 'IntersectionObserver' in window) { const items = document.querySelectorAll('[data-count]'); const observer = new IntersectionObserver((entries, instance) => { entries.forEach((entry) => { if (!entry.isIntersecting) return; const el = entry.target; const target = Number(el.dataset.count); const suffix = el.dataset.suffix || ''; const start = performance.now(); const update = (now) => { const progress = Math.min((now - start) / 850, 1); el.textContent = `${Math.round(target * (1 - Math.pow(1 - progress, 3)))}${suffix}`; if (progress < 1) requestAnimationFrame(update); }; requestAnimationFrame(update); instance.unobserve(el); }); }, { threshold: .8 }); items.forEach((item) => observer.observe(item)); }
const visitors = document.getElementById('visitors');
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
const countryLabel = (code) => code === 'XX' ? '🌐 Unknown' : `${String.fromCodePoint(...[...code].map((c) => 127397 + c.charCodeAt(0)))} ${regionNames.of(code)}`;
let counted = false; try { counted = localStorage.getItem('visit-counted') === '1'; } catch {}
fetch('/api/visits', { method: counted ? 'GET' : 'POST' }).then((res) => res.ok ? res.json() : Promise.reject(res.status)).then((rows) => {
  try { localStorage.setItem('visit-counted', '1'); } catch {}
  document.getElementById('visitor-total').textContent = rows.reduce((sum, row) => sum + row.count, 0).toLocaleString('en');
  document.getElementById('visitor-countries').replaceChildren(...rows.slice(0, 10).map((row) => { const li = document.createElement('li'); li.append(countryLabel(row.country), Object.assign(document.createElement('b'), { textContent: row.count.toLocaleString('en') })); return li; }));
  visitors.hidden = false;
}).catch(() => {});

(() => {
  const root = document.documentElement;
  const meta = document.getElementById('theme-color');
  const btn = document.querySelector('[data-theme-toggle]');
  if (!btn) return;
  const sync = () => {
    const light = root.dataset.theme === 'light';
    btn.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    if (meta) meta.setAttribute('content', light ? '#f2f4ef' : '#080b10');
  };
  sync();
  btn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('theme', root.dataset.theme); } catch {}
    sync();
  });
})();
