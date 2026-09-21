/**
 * AccountPage.jsx
 * ----------------
 * Login / Registration page. Tabs switch between the two forms.
 * After successful auth, redirects to `?redirect=` param or homepage.
 */

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AccountPage.css';

/** Basic email format check used by both forms */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AccountPage() {
  const { loginUser, registerUser, isAuthLoading, authError, clearAuthError, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get('redirect') || '/';

  const [activeTab,    setActiveTab]    = useState('login');
  const [loginForm,    setLoginForm]    = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [formErrors,   setFormErrors]   = useState({});

  /** If already logged in, redirect immediately */
  useEffect(() => {
    if (isLoggedIn) {
      navigate(decodeURIComponent(redirectTo), { replace: true });
    }
  }, [isLoggedIn, navigate, redirectTo]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormErrors({});
    clearAuthError();
  };

  /* ── Login ─────────────────────────────────────────────────────────────── */
  const validateLoginForm = () => {
    const errors = {};
    if (!loginForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(loginForm.email.trim())) {
      errors.email = 'Enter a valid email address';
    }
    if (!loginForm.password) errors.password = 'Password is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    clearAuthError();
    if (!validateLoginForm()) return;
    const result = await loginUser(loginForm.email, loginForm.password);
    if (result.success) {
      navigate(decodeURIComponent(redirectTo), { replace: true });
    }
  };

  /* ── Register ──────────────────────────────────────────────────────────── */
  const validateRegisterForm = () => {
    const errors = {};
    if (!registerForm.name.trim()) {
      errors.name = 'Full name is required';
    } else if (registerForm.name.trim().length < 2) {
      errors.name = 'Full name must be at least 2 characters';
    }
    if (!registerForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(registerForm.email.trim())) {
      errors.email = 'Enter a valid email address';
    }
    if (!registerForm.password) {
      errors.password = 'Password is required';
    } else if (registerForm.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (registerForm.confirmPassword !== registerForm.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    clearAuthError();
    if (!validateRegisterForm()) return;
    const result = await registerUser(registerForm.name, registerForm.email, registerForm.password);
    if (result.success) {
      navigate(decodeURIComponent(redirectTo), { replace: true });
    }
  };

  return (
    <main className="page-wrapper account-page">
      <div className="account-page__layout">

        {/* Left Panel — Branding */}
        <div className="account-page__branding" aria-hidden="true">
          <div className="account-page__branding-content">
            <Link to="/" className="account-page__logo">
              <span>🪑</span>
              <span>The Crafted Woods</span>
            </Link>
            <h2 className="account-page__branding-title display-title">
              Build the Home<br />
              <span className="account-page__branding-accent">of Your Dreams</span>
            </h2>
            <p className="account-page__branding-desc">
              Join thousands of happy customers who have transformed their homes
              with our premium handcrafted Indian furniture.
            </p>
            <div className="account-page__branding-stats">
              <div className="account-page__stat">
                <strong>50,000+</strong>
                <span>Happy Customers</span>
              </div>
              <div className="account-page__stat">
                <strong>500+</strong>
                <span>Products</span>
              </div>
              <div className="account-page__stat">
                <strong>25 Years</strong>
                <span>of Experience</span>
              </div>
            </div>
            <div className="account-page__branding-icons">
              <span>🪵</span><span>🌳</span><span>🎋</span><span>🌿</span>
            </div>
          </div>
        </div>

        {/* Right Panel — Auth Forms */}
        <div className="account-page__form-panel">
          <div className="account-form-card">
            <div className="account-form-card__header">
              <h1 className="account-form-card__title">
                {activeTab === 'login' ? 'Sign In to Your Account' : 'Create a New Account'}
              </h1>
              <p className="account-form-card__subtitle">
                {activeTab === 'login'
                  ? 'Enter your email and password to continue.'
                  : 'Join The Crafted Woods family today!'}
              </p>
            </div>

            {/* Tabs */}
            <div className="account-tabs" role="tablist">
              <button
                role="tab"
                id="login-tab"
                aria-selected={activeTab === 'login'}
                className={`account-tab ${activeTab === 'login' ? 'account-tab--active' : ''}`}
                onClick={() => handleTabChange('login')}
              >
                Login
              </button>
              <button
                role="tab"
                id="register-tab"
                aria-selected={activeTab === 'register'}
                className={`account-tab ${activeTab === 'register' ? 'account-tab--active' : ''}`}
                onClick={() => handleTabChange('register')}
              >
                Register
              </button>
            </div>

            {/* API Error banner */}
            {authError && (
              <div className="account-api-error" role="alert">
                ⚠️ {authError}
              </div>
            )}

            {/* ── Login Form ────────────────────────────────────────────── */}
            {activeTab === 'login' && (
              <form
                className="account-form fade-in"
                onSubmit={handleLoginSubmit}
                aria-labelledby="login-tab"
                noValidate
              >
                <div className="form-group">
                  <label className="form-label" htmlFor="login-email">
                    Email Address
                  </label>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    className={`form-input ${formErrors.email ? 'error' : ''}`}
                    placeholder="you@example.com"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    autoComplete="email"
                  />
                  {formErrors.email && <span className="form-error">{formErrors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="login-password">
                    Password
                  </label>
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    className={`form-input ${formErrors.password ? 'error' : ''}`}
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    autoComplete="current-password"
                  />
                  {formErrors.password && <span className="form-error">{formErrors.password}</span>}
                </div>

                <div className="account-form__demo-hint">
                  <p>🔑 Demo credentials:</p>
                  <code>customer@furnishindia.com / Customer@123</code>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg account-form__submit-btn"
                  disabled={isAuthLoading}
                  id="login-submit-btn"
                >
                  {isAuthLoading ? '⏳ Signing In...' : 'Sign In →'}
                </button>

                <p className="account-form__switch-text">
                  New here?{' '}
                  <button type="button" className="account-form__switch-link" onClick={() => handleTabChange('register')}>
                    Create an Account
                  </button>
                </p>
              </form>
            )}

            {/* ── Register Form ─────────────────────────────────────────── */}
            {activeTab === 'register' && (
              <form
                className="account-form fade-in"
                onSubmit={handleRegisterSubmit}
                aria-labelledby="register-tab"
                noValidate
              >
                <div className="form-group">
                  <label className="form-label" htmlFor="register-name">Full Name</label>
                  <input
                    id="register-name"
                    name="name"
                    type="text"
                    className={`form-input ${formErrors.name ? 'error' : ''}`}
                    placeholder="Rajan Kumar Sharma"
                    value={registerForm.name}
                    onChange={handleRegisterChange}
                    autoComplete="name"
                  />
                  {formErrors.name && <span className="form-error">{formErrors.name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="register-email">Email Address</label>
                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    className={`form-input ${formErrors.email ? 'error' : ''}`}
                    placeholder="rajan@example.com"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    autoComplete="email"
                  />
                  {formErrors.email && <span className="form-error">{formErrors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="register-password">Password</label>
                  <input
                    id="register-password"
                    name="password"
                    type="password"
                    className={`form-input ${formErrors.password ? 'error' : ''}`}
                    placeholder="Minimum 6 characters"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    autoComplete="new-password"
                  />
                  {formErrors.password && <span className="form-error">{formErrors.password}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="register-confirm-password">Confirm Password</label>
                  <input
                    id="register-confirm-password"
                    name="confirmPassword"
                    type="password"
                    className={`form-input ${formErrors.confirmPassword ? 'error' : ''}`}
                    placeholder="Re-enter your password"
                    value={registerForm.confirmPassword}
                    onChange={handleRegisterChange}
                    autoComplete="new-password"
                  />
                  {formErrors.confirmPassword && <span className="form-error">{formErrors.confirmPassword}</span>}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg account-form__submit-btn"
                  disabled={isAuthLoading}
                  id="register-submit-btn"
                >
                  {isAuthLoading ? '⏳ Creating Account...' : 'Create Account →'}
                </button>

                <p className="account-form__switch-text">
                  Already have an account?{' '}
                  <button type="button" className="account-form__switch-link" onClick={() => handleTabChange('login')}>
                    Sign In
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
