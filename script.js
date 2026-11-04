document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

const mobileMenuQuery = window.matchMedia('(max-width: 1020px)');

function syncMenuAccessibility() {
  if (!menuToggle || !nav) return;
  const isMobile = mobileMenuQuery.matches;
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';

  if (isMobile && !isOpen) {
    nav.setAttribute('inert', '');
    nav.setAttribute('aria-hidden', 'true');
  } else {
    nav.removeAttribute('inert');
    nav.removeAttribute('aria-hidden');
  }
}

function closeMenu() {
  if (!menuToggle || !nav) return;
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  document.body.classList.remove('menu-open');
  syncMenuAccessibility();
}

if (menuToggle && nav) {
  syncMenuAccessibility();

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      nav.removeAttribute('inert');
      nav.removeAttribute('aria-hidden');
      nav.classList.add('open');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Fechar menu');
      document.body.classList.add('menu-open');
    }
  });

  nav.querySelectorAll('a, button[data-contact]').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const handleMenuBreakpointChange = () => {
    if (!mobileMenuQuery.matches) closeMenu();
    syncMenuAccessibility();
  };

  if (typeof mobileMenuQuery.addEventListener === 'function') {
    mobileMenuQuery.addEventListener('change', handleMenuBreakpointChange);
  } else if (typeof mobileMenuQuery.addListener === 'function') {
    mobileMenuQuery.addListener(handleMenuBreakpointChange);
  }
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

document.querySelectorAll('.form-link').forEach((link) => {
  link.addEventListener('click', () => trackSiteEvent('form_click', { href: link.href }));
});

const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  backToTop.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReduced ? 'auto' : 'smooth'
    });
  });
}



// Contatos montados somente no clique para reduzir raspagem trivial no HTML.
// Isto é ofuscação leve, não uma barreira contra bots capazes de executar JavaScript.
const decodeChars = (codes) => String.fromCharCode(...codes);
const contactParts = {
  phone: [53,53,53,49,57,57,55,55,55,50,51,54,51],
  emailUser: [112,115,105,101,109,105,108,121,115,101,104,110],
  emailHost: [103,109,97,105,108,46,99,111,109],
  instagram: [101,109,105,95,112,115,105]
};
const phone = decodeChars(contactParts.phone);
const email = `${decodeChars(contactParts.emailUser)}@${decodeChars(contactParts.emailHost)}`;
const instagramHandle = decodeChars(contactParts.instagram);

const whatsappMessages = {
  'whatsapp-general': 'Oi, Emily. Encontrei seu trabalho pelo site e gostaria de saber mais sobre os atendimentos.',
  'whatsapp-presencial': 'Oi, Emily. Gostaria de consultar disponibilidade para atendimento presencial em Maringá.',
  'whatsapp-online': 'Oi, Emily. Gostaria de consultar disponibilidade para atendimento online.'
};

function contactDestination(kind) {
  if (kind === 'instagram') return `https://www.instagram.com/${instagramHandle}/`;
  if (kind === 'email') return `mailto:${email}`;
  if (kind.startsWith('whatsapp')) {
    const message = whatsappMessages[kind] || whatsappMessages['whatsapp-general'];
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }
  return null;
}

document.querySelectorAll('[data-contact]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const kind = trigger.dataset.contact;
    const destination = contactDestination(kind);
    if (!destination) return;
    const eventName = kind === 'instagram' ? 'instagram_click' : kind === 'email' ? 'email_click' : 'whatsapp_click';
    trackSiteEvent(eventName, { contact_type: kind });
    if (kind === 'email') {
      window.location.href = destination;
    } else {
      window.open(destination, '_blank', 'noopener,noreferrer');
    }
  });
});

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
