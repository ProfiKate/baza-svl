// ===== AOS init =====
AOS.init({
  duration: 600,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60,
});

// ===== Header scroll =====
const header = document.getElementById('header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
  highlightNav();
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Burger menu =====
const burger = document.getElementById('burger');
const nav    = document.getElementById('nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});

nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    nav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');
function highlightNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = nav.querySelector(`[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

// ===== Smooth anchor scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight + 8;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

// ===== Contact form =====
function handleFormSubmit() {
  var form     = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');
  var name     = form.querySelector('[name="name"]').value.trim();
  var phone    = form.querySelector('[name="phone"]').value.trim();

  if (!name || !phone) {
    formNote.style.color = '#e55';
    formNote.textContent = 'Пожалуйста, заполните имя и телефон.';
    return;
  }

  var message = form.querySelector('[name="message"]').value.trim();
  var text = encodeURIComponent(
    'Заявка с сайта BAZA SVL\nИмя: ' + name + '\nТелефон: ' + phone + (message ? '\nСообщение: ' + message : '')
  );
  var tgUrl = 'https://t.me/+375336654024?text=' + text;

  form.innerHTML =
    '<div class="form__success">' +
      '<div class="form__success-icon">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>' +
          '<polyline points="22 4 12 14.01 9 11.01"/>' +
        '</svg>' +
      '</div>' +
      '<h3>Заявка принята!</h3>' +
      '<p>Спасибо за обращение.<br>Мы свяжемся с вами в ближайшее время.</p>' +
      '<a href="' + tgUrl + '" target="_blank" rel="noopener" class="btn btn--outline form__success-tg">Написать в Telegram</a>' +
    '</div>';
}

// ===== Intersection observer for video autoplay on mobile =====
if ('IntersectionObserver' in window) {
  const videos = document.querySelectorAll('.service-card__video');
  const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.isIntersecting ? entry.target.play() : entry.target.pause();
    });
  }, { threshold: 0.3 });
  videos.forEach(v => videoObserver.observe(v));
}
