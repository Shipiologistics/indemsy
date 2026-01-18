import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
    const allUsers = await db.select().from(users).orderBy(desc(users.createdAt));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Users</h1>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '6px 0 0 0' }}>
                        Manage platform access and user accounts
                    </p>
                </div>
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
                    <span style={{ fontSize: '16px' }}>+</span>
                    Add User
                </button>
            </div>

            {/* Users Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '20px',
            }}>
                {allUsers.map((user, idx) => (
                    <div
                        key={user.id}
                        style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '24px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                            border: '1px solid #f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                        }}
                    >
                        <div style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '14px',
                            background: `linear-gradient(135deg, ${['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'][idx % 5]} 0%, ${['#60a5fa', '#a78bfa', '#f472b6', '#fbbf24', '#34d399'][idx % 5]} 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: '700',
                            fontSize: '16px',
                        }}>
                            {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a', margin: 0 }}>
                                {user.name || 'Unnamed User'}
                            </p>
                            <p style={{
                                fontSize: '13px',
                                color: '#64748b',
                                margin: '4px 0 0 0',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}>
                                {user.email}
                            </p>
                            <p style={{ fontSize: '11px', color: '#94a3b8', margin: '6px 0 0 0' }}>
                                Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                        <button style={{
                            background: '#f8fafc',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            fontSize: '12px',
                            fontWeight: '500',
                            color: '#64748b',
                            cursor: 'pointer',
                        }}>
                            Edit
                        </button>
                    </div>
                ))}
            </div>

            {allUsers.length === 0 && (
                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '80px 24px',
                    textAlign: 'center',
                    border: '1px solid #f1f5f9',
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>👥</div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', margin: '0 0 8px 0' }}>No users found</h3>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Add users to manage platform access.</p>
                </div>
            )}
        </div>
    );
}
