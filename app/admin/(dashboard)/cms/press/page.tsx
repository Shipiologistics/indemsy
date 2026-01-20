'use client';

import { useState, useEffect } from 'react';

interface PressRelease {
    id: number;
    title: string;
    source: string | null;
    sourceUrl: string | null;
    excerpt: string | null;
    logoUrl: string | null;
    publishedDate: string | null;
    isActive: boolean;
}

export default function PressManagementPage() {
    const [releases, setReleases] = useState<PressRelease[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingRelease, setEditingRelease] = useState<PressRelease | null>(null);
    const [formData, setFormData] = useState({
        title: '', source: '', sourceUrl: '', excerpt: '', logoUrl: '', publishedDate: '', isActive: true,
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => { fetchReleases(); }, []);

    const fetchReleases = async () => {
        try {
            const res = await fetch('/api/press');
            const data = await res.json();
            setReleases(data);
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const url = editingRelease ? `/api/press/${editingRelease.id}` : '/api/press';
            const method = editingRelease ? 'PATCH' : 'POST';
            await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
            setShowModal(false);
            setEditingRelease(null);
            resetForm();
            fetchReleases();
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (release: PressRelease) => {
        setFormData({
            title: release.title, source: release.source || '', sourceUrl: release.sourceUrl || '',
            excerpt: release.excerpt || '', logoUrl: release.logoUrl || '',
            publishedDate: release.publishedDate || '', isActive: release.isActive,
        });
        setEditingRelease(release);
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this press release?')) return;
        await fetch(`/api/press/${id}`, { method: 'DELETE' });
        fetchReleases();
    };

    const resetForm = () => {
        setFormData({ title: '', source: '', sourceUrl: '', excerpt: '', logoUrl: '', publishedDate: '', isActive: true });
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Press & Media</h1>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>Manage press coverage and media mentions</p>
                </div>
                <button onClick={() => { resetForm(); setEditingRelease(null); setShowModal(true); }} style={{ padding: '12px 24px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                    + Add Press Item
                </button>
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                {loading ? (
                    <p style={{ color: '#94a3b8' }}>Loading...</p>
                ) : releases.length === 0 ? (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px' }}>
                        <p style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📰</p>
                        <p style={{ color: '#0f172a', fontWeight: '500' }}>No press items yet</p>
                    </div>
                ) : (
                    releases.map((release) => (
                        <div key={release.id} style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                {release.logoUrl ? (
                                    <img src={release.logoUrl} alt={release.source || ''} style={{ height: '32px', objectFit: 'contain' }} />
                                ) : (
                                    <span style={{ fontSize: '24px' }}>📰</span>
                                )}
                                {release.source && (
                                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>{release.source}</span>
                                )}
                            </div>
                            <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a', margin: '0 0 8px 0', lineHeight: 1.4 }}>{release.title}</h3>
                            {release.excerpt && (
                                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 12px 0', lineHeight: 1.5 }}>{release.excerpt.substring(0, 100)}...</p>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                                    {release.publishedDate || 'No date'}
                                </span>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button onClick={() => handleEdit(release)} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'white', color: '#3b82f6', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
                                    <button onClick={() => handleDelete(release.id)} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }}>
                    <div style={{ background: 'white', borderRadius: '20px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflow: 'auto' }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a', margin: 0 }}>{editingRelease ? 'Edit Press Item' : 'Add Press Item'}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#64748b' }}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Title *</label>
                                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Source</label>
                                    <input type="text" value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })} placeholder="e.g. Forbes, TechCrunch" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Published Date</label>
                                    <input type="date" value={formData.publishedDate} onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Source URL</label>
                                <input type="url" value={formData.sourceUrl} onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })} placeholder="https://..." style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Logo URL</label>
                                <input type="url" value={formData.logoUrl} onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })} placeholder="https://..." style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Excerpt</label>
                                <textarea value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} rows={3} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '12px 24px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" disabled={saving} style={{ padding: '12px 32px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
                                    {saving ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
