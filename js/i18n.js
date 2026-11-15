/**
 * Borneo Energy Harapan (BEH) — js/i18n.js
 * Client-Side Dynamic Bilingual Engine (ID <-> EN)
 * Features:
 *  - Instant switching without page reload
 *  - Persistent language preference in localStorage
 *  - Dynamic attribute & placeholder updates
 *  - Synchronized UI pill toggle state
 */

'use strict';

(function (global) {
  global.BEH = global.BEH || {};

  const STORAGE_KEY = 'beh_user_lang';
  const DEFAULT_LANG = 'id';
  let currentLang = DEFAULT_LANG;

  /**
   * Applies the selected language to all DOM elements marked with data-i18n,
   * data-i18n-placeholder, and data-i18n-title.
   * @param {string} lang - 'id' or 'en'
   */
  function applyLanguage(lang) {
    if (!global.BEH.translations || !global.BEH.translations[lang]) {
      console.warn('[BEH i18n] Language pack not found for:', lang);
      return;
    }

    currentLang = lang;
    const t = global.BEH.translations[lang];

    // 1. Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);

    // 2. Update Page Title & Meta Description if available
    if (t['meta.title']) {
      document.title = t['meta.title'];
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && t['meta.desc']) {
      metaDesc.setAttribute('content', t['meta.desc']);
    }

    // 3. Update innerHTML or textContent of elements
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        // If translation string contains HTML tags, use innerHTML; otherwise textContent
        if (/<[a-z][\s\S]*>/i.test(t[key])) {
          el.innerHTML = t[key];
        } else {
          el.textContent = t[key];
        }
      }
    });

    // 4. Update Placeholders (e.g. Input and Textarea)
    const inputsWithPlaceholder = document.querySelectorAll('[data-i18n-placeholder]');
    inputsWithPlaceholder.forEach(function (input) {
      const key = input.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) {
        input.setAttribute('placeholder', t[key]);
      }
    });

    // 5. Update aria-labels and title attributes if specified
    const elementsWithTitle = document.querySelectorAll('[data-i18n-title]');
    elementsWithTitle.forEach(function (el) {
      const key = el.getAttribute('data-i18n-title');
      if (t[key] !== undefined) {
        el.setAttribute('title', t[key]);
        el.setAttribute('aria-label', t[key]);
      }
    });

    // 6. Update Language Pill Active State
    updateLangSwitchUI(lang);

    // 7. Save preference to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      console.warn('[BEH i18n] Unable to save language preference to localStorage:', e);
    }

    console.debug('[BEH i18n] Language switched successfully to:', lang);
  }

  /**
   * Updates the visual indicator of the language switcher pills
   * @param {string} lang - 'id' or 'en'
   */
  function updateLangSwitchUI(lang) {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(function (btn) {
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang === lang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  /**
   * Initializes the language switcher buttons and loads saved language
   */
  function initI18n() {
    // Read saved preference or fallback to default
    let savedLang = DEFAULT_LANG;
    try {
      savedLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    } catch (e) {
      savedLang = DEFAULT_LANG;
    }

    // Attach click handlers to any language buttons
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const selected = btn.getAttribute('data-lang');
        if (selected && selected !== currentLang) {
          applyLanguage(selected);
        }
      });
    });

    // Apply language on startup
    applyLanguage(savedLang);
  }

  global.BEH.i18n = {
    init: initI18n,
    setLanguage: applyLanguage,
    getCurrentLanguage: function () {
      return currentLang;
    }
  };
})(window);

