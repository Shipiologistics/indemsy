
'use client';

import Link from 'next/link';

export default function SuccessPage({
    searchParams,
}: {
    searchParams: { session_id?: string };
}) {
    return (
        <div style={{ padding: '4rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0E1F3B', marginBottom: '1rem' }}>Payment Successful!</h1>
            <p style={{ fontSize: '1.25rem', color: '#64748B', maxWidth: '600px', marginBottom: '2rem' }}>
                Thank you for subscribing to FlyCompense Premium. Your account has been upgraded.
            </p>
            {searchParams.session_id && (
                <p style={{ color: '#94A3B8', fontSize: '0.875rem', marginBottom: '2rem' }}>
                    Session ID: {searchParams.session_id}
                </p>
            )}
            <Link href="/dashboard" style={{
                background: '#2563EB',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600'
            }}>
                Go to Dashboard
            </Link>
        </div>
    );
}
