/**
 * Borneo Energy Harapan — js/form.js
 * Fungsi: Validasi Input Formulir Kontak & Integrasi Tautan Email Mailto
 */
(function (global) {
  'use strict';

  global.BEH = global.BEH || {};

  function initContactForm() {
    const form = document.getElementById('contactForm');
    const note = document.getElementById('formNote');
    if (!form) return;

    const showNote = function (msg, type) {
      if (!note) return;
      note.textContent = msg;
      note.className = 'form-note ' + type;
      setTimeout(function () {
        note.textContent = '';
        note.className = 'form-note';
      }, 6000);
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = (document.getElementById('name') || {}).value || '';
      const email = (document.getElementById('email') || {}).value || '';
      const company = (document.getElementById('company') || {}).value || '';
      const service = (document.getElementById('service') || {}).value || '';
      const message = (document.getElementById('message') || {}).value || '';

      if (!name.trim()) {
        showNote('Nama lengkap wajib diisi.', 'error');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim() || !emailRegex.test(email.trim())) {
        showNote('Harap masukkan alamat email yang valid.', 'error');
        return;
      }
      if (!message.trim()) {
        showNote('Pesan kebutuhan proyek tidak boleh kosong.', 'error');
        return;
      }

      const subject = encodeURIComponent('Inquiry Proyek BEH: ' + (service || 'Umum') + ' - ' + name);
      const textWa = encodeURIComponent(
        '*INQUIRY PROYEK & KONSULTASI BEH*\n' +
        '------------------------------------\n' +
        '*Nama Lengkap:* ' + name + '\n' +
        '*Email:* ' + email + '\n' +
        '*Perusahaan:* ' + (company || '-') + '\n' +
        '*Layanan:* ' + (service || '-') + '\n' +
        '------------------------------------\n' +
        '*Deskripsi Kebutuhan:*\n' + message + '\n\n' +
        '_Dikirim melalui formulir website resmi PT Borneo Energy Harapan_'
      );

      // Buka percakapan WhatsApp ke nomor resmi BEH 0821-5111-6155 (6282151116155)
      const waUrl = 'https://wa.me/6282151116155?text=' + textWa;
      window.open(waUrl, '_blank');

      showNote('Data Anda telah disiapkan. Jendela WhatsApp resmi BEH akan terbuka...', 'success');
      form.reset();
    });
  }

  global.BEH.form = {
    init: initContactForm
  };
})(window);

