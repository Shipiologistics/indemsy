'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';

interface Claim {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    problemType: string;
    departureAirport: { iata: string; name: string } | null;
    arrivalAirport: { iata: string; name: string } | null;
    selectedFlight: { flightNumber: string } | null;
    manualFlightNumber: string | null;
    travelDate: string;
    createdAt: string;
}

interface Comment {
    id: number;
    adminName: string;
    content: string;
    createdAt: string;
}

export default function UserDashboard() {
    const t = useTranslations('dashboard');
    const [email, setEmail] = useState('');
    const [claims, setClaims] = useState<Claim[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const statusConfig: { [key: string]: { bg: string; color: string; label: string } } = {
        submitted: { bg: '#fffbeb', color: '#d97706', label: t('status.submitted') },
        processing: { bg: '#eff6ff', color: '#3b82f6', label: t('status.processing') },
        approved: { bg: '#ecfdf5', color: '#059669', label: t('status.approved') },
        rejected: { bg: '#fef2f2', color: '#dc2626', label: t('status.rejected') },
        pending_documents: { bg: '#fef3c7', color: '#b45309', label: t('status.pending_documents') },
        closed: { bg: '#f1f5f9', color: '#64748b', label: t('status.closed') },
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) {
            setError(t('login.errorEmpy'));
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch(`/api/user/claims?email=${encodeURIComponent(email)}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to fetch claims');
            }

            setClaims(data);
            setIsLoggedIn(true);
            localStorage.setItem('userEmail', email);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchComments = async (claimId: number) => {
        setCommentsLoading(true);
        try {
            const res = await fetch(`/api/claims/${claimId}/comments`);
            const data = await res.json();

            if (res.ok) {
                setComments(data);
            }
        } catch (err) {
            console.error('Error fetching comments:', err);
        } finally {
            setCommentsLoading(false);
        }
    };

    const handleClaimClick = (claim: Claim) => {
        setSelectedClaim(claim);
        fetchComments(claim.id);
    };

    const handleLogout = () => {
        setEmail('');
        setClaims([]);
        setSelectedClaim(null);
        setComments([]);
        setIsLoggedIn(false);
        localStorage.removeItem('userEmail');
    };

    useEffect(() => {
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            // Auto-login with saved email
            fetch(`/api/user/claims?email=${encodeURIComponent(savedEmail)}`)
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setClaims(data);
                        setIsLoggedIn(true);
                    }
                });
        }
    }, []);

    if (!isLoggedIn) {
        return (
            <div className={styles.loginContainer}>
                {/* Background decorations */}
                <div className={styles.blob1} />
                <div className={styles.blob2} />

                <div className={styles.loginCard}>
                    <div className={styles.loginHeader}>
                        <div className={styles.logoBox}>
                            <span className={styles.logoText}>I</span>
                        </div>
                        <h1 className={styles.loginTitle}>{t('login.title')}</h1>
                        <p className={styles.loginSubtitle}>{t('login.subtitle')}</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>{t('login.emailLabel')}</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('login.emailPlaceholder')}
                                className={styles.inputField}
                            />
                        </div>

                        {error && (
                            <div style={{
                                padding: '12px 16px',
                                borderRadius: '10px',
                                background: 'rgba(239,68,68,0.1)',
                                border: '1px solid rgba(239,68,68,0.3)',
                                color: '#ef4444',
                                fontSize: '14px',
                                marginBottom: '20px',
                            }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={styles.submitBtn}
                        >
                            {loading ? t('login.loading') : t('login.submitButton')}
                        </button>
                    </form>

                    <div style={{ marginTop: '24px', textAlign: 'center' }}>
                        <Link href="/claim" style={{ color: '#3b82f6', fontSize: '14px', textDecoration: 'none' }}>
                            {t('login.submitNew')}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.dashboardContainer}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <div className={styles.headerLogo}>
                        <span style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>I</span>
                    </div>
                    <div>
                        <h1 className={styles.headerTitle}>{t('header.title')}</h1>
                        <p className={styles.headerSubtitle}>{t('header.subtitle')}</p>
                    </div>
                </div>
                <div className={styles.headerRight}>
                    <span className={styles.userEmail}>{email}</span>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        {t('header.logout')}
                    </button>
                </div>
            </header>

            <main className={styles.main}>
                {/* Stats */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 8px 0' }}>{t('stats.total')}</p>
                        <p style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', margin: 0 }}>{claims.length}</p>
                    </div>
                    <div className={styles.statCard}>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 8px 0' }}>{t('stats.inProgress')}</p>
                        <p style={{ fontSize: '32px', fontWeight: '700', color: '#3b82f6', margin: 0 }}>
                            {claims.filter(c => c.status === 'processing' || c.status === 'submitted').length}
                        </p>
                    </div>
                    <div className={styles.statCard}>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 8px 0' }}>{t('stats.approved')}</p>
                        <p style={{ fontSize: '32px', fontWeight: '700', color: '#059669', margin: 0 }}>
                            {claims.filter(c => c.status === 'approved').length}
                        </p>
                    </div>
                </div>

                <div className={`${styles.claimsContainer} ${selectedClaim ? styles.hasSelection : ''}`}>
                    {/* Claims List */}
                    <div className={styles.claimsList}>
                        <div className={styles.claimsListHeader}>
                            <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', margin: 0 }}>{t('list.title')}</h2>
                            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                                {t('list.subtitle')}
                            </p>
                        </div>

                        {claims.length === 0 ? (
                            <div style={{ padding: '60px 24px', textAlign: 'center' }}>
                                <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📄</div>
                                <p style={{ fontSize: '16px', fontWeight: '500', color: '#0f172a', margin: '0 0 8px 0' }}>
                                    {t('list.emptyTitle')}
                                </p>
                                <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 20px 0' }}>
                                    {t('list.emptyDesc')}
                                </p>
                                <Link
                                    href="/claim"
                                    style={{
                                        display: 'inline-block',
                                        padding: '12px 24px',
                                        borderRadius: '10px',
                                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                        color: 'white',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {t('list.emptyButton')}
                                </Link>
                            </div>
                        ) : (
                            <div>
                                {claims.map((claim, idx) => {
                                    const status = statusConfig[claim.status] || statusConfig.submitted;
                                    const isSelected = selectedClaim?.id === claim.id;

                                    return (
                                        <div
                                            key={claim.id}
                                            onClick={() => handleClaimClick(claim)}
                                            className={`${styles.claimItem} ${isSelected ? styles.selected : ''}`}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                                <div style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    borderRadius: '12px',
                                                    background: `linear-gradient(135deg, ${['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'][idx % 4]} 0%, ${['#60a5fa', '#a78bfa', '#f472b6', '#fbbf24'][idx % 4]} 100%)`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0,
                                                }}>
                                                    <span style={{ color: 'white', fontSize: '18px' }}>✈️</span>
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                                                        <span style={{
                                                            fontFamily: 'monospace',
                                                            fontSize: '12px',
                                                            color: '#64748b',
                                                            background: '#f1f5f9',
                                                            padding: '2px 8px',
                                                            borderRadius: '4px',
                                                        }}>#{claim.id}</span>
                                                        <span style={{
                                                            fontSize: '12px',
                                                            fontWeight: '500',
                                                            padding: '4px 10px',
                                                            borderRadius: '20px',
                                                            background: status.bg,
                                                            color: status.color,
                                                        }}>{status.label}</span>
                                                    </div>
                                                    <p style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a', margin: '0 0 4px 0' }}>
                                                        {(claim.departureAirport as any)?.iata || '?'} → {(claim.arrivalAirport as any)?.iata || '?'}
                                                    </p>
                                                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                                                        {(claim.selectedFlight as any)?.flightNumber || claim.manualFlightNumber || 'N/A'} • {claim.travelDate ? new Date(claim.travelDate).toLocaleDateString() : 'N/A'}
                                                    </p>
                                                </div>
                                                <div style={{ textAlign: 'right', flexShrink: 0 }} className={styles.claimItemDate}>
                                                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                                                        {claim.createdAt ? new Date(claim.createdAt).toLocaleDateString() : ''}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Claim Details & Comments */}
                    {selectedClaim && (
                        <div className={styles.detailPanel}>
                            {/* Header */}
                            <div className={styles.detailHeader}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', margin: 0 }}>
                                        {t('detail.subtitle')} #{selectedClaim.id}
                                    </h3>
                                    <button
                                        onClick={() => setSelectedClaim(null)}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '24px',
                                            lineHeight: 1,
                                            color: '#94a3b8',
                                            padding: '4px',
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>

                            {/* Status */}
                            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9' }}>
                                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>{t('detail.currentStatus')}</p>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    background: (statusConfig[selectedClaim.status] || statusConfig.submitted).bg,
                                    color: (statusConfig[selectedClaim.status] || statusConfig.submitted).color,
                                    fontSize: '14px',
                                    fontWeight: '600',
                                }}>
                                    {(statusConfig[selectedClaim.status] || statusConfig.submitted).label}
                                </div>
                            </div>

                            {/* Flight Details */}
                            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9' }}>
                                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0' }}>{t('detail.flightDetails')}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        background: '#f1f5f9',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: '#0f172a',
                                    }}>
                                        {(selectedClaim.departureAirport as any)?.iata || '?'}
                                    </div>
                                    <span style={{ color: '#94a3b8' }}>→</span>
                                    <div style={{
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        background: '#f1f5f9',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: '#0f172a',
                                    }}>
                                        {(selectedClaim.arrivalAirport as any)?.iata || '?'}
                                    </div>
                                </div>
                                <p style={{ fontSize: '13px', color: '#64748b', margin: '12px 0 0 0' }}>
                                    {t('detail.flight')} {(selectedClaim.selectedFlight as any)?.flightNumber || selectedClaim.manualFlightNumber || 'N/A'}
                                </p>
                                <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                                    {t('detail.date')} {selectedClaim.travelDate ? new Date(selectedClaim.travelDate).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>

                            {/* Comments Section */}
                            <div style={{ padding: '20px 24px' }}>
                                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>
                                    {t('detail.commentsTitle')}
                                </p>

                                {commentsLoading ? (
                                    <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>
                                        {t('detail.loadingComments')}
                                    </div>
                                ) : comments.length === 0 ? (
                                    <div style={{
                                        padding: '24px',
                                        textAlign: 'center',
                                        background: '#f8fafc',
                                        borderRadius: '12px',
                                    }}>
                                        <span style={{ fontSize: '24px', marginBottom: '8px', display: 'block' }}>💭</span>
                                        <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                                            {t('detail.noComments')}
                                        </p>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {comments.map((comment) => (
                                            <div
                                                key={comment.id}
                                                style={{
                                                    padding: '16px',
                                                    borderRadius: '12px',
                                                    background: 'linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)',
                                                    borderLeft: '4px solid #3b82f6',
                                                }}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#3b82f6' }}>
                                                        {comment.adminName}
                                                    </span>
                                                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                                                        {new Date(comment.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p style={{ fontSize: '14px', color: '#334155', margin: 0, lineHeight: 1.5 }}>
                                                    {comment.content}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
