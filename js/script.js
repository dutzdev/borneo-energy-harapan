/**
 * Borneo Energy Harapan — js/script.js
 * Inisialisasi Utama Aplikasi & Pelacak Error Terpusat (Safe Execution)
 *
 * Mengoordinasikan seluruh modul terpisah:
 *  - js/navbar.js    : Sticky navbar & mobile drawer
 *  - js/counters.js  : Animasi angka statistik hero
 *  - js/filter.js    : Filter tab portofolio proyek
 *  - js/form.js      : Validasi form kontak & mailto
 *  - js/scroll.js    : Scroll reveal, back-to-top & smooth scroll
 *  - js/particles.js : Efek partikel halus hero
 */

'use strict';

(function (global) {
  global.BEH = global.BEH || {};

  /**
   * Pembungkus Safe Execution untuk mengisolasi dan mendeteksi error per modul
   * @param {string} moduleName - Nama modul/fitur
   * @param {Function} initFn - Fungsi inisialisasi modul
   */
  function safeExecute(moduleName, initFn) {
    if (typeof initFn !== 'function') {
      console.warn('[BEH App] Modul "' + moduleName + '" belum terpasang atau tidak memiliki fungsi init.');
      return;
    }

    try {
      initFn();
      console.debug('[BEH App] Modul "' + moduleName + '" berhasil diinisialisasi.');
    } catch (error) {
      console.error(
        '%c[BEH Error - ' + moduleName + ']',
        'color: #ff3333; font-weight: bold;',
        'Terjadi kendala pada fungsi modul ini:',
        error
      );
    }
  }

  /**
   * Memperbarui tahun hak cipta secara dinamis pada footer
   */
  function updateCopyrightYear() {
    const el = document.getElementById('copyrightYear');
    if (el) el.textContent = new Date().getFullYear();
  }

  /**
   * Inisialisasi seluruh sistem saat DOM siap
   */
  function startApplication() {
    console.info('[BEH App] Memulai inisialisasi website Borneo Energy Harapan...');

    if (global.BEH.navbar)    safeExecute('Navbar', global.BEH.navbar.init);
    if (global.BEH.counters)  safeExecute('Counters', global.BEH.counters.init);
    if (global.BEH.filter)    safeExecute('ProjectFilter', global.BEH.filter.init);
    if (global.BEH.form)      safeExecute('ContactForm', global.BEH.form.init);
    if (global.BEH.scroll)    safeExecute('ScrollEffects', global.BEH.scroll.init);
    if (global.BEH.particles) safeExecute('HeroParticles', global.BEH.particles.init);

    safeExecute('CopyrightYear', updateCopyrightYear);

    console.info('[BEH App] Inisialisasi seluruh modul selesai.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApplication);
  } else {
    startApplication();
  }
})(window);
