/**
 * Borneo Energy Harapan — js/counters.js
 * Fungsi: Animasi Angka Statistik pada Section Hero saat Masuk Viewport
 */
(function (global) {
  'use strict';

  global.BEH = global.BEH || {};

  function initHeroCounters() {
    const counters = document.querySelectorAll('.stat-item__number[data-target]');
    if (!counters.length) return;

    const easeOutQuad = function (t) {
      return t * (2 - t);
    };

    const runCounter = function (el) {
      const target = parseInt(el.getAttribute('data-target'), 10);
      if (isNaN(target)) return;

      const duration = 1800;
      const start = performance.now();

      const tick = function (now) {
        const elapsed = Math.min(now - start, duration);
        const progress = easeOutQuad(elapsed / duration);
        el.textContent = Math.floor(progress * target);

        if (elapsed < duration) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target;
        }
      };

      requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              runCounter(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      counters.forEach(function (c) {
        observer.observe(c);
      });
    } else {
      counters.forEach(function (c) {
        runCounter(c);
      });
    }
  }

  global.BEH.counters = {
    init: initHeroCounters
  };
})(window);

