// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a, span.active').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', false);
}));

// Footer year (present on every page)
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Music: shared audio player for the tracklist (music.html only) ----------
const audio = document.getElementById('audioPlayer');
if (audio) {
  const tracks = document.querySelectorAll('.track');

  tracks.forEach(track => {
    const btn = track.querySelector('.play-btn');
    btn.addEventListener('click', () => {
      const isPlaying = track.classList.contains('playing');

      // stop any other playing track
      tracks.forEach(t => t.classList.remove('playing'));

      if (isPlaying) {
        audio.pause();
        return;
      }

      const src = track.getAttribute('data-src');
      audio.src = src;
      audio.play().catch(() => {
        // no audio file wired up yet — surface a gentle console note
        console.info(`No audio file found at "${src}" yet. Add your track there.`);
      });
      track.classList.add('playing');
    });
  });

  audio.addEventListener('ended', () => {
    tracks.forEach(t => t.classList.remove('playing'));
  });
}

// ---------- Photo lightbox (photography.html only) ----------
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.frame-img img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });

  function closeLightbox() { lightbox.classList.remove('open'); }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
}
