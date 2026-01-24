'use client';

import { useState, useEffect } from 'react';
import { getSocialLinks, addSocialLink, updateSocialLink, deleteSocialLink } from '@/app/actions/socials';

interface SocialLink {
    id: number;
    platform: string;
    url: string;
    icon: string | null;
    isActive: boolean;
    displayOrder: number;
}

export default function SocialLinksPage() {
    const [links, setLinks] = useState<SocialLink[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Partial<SocialLink>>({});

    const fetchLinks = async () => {
        setLoading(true);
        const res = await getSocialLinks();
        if (res.success && res.links) {
            setLinks(res.links as unknown as SocialLink[]);
        }
        setLoading(false);
    };

    const socialIcons: Record<string, React.ReactNode> = {
        facebook: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#1877F2' }}>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
        twitter: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#1DA1F2' }}>
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
        ),
        linkedin: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#0A66C2' }}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        instagram: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#E4405F' }}>
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
            </svg>
        ),
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editForm.platform || !editForm.url) return;

        if (isEditing) {
            await updateSocialLink(isEditing, editForm);
        } else {
            // Check for duplicate platform if adding new
            const exists = links.some(l => l.platform.toLowerCase() === editForm.platform?.toLowerCase());
            if (exists) {
                alert('Platform already exists. Please edit the existing one.');
                return;
            }
            await addSocialLink(editForm as any);
        }

        setIsEditing(null);
        setEditForm({});
        fetchLinks();
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this link?')) {
            await deleteSocialLink(id);
            fetchLinks();
        }
    };

    const startEdit = (link: SocialLink) => {
        setIsEditing(link.id);
        setEditForm(link);
    };

    const startAdd = () => {
        setIsEditing(0); // 0 indicates new
        setEditForm({ isActive: true, displayOrder: 0 });
    };

    const cancelEdit = () => {
        setIsEditing(null);
        setEditForm({});
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ padding: '32px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>Social Media Links</h1>
                    <p style={{ color: '#64748b', fontSize: '14px' }}>Manage the social media links displayed in the website footer.</p>
                </div>
                <button
                    onClick={startAdd}
                    style={{
                        padding: '12px 24px',
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                        transition: 'all 0.2s'
                    }}
                >
                    + Add New Platform
                </button>
            </div>

            {isEditing !== null && (
                <div style={{
                    background: 'white',
                    padding: '32px',
                    borderRadius: '16px',
                    boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
                    marginBottom: '32px',
                    border: '1px solid #e2e8f0'
                }}>
                    <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: '#1e293b' }}>
                        {isEditing === 0 ? 'Add New Link' : `Edit ${editForm.platform}`}
                    </h2>
                    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#475569' }}>Platform Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Facebook"
                                    value={editForm.platform || ''}
                                    onChange={e => setEditForm({ ...editForm, platform: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '10px',
                                        border: '1px solid #cbd5e1',
                                        background: isEditing !== 0 ? '#f8fafc' : 'white',
                                        color: isEditing !== 0 ? '#64748b' : 'inherit',
                                        fontSize: '15px'
                                    }}
                                    readOnly={isEditing !== 0}
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#475569' }}>Profile URL</label>
                                <input
                                    type="url"
                                    placeholder="https://..."
                                    value={editForm.url || ''}
                                    onChange={e => setEditForm({ ...editForm, url: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '10px',
                                        border: '1px solid #cbd5e1',
                                        fontSize: '15px'
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        {/* Hidden advanced fields for simplicity */}
                        <div style={{ display: 'none' }}>
                            <input
                                type="text"
                                placeholder="SVG Path"
                                value={editForm.icon || ''}
                                onChange={e => setEditForm({ ...editForm, icon: e.target.value })}
                            />
                            <input
                                type="number"
                                value={editForm.displayOrder || 0}
                                onChange={e => setEditForm({ ...editForm, displayOrder: parseInt(e.target.value) })}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
                            <button
                                type="submit"
                                style={{
                                    padding: '12px 24px',
                                    background: '#10b981',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '15px'
                                }}
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={cancelEdit}
                                style={{
                                    padding: '12px 24px',
                                    background: '#f1f5f9',
                                    color: '#64748b',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '15px'
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Platform</th>
                            <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Link</th>
                            <th style={{ padding: '20px', textAlign: 'right', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {links.map(link => (
                            <tr key={link.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: '40px', height: '40px', borderRadius: '10px',
                                            background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#475569'
                                        }}>
                                            {socialIcons[link.platform.toLowerCase()] || (link.icon ? (
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d={link.icon} />
                                                </svg>
                                            ) : (
                                                <span style={{ fontWeight: '700' }}>{link.platform[0]}</span>
                                            ))}
                                        </div>
                                        <span style={{ fontWeight: '600', color: '#1e293b' }}>{link.platform}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px' }}>
                                        {link.url}
                                    </a>
                                </td>
                                <td style={{ padding: '20px', textAlign: 'right' }}>
                                    <button
                                        onClick={() => startEdit(link)}
                                        style={{
                                            padding: '8px 16px',
                                            background: 'white',
                                            border: '1px solid #cbd5e1',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            color: '#475569',
                                            fontWeight: '500',
                                            fontSize: '14px',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                            marginRight: '8px'
                                        }}
                                    >
                                        Edit Link
                                    </button>
                                    <button
                                        onClick={() => handleDelete(link.id)}
                                        style={{
                                            padding: '8px 16px',
                                            background: 'white',
                                            border: '1px solid #fca5a5',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            color: '#ef4444',
                                            fontWeight: '500',
                                            fontSize: '14px',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {links.length === 0 && (
                            <tr>
                                <td colSpan={3} style={{ padding: '48px', textAlign: 'center', color: '#64748b' }}>
                                    No social links found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
