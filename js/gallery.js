/**
 * GALLERY.JS — Filter & Lightbox
 */

/* ── Gallery Filter ── */
export function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.tab-btn[data-filter]');
  const galleryItems = document.querySelectorAll('.gallery-item[data-category]');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        if (match) {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
          item.style.display = '';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            if (!match) item.style.display = 'none';
          }, 400);
        }
      });
    });
  });
}

/* ── Lightbox ── */
export function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__prev');
  const nextBtn = lightbox.querySelector('.lightbox__next');

  let items = [];
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const src = items[index].dataset.full || items[index].querySelector('img')?.src;
    lightboxImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + items.length) % items.length;
    const src = items[currentIndex].dataset.full || items[currentIndex].querySelector('img')?.src;
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = src;
      lightboxImg.style.opacity = '1';
    }, 200);
  }

  // Assign lightbox triggers
  document.querySelectorAll('.gallery-item, .masonry-item').forEach((item, i) => {
    items.push(item);
    item.addEventListener('click', () => openLightbox(i));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => navigate(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigate(1));

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
}

/* ── Masonry Layout (CSS columns fallback enhancement) ── */
export function initMasonry() {
  // CSS columns handles this, but we can add JS touch support
  const grid = document.querySelector('.masonry-grid');
  if (!grid) return;
  // Reflow after images load
  const imgs = grid.querySelectorAll('img');
  imgs.forEach(img => {
    img.addEventListener('load', () => {
      grid.style.display = 'none';
      grid.offsetHeight; // trigger reflow
      grid.style.display = '';
    });
  });
}
