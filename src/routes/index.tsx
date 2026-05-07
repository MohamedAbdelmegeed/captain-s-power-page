import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import "../styles/coach.css";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Captain Fouad El Agamy — Gym & Nutrition Coach" },
      {
        name: "description",
        content:
          "Personal training and nutrition coaching with Captain Fouad El Agamy. Join now and start your transformation.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
    ],
  }),
});

type Lang = "en" | "ar";
type Theme = "dark" | "light";

const TR = {
  en: {
    nameReq: "Please enter your name",
    nameMax: "Name is too long (max 100)",
    phoneReq: "Please enter your phone number",
    phoneInvalid: "Enter a valid phone number",
    goalReq: "Tell me about your training goal",
    goalMin: "Please add a few more details",
    sending: "Sending…",
    success: "✅ Your request has been sent! Coach Fouad will contact you soon.",
    error: "Something went wrong. Please try again.",
    submit: "Submit",
  },
  ar: {
    nameReq: "من فضلك أدخل اسمك",
    nameMax: "الاسم طويل جداً (الحد 100 حرف)",
    phoneReq: "من فضلك أدخل رقم هاتفك",
    phoneInvalid: "أدخل رقم هاتف صحيح",
    goalReq: "كلمني عن هدفك من التدريب",
    goalMin: "اكتب تفاصيل أكثر من فضلك",
    sending: "جارٍ الإرسال…",
    success: "✅ تم إرسال طلبك بنجاح! كابتن فؤاد هيتواصل معاك قريب.",
    error: "حصل خطأ، حاول تاني من فضلك.",
    submit: "إرسال",
  },
} as const;

const NAV = [
  { id: "home", en: "Home", ar: "الرئيسية" },
  { id: "services", en: "Services", ar: "الخدمات" },
  { id: "pricing", en: "Pricing", ar: "الباقات" },
  { id: "testimonials", en: "Reviews", ar: "آراء العملاء" },
  { id: "contact", en: "Contact", ar: "تواصل معنا" },
];

const TESTIMONIALS = [
  {
    initial: "A",
    en: "“I lost 12 kg in 4 months. Captain Fouad's plan was simple, flexible, and actually fun.”",
    ar: "«خسرت 12 كيلو في 4 شهور. برنامج كابتن فؤاد بسيط ومرن وممتع فعلاً.»",
    nameEn: "Ahmed M.",
    nameAr: "أحمد م.",
    cityEn: "Cairo",
    cityAr: "القاهرة",
  },
  {
    initial: "S",
    en: "“Best coaching experience ever. The 24/7 support kept me consistent every single week.”",
    ar: "«أفضل تجربة تدريب جربتها. المتابعة 24/7 خلتني ملتزم كل أسبوع.»",
    nameEn: "Sara K.",
    nameAr: "سارة ك.",
    cityEn: "Alexandria",
    cityAr: "الإسكندرية",
  },
  {
    initial: "O",
    en: "“Gained lean muscle without losing my social life. The diet fits real life.”",
    ar: "«بنيت عضل صافي من غير ما أحرم نفسي. النظام بيتماشى مع حياتي.»",
    nameEn: "Omar T.",
    nameAr: "عمر ت.",
    cityEn: "Giza",
    cityAr: "الجيزة",
  },
];

const PLANS = [
  {
    titleEn: "Monthly", titleAr: "شهر", price: "250", featured: false,
    features: [
      { en: "Workout plan", ar: "جدول تمارين" },
      { en: "Diet plan", ar: "نظام غذائي" },
      { en: "WhatsApp follow-up", ar: "متابعة واتساب" },
    ],
  },
  {
    titleEn: "3 Months", titleAr: "3 شهور", price: "500", featured: true,
    features: [
      { en: "Everything in Monthly", ar: "كل مميزات الشهري" },
      { en: "Plan updates every month", ar: "تحديث الجدول شهرياً" },
      { en: "Priority support", ar: "دعم بأولوية" },
    ],
  },
  {
    titleEn: "6 Months", titleAr: "6 شهور", price: "800", featured: false,
    features: [
      { en: "Everything in 3 Months", ar: "كل مميزات الـ 3 شهور" },
      { en: "Body composition tracking", ar: "متابعة قياسات الجسم" },
      { en: "Free supplement guide", ar: "دليل مكملات مجاني" },
    ],
  },
];

const SERVICES = [
  { icon: "💬", en: "24/7 WhatsApp Support", ar: "متابعة 24/7",
    descEn: "Direct access to your coach whenever you need guidance or motivation.",
    descAr: "تواصل مباشر مع المدرب في أي وقت تحتاج فيه دعم أو متابعة." },
  { icon: "🏋️", en: "Professional Workout Plan", ar: "جدول تمارين احترافي",
    descEn: "Custom training program built around your goals, level and equipment.",
    descAr: "برنامج تدريبي مخصص حسب هدفك ومستواك والأدوات المتاحة." },
  { icon: "🥗", en: "Flexible Diet Plan", ar: "نظام غذائي مرن",
    descEn: "A nutrition plan you can actually stick to — built for your lifestyle.",
    descAr: "نظام غذائي تقدر تلتزم به فعلاً — مصمم على أسلوب حياتك." },
];

const WA_SVG = (
  <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
    <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.143-.66.143-1.018 0-.058-.014-.115-.014-.173-.1-.173-.39-.273-.66-.402m-2.99 7.137h-.013c-1.65 0-3.276-.452-4.71-1.273l-.336-.2-3.484.918.93-3.4-.218-.345a9.265 9.265 0 0 1-1.42-4.94c.002-5.116 4.165-9.279 9.281-9.279 2.479 0 4.808.967 6.559 2.72a9.218 9.218 0 0 1 2.717 6.563c-.002 5.117-4.166 9.28-9.28 9.28m7.894-17.171a11.115 11.115 0 0 0-7.894-3.27c-6.156 0-11.166 5.009-11.168 11.165-.001 1.967.514 3.886 1.49 5.579L4.85 27.16l5.726-1.501a11.158 11.158 0 0 0 5.34 1.359h.005c6.157 0 11.167-5.01 11.169-11.167a11.105 11.105 0 0 0-3.273-7.879" />
  </svg>
);

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  // Init from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = (localStorage.getItem("theme") as Theme) || "dark";
    const l = (localStorage.getItem("lang") as Lang) || "en";
    setTheme(t);
    setLang(l);
  }, []);

  // Apply to <html>
  useEffect(() => {
    const html = document.documentElement;
    html.dataset.theme = theme;
    html.dataset.lang = lang;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("theme", theme);
    localStorage.setItem("lang", lang);
  }, [theme, lang]);

  // Scroll spy
  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const t = (k: keyof typeof TR.en) => TR[lang][k];

  return (
    <>
      <header className="navbar">
        <div className="container nav-inner">
          <a href="#home" className="logo">
            <span className="logo-mark">F</span>
            <span>{lang === "ar" ? "كابتن فؤاد العجمي" : "Coach Fouad"}</span>
          </a>

          <nav className={`nav-links${menuOpen ? " open" : ""}`}>
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={active === n.id ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {lang === "ar" ? n.ar : n.en}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button className="btn-icon" aria-label="Switch language"
              onClick={() => setLang(lang === "en" ? "ar" : "en")}>
              {lang === "en" ? "AR" : "EN"}
            </button>
            <button className="btn-icon" aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <button className="btn-icon menu-btn" aria-label="Menu"
              onClick={() => setMenuOpen((o) => !o)}>☰</button>
          </div>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="container hero-inner">
          <span className="eyebrow">{lang === "ar" ? "مدرب معتمد" : "Certified Coach"}</span>
          {lang === "ar" ? (
            <h1>ابدأ <span className="grad">رحلة التغيير</span> الآن</h1>
          ) : (
            <h1>Start Your <span className="grad">Transformation</span> Journey Now</h1>
          )}
          <p>
            {lang === "ar"
              ? "برامج تدريب وتغذية مخصصة تساعدك تتخطى حدودك — في أي وقت ومن أي مكان."
              : "Personalized training and nutrition plans designed to push you past your limits — anytime, anywhere."}
          </p>
          <a href="#pricing" className="btn-primary">{lang === "ar" ? "اشترك الآن" : "Join Now"}</a>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <h2 className="section-title">{lang === "ar" ? "الخدمات" : "Services"}</h2>
          <p className="section-sub">
            {lang === "ar" ? "كل ما تحتاجه للوصول لهدفك" : "Everything you need to reach your goals"}
          </p>
          <div className="cards">
            {SERVICES.map((s) => (
              <article className="card" key={s.en}>
                <div className="card-icon">{s.icon}</div>
                <h3>{lang === "ar" ? s.ar : s.en}</h3>
                <p>{lang === "ar" ? s.descAr : s.descEn}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="pricing">
        <div className="container">
          <h2 className="section-title">{lang === "ar" ? "الباقات" : "Pricing"}</h2>
          <p className="section-sub">
            {lang === "ar" ? "اختار الباقة اللي تناسبك" : "Choose the plan that fits you"}
          </p>
          <div className="cards">
            {PLANS.map((p) => (
              <article className={`plan${p.featured ? " featured" : ""}`} key={p.price}>
                {p.featured && (
                  <span className="badge">
                    {lang === "ar" ? "الأكثر طلباً" : "Most Popular"}
                  </span>
                )}
                <h3>{lang === "ar" ? p.titleAr : p.titleEn}</h3>
                <div className="price"><span>EGP</span>{p.price}</div>
                <ul>
                  {p.features.map((f) => (
                    <li key={f.en}>{lang === "ar" ? f.ar : f.en}</li>
                  ))}
                </ul>
                <a href="#contact" className="btn-primary">{lang === "ar" ? "اشترك" : "Subscribe"}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials lang={lang} />

      <ContactSection lang={lang} t={t} />

      <a className="wa-float"
        href="https://wa.me/201019556307?text=Hello%20Captain%20Fouad"
        target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <span className="wa-tooltip">
          {lang === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
        </span>
        {WA_SVG}
      </a>

      <footer className="footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} Captain Fouad El Agamy ·{" "}
            <span>{lang === "ar" ? "جميع الحقوق محفوظة" : "All rights reserved"}</span>
          </p>
          <p className="dev-credit">
            <span>{lang === "ar" ? "تطوير" : "Developed by"}</span>
            <strong>M. Abdelmegeed</strong>
            <a className="dev-wa" href="https://wa.me/201019556307"
              target="_blank" rel="noopener noreferrer"
              aria-label="WhatsApp M. Abdelmegeed" title="WhatsApp">
              <svg viewBox="0 0 32 32" width="14" height="14" fill="currentColor" aria-hidden="true">
                <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.143-.66.143-1.018 0-.058-.014-.115-.014-.173-.1-.173-.39-.273-.66-.402m-2.99 7.137h-.013c-1.65 0-3.276-.452-4.71-1.273l-.336-.2-3.484.918.93-3.4-.218-.345a9.265 9.265 0 0 1-1.42-4.94c.002-5.116 4.165-9.279 9.281-9.279 2.479 0 4.808.967 6.559 2.72a9.218 9.218 0 0 1 2.717 6.563c-.002 5.117-4.166 9.28-9.28 9.28m7.894-17.171a11.115 11.115 0 0 0-7.894-3.27c-6.156 0-11.166 5.009-11.168 11.165-.001 1.967.514 3.886 1.49 5.579L4.85 27.16l5.726-1.501a11.158 11.158 0 0 0 5.34 1.359h.005c6.157 0 11.167-5.01 11.169-11.167a11.105 11.105 0 0 0-3.273-7.879" />
              </svg>
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

function Testimonials({ lang }: { lang: Lang }) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startX: 0, deltaX: 0, dragging: false });
  const total = TESTIMONIALS.length;

  const go = (i: number) => setIndex(((i % total) + total) % total);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 6000);
    return () => clearInterval(id);
  }, [total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const rtl = document.documentElement.dir === "rtl";
    track.style.transition = "";
    track.style.transform = `translateX(${rtl ? "" : "-"}${index * 100}%)`;
  }, [index, lang]);

  const onTouchStart = (e: React.TouchEvent) => {
    dragRef.current = { startX: e.touches[0].clientX, deltaX: 0, dragging: true };
    if (trackRef.current) trackRef.current.style.transition = "none";
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragRef.current.dragging || !trackRef.current) return;
    dragRef.current.deltaX = e.touches[0].clientX - dragRef.current.startX;
    const rtl = document.documentElement.dir === "rtl";
    const base = (rtl ? 1 : -1) * index * 100;
    trackRef.current.style.transform = `translateX(calc(${base}% + ${dragRef.current.deltaX}px))`;
  };
  const onTouchEnd = () => {
    const { deltaX, dragging } = dragRef.current;
    dragRef.current.dragging = false;
    if (!trackRef.current) return;
    trackRef.current.style.transition = "";
    if (!dragging) return;
    const rtl = document.documentElement.dir === "rtl";
    if (Math.abs(deltaX) > 50) {
      if ((deltaX < 0 && !rtl) || (deltaX > 0 && rtl)) go(index + 1);
      else go(index - 1);
    } else {
      go(index);
    }
  };

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <h2 className="section-title">{lang === "ar" ? "آراء العملاء" : "Client Reviews"}</h2>
        <p className="section-sub">
          {lang === "ar" ? "نتائج حقيقية من عملاء حقيقيين" : "Real results from real people"}
        </p>

        <div className="carousel">
          <button className="carousel-arrow prev" aria-label="Previous"
            onClick={() => go(index - 1)}>‹</button>

          <div className="carousel-viewport">
            <div className="carousel-track" ref={trackRef}
              onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
              {TESTIMONIALS.map((tm) => (
                <article className="testimonial" key={tm.initial}>
                  <div className="stars" aria-label="5 out of 5">★★★★★</div>
                  <p className="quote">{lang === "ar" ? tm.ar : tm.en}</p>
                  <div className="author">
                    <div className="avatar">{tm.initial}</div>
                    <div>
                      <strong>{lang === "ar" ? tm.nameAr : tm.nameEn}</strong>
                      <span>{lang === "ar" ? tm.cityAr : tm.cityEn}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button className="carousel-arrow next" aria-label="Next"
            onClick={() => go(index + 1)}>›</button>

          <div className="carousel-dots" role="tablist">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} className={i === index ? "active" : ""}
                aria-label={`Go to slide ${i + 1}`} onClick={() => go(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ lang, t }: { lang: Lang; t: (k: keyof typeof TR.en) => string }) {
  const [values, setValues] = useState({ name: "", phone: "", goal: "" });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const validate = (v = values) => {
    const e: Record<string, string | null> = {};
    const name = v.name.trim();
    const phone = v.phone.trim();
    const goal = v.goal.trim();
    if (!name) e.name = t("nameReq");
    else if (name.length > 100) e.name = t("nameMax");
    if (!phone) e.phone = t("phoneReq");
    else if (!/^[+\d\s()-]{6,20}$/.test(phone)) e.phone = t("phoneInvalid");
    if (!goal) e.goal = t("goalReq");
    else if (goal.length < 5) e.goal = t("goalMin");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (k: keyof typeof values) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((s) => ({ ...s, [k]: ev.target.value }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: null }));
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setMsg(null);
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("name", values.name.trim());
      payload.append("phone", values.phone.trim());
      payload.append("goal", values.goal.trim());
      payload.append("_subject", "New coaching request — " + values.name.trim());
      payload.append("_template", "table");
      payload.append("_captcha", "false");
      const res = await fetch("https://formsubmit.co/ajax/Mohamed1742006ahmedd@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });
      if (!res.ok) throw new Error();
      setMsg({ type: "success", text: t("success") });
      setValues({ name: "", phone: "", goal: "" });
    } catch {
      setMsg({ type: "error", text: t("error") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section section-alt" id="contact">
      <div className="container narrow">
        <h2 className="section-title">{lang === "ar" ? "تواصل معنا" : "Contact"}</h2>
        <p className="section-sub">
          {lang === "ar"
            ? "كلمني عن هدفك وهرد عليك في أقرب وقت"
            : "Tell me about your goal and I'll get back to you"}
        </p>

        <form className="form" noValidate onSubmit={onSubmit}>
          <label>
            <span>{lang === "ar" ? "الاسم" : "Name"}</span>
            <input type="text" name="name" maxLength={100} autoComplete="name"
              value={values.name} onChange={onChange("name")}
              onBlur={() => validate()}
              className={errors.name ? "invalid" : ""} />
            {errors.name && <small className="error">{errors.name}</small>}
          </label>
          <label>
            <span>{lang === "ar" ? "رقم الهاتف" : "Phone"}</span>
            <input type="tel" name="phone" maxLength={20} autoComplete="tel" inputMode="tel"
              value={values.phone} onChange={onChange("phone")}
              onBlur={() => validate()}
              className={errors.phone ? "invalid" : ""} />
            {errors.phone && <small className="error">{errors.phone}</small>}
          </label>
          <label>
            <span>{lang === "ar" ? "الهدف من التدريب" : "Training Goal"}</span>
            <textarea name="goal" rows={4} maxLength={500}
              value={values.goal} onChange={onChange("goal")}
              onBlur={() => validate()}
              className={errors.goal ? "invalid" : ""} />
            {errors.goal && <small className="error">{errors.goal}</small>}
          </label>
          <button type="submit" id="submitBtn" className="btn-primary" disabled={loading}>
            <span className="btn-label">{loading ? t("sending") : t("submit")}</span>
            {loading && <span className="spinner" />}
          </button>
          {msg && <div className={`form-msg ${msg.type}`}>{msg.text}</div>}
        </form>
      </div>
    </section>
  );
}
