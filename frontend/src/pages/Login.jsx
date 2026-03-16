import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            addToast('Please enter both email and password', 'error');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/users/login', { email, password });
            const { token } = response.data;
            login(token, email);
            addToast('Login successful', 'success');
            navigate('/');
        } catch (error) {
            const msg = error.response?.data?.message || 'Failed to login. Please check your credentials.';
            addToast(msg, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="layout-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px', margin: '1rem' }}>
                <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', fontWeight: 600 }}>DevArchive Login</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Email Context
                        </label>
                        <input
                            type="email"
                            placeholder="developer@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            autoFocus
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Secret Key
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <button type="submit" className="primary" style={{ width: '100%', marginBottom: '1rem' }} disabled={loading}>
                        {loading ? 'Authenticating...' : 'Access Knowledge Base'}
                    </button>
                </form>
                <div style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    New to DevArchive? <Link to="/signup" style={{ color: 'var(--text-accent)' }}>Initialize Account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
