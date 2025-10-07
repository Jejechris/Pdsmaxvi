document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const backToTop = document.getElementById('back-to-top');
  const musicBtn = document.getElementById('music-control');
  const musicEl = document.getElementById('background-music');
  const volumeBox = document.getElementById('music-volume');
  const volumeRange = document.getElementById('volume-range');
  const progressBar = document.getElementById('scroll-progress');

  const onScroll = () => {
    if (nav) {
      if (window.scrollY > 20) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
    }
    if (backToTop) {
      if (window.scrollY > 260) backToTop.classList.add('show'); else backToTop.classList.remove('show');
    }
    if (progressBar) {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight;
      const width = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      progressBar.style.width = width + '%';
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  if (hamburger && navLinks && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('show');
    });
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('show');
      }
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('show');
      });
    });
  }

  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Active menu highlighting based on URL
  if (navLinks) {
    const here = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === here) a.classList.add('active'); else a.classList.remove('active');
    });
  }

  // Music control + volume persistence
  if (musicBtn && musicEl) {
    let isPlaying = false;
    musicBtn.addEventListener('click', async () => {
      try {
        if (!isPlaying) {
          await musicEl.play();
          isPlaying = true;
          musicBtn.textContent = '⏸️';
          musicBtn.setAttribute('aria-label', 'Jeda musik latar');
          if (volumeBox) volumeBox.classList.add('show');
        } else {
          musicEl.pause();
          isPlaying = false;
          musicBtn.textContent = '🎵';
          musicBtn.setAttribute('aria-label', 'Putar musik latar');
          if (volumeBox) volumeBox.classList.remove('show');
        }
      } catch (e) { console.warn('Tidak dapat memutar audio:', e); }
    });

    const savedVol = localStorage.getItem('pdsmaxvi_volume');
    const initialVol = savedVol !== null ? parseFloat(savedVol) : 0.5;
    if (volumeRange) {
      volumeRange.value = initialVol;
      musicEl.volume = initialVol;
      volumeRange.addEventListener('input', (e) => {
        const v = parseFloat(e.target.value);
        musicEl.volume = v; localStorage.setItem('pdsmaxvi_volume', String(v));
      });
    } else {
      musicEl.volume = initialVol;
    }
  }

  // AOS init
  if (window.AOS) AOS.init({ duration:700, once:true, easing:'ease-in-out' });

  // Lightbox for images (galeri and any img.lightbox)
  const overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';
  const img = document.createElement('img');
  overlay.appendChild(img);
  document.body.appendChild(overlay);
  document.querySelectorAll('.gallery-grid img, .gallery-container img, img.lightbox').forEach(el => {
    el.setAttribute('loading','lazy');
    el.addEventListener('click', () => {
      img.src = el.src;
      overlay.classList.add('show');
    });
  });
  overlay.addEventListener('click', () => overlay.classList.remove('show'));
});

// Register service worker - DISABLED for development
// Uncomment for production deployment
/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}
*/


