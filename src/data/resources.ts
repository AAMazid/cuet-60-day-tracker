export type ResourceType = "video" | "article" | "docs" | "course" | "pdf" | "website" | "tool";

export interface Resource {
  title: string;
  url: string;
  type: ResourceType;
  note?: string;
}

interface TopicResources {
  keywords: string[];
  resources: Resource[];
}

const TOPIC_MAP: TopicResources[] = [
  // ── LLMs / How LLMs work ──────────────────────────────────────────────────
  {
    keywords: ["llm", "how llms work", "karpathy", "language model"],
    resources: [
      { title: "Intro to Large Language Models – Andrej Karpathy", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g", type: "video", note: "The exact video recommended in the roadmap" },
      { title: "But what is a GPT? – 3Blue1Brown", url: "https://www.youtube.com/watch?v=wjZofJX0v4M", type: "video", note: "Visual deep-dive into transformers" },
      { title: "What is ChatGPT doing? – Stephen Wolfram", url: "https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/", type: "article" },
    ],
  },
  // ── Python Install / Setup ────────────────────────────────────────────────
  {
    keywords: ["install: python", "vs code", "virtual environment", "python 3.11"],
    resources: [
      { title: "Python Download Page", url: "https://www.python.org/downloads/", type: "website" },
      { title: "VS Code Python Setup Guide", url: "https://code.visualstudio.com/docs/python/python-tutorial", type: "docs" },
      { title: "Python Virtual Environments – Real Python", url: "https://realpython.com/python-virtual-environments-a-primer/", type: "article" },
    ],
  },
  // ── Prompt Engineering (general) ──────────────────────────────────────────
  {
    keywords: ["prompt engineering", "zero-shot", "few-shot", "chain-of-thought", "role-context-task", "prompt pattern", "meta-prompt", "output primer", "system prompt", "prompt", "prompting"],
    resources: [
      { title: "Anthropic Prompt Engineering Guide", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", type: "docs", note: "Official – most up-to-date" },
      { title: "Prompt Engineering Guide (Dair.ai)", url: "https://www.promptingguide.ai/", type: "website" },
      { title: "OpenAI Prompt Engineering Best Practices", url: "https://platform.openai.com/docs/guides/prompt-engineering", type: "docs" },
      { title: "Learn Prompting", url: "https://learnprompting.org/", type: "course" },
    ],
  },
  // ── n8n ──────────────────────────────────────────────────────────────────
  {
    keywords: ["n8n"],
    resources: [
      { title: "n8n Official Documentation", url: "https://docs.n8n.io/", type: "docs" },
      { title: "n8n YouTube Channel (Tutorials)", url: "https://www.youtube.com/@n8n-io", type: "video" },
      { title: "n8n Cloud (Free Account)", url: "https://app.n8n.cloud/", type: "tool" },
      { title: "n8n Community Forum", url: "https://community.n8n.io/", type: "website" },
    ],
  },
  // ── Make.com ─────────────────────────────────────────────────────────────
  {
    keywords: ["make.com", "make scenario", "make:"],
    resources: [
      { title: "Make.com Official Documentation", url: "https://www.make.com/en/help", type: "docs" },
      { title: "Make.com YouTube Tutorials", url: "https://www.youtube.com/@Make", type: "video" },
      { title: "Make Academy (Free Courses)", url: "https://www.make.com/en/academy", type: "course" },
    ],
  },
  // ── Claude / Anthropic API ────────────────────────────────────────────────
  {
    keywords: ["claude api", "claude code", "anthropic api", "token", "temperature", "model parameter"],
    resources: [
      { title: "Anthropic API Documentation", url: "https://docs.anthropic.com/", type: "docs" },
      { title: "Claude Code Documentation", url: "https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview", type: "docs" },
      { title: "Anthropic Cookbook (Examples)", url: "https://github.com/anthropics/anthropic-cookbook", type: "website" },
    ],
  },
  // ── Python Basics ─────────────────────────────────────────────────────────
  {
    keywords: ["python: variables", "python: lists", "python: dictionaries", "python: functions", "python basics", "python: string", "python: file", "print statements", "data types", "code: python"],
    resources: [
      { title: "Python Official Tutorial", url: "https://docs.python.org/3/tutorial/", type: "docs" },
      { title: "CS50P – Python (Harvard, Free)", url: "https://cs50.harvard.edu/python/2022/", type: "course", note: "Best free Python course" },
      { title: "Corey Schafer – Python Tutorials (YouTube)", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTskrapNbzXhwoFUiLCjGgY7", type: "video" },
      { title: "Real Python – Beginners Guide", url: "https://realpython.com/python-first-steps/", type: "article" },
    ],
  },
  // ── Python OOP ────────────────────────────────────────────────────────────
  {
    keywords: ["oop", "class", "__init__", "inheritance", "object-oriented", "oop basics", "oop advanced"],
    resources: [
      { title: "Python OOP – Real Python", url: "https://realpython.com/python3-object-oriented-programming/", type: "article" },
      { title: "Corey Schafer – OOP Playlist (YouTube)", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc", type: "video" },
      { title: "Python OOP Official Docs", url: "https://docs.python.org/3/tutorial/classes.html", type: "docs" },
    ],
  },
  // ── Python pandas ─────────────────────────────────────────────────────────
  {
    keywords: ["pandas", "dataframe", "csv"],
    resources: [
      { title: "pandas Official Documentation", url: "https://pandas.pydata.org/docs/getting_started/index.html", type: "docs" },
      { title: "pandas Tutorial – Real Python", url: "https://realpython.com/pandas-python-explore-dataset/", type: "article" },
      { title: "pandas in 10 min – YouTube (Corey Schafer)", url: "https://www.youtube.com/watch?v=vmEHCJofslg", type: "video" },
    ],
  },
  // ── Python requests / HTTP ────────────────────────────────────────────────
  {
    keywords: ["requests library", "http request", "get, post", "api call", "python: http"],
    resources: [
      { title: "requests Library Docs", url: "https://docs.python-requests.org/en/latest/", type: "docs" },
      { title: "HTTP Requests in Python – Real Python", url: "https://realpython.com/python-requests/", type: "article" },
      { title: "Working with REST APIs in Python – YouTube", url: "https://www.youtube.com/watch?v=tb8gHvYlCFs", type: "video" },
    ],
  },
  // ── FastAPI ───────────────────────────────────────────────────────────────
  {
    keywords: ["fastapi", "rest api endpoint", "pydantic"],
    resources: [
      { title: "FastAPI Official Documentation", url: "https://fastapi.tiangolo.com/", type: "docs", note: "Excellent, beginner-friendly docs" },
      { title: "FastAPI Crash Course – YouTube (Traversy)", url: "https://www.youtube.com/watch?v=0sOvCWFmrtA", type: "video" },
      { title: "Python Type Hints & Pydantic", url: "https://docs.pydantic.dev/", type: "docs" },
    ],
  },
  // ── Streamlit ─────────────────────────────────────────────────────────────
  {
    keywords: ["streamlit"],
    resources: [
      { title: "Streamlit Official Documentation", url: "https://docs.streamlit.io/", type: "docs" },
      { title: "Streamlit Crash Course – YouTube", url: "https://www.youtube.com/watch?v=JwSS70SZdyM", type: "video" },
      { title: "Streamlit Gallery (Examples)", url: "https://streamlit.io/gallery", type: "website" },
    ],
  },
  // ── Docker ────────────────────────────────────────────────────────────────
  {
    keywords: ["docker", "dockerfile", "container"],
    resources: [
      { title: "Docker Official Getting Started", url: "https://docs.docker.com/get-started/", type: "docs" },
      { title: "Docker Tutorial for Beginners – YouTube (TechWorld)", url: "https://www.youtube.com/watch?v=3c-iBn73dDE", type: "video" },
    ],
  },
  // ── RAG ───────────────────────────────────────────────────────────────────
  {
    keywords: ["rag", "retrieval-augmented", "vector database", "pinecone", "qdrant", "embedding"],
    resources: [
      { title: "RAG Explained – IBM Technology (YouTube)", url: "https://www.youtube.com/watch?v=T-D1OfcDW1M", type: "video" },
      { title: "LangChain RAG Tutorial", url: "https://python.langchain.com/docs/tutorials/rag/", type: "docs" },
      { title: "What is RAG? – Pinecone", url: "https://www.pinecone.io/learn/retrieval-augmented-generation/", type: "article" },
    ],
  },
  // ── Web Scraping ─────────────────────────────────────────────────────────
  {
    keywords: ["beautifulsoup", "web scraping", "scrape"],
    resources: [
      { title: "BeautifulSoup Docs", url: "https://www.crummy.com/software/BeautifulSoup/bs4/doc/", type: "docs" },
      { title: "Web Scraping with Python – Real Python", url: "https://realpython.com/beautiful-soup-web-scraper-python/", type: "article" },
      { title: "Web Scraping Crash Course – YouTube (Corey Schafer)", url: "https://www.youtube.com/watch?v=ng2o98k983k", type: "video" },
    ],
  },
  // ── Calculus: Limits ──────────────────────────────────────────────────────
  {
    keywords: ["limit", "calculus basics", "x to 0", "x to infinity"],
    resources: [
      { title: "Limits – Khan Academy", url: "https://www.khanacademy.org/math/calculus-1/cs1-limits-and-continuity", type: "course", note: "Exactly as recommended in the roadmap" },
      { title: "Introduction to Limits – 3Blue1Brown (Essence of Calculus)", url: "https://www.youtube.com/watch?v=WUvTyaaNkzM", type: "video" },
      { title: "Limits – Paul's Online Math Notes", url: "https://tutorial.math.lamar.edu/Classes/CalcI/limitsIntro.aspx", type: "article" },
    ],
  },
  // ── Calculus: Derivatives ──────────────────────────────────────────────────
  {
    keywords: ["derivative", "power rule", "chain rule", "product rule", "implicit differentiation", "related rates"],
    resources: [
      { title: "Derivatives – Khan Academy", url: "https://www.khanacademy.org/math/calculus-1/cs1-derivatives-definition-and-basic-rules", type: "course" },
      { title: "Derivative Rules – 3Blue1Brown", url: "https://www.youtube.com/watch?v=S0_qX4VJhMQ", type: "video" },
      { title: "Chain Rule Explained – Professor Leonard (YouTube)", url: "https://www.youtube.com/watch?v=H-ybCx8gt-8", type: "video" },
      { title: "Derivatives – Paul's Online Math Notes", url: "https://tutorial.math.lamar.edu/Classes/CalcI/DerivativeIntro.aspx", type: "article" },
    ],
  },
  // ── Calculus: Integrals ────────────────────────────────────────────────────
  {
    keywords: ["integral", "antiderivative", "definite integral", "integration", "area under", "integration by parts", "integration by substitution"],
    resources: [
      { title: "Integrals – Khan Academy", url: "https://www.khanacademy.org/math/calculus-1/cs1-integrals", type: "course" },
      { title: "Integration and the Fundamental Theorem – 3Blue1Brown", url: "https://www.youtube.com/watch?v=rfG8ce4nNh0", type: "video" },
      { title: "Integration by Parts – Professor Leonard", url: "https://www.youtube.com/watch?v=jSB49a5AbGE", type: "video" },
      { title: "Paul's Online Math Notes – Integrals", url: "https://tutorial.math.lamar.edu/Classes/CalcI/IntegralsIntro.aspx", type: "article" },
    ],
  },
  // ── Calculus: Differential Equations ──────────────────────────────────────
  {
    keywords: ["differential equation", "ode", "first-order", "second-order", "laplace transform", "separable", "homogeneous", "undetermined coefficients", "dy/dx"],
    resources: [
      { title: "Differential Equations – Khan Academy", url: "https://www.khanacademy.org/math/differential-equations", type: "course" },
      { title: "MIT OCW – Differential Equations (18.03)", url: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/", type: "course", note: "Free MIT lectures" },
      { title: "Professor Leonard – Differential Equations Playlist", url: "https://www.youtube.com/playlist?list=PLDesaqWTN6ESPaHy2QUKVaXNZuQNxkYQ_", type: "video", note: "Best free video series for ODEs" },
      { title: "Paul's Online Math Notes – ODEs", url: "https://tutorial.math.lamar.edu/Classes/DE/DE.aspx", type: "article" },
    ],
  },
  // ── Calculus: Taylor Series / Fourier ─────────────────────────────────────
  {
    keywords: ["taylor series", "fourier series", "fourier transform"],
    resources: [
      { title: "Taylor Series – 3Blue1Brown", url: "https://www.youtube.com/watch?v=3d6DsjIBzJ4", type: "video" },
      { title: "Fourier Series – 3Blue1Brown", url: "https://www.youtube.com/watch?v=r6sGWTCMz2k", type: "video" },
      { title: "Taylor Series – Khan Academy", url: "https://www.khanacademy.org/math/calculus-bc/bc-series-new/bc-10-14/v/maclaurin-and-taylor-series-intuition", type: "course" },
    ],
  },
  // ── Statics: FBD ──────────────────────────────────────────────────────────
  {
    keywords: ["fbd", "free body diagram", "newton's 3 law", "newton's 2nd law", "fbd of a block", "draw fbd", "friction", "normal force", "resultant", "force vector", "equilibrium", "statics"],
    resources: [
      { title: "Free Body Diagrams – Khan Academy", url: "https://www.khanacademy.org/science/physics/forces-newtons-laws/newtons-laws-of-motion/a/what-is-a-force", type: "course" },
      { title: "Engineering Statics – Jeff Hanson (YouTube)", url: "https://www.youtube.com/playlist?list=PLMrMeBcqXCJHOmHxFXyB4i60oKBNQ4wVS", type: "video", note: "Highly recommended for CUET prep" },
      { title: "Statics – Dr. Structure (YouTube)", url: "https://www.youtube.com/playlist?list=PLO_JKNOhK1HHiSnnCuEBhJ8dQf8OWHG6C", type: "video" },
      { title: "Hibbeler Engineering Mechanics: Statics (14th Ed.) – Overview", url: "https://www.pearson.com/en-us/subject-catalog/p/engineering-mechanics-statics/P200000006738", type: "article", note: "Standard CUET textbook reference" },
    ],
  },
  // ── Statics: Truss Analysis ────────────────────────────────────────────────
  {
    keywords: ["truss", "method of joints", "method of sections"],
    resources: [
      { title: "Truss Analysis (Method of Joints) – YouTube", url: "https://www.youtube.com/watch?v=vNL3bbn1T0M", type: "video" },
      { title: "Method of Sections – YouTube", url: "https://www.youtube.com/watch?v=Ci_J0JZFZQA", type: "video" },
      { title: "Truss Problems – StructNotes", url: "https://structnotes.com/statics/trusses/", type: "article" },
    ],
  },
  // ── Statics: Bending Moment / Shear Force ─────────────────────────────────
  {
    keywords: ["bending moment", "shear force", "sfd", "bmd", "simply supported beam", "distributed load"],
    resources: [
      { title: "Shear Force & Bending Moment Diagrams – YouTube (Dr. Structure)", url: "https://www.youtube.com/watch?v=C-FEVzI8oe8", type: "video" },
      { title: "SFD & BMD Tutorial – Engineering Examples", url: "https://www.youtube.com/watch?v=ZaVM1CnQ5j4", type: "video" },
    ],
  },
  // ── Dynamics: Kinematics ──────────────────────────────────────────────────
  {
    keywords: ["kinematics", "suvat", "free fall", "position, velocity, acceleration", "angular velocity", "rotational kinematics", "circular motion", "centripetal"],
    resources: [
      { title: "Kinematics – Khan Academy", url: "https://www.khanacademy.org/science/physics/one-dimensional-motion", type: "course" },
      { title: "Engineering Dynamics – Jeff Hanson (YouTube)", url: "https://www.youtube.com/playlist?list=PLMrMeBcqXCJHzAg4yA6CyzVTf7Ge9IXKX", type: "video" },
      { title: "Rotational Kinematics – Khan Academy", url: "https://www.khanacademy.org/science/physics/torque-angular-momentum", type: "course" },
    ],
  },
  // ── Dynamics: Work Energy Momentum ────────────────────────────────────────
  {
    keywords: ["work-energy", "kinetic energy", "potential energy", "conservation of energy", "momentum", "impulse", "collision", "work done"],
    resources: [
      { title: "Work, Energy & Power – Khan Academy", url: "https://www.khanacademy.org/science/physics/work-and-energy", type: "course" },
      { title: "Momentum & Impulse – Khan Academy", url: "https://www.khanacademy.org/science/physics/linear-momentum", type: "course" },
      { title: "Work-Energy Theorem – Michel van Biezen (YouTube)", url: "https://www.youtube.com/watch?v=Ml8oCqXNPMM", type: "video" },
    ],
  },
  // ── Dynamics: Vibrations ──────────────────────────────────────────────────
  {
    keywords: ["vibration", "damping", "spring-mass", "overdamped", "underdamped", "natural frequency", "forced vibration", "resonance", "amplitude"],
    resources: [
      { title: "Mechanical Vibrations – NPTEL (Free Course)", url: "https://nptel.ac.in/courses/112106224", type: "course", note: "Free IIT lecture series" },
      { title: "Vibrations Intro – YouTube (Dr. Janak Raj Mistry)", url: "https://www.youtube.com/watch?v=JBnRE-qNhD4", type: "video" },
      { title: "Free Vibration – Wikipedia Reference", url: "https://en.wikipedia.org/wiki/Harmonic_oscillator", type: "article" },
    ],
  },
  // ── Mechanics of Materials ────────────────────────────────────────────────
  {
    keywords: ["stress", "strain", "torsion", "bending stress", "deflection", "moment of inertia", "section modulus", "shear modulus", "polar moment", "elasticity", "deformation"],
    resources: [
      { title: "Mechanics of Materials – NPTEL (Free)", url: "https://nptel.ac.in/courses/112107146", type: "course", note: "Free IIT course" },
      { title: "Mechanics of Materials – YouTube (Jeff Hanson)", url: "https://www.youtube.com/playlist?list=PLMrMeBcqXCJH7RCDe8sVFDFPvJ3aTlF3w", type: "video" },
      { title: "Stress & Strain – Khan Academy", url: "https://www.khanacademy.org/science/physics/discoveries/mechanical-waves-ap/stress-and-strain", type: "course" },
    ],
  },
  // ── Engineering Drawing ───────────────────────────────────────────────────
  {
    keywords: ["engineering drawing", "orthographic", "isometric", "section view", "exploded view", "gd&t", "freecad", "title block", "dimension", "hidden lines", "assembly drawing", "bom", "bill of materials"],
    resources: [
      { title: "Engineering Drawing – NPTEL (Free Course)", url: "https://nptel.ac.in/courses/112107214", type: "course", note: "Indian engineering curriculum – perfect for CUET" },
      { title: "FreeCAD Official Tutorials", url: "https://wiki.freecad.org/Tutorials", type: "docs" },
      { title: "Engineering Drawing Basics – YouTube (The Efficient Engineer)", url: "https://www.youtube.com/watch?v=IDtpQR5T9RM", type: "video" },
      { title: "Isometric Drawing – YouTube", url: "https://www.youtube.com/watch?v=EFLJi8HFP_U", type: "video" },
      { title: "GD&T Basics (Free Resource)", url: "https://www.gdandtbasics.com/", type: "website" },
    ],
  },
  // ── Heat Transfer / Fluid Mechanics ──────────────────────────────────────
  {
    keywords: ["heat transfer", "conduction", "fourier", "fluid mechanics", "bernoulli", "pressure", "viscosity", "flow rate", "convection", "radiation"],
    resources: [
      { title: "Heat Transfer – NPTEL (Free)", url: "https://nptel.ac.in/courses/112105123", type: "course" },
      { title: "Fluid Mechanics – NPTEL (Free)", url: "https://nptel.ac.in/courses/112104118", type: "course" },
      { title: "Bernoulli's Equation – Khan Academy", url: "https://www.khanacademy.org/science/physics/fluids/fluid-dynamics/a/what-is-bernoullis-equation", type: "course" },
    ],
  },
  // ── Lagrangian Mechanics ───────────────────────────────────────────────────
  {
    keywords: ["lagrangian", "generalized coordinate", "degree of freedom", "euler-lagrange"],
    resources: [
      { title: "Lagrangian Mechanics – YouTube (Michel van Biezen)", url: "https://www.youtube.com/watch?v=KpLno70oYHE", type: "video" },
      { title: "Classical Mechanics – MIT OCW (8.01)", url: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/", type: "course", note: "Free MIT lectures" },
    ],
  },
  // ── Eigenvalues / Linear Algebra ──────────────────────────────────────────
  {
    keywords: ["eigenvalue", "eigenvector", "matrix", "determinant", "linear algebra"],
    resources: [
      { title: "Eigenvalues & Eigenvectors – 3Blue1Brown", url: "https://www.youtube.com/watch?v=PFDu9oVAE-g", type: "video", note: "Best visual explanation" },
      { title: "Linear Algebra – MIT OCW (18.06)", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", type: "course" },
      { title: "Linear Algebra – Khan Academy", url: "https://www.khanacademy.org/math/linear-algebra", type: "course" },
    ],
  },
  // ── Upwork / Fiverr / Freelancing ─────────────────────────────────────────
  {
    keywords: ["upwork", "fiverr", "freelance", "gig", "profile", "proposal", "outreach"],
    resources: [
      { title: "Upwork Getting Started Guide", url: "https://www.upwork.com/resources/getting-started-on-upwork", type: "article" },
      { title: "Fiverr Academy", url: "https://www.fiverr.com/resources/guides/business/sell-on-fiverr", type: "article" },
      { title: "How to Land Your First Client – YouTube", url: "https://www.youtube.com/watch?v=3FmTgWHbU3E", type: "video" },
    ],
  },
  // ── GitHub / Portfolio ────────────────────────────────────────────────────
  {
    keywords: ["github", "readme", "portfolio", "notion", "git commit"],
    resources: [
      { title: "GitHub Docs – Getting Started", url: "https://docs.github.com/en/get-started", type: "docs" },
      { title: "How to Make a Great GitHub README – YouTube", url: "https://www.youtube.com/watch?v=E6NO0rgFub4", type: "video" },
      { title: "Notion Official Templates", url: "https://www.notion.so/templates", type: "website" },
    ],
  },
  // ── English / Technical Writing ───────────────────────────────────────────
  {
    keywords: ["grammar", "passive voice", "writing", "cover letter", "scholarship", "technical writing", "vocabulary", "speaking", "record yourself"],
    resources: [
      { title: "Grammarly Writing Tips", url: "https://www.grammarly.com/blog/category/writing-tips/", type: "website" },
      { title: "Technical Writing – Google (Free Course)", url: "https://developers.google.com/tech-writing", type: "course", note: "Free, beginner-friendly" },
      { title: "IEEE Spectrum (Engineering Articles)", url: "https://spectrum.ieee.org/", type: "website" },
      { title: "Engineering.com Articles", url: "https://www.engineering.com/", type: "website" },
    ],
  },
  // ── Research Papers / IEEE ────────────────────────────────────────────────
  {
    keywords: ["research paper", "abstract", "ieee", "paper", "mit news"],
    resources: [
      { title: "Google Scholar", url: "https://scholar.google.com/", type: "website", note: "Search for any engineering paper for free" },
      { title: "arXiv.org (Free Preprints)", url: "https://arxiv.org/", type: "website" },
      { title: "MIT News – Engineering", url: "https://news.mit.edu/topic/mitengineeringnews", type: "website" },
      { title: "IEEE Xplore", url: "https://ieeexplore.ieee.org/", type: "website" },
    ],
  },
  // ── Multi-agent / AI Agents ────────────────────────────────────────────────
  {
    keywords: ["ai agent", "react pattern", "multi-agent", "tool use", "memory", "agent loop", "orchestrator"],
    resources: [
      { title: "What are AI Agents? – IBM (YouTube)", url: "https://www.youtube.com/watch?v=F8NKVhkZZWI", type: "video" },
      { title: "ReAct: Reasoning + Acting – Paper", url: "https://react-lm.github.io/", type: "article" },
      { title: "Building AI Agents with LangChain", url: "https://python.langchain.com/docs/concepts/agents/", type: "docs" },
    ],
  },
  // ── Vector Embeddings ─────────────────────────────────────────────────────
  {
    keywords: ["vector embedding", "cosine similarity", "semantic search"],
    resources: [
      { title: "Word Embeddings – 3Blue1Brown (YouTube)", url: "https://www.youtube.com/watch?v=wgfSDrqYMJ4", type: "video" },
      { title: "Embeddings Guide – OpenAI", url: "https://platform.openai.com/docs/guides/embeddings", type: "docs" },
    ],
  },
  // ── Pytest / Unit Testing ─────────────────────────────────────────────────
  {
    keywords: ["pytest", "unit test", "testing"],
    resources: [
      { title: "pytest Official Docs", url: "https://docs.pytest.org/en/stable/", type: "docs" },
      { title: "Pytest Tutorial – Real Python", url: "https://realpython.com/pytest-python-testing/", type: "article" },
    ],
  },
  // ── SQLAlchemy / Databases ────────────────────────────────────────────────
  {
    keywords: ["sqlalchemy", "sqlite", "postgresql", "database node", "supabase"],
    resources: [
      { title: "SQLAlchemy Docs", url: "https://docs.sqlalchemy.org/en/20/tutorial/", type: "docs" },
      { title: "SQLite Tutorial", url: "https://www.sqlitetutorial.net/", type: "article" },
    ],
  },
  // ── Numerical Methods ─────────────────────────────────────────────────────
  {
    keywords: ["euler method", "runge-kutta", "numerical", "trapezoidal", "simpson"],
    resources: [
      { title: "Numerical Methods – NPTEL (Free)", url: "https://nptel.ac.in/courses/111107105", type: "course" },
      { title: "Euler Method Explained – YouTube", url: "https://www.youtube.com/watch?v=NfLGmjQdvKg", type: "video" },
    ],
  },
  // ── FEA / Finite Element ──────────────────────────────────────────────────
  {
    keywords: ["finite element", "fea", "fem workbench", "mesh"],
    resources: [
      { title: "FEA Explained – YouTube (The Efficient Engineer)", url: "https://www.youtube.com/watch?v=GHjopp47vvQ", type: "video" },
      { title: "FreeCAD FEM Workbench Tutorial", url: "https://wiki.freecad.org/FEM_tutorial", type: "docs" },
    ],
  },
  // ── Thermodynamics ────────────────────────────────────────────────────────
  {
    keywords: ["thermodynamics", "entropy", "1st law", "2nd law", "cycle"],
    resources: [
      { title: "Thermodynamics – Khan Academy", url: "https://www.khanacademy.org/science/physics/thermodynamics", type: "course" },
      { title: "Thermodynamics – NPTEL (Free)", url: "https://nptel.ac.in/courses/112104113", type: "course" },
    ],
  },
  // ── LangChain / Flowise ────────────────────────────────────────────────────
  {
    keywords: ["langchain", "flowise"],
    resources: [
      { title: "LangChain Python Docs", url: "https://python.langchain.com/docs/introduction/", type: "docs" },
      { title: "Flowise – No-Code LLM Apps", url: "https://flowiseai.com/", type: "tool" },
      { title: "LangChain Crash Course – YouTube (freeCodeCamp)", url: "https://www.youtube.com/watch?v=lG7Uxts9SXs", type: "video" },
    ],
  },
  // ── Matplotlib / Seaborn ─────────────────────────────────────────────────
  {
    keywords: ["matplotlib", "seaborn", "chart", "visualization"],
    resources: [
      { title: "Matplotlib Official Tutorials", url: "https://matplotlib.org/stable/tutorials/index.html", type: "docs" },
      { title: "Seaborn Documentation", url: "https://seaborn.pydata.org/tutorial.html", type: "docs" },
      { title: "Data Visualization with Python – YouTube (Corey Schafer)", url: "https://www.youtube.com/watch?v=UO98lJQ3QGI", type: "video" },
    ],
  },
  // ── Async Python ─────────────────────────────────────────────────────────
  {
    keywords: ["asyncio", "aiohttp", "async", "celery", "redis"],
    resources: [
      { title: "Asyncio – Python Docs", url: "https://docs.python.org/3/library/asyncio.html", type: "docs" },
      { title: "Async Python – Real Python", url: "https://realpython.com/async-io-python/", type: "article" },
    ],
  },
  // ── Optimization (Calculus) ───────────────────────────────────────────────
  {
    keywords: ["optimization", "maximize", "minimize", "lagrange multiplier"],
    resources: [
      { title: "Optimization – Khan Academy", url: "https://www.khanacademy.org/math/calculus-1/cs1-applications-of-derivatives/cs1-applied-rates-of-change/v/optimization-calculus", type: "course" },
      { title: "Optimization Problems – Paul's Notes", url: "https://tutorial.math.lamar.edu/Classes/CalcI/Optimization.aspx", type: "article" },
    ],
  },
];

const RESOURCE_TYPE_CONFIG: Record<ResourceType, { label: string; color: string; icon: string }> = {
  video: { label: "Video", color: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20", icon: "▶" },
  article: { label: "Article", color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20", icon: "📝" },
  docs: { label: "Docs", color: "text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800", icon: "📄" },
  course: { label: "Course", color: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20", icon: "🎓" },
  pdf: { label: "PDF", color: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20", icon: "📑" },
  website: { label: "Website", color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20", icon: "🌐" },
  tool: { label: "Tool", color: "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20", icon: "🔧" },
};

export function getResourcesForTask(taskText: string): Resource[] {
  const lower = taskText.toLowerCase();
  const found: Resource[] = [];
  const seen = new Set<string>();

  for (const topic of TOPIC_MAP) {
    const matches = topic.keywords.some((kw) => lower.includes(kw.toLowerCase()));
    if (matches) {
      for (const r of topic.resources) {
        if (!seen.has(r.url)) {
          seen.add(r.url);
          found.push(r);
        }
      }
    }
  }

  return found;
}

export { RESOURCE_TYPE_CONFIG };
