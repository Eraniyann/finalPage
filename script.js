/* Responsive menu */
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn?.addEventListener('click', () => navLinks.classList.toggle('active'));

/* Topic filter */
document.querySelectorAll('.topic-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.topic-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const topic = btn.dataset.topic;
    const cards = document.querySelectorAll('.gallery-grid .card');
    cards.forEach(c => {
      c.style.display = (topic === 'all' || c.classList.contains(topic)) ? 'flex' : 'none';
    });
  });
});

/* Lightbox (view-only) with prev/next & keyboard support */
const viewButtons = Array.from(document.querySelectorAll('.view-btn'));
const thumbs = Array.from(document.querySelectorAll('.gallery-grid img'));
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const lbCaption = document.getElementById('lbCaption');
let currentIndex = 0;

function openLightboxBySrc(src){
  currentIndex = thumbs.findIndex(t => t.getAttribute('src') === src);
  if(currentIndex === -1) return;
  showImageAt(currentIndex);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}

function showImageAt(index){
  const t = thumbs[index];
  if(!t) return;
  lbImage.src = t.src;
  lbCaption.textContent = t.alt || '';
  currentIndex = index;
}

/* open on view button or image click */
viewButtons.forEach(btn => btn.addEventListener('click', (e) => {
  const src = btn.dataset.src;
  openLightboxBySrc(src);
}));
thumbs.forEach((img, i) => {
  img.addEventListener('click', () => {
    openLightboxBySrc(img.getAttribute('src'));
  });
});

/* controls */
document.querySelector('.lb-close').addEventListener('click', closeLB);
document.querySelector('.lb-prev').addEventListener('click', ()=> showImageAt((currentIndex - 1 + thumbs.length) % thumbs.length));
document.querySelector('.lb-next').addEventListener('click', ()=> showImageAt((currentIndex + 1) % thumbs.length));

document.addEventListener('keydown', (e) => {
  if(!lightbox.classList.contains('open')) return;
  if(e.key === 'Escape') closeLB();
  if(e.key === 'ArrowLeft') showImageAt((currentIndex - 1 + thumbs.length) % thumbs.length);
  if(e.key === 'ArrowRight') showImageAt((currentIndex + 1) % thumbs.length);
});

function closeLB(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

/* initial show all */
document.querySelector('.topic-btn[data-topic="all"]').click();
