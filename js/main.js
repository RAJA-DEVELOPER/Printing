/**
 * MAIN.JS — Core Initialization
 * PrintCraft Premium Branding Agency
 * Features: Theme Toggle, RTL Toggle, Navbar, Footer, Cursor, Loader, Accordions
 */

/* ════════════════════════════════════════
   CSS INJECTION — Load new sheets once
   ════════════════════════════════════════ */
(function injectStyles() {
  const sheets = ['css/theme.css', 'css/rtl.css', 'css/responsive.css'];
  sheets.forEach(href => {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  });
})();

/* ════════════════════════════════════════
   THEME SYSTEM
   ════════════════════════════════════════ */
const THEME_KEY = 'pc-theme';
const RTL_KEY   = 'pc-dir';

function getStoredTheme() {
  return localStorage.getItem(THEME_KEY) || 'dark';
}

function getStoredDir() {
  return localStorage.getItem(RTL_KEY) || 'ltr';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  // Update toggle button state
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.setAttribute('aria-pressed', theme === 'light');
    btn.setAttribute('title', theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
    const sun = btn.querySelector('.theme-icon-sun');
    const moon = btn.querySelector('.theme-icon-moon');
    if (sun && moon) {
      sun.style.display = theme === 'light' ? 'none' : '';
      moon.style.display = theme === 'light' ? '' : 'none';
    }
  }
  // Update meta theme-color for mobile browsers
  let metaTheme = document.querySelector('meta[name="theme-color"]');
  if (!metaTheme) {
    metaTheme = document.createElement('meta');
    metaTheme.name = 'theme-color';
    document.head.appendChild(metaTheme);
  }
  metaTheme.content = theme === 'light' ? '#FAFAFA' : '#0A0A0A';
}

function applyDir(dir) {
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', 'en');
  localStorage.setItem(RTL_KEY, dir);
  const btn = document.getElementById('rtlToggle');
  if (btn) {
    btn.classList.toggle('active', dir === 'rtl');
    btn.setAttribute('aria-pressed', dir === 'rtl');
    btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    btn.setAttribute('title', dir === 'rtl' ? 'Switch to Left-to-Right' : 'Switch to Right-to-Left');
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

function toggleDir() {
  const current = document.documentElement.getAttribute('dir') || 'ltr';
  applyDir(current === 'ltr' ? 'rtl' : 'ltr');
}

/* Apply stored preferences immediately to avoid FOUC */
applyTheme(getStoredTheme());
applyDir(getStoredDir());

/* ════════════════════════════════════════
   INJECT SHARED COMPONENTS
   ════════════════════════════════════════ */
function injectNavbar() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = [
    { href: 'index.html', label: 'Home' },
    { href: 'home2.html', label: 'Home 2' },
    { href: 'about.html', label: 'About' },
    { href: 'services.html', label: 'Services' },
    { href: 'gallery.html', label: 'Gallery' },
    { href: 'contact.html', label: 'Contact' },
  ];

  const navHTML = `
    <div class="noise-overlay"></div>

    <div class="page-loader" id="pageLoader">
      <div class="loader-inner">
        <div class="loader-brand">Print<span style="color:var(--neon)">Craft</span></div>
        <div class="loader-progress"><div class="loader-bar"></div></div>
      </div>
    </div>

    <nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
      <div class="container">
        <div class="navbar__inner">
          <a href="index.html" class="navbar__logo" aria-label="PrintCraft Home">
            <div class="navbar__logo-mark">P</div>
            <span class="navbar__logo-text">Print<span>Craft</span></span>
          </a>

          <div class="navbar__menu" role="menubar">
            ${navLinks.map(link =>
              `<a href="${link.href}" class="navbar__link ${currentPage === link.href ? 'active' : ''}" role="menuitem">${link.label}</a>`
            ).join('')}
          </div>

          <div class="navbar__actions">
            <!-- Theme + RTL controls -->
            <div class="ctrl-panel" style="display:flex;align-items:center;gap:0.5rem">
              <!-- RTL Toggle -->
              <button
                class="rtl-toggle-btn"
                id="rtlToggle"
                onclick="toggleDir()"
                aria-pressed="false"
                title="Switch to Right-to-Left"
              >RTL</button>

              <!-- Theme toggle -->
              <button
                class="theme-toggle-btn"
                id="themeToggle"
                onclick="toggleTheme()"
                aria-pressed="false"
                aria-label="Toggle dark/light mode"
                title="Toggle Light/Dark Mode"
              >
                <svg class="theme-icon-sun" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 4.93l-1.41 1.41"/></svg>
                <svg class="theme-icon-moon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              </button>
            </div>

            <div class="ctrl-divider"></div>
            <a href="login.html" class="navbar__profile-btn" aria-label="Login or Sign up" title="Login / Sign up">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
            </a>
            <a href="dashboard.html" class="btn btn--ghost btn--sm" style="display:none" id="navDashBtn">Dashboard</a>
            <button class="navbar__hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="navbar__mobile" id="mobileMenu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <button class="navbar__hamburger active" id="mobileClose" aria-label="Close menu" style="position:absolute;top:2rem;right:2rem">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
      ${navLinks.map(link =>
        `<a href="${link.href}" class="navbar__mobile-link">${link.label}</a>`
      ).join('')}
      <div class="navbar__mobile-actions">
        <a href="login.html" class="btn btn--outline">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:0.5rem;vertical-align:middle"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>Sign In
        </a>
        <a href="dashboard.html" class="btn btn--outline">Dashboard</a>
      </div>
      <!-- Mobile Theme/RTL Controls -->
      <div style="display:flex;align-items:center;gap:1rem;padding:1.5rem 0 0;border-top:1px solid var(--border);margin-top:auto">
        <button
          class="rtl-toggle-btn"
          onclick="toggleDir();document.getElementById('mobileClose').click()"
          style="flex:1;justify-content:center"
        >Toggle RTL</button>
        <button
          onclick="toggleTheme();document.getElementById('mobileClose').click()"
          class="btn btn--outline btn--sm"
          style="flex:1"
        >Toggle Theme</button>
      </div>
    </div>

    <button class="back-to-top" id="backToTop" aria-label="Back to top">↑</button>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = navHTML;
  document.body.insertBefore(wrapper, document.body.firstChild);
}

function injectFooter() {
  const footerHTML = `
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <div class="navbar__logo" style="margin-bottom:1rem">
              <div class="navbar__logo-mark">P</div>
              <span class="navbar__logo-text">Print<span>Craft</span></span>
            </div>
            <p class="footer__brand-desc">
              Elevating brands through exceptional print craft. From visiting cards to full corporate identities — we create impressions that endure.
            </p>
            <div class="footer__social">
              <a href="https://instagram.com/printcraft.studio" class="footer__social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
              <a href="https://linkedin.com/company/printcraftstudio" class="footer__social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
              <a href="https://x.com/printcraft" class="footer__social-link" aria-label="Twitter / X" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l16 16M20 4L4 20"/></svg></a>
              <a href="https://behance.net/printcraftstudio" class="footer__social-link" aria-label="Behance" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 8h-6M18 12h-2M17 16h-6"/><rect x="2" y="6" width="8" height="12" rx="1"/><path d="M6 12h4"/></svg></a>
            </div>
          </div>

          <div>
            <div class="footer__heading">Services</div>
            <div class="footer__links">
              <a href="services.html#cards" class="footer__link">Visiting Cards</a>
              <a href="services.html#flyers" class="footer__link">Flyers & Brochures</a>
              <a href="services.html#banners" class="footer__link">Banners & Signage</a>
              <a href="services.html#merch" class="footer__link">Merchandise</a>
              <a href="services.html#corporate" class="footer__link">Corporate Branding</a>
              <a href="services.html#packaging" class="footer__link">Packaging</a>
            </div>
          </div>

          <div>
            <div class="footer__heading">Company</div>
            <div class="footer__links">
              <a href="index.html" class="footer__link">Home</a>
              <a href="home2.html" class="footer__link">Home 2</a>
              <a href="about.html" class="footer__link">About</a>
              <a href="services.html" class="footer__link">Services</a>
              <a href="gallery.html" class="footer__link">Gallery</a>
              <a href="contact.html" class="footer__link">Contact</a>
              <a href="dashboard.html" class="footer__link">Client Portal</a>
            </div>
          </div>

          <div>
            <div class="footer__heading">Contact</div>
            <div class="footer__contact-item">
              <span class="footer__contact-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
              <span>42 Creative District, Innovation Tower, Dubai, UAE</span>
            </div>
            <div class="footer__contact-item">
              <span class="footer__contact-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
              <span>+971 4 123 4567</span>
            </div>
            <div class="footer__contact-item">
              <span class="footer__contact-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
              <span>hello@printcraft.studio</span>
            </div>
            <div class="footer__contact-item">
              <span class="footer__contact-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
              <span>Mon–Sat: 9am – 7pm</span>
            </div>
          </div>
        </div>

        <div class="footer__bottom">
          <p class="footer__copy">© ${new Date().getFullYear()} PrintCraft Studio. All rights reserved.</p>
          <div class="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

/* ════════════════════════════════════════
   NAVBAR — SCROLL & MOBILE
   ════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const dashBtn = document.getElementById('navDashBtn');

  if (!navbar) return;

  // Show dashboard button on md+ screens
  function updateDashBtn() {
    if (dashBtn) dashBtn.style.display = window.innerWidth >= 768 ? 'inline-flex' : 'none';
  }
  updateDashBtn();
  window.addEventListener('resize', updateDashBtn, { passive: true });

  // Scroll behavior
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 50);
    // Hide on scroll down, show on scroll up (for mobile)
    if (scrollY > 300 && scrollY > lastScroll && !mobileMenu.classList.contains('open')) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = '';
    }
    lastScroll = scrollY;
  }, { passive: true });

  function toggleMenu() {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
    navbar.style.transform = '';
  }

  if (hamburger) hamburger.addEventListener('click', toggleMenu);
  if (mobileClose) mobileClose.addEventListener('click', toggleMenu);

  // Close on mobile link click
  if (mobileMenu) {
    mobileMenu.querySelectorAll('.navbar__mobile-link').forEach(link => {
      link.addEventListener('click', toggleMenu);
    });
    // Close on outside click
    mobileMenu.addEventListener('click', e => {
      if (e.target === mobileMenu) toggleMenu();
    });
  }

  // Close mobile menu on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && mobileMenu.classList.contains('open')) {
      toggleMenu();
    }
  }, { passive: true });

  // Sync toggle buttons after injection
  applyTheme(getStoredTheme());
  applyDir(getStoredDir());
}

/* ════════════════════════════════════════
   BACK TO TOP
   ════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ════════════════════════════════════════
   PAGE LOADER
   ════════════════════════════════════════ */
function initLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;
  document.body.style.overflow = 'hidden';
  const hideLoader = () => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  };
  // Hide when page is loaded, or after max 2.5s
  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 800);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 600));
    setTimeout(hideLoader, 2500);
  }
}

/* ════════════════════════════════════════
   CUSTOM CURSOR (desktop only)
   ════════════════════════════════════════ */
/* ════════════════════════════════════════
   ACCORDION
   ════════════════════════════════════════ */
function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const body = trigger.nextElementSibling;
      const isOpen = body.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-body.open').forEach(b => b.classList.remove('open'));
      document.querySelectorAll('.accordion-trigger').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-expanded', 'false');
        const icon = t.querySelector('.accordion-icon');
        if (icon) icon.textContent = '+';
      });

      if (!isOpen) {
        body.classList.add('open');
        trigger.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        const icon = trigger.querySelector('.accordion-icon');
        if (icon) icon.textContent = '−';
      }
    });
  });
}

/* ════════════════════════════════════════
   SMOOTH SCROLL
   ════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = document.getElementById('navbar')?.offsetHeight || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ════════════════════════════════════════
   KEYBOARD ACCESSIBILITY
   ════════════════════════════════════════ */
function initKeyboardNav() {
  // Close mobile menu on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu?.classList.contains('open')) {
        document.getElementById('mobileClose')?.click();
      }
    }
  });
}

/* ════════════════════════════════════════
   EXPOSE GLOBALS
   ════════════════════════════════════════ */
window.toggleTheme = toggleTheme;
window.toggleDir   = toggleDir;
window.applyTheme  = applyTheme;
window.applyDir    = applyDir;

/* ════════════════════════════════════════
   INIT
   ════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  injectNavbar();
  injectFooter();
  applyTheme(getStoredTheme());
  applyDir(getStoredDir());
  initNavbar();
  initBackToTop();
  initLoader();
  initAccordions();
  initSmoothScroll();
  initKeyboardNav();

  // Dispatch event so page-specific scripts can run after navbar injection
  document.dispatchEvent(new Event('componentsLoaded'));
});
