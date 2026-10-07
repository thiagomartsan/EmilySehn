document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

function closeMenu() {
  if (!menuToggle || !nav) return;
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  document.body.classList.remove('menu-open');
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      nav.classList.add('open');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Fechar menu');
      document.body.classList.add('menu-open');
    }
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const faqButtons = document.querySelectorAll('.faq-button');
faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const panel = button.closest('.faq-item')?.querySelector('.faq-panel');
    button.setAttribute('aria-expanded', String(!expanded));
    if (panel) panel.hidden = expanded;
  });
});

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !prefersReduced) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add('is-visible'));
}

function trackSiteEvent(eventName, params = {}) {
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...params });
  }
}

document.querySelectorAll('.wa-link').forEach((link) => {
  link.addEventListener('click', () => trackSiteEvent('whatsapp_click', { href: link.href }));
});
document.querySelectorAll('.map-link').forEach((link) => {
  link.addEventListener('click', () => trackSiteEvent('maps_click', { href: link.href }));
});
document.querySelectorAll('.waze-link').forEach((link) => {
  link.addEventListener('click', () => trackSiteEvent('waze_click', { href: link.href }));
});
document.querySelectorAll('.instagram-link').forEach((link) => {
  link.addEventListener('click', () => trackSiteEvent('instagram_click', { href: link.href }));
});
document.querySelectorAll('.email-link').forEach((link) => {
  link.addEventListener('click', () => trackSiteEvent('email_click', { href: link.href }));
});

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
