const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.getElementById('year').textContent = String(new Date().getFullYear());
const revealItems = document.querySelectorAll('.reveal');
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
