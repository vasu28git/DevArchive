import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import api from '../api';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !username || !password) {
            addToast('Please enter email, username, and password', 'error');
            return;
        }

        setLoading(true);
        try {
            await api.post('/users/signup', { email, username, password });
            addToast('Registration successful! Please login.', 'success');
            navigate('/login');
        } catch (error) {
            const msg = error.response?.data?.message || 'Failed to register. Email might be in use.';
            addToast(msg, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="layout-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px', margin: '1rem' }}>
                <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', fontWeight: 600 }}>Initialize DevArchive</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Developer Email
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
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Developer Username
                        </label>
                        <input
                            type="text"
                            placeholder="dev_guru"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Secure Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            minLength={6}
                        />
                    </div>
                    <button type="submit" className="primary" style={{ width: '100%', marginBottom: '1rem' }} disabled={loading}>
                        {loading ? 'Initializing...' : 'Create Account'}
                    </button>
                </form>
                <div style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--text-accent)' }}>Login here</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
