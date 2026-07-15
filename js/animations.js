/**
 * ANIMATIONS.JS — Scroll Reveal & Counters
 */

/* ── Scroll Reveal ── */
export function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, (entry.target.dataset.delay || 0));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ── Stagger Reveal ── */
export function initStaggerReveal(selector = '.stagger-child', delay = 100) {
  const parent = document.querySelectorAll('[data-stagger]');
  parent.forEach(p => {
    const children = p.querySelectorAll(selector);
    children.forEach((child, i) => {
      child.style.transitionDelay = (i * delay) + 'ms';
      child.classList.add('reveal');
    });
  });
}

/* ── Counter Animation ── */
export function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 2000;
  const start = performance.now();

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4); // ease out quart
    const current = target * eased;

    el.textContent = prefix + (Number.isInteger(target)
      ? Math.floor(current).toLocaleString()
      : current.toFixed(1)) + suffix;

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* ── Progress Bars ── */
export function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
}

/* ── Parallax ── */
export function initParallax() {
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!parallaxEls.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.4;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + scrollY) * speed;
      el.style.transform = `translateY(${-offset * 0.1}px)`;
    });
  }, { passive: true });
}

/* ── Text Scramble ── */
export function textScramble(element, finalText, duration = 800) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';
  const start = performance.now();

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const revealedChars = Math.floor(progress * finalText.length);

    let result = '';
    for (let i = 0; i < finalText.length; i++) {
      if (i < revealedChars) {
        result += finalText[i];
      } else {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
    }

    element.textContent = result;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* ── Typing Effect ── */
export function initTypingEffect(el, texts, speed = 80, pause = 2000) {
  if (!el) return;
  let textIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = texts[textIndex];
    if (!deleting) {
      el.textContent = current.substring(0, ++charIndex);
      if (charIndex === current.length) {
        setTimeout(() => { deleting = true; type(); }, pause);
        return;
      }
    } else {
      el.textContent = current.substring(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    }
    setTimeout(type, deleting ? speed / 2 : speed);
  }

  type();
}

/* ── Image Lazy Load ── */
export function initLazyImages() {
  const images = document.querySelectorAll('img[data-src]');
  if (!images.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  images.forEach(img => observer.observe(img));
}

/* ── Init All ── */
document.addEventListener('componentsLoaded', () => {
  initScrollReveal();
  initCounters();
  initProgressBars();
  initParallax();
  initLazyImages();
});

// Also support direct DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  if (!document.componentsInjected) {
    initScrollReveal();
    initCounters();
    initProgressBars();
  }
});
