import { db } from '@/lib/db';
import { claims } from '@/lib/schema';
import { count, desc, eq } from 'drizzle-orm';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    // Fetch real data from database
    const totalClaimsResult = await db.select({ count: count() }).from(claims);
    const pendingClaimsResult = await db.select({ count: count() }).from(claims).where(eq(claims.status, 'submitted'));
    const approvedClaimsResult = await db.select({ count: count() }).from(claims).where(eq(claims.status, 'approved'));
    const recentClaims = await db.select().from(claims).orderBy(desc(claims.createdAt)).limit(6);

    const stats = [
        { label: 'Total Claims', value: totalClaimsResult[0].count, icon: '📄', bg: '#eff6ff' },
        { label: 'Pending', value: pendingClaimsResult[0].count, icon: '⏳', bg: '#fffbeb' },
        { label: 'Approved', value: approvedClaimsResult[0].count, icon: '✅', bg: '#ecfdf5' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '24px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                            border: '1px solid #f1f5f9',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '16px',
                        }}
                    >
                        <div style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '14px',
                            background: stat.bg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                        }}>
                            {stat.icon}
                        </div>
                        <div>
                            <p style={{ fontSize: '13px', fontWeight: '500', color: '#64748b', margin: '0 0 6px 0' }}>{stat.label}</p>
                            <p style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: 0, letterSpacing: '-1px' }}>{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Claims */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                border: '1px solid #f1f5f9',
                overflow: 'hidden',
            }}>
                <div style={{
                    padding: '20px 24px',
                    borderBottom: '1px solid #f1f5f9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <div>
                        <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', margin: 0 }}>Recent Claims</h2>
                        <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 0 0' }}>Latest submissions from users</p>
                    </div>
                    <Link
                        href="/admin/claims"
                        style={{
                            fontSize: '13px',
                            fontWeight: '500',
                            color: '#3b82f6',
                            textDecoration: 'none',
                            padding: '8px 14px',
                            borderRadius: '8px',
                            background: '#eff6ff',
                        }}
                    >
                        View All
                    </Link>
                </div>

                <div>
                    {recentClaims.length === 0 ? (
                        <div style={{ padding: '60px 24px', textAlign: 'center' }}>
                            <div style={{ fontSize: '40px', marginBottom: '12px', opacity: 0.5 }}>📭</div>
                            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>No claims yet</p>
                            <p style={{ color: '#94a3b8', fontSize: '12px', margin: '8px 0 0 0' }}>Claims will appear here when users submit them</p>
                        </div>
                    ) : (
                        recentClaims.map((claim, idx) => (
                            <div
                                key={claim.id}
                                style={{
                                    padding: '16px 24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    borderBottom: idx < recentClaims.length - 1 ? '1px solid #f8fafc' : 'none',
                                }}
                            >
                                {/* Avatar */}
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '12px',
                                    background: `linear-gradient(135deg, ${['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'][idx % 5]} 0%, ${['#60a5fa', '#a78bfa', '#f472b6', '#fbbf24', '#34d399'][idx % 5]} 100%)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                }}>
                                    {claim.firstName?.[0]}{claim.lastName?.[0]}
                                </div>

                                {/* Info */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', margin: 0 }}>
                                        {claim.firstName} {claim.lastName}
                                    </p>
                                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: '3px 0 0 0' }}>
                                        {(claim.departureAirport as any)?.iata || '?'} → {(claim.arrivalAirport as any)?.iata || '?'} • {(claim.selectedFlight as any)?.flightNumber || claim.manualFlightNumber || 'N/A'}
                                    </p>
                                </div>

                                {/* Status */}
                                <span style={{
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    background: claim.status === 'approved' ? '#ecfdf5' : claim.status === 'rejected' ? '#fef2f2' : '#fffbeb',
                                    color: claim.status === 'approved' ? '#059669' : claim.status === 'rejected' ? '#dc2626' : '#d97706',
                                    textTransform: 'capitalize',
                                }}>
                                    {claim.status || 'Pending'}
                                </span>

                                {/* Date */}
                                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                                    {claim.createdAt ? new Date(claim.createdAt).toLocaleDateString() : ''}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
