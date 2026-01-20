'use client';

import { useState, useEffect } from 'react';

interface Partner {
    id: number;
    name: string;
    type: string;
    logo: string | null;
    description: string | null;
    websiteUrl: string | null;
    displayOrder: number;
    isActive: boolean;
}

const partnerTypes = [
    { value: 'affiliate', label: 'Affiliate', icon: '🤝' },
    { value: 'legal', label: 'Legal Partner', icon: '⚖️' },
    { value: 'airline', label: 'Airlines', icon: '✈️' },
    { value: 'employee-benefit', label: 'Employee Benefit', icon: '💼' },
];

export default function PartnersManagementPage() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
    const [activeTab, setActiveTab] = useState('all');
    const [formData, setFormData] = useState({
        name: '', type: 'affiliate', logo: '', description: '', websiteUrl: '', contactEmail: '', displayOrder: 0, isActive: true,
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => { fetchPartners(); }, []);

    const fetchPartners = async () => {
        try {
            const res = await fetch('/api/partners');
            const data = await res.json();
            setPartners(data);
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
            const url = editingPartner ? `/api/partners/${editingPartner.id}` : '/api/partners';
            const method = editingPartner ? 'PATCH' : 'POST';
            await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
            setShowModal(false);
            setEditingPartner(null);
            resetForm();
            fetchPartners();
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (partner: Partner) => {
        setFormData({
            name: partner.name, type: partner.type, logo: partner.logo || '', description: partner.description || '',
            websiteUrl: partner.websiteUrl || '', contactEmail: '', displayOrder: partner.displayOrder, isActive: partner.isActive,
        });
        setEditingPartner(partner);
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this partner?')) return;
        await fetch(`/api/partners/${id}`, { method: 'DELETE' });
        fetchPartners();
    };

    const resetForm = () => {
        setFormData({ name: '', type: 'affiliate', logo: '', description: '', websiteUrl: '', contactEmail: '', displayOrder: 0, isActive: true });
    };

    const filteredPartners = activeTab === 'all' ? partners : partners.filter(p => p.type === activeTab);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Partners</h1>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>Manage affiliates, legal partners, and more</p>
                </div>
                <button onClick={() => { resetForm(); setEditingPartner(null); setShowModal(true); }} style={{ padding: '12px 24px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                    + Add Partner
                </button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', background: 'white', padding: '8px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <button onClick={() => setActiveTab('all')} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: activeTab === 'all' ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'transparent', color: activeTab === 'all' ? 'white' : '#64748b', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
                    All ({partners.length})
                </button>
                {partnerTypes.map(type => (
                    <button key={type.value} onClick={() => setActiveTab(type.value)} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: activeTab === type.value ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'transparent', color: activeTab === type.value ? 'white' : '#64748b', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
                        {type.icon} {type.label} ({partners.filter(p => p.type === type.value).length})
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {loading ? (
                    <p style={{ color: '#94a3b8' }}>Loading...</p>
                ) : filteredPartners.length === 0 ? (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px' }}>
                        <p style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>🤝</p>
                        <p style={{ color: '#0f172a', fontWeight: '500' }}>No partners in this category</p>
                    </div>
                ) : (
                    filteredPartners.map((partner) => (
                        <div key={partner.id} style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                {partner.logo ? (
                                    <img src={partner.logo} alt={partner.name} style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '8px' }} />
                                ) : (
                                    <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px', fontWeight: '600' }}>
                                        {partner.name[0]}
                                    </div>
                                )}
                                <div>
                                    <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a', margin: 0 }}>{partner.name}</h3>
                                    <span style={{ fontSize: '11px', padding: '2px 8px', background: '#f1f5f9', borderRadius: '10px', color: '#64748b' }}>
                                        {partnerTypes.find(t => t.value === partner.type)?.label || partner.type}
                                    </span>
                                </div>
                            </div>
                            {partner.description && (
                                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0', lineHeight: 1.5 }}>{partner.description.substring(0, 80)}...</p>
                            )}
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => handleEdit(partner)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: '#3b82f6', fontSize: '13px', cursor: 'pointer' }}>Edit</button>
                                <button onClick={() => handleDelete(partner.id)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', fontSize: '13px', cursor: 'pointer' }}>Delete</button>
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
                            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a', margin: 0 }}>{editingPartner ? 'Edit Partner' : 'Add Partner'}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#64748b' }}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Name *</label>
                                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Type *</label>
                                    <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box', background: 'white' }}>
                                        {partnerTypes.map(type => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Logo URL</label>
                                <input type="url" value={formData.logo} onChange={(e) => setFormData({ ...formData, logo: e.target.value })} placeholder="https://..." style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Website URL</label>
                                <input type="url" value={formData.websiteUrl} onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })} placeholder="https://..." style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Description</label>
                                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Display Order</label>
                                <input type="number" value={formData.displayOrder} onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })} style={{ width: '100px', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px' }} />
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
