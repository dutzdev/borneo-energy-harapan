/**
 * Borneo Energy Harapan — js/filter.js
 * Fungsi: Filter Tab Portofolio Proyek Interaktif
 * Kategori: Semua, Solar PV, Civil, Elektrikal, O&M, Residensial
 */
(function (global) {
  'use strict';

  global.BEH = global.BEH || {};

  function initProjectFilter() {
    var buttons = document.querySelectorAll('.filter-btn');
    var cards   = document.querySelectorAll('.project-card[data-category]');
    var counter = document.getElementById('projectCount');
    if (!buttons.length || !cards.length) return;

    function applyFilter(filter) {
      var visible = 0;
      cards.forEach(function (card) {
        var category = card.getAttribute('data-category');
        var isMatch  = (filter === 'all' || category === filter);

        if (isMatch) {
          card.classList.remove('hidden');
          card.style.opacity   = '0';
          card.style.transform = 'translateY(12px)';
          requestAnimationFrame(function () {
            card.style.transition = 'opacity .3s ease, transform .3s ease';
            card.style.opacity    = '1';
            card.style.transform  = 'translateY(0)';
          });
          visible++;
        } else {
          card.classList.add('hidden');
          card.style.transition = '';
        }
      });
      if (counter) {
        counter.textContent = visible + ' Proyek';
      }
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        applyFilter(filter);
      });
    });

    // Set initial counter on page load
    applyFilter('all');
  }

  global.BEH.filter = {
    init: initProjectFilter
  };
})(window);
