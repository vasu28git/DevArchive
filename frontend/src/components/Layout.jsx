import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, LogOut, Bug } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const { user, logout } = useAuth();

    return (
        <div className="layout-container">
            <aside className="sidebar">
                <div style={{ padding: '0.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '1.25rem', color: 'var(--text-accent)' }}>
                    <Bug size={24} /> DevArchive
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <NavLink
                        to="/"
                        end
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-sm)',
                            color: isActive ? '#fff' : 'var(--text-secondary)',
                            backgroundColor: isActive ? 'var(--bg-tertiary)' : 'transparent',
                            fontWeight: isActive ? 500 : 400,
                        })}
                    >
                        <LayoutDashboard size={20} /> My Bugs
                    </NavLink>

                    <NavLink
                        to="/add"
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-sm)',
                            color: isActive ? '#fff' : 'var(--text-secondary)',
                            backgroundColor: isActive ? 'var(--bg-tertiary)' : 'transparent',
                            fontWeight: isActive ? 500 : 400,
                        })}
                    >
                        <PlusCircle size={20} /> Add Bug
                    </NavLink>
                </nav>

                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                    <button
                        onClick={logout}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '0.75rem 1rem',
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            textAlign: 'left'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                        <LogOut size={20} /> Sign Out
                    </button>
                </div>
            </aside>

            <main className="main-content">
                <header className="top-header">
                    <div style={{ flex: 1 }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>{user?.email}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success-color)' }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--success-color)' }}></span>
                            Connected
                        </span>
                    </div>
                </header>

                <div className="content-area">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
