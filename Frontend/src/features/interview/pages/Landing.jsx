import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import '../styles/landing.scss';
import '../styles/footer.scss';
import DeveloperFooter from '../components/DeveloperFooter';


export default function Landing() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('elevate-ai-theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('elevate-ai-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const metrics = [
    { value: "98%", label: "Accuracy in Skill Gap Mapping" },
    { value: "10x", label: "Faster Study Path Generation" },
    { value: "15K+", label: "Mock Questions Practiced" }
  ];

  const workflowSteps = [
    { num: "01", title: "Profile Analysis", desc: "Upload your engineering resume to extract core technical competencies." },
    { num: "02", title: "Target Matching", desc: "Paste your target job description to look for framework variations." },
    { num: "03", title: "Gap Identification", desc: "Our models run system evaluations to flag hidden blind spots." },
    { num: "04", title: "Structured Roadmap", desc: "Receive a day-by-day preparation timeline tailored to your interview date." }
  ];

  
return (
    <div className={`landing-container theme-${theme}`}>
      {/* ── 1. STICKY TOP NAVIGATION WITH TOGGLE ── */}
      <nav className="landing-nav">
        <div className="logo">
          <span className="logo-icon">🧬</span> Elevate-AI
        </div>
        
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#workflow">How It Works</a>
          <a href="https://github.com/Lkshayyadav/ElevateAI/tree/master" target="_blank" rel="noreferrer">Open Source</a>
        </div>
        
        <div className="nav-actions">
          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/login')}>Login</button>
          <button className="btn btn-primary" onClick={() => navigate('/register')}>Register</button>
        </div>
      </nav>

      {/* ── 2. HERO SECTION ── */}
      <header className="hero-section">
        <div className="badge">THE PLATFORM FOR RECRUITMENT EXCELLENCE</div>
        <h1 className="hero-title">
          Prepare Smarter.<br />
          Interview <span>Better.</span>
        </h1>
        <p className="hero-subtitle">
          An intelligent framework that breaks down targeted job specifications, cross-references your current engineering stack, and creates structural review tracks.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary btn-large" onClick={() => navigate('/home')}>
            Get Started Free →
          </button>
          <button className="btn btn-secondary btn-large" onClick={() => {
            document.getElementById('workflow').scrollIntoView({ behavior: 'smooth' });
          }}>
            Explore Platform Flow
          </button>
        </div>

        <div className="hero-preview-wrapper">
          <div className="preview-top-bar">
            <div className="dots"><span/><span/><span/></div>
            <div className="mock-url">elevate-ai.dev/dashboard/home</div>
          </div>
          <div className="preview-inner-grid">
            <div className="mock-sidebar">
              <div className="block active" />
              <div className="block" />
              <div className="block" />
            </div>
            <div className="mock-main">
              <div className="mock-row" style={{ width: '40%', height: '24px' }} />
              <div className="mock-split" style={{ marginTop: '1.5rem' }}>
                <div className="mock-row mock-card-colorful-1" />
                <div className="mock-row mock-card-colorful-2" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── 3. DATA & STATS BAND ── */}
      <section className="stats-section">
        <div className="stats-grid">
          {metrics.map((m, i) => (
            <div className="stat-card" key={i}>
              <h2>{m.value}</h2>
              <p>{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. ASYMMETRICAL FEATURE ROW BLOCKS ── */}
      <section id="features" className="features-rows">
        <div className="feature-row-item">
          <div className="info-side">
            <span className="row-badge">EVALUATION ENGINE</span>
            <h2>Automated Skill Gap Mapping</h2>
            <p>Our workspace runs an instant code-and-concept alignment review.</p>
          </div>
          <div className="visual-side">
            <div className="visual-box-placeholder">
              <div className="tag-cloud">
                <span className="tag tag--match">FastAPI ✓</span>
                <span className="tag tag--gap">Redis Missing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. TIMELINE WORKFLOW TRACK ── */}
      <section id="workflow" className="workflow-section">
        <div className="section-header-centered">
          <span className="row-badge">METHODOLOGY</span>
          <h2>A systematic preparation path.</h2>
        </div>
        <div className="workflow-track">
          {workflowSteps.map((step, i) => (
            <div className="workflow-node" key={i}>
              <div className="node-num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. FOOTER ── */}
      <DeveloperFooter />
    </div>
  );

}