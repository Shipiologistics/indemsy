'use client';

import { useState } from 'react';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                window.location.href = '/admin';
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
            padding: '20px',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}>
            <div style={{
                width: '100%',
                maxWidth: '420px',
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                    }}>
                        <span style={{ fontSize: '28px', fontWeight: '700', color: 'white' }}>I</span>
                    </div>
                    <h1 style={{
                        fontSize: '32px',
                        fontWeight: '700',
                        color: 'white',
                        margin: '0 0 8px 0',
                        letterSpacing: '-0.5px',
                    }}>
                        Indemsy Admin
                    </h1>
                    <p style={{
                        fontSize: '14px',
                        color: '#64748b',
                        margin: 0,
                    }}>
                        Secure Access Portal
                    </p>
                </div>

                {/* Card */}
                <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '40px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }}>
                    <h2 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: '#0f172a',
                        margin: '0 0 24px 0',
                        textAlign: 'center',
                    }}>
                        Sign In
                    </h2>

                    {error && (
                        <div style={{
                            padding: '14px 16px',
                            borderRadius: '10px',
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}>
                            <span style={{ fontSize: '16px' }}>⚠️</span>
                            <span style={{ fontSize: '14px', color: '#dc2626', fontWeight: '500' }}>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '13px',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '8px',
                            }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@indemsy.lu"
                                required
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    fontSize: '15px',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '10px',
                                    background: '#f9fafb',
                                    color: '#0f172a',
                                    outline: 'none',
                                    transition: 'all 0.2s ease',
                                    boxSizing: 'border-box',
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#3b82f6';
                                    e.target.style.background = 'white';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#e5e7eb';
                                    e.target.style.background = '#f9fafb';
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '28px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '13px',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '8px',
                            }}>
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    fontSize: '15px',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '10px',
                                    background: '#f9fafb',
                                    color: '#0f172a',
                                    outline: 'none',
                                    transition: 'all 0.2s ease',
                                    boxSizing: 'border-box',
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#3b82f6';
                                    e.target.style.background = 'white';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#e5e7eb';
                                    e.target.style.background = '#f9fafb';
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '14px 24px',
                                fontSize: '15px',
                                fontWeight: '600',
                                color: 'white',
                                background: loading ? '#94a3b8' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                boxShadow: loading ? 'none' : '0 4px 14px rgba(59, 130, 246, 0.4)',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div style={{
                    textAlign: 'center',
                    marginTop: '24px',
                }}>
                    <p style={{
                        fontSize: '12px',
                        color: '#475569',
                        margin: 0,
                    }}>
                        Authorized personnel only
                    </p>
                </div>
            </div>
        </div>
    );
}
