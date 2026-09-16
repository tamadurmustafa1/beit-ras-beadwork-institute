import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ExternalLink,
  Gem,
  Heart,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Palette,
  Phone,
  Play,
  Send,
  Sparkles,
  Star,
  Users,
  X,
  Youtube,
} from "lucide-react";
import { toast } from "sonner";

const heroImage = "/manus-storage/beit-ras-hero_1b6c1244.jpg";

const programs = [
  {
    id: "foundation",
    number: "01",
    eyebrow: "المسار الأول",
    title: "أساسيات فن الخرز",
    description:
      "من أول خيط إلى أول قطعة مكتملة. نتعلم اختيار الخامات، قراءة الباترون، وبناء التكوين بثقة وهدوء.",
    meta: "6 أسابيع · 18 لقاء",
    accent: "#d9795b",
    icon: Gem,
  },
  {
    id: "jewelry",
    number: "02",
    eyebrow: "المسار الأكثر طلباً",
    title: "تصميم الإكسسوارات",
    description:
      "نحوّل الخرز إلى قطع تُلبس وتُحكى: أساور، عقود، وأقراط تحمل توقيعك الخاص.",
    meta: "8 أسابيع · 24 لقاء",
    accent: "#d8a342",
    icon: Sparkles,
  },
  {
    id: "heritage",
    number: "03",
    eyebrow: "حرفة وهوية",
    title: "الزخارف التراثية",
    description:
      "نستعيد مفردات من ذاكرتنا البصرية ونمنحها حياة جديدة بتقنيات معاصرة وألوان جريئة.",
    meta: "4 أسابيع · 12 لقاء",
    accent: "#4b7f83",
    icon: Palette,
  },
];

const creativeLinks = [
  { label: "لوحة إلهام الخرز", sub: "Pinterest / inspiration", href: "https://www.pinterest.com/search/pins/?q=beadwork%20inspiration", icon: Sparkles },
  { label: "تقنيات من حول العالم", sub: "YouTube / tutorials", href: "https://www.youtube.com/results?search_query=beadwork+tutorial", icon: Play },
  { label: "مجتمع صانعات الحرفة", sub: "Instagram / community", href: "https://www.instagram.com/explore/tags/beadwork/", icon: Heart },
];

const gallery = [
  { title: "ألوان من الجنوب", tag: "تكوين حر", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=88" },
  { title: "تفاصيل صغيرة، أثر كبير", tag: "تقنية النسج", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=88" },
  { title: "معلّقة الذاكرة", tag: "مفردة تراثية", image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=88" },
  { title: "نقطة ضوء", tag: "تصميم معاصر", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=88" },
];

const beadColors = ["#d9795b", "#d8a342", "#4b7f83", "#f6efe3", "#172c47", "#bb594b", "#d2b57b", "#8fb4a8"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProgram, setActiveProgram] = useState("foundation");
  const [email, setEmail] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setIsScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const selectedProgram = useMemo(
    () => programs.find((program) => program.id === activeProgram) ?? programs[0],
    [activeProgram],
  );

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const submitNewsletter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    toast.success("أهلاً بكِ في دائرتنا الصغيرة", {
      description: "سنرسل لكِ موعد اللقاء المفتوح القادم وأفكاراً جديدة للخرز.",
    });
    setEmail("");
  };

  const submitContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("وصلتنا رسالتك", {
      description: "سنعود إليكِ خلال يومي عمل. شكراً لاهتمامك بمعهد بيت راس.",
    });
    (event.currentTarget as HTMLFormElement).reset();
  };

  return (
    <div className="site-shell" dir="rtl">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <header className={`site-nav ${isScrolled ? "site-nav--scrolled" : ""}`}>
        <div className="nav-inner">
          <button className="brand" onClick={() => scrollTo("top")} aria-label="العودة إلى البداية">
            <span className="brand-mark" aria-hidden="true"><span /><span /><span /><span /></span>
            <span className="brand-copy">
              <strong>بيت راس</strong>
              <small>معهد الحرفة المعاصرة</small>
            </span>
          </button>
          <nav className={`desktop-nav ${menuOpen ? "desktop-nav--open" : ""}`} aria-label="التنقل الرئيسي">
            <button onClick={() => scrollTo("about")}>عن المعهد</button>
            <button onClick={() => scrollTo("programs")}>مسارات التعلّم</button>
            <button onClick={() => scrollTo("gallery")}>من أعمالنا</button>
            <button onClick={() => scrollTo("contact")}>تواصلي معنا</button>
          </nav>
          <button className="nav-cta" onClick={() => scrollTo("programs")}>
            <span>ابدئي رحلتك</span><ArrowLeft size={16} />
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="فتح القائمة" aria-expanded={menuOpen}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-image" style={{ backgroundImage: `url(${heroImage})` }} />
          <div className="hero-overlay" />
          <div className="hero-grain" />
          <div className="hero-beads" aria-hidden="true">
            {Array.from({ length: 20 }).map((_, index) => (
              <span
                className="floating-bead"
                key={index}
                style={{
                  left: `${8 + ((index * 17) % 82)}%`,
                  top: `${12 + ((index * 29) % 76)}%`,
                  width: `${5 + (index % 4) * 2}px`,
                  height: `${5 + (index % 4) * 2}px`,
                  background: beadColors[index % beadColors.length],
                  animationDelay: `${index * 0.27}s`,
                }}
              />
            ))}
          </div>
          <div className="container hero-content">
            <div className="hero-kicker"><span className="kicker-dot" /> معهد التدريب المهني / بيت راس</div>
            <h1>حين تتحول<br /><em>الحبة</em> إلى حكاية.</h1>
            <p className="hero-lede">مساحة دافئة لتعلّم أشغال الخرز، واكتشاف صوتك الإبداعي، وصناعة شيء يشبهك تماماً.</p>
            <div className="hero-actions">
              <button className="button button--saffron" onClick={() => scrollTo("programs")}>اكتشفي المسارات <ArrowLeft size={18} /></button>
              <button className="text-link text-link--light" onClick={() => scrollTo("about")}><span className="play-ring"><Play size={12} fill="currentColor" /></span> شاهدي حكاية بيت راس</button>
            </div>
            <div className="hero-footnote"><span>01</span><span className="footnote-line" /><span>فن أصيل. حضور معاصر.</span></div>
          </div>
          <button className="hero-scroll" onClick={() => scrollTo("about")} aria-label="الانتقال إلى الأسفل"><span>مرّري لاكتشاف المزيد</span><ChevronDown size={17} /></button>
        </section>

        <section className="statement-band">
          <div className="container statement-inner">
            <p>نؤمن أن الحرفة ليست مهارة باليد فقط،<br /><strong>بل طريقة جديدة لرؤية العالم.</strong></p>
            <div className="statement-stats">
              <div><strong>+120</strong><span>متدرّبة</span></div>
              <div><strong>08</strong><span>مسارات حرفية</span></div>
              <div><strong>2018</strong><span>منذ التأسيس</span></div>
            </div>
          </div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="container about-grid">
            <div className="section-intro reveal-up">
              <span className="eyebrow">01 / الحكاية</span>
              <h2>مكان يشبه<br /><em>طموحك.</em></h2>
              <div className="scribble" aria-hidden="true">✦</div>
            </div>
            <div className="about-copy reveal-up reveal-delay-1">
              <p className="lead-copy">في بيت راس، نفتح أبواب الحرفة لكل من تريد أن تبدأ من يدها وتنتهي بصوتها الخاص.</p>
              <p>من قلب بيت راس، وُلد المعهد كمساحة للتعلّم بالممارسة، ولحفظ جمال التفاصيل الصغيرة. نجمع بين دقة التقنية وحرية التجريب، ونؤمن أن كل قطعة مصنوعة يدوياً تحمل جزءاً من صاحبتها.</p>
              <button className="text-link text-link--ink" onClick={() => scrollTo("contact")}>تعرّفي على قصتنا <ArrowUpLeft size={18} /></button>
            </div>
            <div className="about-card reveal-up reveal-delay-2">
              <div className="about-card-top"><span>من أرشيفنا</span><span className="latin">EST. 2018</span></div>
              <div className="bead-art bead-art--large" aria-hidden="true">
                {Array.from({ length: 9 }).map((_, index) => <span key={index} style={{ transform: `rotate(${index * 40}deg) translateY(-62px)`, background: beadColors[index % beadColors.length] }} />)}
                <i />
              </div>
              <div className="about-card-bottom"><span>أيدي تتعلّم</span><strong>قلوب تصنع</strong></div>
            </div>
          </div>
        </section>

        <section className="programs-section section-pad" id="programs">
          <div className="container">
            <div className="section-heading-row">
              <div>
                <span className="eyebrow">02 / مسارات التعلّم</span>
                <h2>اختاري مسارك<br /><em>واصنعي أثرك.</em></h2>
              </div>
              <p>كل مسار مصمم ليمنحكِ معرفة واضحة، وقتاً للممارسة، ورفقة تشبهك.</p>
            </div>
            <div className="programs-layout">
              <div className="program-list">
                {programs.map((program) => {
                  const Icon = program.icon;
                  const isActive = activeProgram === program.id;
                  return (
                    <button className={`program-item ${isActive ? "program-item--active" : ""}`} key={program.id} onClick={() => setActiveProgram(program.id)} style={{ "--program-accent": program.accent } as React.CSSProperties}>
                      <span className="program-num">{program.number}</span>
                      <span className="program-item-copy"><small>{program.eyebrow}</small><strong>{program.title}</strong></span>
                      <Icon size={20} className="program-icon" />
                      <ArrowLeft size={17} className="program-arrow" />
                    </button>
                  );
                })}
                <div className="program-note"><BookOpen size={17} /><span>لا تحتاجين خبرة مسبقة.<br /><b>فقط فضولكِ يكفي.</b></span></div>
              </div>
              <div className="program-detail" style={{ "--program-accent": selectedProgram.accent } as React.CSSProperties}>
                <div className="program-detail-top"><span>{selectedProgram.eyebrow}</span><span className="program-pulse" /></div>
                <div className="program-detail-art" aria-hidden="true"><span className="detail-ring detail-ring--1" /><span className="detail-ring detail-ring--2" /><span className="detail-ring detail-ring--3" /><div className="detail-bead detail-bead--1" /><div className="detail-bead detail-bead--2" /><div className="detail-bead detail-bead--3" /></div>
                <h3>{selectedProgram.title}</h3>
                <p>{selectedProgram.description}</p>
                <div className="program-detail-meta"><span><Clock3 size={15} /> {selectedProgram.meta}</span><button className="circle-arrow" onClick={() => scrollTo("contact")} aria-label={`التسجيل في ${selectedProgram.title}`}><ArrowLeft size={17} /></button></div>
              </div>
            </div>
          </div>
        </section>

        <section className="lab-section section-pad">
          <div className="container lab-grid">
            <div className="lab-visual reveal-up">
              <div className="lab-visual-label"><span className="pulse-dot" /> مختبر الأفكار</div>
              <div className="lab-canvas">
                {Array.from({ length: 28 }).map((_, index) => <span key={index} className="canvas-bead" style={{ background: beadColors[index % beadColors.length], left: `${13 + ((index * 19) % 73)}%`, top: `${12 + ((index * 37) % 70)}%`, width: `${8 + (index % 3) * 4}px`, height: `${8 + (index % 3) * 4}px`, animationDelay: `${index * 0.12}s` }} />)}
                <div className="lab-center"><span className="latin">YOUR</span><strong>فكرتكِ<br />تبدأ هنا</strong><small>اسحبي الخيط بخيالك</small></div>
              </div>
              <div className="lab-caption"><span>01</span><p>ألوانكِ · إيقاعكِ · قصتكِ</p><span>∞</span></div>
            </div>
            <div className="lab-copy reveal-up reveal-delay-1">
              <span className="eyebrow">03 / مساحتكِ الخاصة</span>
              <h2>لا توجد<br /><em>وصفة واحدة</em><br />للجمال.</h2>
              <p>في “مختبر الأفكار” نمنحكِ مساحة لتجربي بلا خوف. اختاري لوحة الألوان، بدّلي الخامات، واسمحي للصدفة أن تقودكِ إلى نتيجة لم تتوقعيها.</p>
              <div className="creative-links">
                {creativeLinks.map((link) => { const Icon = link.icon; return <a href={link.href} target="_blank" rel="noreferrer" key={link.label}><span className="creative-icon"><Icon size={17} /></span><span><strong>{link.label}</strong><small>{link.sub}</small></span><ExternalLink size={15} /></a>; })}
              </div>
            </div>
          </div>
        </section>

        <section className="gallery-section section-pad" id="gallery">
          <div className="container">
            <div className="section-heading-row gallery-heading">
              <div><span className="eyebrow">04 / من أعمالنا</span><h2>أثر اليد<br /><em>في كل تفصيلة.</em></h2></div>
              <p>لقطات من أعمال صُنعت هنا، في ساعات من التركيز، والفضول، والفرح.</p>
            </div>
            <div className="gallery-grid">
              {gallery.map((item, index) => <a className={`gallery-card gallery-card--${index + 1}`} href={item.image} target="_blank" rel="noreferrer" key={item.title}>
                <img src={item.image} alt={item.title} loading="lazy" />
                <span className="gallery-shade" /><span className="gallery-label"><small>{item.tag}</small><strong>{item.title}</strong></span><span className="gallery-plus">+</span>
              </a>)}
            </div>
          </div>
        </section>

        <section className="quote-section section-pad">
          <div className="container quote-inner"><span className="quote-mark">“</span><blockquote>تعلمت أن يدي لا تحتاج أن تكون مثالية،<br /><em>تحتاج فقط أن تبدأ.</em></blockquote><div className="quote-author"><span className="author-avatar">س</span><span><strong>سارة العياصرة</strong><small>خريجة مسار أساسيات فن الخرز</small></span></div><div className="quote-stars" aria-label="تقييم خمس نجوم"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div></div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy"><span className="eyebrow">05 / لنبقى على تواصل</span><h2>لديكِ سؤال؟<br /><em>أو فكرة؟</em></h2><p>نحب أن نسمع منكِ. اتركي رسالة، أو تعالي لزيارتنا في بيت راس.</p><div className="contact-details"><a href="tel:+962790000000"><span><Phone size={17} /></span> +962 7 9000 0000</a><a href="mailto:hello@beitrascraft.jo"><span><Mail size={17} /></span> hello@beitrascraft.jo</a><span><span><MapPin size={17} /></span> بيت راس، إربد · الأردن</span></div></div>
            <form className="contact-form" onSubmit={submitContact}><div className="form-row"><label>اسمكِ<input name="name" placeholder="اكتبي اسمك" required /></label><label>البريد الإلكتروني<input name="email" type="email" placeholder="name@email.com" required /></label></div><label>كيف يمكننا مساعدتكِ؟<textarea name="message" rows={4} placeholder="أخبرينا عن فكرتك أو استفسارك..." required /></label><div className="form-bottom"><span><CheckCircle2 size={16} /> نرد عادةً خلال 48 ساعة</span><button className="button button--ink" type="submit">إرسال الرسالة <Send size={16} /></button></div></form>
          </div>
        </section>

        <section className="newsletter-band"><div className="container newsletter-inner"><div><span className="eyebrow eyebrow--light">رسائل من بيت راس</span><h3>فكرة صغيرة، كل أسبوع.</h3></div><form onSubmit={submitNewsletter}><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="بريدكِ الإلكتروني" aria-label="البريد الإلكتروني للنشرة" required /><button type="submit" aria-label="الاشتراك"><ArrowLeft size={19} /></button></form></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-top"><div className="brand brand--footer"><span className="brand-mark" aria-hidden="true"><span /><span /><span /><span /></span><span className="brand-copy"><strong>بيت راس</strong><small>معهد الحرفة المعاصرة</small></span></div><p>نصنع مساحة تتسع ليديكِ،<br />وتترك أثراً يشبهكِ.</p><div className="footer-socials"><a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /></a><a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="Youtube"><Youtube size={17} /></a><a href="mailto:hello@beitrascraft.jo" aria-label="Email"><Mail size={17} /></a></div></div><div className="container footer-bottom"><span>© 2026 بيت راس. صُنع بحب في الأردن.</span><span className="footer-note"><Leaf size={14} /> حرفة تعيش</span></div></footer>
    </div>
  );
}


