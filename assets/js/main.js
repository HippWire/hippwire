document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.classList.toggle('open');
    });
  }

  // Gallery modals
  const cards = document.querySelectorAll('.gallery-card[data-modal]');
  let lastTrigger = null;
  const openModal = (id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    lastTrigger = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  };
  const closeModal = (modal) => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastTrigger && lastTrigger.focus) lastTrigger.focus({ preventScroll: true });
  };

  cards.forEach((card) => {
    const id = card.getAttribute('data-modal');
    card.addEventListener('click', () => openModal(id));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(id);
      }
    });
  });

  document.querySelectorAll('.modal').forEach((modal) => {
    modal.querySelectorAll('[data-close]').forEach((el) => {
      el.addEventListener('click', () => closeModal(modal));
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.is-open').forEach(closeModal);
    }
  });
});
