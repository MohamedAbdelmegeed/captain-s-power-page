// ============ THEME TOGGLE ============
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

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
const savedLang = localStorage.getItem('lang') || 'en';
applyLang(savedLang);

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
    el.textContent = el.dataset[lang];
  });
}

// ============ MOBILE MENU ============
const menuBtn = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ============ CONTACT FORM (mailto) ============
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get('name')?.toString().trim();
  const phone = data.get('phone')?.toString().trim();
  const goal = data.get('goal')?.toString().trim();

  if(!name || !phone || !goal){
    showMsg(root.dataset.lang === 'ar' ? 'من فضلك املأ كل الحقول' : 'Please fill all fields');
    return;
  }

  const subject = encodeURIComponent('New coaching request — ' + name);
  const body = encodeURIComponent(
    `Name: ${name}\nPhone: ${phone}\nGoal: ${goal}`
  );
  window.location.href = `mailto:mohamed1742006ahmedd@gmail.com?subject=${subject}&body=${body}`;

  showMsg(root.dataset.lang === 'ar'
    ? '✅ تم إرسال طلبك! هنتواصل معاك قريب.'
    : '✅ Your request has been sent! We will contact you soon.');
  form.reset();
});

function showMsg(text){
  formMsg.textContent = text;
  formMsg.hidden = false;
  setTimeout(() => { formMsg.hidden = true; }, 6000);
}

// ============ FOOTER YEAR ============
document.getElementById('year').textContent = new Date().getFullYear();
