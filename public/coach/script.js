// ============ THEME TOGGLE ============
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
applyTheme(localStorage.getItem('theme') || 'dark');
themeBtn.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});
function applyTheme(t){
  root.dataset.theme = t;
  themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
}

// ============ LANGUAGE TOGGLE ============
const langBtn = document.getElementById('langToggle');
applyLang(localStorage.getItem('lang') || 'en');
langBtn.addEventListener('click', () => {
  const next = root.dataset.lang === 'en' ? 'ar' : 'en';
  applyLang(next);
  localStorage.setItem('lang', next);
});
function applyLang(lang){
  root.dataset.lang = lang;
  root.lang = lang;
  root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  langBtn.textContent = lang === 'en' ? 'AR' : 'EN';
  document.querySelectorAll('[data-en]').forEach(el => {
    const val = el.dataset[lang];
    if(val && val.includes('<')) el.innerHTML = val;
    else el.textContent = val;
  });
}

// ============ MOBILE MENU ============
const menuBtn = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ============ SCROLL-SPY (ACTIVE NAV LINK) ============
const sections = ['home','services','pricing','testimonials','contact']
  .map(id => document.getElementById(id)).filter(Boolean);
const linkMap = new Map();
navLinks.querySelectorAll('a').forEach(a => {
  const id = a.getAttribute('href').replace('#','');
  linkMap.set(id, a);
});
const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      linkMap.forEach(l => l.classList.remove('active'));
      linkMap.get(e.target.id)?.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
sections.forEach(s => spy.observe(s));

// ============ CONTACT FORM ============
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
const submitBtn = document.getElementById('submitBtn');
const spinner = submitBtn.querySelector('.spinner');
const btnLabel = submitBtn.querySelector('.btn-label');

const T = {
  en: {
    nameReq: 'Please enter your name',
    nameMax: 'Name is too long (max 100)',
    phoneReq: 'Please enter your phone number',
    phoneInvalid: 'Enter a valid phone number',
    goalReq: 'Tell me about your training goal',
    goalMin: 'Please add a few more details',
    sending: 'Sending…',
    success: '✅ Your request was prepared. Your email app should open now — just hit send!',
    error: 'Something went wrong. Please try again.',
  },
  ar: {
    nameReq: 'من فضلك أدخل اسمك',
    nameMax: 'الاسم طويل جداً (الحد 100 حرف)',
    phoneReq: 'من فضلك أدخل رقم هاتفك',
    phoneInvalid: 'أدخل رقم هاتف صحيح',
    goalReq: 'كلمني عن هدفك من التدريب',
    goalMin: 'اكتب تفاصيل أكثر من فضلك',
    sending: 'جارٍ الإرسال…',
    success: '✅ تم تجهيز طلبك. هيفتحلك تطبيق البريد — اضغط إرسال!',
    error: 'حصل خطأ، حاول تاني من فضلك.',
  }
};
const t = (k) => T[root.dataset.lang || 'en'][k];

function showError(field, msg){
  const input = form.querySelector(`[name="${field}"]`);
  const err = form.querySelector(`[data-error="${field}"]`);
  if(msg){
    input.classList.add('invalid');
    err.textContent = msg;
    err.hidden = false;
  } else {
    input.classList.remove('invalid');
    err.hidden = true;
  }
}

function validate(data){
  let ok = true;
  const name = (data.name || '').trim();
  const phone = (data.phone || '').trim();
  const goal = (data.goal || '').trim();

  if(!name){ showError('name', t('nameReq')); ok=false; }
  else if(name.length > 100){ showError('name', t('nameMax')); ok=false; }
  else showError('name', null);

  if(!phone){ showError('phone', t('phoneReq')); ok=false; }
  else if(!/^[+\d\s()-]{6,20}$/.test(phone)){ showError('phone', t('phoneInvalid')); ok=false; }
  else showError('phone', null);

  if(!goal){ showError('goal', t('goalReq')); ok=false; }
  else if(goal.length < 5){ showError('goal', t('goalMin')); ok=false; }
  else showError('goal', null);

  return ok;
}

// Live validation on blur
['name','phone','goal'].forEach(f => {
  const el = form.querySelector(`[name="${f}"]`);
  el.addEventListener('blur', () => {
    const data = Object.fromEntries(new FormData(form).entries());
    validate({ [f]: data[f], ...data });
  });
  el.addEventListener('input', () => {
    if(el.classList.contains('invalid')) showError(f, null);
  });
});

function setMsg(type, text){
  formMsg.className = 'form-msg ' + type;
  formMsg.textContent = text;
  formMsg.hidden = false;
}
function setLoading(on){
  submitBtn.disabled = on;
  spinner.hidden = !on;
  btnLabel.textContent = on
    ? t('sending')
    : (root.dataset.lang === 'ar' ? 'إرسال' : 'Submit');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formMsg.hidden = true;
  const data = Object.fromEntries(new FormData(form).entries());
  if(!validate(data)) return;

  setLoading(true);
  try {
    const subject = encodeURIComponent('New coaching request — ' + data.name.trim());
    const body = encodeURIComponent(
      `Name: ${data.name.trim()}\nPhone: ${data.phone.trim()}\nGoal: ${data.goal.trim()}`
    );
    setTimeout(() => {
      window.location.href = `mailto:mohamed1742006ahmedd@gmail.com?subject=${subject}&body=${body}`;
      setLoading(false);
      setMsg('success', t('success'));
      form.reset();
    }, 700);
  } catch {
    setLoading(false);
    setMsg('error', t('error'));
  }
});

// ============ FOOTER YEAR ============
document.getElementById('year').textContent = new Date().getFullYear();

// ============ TESTIMONIAL CAROUSEL ============
(function initCarousel(){
  const carousel = document.getElementById('testimonialCarousel');
  if(!carousel) return;
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const dotsWrap = carousel.querySelector('.carousel-dots');
  let index = 0;
  let autoTimer;

  // Build dots
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Go to slide ${i+1}`);
    b.addEventListener('click', () => go(i));
    dotsWrap.appendChild(b);
  });

  function go(i){
    index = (i + slides.length) % slides.length;
    const rtl = document.documentElement.dir === 'rtl';
    track.style.transform = `translateX(${rtl ? '' : '-'}${index * 100}%)`;
    dotsWrap.querySelectorAll('button').forEach((d,k) => d.classList.toggle('active', k===index));
    resetAuto();
  }
  function next(){ go(index+1); }
  function prev(){ go(index-1); }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  // Touch swipe
  let startX=0, deltaX=0, dragging=false;
  track.addEventListener('touchstart', (e) => {
    dragging=true; startX=e.touches[0].clientX; deltaX=0;
    track.style.transition='none';
  }, {passive:true});
  track.addEventListener('touchmove', (e) => {
    if(!dragging) return;
    deltaX = e.touches[0].clientX - startX;
    const rtl = document.documentElement.dir === 'rtl';
    const base = (rtl ? 1 : -1) * index * 100;
    track.style.transform = `translateX(calc(${base}% + ${deltaX}px))`;
  }, {passive:true});
  track.addEventListener('touchend', () => {
    dragging=false;
    track.style.transition='';
    const rtl = document.documentElement.dir === 'rtl';
    if(Math.abs(deltaX) > 50){
      if((deltaX < 0 && !rtl) || (deltaX > 0 && rtl)) next(); else prev();
    } else {
      go(index);
    }
  });

  function resetAuto(){
    clearInterval(autoTimer);
    autoTimer = setInterval(next, 6000);
  }
  carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
  carousel.addEventListener('mouseleave', resetAuto);

  // Re-align on language direction change
  const obs = new MutationObserver(() => go(index));
  obs.observe(document.documentElement, { attributes:true, attributeFilter:['dir'] });

  go(0);
})();
