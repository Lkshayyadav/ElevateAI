import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../hook/useInterview.js'
import { useAuth } from '../../auth/auth.context';

import '../styles/home.scss';

export default function Home() {
   const { loading, generateReport,reports } = useInterview()
  const navigate = useNavigate();
  const resumeInputRef = useRef(null); // Reference for the hidden file input
  const currentTheme = localStorage.getItem('prepai-theme') || 'dark';

  const [jobDescription, setJobDescription] = useState('');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState(''); // To show the uploaded filename

  const plans = [
    { role: "Frontend Developer", date: "Generated on 6/20/2026", score: "88%" },
    { role: "Frontend Developer", date: "Generated on 6/20/2026", score: "92%" },
    { role: "Frontend Developer", date: "Generated on 6/20/2026", score: "92%" }
  ];

  // Logic for handling the generate button
  const handleGenerate = async () => {
     const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    const file = resumeInputRef.current?.files[0];
    
    if (!jobDescription || (!file && !description)) {
      alert("Please provide a job description and either a resume or self-description.");
      return;
    }

   
    
    // Replace this console.log with your actual API/Hook call
    console.log("Submitting:", { jobDescription, description, file });
    alert("Strategy generation triggered!");
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (

    
    
    <div className={`home-workspace-container theme-${currentTheme}`}>
      <header className="workspace-header">
        <div className="brand" onClick={() => navigate('/')}>
          <span>🧬</span> PrepAI <span className="workspace-tag">Dashboard</span>
        </div>
        <button className="btn-back-nav" onClick={() => navigate('/')}>
          ← Back to Landing
        </button>
      </header>

      <div className="workspace-grid">
        <main className="generation-panel">
          <div className="panel-heading">
            <h1>Create Your Custom Interview Plan</h1>
            <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
          </div>

          <form className="workspace-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-block">
              <label>Target Job Description <span className="req-star">*</span></label>
              <textarea 
                placeholder="Paste the full job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                maxLength={5000}
              />
              <div className="char-count">{jobDescription.length} / 5000 chars</div>
            </div>

            <div className="form-block">
              <label>Your Profile</label>
              
              {/* This div triggers the hidden input */}
              <div className="upload-dropzone" onClick={() => resumeInputRef.current.click()}>
                <input 
                  type="file" 
                  ref={resumeInputRef} 
                  hidden 
                  accept=".pdf,.docx" 
                  onChange={handleFileChange} 
                />
                <span className="upload-icon">📁</span>
                <p><strong>{fileName || "Click to upload"}</strong> or drag & drop</p>
                <span className="upload-sub">PDF or DOCX (Max 5MB)</span>
              </div>
              
              <div className="form-divider"><span>OR</span></div>

              <label>Quick Self-Description</label>
              <textarea 
                className="small-textarea"
                placeholder="Briefly describe your experience, key skills, and stack..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="info-tip-row">
              💡 Either a <strong>Resume</strong> or a <strong>Self-Description</strong> is required to generate a personalized plan.
            </div>

            <button type="button" className="action-submit-btn" onClick={handleGenerate}>
              ✨ Generate My Interview Strategy
            </button>
          </form>
        </main>

        <aside className="history-panel">
          <h2>My Recent Interview Plans</h2>
          <div className="plans-list">
            {plans.map((plan, index) => (
              <div className="plan-item-card" key={index}>
                <div className="card-left">
                  <h3>{plan.role}</h3>
                  <span className="card-date">{plan.date}</span>
                </div>
                <div className="card-right">
                  <span className="score-badge">Match Score: {plan.score}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <footer className="workspace-footer">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
        <a href="#help">Help Center</a>
      </footer>
    </div>
  );
}