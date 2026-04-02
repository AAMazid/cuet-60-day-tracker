export type Subject = "ai" | "mech" | "eng";

export interface Task {
  id: string;
  text: string;
  subject: Subject;
}

export interface DayData {
  day: number;
  week: number;
  phase: string;          // exact string used in PHASE_ORDER
  label: string;
  isGraduation?: boolean;
  isCheckpoint?: boolean;
  isReview?: boolean;
  tasks: Task[];
}

// Helper to generate task IDs
function t(day: number, subj: Subject, num: number) {
  return `d${day}-${subj}-${num}`;
}

// ------------------------------
// Phase 1 — Foundation (Days 1–15)
// ------------------------------
const phase1: DayData[] = [
  { day: 1, week: 1, phase: "Phase 1 — Foundation", label: "Setup & AI Overview",
    tasks: [
      { id: t(1,"ai",1), text: "Install: Python 3.11 + VS Code + virtual environment", subject: "ai" },
      { id: t(1,"mech",1), text: "Review: Free Body Diagrams (FBD) basics", subject: "mech" },
      { id: t(1,"eng",1), text: "Read: 'What is ChatGPT doing?' (Wolfram article)", subject: "eng" },
    ] },
  { day: 2, week: 1, phase: "Phase 1 — Foundation", label: "Python Basics & Statics",
    tasks: [
      { id: t(2,"ai",1), text: "Python: variables, lists, dictionaries", subject: "ai" },
      { id: t(2,"mech",1), text: "Statics: Equilibrium of a particle", subject: "mech" },
      { id: t(2,"eng",1), text: "Write a short summary of a mechanics article (IEEE)", subject: "eng" },
    ] },
  { day: 3, week: 1, phase: "Phase 1 — Foundation", label: "Functions & Trusses",
    tasks: [
      { id: t(3,"ai",1), text: "Python: functions & scope", subject: "ai" },
      { id: t(3,"mech",1), text: "Truss analysis – Method of joints", subject: "mech" },
      { id: t(3,"eng",1), text: "Grammar: active vs passive voice", subject: "eng" },
    ] },
  { day: 4, week: 1, phase: "Phase 1 — Foundation", label: "OOP & Method of Sections",
    tasks: [
      { id: t(4,"ai",1), text: "Python OOP: classes, __init__, inheritance", subject: "ai" },
      { id: t(4,"mech",1), text: "Truss analysis – Method of sections", subject: "mech" },
      { id: t(4,"eng",1), text: "Write a cover letter for an engineering internship", subject: "eng" },
    ] },
  { day: 5, week: 1, phase: "Phase 1 — Foundation", label: "LLMs & Bending Moments",
    tasks: [
      { id: t(5,"ai",1), text: "Watch: 'Intro to Large Language Models' – Karpathy", subject: "ai" },
      { id: t(5,"mech",1), text: "Shear force & bending moment diagrams (simply supported beam)", subject: "mech" },
      { id: t(5,"eng",1), text: "Record a 2‑min self‑introduction in English", subject: "eng" },
    ] },
  { day: 6, week: 2, phase: "Phase 1 — Foundation", label: "Prompt Engineering & Calculus (Limits)",
    tasks: [
      { id: t(6,"ai",1), text: "Prompt Engineering: zero-shot, few-shot, chain-of-thought", subject: "ai" },
      { id: t(6,"mech",1), text: "Calculus: Limits (Khan Academy)", subject: "mech" },
      { id: t(6,"eng",1), text: "Read technical article on AI agents (MIT News)", subject: "eng" },
    ] },
  { day: 7, week: 2, phase: "Phase 1 — Foundation", label: "n8n & Derivatives",
    tasks: [
      { id: t(7,"ai",1), text: "n8n: create a simple automation workflow", subject: "ai" },
      { id: t(7,"mech",1), text: "Derivatives: power rule, product rule", subject: "mech" },
      { id: t(7,"eng",1), text: "Write a short abstract of a research paper", subject: "eng" },
    ] },
  { day: 8, week: 2, phase: "Phase 1 — Foundation", label: "Make.com & Integrals",
    tasks: [
      { id: t(8,"ai",1), text: "Make.com: build a scenario (Google Sheets → ChatGPT)", subject: "ai" },
      { id: t(8,"mech",1), text: "Integrals: definite and indefinite", subject: "mech" },
      { id: t(8,"eng",1), text: "Review engineering vocabulary (50 terms)", subject: "eng" },
    ] },
  { day: 9, week: 2, phase: "Phase 1 — Foundation", label: "Claude API & Differential Equations",
    tasks: [
      { id: t(9,"ai",1), text: "Claude API: get an API key, make a test call", subject: "ai" },
      { id: t(9,"mech",1), text: "First‑order ODEs: separation of variables", subject: "mech" },
      { id: t(9,"eng",1), text: "Read an engineering blog post (Engineering.com)", subject: "eng" },
    ] },
  { day: 10, week: 2, phase: "Phase 1 — Foundation", label: "GitHub & Dynamics (Kinematics)",
    tasks: [
      { id: t(10,"ai",1), text: "Create GitHub repo, write a README", subject: "ai" },
      { id: t(10,"mech",1), text: "Kinematics: SUVAT equations", subject: "mech" },
      { id: t(10,"eng",1), text: "Practice listening – watch a technical YouTube video with subtitles", subject: "eng" },
    ] },
  { day: 11, week: 3, phase: "Phase 1 — Foundation", label: "Web Scraping & Work‑Energy",
    tasks: [
      { id: t(11,"ai",1), text: "BeautifulSoup: scrape a simple website", subject: "ai" },
      { id: t(11,"mech",1), text: "Work‑energy theorem & kinetic energy", subject: "mech" },
      { id: t(11,"eng",1), text: "Write a scholarship motivation letter", subject: "eng" },
    ] },
  { day: 12, week: 3, phase: "Phase 1 — Foundation", label: "pandas & Momentum",
    tasks: [
      { id: t(12,"ai",1), text: "pandas: load CSV, basic DataFrame operations", subject: "ai" },
      { id: t(12,"mech",1), text: "Linear momentum & impulse", subject: "mech" },
      { id: t(12,"eng",1), text: "Grammar quiz: prepositions & conjunctions", subject: "eng" },
    ] },
  { day: 13, week: 3, phase: "Phase 1 — Foundation", label: "requests Library & Vibrations",
    tasks: [
      { id: t(13,"ai",1), text: "Python requests: GET/POST to a public API", subject: "ai" },
      { id: t(13,"mech",1), text: "Spring‑mass system, natural frequency", subject: "mech" },
      { id: t(13,"eng",1), text: "Read an IEEE abstract and explain it in your own words", subject: "eng" },
    ] },
  { day: 14, week: 3, phase: "Phase 1 — Foundation", label: "FastAPI & Mechanics of Materials",
    tasks: [
      { id: t(14,"ai",1), text: "FastAPI: create a simple REST endpoint", subject: "ai" },
      { id: t(14,"mech",1), text: "Stress & strain, Hooke's law", subject: "mech" },
      { id: t(14,"eng",1), text: "Write a LinkedIn summary for a mechanical engineer", subject: "eng" },
    ] },
  { day: 15, week: 3, phase: "Phase 1 — Foundation", label: "Review Day",
    isReview: true,
    tasks: [
      { id: t(15,"ai",1), text: "Review: Python basics, OOP, n8n, Make.com", subject: "ai" },
      { id: t(15,"mech",1), text: "Review: Statics, Trusses, BMD/SFD, Kinematics", subject: "mech" },
      { id: t(15,"eng",1), text: "Review all English articles & grammar rules", subject: "eng" },
    ] },
];

// ------------------------------
// Phase 2 — Skill Building (Days 16–30)
// ------------------------------
const phase2: DayData[] = [
  { day: 16, week: 4, phase: "Phase 2 — Skill Building", label: "RAG & Taylor Series",
    tasks: [
      { id: t(16,"ai",1), text: "RAG: understand retrieval‑augmented generation", subject: "ai" },
      { id: t(16,"mech",1), text: "Taylor series expansion", subject: "mech" },
      { id: t(16,"eng",1), text: "Read a research paper on LLM agents (arXiv)", subject: "eng" },
    ] },
  { day: 17, week: 4, phase: "Phase 2 — Skill Building", label: "Vector Embeddings & Fourier Series",
    tasks: [
      { id: t(17,"ai",1), text: "Vector embeddings & cosine similarity", subject: "ai" },
      { id: t(17,"mech",1), text: "Fourier series introduction", subject: "mech" },
      { id: t(17,"eng",1), text: "Write a technical description of a Fourier transform", subject: "eng" },
    ] },
  { day: 18, week: 4, phase: "Phase 2 — Skill Building", label: "LangChain & Euler‑Lagrange",
    tasks: [
      { id: t(18,"ai",1), text: "LangChain: simple chain with a prompt template", subject: "ai" },
      { id: t(18,"mech",1), text: "Lagrangian mechanics: Euler‑Lagrange equation", subject: "mech" },
      { id: t(18,"eng",1), text: "Practice speaking: describe your morning routine", subject: "eng" },
    ] },
  { day: 19, week: 4, phase: "Phase 2 — Skill Building", label: "AI Agents (ReAct) & Eigenvalues",
    tasks: [
      { id: t(19,"ai",1), text: "ReAct pattern for AI agents", subject: "ai" },
      { id: t(19,"mech",1), text: "Eigenvalues & eigenvectors", subject: "mech" },
      { id: t(19,"eng",1), text: "Read an article on numerical methods (MIT News)", subject: "eng" },
    ] },
  { day: 20, week: 4, phase: "Phase 2 — Skill Building", label: "Streamlit & Torsion",
    tasks: [
      { id: t(20,"ai",1), text: "Streamlit: build a simple data dashboard", subject: "ai" },
      { id: t(20,"mech",1), text: "Mechanics of Materials: torsion in circular shafts", subject: "mech" },
      { id: t(20,"eng",1), text: "Write a project proposal (one page)", subject: "eng" },
    ] },
  { day: 21, week: 5, phase: "Phase 2 — Skill Building", label: "Docker & Bending Stress",
    tasks: [
      { id: t(21,"ai",1), text: "Docker: containerize a FastAPI app", subject: "ai" },
      { id: t(21,"mech",1), text: "Bending stress & section modulus", subject: "mech" },
      { id: t(21,"eng",1), text: "Listen to an engineering podcast (e.g., 'The Engineering Podcast')", subject: "eng" },
    ] },
  { day: 22, week: 5, phase: "Phase 2 — Skill Building", label: "Flowise & Deflection of Beams",
    tasks: [
      { id: t(22,"ai",1), text: "Flowise: create a no‑code LLM agent", subject: "ai" },
      { id: t(22,"mech",1), text: "Beam deflection – double integration method", subject: "mech" },
      { id: t(22,"eng",1), text: "Write a LinkedIn post about a recent project", subject: "eng" },
    ] },
  { day: 23, week: 5, phase: "Phase 2 — Skill Building", label: "SQLAlchemy & Heat Transfer",
    tasks: [
      { id: t(23,"ai",1), text: "SQLAlchemy: store chat history in SQLite", subject: "ai" },
      { id: t(23,"mech",1), text: "Heat transfer: conduction (Fourier's law)", subject: "mech" },
      { id: t(23,"eng",1), text: "Read a white paper on heat exchangers (IEEE)", subject: "eng" },
    ] },
  { day: 24, week: 5, phase: "Phase 2 — Skill Building", label: "Async Python & Fluid Mechanics",
    tasks: [
      { id: t(24,"ai",1), text: "asyncio + aiohttp: parallel API calls", subject: "ai" },
      { id: t(24,"mech",1), text: "Bernoulli's equation & flow rate", subject: "mech" },
      { id: t(24,"eng",1), text: "Explain Bernoulli's principle in simple English", subject: "eng" },
    ] },
  { day: 25, week: 5, phase: "Phase 2 — Skill Building", label: "Pytest & Thermodynamics",
    tasks: [
      { id: t(25,"ai",1), text: "Write unit tests with pytest", subject: "ai" },
      { id: t(25,"mech",1), text: "1st law of thermodynamics", subject: "mech" },
      { id: t(25,"eng",1), text: "Write a cover letter for a freelancing gig (Upwork)", subject: "eng" },
    ] },
  { day: 26, week: 6, phase: "Phase 2 — Skill Building", label: "Matplotlib & 2nd Law",
    tasks: [
      { id: t(26,"ai",1), text: "Data visualization: matplotlib / seaborn", subject: "ai" },
      { id: t(26,"mech",1), text: "2nd law of thermodynamics, entropy", subject: "mech" },
      { id: t(26,"eng",1), text: "Review & edit a friend's engineering report", subject: "eng" },
    ] },
  { day: 27, week: 6, phase: "Phase 2 — Skill Building", label: "Celery/Redis & Vibrations (Damped)",
    tasks: [
      { id: t(27,"ai",1), text: "Celery + Redis: background task queue", subject: "ai" },
      { id: t(27,"mech",1), text: "Damped vibrations (underdamped, overdamped)", subject: "mech" },
      { id: t(27,"eng",1), text: "Record a 5‑min presentation on any engineering topic", subject: "eng" },
    ] },
  { day: 28, week: 6, phase: "Phase 2 — Skill Building", label: "Numerical Methods (Euler) & FEA",
    tasks: [
      { id: t(28,"ai",1), text: "Implement Euler method for ODEs", subject: "ai" },
      { id: t(28,"mech",1), text: "Finite Element Analysis (FEA) – basic concept", subject: "mech" },
      { id: t(28,"eng",1), text: "Read a case study on FEA (engineering.com)", subject: "eng" },
    ] },
  { day: 29, week: 6, phase: "Phase 2 — Skill Building", label: "Optimization & Runge‑Kutta",
    tasks: [
      { id: t(29,"ai",1), text: "Calculus optimization (max/min) with Python", subject: "ai" },
      { id: t(29,"mech",1), text: "Runge‑Kutta 4th order method", subject: "mech" },
      { id: t(29,"eng",1), text: "Write a short blog post about numerical integration", subject: "eng" },
    ] },
  { day: 30, week: 6, phase: "Phase 2 — Skill Building", label: "Review & Checkpoint",
    isCheckpoint: true,
    tasks: [
      { id: t(30,"ai",1), text: "Review: RAG, agents, Docker, Streamlit", subject: "ai" },
      { id: t(30,"mech",1), text: "Review: ODEs, vibrations, FEA, thermodynamics", subject: "mech" },
      { id: t(30,"eng",1), text: "Compile a portfolio of all writing tasks", subject: "eng" },
    ] },
];

// ------------------------------
// Phase 3 — Project Integration (Days 31–45)
// ------------------------------
const phase3: DayData[] = [
  { day: 31, week: 7, phase: "Phase 3 — Project Integration", label: "Project Planning",
    tasks: [
      { id: t(31,"ai",1), text: "Define project: LLM‑powered engineering assistant", subject: "ai" },
      { id: t(31,"mech",1), text: "Design a simple truss in FreeCAD", subject: "mech" },
      { id: t(31,"eng",1), text: "Write project proposal (goal, timeline, tech stack)", subject: "eng" },
    ] },
  { day: 32, week: 7, phase: "Phase 3 — Project Integration", label: "Build RAG pipeline",
    tasks: [
      { id: t(32,"ai",1), text: "Implement RAG: load PDFs, create vector store", subject: "ai" },
      { id: t(32,"mech",1), text: "Perform FEA on a cantilever beam (FreeCAD)", subject: "mech" },
      { id: t(32,"eng",1), text: "Write user documentation for the RAG pipeline", subject: "eng" },
    ] },
  { day: 33, week: 7, phase: "Phase 3 — Project Integration", label: "Agent with tools",
    tasks: [
      { id: t(33,"ai",1), text: "Build an AI agent with calculator + weather tool", subject: "ai" },
      { id: t(33,"mech",1), text: "Calculate stress concentration factor", subject: "mech" },
      { id: t(33,"eng",1), text: "Create a GitHub README for the agent project", subject: "eng" },
    ] },
  { day: 34, week: 7, phase: "Phase 3 — Project Integration", label: "Web UI with Streamlit",
    tasks: [
      { id: t(34,"ai",1), text: "Streamlit frontend for the RAG agent", subject: "ai" },
      { id: t(34,"mech",1), text: "Optimize beam design using calculus", subject: "mech" },
      { id: t(34,"eng",1), text: "Prepare a demo script for the project", subject: "eng" },
    ] },
  { day: 35, week: 7, phase: "Phase 3 — Project Integration", label: "Backend & Docker",
    tasks: [
      { id: t(35,"ai",1), text: "FastAPI backend, containerize with Docker", subject: "ai" },
      { id: t(35,"mech",1), text: "Simulate spring‑mass system in Python", subject: "mech" },
      { id: t(35,"eng",1), text: "Write a blog post about your development journey", subject: "eng" },
    ] },
  { day: 36, week: 8, phase: "Phase 3 — Project Integration", label: "Database integration",
    tasks: [
      { id: t(36,"ai",1), text: "Add PostgreSQL with SQLAlchemy to the project", subject: "ai" },
      { id: t(36,"mech",1), text: "Solve a dynamics problem using Runge‑Kutta", subject: "mech" },
      { id: t(36,"eng",1), text: "Write API documentation (OpenAPI/Swagger)", subject: "eng" },
    ] },
  { day: 37, week: 8, phase: "Phase 3 — Project Integration", label: "Async & performance",
    tasks: [
      { id: t(37,"ai",1), text: "Add async endpoints with aiohttp", subject: "ai" },
      { id: t(37,"mech",1), text: "Solve a heat conduction problem numerically", subject: "mech" },
      { id: t(37,"eng",1), text: "Proofread the project's technical documentation", subject: "eng" },
    ] },
  { day: 38, week: 8, phase: "Phase 3 — Project Integration", label: "Testing & CI",
    tasks: [
      { id: t(38,"ai",1), text: "Write pytest tests for the FastAPI app", subject: "ai" },
      { id: t(38,"mech",1), text: "Validate FEA results with analytical solution", subject: "mech" },
      { id: t(38,"eng",1), text: "Create a slide deck for project presentation", subject: "eng" },
    ] },
  { day: 39, week: 8, phase: "Phase 3 — Project Integration", label: "Deploy to cloud (Render/Heroku)",
    tasks: [
      { id: t(39,"ai",1), text: "Deploy the Streamlit + FastAPI app", subject: "ai" },
      { id: t(39,"mech",1), text: "Write a report comparing simulation vs theory", subject: "mech" },
      { id: t(39,"eng",1), text: "Record a 3‑min demo video (English narration)", subject: "eng" },
    ] },
  { day: 40, week: 8, phase: "Phase 3 — Project Integration", label: "Monitoring & logging",
    tasks: [
      { id: t(40,"ai",1), text: "Add logs and basic monitoring", subject: "ai" },
      { id: t(40,"mech",1), text: "Perform sensitivity analysis on a parameter", subject: "mech" },
      { id: t(40,"eng",1), text: "Write a short user manual for the tool", subject: "eng" },
    ] },
  { day: 41, week: 9, phase: "Phase 3 — Project Integration", label: "Freelance profile setup",
    tasks: [
      { id: t(41,"ai",1), text: "Create Upwork/Fiverr profile, list AI skills", subject: "ai" },
      { id: t(41,"mech",1), text: "Add mechanical design samples to portfolio", subject: "mech" },
      { id: t(41,"eng",1), text: "Write a compelling 'About Me' section", subject: "eng" },
    ] },
  { day: 42, week: 9, phase: "Phase 3 — Project Integration", label: "Apply for gigs",
    tasks: [
      { id: t(42,"ai",1), text: "Send 5 proposals on Upwork (AI/automation)", subject: "ai" },
      { id: t(42,"mech",1), text: "Send 5 proposals for mechanical CAD/FEA", subject: "mech" },
      { id: t(42,"eng",1), text: "Follow up on proposals with polite messages", subject: "eng" },
    ] },
  { day: 43, week: 9, phase: "Phase 3 — Project Integration", label: "Portfolio polish",
    tasks: [
      { id: t(43,"ai",1), text: "Polish GitHub repo (README, screenshots)", subject: "ai" },
      { id: t(43,"mech",1), text: "Create a Notion portfolio page", subject: "mech" },
      { id: t(43,"eng",1), text: "Add case studies to portfolio (problem → solution)", subject: "eng" },
    ] },
  { day: 44, week: 9, phase: "Phase 3 — Project Integration", label: "Networking & outreach",
    tasks: [
      { id: t(44,"ai",1), text: "Share project on LinkedIn/Twitter", subject: "ai" },
      { id: t(44,"mech",1), text: "Join engineering Discord/Reddit communities", subject: "mech" },
      { id: t(44,"eng",1), text: "Write a thank‑you note to a mentor", subject: "eng" },
    ] },
  { day: 45, week: 9, phase: "Phase 3 — Project Integration", label: "Project Review",
    isReview: true,
    tasks: [
      { id: t(45,"ai",1), text: "Review all project code & documentation", subject: "ai" },
      { id: t(45,"mech",1), text: "Compile all mechanics simulations", subject: "mech" },
      { id: t(45,"eng",1), text: "Create a final report (10 pages) of the project", subject: "eng" },
    ] },
];

// ------------------------------
// Phase 4 — Real‑World Mastery (Days 46–60)
// ------------------------------
const phase4: DayData[] = [
  { day: 46, week: 10, phase: "Phase 4 — Real‑World Mastery", label: "Advanced AI Agents",
    tasks: [
      { id: t(46,"ai",1), text: "Build a multi‑agent system (orchestrator + workers)", subject: "ai" },
      { id: t(46,"mech",1), text: "Solve a real engineering problem using Python", subject: "mech" },
      { id: t(46,"eng",1), text: "Write a LinkedIn article about multi‑agent AI", subject: "eng" },
    ] },
  { day: 47, week: 10, phase: "Phase 4 — Real‑World Mastery", label: "Optimization & Lagrange multipliers",
    tasks: [
      { id: t(47,"ai",1), text: "Implement constrained optimization (Lagrange) in Python", subject: "ai" },
      { id: t(47,"mech",1), text: "Optimize a truss design for minimum weight", subject: "mech" },
      { id: t(47,"eng",1), text: "Explain the optimization process in simple terms", subject: "eng" },
    ] },
  { day: 48, week: 10, phase: "Phase 4 — Real‑World Mastery", label: "Capstone: AI + Mech Integration",
    tasks: [
      { id: t(48,"ai",1), text: "Integrate AI agent with a mechanical simulation API", subject: "ai" },
      { id: t(48,"mech",1), text: "Run a full FEA on a real component (e.g., bracket)", subject: "mech" },
      { id: t(48,"eng",1), text: "Write a case study (500 words) on the integration", subject: "eng" },
    ] },
  { day: 49, week: 10, phase: "Phase 4 — Real‑World Mastery", label: "Data Engineering for AI",
    tasks: [
      { id: t(49,"ai",1), text: "Build an ETL pipeline with pandas + SQLite", subject: "ai" },
      { id: t(49,"mech",1), text: "Analyze sensor data (CSV) with Python", subject: "mech" },
      { id: t(49,"eng",1), text: "Create a data dictionary and documentation", subject: "eng" },
    ] },
  { day: 50, week: 10, phase: "Phase 4 — Real‑World Mastery", label: "Deploy & Scale",
    tasks: [
      { id: t(50,"ai",1), text: "Deploy AI agent on a VPS (DigitalOcean)", subject: "ai" },
      { id: t(50,"mech",1), text: "Run parameter sweeps using parallel processing", subject: "mech" },
      { id: t(50,"eng",1), text: "Write a post‑mortem report on deployment", subject: "eng" },
    ] },
  { day: 51, week: 11, phase: "Phase 4 — Real‑World Mastery", label: "Freelance project (real client)",
    tasks: [
      { id: t(51,"ai",1), text: "Land a small freelance task (AI automation)", subject: "ai" },
      { id: t(51,"mech",1), text: "Land a small CAD/FEA task", subject: "mech" },
      { id: t(51,"eng",1), text: "Communicate with client professionally (email/chat)", subject: "eng" },
    ] },
  { day: 52, week: 11, phase: "Phase 4 — Real‑World Mastery", label: "Deliver freelance work",
    tasks: [
      { id: t(52,"ai",1), text: "Complete and deliver the AI task", subject: "ai" },
      { id: t(52,"mech",1), text: "Complete and deliver the mechanical task", subject: "mech" },
      { id: t(52,"eng",1), text: "Ask for a testimonial/review", subject: "eng" },
    ] },
  { day: 53, week: 11, phase: "Phase 4 — Real‑World Mastery", label: "Interview preparation",
    tasks: [
      { id: t(53,"ai",1), text: "Practice AI/ML interview questions (LeetCode style)", subject: "ai" },
      { id: t(53,"mech",1), text: "Practice mechanics & engineering design questions", subject: "mech" },
      { id: t(53,"eng",1), text: "Mock interview with a friend (record and review)", subject: "eng" },
    ] },
  { day: 54, week: 11, phase: "Phase 4 — Real‑World Mastery", label: "Resume & portfolio finalize",
    tasks: [
      { id: t(54,"ai",1), text: "Add AI projects to resume", subject: "ai" },
      { id: t(54,"mech",1), text: "Add mechanical design projects to resume", subject: "mech" },
      { id: t(54,"eng",1), text: "Proofread entire resume and cover letter", subject: "eng" },
    ] },
  { day: 55, week: 11, phase: "Phase 4 — Real‑World Mastery", label: "Apply for internships/jobs",
    tasks: [
      { id: t(55,"ai",1), text: "Apply to 5 AI/software engineering internships", subject: "ai" },
      { id: t(55,"mech",1), text: "Apply to 5 mechanical engineering roles", subject: "mech" },
      { id: t(55,"eng",1), text: "Write personalised cover letters", subject: "eng" },
    ] },
  { day: 56, week: 12, phase: "Phase 4 — Real‑World Mastery", label: "Advanced topic: Graph RAG",
    tasks: [
      { id: t(56,"ai",1), text: "Implement Graph RAG using Neo4j", subject: "ai" },
      { id: t(56,"mech",1), text: "Read a research paper on FEM optimization", subject: "mech" },
      { id: t(56,"eng",1), text: "Summarise the paper in 1 page", subject: "eng" },
    ] },
  { day: 57, week: 12, phase: "Phase 4 — Real‑World Mastery", label: "Contribute to open source",
    tasks: [
      { id: t(57,"ai",1), text: "Make a PR to a LangChain or n8n repo", subject: "ai" },
      { id: t(57,"mech",1), text: "Contribute to FreeCAD or a simulation library", subject: "mech" },
      { id: t(57,"eng",1), text: "Write a contribution guide or improve docs", subject: "eng" },
    ] },
  { day: 58, week: 12, phase: "Phase 4 — Real‑World Mastery", label: "Teach what you learned",
    tasks: [
      { id: t(58,"ai",1), text: "Write a tutorial on building an AI agent", subject: "ai" },
      { id: t(58,"mech",1), text: "Create a YouTube video solving a mechanics problem", subject: "mech" },
      { id: t(58,"eng",1), text: "Publish the tutorial on Medium or dev.to", subject: "eng" },
    ] },
  { day: 59, week: 12, phase: "Phase 4 — Real‑World Mastery", label: "Final review & networking",
    tasks: [
      { id: t(59,"ai",1), text: "Review all 60 days of AI tasks", subject: "ai" },
      { id: t(59,"mech",1), text: "Review all 60 days of mechanics tasks", subject: "mech" },
      { id: t(59,"eng",1), text: "Send thank‑you messages to everyone who helped", subject: "eng" },
    ] },
  { day: 60, week: 12, phase: "Phase 4 — Real‑World Mastery", label: "Graduation Day!",
    isGraduation: true,
    tasks: [
      { id: t(60,"ai",1), text: "🎉 Celebrate – you've completed the AI roadmap!", subject: "ai" },
      { id: t(60,"mech",1), text: "🎉 Celebrate – you've mastered the mechanics track!", subject: "mech" },
      { id: t(60,"eng",1), text: "🎉 Write a final reflection (500 words) in English", subject: "eng" },
    ] },
];

export const roadmapData: DayData[] = [...phase1, ...phase2, ...phase3, ...phase4];
