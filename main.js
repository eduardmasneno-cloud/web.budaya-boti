// ===== ROUTING NON-LINIER (Hash-based) =====
const nodes = document.querySelectorAll('.node');
const breadcrumbList = document.getElementById('breadcrumb-list');

const LABEL_MAP = {
  beranda:  'Beranda',
  profil:   'Profil',
  falsafah: 'Falsafah',
  galeri:   'Galeri Motif',
  audio:    'Audio Bahasa',
  peta:     'Peta Interaktif',
  laporan:  'Laporan'
};

function navigasiKe(id) {
  // Sembunyikan semua node
  nodes.forEach(n => n.classList.remove('active'));

  // Tampilkan node target
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    perbaruiBreadcrumb(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function perbaruiBreadcrumb(id) {
  breadcrumbList.innerHTML = '';

  const berandaLi = document.createElement('li');
  berandaLi.innerHTML = '<a href="#beranda">Beranda</a>';
  breadcrumbList.appendChild(berandaLi);

  if (id !== 'beranda') {
    const li = document.createElement('li');
    li.textContent = LABEL_MAP[id] || id;
    li.setAttribute('aria-current', 'page');
    breadcrumbList.appendChild(li);
  }
}

// Dengarkan perubahan hash
window.addEventListener('hashchange', () => {
  const id = location.hash.replace('#', '') || 'beranda';
  navigasiKe(id);
});

// Inisialisasi awal
window.addEventListener('DOMContentLoaded', () => {
  const id = location.hash.replace('#', '') || 'beranda';
  navigasiKe(id);
});

// ===== FITUR TTS (Text-to-Speech) =====
document.querySelectorAll('.btn-tts').forEach(btn => {
  btn.addEventListener('click', () => {
    const teks = btn.dataset.teks;
    if ('speechSynthesis' in window) {
      const ucap = new SpeechSynthesisUtterance(teks);
      ucap.lang = 'id-ID';
      ucap.rate = 0.9;
      speechSynthesis.speak(ucap);
    } else {
      alert('Browser Anda tidak mendukung TTS.');
    }
  });
});