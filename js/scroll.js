/**
 * Borneo Energy Harapan — js/scroll.js
 * Fungsi: Scroll Reveal Elemen Viewport, Tombol Back-to-Top & Smooth Anchor Scroll
 */
(function (global) {
  'use strict';

  global.BEH = global.BEH || {};

  function initScrollReveal() {
    const targets = document.querySelectorAll(
      '.service-card, .project-card, .cert-card, .vm-card, .about__text, .about__tags, .section-header, .contact-item'
    );
    if (!targets.length) return;

    targets.forEach(function (el, index) {
      el.setAttribute('data-reveal', '');
      el.style.transitionDelay = (index % 4) * 0.07 + 's';
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -50px 0px', threshold: 0.05 }
      );
      targets.forEach(function (t) {
        observer.observe(t);
      });
    } else {
      targets.forEach(function (t) {
        t.classList.add('revealed');
      });
    }
  }

  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener(
      'scroll',
      function () {
        if (window.scrollY > 450) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      },
      { passive: true }
    );

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    const navbar = document.getElementById('navbar');

    anchorLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetEl = document.querySelector(targetId);
        if (!targetEl) return;

        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 70;
        const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      });
    });
  }

  global.BEH.scroll = {
    init: function () {
      initScrollReveal();
      initBackToTop();
      initSmoothScroll();
    }
  };
})(window);

