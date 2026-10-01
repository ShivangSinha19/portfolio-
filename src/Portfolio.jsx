import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const NAV_LINKS = ["Home", "About", "Projects", "Skills", "Experience", "Education", "Certifications", "Contact"];

const PROJECTS = [
  {
    id: 1,
    title: "Internet Banking System",
    subtitle: "Java Backend · Spring Boot · MySQL",
    desc: "A banking application covering authentication, account management, deposits, withdrawals, fund transfers and transaction history.",
    problem: "Banking workflows need reliable authentication, transactional operations and consistent data handling.",
    solution: "Built a modular Java backend with JDBC/MySQL support, authentication, account operations, beneficiary management and transaction workflows.",
    tech: "Java, Spring Boot, JDBC, MySQL, Maven, REST APIs",
    outcome: "Demonstrates backend architecture, database integration, exception handling and practical business logic.",
    stack: ["Java", "Spring Boot", "JDBC", "MySQL", "REST APIs"],
    color: "#6366f1",
    icon: "🏦",
    badge: "Featured",
    github: "https://github.com/ShivangSinha19/Internet-Banking-System",
    demo: "",
    highlights: ["Authentication and user management", "Deposit, withdrawal and fund transfer", "Transaction history and beneficiaries"],
  },
  {
    id: 2,
    title: "Multi-Agent AI Research Assistant",
    subtitle: "LangGraph · FastAPI · OpenAI",
    desc: "A multi-agent research workflow that coordinates specialized agents for research, analysis and response generation.",
    problem: "Research tasks often require multiple stages of information gathering, reasoning and synthesis.",
    solution: "Designed a multi-agent workflow with a coordinating layer and specialized research and analysis steps.",
    tech: "Python, LangGraph, FastAPI, OpenAI API, Streamlit",
    outcome: "Shows practical experience with AI orchestration, APIs and modular application architecture.",
    stack: ["Python", "LangGraph", "FastAPI", "OpenAI", "Streamlit"],
    color: "#06b6d4",
    icon: "🤖",
    github: "",
    demo: "",
    highlights: ["Multi-agent workflow orchestration", "FastAPI backend", "Research and synthesis pipeline"],
  },
  {
    id: 3,
    title: "Smart Document Analyzer",
    subtitle: "RAG · LangChain · FAISS · OpenAI",
    desc: "A document question-answering application using semantic retrieval and source-grounded responses.",
    problem: "Finding relevant information inside large documents manually is slow and inefficient.",
    solution: "Built a RAG workflow that processes documents, retrieves relevant context and generates answers using an LLM.",
    tech: "Python, LangChain, FAISS, Streamlit, OpenAI API",
    outcome: "Created a practical document-search workflow using retrieval-augmented generation.",
    stack: ["RAG", "LangChain", "FAISS", "Python", "OpenAI"],
    color: "#8b5cf6",
    icon: "🧠",
    badge: "Internship Project",
    github: "",
    demo: "",
    highlights: ["Semantic document retrieval", "Context-aware question answering", "RAG-based architecture"],
  },
  {
    id: 4,
    title: "AI Network Anomaly Detection",
    subtitle: "Machine Learning · Network Analysis",
    desc: "An ML-based system for identifying unusual network traffic patterns and potential anomalies.",
    problem: "Manual network monitoring can make it difficult to identify unusual traffic patterns quickly.",
    solution: "Built a machine-learning pipeline for feature processing, anomaly detection and result analysis.",
    tech: "Python, Scikit-learn, Pandas, Network Analysis",
    outcome: "Demonstrates applied machine learning and data-processing skills on a security-oriented problem.",
    stack: ["Python", "Scikit-learn", "Pandas", "ML"],
    color: "#22c55e",
    icon: "🔍",
    github: "",
    demo: "",
    highlights: ["Feature engineering", "Anomaly detection pipeline", "Network traffic analysis"],
  },
  {
    id: 5,
    title: "Blockchain Product Authentication",
    subtitle: "Solidity · Web3.py · QR Verification",
    desc: "A blockchain-based verification workflow for product registration, authentication and traceability.",
    problem: "Product authenticity and traceability can be difficult to verify in centralized workflows.",
    solution: "Created a blockchain verification flow with QR-based validation and immutable records.",
    tech: "Python, Solidity, Web3.py, QR Code, Blockchain",
    outcome: "Demonstrates experience integrating blockchain concepts with application-level verification.",
    stack: ["Python", "Solidity", "Web3.py", "QR Code"],
    color: "#f59e0b",
    icon: "⛓️",
    github: "",
    demo: "",
    highlights: ["QR-based validation", "Immutable records", "Application and blockchain integration"],
  },
  {
    id: 6,
    title: "Library Management System",
    subtitle: "PHP · MySQL · CRUD",
    desc: "A web application for managing books, users and issue/return workflows through a database-backed CRUD interface.",
    problem: "Manual book and circulation management is repetitive and error-prone.",
    solution: "Built a database-backed application for inventory, users and book circulation workflows.",
    tech: "PHP, MySQL, HTML, CSS, JavaScript",
    outcome: "Demonstrates fundamentals of CRUD development, database integration and web application structure.",
    stack: ["PHP", "MySQL", "JavaScript", "CRUD"],
    color: "#10b981",
    icon: "📚",
    github: "",
    demo: "",
    highlights: ["Full CRUD operations", "Book issue and return tracking", "MySQL database integration"],
  },
];

const SKILLS = {
  Backend: ["Java", "Spring Boot", "JDBC", "REST APIs", "Python", "FastAPI", "Flask"],
  Frontend: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  Databases: ["MySQL", "PostgreSQL", "MongoDB", "SQL"],
  AI: ["RAG", "LangChain", "LangGraph", "FAISS", "OpenAI API", "Semantic Search", "Prompt Engineering"],
  "Cloud & DevOps": ["AWS", "Docker", "Jenkins", "Git", "Postman"],
  "Core CS": ["OOP", "DSA", "DBMS", "Computer Networks", "Cloud Computing"],
};

const CERTS = [
  { name: "Machine Learning with Python", issuer: "Coursera", color: "#6366f1", icon: "🤖" },
  { name: "Introduction to AI", issuer: "IBM · Coursera", color: "#3b82f6", icon: "🧠" },
  { name: "Building RAG Agents with LLM", issuer: "NVIDIA", color: "#10b981", icon: "⚡" },
  { name: "Robotic Process Automation", issuer: "VTICKS", color: "#f59e0b", icon: "🔄" },
  { name: "Power BI & Data Visualization", issuer: "Skill Development Program", color: "#ef4444", icon: "📊" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function AnimSection({ children, className = "", delay = 0 }) {
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function TypeWriter({ texts }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    const speed = deleting ? 38 : 72;

    const timer = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1300);
        }
      } else if (text.length > 0) {
        setText(text.slice(0, -1));
      } else {
        setDeleting(false);
        setIndex((index + 1) % texts.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, index, texts]);

  return (
    <span>
      {text}
      <span style={{ animation: "blink 1s step-end infinite", borderRight: "2px solid #818cf8", marginLeft: 2 }}>
        &nbsp;
      </span>
    </span>
  );
}

function SkillPill({ name, color }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "9px 13px",
        borderRadius: 999,
        background: "rgba(15,23,42,0.7)",
        border: "1px solid rgba(148,163,184,0.1)",
        color: "#cbd5e1",
        fontSize: 13,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
      {name}
    </span>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSkillTab, setActiveSkillTab] = useState("Backend");
  const [activeProject, setActiveProject] = useState(null);
  const [contactState, setContactState] = useState({ name: "", email: "", message: "" });
  const [contactStatus, setContactStatus] = useState("idle");

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  const handleContact = async (event) => {
    event.preventDefault();
    setContactStatus("sending");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setContactStatus("not-configured");
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: contactState.name,
          from_email: contactState.email,
          message: contactState.message,
        },
        publicKey
      );

      setContactStatus("sent");
      setContactState({ name: "", email: "", message: "" });
      setTimeout(() => setContactStatus("idle"), 5000);
    } catch (error) {
      console.error(error);
      setContactStatus("error");
    }
  };

  const accentColors = ["#6366f1", "#06b6d4", "#22c55e", "#f59e0b", "#ec4899", "#8b5cf6"];

  return (
    <div className="portfolio-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{margin:0;background:#020617;color:#e2e8f0;-webkit-font-smoothing:antialiased}
        button,input,textarea{font-family:inherit}
        button{cursor:pointer}
        a{color:inherit}
        ::-webkit-scrollbar{width:6px}
        ::-webkit-scrollbar-track{background:#020617}
        ::-webkit-scrollbar-thumb{background:#334155;border-radius:99px}

        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
        @keyframes pulse{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}
        @keyframes portraitGlow{0%,100%{opacity:.35;transform:scale(.98)}50%{opacity:.6;transform:scale(1.02)}}

        .portfolio-root{font-family:'DM Sans','Segoe UI',sans-serif;background:#020617;color:#e2e8f0;min-height:100vh;line-height:1.7;overflow-x:hidden}
        .nav-link{cursor:pointer;padding:6px 11px;border-radius:20px;font-size:13px;transition:all .2s;color:#94a3b8;font-family:'Space Grotesk',sans-serif;white-space:nowrap}
        .nav-link:hover,.nav-link.active{background:#1e293b;color:#f8fafc}
        .glass{background:rgba(2,6,23,.82);backdrop-filter:blur(18px);border-bottom:1px solid rgba(148,163,184,.08)}
        .glass-card{background:rgba(15,23,42,.5);border:1px solid rgba(148,163,184,.08);border-radius:18px;backdrop-filter:blur(8px);transition:all .3s}
        .glass-card:hover{border-color:rgba(99,102,241,.28);transform:translateY(-4px)}
        .proj-card{transition:all .3s;cursor:pointer}
        .proj-card:hover{transform:translateY(-5px)}
        .btn-primary{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;border:none;padding:11px 24px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;font-family:'Space Grotesk',sans-serif;text-decoration:none;display:inline-flex;align-items:center;justify-content:center}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(99,102,241,.35)}
        .btn-outline{background:transparent;color:#94a3b8;border:1px solid rgba(148,163,184,.22);padding:10px 21px;border-radius:10px;font-size:14px;cursor:pointer;transition:all .2s;font-family:'Space Grotesk',sans-serif;text-decoration:none;display:inline-flex;align-items:center;justify-content:center}
        .btn-outline:hover{border-color:#6366f1;color:#c7d2fe;background:rgba(99,102,241,.06)}
        .tag{display:inline-block;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:500;background:rgba(99,102,241,.1);color:#a5b4fc;margin:2px}
        .section-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,4vw,42px);font-weight:700;color:#f1f5f9;letter-spacing:-.7px}
        .section-sub{font-size:15px;color:#64748b;margin-top:6px}
        .input-field{width:100%;background:rgba(15,23,42,.8);border:1px solid rgba(148,163,184,.12);border-radius:10px;padding:12px 16px;color:#e2e8f0;font-size:14px;outline:none;transition:border .2s;font-family:'DM Sans',sans-serif}
        .input-field:focus{border-color:#6366f1}
        .skill-tab{padding:8px 15px;border-radius:20px;font-size:13px;cursor:pointer;transition:all .2s;border:1px solid rgba(148,163,184,.1);font-family:'Space Grotesk',sans-serif;font-weight:500;background:rgba(15,23,42,.5)}
        .hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(99,102,241,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.045) 1px,transparent 1px);background-size:56px 56px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)}
        .glow-dot{position:absolute;border-radius:50%;filter:blur(75px);pointer-events:none}
        .status-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(34,197,94,.07);border:1px solid rgba(34,197,94,.18);border-radius:999px;padding:6px 12px;color:#86efac;font-size:12px;font-family:'Space Grotesk',sans-serif}
        .portrait-wrap{position:relative;width:min(390px,82vw);aspect-ratio:4/5;margin:auto}
        .portrait-wrap:before{content:"";position:absolute;inset:-24px;border-radius:34px;background:radial-gradient(circle,rgba(236,72,153,.2),transparent 65%);filter:blur(30px);animation:portraitGlow 4s ease-in-out infinite;z-index:0}
        .portrait-card{position:relative;width:100%;height:100%;overflow:hidden;border-radius:30px;border:1px solid rgba(255,255,255,.12);background:#111827;box-shadow:0 30px 80px rgba(0,0,0,.45),0 0 45px rgba(236,72,153,.08);z-index:1}
        .portrait-card img{width:100%;height:100%;object-fit:cover;display:block}
        .portrait-overlay{position:absolute;left:0;right:0;bottom:0;padding:28px 22px 20px;background:linear-gradient(180deg,transparent,rgba(2,6,23,.86));z-index:2}
        .hero-layout{display:grid;grid-template-columns:1.08fr .92fr;gap:64px;align-items:center;text-align:left}
        .hero-copy{max-width:690px}
        .hero-actions{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:28px}
        .stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
        .stat-card{background:rgba(15,23,42,.62);border:1px solid rgba(148,163,184,.09);border-radius:13px;padding:11px 8px;text-align:center}
        .about-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:55px;align-items:center}
        .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .featured-card{position:relative;overflow:hidden;border-color:rgba(99,102,241,.24);box-shadow:0 24px 70px rgba(2,6,23,.35)}
        .featured-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:24px;align-items:start}
        .project-links{display:flex;gap:7px;flex-direction:column;flex-shrink:0}
        .project-link{background:rgba(148,163,184,.07);border:1px solid rgba(148,163,184,.11);border-radius:7px;padding:5px 9px;font-size:11px;color:#94a3b8;text-decoration:none;text-align:center;transition:all .2s}
        .project-link:hover{color:#c7d2fe;border-color:rgba(99,102,241,.3)}
        .status-message{margin-top:12px;padding:11px 13px;border-radius:10px;font-size:13px}

        @media(max-width:900px){
          .hero-layout,.about-grid,.featured-grid{grid-template-columns:1fr}
          .hero-copy{text-align:center;max-width:760px;margin:auto}
          .hero-actions{justify-content:center}
          .stat-grid{max-width:680px;margin:auto}
          .portrait-wrap{max-width:340px}
          nav{padding:11px 12px!important}
          .nav-links{display:none!important}
          .mobile-menu-button{display:inline-flex!important}
        }
        @media(min-width:901px){.mobile-menu-button{display:none!important}.mobile-menu{display:none!important}}
        @media(max-width:640px){
          #home{padding-top:115px!important;padding-bottom:55px!important}
          #home h1{font-size:clamp(34px,11vw,56px)!important;line-height:1.02!important}
          .hero-layout{gap:42px}
          .portrait-wrap{width:min(310px,82vw)}
          .stat-grid{grid-template-columns:1fr 1fr}
          .info-grid{grid-template-columns:1fr 1fr}
          .project-links{flex-direction:row}
          .contact-grid{grid-template-columns:1fr!important}
          .mobile-menu{position:absolute;top:62px;left:12px;right:12px;padding:12px;border-radius:14px;display:flex;flex-wrap:wrap;gap:5px;background:rgba(2,6,23,.96);border:1px solid rgba(148,163,184,.1);backdrop-filter:blur(18px)}
        }
      `}</style>

      {/* NAVIGATION */}
      <nav
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, padding: "13px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}
        className="glass"
      >
        <button onClick={() => scrollTo("Home")} style={{ border: 0, background: "transparent", padding: 0, color: "inherit" }} aria-label="Go to home">
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, background: "linear-gradient(135deg,#818cf8,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            &lt;SHIVANG/&gt;
          </span>
        </button>

        <div className="nav-links" style={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
          {NAV_LINKS.map((link) => (
            <span key={link} className={`nav-link${activeNav === link ? " active" : ""}`} onClick={() => scrollTo(link)}>
              {link}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a className="btn-primary" href="/Shivang-Sinha-Resume.pdf" target="_blank" rel="noreferrer" style={{ padding: "8px 15px", fontSize: 12 }}>
            Resume ↗
          </a>
          <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" style={{ display: "none", border: "1px solid rgba(148,163,184,.14)", background: "rgba(15,23,42,.7)", color: "#cbd5e1", borderRadius: 9, padding: "7px 10px", fontSize: 18 }}>
            {menuOpen ? "×" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {NAV_LINKS.map((link) => (
              <span key={link} className={`nav-link${activeNav === link ? " active" : ""}`} onClick={() => scrollTo(link)}>
                {link}
              </span>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "105px 24px 55px" }}>
        <div className="hero-grid" />
        <div className="glow-dot" style={{ width: 520, height: 520, background: "rgba(99,102,241,.09)", top: -180, left: -150 }} />
        <div className="glow-dot" style={{ width: 380, height: 380, background: "rgba(236,72,153,.06)", bottom: -120, right: -100 }} />

        <div style={{ maxWidth: 1120, width: "100%", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div className="hero-layout">
            <div className="hero-copy">
              <div style={{ display: "flex", gap: 9, alignItems: "center", flexWrap: "wrap", marginBottom: 20 }}>
                <span className="status-badge"><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", animation: "pulse 2s ease-in-out infinite" }} /> Open to Software Roles</span>
                <span style={{ color: "#64748b", fontSize: 12 }}>Bengaluru, India</span>
              </div>

              <p style={{ fontSize: 12, color: "#818cf8", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, letterSpacing: 2.2, marginBottom: 12, textTransform: "uppercase" }}>
                Computer Science Graduate
              </p>

              <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(42px,6.8vw,76px)", lineHeight: 1.02, letterSpacing: "-2.8px", marginBottom: 16, color: "#f8fafc" }}>
                SHIVANG SINHA
              </h1>

              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: "clamp(20px,3vw,30px)", color: "#cbd5e1", marginBottom: 18, minHeight: 43 }}>
                Java Backend &amp; Full-Stack Developer
              </h2>

              <p style={{ maxWidth: 680, margin: "0 0 28px", fontSize: 15, color: "#94a3b8", lineHeight: 1.85 }}>
                Computer Science graduate building backend systems, REST APIs and AI-powered applications with Java, Spring Boot, React, Python and SQL.
              </p>

              <div className="hero-actions">
                <button className="btn-primary" onClick={() => scrollTo("Projects")}>View Projects →</button>
                <a className="btn-outline" href="/Shivang-Sinha-Resume.pdf" download="Shivang-Sinha-Resume.pdf">Download Resume ↓</a>
                <a className="btn-outline" href="https://github.com/ShivangSinha19" target="_blank" rel="noreferrer">GitHub ↗</a>
                <a className="btn-outline" href="https://linkedin.com/in/shivang-sinha-cse" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              </div>

              <div className="stat-grid">
                {[
                  ["6+", "Projects", "📂"],
                  ["1", "Internship", "💼"],
                  ["5", "Certifications", "🏆"],
                  ["2026", "Graduate", "🎓"],
                ].map(([value, label, icon]) => (
                  <div key={label} className="stat-card">
                    <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", color: "#f1f5f9" }}>{icon} {value}</div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="portrait-wrap">
              <div className="portrait-card">
                <img src="/images/profile.png" alt="Illustrated portrait of Shivang Sinha" />
                <div className="portrait-overlay">
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: "#f8fafc", fontSize: 18 }}>Building useful software.</div>
                  <div style={{ color: "#cbd5e1", fontSize: 12, marginTop: 2 }}>Java · Backend · Full Stack · AI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 24px", maxWidth: 1120, margin: "0 auto" }}>
        <AnimSection>
          <div className="about-grid">
            <div>
              <p style={{ fontSize: 12, color: "#818cf8", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>About Me</p>
              <h2 className="section-title" style={{ marginBottom: 18 }}>Building backend systems & AI applications</h2>
              <p style={{ color: "#94a3b8", marginBottom: 14, lineHeight: 1.85, fontSize: 15 }}>
                I’m Shivang Sinha, a Computer Science graduate focused on backend and full-stack development. I enjoy turning practical problems into working applications with Java, Spring Boot, REST APIs, SQL and React.
              </p>
              <p style={{ color: "#94a3b8", marginBottom: 20, lineHeight: 1.85, fontSize: 15 }}>
                Alongside backend engineering, I build AI applications using RAG, LangChain, LangGraph, FAISS and OpenAI APIs. My projects cover banking workflows, document analysis, multi-agent research, machine learning and blockchain verification.
              </p>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                {["Java Backend", "Full Stack", "AI Applications", "REST APIs", "SQL"].map((tag) => <span key={tag} className="tag">{tag}</span>)}
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
                <span className="status-badge" style={{ color: "#67e8f9", background: "rgba(6,182,212,.06)", borderColor: "rgba(6,182,212,.15)" }}>📖 Currently: DSA & Java</span>
                <span className="status-badge" style={{ color: "#c4b5fd", background: "rgba(139,92,246,.06)", borderColor: "rgba(139,92,246,.15)" }}>🛠 Spring Boot & System Design</span>
              </div>
            </div>

            <div className="info-grid">
              {[
                { icon: "🎓", title: "B.E. Computer Science", sub: "2022–2026 · VTU" },
                { icon: "💼", title: "AI & Cloud Intern", sub: "SuprMentr · Bengaluru" },
                { icon: "⚙️", title: "Backend Focus", sub: "Java · Spring Boot · SQL" },
                { icon: "🧠", title: "AI Applications", sub: "RAG · Agents · LLM APIs" },
              ].map((card) => (
                <div key={card.title} className="glass-card" style={{ padding: "22px 17px" }}>
                  <div style={{ fontSize: 25, marginBottom: 8 }}>{card.icon}</div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, color: "#f1f5f9", marginBottom: 4, fontSize: 14 }}>{card.title}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{card.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimSection>
      </section>

      {/* FEATURED PROJECT */}
      <section id="featured" style={{ padding: "100px 24px", background: "rgba(15,23,42,.38)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimSection>
            <p style={{ fontSize: 12, color: "#818cf8", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, letterSpacing: 2, marginBottom: 10, textTransform: "uppercase", textAlign: "center" }}>Featured Backend Project</p>
            <h2 className="section-title" style={{ textAlign: "center", marginBottom: 6 }}>Internet Banking System</h2>
            <p className="section-sub" style={{ textAlign: "center", marginBottom: 34 }}>A Java backend project designed around real banking workflows.</p>
          </AnimSection>

          <AnimSection delay={80}>
            <div className="glass-card featured-card" style={{ padding: 32 }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg,#6366f1,#06b6d4,transparent)" }} />
              <div className="featured-grid">
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 13 }}>
                    <div style={{ fontSize: 38 }}>🏦</div>
                    <div>
                      <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 24, color: "#f1f5f9" }}>Java Internet Banking System</h3>
                      <p style={{ fontSize: 13, color: "#a5b4fc", fontWeight: 600 }}>Java · Spring Boot · JDBC · MySQL</p>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.85, marginBottom: 18 }}>
                    A modular banking application covering authentication, account creation, deposits, withdrawals, fund transfers, beneficiaries and transaction history.
                  </p>
                  <div style={{ display: "grid", gap: 9 }}>
                    {["User authentication and account management", "Deposit, withdrawal and fund transfer workflows", "JDBC/MySQL persistence and transaction history", "Exception handling and modular service structure"].map((item) => (
                      <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <span style={{ color: "#818cf8", marginTop: 3 }}>✓</span>
                        <span style={{ fontSize: 13, color: "#cbd5e1" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="glass-card" style={{ padding: 20, marginBottom: 14 }}>
                    <p style={{ fontSize: 11, color: "#64748b", marginBottom: 10, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Architecture</p>
                    <div style={{ display: "grid", gap: 7, textAlign: "center" }}>
                      {["Client / Frontend", "REST API", "Spring Boot Services", "JDBC / Data Access", "MySQL"].map((layer, index) => (
                        <React.Fragment key={layer}>
                          <div style={{ padding: "8px 10px", borderRadius: 8, background: "rgba(99,102,241,.08)", border: "1px solid rgba(99,102,241,.12)", color: "#cbd5e1", fontSize: 12 }}>{layer}</div>
                          {index < 4 && <span style={{ color: "#475569", fontSize: 11 }}>↓</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
                    {["Java", "Spring Boot", "JDBC", "MySQL", "Maven", "REST APIs"].map((tag) => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                  <a className="btn-primary" href="https://github.com/ShivangSinha19/Internet-Banking-System" target="_blank" rel="noreferrer">View on GitHub ↗</a>
                </div>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <AnimSection>
            <p style={{ fontSize: 12, color: "#818cf8", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, letterSpacing: 2, marginBottom: 10, textTransform: "uppercase", textAlign: "center" }}>Selected Work</p>
            <h2 className="section-title" style={{ textAlign: "center", marginBottom: 6 }}>Projects</h2>
            <p className="section-sub" style={{ textAlign: "center", marginBottom: 44 }}>Backend systems, AI applications and practical software projects.</p>
          </AnimSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
            {PROJECTS.map((project, index) => {
              const expanded = activeProject === project.id;
              return (
                <AnimSection key={project.id} delay={index * 70}>
                  <div className="glass-card proj-card" style={{ padding: 25, position: "relative", overflow: "hidden" }} onClick={() => setActiveProject(expanded ? null : project.id)}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${project.color},transparent)` }} />
                    {project.badge && (
                      <div style={{ position: "absolute", top: 14, right: 14, background: `${project.color}18`, border: `1px solid ${project.color}35`, borderRadius: 99, padding: "3px 9px", fontSize: 10, color: project.color, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700 }}>
                        {project.badge}
                      </div>
                    )}

                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 13 }}>
                      <div>
                        <div style={{ fontSize: 30, marginBottom: 6 }}>{project.icon}</div>
                        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: "#f1f5f9", paddingRight: project.badge ? 70 : 0 }}>{project.title}</h3>
                        <p style={{ fontSize: 12, color: project.color, fontWeight: 600 }}>{project.subtitle}</p>
                      </div>
                      <div className="project-links">
                        {project.github && (
                          <a className="project-link" href={project.github} onClick={(event) => event.stopPropagation()} target="_blank" rel="noreferrer">GitHub ↗</a>
                        )}
                        {project.demo && (
                          <a className="project-link" href={project.demo} onClick={(event) => event.stopPropagation()} target="_blank" rel="noreferrer">Live Demo ↗</a>
                        )}
                      </div>
                    </div>

                    <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.75, marginBottom: 13 }}>{project.desc}</p>

                    <div style={{ marginBottom: 11, display: "flex", flexWrap: "wrap", gap: 3 }}>
                      {project.stack.map((tech) => <span key={tech} className="tag">{tech}</span>)}
                    </div>

                    {expanded && (
                      <div style={{ borderTop: "1px solid rgba(148,163,184,.08)", paddingTop: 14, marginTop: 5 }}>
                        <p style={{ fontSize: 11, color: "#64748b", marginBottom: 9, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Project Breakdown</p>
                        <div style={{ display: "grid", gap: 8 }}>
                          <div style={{ fontSize: 12.5, color: "#cbd5e1" }}><strong style={{ color: "#f1f5f9" }}>Problem:</strong> {project.problem}</div>
                          <div style={{ fontSize: 12.5, color: "#cbd5e1" }}><strong style={{ color: "#f1f5f9" }}>Solution:</strong> {project.solution}</div>
                          <div style={{ fontSize: 12.5, color: "#cbd5e1" }}><strong style={{ color: "#f1f5f9" }}>Tech:</strong> {project.tech}</div>
                          <div style={{ fontSize: 12.5, color: "#cbd5e1" }}><strong style={{ color: "#f1f5f9" }}>Outcome:</strong> {project.outcome}</div>
                        </div>
                        <div style={{ marginTop: 13 }}>
                          <p style={{ fontSize: 11, color: "#64748b", marginBottom: 7 }}>HIGHLIGHTS</p>
                          {project.highlights.map((item) => <div key={item} style={{ fontSize: 12.5, color: "#cbd5e1", marginBottom: 4 }}>✓ {item}</div>)}
                        </div>
                      </div>
                    )}

                    <div style={{ fontSize: 11, color: "#475569", marginTop: 8, textAlign: "right" }}>{expanded ? "▲ Collapse" : "▼ View details"}</div>
                  </div>
                </AnimSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "100px 24px", background: "rgba(15,23,42,.38)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <AnimSection>
            <p style={{ fontSize: 12, color: "#818cf8", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, letterSpacing: 2, marginBottom: 10, textTransform: "uppercase", textAlign: "center" }}>Technical Stack</p>
            <h2 className="section-title" style={{ textAlign: "center", marginBottom: 6 }}>Skills & Technologies</h2>
            <p className="section-sub" style={{ textAlign: "center", marginBottom: 35 }}>Grouped by the areas I use to build software.</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 30 }}>
              {Object.keys(SKILLS).map((category, index) => (
                <button key={category} className="skill-tab" onClick={() => setActiveSkillTab(category)} style={{ background: activeSkillTab === category ? `${accentColors[index]}18` : "rgba(15,23,42,.5)", color: activeSkillTab === category ? accentColors[index] : "#64748b", borderColor: activeSkillTab === category ? `${accentColors[index]}40` : "rgba(148,163,184,.1)" }}>
                  {category}
                </button>
              ))}
            </div>

            <div className="glass-card" style={{ padding: 28, maxWidth: 760, margin: "0 auto" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {SKILLS[activeSkillTab].map((skill) => <SkillPill key={skill} name={skill} color={accentColors[Object.keys(SKILLS).indexOf(activeSkillTab) % accentColors.length]} />)}
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <AnimSection>
            <p style={{ fontSize: 12, color: "#818cf8", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, letterSpacing: 2, marginBottom: 10, textTransform: "uppercase", textAlign: "center" }}>Experience</p>
            <h2 className="section-title" style={{ textAlign: "center", marginBottom: 42 }}>Internship</h2>
          </AnimSection>

          <AnimSection delay={100}>
            <div className="glass-card" style={{ padding: 32, borderLeft: "3px solid #6366f1" }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 17 }}>
                <div>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 21, color: "#f1f5f9", marginBottom: 4 }}>AI & Cloud Computing Intern</h3>
                  <p style={{ color: "#818cf8", fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif", fontSize: 14 }}>SuprMentr · Bengaluru, India</p>
                </div>
                <span style={{ background: "rgba(99,102,241,.12)", color: "#a5b4fc", padding: "6px 14px", borderRadius: 20, fontSize: 12, height: "fit-content", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600 }}>2026</span>
              </div>

              <p style={{ color: "#94a3b8", lineHeight: 1.85, marginBottom: 18, fontSize: 14 }}>
                Worked on AI-oriented application workflows and cloud-related development concepts, with exposure to document processing, semantic retrieval, frontend integration and deployment workflows.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 10, marginBottom: 18 }}>
                {[
                  "Worked on AI-driven application workflows",
                  "Contributed to document and retrieval workflows",
                  "Worked with frontend/backend integration concepts",
                  "Gained exposure to cloud deployment workflows",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ color: "#818cf8", marginTop: 3, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13, color: "#cbd5e1" }}>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {["Python", "AI/ML", "RAG", "Vector Search", "React", "Cloud"].map((tag) => <span key={tag} className="tag">{tag}</span>)}
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ padding: "100px 24px", background: "rgba(15,23,42,.38)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <AnimSection>
            <p style={{ fontSize: 12, color: "#818cf8", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, letterSpacing: 2, marginBottom: 10, textTransform: "uppercase", textAlign: "center" }}>Education</p>
            <h2 className="section-title" style={{ textAlign: "center", marginBottom: 36 }}>Academic Background</h2>

            <div className="glass-card" style={{ padding: 30, display: "flex", gap: 18, alignItems: "flex-start" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 25, flexShrink: 0 }}>🎓</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 20, color: "#f1f5f9", marginBottom: 5 }}>B.E. Computer Science & Engineering</h3>
                <p style={{ color: "#818cf8", fontWeight: 600, fontSize: 14, marginBottom: 7 }}>Sambhram Institute of Technology · VTU</p>
                <p style={{ color: "#64748b", fontSize: 13 }}>2022–2026 · Bengaluru, India</p>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimSection>
            <p style={{ fontSize: 12, color: "#818cf8", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, letterSpacing: 2, marginBottom: 10, textTransform: "uppercase", textAlign: "center" }}>Achievements</p>
            <h2 className="section-title" style={{ textAlign: "center", marginBottom: 6 }}>Certifications</h2>
            <p className="section-sub" style={{ textAlign: "center", marginBottom: 42 }}>Courses and credentials supporting my technical work.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 14 }}>
              {CERTS.map((cert, index) => (
                <AnimSection key={cert.name} delay={index * 60}>
                  <div className="glass-card" style={{ padding: 20, display: "flex", gap: 14, alignItems: "center" }}>
                    <div style={{ width: 46, height: 46, borderRadius: 12, background: `${cert.color}18`, border: `1px solid ${cert.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21, flexShrink: 0 }}>{cert.icon}</div>
                    <div>
                      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, color: "#f1f5f9", fontSize: 14, marginBottom: 3 }}>{cert.name}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{cert.issuer}</div>
                    </div>
                  </div>
                </AnimSection>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 24px", background: "rgba(15,23,42,.38)" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <AnimSection>
            <p style={{ fontSize: 12, color: "#818cf8", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, letterSpacing: 2, marginBottom: 10, textTransform: "uppercase", textAlign: "center" }}>Contact</p>
            <h2 className="section-title" style={{ textAlign: "center", marginBottom: 6 }}>Let's Connect</h2>
            <p className="section-sub" style={{ textAlign: "center", marginBottom: 36 }}>Open to software development roles, internships and collaborations.</p>

            <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "0.75fr 1.25fr", gap: 18, alignItems: "start" }}>
              <div className="glass-card" style={{ padding: 26 }}>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, color: "#f1f5f9", marginBottom: 8 }}>Let's build something useful.</h3>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.8, marginBottom: 20 }}>For opportunities, project discussions or collaboration, you can reach me directly.</p>
                <div style={{ display: "grid", gap: 9 }}>
                  {[
                    { label: "Email", value: "shivangshinha.8@gmail.com", href: "mailto:shivangshinha.8@gmail.com", icon: "📧" },
                    { label: "GitHub", value: "ShivangSinha19", href: "https://github.com/ShivangSinha19", icon: "💻" },
                    { label: "LinkedIn", value: "shivang-sinha-cse", href: "https://linkedin.com/in/shivang-sinha-cse", icon: "🔗" },
                  ].map((item) => (
                    <a key={item.label} href={item.href} target={item.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" style={{ display: "flex", gap: 10, alignItems: "center", padding: "10px 12px", borderRadius: 10, background: "rgba(15,23,42,.7)", border: "1px solid rgba(148,163,184,.08)", textDecoration: "none" }}>
                      <span>{item.icon}</span>
                      <span><span style={{ display: "block", color: "#64748b", fontSize: 10 }}>{item.label}</span><span style={{ color: "#cbd5e1", fontSize: 12 }}>{item.value}</span></span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="glass-card" style={{ padding: 30 }}>
                {contactStatus === "sent" ? (
                  <div style={{ textAlign: "center", padding: "35px 0" }}>
                    <div style={{ fontSize: 42, marginBottom: 10 }}>✅</div>
                    <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: "#86efac", fontSize: 18 }}>Message sent successfully.</p>
                    <p style={{ color: "#64748b", fontSize: 13, marginTop: 5 }}>Thanks for reaching out. I'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContact}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                      <div>
                        <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 5 }}>Name</label>
                        <input className="input-field" placeholder="Your name" required value={contactState.name} onChange={(event) => setContactState({ ...contactState, name: event.target.value })} />
                      </div>
                      <div>
                        <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 5 }}>Email</label>
                        <input className="input-field" type="email" placeholder="you@email.com" required value={contactState.email} onChange={(event) => setContactState({ ...contactState, email: event.target.value })} />
                      </div>
                    </div>
                    <div style={{ marginBottom: 15 }}>
                      <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 5 }}>Message</label>
                      <textarea className="input-field" rows={5} placeholder="Tell me about the opportunity or project..." required value={contactState.message} onChange={(event) => setContactState({ ...contactState, message: event.target.value })} style={{ resize: "vertical" }} />
                    </div>

                    <button type="submit" className="btn-primary" disabled={contactStatus === "sending"} style={{ width: "100%", padding: "13px", opacity: contactStatus === "sending" ? 0.65 : 1 }}>
                      {contactStatus === "sending" ? "Sending..." : "Send Message →"}
                    </button>

                    {contactStatus === "not-configured" && (
                      <div className="status-message" style={{ background: "rgba(245,158,11,.07)", border: "1px solid rgba(245,158,11,.15)", color: "#fbbf24" }}>
                        The contact form is not configured yet. Please email me directly at <a href="mailto:shivangshinha.8@gmail.com" style={{ color: "#fde68a" }}>shivangshinha.8@gmail.com</a>.
                      </div>
                    )}
                    {contactStatus === "error" && (
                      <div className="status-message" style={{ background: "rgba(239,68,68,.07)", border: "1px solid rgba(239,68,68,.15)", color: "#fca5a5" }}>
                        The message could not be sent. Please email me directly instead.
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "26px 20px", borderTop: "1px solid rgba(148,163,184,.06)", color: "#475569", fontSize: 12 }}>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif" }}>SHIVANG SINHA · B.E. Computer Science · Sambhram Institute of Technology (VTU) · 2026</span>
      </footer>
    </div>
  );
}
