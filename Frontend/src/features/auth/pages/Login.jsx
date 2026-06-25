import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../auth.form.scss";

export default function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const currentTheme = localStorage.getItem('elevate-ai-theme') || 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({});

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validations = useMemo(() => ({
    email: isValidEmail(email),
    password: password.length > 0
  }), [email, password]);

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validations.email || !validations.password) {
      setTouched({ email: true, password: true });
      return;
    }

    const success = await handleLogin({ email: email.trim().toLowerCase(), password });
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
            <div className="input-wrapper">
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
              />
              {touched.email && (
                <span className={`validation-icon ${validations.email ? 'valid' : 'invalid'}`}>
                  {validations.email ? '✓' : '✗'}
                </span>
              )}
            </div>
            {touched.email && !validations.email && (
              <p className="error-text">Enter a valid email (e.g., user@company.com)</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
              />
              {touched.password && (
                <span className={`validation-icon ${validations.password ? 'valid' : 'invalid'}`}>
                  {validations.password ? '✓' : '✗'}
                </span>
              )}
            </div>
            {touched.password && !validations.password && (
              <p className="error-text">Password is required</p>
            )}
          </div>

          <button type="submit" className="auth-btn" disabled={!validations.email || !validations.password}>Sign In</button>
        </form>

        <p className="auth-footer-text">
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')}>Sign up free</span>
        </p>
      </div>
    </div>
  );
}