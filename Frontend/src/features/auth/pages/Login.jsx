import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";   // ✅ FIXED - import from hooks, not context
import "../auth.form.scss";

export default function Login() {
  const navigate = useNavigate();
  const { handelLogin } = useAuth();           // ✅ FIXED - use handelLogin from the hook
  const currentTheme = localStorage.getItem('prepai-theme') || 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handelLogin({ email, password });  // ✅ FIXED - await + object param
    if (success) {
      navigate('/home');
    }
  };

  return (
    <div className={`auth-container theme-${currentTheme}`}>
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🧬</div>
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">Log in to your interview prep account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input 
              id="email"
              type="email" 
              placeholder="name@company.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              placeholder="••••••••" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-btn">Sign In</button>
        </form>

        <p className="auth-footer-text">
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')}>Sign up free</span>
        </p>
      </div>
    </div>
  );
}