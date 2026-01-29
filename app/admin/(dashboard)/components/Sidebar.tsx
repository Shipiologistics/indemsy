'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const mainNavItems = [
    { name: 'Overview', href: '/admin', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Claims', href: '/admin/claims', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Users', href: '/admin/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { name: 'Chats', href: '/admin/chats', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
];

const cmsNavItems = [
    { name: 'Blog Posts', href: '/admin/cms/blog', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { name: 'Pages', href: '/admin/cms/pages', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
    { name: 'Team/Experts', href: '/admin/cms/team', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'Careers', href: '/admin/cms/careers', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { name: 'Press', href: '/admin/cms/press', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15' },
    { name: 'Partners', href: '/admin/cms/partners', icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z' },
    { name: 'Social Links', href: '/admin/cms/socials', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' }, // Link icon
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
            position: 'sticky',
            top: 0,
            alignSelf: 'flex-start',
            background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid rgba(255,255,255,0.05)',
            zIndex: 5,
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
                        <h1 style={{ fontSize: '18px', fontWeight: '700', color: 'white', margin: 0, letterSpacing: '-0.5px' }}>FlyCompense</h1>
                        <p style={{ fontSize: '11px', color: '#64748b', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Admin Panel</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: '20px 16px', overflowY: 'auto' }}>
                <p style={{ fontSize: '11px', fontWeight: '600', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', padding: '0 12px', marginBottom: '12px' }}>
                    Main Menu
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {mainNavItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
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

                <p style={{ fontSize: '11px', fontWeight: '600', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', padding: '0 12px', marginBottom: '12px' }}>
                    Content Management
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {cmsNavItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href);
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
                                        background: isActive ? 'linear-gradient(90deg, rgba(16,185,129,0.2) 0%, rgba(6,182,212,0.1) 100%)' : 'transparent',
                                        border: isActive ? '1px solid rgba(16,185,129,0.3)' : '1px solid transparent',
                                    }}
                                >
                                    <svg
                                        style={{ width: '20px', height: '20px', color: isActive ? '#10b981' : '#64748b' }}
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
                                            background: '#10b981',
                                            boxShadow: '0 0 8px #10b981',
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
                        <p style={{ fontSize: '12px', color: '#64748b', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>admin@flycompense.lu</p>
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
