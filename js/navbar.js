/**
 * Borneo Energy Harapan — js/navbar.js
 * Fungsi: Sticky Navbar, Mobile Menu Burger & Drawer, Highlight Menu Aktif Sesuai Scroll
 */
(function (global) {
  'use strict';

  global.BEH = global.BEH || {};

  function initStickyNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const onScroll = function () {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initMobileMenu() {
    const burger = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');
    if (!burger || !navMenu) return;

    const setMenuOpen = function (open) {
      burger.classList.toggle('open', open);
      navMenu.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };

    burger.addEventListener('click', function () {
      setMenuOpen(!burger.classList.contains('open'));
    });

    const links = navMenu.querySelectorAll('.navbar__link');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuOpen(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.classList.contains('open')) {
        setMenuOpen(false);
      }
    });

    navMenu.addEventListener('click', function (e) {
      if (e.target === navMenu) {
        setMenuOpen(false);
      }
    });
  }

  function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__link');
    if (!sections.length || !navLinks.length) return;

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
              link.classList.remove('active');
            });
            const targetId = '#' + entry.target.id;
            const current = Array.from(navLinks).find(function (link) {
              return link.getAttribute('href') === targetId;
            });
            if (current) current.classList.add('active');
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach(function (sec) {
      observer.observe(sec);
    });
  }

  global.BEH.navbar = {
    init: function () {
      initStickyNavbar();
      initMobileMenu();
      initActiveNavLinks();
    }
  };
})(window);

