'use client';

import { useState, useEffect } from 'react';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string | null;
    photo: string | null;
    email: string | null;
    linkedin: string | null;
    displayOrder: number;
    isActive: boolean;
}

export default function TeamManagementPage() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [formData, setFormData] = useState({
        name: '', role: '', bio: '', photo: '', email: '', linkedin: '', twitter: '', displayOrder: 0, isActive: true,
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => { fetchMembers(); }, []);

    const fetchMembers = async () => {
        try {
            const res = await fetch('/api/team');
            const data = await res.json();
            setMembers(data);
        } catch (err) {
            console.error('Error fetching team:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const url = editingMember ? `/api/team/${editingMember.id}` : '/api/team';
            const method = editingMember ? 'PATCH' : 'POST';
            await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
            setShowModal(false);
            setEditingMember(null);
            resetForm();
            fetchMembers();
        } catch (err) {
            console.error('Error saving:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (member: TeamMember) => {
        setFormData({
            name: member.name, role: member.role, bio: member.bio || '', photo: member.photo || '',
            email: member.email || '', linkedin: member.linkedin || '', twitter: '', displayOrder: member.displayOrder, isActive: member.isActive,
        });
        setEditingMember(member);
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this team member?')) return;
        await fetch(`/api/team/${id}`, { method: 'DELETE' });
        fetchMembers();
    };

    const resetForm = () => {
        setFormData({ name: '', role: '', bio: '', photo: '', email: '', linkedin: '', twitter: '', displayOrder: 0, isActive: true });
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Team & Experts</h1>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>Manage your team members and experts</p>
                </div>
                <button
                    onClick={() => { resetForm(); setEditingMember(null); setShowModal(true); }}
                    style={{ padding: '12px 24px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
                >
                    + Add Member
                </button>
            </div>

            {/* Team Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {loading ? (
                    <p style={{ color: '#94a3b8' }}>Loading...</p>
                ) : members.length === 0 ? (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px' }}>
                        <p style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>👥</p>
                        <p style={{ color: '#0f172a', fontWeight: '500' }}>No team members yet</p>
                    </div>
                ) : (
                    members.map((member) => (
                        <div key={member.id} style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: member.isActive ? '1px solid #e2e8f0' : '1px solid #fecaca' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: '600', overflow: 'hidden' }}>
                                    {member.photo ? <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : member.name[0]}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', margin: 0 }}>{member.name}</h3>
                                    <p style={{ fontSize: '13px', color: '#64748b', margin: '2px 0 0 0' }}>{member.role}</p>
                                </div>
                            </div>
                            {member.bio && <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0', lineHeight: 1.5 }}>{member.bio.substring(0, 100)}...</p>}
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => handleEdit(member)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: '#3b82f6', fontSize: '13px', cursor: 'pointer' }}>Edit</button>
                                <button onClick={() => handleDelete(member.id)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', fontSize: '13px', cursor: 'pointer' }}>Delete</button>
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
                            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a', margin: 0 }}>{editingMember ? 'Edit Member' : 'Add Member'}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#64748b' }}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Name *</label>
                                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Role *</label>
                                    <input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Bio</label>
                                <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={3} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Photo URL</label>
                                    <input type="url" value={formData.photo} onChange={(e) => setFormData({ ...formData, photo: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Email</label>
                                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>LinkedIn URL</label>
                                    <input type="url" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Display Order</label>
                                    <input type="number" value={formData.displayOrder} onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
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
