// =============================================
//  QuickTop Extension - Popup Script
// =============================================

const DEFAULT_SETTINGS = {
  enabled: true,
  threshold: 20,
  position: 'bottom-right',
  color: 'purple'
};

// ---- Load current settings ----
chrome.storage.sync.get(
  ['enabled', 'threshold', 'position', 'color'],
  (stored) => {
    const s = { ...DEFAULT_SETTINGS, ...stored };

    // Enable toggle
    document.getElementById('enabled-toggle').checked = s.enabled;
    updateStatusBadge(s.enabled);
    updateToggleCard(s.enabled);

    // Threshold slider
    document.getElementById('threshold-slider').value = s.threshold;
    document.getElementById('threshold-val').textContent = s.threshold + '%';

    // Position buttons
    document.querySelectorAll('.pos-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.pos === s.position);
    });

    // Color swatches
    document.querySelectorAll('.color-swatch').forEach(sw => {
      sw.classList.toggle('active', sw.dataset.color === s.color);
    });
  }
);

// Load click count
chrome.storage.local.get(['clickCount'], (result) => {
  document.getElementById('click-count').textContent = result.clickCount || 0;
});

// ---- Enable toggle ----
document.getElementById('enabled-toggle').addEventListener('change', (e) => {
  const enabled = e.target.checked;
  chrome.storage.sync.set({ enabled });
  updateStatusBadge(enabled);
  updateToggleCard(enabled);
});

function updateStatusBadge(enabled) {
  const badge = document.getElementById('status-badge');
  const text  = document.getElementById('status-text');
  if (enabled) {
    badge.className = 'status-badge active';
    text.textContent = 'Active';
  } else {
    badge.className = 'status-badge inactive';
    text.textContent = 'Inactive';
  }
}

function updateToggleCard(enabled) {
  const card = document.getElementById('toggle-card');
  card.style.opacity = enabled ? '1' : '0.7';
}

// ---- Threshold slider ----
document.getElementById('threshold-slider').addEventListener('input', (e) => {
  const val = parseInt(e.target.value, 10);
  document.getElementById('threshold-val').textContent = val + '%';
  chrome.storage.sync.set({ threshold: val });
});

// ---- Position buttons ----
document.querySelectorAll('.pos-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pos-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    chrome.storage.sync.set({ position: btn.dataset.pos });
  });
});

// ---- Color swatches ----
document.querySelectorAll('.color-swatch').forEach(sw => {
  sw.addEventListener('click', () => {
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
    sw.classList.add('active');
    chrome.storage.sync.set({ color: sw.dataset.color });
  });
});
