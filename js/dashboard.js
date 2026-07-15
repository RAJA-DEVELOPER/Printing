/**
 * DASHBOARD.JS — Customer Dashboard Logic
 */

/* ── Dashboard Navigation ── */
export function initDashboard() {
  const navItems = document.querySelectorAll('.dash-nav-item[data-section]');
  const sections = document.querySelectorAll('.dash-section');
  const pageTitle = document.getElementById('dashPageTitle');

  navItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const targetSection = item.dataset.section;

      navItems.forEach(n => n.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      item.classList.add('active');
      const target = document.getElementById('section-' + targetSection);
      if (target) target.classList.add('active');
      if (pageTitle) pageTitle.textContent = item.querySelector('.dash-nav-label-text')?.textContent || '';

      // Update URL hash
      window.location.hash = targetSection;
    });
  });

  // Handle initial hash
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const navItem = document.querySelector(`.dash-nav-item[data-section="${hash}"]`);
    if (navItem) navItem.click();
  }
}

/* ── Drag & Drop Upload ── */
export function initUpload() {
  const zone = document.getElementById('uploadZone');
  if (!zone) return;

  const fileInput = zone.querySelector('input[type="file"]');
  const preview = document.getElementById('uploadPreview');

  ['dragenter', 'dragover'].forEach(event => {
    zone.addEventListener(event, e => {
      e.preventDefault();
      zone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(event => {
    zone.addEventListener(event, e => {
      e.preventDefault();
      zone.classList.remove('dragover');
    });
  });

  zone.addEventListener('drop', e => {
    const files = e.dataTransfer.files;
    handleFiles(files);
  });

  if (fileInput) {
    fileInput.addEventListener('change', () => {
      handleFiles(fileInput.files);
    });
  }

  function handleFiles(files) {
    if (!preview) return;
    preview.innerHTML = '';

    Array.from(files).forEach(file => {
      const item = document.createElement('div');
      item.className = 'upload-file-item';
      item.style.cssText = `
        display: flex; align-items: center; gap: 1rem;
        padding: 0.875rem 1.25rem;
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        margin-top: 0.75rem;
        font-size: var(--text-sm);
      `;

      const icon = document.createElement('span');
      icon.textContent = getFileIcon(file.type);
      icon.style.fontSize = '1.5rem';

      const info = document.createElement('div');
      info.innerHTML = `
        <div style="font-weight:600;color:var(--text-primary)">${file.name}</div>
        <div style="font-size:var(--text-xs);color:var(--text-muted)">${formatSize(file.size)}</div>
      `;

      const progress = document.createElement('div');
      progress.className = 'progress-bar';
      progress.style.flex = '1';
      const fill = document.createElement('div');
      fill.className = 'progress-fill';
      fill.dataset.width = '0';
      progress.appendChild(fill);

      const status = document.createElement('span');
      status.style.cssText = 'font-size:var(--text-xs);color:var(--copper);white-space:nowrap';
      status.textContent = 'Uploading...';

      item.append(icon, info, progress, status);
      preview.appendChild(item);

      // Simulate upload progress
      simulateUpload(fill, status);
    });
  }

  function simulateUpload(fillEl, statusEl) {
    let w = 0;
    const interval = setInterval(() => {
      w += Math.random() * 15 + 5;
      if (w >= 100) {
        w = 100;
        clearInterval(interval);
        statusEl.textContent = '✓ Ready';
        statusEl.style.color = 'var(--neon)';
      }
      fillEl.style.width = w + '%';
    }, 120);
  }

  function getFileIcon(type) {
    if (type.startsWith('image/')) return '🖼️';
    if (type === 'application/pdf') return '📄';
    if (type.includes('illustrator') || type.includes('ai')) return '🎨';
    return '📁';
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
}

/* ── Order Reorder ── */
export function initReorder() {
  document.querySelectorAll('.btn-reorder').forEach(btn => {
    btn.addEventListener('click', () => {
      const originalText = btn.textContent;
      btn.textContent = 'Added to Cart!';
      btn.disabled = true;
      btn.style.background = 'var(--neon)';
      btn.style.color = 'var(--obsidian)';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.color = '';
      }, 2500);
    });
  });
}

/* ── Dashboard Tabs ── */
export function initDashTabs() {
  document.querySelectorAll('[data-tab-group]').forEach(group => {
    const groupName = group.dataset.tabGroup;
    const btns = group.querySelectorAll('[data-tab]');
    const panels = document.querySelectorAll(`[data-tab-panel="${groupName}"]`);

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.style.display = 'none');
        btn.classList.add('active');
        const panel = document.querySelector(`[data-tab-panel="${groupName}"][data-tab-id="${btn.dataset.tab}"]`);
        if (panel) panel.style.display = '';
      });
    });
  });
}

/* ── Countdown Timer (Maintenance) ── */
export function initCountdown(targetDate) {
  const els = {
    d: document.getElementById('countDays'),
    h: document.getElementById('countHours'),
    m: document.getElementById('countMins'),
    s: document.getElementById('countSecs'),
  };

  if (!els.d) return;

  function update() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      Object.values(els).forEach(el => { if (el) el.textContent = '00'; });
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    if (els.d) els.d.textContent = String(days).padStart(2, '0');
    if (els.h) els.h.textContent = String(hours).padStart(2, '0');
    if (els.m) els.m.textContent = String(mins).padStart(2, '0');
    if (els.s) els.s.textContent = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}
