import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../auth.form.scss";

export default function Register() {
  const navigate = useNavigate();
  const { handelRegister } = useAuth();
  const currentTheme = localStorage.getItem('prepai-theme') || 'dark';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidUsername = (username) => username.trim().length >= 2;
  const getPasswordStrength = (pwd) => {
    if (pwd.length < 8) return 'weak';
    if (pwd.length <= 12) return 'medium';
    return 'strong';
  };

  const validations = useMemo(() => ({
    username: isValidUsername(name),
    email: isValidEmail(email),
    password: password.length >= 8
  }), [name, email, password]);

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validations.username || !validations.email || !validations.password) {
      setTouched({ username: true, email: true, password: true });
      return;
    }

    const success = await handelRegister({ username: name.trim(), email: email.trim().toLowerCase(), password });
    if (success) {
      navigate('/home');
    }
  };

  const passwordStrength = getPasswordStrength(password);

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
            <div className="input-wrapper">
              <input 
                id="fullname"
                type="text" 
                placeholder="Alex Kumar" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleBlur('username')}
              />
              {touched.username && (
                <span className={`validation-icon ${validations.username ? 'valid' : 'invalid'}`}>
                  {validations.username ? '✓' : '✗'}
                </span>
              )}
            </div>
            {touched.username && !validations.username && (
              <p className="error-text">Name must be at least 2 characters</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <input 
                id="email"
                type="email" 
                placeholder="name@domain.com" 
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
              <p className="error-text">Enter a valid email (e.g., user@domain.com)</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input 
                id="password"
                type="password" 
                placeholder="Create strong password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
              />
              {password && (
                <span className={`validation-icon ${passwordStrength === 'strong' ? 'valid' : passwordStrength === 'medium' ? 'medium' : 'invalid'}`}>
                  {passwordStrength === 'strong' ? '✓' : passwordStrength === 'medium' ? '◐' : '✗'}
                </span>
              )}
            </div>
            <div className="password-strength">
              <div className="strength-bar">
                <div 
                  className={`strength-fill strength-${passwordStrength}`}
                  style={{ width: password.length < 8 ? '33%' : password.length <= 12 ? '66%' : '100%' }}
                />
              </div>
              <p className={`strength-text strength-${passwordStrength}`}>
                {password.length < 1 ? 'Enter password' : passwordStrength === 'weak' ? '✗ Weak (< 8 characters)' : passwordStrength === 'medium' ? '◐ Medium (8-12 characters)' : '✓ Strong (> 12 characters)'}
              </p>
            </div>
            {touched.password && !validations.password && (
              <p className="error-text">Password must be at least 8 characters</p>
            )}
          </div>

          <button type="submit" className="auth-btn" disabled={!validations.username || !validations.email || !validations.password}>Get Started</button>
        </form>

        <p className="auth-footer-text">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')}>Sign in</span>
        </p>
      </div>
    </div>
  );
}