import { db } from '@/lib/db';
import { claims } from '@/lib/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ClaimsPage() {
    const allClaims = await db.select().from(claims).orderBy(desc(claims.createdAt));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Claims</h1>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '6px 0 0 0' }}>
                        {allClaims.length} total claims in system
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{
                        padding: '10px 18px',
                        background: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#475569',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}>
                        <span style={{ fontSize: '16px' }}>🔍</span>
                        Filter
                    </button>
                    <button style={{
                        padding: '10px 18px',
                        background: '#3b82f6',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}>
                        <span style={{ fontSize: '16px' }}>📥</span>
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Table */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                border: '1px solid #f1f5f9',
                overflow: 'hidden',
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                            {['Claim', 'Passenger', 'Journey', 'Status', 'Documents', 'Date'].map((header) => (
                                <th
                                    key={header}
                                    style={{
                                        textAlign: 'left',
                                        padding: '16px 20px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: '#64748b',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        background: '#fafbfc',
                                    }}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {allClaims.map((claim, idx) => (
                            <tr
                                key={claim.id}
                                style={{
                                    borderBottom: idx < allClaims.length - 1 ? '1px solid #f8fafc' : 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <td style={{ padding: '16px 20px' }}>
                                    <span style={{
                                        fontFamily: 'monospace',
                                        fontSize: '13px',
                                        color: '#64748b',
                                        background: '#f8fafc',
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                    }}>
                                        #{claim.id}
                                    </span>
                                </td>
                                <td style={{ padding: '16px 20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: '38px',
                                            height: '38px',
                                            borderRadius: '10px',
                                            background: `linear-gradient(135deg, ${['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'][idx % 5]} 0%, ${['#60a5fa', '#a78bfa', '#f472b6', '#fbbf24', '#34d399'][idx % 5]} 100%)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontWeight: '600',
                                            fontSize: '12px',
                                        }}>
                                            {claim.firstName?.[0]}{claim.lastName?.[0]}
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', margin: 0 }}>
                                                {claim.firstName} {claim.lastName}
                                            </p>
                                            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0 0' }}>{claim.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '16px 20px' }}>
                                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#0f172a', margin: 0 }}>
                                        {(claim.departureAirport as any)?.iata || '?'} → {(claim.arrivalAirport as any)?.iata || '?'}
                                    </p>
                                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0 0' }}>
                                        {(claim.selectedFlight as any)?.flightNumber || claim.manualFlightNumber || 'N/A'}
                                    </p>
                                </td>
                                <td style={{ padding: '16px 20px' }}>
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
                                </td>
                                <td style={{ padding: '16px 20px' }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {claim.boardingPassUrl ? (
                                            <a
                                                href={claim.boardingPassUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    fontSize: '12px',
                                                    fontWeight: '500',
                                                    padding: '5px 10px',
                                                    borderRadius: '6px',
                                                    background: '#eff6ff',
                                                    color: '#3b82f6',
                                                    textDecoration: 'none',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                }}
                                            >
                                                🎫 Pass
                                            </a>
                                        ) : (
                                            <span style={{ fontSize: '12px', color: '#cbd5e1' }}>—</span>
                                        )}
                                        {claim.idDocumentUrl ? (
                                            <a
                                                href={claim.idDocumentUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    fontSize: '12px',
                                                    fontWeight: '500',
                                                    padding: '5px 10px',
                                                    borderRadius: '6px',
                                                    background: '#f5f3ff',
                                                    color: '#8b5cf6',
                                                    textDecoration: 'none',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                }}
                                            >
                                                🪪 ID
                                            </a>
                                        ) : (
                                            <span style={{ fontSize: '12px', color: '#cbd5e1' }}>—</span>
                                        )}
                                    </div>
                                </td>
                                <td style={{ padding: '16px 20px', fontSize: '13px', color: '#64748b' }}>
                                    {claim.createdAt ? new Date(claim.createdAt).toLocaleDateString() : 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {allClaims.length === 0 && (
                    <div style={{ padding: '80px 24px', textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📭</div>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', margin: '0 0 8px 0' }}>No claims found</h3>
                        <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>New claims will appear here when users submit them.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
