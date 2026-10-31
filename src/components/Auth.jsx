import { useState } from 'react';
import { loginUser, registerUser } from '../api';
import './Auth.css';

export default function Auth({ onAuthSuccess, showToast }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (!email.trim() || !password.trim()) {
            setError('Please provide both email and password.');
            return;
        }

        setIsLoading(true);

        try {
            const credentials = {
                email: email.trim().toLowerCase(),
                password
            };

            if (isLogin) {
                const data = await loginUser(credentials);
                localStorage.setItem('token', data.token);
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
                if (showToast) {
                    showToast('Logged in successfully', 'success');
                }
                onAuthSuccess(data.user);
            } else {
                await registerUser(credentials);
                if (showToast) {
                    showToast('Account created successfully! Logging you in...', 'success');
                }
                // Auto-login after registration
                const data = await loginUser(credentials);
                localStorage.setItem('token', data.token);
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
                onAuthSuccess(data.user);
            }
        } catch (err) {
            setError(err.message || 'An error occurred during authentication.');
            if (showToast) {
                showToast(err.message || 'Authentication failed', 'error');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header-section">
                    <h1 className="task-manager-title">Task Manager</h1>
                    <p className="auth-subtitle">
                        {isLogin
                            ? 'Please log in to manage your tasks.'
                            : 'Create an account to start managing tasks.'}
                    </p>
                </div>

                <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>

                {error && <div className="auth-error">{error}</div>}
                {successMessage && <div className="auth-success">{successMessage}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-form-group">
                        <label htmlFor="auth-email">Email</label>
                        <input
                            id="auth-email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="auth-form-group">
                        <label htmlFor="auth-password">Password</label>
                        <input
                            id="auth-password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete={isLogin ? 'current-password' : 'new-password'}
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-submit-btn"
                        disabled={isLoading || !email.trim() || !password.trim()}
                    >
                        {isLoading
                            ? 'Please wait...'
                            : isLogin
                            ? 'Log In'
                            : 'Sign Up'}
                    </button>
                </form>

                <div className="auth-toggle">
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError(null);
                            setSuccessMessage(null);
                        }}
                    >
                        {isLogin ? 'Sign up' : 'Log in'}
                    </button>
                </div>
            </div>
        </div>
    );
}

