'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
    { name: 'Overview', href: '/admin', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Claims', href: '/admin/claims', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Users', href: '/admin/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/auth/logout', { method: 'POST' });
            if (res.ok) {
                window.location.href = '/admin/login';
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <aside style={{
            width: '280px',
            minWidth: '280px',
            height: '100vh',
            background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid rgba(255,255,255,0.05)',
        }}>
            {/* Logo */}
            <div style={{
                padding: '24px 28px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
                    }}>
                        <span style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>I</span>
                    </div>
                    <div>
                        <h1 style={{ fontSize: '18px', fontWeight: '700', color: 'white', margin: 0, letterSpacing: '-0.5px' }}>Indemsy</h1>
                        <p style={{ fontSize: '11px', color: '#64748b', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Admin Panel</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: '20px 16px', overflowY: 'auto' }}>
                <p style={{ fontSize: '11px', fontWeight: '600', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', padding: '0 12px', marginBottom: '12px' }}>
                    Menu
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '12px 16px',
                                        borderRadius: '10px',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease',
                                        background: isActive ? 'linear-gradient(90deg, rgba(59,130,246,0.2) 0%, rgba(139,92,246,0.1) 100%)' : 'transparent',
                                        border: isActive ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
                                    }}
                                >
                                    <svg
                                        style={{ width: '20px', height: '20px', color: isActive ? '#3b82f6' : '#64748b' }}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                                    </svg>
                                    <span style={{
                                        fontSize: '14px',
                                        fontWeight: isActive ? '600' : '500',
                                        color: isActive ? 'white' : '#94a3b8',
                                    }}>
                                        {item.name}
                                    </span>
                                    {isActive && (
                                        <div style={{
                                            marginLeft: 'auto',
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            background: '#3b82f6',
                                            boxShadow: '0 0 8px #3b82f6',
                                        }} />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User Profile */}
            <div style={{
                padding: '20px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(0,0,0,0.2)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: 'white',
                    }}>
                        AD
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '14px', fontWeight: '600', color: 'white', margin: 0 }}>Admin User</p>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>admin@indemsy.lu</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '8px',
                            color: '#ef4444',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        title="Logout"
                    >
                        <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </div>
        </aside>
    );
}
