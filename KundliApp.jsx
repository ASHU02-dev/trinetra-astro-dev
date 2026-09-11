import { useState } from "react";

// ⚠️ Change this to your deployed backend URL once hosted (Render/Railway).
const BACKEND_URL = "http://localhost:4000/api/kundli";

const RASHIS = ["Mesh","Vrishabh","Mithun","Kark","Simha","Kanya","Tula","Vrishchik","Dhanu","Makar","Kumbh","Meen"];
const PLANET_SHORT = { Sun:"Su", Moon:"Mo", Mars:"Ma", Mercury:"Me", Jupiter:"Ju", Venus:"Ve", Saturn:"Sa", Rahu:"Ra", Ketu:"Ke" };

const TEXT = {
  en: {
    title: "Generate your kundli",
    subtitle: "Enter your birth details for a full Vedic chart — free, powered by our own calculation engine.",
    name: "Full name", gender: "Gender", male: "Male", female: "Female",
    dob: "Date of birth", tob: "Time of birth", place: "Place of birth",
    district: "District", state: "State", submit: "Generate my kundli",
    loading: "Calculating your chart…", selectGender: "Select",
    d1: "Rashi chart (D1)", d9: "Navamsa (D9)", dasha: "Vimshottari dasha",
    house: "House", rashi: "Rashi", running: "Currently running", ends: "ends",
    waCta: "Discuss this chart with an astrologer",
    errFields: "Please fill in all required fields.",
    errServer: "Could not reach the kundli server. Please try again shortly.",
  },
  hi: {
    title: "अपनी कुंडली बनाएं",
    subtitle: "पूरी वैदिक कुंडली के लिए जन्म विवरण भरें — मुफ़्त, हमारे अपने calculation engine से।",
    name: "पूरा नाम", gender: "लिंग", male: "पुरुष", female: "महिला",
    dob: "जन्म तिथि", tob: "जन्म समय", place: "जन्म स्थान",
    district: "जिला", state: "राज्य", submit: "मेरी कुंडली बनाएं",
    loading: "आपकी कुंडली गणना हो रही है…", selectGender: "चुनें",
    d1: "राशि चक्र (D1)", d9: "नवांश (D9)", dasha: "विंशोत्तरी दशा",
    house: "भाव", rashi: "राशि", running: "वर्तमान में चल रहा है", ends: "समाप्त",
    waCta: "इस कुंडली पर ज्योतिषी से बात करें",
    errFields: "कृपया सभी आवश्यक फ़ील्ड भरें।",
    errServer: "कुंडली सर्वर से संपर्क नहीं हो पाया। कृपया थोड़ी देर बाद प्रयास करें।",
  },
};

export default function KundliApp({ lang, wa }) {
  const t = TEXT[lang] || TEXT.en;

  const [form, setForm] = useState({
    name: "", gender: "", dob: "", tob: "", place: "", district: "", state: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.gender || !form.dob || !form.tob || !form.place || !form.state) {
      setError(t.errFields);
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || t.errServer);
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || t.errServer);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="kundli-section">
      <div className="kundli-layout">
        <form className="card kundli-form" onSubmit={handleSubmit}>
          <div className="gold-line" />
          <h2>{t.title}</h2>
          <p className="kundli-subtitle">{t.subtitle}</p>

          <label>{t.name}</label>
          <input type="text" value={form.name} onChange={update("name")} required />

          <label>{t.gender}</label>
          <select value={form.gender} onChange={update("gender")} required>
            <option value="">{t.selectGender}</option>
            <option value="male">{t.male}</option>
            <option value="female">{t.female}</option>
          </select>

          <label>{t.dob}</label>
          <input type="date" value={form.dob} onChange={update("dob")} required />

          <label>{t.tob}</label>
          <input type="time" value={form.tob} onChange={update("tob")} required />

          <label>{t.place}</label>
          <input type="text" value={form.place} onChange={update("place")} required />

          <div className="kundli-row2">
            <div>
              <label>{t.district}</label>
              <input type="text" value={form.district} onChange={update("district")} />
            </div>
            <div>
              <label>{t.state}</label>
              <input type="text" value={form.state} onChange={update("state")} required />
            </div>
          </div>

          <button type="submit" className="primary-btn kundli-submit" disabled={loading}>
            {loading ? t.loading : t.submit}
          </button>
          {error && <p className="kundli-error">{error}</p>}
        </form>

        {result && (
          <div className="card kundli-results">
            <div className="gold-line" />
            <h2>{result.name}</h2>
            <p className="kundli-subtitle">
              {result.birthDetails.dob} · {result.birthDetails.tob} · {result.birthDetails.place}
            </p>

            <h3 className="kundli-chart-title">{t.d1}</h3>
            <ChartTable chart={result.d1Chart} t={t} />

            <h3 className="kundli-chart-title">{t.d9}</h3>
            <ChartTable chart={result.d9Chart} t={t} isNavamsa />

            <h3 className="kundli-chart-title">{t.dasha}</h3>
            <DashaTable dasha={result.vimshottariDasha} t={t} />

            <a
              href={wa(`Hello TRINETRA 🙏 I generated my kundli (${result.name}, born ${result.birthDetails.dob}) and would like to discuss it with an astrologer.`)}
              target="_blank"
              rel="noreferrer"
              className="secondary-btn kundli-wa-btn"
            >
              💬 {t.waCta}
            </a>
          </div>
        )}
      </div>

      <style>{`
        .kundli-section { padding: 80px 20px 100px; max-width: 1100px; margin: 0 auto; }
        .kundli-layout { display: grid; grid-template-columns: 380px 1fr; gap: 30px; align-items: start; }
        @media (max-width: 860px) { .kundli-layout { grid-template-columns: 1fr; } }

        .kundli-form h2, .kundli-results h2 { color: #C8A24A; font-size: 26px; margin-bottom: 6px; }
        .kundli-subtitle { color: rgba(255,255,255,0.6); font-size: 14px; margin-bottom: 20px; line-height: 1.6; }

        .kundli-form label { display: block; font-size: 13px; color: rgba(255,255,255,0.55); margin: 14px 0 6px; letter-spacing: 0.5px; }
        .kundli-form label:first-of-type { margin-top: 0; }
        .kundli-form input, .kundli-form select {
          width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12);
          color: white; padding: 11px 12px; border-radius: 10px; font-size: 14.5px; font-family: serif;
        }
        .kundli-form input:focus, .kundli-form select:focus { outline: none; border-color: #C8A24A; }
        .kundli-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .kundli-submit { margin-top: 22px; width: 100%; text-align: center; border: none; cursor: pointer; font-size: 15px; }
        .kundli-submit:disabled { opacity: 0.6; cursor: default; }
        .kundli-error { color: #ff8a8a; font-size: 13.5px; margin-top: 12px; }

        .kundli-chart-title { color: #C8A24A; font-size: 17px; margin: 26px 0 12px; }
        .kundli-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
        .kundli-table th, .kundli-table td { text-align: left; padding: 9px 8px; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.75); }
        .kundli-table th { color: rgba(255,255,255,0.45); font-weight: normal; font-size: 12px; }

        .kundli-tag { display: inline-block; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 20px; font-size: 12px; margin: 2px 3px 2px 0; color: white; }
        .kundli-tag.moon { color: #C8A24A; border-color: rgba(200,162,74,0.5); }

        .kundli-dasha-current { background: rgba(200,162,74,0.08); border-left: 3px solid #C8A24A; padding: 10px 14px; border-radius: 0 10px 10px 0; margin-bottom: 14px; font-size: 14px; color: rgba(255,255,255,0.85); }

        .kundli-wa-btn { display: block; text-align: center; margin-top: 24px; }
      `}</style>
    </section>
  );
}

function ChartTable({ chart, t, isNavamsa }) {
  const lagnaRashiIndex = isNavamsa ? null : chart.Lagna.rashiIndex;
  const startIndex = lagnaRashiIndex !== null ? lagnaRashiIndex : 0;

  const houses = Array.from({ length: 12 }, () => []);
  for (const [planet, pos] of Object.entries(chart)) {
    if (planet === "Lagna") continue;
    const houseNum = (pos.rashiIndex - startIndex + 12) % 12;
    houses[houseNum].push(planet);
  }

  return (
    <table className="kundli-table">
      <thead>
        <tr>
          <th>{lagnaRashiIndex !== null ? t.house : t.rashi}</th>
          <th>{t.rashi}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 12 }, (_, h) => {
          const rashiIndex = (startIndex + h) % 12;
          return (
            <tr key={h}>
              <td>{lagnaRashiIndex !== null ? h + 1 : h + 1}</td>
              <td>{RASHIS[rashiIndex]}</td>
              <td>
                {houses[h].length === 0
                  ? "—"
                  : houses[h].map((p) => (
                      <span key={p} className={`kundli-tag ${p === "Moon" ? "moon" : ""}`}>
                        {p} ({PLANET_SHORT[p] || p})
                      </span>
                    ))}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function DashaTable({ dasha, t }) {
  const now = new Date();
  const current = dasha.mahadashaTimeline.find(
    (d) => new Date(d.startDate) <= now && now < new Date(d.endDate)
  );

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <>
      <div className="kundli-dasha-current">
        {current
          ? `${t.running}: ${current.lord} Mahadasha — ${t.ends} ${formatDate(current.endDate)}`
          : dasha.nakshatra}
      </div>
      <table className="kundli-table">
        <thead>
          <tr><th>Lord</th><th>Start</th><th>End</th><th>Yrs</th></tr>
        </thead>
        <tbody>
          {dasha.mahadashaTimeline.map((p, i) => (
            <tr key={i}>
              <td>{p.lord}</td>
              <td>{formatDate(p.startDate)}</td>
              <td>{formatDate(p.endDate)}</td>
              <td>{p.years}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
