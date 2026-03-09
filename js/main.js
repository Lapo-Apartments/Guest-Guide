document.addEventListener("DOMContentLoaded", () => {
  applyTranslations('it');
  initSlider();
});

function applyTranslations(lang) {
  const t = T[lang];
  if (!t) return;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
}

function switchPage(pageId) {
  document.querySelectorAll('.menu-link').forEach(l => l.classList.remove('active'));
  document.getElementById('nav-' + pageId).classList.add('active');
  document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + pageId).classList.add('active');
  
  const titleEl = document.getElementById('main-title');
  titleEl.setAttribute('data-i18n', pageId === 'info' ? 'headline_info' : 'headline_transp');
  
  const currentLang = document.querySelector('.lang-btn.active').getAttribute('data-lang');
  applyTranslations(currentLang);
  closeMenu();
  window.scrollTo(0, 0);
}

function toggleCard(id) {
  const card = document.getElementById(id);
  const isOpen = card.classList.contains('open');
  document.querySelectorAll('.section-card').forEach(c => c.classList.remove('open'));
  if (!isOpen) card.classList.add('open');
}

function initSlider() {
  const slider = document.querySelector('.slider-container');
  if(!slider) return;
  setInterval(() => {
    let next = slider.scrollLeft + slider.clientWidth;
    if(slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth) - 5) next = 0;
    slider.scrollTo({ left: next, behavior: 'smooth' });
  }, 3500);
}

function copyWifi() {
  const pass = document.getElementById("wifi-pass").innerText;
  navigator.clipboard.writeText(pass).then(() => {
    const btn = document.getElementById("btn-copy-wifi");
    const lang = document.querySelector('.lang-btn.active').getAttribute('data-lang');
    btn.innerHTML = `<i class="fas fa-check"></i> <span>${T[lang].btn_copied}</span>`;
    setTimeout(() => {
      btn.innerHTML = `<i class="fas fa-copy"></i> <span>${T[lang].btn_copy}</span>`;
    }, 2000);
  });
}

// Sidebar & Drawers
function openMenu() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebar-overlay').classList.add('open');
}
function closeMenu() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('open');
}
function toggleLangDrawer() { document.getElementById('lang-drawer').classList.toggle('open'); }
function toggleHostDrawer() { document.getElementById('host-drawer').classList.toggle('open'); }
function toggleEmergDrawer() { document.getElementById('emerg-drawer').classList.toggle('open'); }

document.getElementById('lang-drawer').addEventListener('click', e => {
  const btn = e.target.closest('.lang-btn');
  if (!btn) return;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyTranslations(btn.getAttribute('data-lang'));
  document.getElementById('lang-drawer').classList.remove('open');
});
