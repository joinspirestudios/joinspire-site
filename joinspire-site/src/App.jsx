import { useState, useEffect } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const FOUNDER_PHOTO = "/joseph.jpg";

const PROJECTS = [
  { id:1, title:"How 40 People Built a $1.25B AI Unicorn to $50M ARR in 5 Months", videoId:"CR7kxeuAPNs", category:"Podcast", client:"CLIMB by VSC" },
  { id:2, title:"The Pig Butchering Scam: How AI Supercharges Every Attack Vector", videoId:"B4gp-33hKXo", category:"Podcast", client:"CLIMB by VSC" },
  { id:3, title:"He Fooled the World, Not the FBI", videoId:"Gmh5dURF7ws", category:"Documentary", client:"Tayo Notes" },
  { id:4, title:"$6.8bn Fraud: The Hunt For Nigeria's Oil Cabal", videoId:"aFUGGexWxCw", category:"Documentary", client:"Jude Bela" },
  { id:5, title:"WORST Foods That Feed CANCER Cells", videoId:"I6ss5y1WBSc", category:"Educational", client:"Leonid Kim MD" },
  { id:6, title:"7 Signs Someone is Secretly Wealthy", videoId:"SnX_GHgiwu0", category:"Educational", client:"Humphrey Yang" },
  { id:7, title:"How West Africa Became A Terror Hotspot", videoId:"cv8FMNQycU0", category:"Documentary", client:"Jude Bela" },
  { id:8, title:"24 Hours in NYC with Africa's BIGGEST Travel Creator", videoId:"LQH7vi5CIW0", category:"Vlog", client:"Donald Aduvie" },
  { id:9, title:"How DreaKnowsBest Monetizes her 6M TikTok Followers", videoId:"X1hCwnxEnpA", category:"Vlog", client:"Donald Aduvie" },
];

const CATEGORIES = ["All","Podcast","Documentary","Educational","Vlog","IRL / Reality"];

const CLIENTS = [
  { name:"Humphrey Yang", subs:"1.96M" },
  { name:"Leonid Kim MD", subs:"605K" },
  { name:"The Odditty Diaries", subs:"244K" },
  { name:"News Central TV", subs:"209K" },
  { name:"Jude Bela", subs:"198K" },
  { name:"Danny Sully", subs:"62.9K" },
  { name:"DABA TV", subs:"43.4K" },
  { name:"AM I TOO LOUD?!", subs:"10.4K" },
  { name:"Profff TV", subs:"8K" },
  { name:"CLIMB by VSC", subs:"2.75K" },
  { name:"Tayo Notes", subs:"2.21K" },
  { name:"Donald Aduvie", subs:"1.65K" },
];

const TESTIMONIALS = [
  { name:"Jude Bela", handle:"198K subscribers", quote:"He is highly dedicated to the task and understands how to tell a story with editing. He is a team player and fun to be with. His creativity brings the stories to life." },
  { name:"Tayo Notes", handle:"2.21K subscribers", quote:"A great video editor, illustrator and animator. He goes above and beyond to support projects with full commitment to the channel's excellence. I will gladly recommend him anytime because you will be getting more than a video editor." },
  { name:"Ameji", handle:"Client", quote:"Really glad to have you onboard and to be learning from you. I'd definitely want to keep working with you overseeing stuff." },
];

const SERVICES = [
  { name:"Documentary Production", slug:"documentary", tagline:"Investigative stories that hold attention from first frame to last.", desc:"Full-service documentary production — from research and scripting through animated visual systems, 2D/3D explainers, and final edit. We build the kind of visual storytelling that turns complex real-world stories into pieces people can't look away from.", includes:["Research & scripting","Animated map explainers (Johnny Harris / Fern TV style)","2D vector & infographic animation","Historical visual design & texture work","Full post-production & color grade","Sound design & music supervision"], relatedCategory:"Documentary" },
  { name:"Podcast Editing", slug:"podcast-editing", tagline:"Post-production that turns conversations into unmissable content.", desc:"We don't just cut audio — we build visual podcast experiences with strict editorial structure, short-clip workflows, and broadcast-quality graphics. Every episode is engineered for retention.", includes:["Full video + audio post-production","Non-linear 4-step opening montage","Short-clip structure (Result→Shock→Context→Payoff)","Lower thirds, text hierarchy & motion graphics","Thumbnail design with color psychology","B-roll asset curation & delivery"], relatedCategory:"Podcast" },
  { name:"YouTube Editing", slug:"youtube-editing", tagline:"Edits that keep viewers watching until the end.", desc:"Sharp, retention-focused editing for educational, vlog, and long-form YouTube content. We handle pacing, graphics, transitions, and visual storytelling — so every video performs.", includes:["Full post-production & assembly edit","Motion graphics & animated overlays","Thumbnail design","Pacing & retention optimization","Color correction & grading","Sound mixing & cleanup"], relatedCategory:"Educational" },
  { name:"Content Strategy", slug:"content-strategy", tagline:"A production intelligence layer for your content pipeline.", desc:"Strategic production planning — reverse-engineering what works, building repeatable content systems, and designing visual identities that position creators for growth.", includes:["Content audit & competitor analysis","Production blueprints & editorial calendars","Visual identity & brand system design","Thumbnail & title strategy","Performance framework integration","Creator positioning & differentiation"], relatedCategory:null },
];

const PROCESS_STEPS = [
  { num:"01", title:"Discovery", desc:"We learn your channel, audience, and goals. You share references and raw material." },
  { num:"02", title:"Blueprint", desc:"We map the edit structure, visual approach, and deliverables before touching a timeline." },
  { num:"03", title:"Production", desc:"Editing, animation, graphics, and sound — built with obsessive attention to detail." },
  { num:"04", title:"Delivery", desc:"Review rounds, final exports, and asset handoff. Ready to publish." },
];

const S = {
  name:"Joinspire Studios",
  founder:"Joseph Oluwatimilehin Adebayo",
  founderShort:"Joseph",
  title:"Founder & Lead Creative",
  email:"hello@joinspire.com",
  bookCall:"https://calendly.com/joinspirestudios/30min",
  showreelId:"jp8wjXI2TUI",
  location:"Lagos, Nigeria",
  stats:"120 YT Videos · +15,892,406 Views",
  socials:[
    {label:"Instagram",url:"https://www.instagram.com/joinspire_studios/"},
    {label:"X",url:"https://x.com/JoinspireS"},
  ],
};

// ===== THEME =====
function ThemeWrap({children}) {
  const [dark, setDark] = useState(false);
  return (
    <div className={dark ? "t-dark" : "t-light"}>
      {children}
      <button className="t-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">
        <div className="t-track">
          <div className={`t-thumb ${dark ? "t-thumb--on" : ""}`}>
            {dark ? (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            ) : (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            )}
          </div>
        </div>
      </button>
    </div>
  );
}

// ===== GRAIN =====
function Grain() {
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9999,opacity:0.025,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:"256px 256px"}} />
  );
}

// ===== DUAL CLOCK — Lagos + Toronto =====
function DualClock() {
  const [lagos, setLagos] = useState("");
  const [toronto, setToronto] = useState("");
  useEffect(() => {
    const tick = () => {
      setLagos(new Date().toLocaleTimeString("en-GB",{timeZone:"Africa/Lagos",hour:"2-digit",minute:"2-digit",second:"2-digit"}));
      setToronto(new Date().toLocaleTimeString("en-GB",{timeZone:"America/Toronto",hour:"2-digit",minute:"2-digit",second:"2-digit"}));
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="clocks">
      <div className="clock-item"><span className="clock-city">Lagos</span><span className="clock-time">{lagos}</span><span className="clock-tz">WAT</span></div>
      <div className="clock-item"><span className="clock-city">Toronto</span><span className="clock-time">{toronto}</span><span className="clock-tz">EST</span></div>
    </div>
  );
}

// ===== NAV =====
function Nav({ onNavigate, currentPage }) {
  const [s, setS] = useState(false);
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const f = () => setS(window.scrollY > 60);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  const go = (id) => {
    setMob(false);
    if (currentPage !== "home") {
      onNavigate("home");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({behavior:"smooth"}), 150);
    } else {
      document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
    }
  };

  return (
    <>
      <nav className={`nav ${s ? "nav--s" : ""}`}>
        <div className="nav-left">
          <button className="logo" onClick={() => onNavigate("home")}>Joinspire<span className="dot">.</span></button>
          <div className="nav-clocks desk"><DualClock /></div>
        </div>
        <div className="nav-r desk">
          <button onClick={() => go("work")}>Work</button>
          <button onClick={() => go("clients")}>Clients</button>
          <button onClick={() => go("services")}>Services</button>
          <button onClick={() => go("about")}>About</button>
          <a href={S.bookCall} className="nav-cta" target="_blank" rel="noopener noreferrer">Book a Call</a>
        </div>
        <button className="burger mob" onClick={() => setMob(!mob)}>
          <span style={{transform: mob ? "rotate(45deg) translate(4px,4px)" : ""}} />
          <span style={{opacity: mob ? 0 : 1}} />
          <span style={{transform: mob ? "rotate(-45deg) translate(5px,-5px)" : ""}} />
        </button>
      </nav>
      {mob && (
        <div className="mob-menu">
          {[["work","Work"],["clients","Clients"],["services","Services"],["about","About"],["contact","Contact"]].map(([id,label]) => (
            <button key={id} onClick={() => go(id)}>{label}</button>
          ))}
        </div>
      )}
    </>
  );
}

// ===== HERO =====
function Hero() {
  const [vis, setVis] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 200); }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <iframe src={`https://www.youtube.com/embed/${S.showreelId}?autoplay=1&mute=1&loop=1&playlist=${S.showreelId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`} title="Showreel" allow="autoplay; encrypted-media" allowFullScreen />
        <div className="hero-dim" />
      </div>
      <div className={`hero-content ${vis ? "hero-content--in" : ""}`}>
        <p className="hero-over">{S.name}</p>
        <h1 className="hero-h1">We make<br/>things people<br/>can't stop watching.</h1>
        <p className="hero-sub">Documentary. Podcast. Animation. Video editing. For creators who refuse to blend in.</p>
        <div className="hero-acts">
          <button className="btn btn--white" onClick={() => document.getElementById("work")?.scrollIntoView({behavior:"smooth"})}>See Our Work</button>
          <button className="btn btn--ghost-w" onClick={() => setPlaying(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21" /></svg>
            Play Showreel
          </button>
        </div>
        <span className="hero-tag">Showreel · 2024</span>
      </div>
      {playing && (
        <div className="hero-fs" onClick={() => setPlaying(false)}>
          <button className="hero-fs-x" onClick={() => setPlaying(false)}>×</button>
          <div className="hero-fs-vid">
            <iframe src={`https://www.youtube.com/embed/${S.showreelId}?autoplay=1&rel=0`} title="Showreel" allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
          </div>
        </div>
      )}
    </section>
  );
}

// ===== VIDEO CARD =====
function VCard({project, onPlay, size}) {
  const [h, setH] = useState(false);
  const [err, setErr] = useState(false);
  const thumb = `https://img.youtube.com/vi/${project.videoId}/${size === "large" ? "maxresdefault" : "hqdefault"}.jpg`;

  return (
    <div className={`vc vc--${size || "normal"} ${h ? "vc--h" : ""}`} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={() => onPlay(project)}>
      <div className="vc-thumb">
        {!err ? (
          <img src={thumb} alt={project.title} loading="lazy" onError={() => setErr(true)} />
        ) : (
          <div className="vc-fb">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"><polygon points="6,3 20,12 6,21" /></svg>
          </div>
        )}
        <div className="vc-over">
          <div className="vc-play">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21" /></svg>
          </div>
        </div>
        <span className="vc-cat">{project.category}</span>
      </div>
      <div className="vc-info">
        <h3 className="vc-title">{project.title}</h3>
        {project.client && <span className="vc-client">{project.client}</span>}
      </div>
    </div>
  );
}

// ===== LIGHTBOX =====
function Lightbox({project, onClose}) {
  useEffect(() => {
    const f = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", f);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", f); document.body.style.overflow = ""; };
  }, [onClose]);
  if (!project) return null;
  return (
    <div className="lb" onClick={onClose}>
      <div className="lb-inner" onClick={e => e.stopPropagation()}>
        <button className="lb-x" onClick={onClose}>×</button>
        <div className="lb-vid">
          <iframe src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&rel=0`} title={project.title} allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
        </div>
        <div className="lb-meta">
          <h3>{project.title}</h3>
          <span>{project.category}{project.client ? ` · ${project.client}` : ""}</span>
        </div>
      </div>
    </div>
  );
}

// ===== WORK =====
function Work() {
  const [filter, setFilter] = useState("All");
  const [lbp, setLbp] = useState(null);
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="work" className="work">
      <div className="sec-head">
        <p className="sec-label">Selected Work</p>
        <h2 className="sec-title">Recent projects.</h2>
      </div>
      <div className="filters">
        {CATEGORIES.map(c => (
          <button key={c} className={`fbtn ${filter === c ? "fbtn--on" : ""}`} onClick={() => setFilter(c)}>
            {c}<span className="fcount">{c === "All" ? PROJECTS.length : PROJECTS.filter(p => p.category === c).length}</span>
          </button>
        ))}
      </div>
      <div className="wgrid-bento">
        {filtered.map((p, i) => (
          <VCard key={p.id} project={p} onPlay={setLbp} size={i < 2 ? "large" : "normal"} />
        ))}
      </div>
      {filter === "IRL / Reality" && filtered.length === 0 && (
        <p className="empty-cat">Coming soon — currently in production.</p>
      )}
      {lbp && <Lightbox project={lbp} onClose={() => setLbp(null)} />}
    </section>
  );
}

// ===== CLIENTS =====
function ClientsSection() {
  const [expanded, setExpanded] = useState(null);
  return (
    <section id="clients" className="clients-sec">
      <div className="sec-head">
        <p className="sec-label">Our Current & Past Partners</p>
        <h2 className="sec-title">Creators we've worked with.</h2>
      </div>
      <div className="cl-list">
        {CLIENTS.map((c, i) => (
          <div key={i}>
            <div className="cl-row" onClick={() => setExpanded(expanded === i ? null : i)}>
              <div className="cl-left">
                <span className="cl-av">{c.name.charAt(0)}</span>
                <span className="cl-name">{c.name}</span>
              </div>
              <span className="cl-subs">{c.subs} Subscribers</span>
            </div>
            {expanded === i && (
              <div className="cl-expand">
                <div className="cl-expand-grid">
                  {PROJECTS.filter(p => p.client === c.name).map(p => (
                    <div key={p.id} className="cl-mini">
                      <img src={`https://img.youtube.com/vi/${p.videoId}/mqdefault.jpg`} alt={p.title} />
                      <span>{p.title}</span>
                    </div>
                  ))}
                  {PROJECTS.filter(p => p.client === c.name).length === 0 && (
                    <p className="cl-no">Projects from this creator will be added soon.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ===== REVIEWS =====
function Reviews() {
  return (
    <section className="reviews">
      <div className="sec-head">
        <p className="sec-label">What They Say</p>
        <h2 className="sec-title">Client reviews.</h2>
      </div>
      <div className="rev-grid">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="rev-card">
            <div className="rev-q">&ldquo;</div>
            <p className="rev-text">{t.quote}</p>
            <div className="rev-author">
              <div className="rev-av">{t.name.charAt(0)}</div>
              <div>
                <span className="rev-name">{t.name}</span>
                <span className="rev-handle">{t.handle}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===== PROCESS =====
function Process() {
  return (
    <section id="process" className="process-sec">
      <div className="sec-head">
        <p className="sec-label">How We Work</p>
        <h2 className="sec-title">Our process.</h2>
      </div>
      <div className="proc-grid">
        {PROCESS_STEPS.map((step) => (
          <div key={step.num} className="proc-card">
            <span className="proc-num">{step.num}</span>
            <h3 className="proc-title">{step.title}</h3>
            <p className="proc-desc">{step.desc}</p>
          </div>
        ))}
      </div>
      <div className="proc-cta">
        <p className="proc-cta-text">We take on a limited number of projects each month to maintain quality.</p>
        <a href={S.bookCall} className="btn btn--dark" target="_blank" rel="noopener noreferrer">Book Your Spot</a>
      </div>
    </section>
  );
}

// ===== INQUIRY FORM =====
function InquiryForm() {
  const [form, setForm] = useState({name:"", email:"", budget:"", project:""});
  return (
    <div className="form-fields">
      <input type="text" placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} className="form-input" />
      <input type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email:e.target.value})} className="form-input" />
      <select value={form.budget} onChange={e => setForm({...form, budget:e.target.value})} className="form-input">
        <option value="">What's your Budget?</option>
        <option>Under $1,000</option>
        <option>$1,000 - $3,000</option>
        <option>$3,000 - $7,000</option>
        <option>$7,000+</option>
      </select>
      <textarea placeholder="Describe Your Project" value={form.project} onChange={e => setForm({...form, project:e.target.value})} className="form-input form-textarea" rows={4} />
      <a href={`mailto:${S.email}?subject=Project Inquiry&body=Name: ${form.name}%0ABudget: ${form.budget}%0A%0AProject: ${encodeURIComponent(form.project)}`} className="btn btn--dark form-btn">Send Inquiry</a>
    </div>
  );
}

// ===== SERVICES (Home section) =====
function ServicesSection({ onNavigate }) {
  return (
    <section id="services" className="pricing">
      <div className="sec-head">
        <p className="sec-label">Our Services</p>
        <h2 className="sec-title">What we do.</h2>
      </div>
      <div className="sv-list">
        {SERVICES.map((s, i) => (
          <button key={i} className="sv-row sv-row--link" onClick={() => onNavigate("service:" + s.slug)}>
            <div className="sv-left">
              <span className="sv-name">{s.name}</span>
              <span className="sv-tagline">{s.tagline}</span>
            </div>
            <span className="sv-arrow">→</span>
          </button>
        ))}
      </div>
      <div className="form-sec">
        <h3 className="form-title">Let's start your project</h3>
        <p className="form-sub">Fill out the form to get started, or <a href={S.bookCall} target="_blank" rel="noopener noreferrer">book a call</a>.</p>
        <InquiryForm />
      </div>
    </section>
  );
}

// ===== ABOUT =====
function About({ onNavigate }) {
  const [popup, setPopup] = useState(false);
  return (
    <section id="about" className="about">
      <div className="about-inner">
        <div className="about-text">
          <p className="sec-label">About</p>
          <h2 className="about-headline">A creative production house for video creators who need more than just an editor.</h2>
          <div className="about-body">
            <p>Joinspire Studios started with documentaries — researching, scripting, and building animated visual systems for investigative stories across Nigeria and West Africa. That work taught us that the difference between content people scroll past and content they can't stop watching is structure, pacing, and visual intelligence.</p>
            <p>That principle now drives everything we do. From podcast post-production to 3D character animation to broadcast identity systems — every project gets the same obsessive attention to detail.</p>
          </div>
          <div className="founder-row" onClick={() => setPopup(true)} style={{cursor:"pointer"}}>
            <div className="af-photo">
              <img src={FOUNDER_PHOTO} alt="Joseph" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%",filter:"grayscale(100%)"}} />
            </div>
            <div className="af-info">
              <span className="af-name">{S.founderShort}</span>
              <span className="af-title">{S.title}</span>
              <span className="af-loc">{S.location}</span>
            </div>
            <span className="af-arrow">→</span>
          </div>
        </div>
        <div className="about-services">
          <span className="as-label">Services</span>
          <div className="as-line" />
          <div className="as-list">
            {SERVICES.map(sv => (
              <button key={sv.slug} className="as-tag" onClick={() => onNavigate("service:" + sv.slug)}>{sv.name}</button>
            ))}
          </div>
        </div>
      </div>
      {popup && (
        <div className="founder-popup" onClick={() => setPopup(false)}>
          <div className="fp-inner" onClick={e => e.stopPropagation()}>
            <button className="fp-x" onClick={() => setPopup(false)}>×</button>
            <div className="fp-photo">
              <img src={FOUNDER_PHOTO} alt="Joseph" style={{width:"100%",height:"100%",objectFit:"cover",filter:"grayscale(100%)"}} />
            </div>
            <div className="fp-info">
              <h3 className="fp-name">{S.founder}</h3>
              <span className="fp-title">{S.title}</span>
              <span className="fp-loc">{S.location}</span>
              <p className="fp-stats">{S.stats}</p>
              <p className="fp-bio">Creative Director and Motion Designer running Joinspire Studios. Specializing in video editing, 2D/3D animation, documentary production, and podcast post-production. Core tools: After Effects (GeoLayers 3, Deep Glow), Blender, Photoshop, Premiere Pro.</p>
              <div className="fp-socials">
                {S.socials.map(s => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ===== CONTACT =====
function Contact({ onNavigate }) {
  return (
    <section id="contact" className="contact">
      <div className="contact-inner">
        <p className="sec-label sec-label--c">Let's Work Together</p>
        <h2 className="ct-h2">Got a story to tell?</h2>
        <p className="ct-sub">We'll make it look like nothing you've seen before.</p>
        <div className="ct-acts">
          <a href={S.bookCall} className="btn btn--dark btn--lg" target="_blank" rel="noopener noreferrer">Book a Call</a>
          <a href={`mailto:${S.email}`} className="btn btn--out btn--lg">{S.email}</a>
        </div>
        <div className="ct-soc">
          {S.socials.map(s => (
            <a key={s.label} href={s.url} className="slink" target="_blank" rel="noopener noreferrer">{s.label}</a>
          ))}
        </div>
      </div>
      <footer className="foot">
        <div className="foot-left">
          <button className="foot-logo" onClick={() => onNavigate("home")}>Joinspire<span className="dot">.</span></button>
          <span className="foot-cp">© {new Date().getFullYear()} Joinspire Studios</span>
        </div>
        <span className="foot-loc">{S.location}</span>
      </footer>
    </section>
  );
}

// ===== SERVICE DETAIL PAGE =====
function ServicePage({ slug, onNavigate }) {
  const service = SERVICES.find(s => s.slug === slug);
  const [lbp, setLbp] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!service) return (
    <div className="sp-404">
      <h2>Service not found</h2>
      <button className="btn btn--dark" onClick={() => onNavigate("home")}>Back to Home</button>
    </div>
  );

  const related = service.relatedCategory
    ? PROJECTS.filter(p => p.category === service.relatedCategory)
    : [];

  return (
    <div className="sp">
      <section className="sp-hero">
        <div className="sp-hero-inner">
          <button className="sp-back" onClick={() => onNavigate("home")}>← Back</button>
          <p className="sec-label">{service.name}</p>
          <h1 className="sp-h1">{service.tagline}</h1>
          <p className="sp-desc">{service.desc}</p>
          <div className="sp-acts">
            <a href={S.bookCall} className="btn btn--dark btn--lg" target="_blank" rel="noopener noreferrer">Book a Call</a>
            <a href={`mailto:${S.email}`} className="btn btn--out btn--lg">Send Inquiry</a>
          </div>
        </div>
      </section>

      <section className="sp-includes">
        <div className="sp-includes-inner">
          <h2 className="sp-h2">What's included</h2>
          <div className="sp-inc-grid">
            {service.includes.map((item, i) => (
              <div key={i} className="sp-inc-item">
                <span className="sp-inc-num">{String(i+1).padStart(2,"0")}</span>
                <span className="sp-inc-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="sp-work">
          <div className="sp-work-inner">
            <div className="sec-head">
              <p className="sec-label">Related Work</p>
              <h2 className="sec-title">Projects in this category.</h2>
            </div>
            <div className="wgrid-bento">
              {related.map((p, i) => (
                <VCard key={p.id} project={p} onPlay={setLbp} size={i < 2 ? "large" : "normal"} />
              ))}
            </div>
          </div>
          {lbp && <Lightbox project={lbp} onClose={() => setLbp(null)} />}
        </section>
      )}

      <section className="sp-cta-sec">
        <div className="sp-cta-inner">
          <h2 className="sp-cta-h2">Ready to start?</h2>
          <p className="sp-cta-sub">We take on a limited number of projects each month.</p>
          <div className="sp-acts">
            <a href={S.bookCall} className="btn btn--dark btn--lg" target="_blank" rel="noopener noreferrer">Book a Call</a>
          </div>
        </div>
      </section>

      <Contact onNavigate={onNavigate} />
    </div>
  );
}

// ===== APP =====
export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (target) => {
    setPage(target);
    window.scrollTo(0, 0);
  };

  // Parse page state
  const isService = page.startsWith("service:");
  const serviceSlug = isService ? page.split(":")[1] : null;

  return (
    <ThemeWrap>
      <style>{`
@import url('https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

:root{--fd:'General Sans',sans-serif;--fb:'DM Sans',sans-serif}
.t-light{--bg:#F7F6F3;--bg2:#FFF;--fg:#1A1A1A;--fg2:#555;--fg3:#999;--fg4:#CCC;--brd:rgba(0,0,0,0.08);--brd2:rgba(0,0,0,0.14);--nav-bg:rgba(247,246,243,0.92);--overlay:rgba(0,0,0,0.88);--card-sh:0 1px 3px rgba(0,0,0,0.04)}
.t-dark{--bg:#0A0A0A;--bg2:#141414;--fg:#FFF;--fg2:rgba(255,255,255,0.55);--fg3:rgba(255,255,255,0.3);--fg4:rgba(255,255,255,0.1);--brd:rgba(255,255,255,0.06);--brd2:rgba(255,255,255,0.12);--nav-bg:rgba(10,10,10,0.92);--overlay:rgba(0,0,0,0.92);--card-sh:0 1px 3px rgba(0,0,0,0.3)}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--fg);font-family:var(--fb);overflow-x:hidden}
.t-light,.t-dark{background:var(--bg);min-height:100vh;transition:background 0.4s,color 0.4s}
::selection{background:rgba(0,0,0,0.12)}.t-dark ::selection{background:rgba(255,255,255,0.15)}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--fg3)}
.dot{opacity:0.2}a{color:inherit}

.t-toggle{position:fixed;bottom:24px;right:24px;z-index:1001;background:var(--bg2);border:1px solid var(--brd2);border-radius:20px;padding:3px;cursor:pointer;box-shadow:var(--card-sh)}
.t-track{width:40px;height:22px;border-radius:11px;background:var(--brd);position:relative}
.t-thumb{position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:var(--fg);color:var(--bg);display:flex;align-items:center;justify-content:center;transition:all 0.3s cubic-bezier(0.16,1,0.3,1)}.t-thumb--on{left:20px}

.nav{position:fixed;top:0;left:0;right:0;z-index:1000;padding:22px clamp(20px,4vw,60px);display:flex;justify-content:space-between;align-items:center;transition:all 0.4s}
.nav--s{padding:14px clamp(20px,4vw,60px);background:var(--nav-bg);backdrop-filter:blur(20px);border-bottom:1px solid var(--brd)}
.nav-left{display:flex;align-items:center;gap:24px}
.nav-clocks .clocks{gap:16px}.nav-clocks .clock-city{font-size:11px}.nav-clocks .clock-time{font-size:11px}.nav-clocks .clock-tz{font-size:9px}
.logo{font-family:var(--fd);font-size:18px;font-weight:700;color:var(--fg);background:none;border:none;cursor:pointer;text-decoration:none}
.nav-r{display:flex;gap:28px;align-items:center}
.nav-r button{background:none;border:none;color:var(--fg3);font-family:var(--fb);font-size:12px;font-weight:500;letter-spacing:1.2px;text-transform:uppercase;cursor:pointer;transition:color 0.3s}.nav-r button:hover{color:var(--fg)}
.nav-cta{background:var(--fg)!important;color:var(--bg)!important;padding:10px 22px!important;font-family:var(--fb)!important;font-size:12px!important;font-weight:600!important;letter-spacing:1px!important;text-transform:uppercase!important;text-decoration:none;border:none;cursor:pointer}
.burger{background:none;border:none;cursor:pointer;padding:6px;flex-direction:column;gap:5px}.burger span{display:block;width:20px;height:1.5px;background:var(--fg);transition:all 0.3s}
.desk{display:flex}.mob{display:none!important}
.mob-menu{position:fixed;inset:0;background:var(--bg);z-index:999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px}
.mob-menu button{background:none;border:none;font-family:var(--fd);font-size:24px;font-weight:700;color:var(--fg);cursor:pointer}
@media(max-width:700px){.desk{display:none!important}.mob{display:flex!important}.nav-clocks{display:none}}

.sec-head{margin-bottom:32px}.sec-label{font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:var(--fg3);margin-bottom:8px}.sec-label--c{text-align:center}
.sec-title{font-family:var(--fd);font-size:clamp(24px,4vw,40px);font-weight:700;line-height:1.15;color:var(--fg)}

/* HERO */
.hero{position:relative;height:100vh;display:flex;align-items:center;overflow:hidden}
.hero-bg{position:absolute;inset:0;z-index:0}.hero-bg iframe{width:100%;height:100%;border:none;pointer-events:none;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-width:177.78vh;min-height:56.25vw}
.hero-dim{position:absolute;inset:0;background:rgba(0,0,0,0.55)}
.hero-content{position:relative;z-index:1;padding:0 clamp(32px,5vw,80px);max-width:900px;opacity:0;transform:translateY(30px);transition:all 1s cubic-bezier(0.16,1,0.3,1)}.hero-content--in{opacity:1;transform:translateY(0)}
.hero-over{font-family:var(--fb);font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:20px}
.hero-h1{font-family:var(--fd);font-size:clamp(36px,6.5vw,76px);font-weight:700;line-height:1.06;color:#fff;margin-bottom:20px}
.hero-sub{font-size:clamp(14px,1.5vw,17px);line-height:1.7;color:rgba(255,255,255,0.45);max-width:440px;margin-bottom:32px}
.hero-acts{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.hero-tag{position:absolute;bottom:32px;left:clamp(32px,5vw,80px);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.3)}
.btn{font-family:var(--fb);font-size:12px;font-weight:600;letter-spacing:0.8px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;border:none}
.btn--dark{background:var(--fg);color:var(--bg);padding:14px 32px}.btn--dark:hover{opacity:0.8}
.btn--white{background:#fff;color:#000;padding:14px 32px}.btn--white:hover{opacity:0.9}
.btn--ghost-w{background:transparent;color:rgba(255,255,255,0.7);padding:14px 32px;border:1px solid rgba(255,255,255,0.2)}.btn--ghost-w:hover{color:#fff;border-color:rgba(255,255,255,0.5)}
.btn--out{background:transparent;color:var(--fg2);padding:14px 32px;border:1px solid var(--brd2)}.btn--out:hover{color:var(--fg);border-color:var(--fg3)}
.btn--lg{padding:18px 40px;font-size:13px}
.hero-fs{position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,0.95);display:flex;align-items:center;justify-content:center;padding:20px}
.hero-fs-x{position:absolute;top:20px;right:28px;background:none;border:none;color:#fff;font-size:32px;cursor:pointer;z-index:3001}
.hero-fs-vid{width:100%;max-width:960px;aspect-ratio:16/9}.hero-fs-vid iframe{width:100%;height:100%;border:none}

/* WORK */
.work{padding:80px clamp(20px,4vw,60px);max-width:1400px;margin:0 auto}
.filters{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:28px;padding-bottom:16px;border-bottom:1px solid var(--brd)}
.fbtn{background:none;border:1px solid var(--brd);color:var(--fg3);font-family:var(--fb);font-size:12px;font-weight:500;padding:7px 16px;cursor:pointer;transition:all 0.3s;display:flex;align-items:center;gap:5px}.fbtn:hover{color:var(--fg2)}.fbtn--on{background:var(--fg);border-color:var(--fg);color:var(--bg)}
.fcount{font-size:10px;opacity:0.5}
.wgrid-bento{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.vc--large{grid-column:span 1}
.vc--normal{grid-column:span 1}
@media(min-width:900px){.wgrid-bento{grid-template-columns:repeat(3,1fr)}.vc--large{grid-column:span 1}}
@media(min-width:1200px){.wgrid-bento{grid-template-columns:repeat(4,1fr)}.vc--large{grid-column:span 2}}
.empty-cat{font-size:14px;color:var(--fg3);padding:40px 0;text-align:center;font-style:italic}
@media(max-width:500px){.wgrid-bento{grid-template-columns:1fr}.vc--large{grid-column:span 1}}

.vc{cursor:pointer;border:1px solid var(--brd);background:var(--bg2);transition:all 0.35s;overflow:hidden}.vc--h{border-color:var(--brd2);transform:translateY(-2px);box-shadow:var(--card-sh)}
.vc-thumb{position:relative;aspect-ratio:16/9;overflow:hidden;background:#111}.vc-thumb img{width:100%;height:100%;object-fit:cover;transition:transform 0.5s}.vc--h .vc-thumb img{transform:scale(1.03)}
.vc-fb{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#1a1a1a}
.vc-over{position:absolute;inset:0;background:rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s}.vc--h .vc-over{opacity:1}
.vc-play{width:44px;height:44px;border-radius:50%;background:var(--fg);display:flex;align-items:center;justify-content:center;transform:scale(0.85);transition:transform 0.4s}.vc--h .vc-play{transform:scale(1)}
.vc-cat{position:absolute;top:10px;left:10px;font-size:9px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#fff;background:rgba(0,0,0,0.5);backdrop-filter:blur(6px);padding:4px 10px}
.vc-info{padding:12px 14px 14px}.vc-title{font-family:var(--fd);font-size:14px;font-weight:600;color:var(--fg);line-height:1.3;margin-bottom:3px}
.vc--large .vc-title{font-size:17px}
.vc-client{font-size:11px;color:var(--fg3)}

.lb{position:fixed;inset:0;z-index:2000;background:var(--overlay);display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(6px)}
.lb-inner{width:100%;max-width:860px}.lb-x{position:absolute;top:16px;right:24px;background:none;border:none;color:#fff;font-size:32px;cursor:pointer;z-index:2001;opacity:0.5}.lb-x:hover{opacity:1}
.lb-vid{aspect-ratio:16/9;width:100%;background:#000}.lb-vid iframe{width:100%;height:100%;border:none}
.lb-meta{padding:14px 0 0}.lb-meta h3{font-family:var(--fd);font-size:18px;font-weight:700;color:#fff;margin-bottom:3px}.lb-meta span{font-size:13px;color:rgba(255,255,255,0.35)}

/* CLIENTS */
.clients-sec{padding:0 clamp(20px,4vw,60px) 80px;max-width:1400px;margin:0 auto}
.cl-list{border-top:1px solid var(--brd)}.cl-row{display:flex;justify-content:space-between;align-items:center;padding:16px 0;border-bottom:1px solid var(--brd);cursor:pointer;transition:all 0.3s}.cl-row:hover{padding-left:8px}
.cl-left{display:flex;align-items:center;gap:12px}.cl-av{width:32px;height:32px;border-radius:50%;background:var(--brd);display:flex;align-items:center;justify-content:center;font-family:var(--fd);font-size:13px;font-weight:700;color:var(--fg2);flex-shrink:0}
.cl-name{font-family:var(--fd);font-size:15px;font-weight:600;color:var(--fg)}.cl-subs{font-size:13px;color:var(--fg3);white-space:nowrap}
.cl-expand{padding:16px 0 24px;border-bottom:1px solid var(--brd)}.cl-expand-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}
.cl-mini{display:flex;flex-direction:column;gap:6px}.cl-mini img{width:100%;aspect-ratio:16/9;object-fit:cover;border:1px solid var(--brd)}.cl-mini span{font-size:12px;color:var(--fg2);line-height:1.3}
.cl-no{font-size:13px;color:var(--fg3);font-style:italic;grid-column:1/-1}

/* REVIEWS */
.reviews{padding:0 clamp(20px,4vw,60px) 80px;max-width:1400px;margin:0 auto}
.rev-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
.rev-card{background:var(--bg2);border:1px solid var(--brd);padding:28px 24px 24px;position:relative}
.rev-q{font-family:var(--fd);font-size:48px;font-weight:700;color:var(--fg4);line-height:1;position:absolute;top:16px;left:20px}
.rev-text{font-size:15px;line-height:1.7;color:var(--fg2);margin-bottom:20px;padding-top:28px}
.rev-author{display:flex;align-items:center;gap:12px}
.rev-av{width:36px;height:36px;border-radius:50%;background:var(--brd);display:flex;align-items:center;justify-content:center;font-family:var(--fd);font-size:14px;font-weight:700;color:var(--fg2);flex-shrink:0}
.rev-name{font-family:var(--fd);font-size:14px;font-weight:700;color:var(--fg);display:block;line-height:1.2}.rev-handle{font-size:11px;color:var(--fg3)}
@media(max-width:500px){.rev-grid{grid-template-columns:1fr}}

/* PROCESS */
.process-sec{padding:80px clamp(20px,4vw,60px);max-width:1400px;margin:0 auto;border-top:1px solid var(--brd)}
.proc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--brd);margin-bottom:48px}
.proc-card{background:var(--bg);padding:32px 28px}
.proc-num{font-family:var(--fd);font-size:32px;font-weight:700;color:var(--fg4);display:block;margin-bottom:12px}
.proc-title{font-family:var(--fd);font-size:18px;font-weight:700;color:var(--fg);margin-bottom:8px}
.proc-desc{font-size:14px;line-height:1.7;color:var(--fg3)}
.proc-cta{text-align:center;padding:32px 0 0}
.proc-cta-text{font-size:15px;color:var(--fg2);margin-bottom:20px;font-style:italic}
@media(max-width:900px){.proc-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:500px){.proc-grid{grid-template-columns:1fr}}

/* SERVICES / PRICING */
.pricing{padding:80px clamp(20px,4vw,60px);max-width:1400px;margin:0 auto;border-top:1px solid var(--brd)}
.sv-list{margin-bottom:48px;border-top:1px solid var(--brd)}
.sv-row{display:flex;justify-content:space-between;align-items:center;padding:22px 0;border-bottom:1px solid var(--brd);transition:all 0.3s;width:100%;background:none;text-align:left}
.sv-row--link{cursor:pointer;text-decoration:none}.sv-row--link:hover{padding-left:8px}
.sv-left{display:flex;flex-direction:column;gap:4px}
.sv-name{font-family:var(--fd);font-size:18px;font-weight:600;color:var(--fg)}
.sv-tagline{font-size:13px;color:var(--fg3)}
.sv-arrow{font-size:20px;color:var(--fg3);transition:transform 0.3s}.sv-row--link:hover .sv-arrow{transform:translateX(4px);color:var(--fg)}
.form-sec{max-width:520px;margin:0 auto;text-align:center}
.form-title{font-family:var(--fd);font-size:clamp(24px,3.5vw,36px);font-weight:700;color:var(--fg);margin-bottom:8px}
.form-sub{font-size:14px;color:var(--fg3);margin-bottom:28px}.form-sub a{color:var(--fg);text-decoration:underline}
.form-fields{display:flex;flex-direction:column;gap:12px}
.form-input{width:100%;padding:14px 18px;background:var(--bg);border:1px solid var(--brd2);font-family:var(--fb);font-size:14px;color:var(--fg);outline:none;transition:border-color 0.3s;-webkit-appearance:none;border-radius:0}.form-input:focus{border-color:var(--fg3)}
.form-textarea{resize:vertical;min-height:80px;font-family:var(--fb)}
.form-btn{width:100%;margin-top:4px;text-align:center;justify-content:center}

/* ABOUT */
.about{padding:80px clamp(20px,4vw,60px);border-top:1px solid var(--brd)}
.about-inner{max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1.6fr 1fr;gap:72px;align-items:start}
.about-headline{font-family:var(--fd);font-size:clamp(20px,3vw,32px);font-weight:700;line-height:1.25;color:var(--fg);margin-bottom:24px;max-width:550px}
.about-body{display:flex;flex-direction:column;gap:14px;margin-bottom:28px}.about-body p{font-size:15px;line-height:1.75;color:var(--fg3);margin:0}
.founder-row{display:flex;align-items:center;gap:14px;padding:16px;border:1px solid var(--brd);background:var(--bg2);transition:all 0.3s}.founder-row:hover{border-color:var(--brd2)}
.af-photo{width:48px;height:48px;border-radius:50%;overflow:hidden;flex-shrink:0;background:var(--brd)}.af-info{flex:1}
.af-name{font-family:var(--fd);font-size:15px;font-weight:700;color:var(--fg);display:block}.af-title{font-size:12px;color:var(--fg2);display:block}.af-loc{font-size:11px;color:var(--fg3);display:block;margin-top:1px}
.af-arrow{font-size:18px;color:var(--fg3)}
.about-services{position:sticky;top:100px}.as-label{display:block;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--fg2);margin-bottom:12px}
.as-line{width:100%;height:1px;background:var(--brd);margin-bottom:0}
.as-list{display:flex;flex-direction:column}.as-tag{font-size:14px;color:var(--fg2);padding:14px 0;border-bottom:1px solid var(--brd);transition:color 0.3s;text-decoration:none;display:block;background:none;border-top:none;border-left:none;border-right:none;font-family:var(--fb);text-align:left;cursor:pointer}.as-tag:hover{color:var(--fg)}
@media(max-width:768px){.about-inner{grid-template-columns:1fr;gap:40px}.about-services{position:static}}

/* FOUNDER POPUP */
.founder-popup{position:fixed;inset:0;z-index:2000;background:var(--overlay);display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(6px)}
.fp-inner{background:var(--bg2);max-width:480px;width:100%;position:relative;overflow:hidden}
.fp-x{position:absolute;top:12px;right:16px;background:none;border:none;color:var(--fg);font-size:28px;cursor:pointer;z-index:1}
.fp-photo{width:100%;aspect-ratio:3/4;background:var(--brd);overflow:hidden}.fp-photo img{width:100%;height:100%}
.fp-info{padding:24px}.fp-name{font-family:var(--fd);font-size:22px;font-weight:700;color:var(--fg);margin-bottom:4px}
.fp-title{font-size:13px;color:var(--fg2);display:block}.fp-loc{font-size:12px;color:var(--fg3);display:block;margin-bottom:12px}
.fp-stats{font-size:13px;font-weight:600;color:var(--fg);margin-bottom:12px}
.fp-bio{font-size:13px;line-height:1.7;color:var(--fg3);margin-bottom:16px}
.fp-socials{display:flex;gap:16px}.fp-socials a{font-size:12px;font-weight:500;letter-spacing:1px;text-transform:uppercase;color:var(--fg3);text-decoration:none}.fp-socials a:hover{color:var(--fg)}

/* CONTACT */
.contact{padding:80px clamp(20px,4vw,60px) 0;border-top:1px solid var(--brd)}
.contact-inner{max-width:600px;margin:0 auto;text-align:center;padding-bottom:60px}
.ct-h2{font-family:var(--fd);font-size:clamp(32px,6vw,56px);font-weight:700;color:var(--fg);line-height:1.1;margin-bottom:12px}
.ct-sub{font-size:15px;line-height:1.7;color:var(--fg3);max-width:400px;margin:0 auto 28px}
.ct-acts{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.ct-soc{display:flex;justify-content:center;gap:24px;margin-top:32px}
.slink{font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--fg3);text-decoration:none;transition:color 0.3s}.slink:hover{color:var(--fg)}

/* FOOTER */
.foot{max-width:1400px;margin:0 auto;padding:24px 0;border-top:1px solid var(--brd);display:flex;justify-content:space-between;align-items:center}
.foot-left{display:flex;align-items:center;gap:20px}.foot-logo{font-family:var(--fd);font-size:14px;font-weight:700;color:var(--fg);text-decoration:none;background:none;border:none;cursor:pointer}.foot-cp{font-size:11px;color:var(--fg4)}.foot-loc{font-size:11px;color:var(--fg4);letter-spacing:1px}
.clocks{display:flex;gap:24px}
.clock-item{display:flex;align-items:center;gap:8px}
.clock-city{font-family:var(--fd);font-size:13px;font-weight:600;color:var(--fg)}.clock-time{font-family:var(--fb);font-size:13px;color:var(--fg2);font-variant-numeric:tabular-nums}.clock-tz{font-size:10px;color:var(--fg4)}
@media(max-width:640px){.foot{flex-direction:column;gap:12px;text-align:center}}

/* SERVICE DETAIL PAGE */
.sp-404{padding:200px 40px;text-align:center}
.sp-404 h2{font-family:var(--fd);font-size:32px;color:var(--fg);margin-bottom:24px}

.sp-hero{padding:160px clamp(20px,4vw,60px) 80px;max-width:1400px;margin:0 auto}
.sp-back{font-size:12px;font-weight:500;letter-spacing:1px;text-transform:uppercase;color:var(--fg3);background:none;border:none;cursor:pointer;font-family:var(--fb);display:inline-block;margin-bottom:32px;transition:color 0.3s;padding:0}.sp-back:hover{color:var(--fg)}
.sp-h1{font-family:var(--fd);font-size:clamp(32px,5vw,56px);font-weight:700;line-height:1.1;color:var(--fg);margin-bottom:20px;max-width:700px}
.sp-desc{font-size:16px;line-height:1.75;color:var(--fg3);max-width:600px;margin-bottom:36px}
.sp-acts{display:flex;gap:12px;flex-wrap:wrap}

.sp-includes{padding:0 clamp(20px,4vw,60px) 80px;max-width:1400px;margin:0 auto}
.sp-includes-inner{border-top:1px solid var(--brd);padding-top:48px}
.sp-h2{font-family:var(--fd);font-size:clamp(22px,3vw,32px);font-weight:700;color:var(--fg);margin-bottom:32px}
.sp-inc-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--brd)}
.sp-inc-item{background:var(--bg);padding:24px 28px;display:flex;gap:16px;align-items:flex-start}
.sp-inc-num{font-family:var(--fd);font-size:14px;font-weight:700;color:var(--fg4);flex-shrink:0}
.sp-inc-text{font-size:15px;color:var(--fg2);line-height:1.5}
@media(max-width:600px){.sp-inc-grid{grid-template-columns:1fr}}

.sp-work{padding:0 clamp(20px,4vw,60px) 80px;max-width:1400px;margin:0 auto}
.sp-work-inner{border-top:1px solid var(--brd);padding-top:48px}

.sp-cta-sec{padding:80px clamp(20px,4vw,60px);max-width:1400px;margin:0 auto;text-align:center;border-top:1px solid var(--brd)}
.sp-cta-h2{font-family:var(--fd);font-size:clamp(28px,4vw,44px);font-weight:700;color:var(--fg);margin-bottom:12px}
.sp-cta-sub{font-size:15px;color:var(--fg3);margin-bottom:28px;font-style:italic}
      `}</style>
      <Grain />
      <Nav onNavigate={navigate} currentPage={page} />
      {page === "home" ? (
        <>
          <Hero />
          <Work />
          <ClientsSection />
          <Reviews />
          <Process />
          <ServicesSection onNavigate={navigate} />
          <About onNavigate={navigate} />
          <Contact onNavigate={navigate} />
        </>
      ) : isService ? (
        <ServicePage slug={serviceSlug} onNavigate={navigate} />
      ) : null}
      <SpeedInsights />
    </ThemeWrap>
  );
}
