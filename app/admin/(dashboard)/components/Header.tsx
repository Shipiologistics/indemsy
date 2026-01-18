'use client';

import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    const getPageTitle = () => {
        if (pathname === '/admin') return 'Dashboard';
        if (pathname.includes('/claims')) return 'Claims';
        if (pathname.includes('/users')) return 'Users';
        return 'Admin';
    };

    return (
        <header style={{
            height: '72px',
            background: 'white',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            position: 'sticky',
            top: 0,
            zIndex: 10,
        }}>
            {/* Breadcrumb/Title */}
            <div>
                <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>{getPageTitle()}</h1>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: '2px 0 0 0' }}>
                    Welcome back, Administrator
                </p>
            </div>

            {/* Right Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {/* Search */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 16px',
                    background: '#f3f4f6',
                    borderRadius: '10px',
                    width: '260px',
                }}>
                    <svg style={{ width: '18px', height: '18px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search claims, users..."
                        style={{
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                            fontSize: '14px',
                            color: '#374151',
                            width: '100%',
                        }}
                    />
                </div>

                {/* Notifications */}
                <button style={{
                    position: 'relative',
                    background: '#f3f4f6',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <svg style={{ width: '20px', height: '20px', color: '#6b7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        width: '8px',
                        height: '8px',
                        background: '#ef4444',
                        borderRadius: '50%',
                        border: '2px solid white',
                    }} />
                </button>

                {/* Divider */}
                <div style={{ width: '1px', height: '32px', background: '#e5e7eb' }} />

                {/* Profile */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '14px',
                    }}>
                        A
                    </div>
                    <svg style={{ width: '16px', height: '16px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </header>
    );
}
