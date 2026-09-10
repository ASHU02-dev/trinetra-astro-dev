import { useEffect, useRef, useState, useMemo } from "react";

const WA = "917590077820";
const wa = (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

// ── Content (EN + HI) ─────────────────────────────────────────────
const CONTENT = {
  en: {
    tagline: "SEE BEYOND THE VISIBLE",
    navInsta: "Instagram",
    subHeading: "Ancient Spiritual Guidance",
    heroText1: "Love • Career • Life Direction • Private Astrology Guidance",
    heroText2:
      "Private one-to-one spiritual consultations for emotional clarity, destiny insight and cosmic guidance.",
    bookBtn: "Book Private Session",
    waBtn: "WhatsApp Consultation",
    sec1Title: "Spiritual Guidance For Modern Souls",
    highlights: [
      "Love Life Confusion?",
      "Relationship Stress?",
      "Career Blockage?",
      "Emotional Imbalance?",
      "Seeking Spiritual Clarity?",
      "Feeling Lost In Life?",
    ],
    highlightDesc:
      "Personalized cosmic guidance designed to help you understand emotional patterns, energy and life direction.",
    sec2Title: "Consultation Services",
    services: [
      "Birth Chart Reading",
      "Career & Life Direction",
      "Relationship Guidance",
      "Spiritual Energy Reading",
      "Destiny Analysis",
      "Private Astrology Consultation",
    ],
    serviceDesc:
      "Private spiritual consultation focused on clarity, emotional understanding and cosmic insight.",
    sec3Title: "Consultation Pricing",
    plans: [
      {
        label: "FIRST SESSION",
        price: "999",
        desc: "Perfect for first-time spiritual seekers.",
        msg: "Hello TRINETRA 🙏 I want to book the First Session (₹999). Please guide me further.",
      },
      {
        label: "1 HOUR SESSION",
        price: "1100",
        desc: "Detailed private consultation with focused guidance.",
        msg: "Hello TRINETRA 🙏 I want to book the 1 Hour Session (₹1100). Please guide me further.",
      },
      {
        label: "UNLIMITED SESSION",
        price: "2100",
        desc: "Deep spiritual consultation without strict time limits.",
        msg: "Hello TRINETRA 🙏 I want to book the Unlimited Session (₹2100). Please guide me further.",
      },
    ],
    bookNow: "Book Now on WhatsApp",
    sec4Title: "Global Experiences",
    reviews: [
      "The guidance helped me gain emotional clarity during a difficult phase. — Toronto",
      "Very calming and surprisingly accurate consultation. — Dubai",
      "The session felt deeply personal and insightful. — London",
      "I felt emotionally lighter after the session. — Singapore",
      "TRINETRA gave me direction when I had none. — New York",
    ],
    sec5Title: "Why Choose TRINETRA?",
    whys: [
      {
        icon: "🔒",
        title: "100% Private",
        desc: "All consultations are strictly confidential. Your secrets are safe.",
      },
      {
        icon: "🌍",
        title: "Global Clients",
        desc: "Serving seekers across India, UAE, UK, USA, Canada and more.",
      },
      {
        icon: "⚡",
        title: "Quick Response",
        desc: "WhatsApp reply within 1 hour during working hours.",
      },
      {
        icon: "🎯",
        title: "Personalized",
        desc: "Every reading is unique — no generic advice, only your cosmic path.",
      },
    ],
    popupLine: "Private Sessions Available",
    popupBtn: "Book on WhatsApp",
    finalTitle: "Destiny Reveals Itself",
    finalDesc:
      "TRINETRA offers private spiritual guidance based on traditional astrological understanding, intuitive analysis and years of consultation experience.",
    finalBtn: "Begin Your Consultation",
    floatMsg:
      "Hello TRINETRA 🙏 I want to know more about your consultation services.",
  },
  hi: {
    tagline: "दृश्य से परे देखें",
    navInsta: "इंस्टाग्राम",
    subHeading: "प्राचीन आध्यात्मिक मार्गदर्शन",
    heroText1: "प्रेम • करियर • जीवन दिशा • निजी ज्योतिष मार्गदर्शन",
    heroText2:
      "भावनात्मक स्पष्टता, भाग्य अंतर्दृष्टि और ब्रह्मांडीय मार्गदर्शन के लिए निजी आध्यात्मिक परामर्श।",
    bookBtn: "प्राइवेट सेशन बुक करें",
    waBtn: "WhatsApp पर बात करें",
    sec1Title: "आधुनिक आत्माओं के लिए आध्यात्मिक मार्गदर्शन",
    highlights: [
      "प्रेम जीवन में उलझन?",
      "रिश्तों में तनाव?",
      "करियर में रुकावट?",
      "भावनात्मक असंतुलन?",
      "आध्यात्मिक स्पष्टता की तलाश?",
      "जीवन में खोया हुआ महसूस?",
    ],
    highlightDesc:
      "भावनात्मक पैटर्न, ऊर्जा और जीवन दिशा समझने के लिए व्यक्तिगत ब्रह्मांडीय मार्गदर्शन।",
    sec2Title: "परामर्श सेवाएं",
    services: [
      "जन्म कुंडली वाचन",
      "करियर और जीवन दिशा",
      "रिश्ते मार्गदर्शन",
      "आध्यात्मिक ऊर्जा वाचन",
      "भाग्य विश्लेषण",
      "निजी ज्योतिष परामर्श",
    ],
    serviceDesc:
      "स्पष्टता, भावनात्मक समझ और ब्रह्मांडीय अंतर्दृष्टि पर केंद्रित निजी आध्यात्मिक परामर्श।",
    sec3Title: "परामर्श शुल्क",
    plans: [
      {
        label: "पहला सेशन",
        price: "999",
        desc: "पहली बार आध्यात्मिक मार्गदर्शन लेने वालों के लिए।",
        msg: "नमस्ते TRINETRA 🙏 मैं पहला सेशन (₹999) बुक करना चाहता/चाहती हूं। कृपया आगे मार्गदर्शन करें।",
      },
      {
        label: "1 घंटे का सेशन",
        price: "1100",
        desc: "केंद्रित मार्गदर्शन के साथ विस्तृत निजी परामर्श।",
        msg: "नमस्ते TRINETRA 🙏 मैं 1 घंटे का सेशन (₹1100) बुक करना चाहता/चाहती हूं। कृपया आगे मार्गदर्शन करें।",
      },
      {
        label: "असीमित सेशन",
        price: "2100",
        desc: "समय सीमा के बिना गहरा आध्यात्मिक परामर्श।",
        msg: "नमस्ते TRINETRA 🙏 मैं असीमित सेशन (₹2100) बुक करना चाहता/चाहती हूं। कृपया आगे मार्गदर्शन करें।",
      },
    ],
    bookNow: "WhatsApp पर बुक करें",
    sec4Title: "वैश्विक अनुभव",
    reviews: [
      "मार्गदर्शन ने मुझे कठिन समय में भावनात्मक स्पष्टता दी। — टोरंटो",
      "बहुत शांत और놀랍도록 सटीक परामर्श। — दुबई",
      "सेशन बहुत व्यक्तिगत और ज्ञानवर्धक लगा। — लंदन",
      "सेशन के बाद मैं भावनात्मक रूप से हल्का महसूस किया। — सिंगापुर",
      "TRINETRA ने मुझे दिशा दी जब मेरे पास कोई नहीं थी। — न्यूयॉर्क",
    ],
    sec5Title: "TRINETRA क्यों चुनें?",
    whys: [
      {
        icon: "🔒",
        title: "100% गोपनीय",
        desc: "सभी परामर्श पूरी तरह गोपनीय हैं। आपके रहस्य सुरक्षित हैं।",
      },
      {
        icon: "🌍",
        title: "वैश्विक ग्राहक",
        desc: "भारत, UAE, UK, USA, कनाडा और अधिक देशों में सेवा।",
      },
      {
        icon: "⚡",
        title: "त्वरित प्रतिक्रिया",
        desc: "कार्य समय के दौरान 1 घंटे में WhatsApp उत्तर।",
      },
      {
        icon: "🎯",
        title: "व्यक्तिगत",
        desc: "हर वाचन अनूठा — कोई सामान्य सलाह नहीं, केवल आपका ब्रह्मांडीय पथ।",
      },
    ],
    popupLine: "प्राइवेट सेशन उपलब्ध",
    popupBtn: "WhatsApp पर बुक करें",
    finalTitle: "भाग्य स्वयं प्रकट होता है",
    finalDesc:
      "TRINETRA पारंपरिक ज्योतिषीय समझ, सहज विश्लेषण और वर्षों के परामर्श अनुभव पर आधारित निजी आध्यात्मिक मार्गदर्शन प्रदान करता है।",
    finalBtn: "परामर्श शुरू करें",
    floatMsg:
      "नमस्ते TRINETRA 🙏 मैं आपकी परामर्श सेवाओं के बारे में जानना चाहता/चाहती हूं।",
  },
};

// ── Canvas Background ──────────────────────────────────────────────
function CosmicBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animFrame;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.008 + 0.003,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));
    const shootingStars = Array.from({ length: 3 }, () => ({
      x: 0,
      y: 0,
      len: Math.random() * 120 + 60,
      speed: Math.random() * 6 + 4,
      alpha: 0,
      active: false,
      timer: Math.random() * 300,
    }));
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.01;
      stars.forEach((s) => {
        s.alpha =
          0.3 + 0.7 * Math.abs(Math.sin(t * s.speed * 10 + s.twinkleOffset));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,240,200,${s.alpha * 0.75})`;
        ctx.fill();
      });
      shootingStars.forEach((ss) => {
        ss.timer--;
        if (ss.timer <= 0 && !ss.active) {
          ss.x = Math.random() * canvas.width;
          ss.y = Math.random() * canvas.height * 0.4;
          ss.alpha = 1;
          ss.active = true;
          ss.timer = Math.random() * 400 + 200;
        }
        if (ss.active) {
          ctx.beginPath();
          const g = ctx.createLinearGradient(
            ss.x,
            ss.y,
            ss.x - ss.len,
            ss.y + ss.len * 0.3
          );
          g.addColorStop(0, `rgba(200,162,74,${ss.alpha})`);
          g.addColorStop(1, "transparent");
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.5;
          ctx.moveTo(ss.x, ss.y);
          ctx.lineTo(ss.x - ss.len, ss.y + ss.len * 0.3);
          ctx.stroke();
          ss.x += ss.speed;
          ss.y += ss.speed * 0.3;
          ss.alpha -= 0.025;
          if (ss.alpha <= 0) ss.active = false;
        }
      });
      animFrame = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}
    />
  );
}

// ── Zodiac Symbols ─────────────────────────────────────────────────
const ZODIAC = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];
function FloatingZodiac() {
  const symbols = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        symbol: ZODIAC[i % ZODIAC.length],
        left: `${5 + ((i * 6.5) % 88)}%`,
        top: `${2 + ((i * 7.3) % 94)}%`,
        size: 18 + ((i * 7) % 28),
        duration: 14 + ((i * 2.3) % 20),
        delay: (i * 1.1) % 12,
        opacity: 0.06 + ((i * 0.007) % 0.1),
        drift: i % 2 === 0 ? "floatA" : "floatB",
      })),
    []
  );
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none", overflow: "hidden" }}>
      {symbols.map((s, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: s.left,
            top: s.top,
            fontSize: `${s.size}px`,
            color: "#C8A24A",
            opacity: s.opacity,
            textShadow: "0 0 20px rgba(200,162,74,0.6)",
            animation: `${s.drift} ${s.duration}s ${s.delay}s ease-in-out infinite`,
            userSelect: "none",
          }}
        >
          {s.symbol}
        </span>
      ))}
      <style>{`
        @keyframes floatA{0%{transform:translateY(0)rotate(0deg)}33%{transform:translateY(-22px)rotate(8deg)}66%{transform:translateY(10px)rotate(-5deg)}100%{transform:translateY(0)rotate(0deg)}}
        @keyframes floatB{0%{transform:translateY(0)rotate(0deg)}40%{transform:translateY(18px)rotate(-10deg)}70%{transform:translateY(-12px)rotate(6deg)}100%{transform:translateY(0)rotate(0deg)}}
      `}</style>
    </div>
  );
}

// ── Nebula Blobs ───────────────────────────────────────────────────
function NebulaBlobs() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle,rgba(200,162,74,0.09) 0%,transparent 70%)", top: "-120px", right: "-80px", filter: "blur(60px)", animation: "nebulaPulse 10s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(122,0,0,0.18) 0%,transparent 70%)", bottom: "-180px", left: "-100px", filter: "blur(80px)", animation: "nebulaPulse 14s 2s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(80,0,80,0.07) 0%,transparent 70%)", top: "40%", left: "40%", transform: "translate(-50%,-50%)", filter: "blur(70px)", animation: "nebulaDrift 18s ease-in-out infinite alternate" }} />
      <style>{`
        @keyframes nebulaPulse{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
        @keyframes nebulaDrift{from{transform:translate(-50%,-50%)scale(1)}to{transform:translate(-42%,-58%)scale(1.12)}}
      `}</style>
    </div>
  );
}

// ── Scroll To Top Button ───────────────────────────────────────────
function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: "105px",
        right: "25px",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        background: "rgba(200,162,74,0.15)",
        border: "1px solid rgba(200,162,74,0.5)",
        color: "#C8A24A",
        fontSize: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        zIndex: 998,
        backdropFilter: "blur(10px)",
        transition: "0.3s",
        animation: "fadeUp 0.3s ease",
      }}
      title="Back to top"
    >
      ↑
    </button>
  );
}

// ── Main App ───────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("en");
  const c = CONTENT[lang];

  return (
    <div className="app">
      <NebulaBlobs />
      <CosmicBackground />
      <FloatingZodiac />

      {/* LOADING */}
      <div className="loading-screen">
        <h1>TRINETRA</h1>
      </div>

      {/* AUDIO */}
      <audio autoPlay loop>
        <source src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8e0f6c8.mp3?filename=dark-ambient-110042.mp3" />
      </audio>

      <div className="background-glow" />
      <div className="smoke" />

      {/* NAVBAR */}
      <nav className="navbar">
        <div>
          <h1 className="logo">TRINETRA</h1>
          <p className="tagline">{c.tagline}</p>
        </div>
        <div className="nav-right">
          <a href="https://instagram.com/__triinetra__" target="_blank" rel="noreferrer" className="insta-btn">
            📸 {c.navInsta}
          </a>
          <button className={`lang-btn ${lang === "en" ? "lang-active" : ""}`} onClick={() => setLang("en")}>EN</button>
          <button className={`lang-btn ${lang === "hi" ? "lang-active" : ""}`} onClick={() => setLang("hi")}>हिंदी</button>
        </div>
      </nav>

      {/* HERO — FIX: width:100% + align-items:center ensures perfect centering */}
      <section className="hero">
        <div className="orb-container">
          <div className="energy-ring ring1" />
          <div className="energy-ring ring2" />
          <div className="energy-ring ring3" />
          <div className="energy-orb">✦</div>
        </div>
        <p className="small-heading">{c.subHeading}</p>
        <h1 className="main-title">TRINETRA</h1>
        <p className="hero-text">
          {c.heroText1}
          <br />
          {c.heroText2}
        </p>
        <div className="button-group">
          <a href={wa("Hello TRINETRA 🙏 I want to book a private consultation. Please guide me.")} target="_blank" rel="noreferrer" className="primary-btn">
            {c.bookBtn}
          </a>
          <a href={wa(c.floatMsg)} target="_blank" rel="noreferrer" className="secondary-btn">
            {c.waBtn}
          </a>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="section">
        <h2 className="section-title">{c.sec1Title}</h2>
        <div className="grid">
          {c.highlights.map((item, i) => (
            <a key={i} href={wa(`Hello TRINETRA 🙏 I am facing: "${item}". I need spiritual guidance.`)} target="_blank" rel="noreferrer" className="card card-link">
              <div className="gold-line" />
              <h3>{item}</h3>
              <p>{c.highlightDesc}</p>
              <span className="card-cta">✦ Get Guidance →</span>
            </a>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <h2 className="section-title">{c.sec2Title}</h2>
        <div className="grid">
          {c.services.map((service, i) => (
            <a key={i} href={wa(`Hello TRINETRA 🙏 I am interested in: "${service}". Please guide me.`)} target="_blank" rel="noreferrer" className="card card-link">
              <div className="gold-line" />
              <h3>{service}</h3>
              <p>{c.serviceDesc}</p>
              <span className="card-cta">✦ Book This →</span>
            </a>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="section">
        <h2 className="section-title">{c.sec3Title}</h2>
        <div className="grid">
          {c.plans.map((plan, i) => (
            <div key={i} className={`price-card ${i === 1 ? "premium" : ""}`}>
              {i === 1 && <div className="popular-badge">⭐ Most Popular</div>}
              <span className="offer">{plan.label}</span>
              <h3>₹{plan.price}</h3>
              <p>{plan.desc}</p>
              <a href={wa(plan.msg)} target="_blank" rel="noreferrer" className="price-btn">
                💬 {c.bookNow}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* WHY TRINETRA */}
      <section className="section">
        <h2 className="section-title">{c.sec5Title}</h2>
        <div className="grid why-grid">
          {c.whys.map((w, i) => (
            <div key={i} className="why-card">
              <div className="why-icon">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section">
        <h2 className="section-title">{c.sec4Title}</h2>
        <div className="reviews-slider">
          {c.reviews.map((review, i) => (
            <div key={i} className="review-card">
              <div className="stars-row">★★★★</div>
              <p>{review}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING POPUP */}
      <div className="booking-popup">
        <p>{c.popupLine}</p>
        <a href={wa("Hello TRINETRA 🙏 I want to book a session.")} target="_blank" rel="noreferrer">
          💬 {c.popupBtn}
        </a>
      </div>

      {/* FINAL CTA */}
      <section className="final-section">
        <h2>{c.finalTitle}</h2>
        <p>{c.finalDesc}</p>
        <a href={wa("Hello TRINETRA 🙏 I want to begin my consultation. Please guide me.")} target="_blank" rel="noreferrer" className="primary-btn">
          {c.finalBtn}
        </a>
      </section>

      {/* FLOATING WA */}
      <a href={wa(c.floatMsg)} target="_blank" rel="noreferrer" className="floating-btn" title="Chat on WhatsApp">
        💬
      </a>

      {/* SCROLL TO TOP */}
      <ScrollToTop />

      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        body { background:black; font-family:serif; cursor:crosshair; overflow-x:hidden; }

        .app { min-height:100vh; background:radial-gradient(circle at top,#4a0000 0%,black 65%); color:white; position:relative; overflow:hidden; }

        .navbar,.hero,.section,.final-section,.booking-popup,.floating-btn,.loading-screen { position:relative; z-index:10; }

        .loading-screen { position:fixed; inset:0; background:black; display:flex; justify-content:center; align-items:center; z-index:99999; animation:hideLoader 3s forwards; }
        .loading-screen h1 { color:#C8A24A; letter-spacing:12px; font-size:40px; animation:pulse 2s infinite; }

        .background-glow { position:absolute; width:700px; height:700px; background:rgba(122,0,0,0.22); border-radius:50%; filter:blur(140px); top:-250px; left:-150px; animation:pulse 6s infinite alternate; z-index:3; }
        .smoke { position:fixed; inset:0; background:radial-gradient(circle,rgba(255,255,255,0.03),transparent); filter:blur(60px); animation:smokeMove 15s infinite alternate; pointer-events:none; z-index:3; }

        .navbar { display:flex; justify-content:space-between; align-items:center; padding:25px 40px; backdrop-filter:blur(10px); }
        .logo { color:#C8A24A; letter-spacing:10px; font-size:34px; margin:0; }
        .tagline { color:rgba(255,255,255,0.5); letter-spacing:3px; font-size:11px; margin-top:4px; }
        .nav-right { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }

        .lang-btn, .insta-btn { background:transparent; border:1px solid rgba(255,255,255,0.2); color:white; padding:10px 18px; border-radius:40px; text-decoration:none; cursor:pointer; font-size:14px; transition:0.3s; font-family:serif; }
        .lang-btn:hover, .insta-btn:hover { border-color:#C8A24A; color:#C8A24A; }
        .lang-active { background:rgba(200,162,74,0.15) !important; border-color:#C8A24A !important; color:#C8A24A !important; }

        /* ── HERO FIX: full width, align-items center, no left drift ── */
        .hero {
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          text-align: center;
          padding: 20px;
          animation: fadeUp 1.5s ease;
          /* Remove any stray left offset */
          margin-left: 0;
          margin-right: 0;
          padding-left: 0;
          padding-right: 0;
        }

        .orb-container { position:relative; width:260px; height:260px; margin:0 auto 40px auto; display:flex; justify-content:center; align-items:center; }
        .energy-orb { position:absolute; width:120px; height:120px; border-radius:50%; background:radial-gradient(circle,rgba(255,220,120,0.95) 0%,rgba(160,0,0,0.95) 35%,rgba(20,0,0,1) 100%); box-shadow:0 0 40px rgba(255,180,80,0.5),0 0 100px rgba(120,0,0,0.5); animation:orbPulse 4s ease-in-out infinite; display:flex; justify-content:center; align-items:center; font-size:38px; color:#ffd97a; }
        .energy-ring { position:absolute; border-radius:50%; border:1px solid rgba(200,162,74,0.35); }
        .ring1 { width:180px; height:180px; animation:rotateSlow 18s linear infinite; }
        .ring2 { width:240px; height:240px; border-style:dashed; animation:rotateReverse 24s linear infinite; }
        .ring3 { width:300px; height:300px; opacity:0.5; animation:rotateSlow 40s linear infinite; }
        .ring1::before,.ring2::before,.ring3::before { content:""; position:absolute; width:10px; height:10px; border-radius:50%; background:#c8a24a; top:-5px; left:50%; box-shadow:0 0 15px #c8a24a; }

        .small-heading { letter-spacing:6px; color:rgba(255,255,255,0.55); margin-bottom:15px; width:100%; text-align:center; }
        .main-title { font-size:90px; color:#C8A24A; margin:0; text-shadow:0 0 25px rgba(200,162,74,0.4); width:100%; text-align:center; }
        .hero-text { max-width:850px; margin:30px auto 0; line-height:1.9; font-size:22px; color:rgba(255,255,255,0.8); text-align:center; }

        .button-group { display:flex; gap:20px; margin-top:50px; flex-wrap:wrap; justify-content:center; width:100%; }
        .primary-btn { padding:18px 42px; border-radius:50px; background:linear-gradient(to right,#7A0000,#240000); text-decoration:none; color:white; box-shadow:0 0 35px rgba(122,0,0,0.7); transition:0.3s; display:inline-block; }
        .primary-btn:hover { transform:scale(1.05); box-shadow:0 0 50px rgba(122,0,0,0.9); }
        .secondary-btn { padding:18px 42px; border-radius:50px; border:1px solid rgba(200,162,74,0.4); text-decoration:none; color:white; transition:0.3s; }
        .secondary-btn:hover { border-color:#C8A24A; background:rgba(200,162,74,0.08); }

        .section { padding:100px 20px; }
        .section-title { text-align:center; font-size:55px; color:#C8A24A; margin-bottom:70px; }
        .grid { max-width:1200px; margin:auto; display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:30px; }

        .card, .price-card, .review-card, .why-card { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:32px; padding:35px; backdrop-filter:blur(10px); transition:0.4s; }
        .card:hover,.price-card:hover,.review-card:hover,.why-card:hover { transform:translateY(-10px); border-color:rgba(200,162,74,0.4); box-shadow:0 0 35px rgba(122,0,0,0.25); }
        .card-link { text-decoration:none; color:inherit; display:block; cursor:pointer; }
        .card-cta { display:inline-block; margin-top:15px; color:#C8A24A; font-size:14px; letter-spacing:1px; }
        .gold-line { width:70px; height:4px; background:#C8A24A; border-radius:20px; margin-bottom:25px; }
        .card h3,.price-card h3 { color:#C8A24A; font-size:26px; margin-bottom:10px; }
        .card p,.price-card p,.review-card p,.why-card p { color:rgba(255,255,255,0.68); line-height:1.8; }

        .offer { color:rgba(255,255,255,0.5); letter-spacing:4px; font-size:12px; display:block; margin-bottom:10px; }
        .price-card h3 { font-size:60px; color:white; margin:10px 0; }
        .premium { transform:scale(1.04); border-color:rgba(200,162,74,0.4); position:relative; }
        .popular-badge { position:absolute; top:-14px; left:50%; transform:translateX(-50%); background:linear-gradient(to right,#C8A24A,#a07830); color:black; font-size:12px; letter-spacing:2px; padding:4px 18px; border-radius:20px; font-weight:bold; white-space:nowrap; }
        .price-btn { display:inline-block; margin-top:25px; padding:14px 28px; border-radius:40px; background:linear-gradient(to right,#7A0000,#3a0000); text-decoration:none; color:white; transition:0.3s; box-shadow:0 0 20px rgba(122,0,0,0.4); }
        .price-btn:hover { transform:scale(1.05); box-shadow:0 0 35px rgba(122,0,0,0.7); }

        .why-grid { grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); }
        .why-card { text-align:center; }
        .why-icon { font-size:42px; margin-bottom:15px; }
        .why-card h3 { color:#C8A24A; font-size:22px; margin-bottom:10px; }

        .reviews-slider { display:flex; gap:25px; overflow-x:auto; padding-bottom:15px; max-width:1200px; margin:auto; }
        .reviews-slider::-webkit-scrollbar { height:4px; }
        .reviews-slider::-webkit-scrollbar-track { background:rgba(255,255,255,0.05); }
        .reviews-slider::-webkit-scrollbar-thumb { background:#C8A24A; border-radius:10px; }
        .review-card { min-width:300px; }
        .stars-row { color:#C8A24A; font-size:18px; margin-bottom:12px; letter-spacing:3px; }

        .booking-popup { position:fixed; left:20px; bottom:20px; background:rgba(0,0,0,0.85); border:1px solid rgba(200,162,74,0.3); padding:18px 22px; border-radius:20px; z-index:999; backdrop-filter:blur(15px); animation:popupFloat 3s infinite; }
        .booking-popup p { color:rgba(255,255,255,0.7); font-size:13px; margin-bottom:6px; }
        .booking-popup a { color:#C8A24A; text-decoration:none; font-size:14px; font-weight:bold; }
        .booking-popup a:hover { text-decoration:underline; }

        .final-section { text-align:center; padding:120px 20px; border-top:1px solid rgba(255,255,255,0.08); }
        .final-section h2 { font-size:65px; color:#C8A24A; }
        .final-section p { max-width:800px; margin:25px auto 45px; color:rgba(255,255,255,0.65); line-height:1.9; }

        .floating-btn { position:fixed; bottom:25px; right:25px; width:68px; height:68px; border-radius:50%; background:#25D366; display:flex; justify-content:center; align-items:center; text-decoration:none; font-size:30px; box-shadow:0 0 30px rgba(37,211,102,0.6); z-index:999; animation:floatBounce 2s ease-in-out infinite; }

        @keyframes rotateSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes rotateReverse{from{transform:rotate(360deg)}to{transform:rotate(0deg)}}
        @keyframes orbPulse{0%{transform:scale(1);opacity:.85}50%{transform:scale(1.08);opacity:1}100%{transform:scale(1);opacity:.85}}
        @keyframes pulse{from{opacity:.4}to{opacity:1}}
        @keyframes smokeMove{from{transform:translateX(-20px)}to{transform:translateX(20px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes popupFloat{0%{transform:translateY(0)}50%{transform:translateY(-5px)}100%{transform:translateY(0)}}
        @keyframes floatBounce{0%{transform:translateY(0)}50%{transform:translateY(-8px)}100%{transform:translateY(0)}}
        @keyframes hideLoader{0%{opacity:1}80%{opacity:1}100%{opacity:0;visibility:hidden}}

     @media(max-width:768px){
  .navbar{padding:20px;flex-direction:column;gap:15px;text-align:center;}
  .nav-right{justify-content:center;}
  .main-title{font-size:72px;}
  .hero-text{font-size:20px;}
  .small-heading{font-size:14px;letter-spacing:4px;}
  .section-title{font-size:46px;}
  .final-section h2{font-size:52px;}
  .final-section p{font-size:18px;}
  .card h3,.price-card h3{font-size:28px;}
  .card p,.price-card p,.review-card p,.why-card p{font-size:17px;}
  .price-card h3{font-size:62px;}
  .why-card h3{font-size:24px;}
  .logo{font-size:38px;}
  .lang-btn,.insta-btn{font-size:15px;padding:10px 16px;}
  .orb-container{width:180px;height:180px;}
  .energy-orb{width:80px;height:80px;font-size:28px;}
  .ring1{width:130px;height:130px;}
  .ring2{width:170px;height:170px;}
  .ring3{width:210px;height:210px;}
  .booking-popup{display:none;}
  .section{padding:70px 15px;}
}
      `}</style>
    </div>
  );
}
