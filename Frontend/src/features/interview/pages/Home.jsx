import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../hook/useInterview.js'
import DeveloperFooter from '../components/DeveloperFooter';
// import { useAuth } from '../../auth/auth.context';

import '../styles/home.scss';

export default function Home() {
    const { loading, generateReport, reports } = useInterview()
    const navigate = useNavigate();
    const resumeInputRef = useRef(null);
    const currentTheme = localStorage.getItem('elevate-ai-theme') || 'dark';

    const [jobDescription, setJobDescription] = useState('');
    const [description, setDescription] = useState('');
    const [fileName, setFileName] = useState('');
    const [error, setError] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown date';
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleGenerate = async () => {
        if (loading || isGenerating) return;

        setError('');
        const resumeFile = resumeInputRef.current?.files[0];

        if (!jobDescription || (!resumeFile && !description)) {
            setError("Please provide a job description and either a resume or self-description.");
            return;
        }

        setIsGenerating(true);
        try {
            const data = await generateReport({ jobDescription, selfDescription: description, resumeFile });
            if (data?._id) {
                setError('');
                navigate(`/interview/${data._id}`);
            }
        } catch (error) {
            console.error("Generate report error:", error)
            const responseData = error.response?.data
            const message = responseData?.message || (typeof responseData === 'string' ? responseData : JSON.stringify(responseData)) || error.message || "Failed to generate report."
            setError(message);
        } finally {
            setIsGenerating(false);
        }
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
                    <span>🧬</span> Elevate-AI <span className="workspace-tag">Dashboard</span>
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

                    {error && (
                        <div className="error-banner">
                            <span className="error-icon">⚠️</span>
                            <div>
                                <p className="error-title">Error</p>
                                <p className="error-message">{error}</p>
                            </div>
                            <button className="close-error" onClick={() => setError('')}>✕</button>
                        </div>
                    )}

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

                        <button
                            type="button"
                            className="action-submit-btn"
                            onClick={handleGenerate}
                            disabled={loading || isGenerating}
                        >
                            {loading || isGenerating ? '⏳ Generating...' : '✨ Generate My Interview Strategy'}
                        </button>
                    </form>
                </main>

                <aside className="history-panel">
                    <h2>My Recent Interview Plans</h2>
                    <div className="plans-list">
                        {reports.length === 0 ? (
                            <div className="empty-history">
                                <p>No previous reports found.</p>
                                <p>Generate your first plan to save it here.</p>
                            </div>
                        ) : (
                            reports.map((reportItem) => (
                                <button
                                    key={reportItem._id}
                                    className="plan-item-card"
                                    onClick={() => navigate(`/interview/${reportItem._id}`)}
                                >
                                    <div className="card-left">
                                        <h3>{reportItem.title || 'Interview Plan'}</h3>
                                        <span className="card-date">Generated on {formatDate(reportItem.createdAt)}</span>
                                    </div>
                                    <div className="card-right">
                                        <span className="score-badge">Match Score: {reportItem.matchScore ?? 'N/A'}%</span>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </aside>
            </div>

            <DeveloperFooter />
        </div>
    );
}