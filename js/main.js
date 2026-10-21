/**
 * LUNARIS — Main Application Logic
 * Clean, lightweight, reliable execution for accordions, navigation,
 * and recruitment validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.CLAN_CONFIG || {};

  // 1. Dynamic Footer Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Setup Discord & External Links
  setupLinks();

  // 3. Setup Rules Accordion Click Handlers
  setupRulesAccordion();

  // 4. Mobile Menu Logic
  setupMobileMenu();

  /* -------------------------------------------------------------
   * FUNCTIONS
   * ------------------------------------------------------------- */

  function setupLinks() {
    const invite = config.discordInvite || 'https://discord.gg/ajQB3fH4rZ';
    document.querySelectorAll('.discord-link').forEach(link => {
      link.href = invite;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });

    const groupLink = document.getElementById('roblox-group-link');
    if (groupLink) {
      if (config.robloxGroup && config.robloxGroup.trim() !== '') {
        groupLink.href = config.robloxGroup;
        groupLink.style.display = 'inline-flex';
      } else {
        groupLink.style.display = 'none';
      }
    }
  }

  function setupRulesAccordion() {
    const container = document.getElementById('rules-accordion');
    if (!container) return;

    container.querySelectorAll('.rule-group-header').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.closest('.rule-group');
        const content = group.querySelector('.rule-content');
        const isOpen = group.classList.contains('is-open');

        if (isOpen) {
          group.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
          content.style.maxHeight = '0px';
        } else {
          group.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = `${content.scrollHeight + 30}px`;
        }
      });
    });
  }



  function setupMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-nav-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');

    if (!hamburgerBtn || !mobileMenu) return;

    function toggleMenu() {
      const isOpen = mobileMenu.classList.contains('active');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    function openMenu() {
      hamburgerBtn.classList.add('open');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('active');
      if (mobileOverlay) mobileOverlay.classList.add('active');
      document.body.classList.add('no-scroll');
    }

    function closeMenu() {
      hamburgerBtn.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('active');
      if (mobileOverlay) mobileOverlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }

    hamburgerBtn.addEventListener('click', toggleMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }
});
