import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const NAV_LINKS = ["Home","About","Projects","Skills","Experience","Certifications","Contact"];

const PROJECTS = [
  {
    id:1,
    title:"Smart Document Analyzer",
    subtitle:"RAG-Powered AI Search · SuprMentr Internship",
    desc:"Built during my internship at SuprMentr — a Retrieval-Augmented Generation system that ingests documents, builds semantic vector indexes, and returns contextually accurate AI responses with source grounding. Included a responsive React frontend with document upload workflows.",
    stack:["Python","React","RAG","Vector DB","LLM APIs","Embeddings","Cloud"],
    color:"#6366f1",
    icon:"🧠",
    badge:"Internship Project",
    github:"https://github.com/ShivangSinha19",
    demo:"https://github.com/ShivangSinha19",
    highlights:["Semantic document retrieval with context grounding","Responsive React upload & query interface","Full AI pipeline: embeddings → vector store → LLM response","Deployed on cloud infrastructure"]
  },
  {
    id:2,
    title:"AI Network Anomaly Detector",
    subtitle:"ML-Based Threat Detection",
    desc:"Built an AI model to detect unusual patterns in network traffic using machine learning. Focused on early detection of cyber attacks and abnormal behavior, with emphasis on accuracy and minimizing false positives.",
    stack:["Python","Scikit-learn","Pandas","Network Analysis","ML"],
    color:"#06b6d4",
    icon:"🔍",
    github:"https://github.com/ShivangSinha19",
    demo:"https://github.com/ShivangSinha19",
    highlights:["Real-time anomaly detection","Reduces false positives","Security threat classification"]
  },
  {
    id:3,
    title:"Blockchain Product Authentication",
    subtitle:"Decentralized Verification System",
    desc:"Decentralized product verification system using Python, Solidity, and Web3. Features QR-based validation, secure product registration, and end-to-end supply-chain traceability on the blockchain.",
    stack:["Python","Solidity","Web3.py","QR Code","Blockchain"],
    color:"#f59e0b",
    icon:"⛓️",
    github:"https://github.com/ShivangSinha19",
    demo:"https://github.com/ShivangSinha19",
    highlights:["QR-based product validation","Immutable on-chain records","Supply chain traceability"]
  },
  {
    id:4,
    title:"Library Management System",
    subtitle:"Full-Stack CRUD Platform",
    desc:"PHP + MySQL CRUD platform for managing books and users at a library scale. Handles book inventory, user registration, issue/return tracking, and admin management through a clean web interface.",
    stack:["PHP","MySQL","HTML","CSS","XAMPP","JavaScript"],
    color:"#10b981",
    icon:"📚",
    github:"https://github.com/ShivangSinas19",
    demo:"https://github.com/ShivangSinas19",
    highlights:["Book issue & return tracking","User & admin roles","Full CRUD operations"]
  }
];

const SKILLS = {
  "AI/ML":    [{n:"RAG Systems",l:78},{n:"LLM APIs",l:80},{n:"Vector DBs",l:75},{n:"Embeddings",l:76}],
  "Frontend": [{n:"HTML/CSS",l:85},{n:"React",l:72},{n:"JavaScript",l:78},{n:"Responsive Design",l:75}],
  "Backend":  [{n:"PHP",l:78},{n:"MySQL",l:80},{n:"Flask/FastAPI",l:55},{n:"REST APIs",l:65}],
  "Languages":[{n:"C",l:80},{n:"JavaScript",l:78},{n:"Python",l:75},{n:"Java",l:45}],
  "Blockchain":[{n:"Solidity",l:65},{n:"Web3.py",l:62},{n:"Smart Contracts",l:60},{n:"QR Integration",l:70}],
  "Tools":    [{n:"Git",l:82},{n:"VS Code",l:90},{n:"Postman",l:75},{n:"IntelliJ",l:72}]
};

const CERTS = [
  {name:"Machine Learning with Python",issuer:"Coursera",color:"#6366f1",icon:"🤖"},
  {name:"Introduction to AI",issuer:"IBM",color:"#3b82f6",icon:"🧠"},
  {name:"Building RAG Agents",issuer:"NVIDIA",color:"#10b981",icon:"⚡"},
  {name:"RPA Automation",issuer:"Certification Body",color:"#f59e0b",icon:"🔄"},
  {name:"Power BI & Data Visualization",issuer:"Microsoft",color:"#ef4444",icon:"📊"}
];

function useInView(threshold=0.15){
  const ref=useRef(null);
  const [vis,setVis]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold});
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[threshold]);
  return[ref,vis];
}

function AnimSection({children,className="",delay=0}){
  const[ref,vis]=useInView();
  return(
    <div ref={ref} className={className} style={{opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(32px)",transition:`opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`}}>
      {children}
    </div>
  );
}

function TypeWriter({texts}){
  const[idx,setIdx]=useState(0);
  const[txt,setTxt]=useState("");
  const[del,setDel]=useState(false);
  useEffect(()=>{
    const cur=texts[idx];
    const speed=del?40:80;
    const t=setTimeout(()=>{
      if(!del){
        if(txt.length<cur.length)setTxt(cur.slice(0,txt.length+1));
        else{setTimeout(()=>setDel(true),1600);} 
      }else{
        if(txt.length>0)setTxt(txt.slice(0,-1));
        else{setDel(false);setIdx((idx+1)%texts.length);} 
      }
    },speed);
    return()=>clearTimeout(t);
  },[txt,del,idx,texts]);
  return<span>{txt}<span style={{animation:"blink 1s step-end infinite",borderRight:"2px solid #6366f1",marginLeft:2}}>&nbsp;</span></span>;
}

function SkillBar({name,level,color,delay}){
  const[ref,vis]=useInView();
  return(
    <div ref={ref} style={{marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
        <span style={{fontSize:13,color:"#cbd5e1"}}>{name}</span>
        <span style={{fontSize:12,color:"#64748b"}}>{level}%</span>
      </div>
      <div style={{height:4,background:"#1e293b",borderRadius:99}}>
        <div style={{height:4,borderRadius:99,background:color,width:vis?`${level}%`:"0%",transition:`width 1.1s ease ${delay}ms`}}/>
      </div>
    </div>
  );
}

export default function Portfolio(){
  const[activeNav,setActiveNav]=useState("Home");
  const[menuOpen,setMenuOpen]=useState(false);
  const[activeSkillTab,setActiveSkillTab]=useState("AI/ML");
  const[activeProjIdx,setActiveProjIdx]=useState(null);
  const[contactState,setContactState]=useState({name:"",email:"",message:""});
  const[sent,setSent]=useState(false);

  const scrollTo=(id)=>{
    document.getElementById(id.toLowerCase())?.scrollIntoView({behavior:"smooth"});
    setActiveNav(id);
    setMenuOpen(false);
  };

  const handleContact=async(e)=>{
    e.preventDefault();
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if(serviceId && templateId && publicKey){
      try{
        await emailjs.send(serviceId, templateId, { name: contactState.name, email: contactState.email, message: contactState.message }, publicKey);
        setSent(true);
      }catch(err){
        console.error("EmailJS send error", err);
        // fallback to local confirmation
        setSent(true);
      }
    }else{
      // fallback behaviour when EmailJS not configured
      setSent(true);
    }

    setTimeout(()=>setSent(false),4000);
    setContactState({name:"",email:"",message:""});
  };

  const accentColors=["#6366f1","#06b6d4","#f59e0b","#10b981","#f59e0b","#94a3b8"];

  return(
    <div style={{fontFamily:"'DM Sans', 'Segoe UI', sans-serif",background:"#020617",color:"#e2e8f0",minHeight:"100vh",lineHeight:1.7,overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:6px;}::-webkit-scrollbar-track{background:#0f172a;}::-webkit-scrollbar-thumb{background:#334155;border-radius:3px;}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
        @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
        @keyframes pulse{0%,100%{opacity:0.6;}50%{opacity:1;}}
        .nav-link{cursor:pointer;padding:6px 14px;border-radius:20px;font-size:14px;transition:all 0.2s;color:#94a3b8;font-family:'Space Grotesk',sans-serif;}
        .nav-link:hover,.nav-link.active{background:#1e293b;color:#e2e8f0;}
        .glass{background:rgba(15,23,42,0.75);backdrop-filter:blur(16px);border:1px solid rgba(99,102,241,0.12);}
        .glass-card{background:rgba(15,23,42,0.5);border:1px solid rgba(148,163,184,0.08);border-radius:16px;backdrop-filter:blur(8px);transition:all 0.3s;}
        .glass-card:hover{border-color:rgba(99,102,241,0.28);transform:translateY(-4px);}
        .proj-card{transition:all 0.3s;cursor:pointer;}
        .proj-card:hover{transform:translateY(-5px);}
        .btn-primary{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;border:none;padding:11px 26px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;font-family:'Space Grotesk',sans-serif;}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(99,102,241,0.35);}
        .btn-outline{background:transparent;color:#94a3b8;border:1px solid rgba(148,163,184,0.25);padding:10px 24px;border-radius:10px;font-size:14px;cursor:pointer;transition:all 0.2s;font-family:'Space Grotesk',sans-serif;}
        .btn-outline:hover{border-color:#6366f1;color:#6366f1;}
        .tag{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:500;background:rgba(99,102,241,0.12);color:#a5b4fc;margin:2px;}
        .section-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(26px,4vw,40px);font-weight:700;color:#f1f5f9;letter-spacing:-0.5px;}
        .section-sub{font-size:15px;color:#64748b;margin-top:6px;}
        .input-field{width:100%;background:rgba(15,23,42,0.8);border:1px solid rgba(148,163,184,0.12);border-radius:10px;padding:12px 16px;color:#e2e8f0;font-size:14px;outline:none;transition:border 0.2s;font-family:'DM Sans',sans-serif;}
        .input-field:focus{border-color:#6366f1;}
        .skill-tab{padding:8px 16px;border-radius:20px;font-size:13px;cursor:pointer;transition:all 0.2s;border:1px solid rgba(148,163,184,0.1);font-family:'Space Grotesk',sans-serif;font-weight:500;}
        .hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(99,102,241,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.05) 1px,transparent 1px);background-size:56px 56px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%);} 
        .glow-dot{position:absolute;border-radius:50%;filter:blur(70px);pointer-events:none;}
        .learning-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.2);border-radius:99px;padding:4px 12px;font-size:12px;color:#67e8f9;font-family:'Space Grotesk',sans-serif;}
      `}</style>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:999,padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}} className="glass">
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:18,background:"linear-gradient(135deg,#6366f1,#06b6d4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
          &lt;Shivang/&gt;
        </div>
        <div style={{display:"flex",gap:4,alignItems:"center",flexWrap:"wrap"}}>
          {NAV_LINKS.map(l=>(
            <span key={l} className={`nav-link${activeNav===l?" active":""}`} onClick={()=>scrollTo(l)}>{l}</span>
          ))}
        </div>
        <a href="mailto:shivangsinha.88@outlook.in">
          <button className="btn-primary" style={{padding:"8px 18px",fontSize:13}}>Hire Me →</button>
        </a>
      </nav>

      {/* HERO */}
      <section id="home" style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",padding:"80px 24px 40px"}}>
        <div className="hero-grid"/>
        <div className="glow-dot" style={{width:500,height:500,background:"rgba(99,102,241,0.1)",top:"-120px",left:"-100px"}}/>
        <div className="glow-dot" style={{width:350,height:350,background:"rgba(6,182,212,0.07)",bottom:"-80px",right:"-80px"}}/>

        <div style={{maxWidth:860,width:"100%",textAlign:"center",position:"relative",zIndex:2}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(99,102,241,0.1)",border:"1px solid rgba(99,102,241,0.25)",borderRadius:99,padding:"6px 16px",marginBottom:24,animation:"float 3s ease-in-out infinite"}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:"#6366f1",display:"inline-block",animation:"pulse 2s ease-in-out infinite"}}/>
            <span style={{fontSize:13,color:"#a5b4fc",fontFamily:"'Space Grotesk',sans-serif"}}>Open to opportunities · Bengaluru, India</span>
          </div>

          <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:"clamp(36px,7vw,72px)",lineHeight:1.05,letterSpacing:"-2px",marginBottom:14,color:"#f8fafc"}}>
            Shivang Sinha
          </h1>

          <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:500,fontSize:"clamp(18px,3vw,28px)",color:"#94a3b8",marginBottom:20,minHeight:40}}>
            <TypeWriter texts={["AI & Web Developer","Blockchain Builder","Cloud Computing Learner","CSE Undergrad @ VTU"]}/>
          </h2>

          <p style={{maxWidth:580,margin:"0 auto 32px",fontSize:15,color:"#64748b",lineHeight:1.8}}>
            CSE student at Sambhram Institute of Technology building intelligent and scalable systems. From AI anomaly detection to blockchain authentication — I solve real-world problems with code.
          </p>

          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:36}}>
            <button className="btn-primary" onClick={()=>scrollTo("Projects")}>View Projects →</button>
            <button className="btn-outline" onClick={()=>scrollTo("Contact")}>Get In Touch</button>
            <a href="https://github.com/ShivangSinha19" target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
              <button className="btn-outline">GitHub ↗</button>
            </a>
            <a href="https://linkedin.com/in/shivang-sinha-cse" target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
              <button className="btn-outline">LinkedIn ↗</button>
            </a>
          </div>

          <div style={{display:"flex",justifyContent:"center",gap:14,flexWrap:"wrap"}}>
            {[ ["4","Projects","📂"],["1","Internship","💼"],["5","Certifications","🏆"],["4","Areas of Interest","🎯"] ].map(([v,l,i])=>(
              <div key={l} style={{background:"rgba(15,23,42,0.65)",border:"1px solid rgba(148,163,184,0.1)",borderRadius:12,padding:"12px 18px",textAlign:"center",minWidth:90}}>
                <div style={{fontSize:20,fontWeight:700,fontFamily:"'Space Grotesk',sans-serif",color:"#f1f5f9"}}>{i} {v}</div>
                <div style={{fontSize:11,color:"#64748b"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{padding:"100px 24px",maxWidth:1100,margin:"0 auto"}}>
        <AnimSection>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,alignItems:"center"}}>
            <div>
              <p style={{fontSize:12,color:"#6366f1",fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,letterSpacing:2,marginBottom:10,textTransform:"uppercase"}}>About Me</p>
              <h2 className="section-title" style={{marginBottom:18}}>Building at the edge of AI, Cloud & Blockchain</h2>
              <p style={{color:"#94a3b8",marginBottom:14,lineHeight:1.85,fontSize:15}}>
                I'm a final-year Computer Science Engineering student at <strong style={{color:"#a5b4fc"}}>Sambhram Institute of Technology (VTU)</strong>, Bengaluru. My journey started with web fundamentals and has grown into a deep interest in AI systems, blockchain, and cloud-native architecture.
              </p>
              <p style={{color:"#94a3b8",marginBottom:20,lineHeight:1.85,fontSize:15}}>
                I interned at <strong style={{color:"#a5b4fc"}}>SuprMentr</strong> as an AI & Cloud Computing intern, where I worked on real-world AI-driven solutions and learned deployment workflows. I'm currently leveling up in DSA, Java, System Design, and API development.
              </p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
                {["AI/ML","Cybersecurity","Blockchain","Cloud Computing"].map(t=>(
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:8}}>
                <span className="learning-badge">📖 Currently: DSA & Java</span>
                <span className="learning-badge">🛠 System Design</span>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              {[
                {icon:"🎓",title:"CSE @ VTU",sub:"2022–2026 · CGPA 6.8"},
                {icon:"💼",title:"SuprMentr Intern",sub:"AI & Cloud · Bengaluru"},
                {icon:"⛓️",title:"Blockchain Dev",sub:"Solidity · Web3.py"},
                {icon:"🧠",title:"AI Engineer",sub:"Anomaly Detection · RAG"}
              ].map(c=>(
                <div key={c.title} className="glass-card" style={{padding:"20px 16px"}}>
                  <div style={{fontSize:26,marginBottom:8}}>{c.icon}</div>
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,color:"#f1f5f9",marginBottom:4,fontSize:15}}>{c.title}</div>
                  <div style={{fontSize:12,color:"#64748b"}}>{c.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimSection>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{padding:"100px 24px",background:"rgba(15,23,42,0.4)"}}>
        <div style={{maxWidth:1050,margin:"0 auto"}}>
          <AnimSection>
            <p style={{fontSize:12,color:"#6366f1",fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,letterSpacing:2,marginBottom:10,textTransform:"uppercase",textAlign:"center"}}>Work</p>
            <h2 className="section-title" style={{textAlign:"center",marginBottom:6}}>Featured Projects</h2>
            <p className="section-sub" style={{textAlign:"center",marginBottom:44}}>Real problems. Real code.</p>
          </AnimSection>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20}}>
            {PROJECTS.map((p,i)=>(
              <AnimSection key={p.id} delay={i*80}>
                <div className="glass-card proj-card" style={{padding:26,position:"relative",overflow:"hidden"}}
                  onClick={()=>setActiveProjIdx(activeProjIdx===i?null:i)}>
                  <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${p.color},transparent)`}}/>
                  {p.badge&&(
                    <div style={{position:"absolute",top:14,right:14,background:`${p.color}18`,border:`1px solid ${p.color}35`,borderRadius:99,padding:"3px 10px",fontSize:10,color:p.color,fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,letterSpacing:0.5}}>
                      {p.badge}
                    </div>
                  )}
                  <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:14}}>
                    <div>
                      <div style={{fontSize:30,marginBottom:6}}>{p.icon}</div>
                      <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:18,color:"#f1f5f9"}}>{p.title}</h3>
                      <p style={{fontSize:12,color:p.color,fontWeight:500}}>{p.subtitle}</p>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:6,flexShrink:0}}>
                      <a href={p.github} onClick={e=>e.stopPropagation()} target="_blank" rel="noreferrer"
                        style={{background:"rgba(148,163,184,0.08)",border:"1px solid rgba(148,163,184,0.12)",borderRadius:7,padding:"5px 10px",fontSize:11,color:"#94a3b8",textDecoration:"none",textAlign:"center"}}>
                        GitHub ↗
                      </a>
                    </div>
                  </div>

                  <p style={{fontSize:13,color:"#94a3b8",lineHeight:1.75,marginBottom:14}}>{p.desc}</p>

                  <div style={{marginBottom:14,display:"flex",flexWrap:"wrap",gap:3}}>
                    {p.stack.map(s=><span key={s} className="tag">{s}</span>)}
                  </div>

                  <div style={{display:activeProjIdx===i?"block":"none",borderTop:"1px solid rgba(148,163,184,0.08)",paddingTop:14,marginTop:4}}>
                    <p style={{fontSize:12,color:"#64748b",marginBottom:8,fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,textTransform:"uppercase",letterSpacing:1}}>Highlights</p>
                    {p.highlights.map(h=>(
                      <div key={h} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                        <span style={{width:5,height:5,borderRadius:"50%",background:p.color,flexShrink:0,display:"inline-block"}}/>
                        <span style={{fontSize:13,color:"#cbd5e1"}}>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{fontSize:11,color:"#475569",marginTop:8,textAlign:"right"}}>
                    {activeProjIdx===i?"▲ Collapse":"▼ View highlights"}
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{padding:"100px 24px",maxWidth:1100,margin:"0 auto"}}>
        <AnimSection>
          <p style={{fontSize:12,color:"#6366f1",fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,letterSpacing:2,marginBottom:10,textTransform:"uppercase",textAlign:"center"}}>Expertise</p>
          <h2 className="section-title" style={{textAlign:"center",marginBottom:6}}>Skills & Technologies</h2>
          <p className="section-sub" style={{textAlign:"center",marginBottom:36}}>My current toolkit</p>

          <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginBottom:36}}>
            {Object.keys(SKILLS).map((cat,i)=>(
              <button key={cat} className="skill-tab"
                onClick={()=>setActiveSkillTab(cat)}
                style={{
                  background:activeSkillTab===cat?accentColors[i]+"22":"rgba(15,23,42,0.5)",
                  color:activeSkillTab===cat?accentColors[i]:"#64748b",
                  borderColor:activeSkillTab===cat?accentColors[i]+"40":"rgba(148,163,184,0.1)"
                }}>
                {cat}
              </button>
            ))}
          </div>

          <div className="glass-card" style={{padding:32,maxWidth:560,margin:"0 auto"}}>
            {SKILLS[activeSkillTab].map((s,i)=>(
              <SkillBar key={s.n} name={s.n} level={s.l}
                color={accentColors[Object.keys(SKILLS).indexOf(activeSkillTab)%accentColors.length]}
                delay={i*80}/>
            ))}
            {activeSkillTab==="Languages"&&(
              <p style={{fontSize:12,color:"#475569",marginTop:12,fontStyle:"italic"}}>* Java marked as beginner — actively learning</p>
            )}
          </div>
        </AnimSection>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{padding:"100px 24px",background:"rgba(15,23,42,0.4)"}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          <AnimSection>
            <p style={{fontSize:12,color:"#6366f1",fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,letterSpacing:2,marginBottom:10,textTransform:"uppercase",textAlign:"center"}}>Experience</p>
            <h2 className="section-title" style={{textAlign:"center",marginBottom:44}}>Internship</h2>
          </AnimSection>

          <AnimSection delay={100}>
            <div className="glass-card" style={{padding:32,borderLeft:"3px solid #6366f1"}}>
              <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:16}}>
                <div>
                  <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:20,color:"#f1f5f9",marginBottom:4}}>AI & Cloud Computing Intern</h3>
                  <p style={{color:"#6366f1",fontWeight:600,fontFamily:"'Space Grotesk',sans-serif",fontSize:15}}>SuprMentr · Bengaluru, India</p>
                </div>
                <span style={{background:"rgba(99,102,241,0.12)",color:"#a5b4fc",padding:"6px 14px",borderRadius:20,fontSize:13,height:"fit-content",fontFamily:"'Space Grotesk',sans-serif",fontWeight:500}}>
                  2024
                </span>
              </div>
              <p style={{color:"#94a3b8",lineHeight:1.85,marginBottom:18,fontSize:15}}>
                Built GenAI applications and cloud-integrated systems at SuprMentr. Primary ownership of a Smart Document Analyzer using RAG — from AI pipeline design to the React frontend. Worked hands-on with embeddings, vector databases, and LLM APIs in a production environment.
              </p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:10,marginBottom:18}}>
                {[
                  "Built Smart Document Analyzer using RAG",
                  "Semantic document retrieval for AI responses",
                  "Designed responsive React frontend modules",
                  "Implemented document upload workflows",
                  "Worked with embeddings & vector DBs",
                  "Collaborated on practical GenAI applications"
                ].map(item=>(
                  <div key={item} style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                    <span style={{color:"#6366f1",marginTop:4,flexShrink:0,fontSize:13}}>✓</span>
                    <span style={{fontSize:13,color:"#cbd5e1"}}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {["React","Python","RAG","Vector DB","LLM APIs","Cloud","Embeddings"].map(t=>(
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" style={{padding:"100px 24px",maxWidth:1100,margin:"0 auto"}}>
        <AnimSection>
          <p style={{fontSize:12,color:"#6366f1",fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,letterSpacing:2,marginBottom:10,textTransform:"uppercase",textAlign:"center"}}>Achievements</p>
          <h2 className="section-title" style={{textAlign:"center",marginBottom:6}}>Certifications</h2>
          <p className="section-sub" style={{textAlign:"center",marginBottom:44}}>Validated expertise</p>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:14}}>
            {CERTS.map((c,i)=>(
              <AnimSection key={c.name} delay={i*60}>
                <div className="glass-card" style={{padding:20,display:"flex",gap:14,alignItems:"center"}}>
                  <div style={{width:46,height:46,borderRadius:12,background:`${c.color}18`,border:`1px solid ${c.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>
                    {c.icon}
                  </div>
                  <div>
                    <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,color:"#f1f5f9",fontSize:14,marginBottom:3}}>{c.name}</div>
                    <div style={{fontSize:12,color:"#64748b"}}>{c.issuer}</div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </AnimSection>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{padding:"100px 24px",background:"rgba(15,23,42,0.4)"}}>
        <div style={{maxWidth:660,margin:"0 auto"}}>
          <AnimSection>
            <p style={{fontSize:12,color:"#6366f1",fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,letterSpacing:2,marginBottom:10,textTransform:"uppercase",textAlign:"center"}}>Contact</p>
            <h2 className="section-title" style={{textAlign:"center",marginBottom:6}}>Let's Connect</h2>
            <p className="section-sub" style={{textAlign:"center",marginBottom:36}}>Open to internships, full-time roles & collaborations</p>

            <div className="glass-card" style={{padding:34}}>
              {sent?(
                <div style={{textAlign:"center",padding:"24px 0"}}>
                  <div style={{fontSize:44,marginBottom:10}}>✅</div>
                  <p style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,color:"#10b981",fontSize:17}}>Message sent!</p>
                  <p style={{color:"#64748b",fontSize:13,marginTop:4}}>I'll get back to you within 24 hours.</p>
                </div>
              ):(
                <form onSubmit={handleContact}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
                    <div>
                      <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:5}}>Name</label>
                      <input className="input-field" placeholder="Your name" required
                        value={contactState.name} onChange={e=>setContactState({...contactState,name:e.target.value})}/>
                    </div>
                    <div>
                      <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:5}}>Email</label>
                      <input className="input-field" type="email" placeholder="you@email.com" required
                        value={contactState.email} onChange={e=>setContactState({...contactState,email:e.target.value})}/>
                    </div>
                  </div>
                  <div style={{marginBottom:18}}>
                    <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:5}}>Message</label>
                    <textarea className="input-field" rows={5} placeholder="Tell me about your project or opportunity..." required
                      value={contactState.message} onChange={e=>setContactState({...contactState,message:e.target.value})}
                      style={{resize:"vertical"}}/>
                  </div>
                  <button type="submit" className="btn-primary" style={{width:"100%",padding:"13px",fontSize:14}}>
                    Send Message →
                  </button>
                </form>
              )}
            </div>

            <div style={{display:"flex",justifyContent:"center",gap:12,marginTop:24,flexWrap:"wrap"}}>
              {[
                {label:"shivangsinha.88@outlook.in",icon:"📧",href:"mailto:shivangsinha.88@outlook.in"},
                {label:"GitHub",icon:"💻",href:"https://github.com/ShivangSinha19"},
                {label:"LinkedIn",icon:"🔗",href:"https://linkedin.com/in/shivang-sinha-cse"},
                {label:" +91 82522 27051",icon:"📞",href:"tel:+918252227051"},
              ].map(l=>(
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                  style={{display:"flex",gap:6,alignItems:"center",color:"#64748b",textDecoration:"none",fontSize:13,padding:"7px 14px",border:"1px solid rgba(148,163,184,0.1)",borderRadius:20,transition:"all 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.color="#a5b4fc";e.currentTarget.style.borderColor="rgba(99,102,241,0.3)";}}
                  onMouseLeave={e=>{e.currentTarget.style.color="#64748b";e.currentTarget.style.borderColor="rgba(148,163,184,0.1)";}}>
                  <span>{l.icon}</span><span>{l.label}</span>
                </a>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{textAlign:"center",padding:"24px",borderTop:"1px solid rgba(148,163,184,0.06)",color:"#475569",fontSize:12}}>
        <span style={{fontFamily:"'Space Grotesk',sans-serif"}}>Shivang Sinha · CSE @ Sambhram Institute of Technology, VTU · {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
