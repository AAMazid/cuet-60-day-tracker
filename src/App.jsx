import { useState, useEffect, useCallback } from "react";

// ─── Storage fallback (localStorage) ─────────────────────────────
if (typeof window !== "undefined" && !window.storage) {
  window.storage = {
    async get(key) {
      try {
        const value = localStorage.getItem(key);
        return value ? { value } : null;
      } catch {
        return null;
      }
    },
    async set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {}
    },
  };
}

// ─── Theme Tokens ────────────────────────────────────────────────
const THEMES = {
  dark: {
    bg:        "#0A0F1E",
    surface:   "#0F172A",
    card:      "#131C2E",
    border:    "#1E293B",
    border2:   "#334155",
    text:      "#E2E8F0",
    textSub:   "#94A3B8",
    textMuted: "#475569",
    inputBg:   "#0F172A",
    heroBg:    "linear-gradient(160deg,#0F172A 0%,#1A1035 60%,#0A0F1E 100%)",
    statBg:    "#0F172A",
    tagDone:   "rgba(16,185,129,0.08)",
    aiGrad:    "linear-gradient(135deg,#1A1035,#0F172A)",
    aiBorder:  "#4C1D9566",
    aiText:    "#C4B5FD",
    aiSub:     "#7C3AED",
    toggle:    "#1E293B",
    toggleIcon:"☀️",
    toggleTip: "Switch to Light Mode",
  },
  light: {
    bg:        "#F0F4FF",
    surface:   "#FFFFFF",
    card:      "#F8FAFC",
    border:    "#E2E8F0",
    border2:   "#CBD5E1",
    text:      "#0F172A",
    textSub:   "#334155",
    textMuted: "#64748B",
    inputBg:   "#F8FAFC",
    heroBg:    "linear-gradient(160deg,#EEF2FF 0%,#F5F3FF 60%,#F0F4FF 100%)",
    statBg:    "#FFFFFF",
    tagDone:   "rgba(16,185,129,0.08)",
    aiGrad:    "linear-gradient(135deg,#F5F3FF,#EEF2FF)",
    aiBorder:  "#7C3AED44",
    aiText:    "#5B21B6",
    aiSub:     "#7C3AED",
    toggle:    "#E2E8F0",
    toggleIcon:"🌙",
    toggleTip: "Switch to Dark Mode",
  },
};

// ─── Resource Map (full) ────────────────────────────────────────
const TOPIC_MAP = [
  { keywords: ["llm", "how llm", "karpathy", "language model", "gpt"],
    resources: [
      { title: "Intro to Large Language Models – Andrej Karpathy", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g", type: "video", note: "The exact video recommended in the roadmap" },
      { title: "But what is a GPT? – 3Blue1Brown", url: "https://www.youtube.com/watch?v=wjZofJX0v4M", type: "video", note: "Visual deep-dive into transformers" },
      { title: "What is ChatGPT doing? – Stephen Wolfram", url: "https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/", type: "article" },
    ]},
  { keywords: ["install: python", "vs code", "virtual environment", "python 3.11"],
    resources: [
      { title: "Python Download Page", url: "https://www.python.org/downloads/", type: "website" },
      { title: "VS Code Python Setup Guide", url: "https://code.visualstudio.com/docs/python/python-tutorial", type: "docs" },
      { title: "Python Virtual Environments – Real Python", url: "https://realpython.com/python-virtual-environments-a-primer/", type: "article" },
    ]},
  { keywords: ["prompt engineering", "zero-shot", "few-shot", "chain-of-thought", "role-context-task", "prompt pattern", "meta-prompt", "output primer", "system prompt", "prompting"],
    resources: [
      { title: "Anthropic Prompt Engineering Guide", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", type: "docs", note: "Official – most up-to-date" },
      { title: "Prompt Engineering Guide (Dair.ai)", url: "https://www.promptingguide.ai/", type: "website" },
      { title: "OpenAI Prompt Engineering Best Practices", url: "https://platform.openai.com/docs/guides/prompt-engineering", type: "docs" },
      { title: "Learn Prompting", url: "https://learnprompting.org/", type: "course" },
    ]},
  { keywords: ["n8n"],
    resources: [
      { title: "n8n Official Documentation", url: "https://docs.n8n.io/", type: "docs" },
      { title: "n8n YouTube Channel (Tutorials)", url: "https://www.youtube.com/@n8n-io", type: "video" },
      { title: "n8n Cloud (Free Account)", url: "https://app.n8n.cloud/", type: "tool" },
      { title: "n8n Community Forum", url: "https://community.n8n.io/", type: "website" },
    ]},
  { keywords: ["make.com", "make scenario", "make:"],
    resources: [
      { title: "Make.com Official Documentation", url: "https://www.make.com/en/help", type: "docs" },
      { title: "Make.com YouTube Tutorials", url: "https://www.youtube.com/@Make", type: "video" },
      { title: "Make Academy (Free Courses)", url: "https://www.make.com/en/academy", type: "course" },
    ]},
  { keywords: ["claude api", "claude code", "anthropic api", "token", "temperature", "model parameter"],
    resources: [
      { title: "Anthropic API Documentation", url: "https://docs.anthropic.com/", type: "docs" },
      { title: "Claude Code Documentation", url: "https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview", type: "docs" },
      { title: "Anthropic Cookbook (Examples)", url: "https://github.com/anthropics/anthropic-cookbook", type: "website" },
    ]},
  { keywords: ["python: variables", "python: lists", "python: dictionaries", "python: functions", "python basics", "python: string", "python: file", "print statements", "data types", "code: python"],
    resources: [
      { title: "Python Official Tutorial", url: "https://docs.python.org/3/tutorial/", type: "docs" },
      { title: "CS50P – Python (Harvard, Free)", url: "https://cs50.harvard.edu/python/2022/", type: "course", note: "Best free Python course" },
      { title: "Corey Schafer – Python Tutorials (YouTube)", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTskrapNbzXhwoFUiLCjGgY7", type: "video" },
      { title: "Real Python – Beginners Guide", url: "https://realpython.com/python-first-steps/", type: "article" },
    ]},
  { keywords: ["oop", "class", "__init__", "inheritance", "object-oriented", "oop basics", "oop advanced"],
    resources: [
      { title: "Python OOP – Real Python", url: "https://realpython.com/python3-object-oriented-programming/", type: "article" },
      { title: "Corey Schafer – OOP Playlist (YouTube)", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc", type: "video" },
      { title: "Python OOP Official Docs", url: "https://docs.python.org/3/tutorial/classes.html", type: "docs" },
    ]},
  { keywords: ["pandas", "dataframe", "csv"],
    resources: [
      { title: "pandas Official Documentation", url: "https://pandas.pydata.org/docs/getting_started/index.html", type: "docs" },
      { title: "pandas Tutorial – Real Python", url: "https://realpython.com/pandas-python-explore-dataset/", type: "article" },
      { title: "pandas in 10 min – YouTube (Corey Schafer)", url: "https://www.youtube.com/watch?v=vmEHCJofslg", type: "video" },
    ]},
  { keywords: ["requests library", "http request", "get, post", "api call", "python: http"],
    resources: [
      { title: "requests Library Docs", url: "https://docs.python-requests.org/en/latest/", type: "docs" },
      { title: "HTTP Requests in Python – Real Python", url: "https://realpython.com/python-requests/", type: "article" },
      { title: "Working with REST APIs in Python – YouTube", url: "https://www.youtube.com/watch?v=tb8gHvYlCFs", type: "video" },
    ]},
  { keywords: ["fastapi", "rest api endpoint", "pydantic"],
    resources: [
      { title: "FastAPI Official Documentation", url: "https://fastapi.tiangolo.com/", type: "docs", note: "Excellent, beginner-friendly docs" },
      { title: "FastAPI Crash Course – YouTube (Traversy)", url: "https://www.youtube.com/watch?v=0sOvCWFmrtA", type: "video" },
      { title: "Python Type Hints & Pydantic", url: "https://docs.pydantic.dev/", type: "docs" },
    ]},
  { keywords: ["streamlit"],
    resources: [
      { title: "Streamlit Official Documentation", url: "https://docs.streamlit.io/", type: "docs" },
      { title: "Streamlit Crash Course – YouTube", url: "https://www.youtube.com/watch?v=JwSS70SZdyM", type: "video" },
      { title: "Streamlit Gallery (Examples)", url: "https://streamlit.io/gallery", type: "website" },
    ]},
  { keywords: ["docker", "dockerfile", "container"],
    resources: [
      { title: "Docker Official Getting Started", url: "https://docs.docker.com/get-started/", type: "docs" },
      { title: "Docker Tutorial for Beginners – YouTube (TechWorld)", url: "https://www.youtube.com/watch?v=3c-iBn73dDE", type: "video" },
    ]},
  { keywords: ["rag", "retrieval-augmented", "vector database", "pinecone", "qdrant", "embedding"],
    resources: [
      { title: "RAG Explained – IBM Technology (YouTube)", url: "https://www.youtube.com/watch?v=T-D1OfcDW1M", type: "video" },
      { title: "LangChain RAG Tutorial", url: "https://python.langchain.com/docs/tutorials/rag/", type: "docs" },
      { title: "What is RAG? – Pinecone", url: "https://www.pinecone.io/learn/retrieval-augmented-generation/", type: "article" },
    ]},
  { keywords: ["beautifulsoup", "web scraping", "scrape"],
    resources: [
      { title: "BeautifulSoup Docs", url: "https://www.crummy.com/software/BeautifulSoup/bs4/doc/", type: "docs" },
      { title: "Web Scraping with Python – Real Python", url: "https://realpython.com/beautiful-soup-web-scraper-python/", type: "article" },
      { title: "Web Scraping Crash Course – YouTube (Corey Schafer)", url: "https://www.youtube.com/watch?v=ng2o98k983k", type: "video" },
    ]},
  { keywords: ["limit", "calculus basics", "x to 0", "x to infinity", "x→0", "x→∞"],
    resources: [
      { title: "Limits – Khan Academy", url: "https://www.khanacademy.org/math/calculus-1/cs1-limits-and-continuity", type: "course", note: "Exactly as recommended in the roadmap" },
      { title: "Introduction to Limits – 3Blue1Brown (Essence of Calculus)", url: "https://www.youtube.com/watch?v=WUvTyaaNkzM", type: "video" },
      { title: "Limits – Paul's Online Math Notes", url: "https://tutorial.math.lamar.edu/Classes/CalcI/limitsIntro.aspx", type: "article" },
    ]},
  { keywords: ["derivative", "power rule", "chain rule", "product rule", "implicit differentiation", "related rates", "differentiat"],
    resources: [
      { title: "Derivatives – Khan Academy", url: "https://www.khanacademy.org/math/calculus-1/cs1-derivatives-definition-and-basic-rules", type: "course" },
      { title: "Derivative Rules – 3Blue1Brown", url: "https://www.youtube.com/watch?v=S0_qX4VJhMQ", type: "video" },
      { title: "Chain Rule Explained – Professor Leonard (YouTube)", url: "https://www.youtube.com/watch?v=H-ybCx8gt-8", type: "video" },
      { title: "Derivatives – Paul's Online Math Notes", url: "https://tutorial.math.lamar.edu/Classes/CalcI/DerivativeIntro.aspx", type: "article" },
    ]},
  { keywords: ["integral", "antiderivative", "definite integral", "integration", "area under", "integration by parts", "integration by substitution", "∫"],
    resources: [
      { title: "Integrals – Khan Academy", url: "https://www.khanacademy.org/math/calculus-1/cs1-integrals", type: "course" },
      { title: "Integration and the Fundamental Theorem – 3Blue1Brown", url: "https://www.youtube.com/watch?v=rfG8ce4nNh0", type: "video" },
      { title: "Integration by Parts – Professor Leonard", url: "https://www.youtube.com/watch?v=jSB49a5AbGE", type: "video" },
      { title: "Paul's Online Math Notes – Integrals", url: "https://tutorial.math.lamar.edu/Classes/CalcI/IntegralsIntro.aspx", type: "article" },
    ]},
  { keywords: ["differential equation", "ode", "first-order", "second-order", "laplace transform", "separable", "homogeneous", "undetermined coefficients", "dy/dx"],
    resources: [
      { title: "Differential Equations – Khan Academy", url: "https://www.khanacademy.org/math/differential-equations", type: "course" },
      { title: "MIT OCW – Differential Equations (18.03)", url: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/", type: "course", note: "Free MIT lectures" },
      { title: "Professor Leonard – Differential Equations Playlist", url: "https://www.youtube.com/playlist?list=PLDesaqWTN6ESPaHy2QUKVaXNZuQNxkYQ_", type: "video", note: "Best free video series for ODEs" },
      { title: "Paul's Online Math Notes – ODEs", url: "https://tutorial.math.lamar.edu/Classes/DE/DE.aspx", type: "article" },
    ]},
  { keywords: ["taylor series", "fourier series", "fourier transform"],
    resources: [
      { title: "Taylor Series – 3Blue1Brown", url: "https://www.youtube.com/watch?v=3d6DsjIBzJ4", type: "video" },
      { title: "Fourier Series – 3Blue1Brown", url: "https://www.youtube.com/watch?v=r6sGWTCMz2k", type: "video" },
      { title: "Taylor Series – Khan Academy", url: "https://www.khanacademy.org/math/calculus-bc/bc-series-new/bc-10-14/v/maclaurin-and-taylor-series-intuition", type: "course" },
    ]},
  { keywords: ["fbd", "free body diagram", "newton's 3 law", "newton's 2nd law", "draw fbd", "friction", "normal force", "resultant", "force vector", "equilibrium", "statics"],
    resources: [
      { title: "Free Body Diagrams – Khan Academy", url: "https://www.khanacademy.org/science/physics/forces-newtons-laws/newtons-laws-of-motion/a/what-is-a-force", type: "course" },
      { title: "Engineering Statics – Jeff Hanson (YouTube)", url: "https://www.youtube.com/playlist?list=PLMrMeBcqXCJHOmHxFXyB4i60oKBNQ4wVS", type: "video", note: "Highly recommended for CUET prep" },
      { title: "Statics – Dr. Structure (YouTube)", url: "https://www.youtube.com/playlist?list=PLO_JKNOhK1HHiSnnCuEBhJ8dQf8OWHG6C", type: "video" },
      { title: "Hibbeler Engineering Mechanics: Statics – Overview", url: "https://www.pearson.com/en-us/subject-catalog/p/engineering-mechanics-statics/P200000006738", type: "article", note: "Standard CUET textbook reference" },
    ]},
  { keywords: ["truss", "method of joints", "method of sections"],
    resources: [
      { title: "Truss Analysis (Method of Joints) – YouTube", url: "https://www.youtube.com/watch?v=vNL3bbn1T0M", type: "video" },
      { title: "Method of Sections – YouTube", url: "https://www.youtube.com/watch?v=Ci_J0JZFZQA", type: "video" },
      { title: "Truss Problems – StructNotes", url: "https://structnotes.com/statics/trusses/", type: "article" },
    ]},
  { keywords: ["bending moment", "shear force", "sfd", "bmd", "simply supported beam", "distributed load"],
    resources: [
      { title: "Shear Force & Bending Moment Diagrams – YouTube (Dr. Structure)", url: "https://www.youtube.com/watch?v=C-FEVzI8oe8", type: "video" },
      { title: "SFD & BMD Tutorial – YouTube", url: "https://www.youtube.com/watch?v=ZaVM1CnQ5j4", type: "video" },
    ]},
  { keywords: ["kinematics", "suvat", "free fall", "position, velocity, acceleration", "angular velocity", "rotational kinematics", "circular motion", "centripetal"],
    resources: [
      { title: "Kinematics – Khan Academy", url: "https://www.khanacademy.org/science/physics/one-dimensional-motion", type: "course" },
      { title: "Engineering Dynamics – Jeff Hanson (YouTube)", url: "https://www.youtube.com/playlist?list=PLMrMeBcqXCJHzAg4yA6CyzVTf7Ge9IXKX", type: "video" },
      { title: "Rotational Kinematics – Khan Academy", url: "https://www.khanacademy.org/science/physics/torque-angular-momentum", type: "course" },
    ]},
  { keywords: ["work-energy", "kinetic energy", "potential energy", "conservation of energy", "momentum", "impulse", "collision", "work done"],
    resources: [
      { title: "Work, Energy & Power – Khan Academy", url: "https://www.khanacademy.org/science/physics/work-and-energy", type: "course" },
      { title: "Momentum & Impulse – Khan Academy", url: "https://www.khanacademy.org/science/physics/linear-momentum", type: "course" },
      { title: "Work-Energy Theorem – Michel van Biezen (YouTube)", url: "https://www.youtube.com/watch?v=Ml8oCqXNPMM", type: "video" },
    ]},
  { keywords: ["vibration", "damping", "spring-mass", "overdamped", "underdamped", "natural frequency", "forced vibration", "resonance", "amplitude"],
    resources: [
      { title: "Mechanical Vibrations – NPTEL (Free Course)", url: "https://nptel.ac.in/courses/112106224", type: "course", note: "Free IIT lecture series" },
      { title: "Vibrations Intro – YouTube (Dr. Janak Raj Mistry)", url: "https://www.youtube.com/watch?v=JBnRE-qNhD4", type: "video" },
      { title: "Free Vibration – Wikipedia Reference", url: "https://en.wikipedia.org/wiki/Harmonic_oscillator", type: "article" },
    ]},
  { keywords: ["stress", "strain", "torsion", "bending stress", "deflection", "moment of inertia", "section modulus", "shear modulus", "polar moment", "elasticity", "deformation"],
    resources: [
      { title: "Mechanics of Materials – NPTEL (Free)", url: "https://nptel.ac.in/courses/112107146", type: "course", note: "Free IIT course" },
      { title: "Mechanics of Materials – YouTube (Jeff Hanson)", url: "https://www.youtube.com/playlist?list=PLMrMeBcqXCJH7RCDe8sVFDFPvJ3aTlF3w", type: "video" },
      { title: "Stress & Strain – Khan Academy", url: "https://www.khanacademy.org/science/physics/discoveries/mechanical-waves-ap/stress-and-strain", type: "course" },
    ]},
  { keywords: ["engineering drawing", "orthographic", "isometric", "section view", "exploded view", "gd&t", "freecad", "title block", "dimension", "hidden lines", "assembly drawing", "bom", "bill of materials"],
    resources: [
      { title: "Engineering Drawing – NPTEL (Free Course)", url: "https://nptel.ac.in/courses/112107214", type: "course", note: "Indian engineering curriculum – perfect for CUET" },
      { title: "FreeCAD Official Tutorials", url: "https://wiki.freecad.org/Tutorials", type: "docs" },
      { title: "Engineering Drawing Basics – YouTube (The Efficient Engineer)", url: "https://www.youtube.com/watch?v=IDtpQR5T9RM", type: "video" },
      { title: "Isometric Drawing – YouTube", url: "https://www.youtube.com/watch?v=EFLJi8HFP_U", type: "video" },
      { title: "GD&T Basics (Free Resource)", url: "https://www.gdandtbasics.com/", type: "website" },
    ]},
  { keywords: ["heat transfer", "conduction", "fourier", "fluid mechanics", "bernoulli", "pressure", "viscosity", "flow rate", "convection", "radiation"],
    resources: [
      { title: "Heat Transfer – NPTEL (Free)", url: "https://nptel.ac.in/courses/112105123", type: "course" },
      { title: "Fluid Mechanics – NPTEL (Free)", url: "https://nptel.ac.in/courses/112104118", type: "course" },
      { title: "Bernoulli's Equation – Khan Academy", url: "https://www.khanacademy.org/science/physics/fluids/fluid-dynamics/a/what-is-bernoullis-equation", type: "course" },
    ]},
  { keywords: ["lagrangian", "generalized coordinate", "degree of freedom", "euler-lagrange"],
    resources: [
      { title: "Lagrangian Mechanics – YouTube (Michel van Biezen)", url: "https://www.youtube.com/watch?v=KpLno70oYHE", type: "video" },
      { title: "Classical Mechanics – MIT OCW (8.01)", url: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/", type: "course", note: "Free MIT lectures" },
    ]},
  { keywords: ["eigenvalue", "eigenvector", "matrix", "determinant", "linear algebra"],
    resources: [
      { title: "Eigenvalues & Eigenvectors – 3Blue1Brown", url: "https://www.youtube.com/watch?v=PFDu9oVAE-g", type: "video", note: "Best visual explanation" },
      { title: "Linear Algebra – MIT OCW (18.06)", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", type: "course" },
      { title: "Linear Algebra – Khan Academy", url: "https://www.khanacademy.org/math/linear-algebra", type: "course" },
    ]},
  { keywords: ["upwork", "fiverr", "freelance", "gig", "profile", "proposal", "outreach"],
    resources: [
      { title: "Upwork Getting Started Guide", url: "https://www.upwork.com/resources/getting-started-on-upwork", type: "article" },
      { title: "Fiverr Academy", url: "https://www.fiverr.com/resources/guides/business/sell-on-fiverr", type: "article" },
      { title: "How to Land Your First Client – YouTube", url: "https://www.youtube.com/watch?v=3FmTgWHbU3E", type: "video" },
    ]},
  { keywords: ["github", "readme", "portfolio", "notion", "git commit"],
    resources: [
      { title: "GitHub Docs – Getting Started", url: "https://docs.github.com/en/get-started", type: "docs" },
      { title: "How to Make a Great GitHub README – YouTube", url: "https://www.youtube.com/watch?v=E6NO0rgFub4", type: "video" },
      { title: "Notion Official Templates", url: "https://www.notion.so/templates", type: "website" },
    ]},
  { keywords: ["grammar", "passive voice", "writing", "cover letter", "scholarship", "technical writing", "vocabulary", "speaking", "record yourself"],
    resources: [
      { title: "Grammarly Writing Tips", url: "https://www.grammarly.com/blog/category/writing-tips/", type: "website" },
      { title: "Technical Writing – Google (Free Course)", url: "https://developers.google.com/tech-writing", type: "course", note: "Free, beginner-friendly" },
      { title: "IEEE Spectrum (Engineering Articles)", url: "https://spectrum.ieee.org/", type: "website" },
      { title: "Engineering.com Articles", url: "https://www.engineering.com/", type: "website" },
    ]},
  { keywords: ["research paper", "abstract", "ieee", "paper", "mit news"],
    resources: [
      { title: "Google Scholar", url: "https://scholar.google.com/", type: "website", note: "Search for any engineering paper for free" },
      { title: "arXiv.org (Free Preprints)", url: "https://arxiv.org/", type: "website" },
      { title: "MIT News – Engineering", url: "https://news.mit.edu/topic/mitengineeringnews", type: "website" },
      { title: "IEEE Xplore", url: "https://ieeexplore.ieee.org/", type: "website" },
    ]},
  { keywords: ["ai agent", "react pattern", "multi-agent", "tool use", "memory", "agent loop", "orchestrator"],
    resources: [
      { title: "What are AI Agents? – IBM (YouTube)", url: "https://www.youtube.com/watch?v=F8NKVhkZZWI", type: "video" },
      { title: "ReAct: Reasoning + Acting – Paper", url: "https://react-lm.github.io/", type: "article" },
      { title: "Building AI Agents with LangChain", url: "https://python.langchain.com/docs/concepts/agents/", type: "docs" },
    ]},
  { keywords: ["vector embedding", "cosine similarity", "semantic search"],
    resources: [
      { title: "Word Embeddings – 3Blue1Brown (YouTube)", url: "https://www.youtube.com/watch?v=wgfSDrqYMJ4", type: "video" },
      { title: "Embeddings Guide – OpenAI", url: "https://platform.openai.com/docs/guides/embeddings", type: "docs" },
    ]},
  { keywords: ["pytest", "unit test", "testing"],
    resources: [
      { title: "pytest Official Docs", url: "https://docs.pytest.org/en/stable/", type: "docs" },
      { title: "Pytest Tutorial – Real Python", url: "https://realpython.com/pytest-python-testing/", type: "article" },
    ]},
  { keywords: ["sqlalchemy", "sqlite", "postgresql", "database node", "supabase"],
    resources: [
      { title: "SQLAlchemy Docs", url: "https://docs.sqlalchemy.org/en/20/tutorial/", type: "docs" },
      { title: "SQLite Tutorial", url: "https://www.sqlitetutorial.net/", type: "article" },
    ]},
  { keywords: ["euler method", "runge-kutta", "numerical", "trapezoidal", "simpson"],
    resources: [
      { title: "Numerical Methods – NPTEL (Free)", url: "https://nptel.ac.in/courses/111107105", type: "course" },
      { title: "Euler Method Explained – YouTube", url: "https://www.youtube.com/watch?v=NfLGmjQdvKg", type: "video" },
    ]},
  { keywords: ["finite element", "fea", "fem workbench", "mesh"],
    resources: [
      { title: "FEA Explained – YouTube (The Efficient Engineer)", url: "https://www.youtube.com/watch?v=GHjopp47vvQ", type: "video" },
      { title: "FreeCAD FEM Workbench Tutorial", url: "https://wiki.freecad.org/FEM_tutorial", type: "docs" },
    ]},
  { keywords: ["thermodynamics", "entropy", "1st law", "2nd law", "cycle"],
    resources: [
      { title: "Thermodynamics – Khan Academy", url: "https://www.khanacademy.org/science/physics/thermodynamics", type: "course" },
      { title: "Thermodynamics – NPTEL (Free)", url: "https://nptel.ac.in/courses/112104113", type: "course" },
    ]},
  { keywords: ["langchain", "flowise"],
    resources: [
      { title: "LangChain Python Docs", url: "https://python.langchain.com/docs/introduction/", type: "docs" },
      { title: "Flowise – No-Code LLM Apps", url: "https://flowiseai.com/", type: "tool" },
      { title: "LangChain Crash Course – YouTube (freeCodeCamp)", url: "https://www.youtube.com/watch?v=lG7Uxts9SXs", type: "video" },
    ]},
  { keywords: ["matplotlib", "seaborn", "chart", "visualization"],
    resources: [
      { title: "Matplotlib Official Tutorials", url: "https://matplotlib.org/stable/tutorials/index.html", type: "docs" },
      { title: "Seaborn Documentation", url: "https://seaborn.pydata.org/tutorial.html", type: "docs" },
      { title: "Data Visualization with Python – YouTube (Corey Schafer)", url: "https://www.youtube.com/watch?v=UO98lJQ3QGI", type: "video" },
    ]},
  { keywords: ["asyncio", "aiohttp", "async", "celery", "redis"],
    resources: [
      { title: "Asyncio – Python Docs", url: "https://docs.python.org/3/library/asyncio.html", type: "docs" },
      { title: "Async Python – Real Python", url: "https://realpython.com/async-io-python/", type: "article" },
    ]},
  { keywords: ["optimization", "maximize", "minimize", "lagrange multiplier"],
    resources: [
      { title: "Optimization – Khan Academy", url: "https://www.khanacademy.org/math/calculus-1/cs1-applications-of-derivatives/cs1-applied-rates-of-change/v/optimization-calculus", type: "course" },
      { title: "Optimization Problems – Paul's Notes", url: "https://tutorial.math.lamar.edu/Classes/CalcI/Optimization.aspx", type: "article" },
    ]},
];

const TYPE_CONFIG = {
  video:   { label: "Video",   icon: "▶", color: "#EF4444", bg: "#FEF2F2", darkBg: "#7F1D1D33" },
  article: { label: "Article", icon: "📝", color: "#3B82F6", bg: "#EFF6FF", darkBg: "#1E3A5F33" },
  docs:    { label: "Docs",    icon: "📄", color: "#64748B", bg: "#F1F5F9", darkBg: "#33415533" },
  course:  { label: "Course",  icon: "🎓", color: "#8B5CF6", bg: "#F5F3FF", darkBg: "#4C1D9533" },
  pdf:     { label: "PDF",     icon: "📑", color: "#F97316", bg: "#FFF7ED", darkBg: "#7C2D1233" },
  website: { label: "Website", icon: "🌐", color: "#10B981", bg: "#ECFDF5", darkBg: "#06402433" },
  tool:    { label: "Tool",    icon: "🔧", color: "#EAB308", bg: "#FEFCE8", darkBg: "#71350133" },
};

function getResources(taskText) {
  const lower = taskText.toLowerCase();
  const found = []; const seen = new Set();
  for (const topic of TOPIC_MAP) {
    if (topic.keywords.some(kw => lower.includes(kw.toLowerCase()))) {
      for (const r of topic.resources) {
        if (!seen.has(r.url)) { seen.add(r.url); found.push(r); }
      }
    }
  }
  return found;
}

// ─── 60-Day Data ─────────────────────────────────────────────────
const PHASES = [
  { id:1, weeks:"Weeks 1–2", label:"Foundation",    days:[1,14],  color:"#3B82F6" },
  { id:2, weeks:"Weeks 3–4", label:"Skill Building",days:[15,28], color:"#8B5CF6" },
  { id:3, weeks:"Weeks 5–6", label:"Projects",      days:[29,42], color:"#10B981" },
  { id:4, weeks:"Weeks 7–8", label:"Mastery",       days:[43,60], color:"#F59E0B" },
];

const DAYS_DATA = [
  {day:1,week:1,phase:1,title:"LLM Basics & First Workflow",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Read: How LLMs work (Andrej Karpathy intro notes)","Install: Python 3.11, VS Code, set up virtual environment","Exercise: Write 5 prompts using Role-Context-Task-Format","Practice: Open n8n cloud account; explore the dashboard","Journal: Write what you learned today (3 sentences)"]},mech:{label:"Mechanics",hours:3,tasks:["Read: Calculus basics — what is a limit? (Khan Academy)","Exercise: Evaluate 10 limit problems (x→0, x→∞)","Draw: Sketch your desk as a simple orthographic front view","Read: Engineering Drawing basics — line types and conventions"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: algorithm, iteration, derivative, vector, magnitude","Read 1 short engineering article (Engineering.com or IEEE Spectrum)","Write 3 sentences using today's vocabulary"]}}},
  {day:2,week:1,phase:1,title:"Prompt Techniques & Derivatives",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Study: zero-shot vs few-shot vs chain-of-thought prompting","Exercise: Write 10 prompts (2 per technique) in a notebook","Code: Python basics — variables, data types, print statements (1h)","n8n: Create first workflow: Manual Trigger → Set Node → Email","Debug: Intentionally break your n8n workflow; fix it"]},mech:{label:"Mechanics",hours:3,tasks:["Derivatives: Power rule — derive x³, x⁵, 3x²+2x+1 (10 problems)","Read: Scalar vs Vector quantities; unit vectors î, ĵ, k̂","Exercise: Resolve 5 force vectors into x and y components","Draw: Draw 3 basic objects (cube, cylinder, L-bracket) in front view"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: stress, strain, torque, equilibrium, constraint","Grammar: Review subject-verb agreement (15 min)","Prompt: Ask Claude to explain derivatives like you're 16"]}}},
  {day:3,week:1,phase:1,title:"Python Lists & FBD Basics",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: Lists, loops, functions — write a simple calculator function","Study: n8n nodes — HTTP Request, IF condition, Switch","Build: n8n workflow — fetch weather API → format → log to Google Sheet","Exercise: Write 5 system prompts for different AI assistant personas","Read: What is RAG? (15 min overview)"]},mech:{label:"Mechanics",hours:3,tasks:["Derivatives: Chain rule, product rule — 10 problems each","Read: Newton's 3 Laws; draw FBD of a block on a flat surface","Exercise: Draw FBD for 3 scenarios (inclined plane, hanging mass, pulley)","Practice: Find the resultant of two 2D force vectors"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: resultant, friction, normal force, coefficient, trajectory","Read: 1 Wikipedia article on Newton's Laws; write 5-line summary","Prompt: Rewrite yesterday's prompt to get a better, cleaner answer"]}}},
  {day:4,week:1,phase:1,title:"Webhooks & Integration Basics",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: Dictionaries, file I/O — read/write .txt and .json files","n8n: Study webhook nodes — create a webhook that receives POST data","Build: Webhook → parse JSON → send formatted Telegram/email notification","Study: Make.com — create free account, explore modules and triggers","Exercise: Compare n8n vs Make.com — write a 10-line comparison"]},mech:{label:"Mechanics",hours:3,tasks:["Integration: Understand as reverse of differentiation; antiderivative rules","Exercise: Evaluate 10 basic integrals (∫x², ∫sin x, ∫eˣ)","Engineering Drawing: Front, Top, Side views — draw a simple bracket","Read: Coplanar forces, concurrent forces — definitions and examples"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: automation, workflow, node, trigger, integration","Write: 1 paragraph (150 words) about why you are studying AI automation","Prompt: Write a prompt to summarize a technical paper in bullet points"]}}},
  {day:5,week:1,phase:1,title:"Claude API & Statics Intro",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: pip packages — install requests, pandas; read a CSV file","Study: Claude API basics — token, model parameters, temperature","Exercise: Write 3 API-style system+user prompt pairs","Make.com: Build first scenario — Gmail new email → create Google Doc","n8n: Add error handling to yesterday's webhook workflow"]},mech:{label:"Mechanics",hours:3,tasks:["Statics: Equilibrium conditions (ΣFx=0, ΣFy=0, ΣM=0)","Exercise: Solve 5 static equilibrium problems (beams, pin joints)","Engineering Drawing: Dimension lines, title blocks, scale notation","Practice: FBD of a beam with 3 forces — find reactions"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: concurrent, coplanar, equilibrium, reaction, support","Read: Engineering article from MIT News or IEEE","Speaking: Record yourself explaining Newton's 1st Law in 60 seconds"]}}},
  {day:6,week:1,phase:1,title:"pandas & Moments",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: pandas basics — create DataFrame, filter rows, compute stats","Study: Prompt patterns — persona, template, meta-prompt, output primer","Build: Make.com — RSS feed → filter keywords → send digest email","Exercise: Use Claude to debug a 20-line Python script with 3 planted bugs","Start Notion/GitHub portfolio page — add today's projects"]},mech:{label:"Mechanics",hours:3,tasks:["Calculus: Definite integrals — area under curve, 8 problems","Statics: Moment of a force — calculate moments about a point (5 problems)","Engineering Drawing: Isometric view basics — draw a cube isometrically","Review: Redo any FBD problems you found difficult this week"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: moment, torque, couple, pivot, fulcrum","Writing: Draft a short cover-letter intro (3 sentences) for a freelance gig","Review Week 1 vocabulary — quiz yourself on all 30 words"]}}},
  {day:7,week:1,phase:1,title:"Week 1 Review",isReview:true,blocks:{ai:{label:"AI Review",hours:5,tasks:["Re-open all 5 workflows built this week; explain each step","List 3 things that confused you; ask Claude for clarity","Python: Write a mini-script that reads a CSV and prints column averages","Update your Notion/GitHub portfolio with Week 1 projects"]},mech:{label:"Mech Review",hours:3,tasks:["Re-solve 3 FBD problems from scratch without notes","Re-draw the bracket (Day 4) from memory","Calculus: Speed-run 10 derivative + 5 integral problems (timed)","Identify 2 topics to revisit in Week 2"]},eng:{label:"Eng Review",hours:1,tasks:["Quiz: Write definitions for all 30 words learned (from memory)","Read an article and highlight 5 new words; look them up","Prompt Challenge: Write a single prompt that produces a perfect FBD explanation"]}}},
  {day:8,week:2,phase:1,title:"AI Agents & Trusses",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: Functions, *args, **kwargs; write reusable helper functions","n8n: Study Schedule Trigger, Cron jobs — automate daily data fetch","Build: Daily stock price fetcher → store in Google Sheet (n8n)","Study: What is an AI Agent? ReAct pattern, tool use, memory","Read: n8n documentation for Code Node (JS/Python execution)"]},mech:{label:"Mechanics",hours:3,tasks:["Calculus: Implicit differentiation — 8 problems","Statics: Truss analysis — method of joints; solve a 5-member truss","Engineering Drawing: Orthographic projections — 3-view drawing of L-bracket","Physics: Review unit conversions (N, kN, Pa, kPa, m, mm)"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: truss, joint, member, compression, tension","Read: Article on structural engineering (skim + 3-sentence summary)","Prompt: Write a prompt to generate 10 truss analysis problems"]}}},
  {day:9,week:2,phase:1,title:"Error Handling & Friction",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: Error handling — try/except, logging, assert statements","Make.com: Study HTTP module, JSON parse, data store","Build: Make.com — form submission (Typeform) → format → add to Airtable","Claude: Practice 'few-shot' prompting with examples for structured output","Exercise: Build a prompt that outputs JSON from unstructured text"]},mech:{label:"Mechanics",hours:3,tasks:["Integration: Applications — displacement from velocity, work from force","Problem set: 5 problems (area, displacement, work using ∫)","Engineering Drawing: Hidden lines, centre lines — redraw bracket","Statics: Friction problems — block on incline, 4 problems"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: displacement, velocity, acceleration, integral, convergence","Grammar: Passive voice in technical writing","Write: 1 paragraph explaining what you built today in simple English"]}}},
  {day:10,week:2,phase:1,title:"Regex & Centroids",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: String manipulation, regex basics — parse email addresses from text","n8n: Build a two-way sync: Airtable ↔ Google Sheets using webhooks","Study: Prompt security — prompt injection, jailbreak awareness","Exercise: Red-team 3 of your own prompts; find weaknesses","Build: Simple CLI chatbot in Python using Anthropic API"]},mech:{label:"Mechanics",hours:3,tasks:["Derivatives: Related rates — 6 problems (ladder, shadow, balloon)","Statics: Centroid of simple shapes (rectangle, triangle, semicircle)","Engineering Drawing: Dimensioning practice — dimension a stepped shaft","FBD: Solve a 3D force problem (basic); identify x, y, z components"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: centroid, shear, bending, deflection, stiffness","Prompt Engineering: Study chain-of-thought prompting; write 2 examples","Speaking: Record 90-sec explanation of what a centroid is"]}}},
  {day:11,week:2,phase:1,title:"APIs & Kinematics",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: List comprehensions, lambda functions, map/filter","Make.com: Iterator module, aggregator — process a list of items in a loop","Study: What is an API? REST vs GraphQL; HTTP verbs (GET/POST/PUT/DELETE)","Build: Python script that calls a free public API and processes the response","Exercise: Document your script with docstrings and comments"]},mech:{label:"Mechanics",hours:3,tasks:["Integration: Volumes of revolution (washer/disk method) — 4 problems","Dynamics intro: Kinematics — position, velocity, acceleration equations","Problem set: 5 kinematic problems (SUVAT equations, free fall)","Engineering Drawing: Section views — full section of a hollow cylinder"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: kinematics, dynamics, inertia, momentum, impulse","Read: 'How Bridges Are Designed' — any engineering blog article","Prompt: Write a 'teacher persona' prompt; ask it to explain kinematics"]}}},
  {day:12,week:2,phase:1,title:"OOP & Expense Tracker",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: OOP basics — create a class with __init__, methods, properties","n8n: Study database nodes — SQLite, MongoDB basics in n8n","Build: Expense tracker — Google Form → n8n → log to SQLite + weekly email","Upwork/Fiverr: Create accounts; browse AI automation gigs — note 5 top services","Portfolio: Write a project README for your expense tracker on GitHub"]},mech:{label:"Mechanics",hours:3,tasks:["Calculus: Optimization problems — maximize/minimize area, cost (5 problems)","Statics: Pin-jointed frames — method of sections (3 problems)","Engineering Drawing: Half-section and offset section views","Review: Re-do 5 problems you found hardest in Weeks 1–2"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: optimization, constraint, section, projection, scale","Write: 3-sentence bio for your Upwork/Fiverr freelancer profile","Prompt: Write a prompt that generates a professional project description"]}}},
  {day:13,week:2,phase:1,title:"Meeting Summarizer & Dynamics",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: File handling — read/write JSON, CSV, .env secrets","Make.com: Webhooks + custom app — build a Slack-to-task integration","Build: 'Meeting summarizer' — paste notes → Claude → structured action items","Study: What is a vector database? (Pinecone, Qdrant) — 30 min overview","GitHub: Push all Week 2 code; write a brief commit message for each"]},mech:{label:"Mechanics",hours:3,tasks:["Dynamics: Newton's 2nd Law problems — F=ma, 8 problems","Engineering Drawing: Isometric section view — pipe with flange","Statics: Distributed loads on beams (uniform, triangular) — 4 problems","Problem: A 500N block on 30° incline — full FBD + equilibrium check"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: distributed load, reaction, pin support, roller support, fixed support","Reading: Scan a research paper abstract; identify: problem, method, result","Prompt: Write a prompt that extracts key info from a paper abstract"]}}},
  {day:14,week:2,phase:1,title:"Week 2 Review",isReview:true,blocks:{ai:{label:"AI Review",hours:5,tasks:["Demo all 3 major workflows to yourself; identify any that break","Python: Write a script from scratch without notes (any small utility)","Reflect: What automation idea could solve a real problem for a local business?","Write: Week 2 progress update (5 sentences) for your portfolio"]},mech:{label:"Mech Review",hours:3,tasks:["Timed test: 10 calculus problems (5 derivatives, 5 integrals) — 45 min","Timed test: 5 FBD/statics problems — 45 min","Review Engineering Drawing: redraw Day 11 section view from memory","List topics for Week 3 focus"]},eng:{label:"Eng Review",hours:1,tasks:["Write: 1-paragraph summary of your 2 weeks of learning","Quiz: All 70 vocabulary words so far","Prompt: Write a 'chain-of-thought' prompt for an engineering problem"]}}},
  {day:15,week:3,phase:2,title:"Claude Code & Work-Energy",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Claude Code: Install Claude Code CLI; run first slash command","Study: How Claude Code works — context window, file editing, bash","Exercise: Use Claude Code to refactor a Python script (3 improvements)","n8n: Sub-workflows — split a large workflow into reusable child workflows","Build: n8n workflow — scrape webpage → extract text → summarize with Claude"]},mech:{label:"Mechanics",hours:3,tasks:["Calculus: Taylor series and approximations (intro) — 3 examples","Dynamics: Work done by constant force; Work-Energy theorem derivation","Problem set: 5 Work-Energy problems (block pushed up ramp, spring)","Engineering Drawing: Assembly drawing basics — 2-part assembly with fastener"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: refactor, abstraction, modular, scalable, reusable","Read: 'How Claude Code Works' blog or documentation (skim)","Prompt: Design a prompt template for code review with specific criteria"]}}},
  {day:16,week:3,phase:2,title:"OOP Advanced & Conservation",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: OOP advanced — inheritance, class methods, __str__, __repr__","Claude Code: Use it to write unit tests for a Python class","Make.com: Error handling — error routes, retry, filters, conditions","Build: Make.com — Smart contact form: classify intent → route to mailbox","Study: Prompt chaining — pass output of Prompt A as input to Prompt B"]},mech:{label:"Mechanics",hours:3,tasks:["Dynamics: Kinetic & Potential energy; conservation of energy (5 problems)","Engineering Drawing: Exploded view basics; label parts with balloons","Statics: 3D equilibrium — forces in x, y, z (2 problems)","Calculus: Integration by substitution — 8 problems"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: conservation, potential, kinetic, elastic, inelastic","Writing: Write a 200-word technical explanation of Work-Energy theorem","Prompt: Build a 3-step chain prompt to explain a concept at 3 difficulty levels"]}}},
  {day:17,week:3,phase:2,title:"HTTP Requests & Momentum",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: HTTP requests with 'requests' library — GET, POST, auth headers","n8n: OAuth2 authentication — connect n8n to Google Drive API","Build: Google Drive + n8n — when new file uploaded → extract name → log to Sheet","Claude Code: Open a project folder; ask Claude Code to explain the codebase","Exercise: Write a prompt that generates 10 n8n workflow ideas for freelance"]},mech:{label:"Mechanics",hours:3,tasks:["Momentum: Linear momentum, impulse-momentum theorem (5 problems)","Calculus: Integration by parts — 6 problems","Engineering Drawing: Detailed part drawing — draw a flanged pipe","FBD: Ladder against a wall — full analysis including friction"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: momentum, impulse, elastic collision, inelastic, coefficient of restitution","Read: Engineering article; annotate 3 key points in your notebook","Speaking: Record 2-min explanation of what AI automation is"]}}},
  {day:18,week:3,phase:2,title:"Telegram AI Agent & Collisions",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: Decorators and context managers — write a timing decorator","Make.com: LinkedIn post drafter (input topic → Claude → formatted post)","Study: n8n AI nodes — LangChain Agent, OpenAI Chat, memory buffer","Build: n8n AI agent — user sends Telegram message → agent responds using Claude","Portfolio: Document this agent project with screenshots in Notion"]},mech:{label:"Mechanics",hours:3,tasks:["Collisions: Elastic and inelastic; coefficient of restitution (4 problems)","Calculus: Partial derivatives (intro) — f(x,y) — 5 problems","Engineering Drawing: Sectional view of a stepped shaft with keyway","Statics: Shear force and bending moment diagram for simply supported beam"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: bending moment, shear force, simply supported, cantilever, deflection","Prompt: Write a 'structured output' prompt — force JSON with specific keys","Write: 1 email to a potential freelance client describing your automation service"]}}},
  {day:19,week:3,phase:2,title:"Async Python & Batch Workflows",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: Async programming basics — asyncio, aiohttp for parallel API calls","Claude Code: Build a small CLI tool — 'prompt_helper.py' that formats prompts","n8n: Merge node, batch processing — handle 100 rows from CSV in one workflow","Study: Zapier vs n8n vs Make.com — when to use each; pricing models","Build: Batch email personalizer — CSV of names → Claude → send personalized emails"]},mech:{label:"Mechanics",hours:3,tasks:["Dynamics: Circular motion — centripetal acceleration, angular velocity (4 problems)","Integration: Areas between curves — 5 problems","Engineering Drawing: Isometric drawing of a machine part (gear housing)","FBD problem set: 5 mixed problems (beams, pulleys, inclines) — timed 50 min"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: angular velocity, centripetal, radial, tangential, rotational","Read: Wikipedia article on 'Mechanical Engineering' — summarize in 5 bullets","Prompt: Write a meta-prompt that generates other prompts for a given task"]}}},
  {day:20,week:3,phase:2,title:"RAG & Rotational Kinematics",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: Environment variables, .env files, python-dotenv","Make.com: Build a 'content repurposing' pipeline — blog post → tweet thread + LinkedIn","Study: Retrieval-Augmented Generation (RAG) — architecture, use cases","Build: Simple RAG demo — load a PDF → chunk → search → answer questions","GitHub: Organize your repositories; add README and badges"]},mech:{label:"Mechanics",hours:3,tasks:["Rotation: Rotational kinematics — α, ω, θ equations","Calculus: Differential equations intro — order, degree, solving dy/dx = f(x)","Problem: Solve 5 first-order separable ODEs","Engineering Drawing: Perspective drawing basics; 1-point perspective"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: differential equation, separable, homogeneous, particular solution, boundary condition","Writing: Write a 150-word 'About Me' for a freelance profile","Prompt: Build a system prompt for a 'Mechanical Engineering Tutor' AI assistant"]}}},
  {day:21,week:3,phase:2,title:"Week 3 Review",isReview:true,blocks:{ai:{label:"AI Review",hours:5,tasks:["Open your Telegram AI agent (Day 18); add one new feature","Python challenge: Build a to-do list CLI app with file persistence","List 3 workflows you could sell on Fiverr right now; write descriptions","Review Claude Code outputs from this week; note best prompts"]},mech:{label:"Mech Review",hours:3,tasks:["Timed test: 5 Work-Energy-Momentum problems — 45 min","Re-draw the stepped shaft (Day 18) from memory with full dimensions","Re-solve 3 calculus problems (integration by parts) without notes","List weak areas; add to study queue"]},eng:{label:"Eng Review",hours:1,tasks:["Write a full paragraph about your biggest Week 3 achievement","Vocabulary quiz: all 105 words","Prompt: Share your best 3 prompts in a Notion 'Prompt Library'"]}}},
  {day:22,week:4,phase:2,title:"Web Scraping & ODEs",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: Web scraping with BeautifulSoup — scrape job titles from a public site","n8n: HTML extract node — parse scraped data; clean with Code Node","Study: Vector embeddings, cosine similarity — how semantic search works","Build: Job listing monitor — scrape site daily → filter keywords → alert via Telegram","Claude Code: Use to add features to your job monitor script"]},mech:{label:"Mechanics",hours:3,tasks:["Differential equations: First-order linear ODEs — integrating factor method","Problem set: 5 linear ODE problems","Engineering Drawing: Working drawing set — 3 views + dimensions + title block","Dynamics: Energy methods — virtual work principle (intro)"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: scrape, parse, filter, embed, semantic","Reading: Skim a research paper intro on robotics or AI; note 3 key claims","Prompt: Write a prompt for structured literature review extraction"]}}},
  {day:23,week:4,phase:2,title:"pandas Advanced & Reports",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: pandas advanced — groupby, pivot table, merge dataframes","Make.com: Data transformation — JSON → CSV → formatted report","Build: Monthly expense report generator — Google Sheet → Claude analysis → PDF","Study: AI prompt compression — max info into minimum tokens","Exercise: Take a 200-word prompt; compress to 80 words; compare outputs"]},mech:{label:"Mechanics",hours:3,tasks:["Differential equations: Second-order ODEs — homogeneous (char. equation)","Problem set: 4 second-order ODE problems (spring-mass system)","Statics: Stress and strain basics — normal stress σ = F/A (4 problems)","Engineering Drawing: Tolerance notation on a shaft-hole fit drawing"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: tolerance, stress, strain, deformation, elasticity","Write: Compare two engineering tools (n8n vs Make.com) in 200 words","Prompt: Build a 'prompt optimizer' — input a bad prompt, get improved version"]}}},
  {day:24,week:4,phase:2,title:"Data Visualization & Notion API",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: matplotlib + seaborn — create 3 charts from a dataset","n8n: Integrate with Notion API — create pages, update databases","Build: Daily study logger — Google Form → n8n → update Notion dashboard","Claude Code: Build a Python data visualization script for your study hours","Portfolio: Add data visualization project to Notion portfolio"]},mech:{label:"Mechanics",hours:3,tasks:["Statics: Bending stress σ = Mc/I — 4 problems with I-section beams","Calculus: Taylor expansion of sin(x), cos(x), eˣ — error estimation","Engineering Drawing: Bill of Materials (BOM) — add to an assembly drawing","FBD: Truss with 7 members — full method of joints solution"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: bending stress, neutral axis, moment of inertia, section modulus, beam","Speaking: Record 2-min video explaining your study logger project","Prompt: Write a prompt template for generating weekly progress reports"]}}},
  {day:25,week:4,phase:2,title:"FastAPI & Rotational Dynamics",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: FastAPI intro — create a simple REST API endpoint (GET + POST)","n8n: Connect n8n to your FastAPI endpoint; trigger from webhook","Make.com: Error notification system — if any scenario fails → send alert email","Build: Personal API — endpoint that returns your latest GitHub projects","Study: What is a chatbot? Intent, entities, slots — basic NLU concepts"]},mech:{label:"Mechanics",hours:3,tasks:["Differential equations: Non-homogeneous ODEs — undetermined coefficients","Problem set: 4 non-homogeneous ODE problems","Dynamics: Principle of work and energy for rotation (I·α)","Engineering Drawing: CAD intro — install FreeCAD (free); draw a 3D cube"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: endpoint, payload, request, response, API","Read: Medium article on 'Building APIs with FastAPI' — skim headings","Prompt: Write a prompt that generates a FastAPI route from plain English"]}}},
  {day:26,week:4,phase:2,title:"Pydantic & Laplace Transforms",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: Pydantic for data validation; use in your FastAPI app","Claude Code: Open your FastAPI project; ask Claude Code to add input validation","n8n: Database node — store webhook data in a PostgreSQL/Supabase table","Build: Contact form backend — HTML form → webhook → validate → store → auto-reply","Fiverr: Draft your first gig: 'I will build a custom n8n automation workflow'"]},mech:{label:"Mechanics",hours:3,tasks:["Dynamics: Angular momentum, conservation (3 problems)","Calculus: Laplace transform intro — definition, L{1}, L{t}, L{eᵃᵗ}","Problem: Solve 3 ODEs using Laplace transforms","Engineering Drawing: FreeCAD — extrude a 2D sketch into a 3D part"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: Laplace transform, s-domain, eigenvalue, characteristic, resonance","Writing: Rewrite your Fiverr gig description for maximum clarity and appeal","Prompt: Write a prompt that turns a bullet list into a compelling service description"]}}},
  {day:27,week:4,phase:2,title:"Client Onboarding & Combined Loading",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: subprocess module — run shell commands from Python","n8n: SSH node + Execute Command — run a script on a remote server","Make.com: Complete client onboarding (form → welcome email → Notion → Slack alert)","Study: Anthropic's prompt engineering guide — advanced techniques","Exercise: Write 5 'constrained output' prompts (specific word count, format, tone)"]},mech:{label:"Mechanics",hours:3,tasks:["Statics: Combined loading — beam with axial + bending + shear (1 full problem)","Differential equations: Systems of ODEs — introduction","Engineering Drawing: FreeCAD — create and dimension an L-bracket 3D model","Problem set: Mixed bag — 5 problems covering FBD + calculus + energy"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: combined loading, axial, transverse, lateral, longitudinal","Scholarship prep: Read a sample scholarship essay; identify its structure","Prompt: Write a 'scholarship application' persona prompt for Claude"]}}},
  {day:28,week:4,phase:2,title:"Week 4 Review",isReview:true,blocks:{ai:{label:"AI Review",hours:5,tasks:["Test all 4 major builds from Week 4; fix any broken parts","Python: Timed challenge — build a working script in 30 min from scratch","Review Fiverr/Upwork gig descriptions; refine based on competitor research","Update portfolio with Week 3–4 projects; ensure GitHub is clean"]},mech:{label:"Mech Review",hours:3,tasks:["Timed test: 10 mixed problems (calculus + statics + dynamics) — 60 min","FreeCAD: Redraw Day 27 L-bracket from memory","Differential equations: Solve 4 ODEs (mixed types) without notes","Identify 3 topics to deepen in Weeks 5–6"]},eng:{label:"Eng Review",hours:1,tasks:["Vocabulary test: all 140 words","Write: 2-paragraph project summary for your portfolio","Speaking: Record 3-min walk-through of your best automation project"]}}},
  {day:29,week:5,phase:3,title:"Smart Email Assistant",blocks:{ai:{label:"AI Automation",hours:5,tasks:["PROJECT: 'Smart Email Assistant' — Plan architecture","Build: Email inbox reader (Gmail API via n8n) → classify as: urgent/info/spam","Python: Write helper functions for email text cleaning","Claude: Design system prompt for email classification with few-shot examples","Portfolio: Create project page in Notion for Email Assistant"]},mech:{label:"Mechanics",hours:3,tasks:["Dynamics: Mechanical vibrations intro — free undamped vibration","ODE: Spring-mass equation mẍ + kx = 0; solve for x(t)","Engineering Drawing: Full drawing — shaft + bearing assembly (3 views + section)","Calculus: Fourier series intro — represent square wave as sum of sinusoids"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: vibration, damping, amplitude, frequency, resonance","Read: Engineering article on mechanical vibrations","Prompt: Design a prompt template for explaining physics problems step-by-step"]}}},
  {day:30,week:5,phase:3,title:"Email Assistant Testing",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Build: Add urgency scoring (1–5) using Claude; route urgent → Slack alert","n8n: Store all emails + classifications in Airtable with timestamps","Test: Send 20 test emails; check classification accuracy","Python: Write a script to evaluate classification results (accuracy %)","Debug: Find and fix at least 2 workflow errors"]},mech:{label:"Mechanics",hours:3,tasks:["Dynamics: Damped vibrations — overdamped, underdamped, critically damped","Problem: Given k=500 N/m, m=2 kg, c=40 Ns/m — classify and solve","Engineering Drawing: Tolerance stack-up exercise — 3-part assembly","Calculus: Numerical integration — trapezoidal rule, Simpson's rule (3 problems)"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: overdamped, underdamped, critical, natural frequency, period","Writing: Write a 250-word project description for the Email Assistant","Prompt: Build a prompt that generates test cases for an automation workflow"]}}},
  {day:31,week:5,phase:3,title:"Data Pipeline Automation",blocks:{ai:{label:"AI Automation",hours:5,tasks:["PROJECT 2: 'Data Pipeline Automation'","Build: n8n workflow — download CSV from URL → parse → calculate stats","Python: pandas — compute mean, median, std dev, trend for each column","Claude: Prompt that generates an executive summary from statistics","Portfolio: Add project plan to Notion"]},mech:{label:"Mechanics",hours:3,tasks:["Dynamics: Forced vibrations — steady-state response, magnification factor","Problem set: 3 forced vibration problems (varying excitation frequency)","Engineering Drawing: FreeCAD — fully constrained sketch with dimensions","Statics: Review all beam types; sketch SFD and BMD for 3 beam configurations"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: forced vibration, magnification, excitation, steady-state, transient","Summarize: Write an abstract (150 words) for your Data Pipeline project","Prompt: Format raw data stats into a readable executive summary"]}}},
  {day:32,week:5,phase:3,title:"Google Slides Auto-Generator",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Build: Google Slides auto-generator using Google Slides API + n8n","Make.com: Parallel processing — handle multiple CSV files simultaneously","Python: matplotlib — auto-generate bar chart + line chart saved as PNG","Portfolio: Write case study for Data Pipeline (problem → solution → result)","GitHub: Commit all new code with descriptive messages"]},mech:{label:"Mechanics",hours:3,tasks:["Mechanics of Materials: Torsion — τ = Tr/J; twist angle φ = TL/GJ (4 problems)","Calculus: Applications of ODE — RC circuit equation","Engineering Drawing: FreeCAD — create threaded bolt (use standard library part)","FBD: Complex frame — 2 members, pin joints, external load — full solution"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: torsion, shear modulus, polar moment, twist, shaft","Read: Abstract of a published engineering paper; rewrite in simpler language","Prompt: Build a 'case study writer' prompt with specific sections"]}}},
  {day:33,week:5,phase:3,title:"Social Content Scheduler",blocks:{ai:{label:"AI Automation",hours:5,tasks:["PROJECT 3: 'AI-Powered Social Content Scheduler'","Build: Make.com — topic input (Typeform) → Claude draft → Google Sheet queue","Python: Rate-limit-aware API caller with retry logic","Test: Generate a week of posts for a fake 'engineering tips' account","Portfolio: Add to Notion with screenshots"]},mech:{label:"Mechanics",hours:3,tasks:["Mechanics of Materials: Deflection of beams — double integration method","Problem: Find deflection at midspan for simply supported beam (UDL)","Engineering Drawing: Isometric drawing challenge — complex L-shaped part","ODE application: Beam deflection EI·y'' = M(x) — solve for y(x)"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: deflection, slope, curvature, elastic curve, boundary condition","Speaking: Record 3-min pitch: 'Here is a project I built and what it can do'","Prompt: Write a prompt that turns a bullet list into 7 engaging social posts"]}}},
  {day:34,week:5,phase:3,title:"Claude Code Intermediate",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Claude Code intermediate: use /add to add multiple files to context","Build: Refactor your Email Assistant into a clean Python package with modules","n8n: Add monitoring dashboard — track workflow run counts, errors, durations","Make.com: Scenario versioning — save a version before making changes","Exercise: Write 5 advanced prompts using XML-tag structuring"]},mech:{label:"Mechanics",hours:3,tasks:["Structural analysis: Statically indeterminate beams — compatibility equations","Calculus: Multiple integrals (intro) — double integral over rectangular region","Engineering Drawing: FreeCAD — assemble bolt + nut + washer as an assembly","Problem set: 5 combined stress problems (bending + torsion)"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: indeterminate, compatibility, redundant, superposition, integration","Write: A 300-word personal statement paragraph for a scholarship application","Prompt: Multi-turn prompt simulation — build a prompt conversation for interviews"]}}},
  {day:35,week:5,phase:3,title:"Halfway Checkpoint",isReview:true,blocks:{ai:{label:"AI Checkpoint",hours:5,tasks:["List all projects built (should be 6–8+ workflows)","Pick top 3; polish their README, screenshots, and case studies","Python: Code review all scripts; ensure clean formatting (PEP8 via flake8)","Freelance: Post your first Fiverr gig (or create draft if not ready)","Set Week 6–8 goals in writing"]},mech:{label:"Mech Checkpoint",hours:3,tasks:["Full timed test: 15 problems across all topics (60 min)","Review all Engineering Drawing exercises; identify weakest sketches","FreeCAD: Export a drawing sheet from your assembly model","List 3 ODE/calculus topics that need more practice"]},eng:{label:"Eng Checkpoint",hours:1,tasks:["Vocabulary: 175 words reviewed","Write: 1-page 'Learning Journey' reflection (what worked, what to improve)","Prompt Library: Review and improve your top 10 prompts"]}}},
  {day:36,week:6,phase:3,title:"Knowledge Base Bot",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Advanced n8n: Custom function nodes with full JS logic","Build: 'Knowledge Base Bot' — load 10 FAQ pairs → n8n + Claude answers queries","Python: SQLAlchemy basics — ORM to interact with SQLite/PostgreSQL","Make.com: Build multi-branch flow — user type A → path 1, type B → path 2","Study: Prompt injection attacks and defenses in production AI systems"]},mech:{label:"Mechanics",hours:3,tasks:["Heat Transfer intro: Conduction — Fourier's law q = -kA(dT/dx)","ODE: Steady-state heat equation for a fin — solve the BVP","Engineering Drawing: FreeCAD — create a 3D threaded socket with holes","Calculus: Partial differential equations intro — heat equation"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: conduction, convection, radiation, thermal, gradient","Read: Wikipedia on 'Mechanical Engineering curriculum' — note CUET-relevant subjects","Prompt: Write a prompt to generate a study plan for a specific topic"]}}},
  {day:37,week:6,phase:3,title:"Document Analyzer",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Build: 'Document Analyzer' — upload PDF → Claude extracts key info + summary","n8n: File handling — receive file attachment in webhook → process → store","Make.com: Google Drive → parse PDF → store extracted text in Notion","Claude Code: Build a PDF extraction CLI tool with argparse","Portfolio: Add Document Analyzer case study"]},mech:{label:"Mechanics",hours:3,tasks:["Fluid Mechanics intro: Pressure, Pascal's law, Bernoulli's equation","Problem: Water flows through pipe — calculate velocity using Bernoulli","Engineering Drawing: Pipe and fitting drawing with standard symbols","Calculus: Line integrals (intro) — work done by a force along a curve"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: fluid, pressure, viscosity, flow rate, turbulent","Writing: Write a 200-word technical blog intro about AI document processing","Prompt: 'Document analyst' system prompt with structured JSON output"]}}},
  {day:38,week:6,phase:3,title:"Deploy Email Assistant",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: Environment setup for deployment — Docker basics (Dockerfile, docker run)","Study: How to deploy n8n on a VPS (DigitalOcean/Railway) — read tutorial","Make.com: Webhook security — IP whitelisting, header authentication","Build: Deploy your Email Assistant to a free server (Railway or Render)","Portfolio: Update Notion with deployment details; add live demo link"]},mech:{label:"Mechanics",hours:3,tasks:["Dynamics: Gyroscopic motion and precession — conceptual + 1 problem","Calculus: Green's theorem and Stokes' theorem (conceptual overview)","Engineering Drawing: Full drawing set for a 3-part assembly in FreeCAD","ODE Review: Solve 5 mixed ODEs — first-order, second-order, Laplace"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: deploy, container, server, host, environment","Speaking: Record 4-min technical presentation on how your Email Assistant works","Prompt: Build a prompt to generate a deployment README for a project"]}}},
  {day:39,week:6,phase:3,title:"Testing & Eigenvalues",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: Unit testing with pytest — write tests for your helper functions","Claude Code: Let it generate tests for your Email Assistant codebase","n8n: Monitor workflow health — add SLA tracking","Make.com: Build an 'AI research assistant' — topic → search → Claude summary → email","Freelance: Search Upwork for AI automation jobs; analyze top 5 job descriptions"]},mech:{label:"Mechanics",hours:3,tasks:["Engineering Mathematics: Eigenvalues and eigenvectors — 3 examples","Application: Natural frequencies of a 2-DOF mass-spring system","Engineering Drawing: FreeCAD — drafting a worm gear from dimensions","FBD comprehensive: 3D space frame — identify all forces and moments"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: eigenvalue, eigenvector, matrix, determinant, natural mode","Writing: Write a Upwork proposal for an automation job description you found","Prompt: 'Proposal writer' — job description → professional Upwork proposal"]}}},
  {day:40,week:6,phase:3,title:"Week 6 Review",isReview:true,blocks:{ai:{label:"AI Review",hours:5,tasks:["Deploy at least 1 project publicly; share the link","Python: Refactor your best project; add comprehensive error handling","Review freelance strategy: what 1 service can you deliver in under 3 days?","Write: A 'services menu' doc listing your 3 core automation offerings"]},mech:{label:"Mech Review",hours:3,tasks:["Timed test: 12 problems — dynamics + ODE + drawing interpretation — 60 min","FreeCAD challenge: Model a component you designed from scratch","Calculus: Speed-run 10 mixed integral problems — 30 min","Identify your top 3 engineering drawing weaknesses"]},eng:{label:"Eng Review",hours:1,tasks:["Review all 200+ words; test yourself on the last 60","Draft scholarship essay: 'Why I chose Mechanical Engineering' (300 words)","Prompt Portfolio: Tag your prompts by category in Notion"]}}},
  {day:41,week:7,phase:4,title:"Lead Capture System",blocks:{ai:{label:"AI Automation",hours:5,tasks:["FREELANCE PROJECT: 'Client Lead Capture Automation System'","Build: Typeform webhook → n8n → Claude lead scoring → Pipedrive CRM entry","Python: Write a lead scoring algorithm (rule-based + Claude verification)","Fiverr/Upwork: Publish or refine your gig with this project as portfolio piece","Plan: Define inputs, outputs, n8n + Claude architecture diagram"]},mech:{label:"Mechanics",hours:3,tasks:["Differential Equations deep dive: Solving systems of ODEs (matrix method)","Application: 2-DOF vibration system — write and solve matrix ODE","Engineering Drawing: Full GD&T basics — straightness, flatness, roundness symbols","Calculus: Fourier transforms (intro) — frequency domain interpretation"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: qualify, prospect, pipeline, conversion, outreach","Writing: Write a client case study narrative for the lead system","Prompt: Build a 'lead qualifier' system prompt with scoring rubric"]}}},
  {day:42,week:7,phase:4,title:"Lead Capture — SMS & CRM",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Add SMS via Twilio — instant alert to sales team for high-score leads","Make.com: Parallel path — simultaneously update CRM and send Slack notification","Python: Build a dashboard script — print daily lead counts, avg score, top source","Test: Run 20 mock leads; review accuracy; refine Claude scoring prompt","Portfolio: Document Lead Capture System with screenshots"]},mech:{label:"Mechanics",hours:3,tasks:["Engineering Mechanics: Lagrangian mechanics intro — generalized coordinates","Problem: Derive equation of motion for a pendulum using Lagrangian method","Engineering Drawing: Complete a full drawing set (3 parts + assembly + BOM) in FreeCAD","ODE Review: Laplace transform method for second-order system"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: Lagrangian, generalized, constraint, degree of freedom, pendulum","Speaking: Record 5-min project walkthrough of the Lead Capture System","Prompt: Design a system prompt for a 'sales qualification assistant'"]}}},
  {day:43,week:7,phase:4,title:"FastAPI Wrapper & Beam Buckling",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: Build a REST API wrapper for your Lead Capture System using FastAPI","Claude Code: Add API documentation with docstrings → auto-generate OpenAPI spec","n8n: Add retry and circuit-breaker logic for all external API calls","Study: AI pricing strategies for freelancing (hourly vs project vs retainer)","Portfolio: Write a 400-word case study for the Lead Capture System"]},mech:{label:"Mechanics",hours:3,tasks:["Differential equations: Boundary value problems (BVP) — shooting method concept","Application: Beam buckling — Euler column formula Pcr = π²EI/L²","Engineering Drawing: Geometric tolerance application — position tolerance","Calculus: Numerical methods — Euler method for ODE (solve by hand, 5 steps)"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: buckling, critical load, slenderness ratio, column, Euler","Write: Technical presentation outline (5 slides) for your best project","Prompt: 'PowerPoint outline generator' — topic → slide-by-slide structure"]}}},
  {day:44,week:7,phase:4,title:"Self-Critique Prompts",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Advanced Claude prompting: Constitutional AI, self-critique, chain-of-verification","Exercise: Take a complex task; write a self-critique prompt chain (5 steps)","n8n: Version control — export all workflows to JSON; commit to GitHub","Make.com: Build a 'personal productivity assistant' — daily task emails + Pomodoro tracker","Freelance: Write 3 cold outreach messages for potential local clients"]},mech:{label:"Mechanics",hours:3,tasks:["Comprehensive problem: Full machine design problem (shaft under combined loading)","Engineering Drawing: FreeCAD — parametric model of a machine component","Calculus: Numerical methods — Runge-Kutta 4th order (concept + 1 worked example)","Review: Go through all ODE techniques; create a decision flowchart"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: parametric, constraint, feature, sketch, extrude","Scholarship: Write a 300-word statement of purpose for a hypothetical scholarship","Prompt: 'Scholarship essay editor' — paste draft → get feedback + improved version"]}}},
  {day:45,week:7,phase:4,title:"Streamlit Dashboard",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Python: Web app with Streamlit — build a frontend for your Lead Capture dashboard","Claude Code: Add a chat interface to your Streamlit app","n8n: Multi-tenant design — workflows that work for multiple 'clients' with config","Build: 'Universal webhook dispatcher' — one endpoint → route to right workflow","Portfolio: Record a 5-min screen-recording demo of your Streamlit dashboard"]},mech:{label:"Mechanics",hours:3,tasks:["Differential equations: Partial DEs — 1D wave equation intro","Engineering Drawing: Full CUET exam-style drawing problem (given problem + solve)","Calculus: Series solutions of ODEs — Frobenius method (1 example)","Dynamics: Energy method for finding natural frequencies (Rayleigh's method)"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: wave equation, propagation, boundary, standing wave, node","Speaking: Present your Lead Capture System in 7 minutes to a camera","Prompt: 'Streamlit UI description to code' — describe a UI, get working code"]}}},
  {day:46,week:7,phase:4,title:"Multi-Agent Architecture & FEA",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Study: Multi-agent architectures — orchestrator + worker agent pattern","Build: 2-agent system in n8n — Agent 1: research → Agent 2: write report","Python: Implement a simple agent loop (think → act → observe → repeat)","Make.com: Complex scenario with 15+ modules — 'event management pipeline'","Freelance: Apply to 3 AI automation jobs on Upwork (write tailored proposals)"]},mech:{label:"Mechanics",hours:3,tasks:["Engineering applications: Finite Element Analysis (FEA) concept — nodes, elements, DOF","FreeCAD FEM Workbench: Run a simple stress analysis on your L-bracket model","Calculus: Green's functions (concept) — solving PDEs with specific BCs","Engineering Drawing: Final comprehensive drawing exercise — multi-part assembly"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: finite element, mesh, node, DOF, simulation","Read: Article about FEA in engineering; write a 5-sentence summary","Prompt: 'Multi-agent task decomposer' — complex task → subtask list + agents"]}}},
  {day:47,week:7,phase:4,title:"Week 7 Review",isReview:true,blocks:{ai:{label:"AI Review",hours:5,tasks:["Demo your Lead Capture System to yourself as if presenting to a client","Python test: Build a working chatbot CLI in 45 min from scratch","Review all Upwork proposals sent; iterate based on results","GitHub: Ensure 3 repositories have polished README files with screenshots"]},mech:{label:"Mech Review",hours:3,tasks:["Timed comprehensive exam: 18 problems (all topics) — 90 min","FreeCAD: Create a new part from scratch — no reference","ODE marathon: 8 ODEs in 60 min (all types)","Identify 2 final topics to master before Day 60"]},eng:{label:"Eng Review",hours:1,tasks:["Full vocabulary test: all 235 words","Write: A 500-word blog post about AI automation for beginners","Prompt Mastery: Can you write a prompt that reliably produces perfect outputs?"]}}},
  {day:48,week:8,phase:4,title:"Capstone — Business Operations Suite",blocks:{ai:{label:"AI Automation",hours:5,tasks:["CAPSTONE: 'AI-Powered Business Operations Suite'","Architecture: Design system diagram (blocks, data flows, tools used)","Build: Module 1 — Lead intake form → qualify → CRM (refine from Week 7)","Claude Code: Create a project workspace; add all modules as subfolders","Plan: Define all 4 modules with inputs/outputs"]},mech:{label:"Mechanics",hours:3,tasks:["Differential equations comprehensive review: All types — 60 min timed (12 ODEs)","Engineering Drawing: Complete CUET-style drawing exam paper (3 questions — 90 min)","Calculus review: Integrals, derivatives, optimization, series — 20-problem sprint","Review: Any remaining weak topics"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: suite, modular, integrated, scalable, enterprise","Technical writing: Write an executive summary for your capstone project","Prompt: 'System architecture explainer' — describe a system, get plain-English summary"]}}},
  {day:49,week:8,phase:4,title:"Capstone — Email Triage Module",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Capstone Module 2: Email triage + auto-responder for routine queries","Build: Classify incoming email → if FAQ match → Claude drafts reply → human approves","Python: Build an approval queue (pending replies stored in Airtable)","n8n: Human-in-the-loop pattern — workflow pauses and waits for human approval","Test Module 2 with 30 simulated emails"]},mech:{label:"Mechanics",hours:3,tasks:["Engineering Mechanics: Comprehensive statics review","Problem: Bridge truss — 10 members, find all member forces","Engineering Drawing: FreeCAD — create a technical drawing sheet with all standard views","Application: Design a simple bracket — choose dimensions to satisfy stress limit"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: approval, escalate, triage, queue, protocol","Prompt: 'Email auto-responder' system prompt — write for 3 different business types","Writing: Update LinkedIn bio (or draft one) to reflect your new skills"]}}},
  {day:50,week:8,phase:4,title:"Capstone — Report Generator",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Capstone Module 3: Weekly report generator (analytics + narrative)","Build: Pull data from 3 sources → Claude writes narrative summary → format as PDF/Slides","Python: Build a report template filler using Jinja2","Make.com: Trigger report every Sunday 8 AM; email to stakeholder list","Test: Run report generator for a simulated 4-week dataset"]},mech:{label:"Mechanics",hours:3,tasks:["Mechanical Engineering breadth review: Thermodynamics — 1st and 2nd law statements","Manufacturing: Common processes — casting, forging, machining, welding (brief)","Engineering Drawing: Full drawing of a machined component with GD&T symbols","Calculus: Applications in heat transfer and fluid flow — 3 worked examples"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: thermodynamics, entropy, process, cycle, efficiency","Speaking: Record 6-min technical walkthrough of your capstone system","Prompt: 'Report narrative generator' — statistics input → compelling business narrative"]}}},
  {day:51,week:8,phase:4,title:"Capstone — Social Media Module",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Capstone Module 4: Social media content pipeline","Build: Weekly blog topic → research → Claude writes post → format → schedule","Python: Automate post formatting for LinkedIn, Twitter, Instagram","Claude Code: Add a 'tone checker' feature to ensure posts match brand voice","Integrate all 4 modules — test end-to-end with a complete week simulation"]},mech:{label:"Mechanics",hours:3,tasks:["Engineering Drawing: Final comprehensive exercise (exam simulation — 2 hrs)","ODE application: Model a real system (damped spring + force) — solve completely","Statics: 3D problem — space frame with 6 unknowns — solve completely","Topics: Orthographic, isometric, section, exploded, GD&T, FreeCAD export"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: tone, brand voice, engagement, content calendar, scheduling","Writing: Write a 400-word 'product description' for your Business Operations Suite","Prompt: 'Brand voice analyzer' — paste text → identify tone + suggestions"]}}},
  {day:52,week:8,phase:4,title:"Client Docs & Exam Sim #1",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Capstone: Client documentation package — user manual, setup guide, FAQ, pricing sheet","Python: Auto-generate markdown docs from your code docstrings","Portfolio site: Publish capstone project as featured case study","Upwork/Fiverr: Add capstone to your profile; update skills and bio","Write your 'AI Automation Services' one-page pitch document"]},mech:{label:"Mechanics",hours:3,tasks:["Pre-CUET exam simulation #1: Calculus 10 problems (40 min), Statics 6 problems (30 min), Dynamics 4 problems (20 min)","Review all answers; mark errors for Day 53 revision","Identify topics that need one final pass"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: documentation, manual, FAQ, onboarding, user experience","Prompt: Write a prompt that generates a FAQ section from a product description","Write: Draft a thank-you email template for a completed freelance project"]}}},
  {day:53,week:8,phase:4,title:"Mock Freelance Day & Exam Sim #2",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Mock freelance project: Treat yourself as a real client","Requirement: 'Build me an automation that saves 3 hours/week of manual work'","Plan → Build → Test → Document → Deliver (simulate full workflow in 5 hours)","Time yourself: Can you deliver professional quality in one working day?","Review: What took longest? What would you do differently?"]},mech:{label:"Mechanics",hours:3,tasks:["Pre-CUET exam simulation #2: Engineering Drawing 2 problems (60 min), Differential Equations 6 problems (40 min), FBD + Work-Energy 4 problems (30 min)","Review errors; mark topics for final revision"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: deliver, milestone, revision, feedback, approval","Scholarship: Finalize and polish your 500-word statement of purpose","Prompt: Final challenge — write a prompt that solves a complex real problem"]}}},
  {day:54,week:8,phase:4,title:"Final Portfolio Polish",blocks:{ai:{label:"AI Automation",hours:5,tasks:["GitHub: All repos have README, screenshot, live demo link","Notion: Portfolio has 5+ projects with case studies","Fiverr/Upwork: Profile 100% complete — photo, bio, skills, samples","Write your 'AI Automation Services' one-page pitch document","Record a 2-min profile video (or script) for your freelance profile"]},mech:{label:"Mechanics",hours:3,tasks:["FreeCAD: Export 5 technical drawings as PDF — your best work","Draw from memory: isometric + orthographic of a given part — 45 min each","Review all GD&T symbols; write example for each","Prepare a 'drawing notes cheat sheet' for CUET reference"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: portfolio, testimonial, deliverable, scope, retainer","Write: 3 LinkedIn posts about your 60-day learning journey","Prompt: 'LinkedIn post writer' — personal achievement → professional narrative"]}}},
  {day:55,week:8,phase:4,title:"Prompt Testing Harness",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Advanced prompt mastery: LLM fine-tuning concepts (theory only)","Study: Constitutional AI, RLHF, system prompt best practices for production","Build: 'Prompt testing harness' — run same task with 10 different prompts; compare","Python: Automate prompt A/B testing; log results to CSV + score with LLM judge","Document: Your top 20 prompts with labels, use cases, and output examples"]},mech:{label:"Mechanics",hours:3,tasks:["CUET prep — Calculus final review: Speed test 15 derivative + 10 integral problems (45 min)","Taylor series: Expand 3 functions around x=0","ODE: Solve 6 problems (mixed) — 40 min","Graph: Sketch solutions to 3 ODEs (qualitative understanding)"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: fine-tuning, constitutional, alignment, inference, benchmark","Speaking: Record a 7-min 'AI Automation for Engineers' mini-lecture","Prompt: Write the most refined version of your 'Mechanical Engineering Tutor' prompt"]}}},
  {day:56,week:8,phase:4,title:"Prompt Library App",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Build: 'Prompt Library web app' with Streamlit — search, filter, copy prompts","Python: Add prompt categories, tags, and rating system to the app","Claude Code: Full session — let Claude Code review and improve the Streamlit app","Deploy: Deploy the Prompt Library to Streamlit Community Cloud (free)","Share: Post your Prompt Library link in a relevant community (Reddit, Discord)"]},mech:{label:"Mechanics",hours:3,tasks:["CUET prep — Mechanics final review: Statics 8 problems (50 min), Dynamics 6 problems (40 min)","Combined: 3 problems requiring calculus + mechanics integration (30 min)","Self-grade everything; note remaining weak points"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: deploy, community, share, open-source, contribution","Writing: Write a technical post: '5 AI Automation Tools Every Engineer Should Know'","Prompt: Final prompt challenge — generate a full study plan from a topic description"]}}},
  {day:57,week:8,phase:4,title:"Catch-Up & Deep Dive",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Catch up day OR explore one new tool you are curious about","Option A: Try LangChain (Python) — build a basic document Q&A chain","Option B: Explore Flowise (visual LangChain) — build a PDF chatbot without code","Option C: Deep dive into Make.com AI modules — build an advanced scenario","GitHub: Final commit and push for all projects; ensure no broken files"]},mech:{label:"Mechanics",hours:3,tasks:["Engineering Drawing: Draw 3 complex problems from a past engineering textbook","Calculus: Work through a full Chapter Review (integrals, series, ODEs)","ODE comprehensive: 10 problems, all types, 60 min timed","FBD: 5 challenging problems — check answers and understand errors"]},eng:{label:"English & Prompting",hours:1,tasks:["Learn 5 words: (choose 5 words from any engineering field you find interesting)","Read: An article about a CUET mechanical engineering research project","Prompt: Refine your best 5 prompts; add them to your Prompt Library app"]}}},
  {day:58,week:8,phase:4,title:"Final Review & Synthesis",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Final AI review: Can you explain LLMs, n8n, and prompt engineering clearly?","Can you build: A working automation in under 2 hours?","Can you sell: Do you have a portfolio and gig ready?","Write: 'My AI Automation Skills Summary' — 1-page document","Reflect: What will you continue building during your first semester at CUET?"]},mech:{label:"Mechanics",hours:3,tasks:["Final review: Can you solve any FBD problem including 3D?","Can you draw: Full technical drawing with GD&T in FreeCAD?","Write: 'Mechanics Cheat Sheet' — 2 pages covering all key formulas","Reflect: Which CUET subjects will be easiest/hardest based on your prep?"]},eng:{label:"English & Prompting",hours:1,tasks:["Vocabulary log: 290 words collected over 60 days","Can you write: A professional email, cover letter, project summary?","Write: Final reflection: 'What I will bring to CUET on Day 1'","Prompt Mastery: You have a personal Prompt Library with 20+ tested prompts"]}}},
  {day:59,week:8,phase:4,title:"Final Showcase Prep",blocks:{ai:{label:"AI Automation",hours:5,tasks:["Select your 3 best projects for a final demo","Prepare a 10-min presentation (slides or demo walkthrough)","Record yourself presenting each project — watch it back critically","Polish GitHub profile: profile README, pinned repos","Set 30-day post-CUET goals: freelancing, new tools, first income target"]},mech:{label:"Mechanics",hours:3,tasks:["FINAL EXAM SIMULATION: Full 3-hour engineering paper","Calculus: 5 problems, Mechanics: 8 problems, Drawing: 2 problems","No notes allowed — simulate real exam conditions","Grade yourself honestly; write a score out of 100"]},eng:{label:"English & Prompting",hours:1,tasks:["Write a 500-word cover letter for a prestigious engineering scholarship","Record a 5-min video: 'My 60-day journey to CUET'","Final prompt: Write the best prompt you have ever written"]}}},
  {day:60,week:8,phase:4,title:"Graduation Day! 🎓",isGraduation:true,blocks:{ai:{label:"AI Graduation",hours:5,tasks:["Final showcase: Demo all 3 best projects (record for portfolio)","Celebrate: You are now an AI Automation Engineer with a live portfolio","Plan next 30 days: 1 freelance client, 2 new tool explorations, daily coding","Write a LinkedIn post: '60 days, 10+ projects, 1 goal — ready for CUET'","Thank yourself for showing up every day"]},mech:{label:"Mech Graduation",hours:3,tasks:["Review your Mechanics Cheat Sheet — your CUET survival guide","Open your FreeCAD models — print or save your best drawings","Re-solve Day 1 FBD problems — see how far you have come","Write: 'Engineering concepts I am confident in' vs 'Topics to continue'","You enter CUET ahead of 90% of your batch on fundamentals"]},eng:{label:"Eng Graduation",hours:1,tasks:["Count your vocabulary notebook — you have 300 new technical words","Re-read your Day 1 writing — compare to today's writing quality","Review your Prompt Library — you are now a prompt engineer","Set one 60-day English goal for your first semester at CUET","You are ready. Go build. Go learn. Go succeed. 🚀"]}}},
];

// ─── Main App Component ──────────────────────────────────────────
export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [progress, setProgress] = useState({});
  const [notes, setNotes] = useState({});
  const [view, setView] = useState("dashboard");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [aiFeedback, setAiFeedback] = useState({});
  const [loadingAI, setLoadingAI] = useState(false);
  const [startDate, setStartDate] = useState(null);

  const T = isDark ? THEMES.dark : THEMES.light;

  const save = useCallback(async (key, val) => {
    try { await window.storage.set(key, val); } catch (e) { console.warn("Storage save failed", e); }
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const p = await window.storage.get("prog_v3");
        if (p) setProgress(JSON.parse(p.value));
        const n = await window.storage.get("notes_v3");
        if (n) setNotes(JSON.parse(n.value));
        const s = await window.storage.get("start_v3");
        if (s) setStartDate(s.value);
        const f = await window.storage.get("aifb_v3");
        if (f) setAiFeedback(JSON.parse(f.value));
        const t = await window.storage.get("theme_v3");
        if (t) setIsDark(t.value === "dark");
      } catch (e) {
        console.warn("Error loading data", e);
      }
    }
    load();
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    save("theme_v3", next ? "dark" : "light");
  };

  const saveProgress = useCallback(async (np) => { setProgress(np); save("prog_v3", JSON.stringify(np)); }, [save]);
  const saveNotes = useCallback(async (nn) => { setNotes(nn); save("notes_v3", JSON.stringify(nn)); }, [save]);

  const toggleTask = useCallback(async (dayNum, block, idx) => {
    const k = `${dayNum}-${block}-${idx}`;
    const newProgress = { ...progress, [k]: !progress[k] };
    await saveProgress(newProgress);
  }, [progress, saveProgress]);

  const getCount = (dayNum) => {
    const d = DAYS_DATA[dayNum - 1]; if (!d) return { done: 0, total: 0 };
    let done = 0, total = 0;
    for (const [b, data] of Object.entries(d.blocks)) {
      total += data.tasks.length;
      data.tasks.forEach((_, i) => { if (progress[`${dayNum}-${b}-${i}`]) done++; });
    }
    return { done, total };
  };
  const getPct = (n) => { const { done, total } = getCount(n); return total > 0 ? Math.round(done / total * 100) : 0; };

  const totalTasks = DAYS_DATA.reduce((s, d) => s + Object.values(d.blocks).reduce((ss, b) => ss + b.tasks.length, 0), 0);
  const doneTasks = Object.values(progress).filter(Boolean).length;
  const daysComplete = DAYS_DATA.filter(d => getPct(d.day) === 100).length;
  const today = startDate ? Math.min(60, Math.max(1, Math.floor((Date.now() - new Date(startDate).getTime()) / 86400000) + 1)) : 1;

  const getAI = async (dayNum) => {
    setLoadingAI(true);
    const d = DAYS_DATA[dayNum - 1];
    const { done, total } = getCount(dayNum);
    const done_tasks = Object.entries(d.blocks).flatMap(([b, data]) =>
      data.tasks.filter((_, i) => progress[`${dayNum}-${b}-${i}`])
    );
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "YOUR_ANTHROPIC_API_KEY", // Replace with your key or set via env
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 900,
          system: `You are AAM's personal study coach. AAM (Md. Ashraful Alam Mazid) is a new CUET Mechanical Engineering student following a 60-day pre-campus preparation plan covering AI Automation (n8n, Make.com, Claude Code, Python), Engineering fundamentals, and English. He aims to earn freelance income. Be warm, direct, specific. Under 160 words. Use emojis naturally.`,
          messages: [{ role: "user", content: `Day ${dayNum} – "${d.title}" | ${done}/${total} tasks done (${Math.round(done/total*100)}%)\nCompleted: ${done_tasks.slice(0,4).join(" | ") || "None yet"}\nNotes: "${notes[dayNum] || "No notes"}"\nGive: 1) Progress assessment 2) Specific insight 3) Push for remaining 4) Tip for Day ${Math.min(60, dayNum + 1)}` }]
        })
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const text = data.content?.[0]?.text || "Keep going! Every task counts 💪";
      const nf = { ...aiFeedback, [dayNum]: { text, time: new Date().toLocaleString("en-BD") } };
      setAiFeedback(nf);
      save("aifb_v3", JSON.stringify(nf));
    } catch (err) {
      console.warn("AI feedback failed", err);
      const fallback = `Great work on Day ${dayNum}! ${done}/${total} tasks done. Stay consistent — you're building skills that will serve you for life! 🚀`;
      const nf = { ...aiFeedback, [dayNum]: { text: fallback, time: new Date().toLocaleString("en-BD") } };
      setAiFeedback(nf);
      save("aifb_v3", JSON.stringify(nf));
    }
    setLoadingAI(false);
  };

  const pc = (pid) => PHASES[pid - 1]?.color || "#3B82F6";
  const BM = {
    ai:   { icon: "🤖", color: "#3B82F6", label: "AI Automation" },
    mech: { icon: "⚙️", color: "#10B981", label: "Mechanics" },
    eng:  { icon: "🗣️", color: "#F59E0B", label: "English & Prompting" },
  };

  const card = (extra = {}) => ({
    background: T.surface, border: `1px solid ${T.border}`,
    borderRadius: "14px", ...extra,
  });

  // Task Resource Page
  if (view === "task" && selectedTask) {
    const { task, block, idx, dayNum } = selectedTask;
    const resources = getResources(task);
    const bm = BM[block] || BM.ai;
    const isDone = !!progress[`${dayNum}-${block}-${idx}`];

    return (
      <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "'Outfit', sans-serif", color: T.text }}>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: "14px 18px", position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", gap: "12px" }}>
          <button onClick={() => setView("day")} style={{ background: T.card, border: `1px solid ${T.border2}`, color: T.textSub, padding: "8px 16px", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", fontSize: "15px" }}>← Back</button>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div style={{ fontSize: "12px", color: T.textMuted }}>{bm.icon} {bm.label} · Day {dayNum}</div>
            <div style={{ fontSize: "15px", fontWeight: "600", color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{task}</div>
          </div>
          <button onClick={toggleTheme} style={{ background: T.toggle, border: `1px solid ${T.border}`, borderRadius: "8px", padding: "6px 10px", cursor: "pointer", fontSize: "18px" }} title={T.toggleTip}>{T.toggleIcon}</button>
        </div>

        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "20px 16px 40px" }}>
          <div onClick={() => toggleTask(dayNum, block, idx)} style={{ ...card({ marginBottom: "18px", border: `2px solid ${isDone ? bm.color + "88" : T.border}`, background: isDone ? bm.color + "0D" : T.surface, cursor: "pointer", padding: "18px 20px", display: "flex", gap: "14px", alignItems: "flex-start" })}>
            <div style={{ width: "26px", height: "26px", borderRadius: "8px", border: `2.5px solid ${isDone ? bm.color : T.border2}`, background: isDone ? bm.color : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", marginTop: "2px" }}>
              {isDone && <span style={{ color: "white", fontSize: "13px", fontWeight: "800" }}>✓</span>}
            </div>
            <div>
              <div style={{ fontSize: "17px", fontWeight: "600", color: T.text, lineHeight: "1.5", marginBottom: "4px" }}>{task}</div>
              <div style={{ fontSize: "13px", color: isDone ? bm.color : T.textMuted }}>{isDone ? "✅ Completed! Tap to undo." : "Tap to mark complete"}</div>
            </div>
          </div>

          {resources.length > 0 ? (
            <>
              <div style={{ fontSize: "13px", fontWeight: "700", color: T.textMuted, letterSpacing: "2px", marginBottom: "12px", textTransform: "uppercase" }}>📚 LEARNING RESOURCES ({resources.length})</div>
              {resources.map((r, i) => {
                const tc = TYPE_CONFIG[r.type] || TYPE_CONFIG.website;
                return (
                  <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                    style={{ ...card({ marginBottom: "10px", padding: "16px 18px", display: "flex", gap: "14px", alignItems: "flex-start", textDecoration: "none", transition: "all 0.2s" }) }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = tc.color; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: isDark ? tc.darkBg : tc.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: "20px" }}>{tc.icon}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                        <span style={{ background: isDark ? tc.darkBg : tc.bg, color: tc.color, fontSize: "11px", fontWeight: "700", padding: "2px 8px", borderRadius: "20px" }}>{tc.label.toUpperCase()}</span>
                      </div>
                      <div style={{ fontSize: "15px", fontWeight: "600", color: T.text, lineHeight: "1.4", marginBottom: r.note ? "4px" : "0" }}>{r.title}</div>
                      {r.note && <div style={{ fontSize: "12px", color: T.textMuted, fontStyle: "italic" }}>💡 {r.note}</div>}
                    </div>
                    <span style={{ color: T.textMuted, fontSize: "18px", flexShrink: 0 }}>↗</span>
                  </a>
                );
              })}
            </>
          ) : (
            <div style={{ ...card({ padding: "28px", textAlign: "center", marginBottom: "18px" }) }}>
              <div style={{ fontSize: "36px", marginBottom: "10px" }}>📝</div>
              <div style={{ fontSize: "17px", fontWeight: "600", color: T.text, marginBottom: "8px" }}>Practice Task</div>
              <div style={{ fontSize: "15px", color: T.textMuted, lineHeight: "1.7", marginBottom: "16px" }}>This is a practice or review task. Use what you've already learned. If stuck, ask Claude directly!</div>
              <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#7C3AED", color: "white", padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontWeight: "700", fontSize: "15px" }}>Ask Claude for Help →</a>
            </div>
          )}

          <button onClick={() => { toggleTask(dayNum, block, idx); setView("day"); }}
            style={{ width: "100%", background: isDone ? T.card : bm.color, color: isDone ? T.textMuted : "white", border: `2px solid ${isDone ? T.border2 : bm.color}`, padding: "16px", borderRadius: "12px", cursor: "pointer", fontFamily: "inherit", fontSize: "17px", fontWeight: "700", marginTop: "8px", transition: "all 0.2s" }}>
            {isDone ? "✓ Completed — Tap to Unmark" : "Mark as Complete ✓"}
          </button>
        </div>
      </div>
    );
  }

  // Day Page
  if (view === "day" && selectedDay) {
    const d = DAYS_DATA[selectedDay - 1];
    const pct = getPct(d.day);
    const { done, total } = getCount(d.day);
    const fb = aiFeedback[d.day];
    const phColor = pc(d.phase);

    return (
      <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "'Outfit', sans-serif", color: T.text }}>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: "14px 18px", position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button onClick={() => setView("dashboard")} style={{ background: T.card, border: `1px solid ${T.border2}`, color: T.textSub, padding: "8px 14px", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", fontSize: "15px" }}>← Home</button>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px", flexWrap: "wrap" }}>
                <span style={{ background: phColor, color: "white", padding: "2px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" }}>DAY {d.day}</span>
                {d.isReview && <span style={{ background: "#7C3AED", color: "white", padding: "2px 8px", borderRadius: "10px", fontSize: "11px" }}>📋 Review</span>}
                {d.isGraduation && <span style={{ background: "#F59E0B", color: "white", padding: "2px 8px", borderRadius: "10px", fontSize: "11px" }}>🎓 Graduation</span>}
              </div>
              <div style={{ fontSize: "17px", fontWeight: "700", color: T.text }}>{d.title}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "26px", fontWeight: "800", color: pct === 100 ? "#10B981" : phColor }}>{pct}%</div>
              <div style={{ fontSize: "11px", color: T.textMuted }}>{done}/{total}</div>
            </div>
            <button onClick={toggleTheme} style={{ background: T.toggle, border: `1px solid ${T.border}`, borderRadius: "8px", padding: "7px 10px", cursor: "pointer", fontSize: "18px", flexShrink: 0 }} title={T.toggleTip}>{T.toggleIcon}</button>
          </div>
          <div style={{ height: "5px", background: T.card, borderRadius: "3px", overflow: "hidden", marginTop: "10px" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "#10B981" : phColor, borderRadius: "3px", transition: "width 0.4s" }} />
          </div>
        </div>

        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "18px 16px 40px" }}>
          {Object.entries(d.blocks).map(([block, data]) => {
            const bm = BM[block] || BM.ai;
            return (
              <div key={block} style={{ ...card({ marginBottom: "16px", overflow: "hidden" }) }}>
                <div style={{ background: bm.color + (isDark ? "18" : "14"), borderBottom: `1px solid ${T.border}`, padding: "14px 18px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "22px" }}>{bm.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "16px", fontWeight: "700", color: T.text }}>{data.label}</div>
                    <div style={{ fontSize: "13px", color: T.textMuted }}>{data.hours} hours · {data.tasks.filter((_, i) => progress[`${d.day}-${block}-${i}`]).length}/{data.tasks.length} done</div>
                  </div>
                </div>
                {data.tasks.map((task, i) => {
                  const done = !!progress[`${d.day}-${block}-${i}`];
                  const hasRes = getResources(task).length > 0;
                  return (
                    <div key={i} style={{ borderBottom: `1px solid ${T.border}`, background: done ? bm.color + "0A" : "transparent" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 18px" }}>
                        <div onClick={() => toggleTask(d.day, block, i)}
                          style={{ width: "24px", height: "24px", borderRadius: "7px", border: `2px solid ${done ? bm.color : T.border2}`, background: done ? bm.color : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s", marginTop: "2px" }}>
                          {done && <span style={{ color: "white", fontSize: "13px", fontWeight: "800" }}>✓</span>}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "15px", color: done ? T.textMuted : T.text, lineHeight: "1.5", textDecoration: done ? "line-through" : "none", marginBottom: hasRes ? "8px" : 0 }}>{task}</div>
                          {hasRes && (
                            <button onClick={() => { setSelectedTask({ task, block, idx: i, dayNum: d.day }); setView("task"); }}
                              style={{ background: bm.color + "18", border: `1px solid ${bm.color}44`, color: bm.color, padding: "5px 14px", borderRadius: "20px", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                              📚 View Resources →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          <div style={{ ...card({ marginBottom: "16px", overflow: "hidden" }) }}>
            <div style={{ padding: "12px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ fontSize: "18px" }}>📝</span>
              <span style={{ fontSize: "16px", fontWeight: "700", color: T.text }}>My Notes — Day {d.day}</span>
            </div>
            <textarea value={notes[d.day] || ""} onChange={e => saveNotes({ ...notes, [d.day]: e.target.value })}
              placeholder="Write your reflections, wins, struggles from today..."
              style={{ width: "100%", minHeight: "88px", background: "transparent", border: "none", color: T.text, padding: "14px 18px", fontFamily: "inherit", fontSize: "15px", lineHeight: "1.6", resize: "vertical", outline: "none", boxSizing: "border-box" }} />
          </div>

          <div style={{ background: T.aiGrad, border: `1px solid ${T.aiBorder}`, borderRadius: "16px", padding: "18px", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", flexWrap: "wrap", marginBottom: fb ? "14px" : "0" }}>
              <div>
                <div style={{ fontSize: "16px", fontWeight: "700", color: T.text }}>🤖 AI Coach Feedback</div>
                <div style={{ fontSize: "13px", color: T.aiSub, marginTop: "2px" }}>Personalized progress analysis</div>
              </div>
              <button onClick={() => getAI(d.day)} disabled={loadingAI}
                style={{ background: "#7C3AED", color: "white", border: "none", padding: "10px 18px", borderRadius: "10px", cursor: loadingAI ? "not-allowed" : "pointer", fontFamily: "inherit", fontSize: "15px", fontWeight: "700", opacity: loadingAI ? 0.6 : 1 }}>
                {loadingAI ? "Analysing…" : fb ? "Refresh" : "Get Feedback"}
              </button>
            </div>
            {fb && (
              <div style={{ background: isDark ? "#2D1B6933" : "#EDE9FE", borderRadius: "10px", padding: "14px", border: `1px solid ${T.aiBorder}` }}>
                <div style={{ fontSize: "15px", color: T.aiText, lineHeight: "1.8", whiteSpace: "pre-wrap" }}>{fb.text}</div>
                <div style={{ fontSize: "11px", color: T.textMuted, marginTop: "8px" }}>Updated: {fb.time}</div>
              </div>
            )}
            {!fb && !loadingAI && <div style={{ textAlign: "center", padding: "10px 0 0", color: T.textMuted, fontSize: "14px" }}>Complete some tasks first, then get your AI coaching feedback! 👆</div>}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {d.day > 1 && <button onClick={() => setSelectedDay(d.day - 1)} style={{ flex: 1, background: T.surface, border: `1px solid ${T.border}`, color: T.textSub, padding: "14px", borderRadius: "12px", cursor: "pointer", fontFamily: "inherit", fontSize: "15px" }}>← Day {d.day - 1}</button>}
            {d.day < 60 && <button onClick={() => setSelectedDay(d.day + 1)} style={{ flex: 1, background: pc(DAYS_DATA[d.day]?.phase || d.phase) + "18", border: `1px solid ${pc(DAYS_DATA[d.day]?.phase || d.phase)}44`, color: pc(DAYS_DATA[d.day]?.phase || d.phase), padding: "14px", borderRadius: "12px", cursor: "pointer", fontFamily: "inherit", fontSize: "15px", fontWeight: "700" }}>Day {d.day + 1} →</button>}
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "'Outfit', sans-serif", color: T.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ background: T.heroBg, padding: "22px 18px 18px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
            <div>
              <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#7C3AED", fontWeight: "700", marginBottom: "6px", textTransform: "uppercase" }}>CUET Pre-Campus Roadmap</div>
              <h1 style={{ margin: 0, fontSize: "26px", fontWeight: "800", color: T.text, lineHeight: "1.2" }}>60-Day Master Tracker</h1>
              <p style={{ color: T.textMuted, fontSize: "14px", margin: "4px 0 0" }}>Md. Ashraful Alam Mazid · Mechanical Engineering</p>
            </div>
            <button onClick={toggleTheme}
              style={{ background: T.toggle, border: `1px solid ${T.border2}`, borderRadius: "12px", padding: "10px 14px", cursor: "pointer", fontSize: "20px", display: "flex", alignItems: "center", gap: "6px", flexShrink: 0, transition: "all 0.2s" }}
              title={T.toggleTip}>
              <span>{T.toggleIcon}</span>
              <span style={{ fontSize: "12px", color: T.textSub, fontFamily: "'Outfit',sans-serif", fontWeight: "600" }}>{isDark ? "Light" : "Dark"}</span>
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "8px", marginBottom: "14px" }}>
            {[
              { label: "Days Done", val: daysComplete, color: "#10B981" },
              { label: "Tasks Done", val: doneTasks, color: "#3B82F6" },
              { label: "Progress", val: `${Math.round(doneTasks / totalTasks * 100)}%`, color: "#8B5CF6" },
              { label: "Today", val: `D${today}`, color: "#F59E0B" },
            ].map(s => (
              <div key={s.label} style={{ background: T.statBg, border: `1px solid ${T.border}`, borderRadius: "12px", padding: "11px 8px", textAlign: "center" }}>
                <div style={{ fontSize: "21px", fontWeight: "800", color: s.color }}>{s.val}</div>
                <div style={{ fontSize: "11px", color: T.textMuted, marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ height: "7px", background: T.card, borderRadius: "4px", overflow: "hidden", marginBottom: "14px" }}>
            <div style={{ height: "100%", width: `${Math.round(doneTasks / totalTasks * 100)}%`, background: "linear-gradient(90deg,#3B82F6,#8B5CF6,#10B981)", borderRadius: "4px", transition: "width 0.5s" }} />
          </div>

          {!startDate ? (
            <button onClick={async () => { const d = new Date().toISOString(); setStartDate(d); save("start_v3", d); }}
              style={{ width: "100%", background: "#7C3AED", color: "white", border: "none", padding: "15px", borderRadius: "12px", cursor: "pointer", fontFamily: "inherit", fontSize: "17px", fontWeight: "700" }}>
              🚀 Start My Journey — Day 1 Begins Now
            </button>
          ) : (
            <button onClick={() => { setSelectedDay(today); setView("day"); }}
              style={{ width: "100%", background: "linear-gradient(135deg,#7C3AED,#3B82F6)", color: "white", border: "none", padding: "15px", borderRadius: "12px", cursor: "pointer", fontFamily: "inherit", fontSize: "17px", fontWeight: "700" }}>
              📅 Open Day {today}: {DAYS_DATA[today - 1]?.title} →
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "20px 16px 40px" }}>
        {PHASES.map(phase => {
          const pDays = DAYS_DATA.filter(d => d.phase === phase.id);
          const pTotal = pDays.reduce((s, d) => s + Object.values(d.blocks).reduce((ss, b) => ss + b.tasks.length, 0), 0);
          const pDone = pDays.reduce((s, d) => {
            return s + Object.values(d.blocks).reduce((ss, b, bi) => {
              const bk = Object.keys(d.blocks)[bi];
              return ss + b.tasks.filter((_, i) => progress[`${d.day}-${bk}-${i}`]).length;
            }, 0);
          }, 0);
          const pPct = pTotal > 0 ? Math.round(pDone / pTotal * 100) : 0;

          return (
            <div key={phase.id} style={{ marginBottom: "26px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div style={{ width: "4px", height: "38px", background: phase.color, borderRadius: "2px", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "17px", fontWeight: "700", color: T.text }}>{phase.weeks}: {phase.label}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                    <div style={{ flex: 1, height: "4px", background: T.card, borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pPct}%`, background: phase.color, transition: "width 0.5s" }} />
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: phase.color, minWidth: "38px", textAlign: "right" }}>{pPct}%</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(88px,1fr))", gap: "7px" }}>
                {pDays.map(d => {
                  const pct = getPct(d.day);
                  const isToday = d.day === today && !!startDate;
                  return (
                    <div key={d.day} onClick={() => { setSelectedDay(d.day); setView("day"); }}
                      style={{ background: isToday ? (isDark ? "linear-gradient(135deg,#1A1035,#2D1B69)" : "linear-gradient(135deg,#EDE9FE,#DDD6FE)") : T.surface, border: `2px solid ${isToday ? "#7C3AED" : pct === 100 ? phase.color + "88" : T.border}`, borderRadius: "12px", padding: "11px 8px", cursor: "pointer", transition: "all 0.2s", position: "relative", textAlign: "center" }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = phase.color; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = isToday ? "#7C3AED" : pct === 100 ? phase.color + "88" : T.border; }}>
                      {pct === 100 && <div style={{ position: "absolute", top: -1, right: -1, width: "18px", height: "18px", background: "#10B981", borderRadius: "0 10px 0 8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "white", fontSize: "10px" }}>✓</span>
                      </div>}
                      <div style={{ fontSize: "13px", fontWeight: "800", color: isToday ? "#7C3AED" : phase.color, marginBottom: "3px" }}>D{d.day}</div>
                      {isToday && <div style={{ fontSize: "9px", color: "#7C3AED", fontWeight: "700", marginBottom: "2px", letterSpacing: "1px" }}>TODAY</div>}
                      <div style={{ fontSize: "10px", color: T.textMuted, lineHeight: "1.3", marginBottom: "7px", minHeight: "26px" }}>{d.title.length > 16 ? d.title.slice(0, 14) + "…" : d.title}</div>
                      <div style={{ height: "3px", background: T.card, borderRadius: "2px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "#10B981" : phase.color, transition: "width 0.4s" }} />
                      </div>
                      <div style={{ fontSize: "10px", color: T.textMuted, marginTop: "3px" }}>{pct}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div style={{ ...card({ padding: "16px 18px" }) }}>
          <div style={{ fontSize: "13px", fontWeight: "700", color: T.textMuted, marginBottom: "12px", letterSpacing: "1px" }}>HOW TO USE</div>
          {[
            { icon: "📅", text: "Tap any day card to open that day's lesson" },
            { icon: "📚", text: "Tap 'View Resources' on any task to get videos, websites, free courses & docs" },
            { icon: "✅", text: "Tap the checkbox to mark a task complete" },
            { icon: "🤖", text: "Get personalized AI coaching feedback after completing tasks" },
            { icon: "📝", text: "Write daily notes to remember your wins and struggles" },
            { icon: isDark ? "☀️" : "🌙", text: `Tap the ${isDark ? "☀️ Light" : "🌙 Dark"} button (top right) to switch theme` },
          ].map((item, i, arr) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 0", borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none" }}>
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              <span style={{ fontSize: "15px", color: T.textSub }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
