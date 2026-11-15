/**
 * Borneo Energy Harapan — js/particles.js
 * Fungsi: Efek Partikel Halus Latar Belakang Hero Section
 */
(function (global) {
  'use strict';

  global.BEH = global.BEH || {};

  function initHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const count = 22;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      const size = (Math.random() * 3 + 1.5).toFixed(1);
      const x = (Math.random() * 100).toFixed(1);
      const y = (Math.random() * 100).toFixed(1);
      const opacity = (Math.random() * 0.3 + 0.15).toFixed(2);
      const duration = (Math.random() * 8 + 9).toFixed(1);
      const delay = -(Math.random() * 8).toFixed(1);

      p.style.cssText =
        'position:absolute;' +
        'width:' + size + 'px;' +
        'height:' + size + 'px;' +
        'border-radius:50%;' +
        'background:rgba(66,165,245,' + opacity + ');' +
        'left:' + x + '%;' +
        'top:' + y + '%;' +
        'animation:behParticleAnim ' + duration + 's ease-in-out infinite;' +
        'animation-delay:' + delay + 's;' +
        'pointer-events:none;';

      fragment.appendChild(p);
    }
    container.appendChild(fragment);

    if (!document.getElementById('beh-particle-style')) {
      const st = document.createElement('style');
      st.id = 'beh-particle-style';
      st.textContent =
        '@keyframes behParticleAnim {' +
        '0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }' +
        '50% { transform: translateY(-26px) scale(1.2); opacity: 0.85; }' +
        '}';
      document.head.appendChild(st);
    }
  }

  global.BEH.particles = {
    init: initHeroParticles
  };
})(window);

