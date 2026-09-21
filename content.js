// =============================================
//  QuickTop Extension - Content Script
// =============================================

(function () {
  'use strict';

  // Avoid duplicate injection
  if (document.getElementById('stt-scroll-btn')) return;

  // ---- State ----
  let settings = {
    enabled: true,
    threshold: 20,       // percentage of page scrolled
    position: 'bottom-right',
    color: 'purple'
  };

  // Color gradients map
  const COLOR_MAP = {
    purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    pink:   'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    teal:   'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    green:  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    orange: 'linear-gradient(135deg, #fa8231 0%, #f7b733 100%)'
  };

  const COLOR_SHADOW = {
    purple: 'rgba(102, 126, 234, 0.55)',
    pink:   'rgba(240, 147, 251, 0.55)',
    teal:   'rgba(79, 172, 254, 0.55)',
    green:  'rgba(67, 233, 123, 0.55)',
    orange: 'rgba(250, 130, 49, 0.55)'
  };

  // ---- Create button ----
  const btn = document.createElement('button');
  btn.id = 'stt-scroll-btn';
  btn.setAttribute('aria-label', 'Scroll to top');

  btn.innerHTML = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white">
      <polygon points="12,3 20,13 15.5,13 15.5,21 8.5,21 8.5,13 4,13" />
    </svg>
    <svg class="stt-progress-ring" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="27" stroke-dasharray="169.6" stroke-dashoffset="169.6" />
    </svg>
  `;

  document.body.appendChild(btn);

  // ---- Progress ring ----
  const ringCircle = btn.querySelector('.stt-progress-ring circle');
  const ringCircumference = 2 * Math.PI * 27; // r=27 → ~169.6

  function updateRing(scrollPercent) {
    const offset = ringCircumference - (scrollPercent / 100) * ringCircumference;
    ringCircle.style.strokeDashoffset = offset;
    ringCircle.style.strokeDasharray = ringCircumference;
  }

  // ---- Apply settings ----
  function applySettings() {
    // Position
    if (settings.position === 'bottom-left') {
      btn.style.right = 'auto';
      btn.style.left = '40px';
    } else {
      btn.style.left = 'auto';
      btn.style.right = '40px';
    }

    // Color
    const gradient = COLOR_MAP[settings.color] || COLOR_MAP.purple;
    const shadow   = COLOR_SHADOW[settings.color] || COLOR_SHADOW.purple;
    btn.style.background = gradient;
    btn.style.setProperty('--stt-shadow', shadow);
    btn.style.boxShadow = `0 4px 20px ${shadow}, 0 2px 8px rgba(0,0,0,0.3)`;

    // Tooltip side based on position
    // (handled via CSS ::before — stays on left of button by default)
  }

  // ---- Scroll visibility logic ----
  function getScrollPercent() {
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    const viewportHeight = window.innerHeight;
    const scrollable = docHeight - viewportHeight;
    if (scrollable <= 0) return 0;
    const scrolled = window.scrollY || document.documentElement.scrollTop;
    return (scrolled / scrollable) * 100;
  }

  function onScroll() {
    if (!settings.enabled) return;

    const pct = getScrollPercent();
    updateRing(pct);

    if (pct >= settings.threshold) {
      btn.classList.add('stt-visible');
    } else {
      btn.classList.remove('stt-visible');
    }
  }

  // ---- Click handler — smooth scroll to top ----
  btn.addEventListener('click', () => {
    // Ripple animation
    btn.classList.remove('stt-ripple');
    void btn.offsetWidth; // reflow
    btn.classList.add('stt-ripple');

    // Smooth scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Track click count
    chrome.storage.local.get(['clickCount'], (result) => {
      const count = (result.clickCount || 0) + 1;
      chrome.storage.local.set({ clickCount: count });
    });

    // Remove ripple class after animation
    setTimeout(() => btn.classList.remove('stt-ripple'), 600);
  });

  // ---- Load settings and init ----
  function loadAndInit() {
    chrome.storage.sync.get(
      ['enabled', 'threshold', 'position', 'color'],
      (stored) => {
        if (stored.enabled !== undefined) settings.enabled = stored.enabled;
        if (stored.threshold !== undefined) settings.threshold = stored.threshold;
        if (stored.position !== undefined) settings.position = stored.position;
        if (stored.color !== undefined) settings.color = stored.color;

        applySettings();

        if (!settings.enabled) {
          btn.classList.remove('stt-visible');
          return;
        }
        onScroll();
      }
    );
  }

  // Listen for setting changes from popup
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled !== undefined) {
      settings.enabled = changes.enabled.newValue;
      if (!settings.enabled) {
        btn.classList.remove('stt-visible');
      } else {
        onScroll();
      }
    }
    if (changes.threshold !== undefined) settings.threshold = changes.threshold.newValue;
    if (changes.position !== undefined) {
      settings.position = changes.position.newValue;
      applySettings();
    }
    if (changes.color !== undefined) {
      settings.color = changes.color.newValue;
      applySettings();
    }
    onScroll();
  });

  // Throttle scroll listener for performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  loadAndInit();

})();
