/**
 * FORMS.JS — Validation & Quote
 */

/* ── Form Validation ── */
export function initFormValidation() {
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      // Clear previous errors
      form.querySelectorAll('.form-error').forEach(el => el.classList.remove('visible'));
      form.querySelectorAll('.form-control').forEach(el => el.classList.remove('error'));

      // Validate required fields
      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('error');
          const errEl = field.parentElement.querySelector('.form-error');
          if (errEl) errEl.classList.add('visible');
        }
      });

      // Validate email fields
      form.querySelectorAll('[type="email"]').forEach(field => {
        if (field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          valid = false;
          field.classList.add('error');
          const errEl = field.parentElement.querySelector('.form-error');
          if (errEl) {
            errEl.textContent = 'Please enter a valid email address';
            errEl.classList.add('visible');
          }
        }
      });

      // Validate phone (optional if filled)
      form.querySelectorAll('[type="tel"]').forEach(field => {
        if (field.value && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(field.value.replace(/\s/g, ''))) {
          valid = false;
          field.classList.add('error');
        }
      });

      if (valid) {
        showSuccessMessage(form);
      }
    });

    // Live validation
    form.querySelectorAll('.form-control').forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('error');
        const errEl = field.parentElement.querySelector('.form-error');
        if (errEl) errEl.classList.remove('visible');
      });
    });
  });
}

function showSuccessMessage(form) {
  const btn = form.querySelector('[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = '✓ Sent Successfully!';
  btn.style.background = 'linear-gradient(135deg, #C6FF00, #A8D900)';
  btn.style.color = '#0A0A0A';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    btn.style.color = '';
    btn.disabled = false;
    form.reset();
  }, 3000);
}

/* ── Price Estimator ── */
export function initEstimator() {
  const form = document.getElementById('estimatorForm');
  const priceEl = document.getElementById('estimatePrice');
  if (!form || !priceEl) return;

  const pricing = {
    'visiting-cards': { base: 25, perUnit: 0.08 },
    'flyers': { base: 40, perUnit: 0.12 },
    'brochures': { base: 80, perUnit: 0.25 },
    'banners': { base: 150, perUnit: 0.5 },
    'stickers': { base: 20, perUnit: 0.05 },
    'packaging': { base: 200, perUnit: 1.2 },
    'tshirts': { base: 30, perUnit: 8 },
    'mugs': { base: 25, perUnit: 6 },
  };

  function calculatePrice() {
    const product = form.querySelector('[name="product"]')?.value || 'visiting-cards';
    const qty = parseInt(form.querySelector('[name="quantity"]')?.value) || 100;
    const paper = form.querySelector('[name="paper"]')?.value || 'standard';
    const finish = form.querySelector('[name="finish"]')?.value || 'matte';

    const p = pricing[product] || pricing['visiting-cards'];
    let price = p.base + (qty * p.perUnit);

    // Multipliers
    if (paper === 'premium') price *= 1.35;
    if (paper === 'eco') price *= 1.1;
    if (finish === 'gloss-uv') price *= 1.25;
    if (finish === 'soft-touch') price *= 1.4;
    if (finish === 'foil') price *= 1.6;

    // Quantity discounts
    if (qty >= 500) price *= 0.9;
    if (qty >= 1000) price *= 0.85;

    priceEl.textContent = '$' + price.toFixed(2);
  }

  form.querySelectorAll('select, input[type="range"], input[type="number"]').forEach(input => {
    input.addEventListener('change', calculatePrice);
    input.addEventListener('input', calculatePrice);
  });

  calculatePrice();
}

/* ── Contact Form ── */
export function initContactForm() {
  initFormValidation();
}
