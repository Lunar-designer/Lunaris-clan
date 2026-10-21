/**
 * LUNARIS — Cinematic Animations & Scroll Engine
 * IntersectionObserver reveals, scroll progress, parallax, and navbar states
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Scroll Progress Bar
  const progressBar = document.getElementById('scroll-progress');
  function updateScrollProgress() {
    if (!progressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // 2. Navbar Scroll Transformation & Active Link Highlight
  const navbar = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateNavbar() {
    const scrollY = window.scrollY;

    // Transition navbar background
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy for active section
    let currentSectionId = '';
    const scrollPosition = scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // 3. Smooth scrolling with custom offset for fixed navbar
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 76;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });

        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-nav-menu');
        const hamburgerBtn = document.getElementById('hamburger-btn');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          if (hamburgerBtn) hamburgerBtn.classList.remove('open');
          document.body.classList.remove('no-scroll');
        }
      }
    });
  });

  // 4. Hero Celestial Parallax on Scroll
  const heroMoon = document.getElementById('hero-moon');
  const heroGlow = document.getElementById('hero-glow');
  const heroContent = document.querySelector('.hero-content');

  function updateHeroParallax() {
    if (prefersReducedMotion) return;
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight * 1.5) {
      if (heroMoon) {
        heroMoon.style.transform = `translate3d(0, ${scrollY * 0.28}px, 0) scale(${1 - scrollY * 0.0003})`;
      }
      if (heroGlow) {
        heroGlow.style.transform = `translate3d(0, ${scrollY * 0.18}px, 0)`;
      }
      if (heroContent) {
        heroContent.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0)`;
        heroContent.style.opacity = Math.max(0, 1 - scrollY / 650);
      }
    }
  }

  if (!prefersReducedMotion) {
    window.addEventListener('scroll', updateHeroParallax, { passive: true });
  }

  // 5. Intersection Observer for Scroll Reveals
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.05,
      rootMargin: '60px 0px 60px 0px'
    });

    document.querySelectorAll('.reveal-on-scroll, .stagger-item, .section-heading-wrap').forEach(el => {
      revealObserver.observe(el);
    });

    // Safety reveal: guarantee any element already near or in viewport is visible
    setTimeout(() => {
      document.querySelectorAll('.reveal-on-scroll, .stagger-item, .section-heading-wrap').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 150) {
          el.classList.add('revealed');
        }
      });
    }, 250);
  } else {
    // If reduced motion is requested or observer unavailable, immediately show all elements
    document.querySelectorAll('.reveal-on-scroll, .stagger-item, .section-heading-wrap').forEach(el => {
      el.classList.add('revealed');
    });
  }

  // 6. Interactive Card Mouse Tilt / Lighting effect (Restrained & refined)
  if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    const cards = document.querySelectorAll('.interactive-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }
});
