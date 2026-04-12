/**
 * Wildshakes Cafe — Shared App Logic
 * Handles: cookie consent, back-to-top, WhatsApp CTA, toast notifications,
 * image error fallbacks, smooth anchor scrolling, mobile touch support.
 */

(function () {
  'use strict';

  /* ══════════════════════════════════════════
     1. COOKIE CONSENT BANNER
  ══════════════════════════════════════════ */
  function initCookieBanner() {
    if (localStorage.getItem('ws_cookie_ok')) return;

    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = `
      <div class="cookie-inner">
        <div class="cookie-text">
          <span class="cookie-icon">🍪</span>
          <p>We use cookies to give you the best experience on our site.
            <a href="#" onclick="return false;">Learn more</a></p>
        </div>
        <div class="cookie-actions">
          <button id="cookie-decline" class="cookie-btn cookie-btn-outline">Decline</button>
          <button id="cookie-accept" class="cookie-btn cookie-btn-primary">Accept All</button>
        </div>
      </div>`;

    document.body.appendChild(banner);
    requestAnimationFrame(() => banner.classList.add('visible'));

    document.getElementById('cookie-accept').addEventListener('click', () => {
      localStorage.setItem('ws_cookie_ok', '1');
      banner.classList.remove('visible');
      setTimeout(() => banner.remove(), 500);
    });
    document.getElementById('cookie-decline').addEventListener('click', () => {
      banner.classList.remove('visible');
      setTimeout(() => banner.remove(), 500);
    });
  }

  /* ══════════════════════════════════════════
     2. BACK TO TOP BUTTON
  ══════════════════════════════════════════ */
  function initBackToTop() {
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.title = 'Back to top';
    btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline></svg>`;
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ══════════════════════════════════════════
     3. WHATSAPP FLOATING BUTTON
  ══════════════════════════════════════════ */
  function initWhatsApp() {
    const fab = document.createElement('div');
    fab.id = 'whatsapp-fab';
    fab.innerHTML = `
      <a href="https://wa.me/639453147953?text=Hi%20Wildshakes!%20I'd%20like%20to%20inquire%20about%20your%20franchise%2Fmenu."
         target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" id="wa-link">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="28" height="28">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
      <div id="wa-tooltip">Chat with us on WhatsApp!</div>`;
    document.body.appendChild(fab);

    // Show tooltip briefly then hide
    setTimeout(() => { fab.classList.add('show-tooltip'); }, 3000);
    setTimeout(() => { fab.classList.remove('show-tooltip'); }, 7000);
  }

  /* ══════════════════════════════════════════
     4. TOAST NOTIFICATION SYSTEM
  ══════════════════════════════════════════ */
  window.wsToast = function (message, type = 'success', duration = 3500) {
    const container = document.getElementById('toast-container') || (() => {
      const c = document.createElement('div');
      c.id = 'toast-container';
      document.body.appendChild(c);
      return c;
    })();
    const toast = document.createElement('div');
    toast.className = `ws-toast ws-toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('visible'));
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  };

  /* ══════════════════════════════════════════
     5. IMAGE ERROR FALLBACK
  ══════════════════════════════════════════ */
  function initImageFallbacks() {
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', function () {
        this.style.background = 'linear-gradient(135deg, #D6EFB6 0%, #4F7942 100%)';
        this.style.minHeight = '200px';
        this.alt = this.alt || 'Wildshakes Cafe';
        this.removeAttribute('src');
      });
    });
  }

  /* ══════════════════════════════════════════
     6. SMOOTH ANCHOR SCROLLING (for hash links)
  ══════════════════════════════════════════ */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const navH = document.getElementById('navbar')?.offsetHeight || 80;
          const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ══════════════════════════════════════════
     7. ACTIVE NAV LINK HIGHLIGHT (scroll-spy)
  ══════════════════════════════════════════ */
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id], div[id]');
    if (!sections.length) return;
    const navLinks = document.querySelectorAll('.nav-links a');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active-spy', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => observer.observe(s));
  }

  /* ══════════════════════════════════════════
     8. PERFORMANCE: MARK LCP IMAGE
  ══════════════════════════════════════════ */
  function addFetchPriority() {
    const heroImg = document.querySelector('#hero-bg, .page-hero img');
    if (heroImg) {
      heroImg.setAttribute('fetchpriority', 'high');
      heroImg.setAttribute('loading', 'eager');
    }
  }

  /* ══════════════════════════════════════════
     9. INJECT GLOBAL STYLES
  ══════════════════════════════════════════ */
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Back to Top */
      #back-to-top {
        position: fixed;
        bottom: 100px;
        right: 28px;
        width: 48px; height: 48px;
        border-radius: 50%;
        border: none;
        background: var(--green-dark);
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 800;
        opacity: 0;
        pointer-events: none;
        transform: translateY(12px);
        transition: opacity 0.3s ease, transform 0.3s ease, background 0.2s ease;
        box-shadow: 0 4px 16px rgba(45,90,39,0.35);
      }
      #back-to-top.visible {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
      }
      #back-to-top:hover {
        background: var(--green-mid);
        transform: translateY(-3px);
      }

      /* WhatsApp FAB */
      #whatsapp-fab {
        position: fixed;
        bottom: 28px;
        right: 28px;
        z-index: 800;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 10px;
      }
      #wa-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56px; height: 56px;
        border-radius: 50%;
        background: #25D366;
        color: white;
        box-shadow: 0 4px 20px rgba(37,211,102,0.45);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        animation: waPulse 2.5s ease-in-out 4s infinite;
      }
      @keyframes waPulse {
        0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.45); }
        50% { box-shadow: 0 4px 32px rgba(37,211,102,0.75), 0 0 0 8px rgba(37,211,102,0.12); }
      }
      #wa-link:hover { transform: scale(1.12); box-shadow: 0 8px 28px rgba(37,211,102,0.55); }
      #wa-tooltip {
        background: var(--black);
        color: white;
        font-size: 0.78rem;
        padding: 8px 14px;
        border-radius: 20px;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transform: translateX(8px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        font-family: 'Inter', sans-serif;
      }
      #whatsapp-fab.show-tooltip #wa-tooltip {
        opacity: 1;
        pointer-events: auto;
        transform: translateX(0);
      }

      /* Cookie Banner */
      #cookie-banner {
        position: fixed;
        bottom: -120px;
        left: 0; right: 0;
        z-index: 2000;
        background: var(--black-mid);
        padding: 16px clamp(16px, 4vw, 60px);
        transition: bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        border-top: 1px solid rgba(255,255,255,0.1);
      }
      #cookie-banner.visible { bottom: 0; }
      .cookie-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        flex-wrap: wrap;
        max-width: 1200px;
        margin: 0 auto;
      }
      .cookie-text {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .cookie-icon { font-size: 1.4rem; }
      .cookie-text p { color: rgba(255,255,255,0.75); font-size: 0.88rem; line-height: 1.5; font-family: 'Inter', sans-serif; }
      .cookie-text a { color: #C9A84C; text-decoration: underline; }
      .cookie-actions { display: flex; gap: 10px; flex-shrink: 0; }
      .cookie-btn {
        padding: 10px 22px;
        border-radius: 50px;
        font-size: 0.82rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: 'Inter', sans-serif;
        border: none;
      }
      .cookie-btn-primary { background: #2D5A27; color: white; }
      .cookie-btn-primary:hover { background: #4F7942; }
      .cookie-btn-outline { background: transparent; color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.3); }
      .cookie-btn-outline:hover { border-color: white; color: white; }

      /* Toast */
      #toast-container {
        position: fixed;
        top: 100px;
        right: 24px;
        z-index: 3000;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
      }
      .ws-toast {
        background: var(--black-mid);
        color: white;
        padding: 14px 20px;
        border-radius: 10px;
        font-size: 0.9rem;
        font-family: 'Inter', sans-serif;
        opacity: 0;
        transform: translateX(40px);
        transition: opacity 0.35s ease, transform 0.35s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        border-left: 4px solid #4F7942;
        max-width: 320px;
      }
      .ws-toast.ws-toast-success { border-left-color: #4F7942; }
      .ws-toast.ws-toast-error { border-left-color: #c0392b; }
      .ws-toast.ws-toast-info { border-left-color: #C9A84C; }
      .ws-toast.visible { opacity: 1; transform: translateX(0); }

      /* Print styles */
      @media print {
        #navbar, #cookie-banner, #back-to-top, #whatsapp-fab,
        #page-loader, .cursor-glow { display: none !important; }
        body { background: white !important; color: black !important; }
        .section { padding: 20px 0 !important; }
        a { color: black !important; }
      }
    `;
    document.head.appendChild(style);
  }

  /* ══════════════════════════════════════════
     10. INIT ALL
  ══════════════════════════════════════════ */
  function init() {
    injectStyles();
    initCookieBanner();
    initBackToTop();
    initWhatsApp();
    initImageFallbacks();
    initSmoothAnchors();
    addFetchPriority();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
