import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";   // ✅ FIXED
import "../auth.form.scss";

export default function Register() {
  const navigate = useNavigate();
  const { handelRegister } = useAuth();        // ✅ FIXED
  const currentTheme = localStorage.getItem('prepai-theme') || 'dark';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const success = await handelRegister({ username: name, email, password }); // ✅ FIXED
    if (success) {
      navigate('/home');
    }
  };

  return (
    <div className={`auth-container theme-${currentTheme}`}>
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🧬</div>
          <h2 className="auth-title">Create account</h2>
          <p className="auth-subtitle">Start tracking your preparation goals</p>
        </div>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="fullname">Full Name</label>
            <input 
              id="fullname"
              type="text" 
              placeholder="Alex Kumar" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input 
              id="email"
              type="email" 
              placeholder="name@domain.com" 
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
              placeholder="Create strong password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-btn">Get Started</button>
        </form>

        <p className="auth-footer-text">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')}>Sign in</span>
        </p>
      </div>
    </div>
  );
}