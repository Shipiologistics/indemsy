'use client';

import { useState, useEffect } from 'react';

interface JobPosting {
    id: number;
    title: string;
    department: string | null;
    location: string | null;
    type: string | null;
    description: string;
    isActive: boolean;
    createdAt: string;
}

export default function CareersManagementPage() {
    const [jobs, setJobs] = useState<JobPosting[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
    const [formData, setFormData] = useState({
        title: '', department: '', location: '', type: 'full-time', description: '',
        requirements: '', benefits: '', salaryRange: '', applicationUrl: '', isActive: true,
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => { fetchJobs(); }, []);

    const fetchJobs = async () => {
        try {
            const res = await fetch('/api/careers');
            const data = await res.json();
            setJobs(data);
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
            const url = editingJob ? `/api/careers/${editingJob.id}` : '/api/careers';
            const method = editingJob ? 'PATCH' : 'POST';
            await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
            setShowModal(false);
            setEditingJob(null);
            resetForm();
            fetchJobs();
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = async (job: JobPosting) => {
        const res = await fetch(`/api/careers/${job.id}`);
        const fullJob = await res.json();
        setFormData({
            title: fullJob.title, department: fullJob.department || '', location: fullJob.location || '',
            type: fullJob.type || 'full-time', description: fullJob.description,
            requirements: fullJob.requirements || '', benefits: fullJob.benefits || '',
            salaryRange: fullJob.salaryRange || '', applicationUrl: fullJob.applicationUrl || '', isActive: fullJob.isActive,
        });
        setEditingJob(job);
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this job posting?')) return;
        await fetch(`/api/careers/${id}`, { method: 'DELETE' });
        fetchJobs();
    };

    const toggleActive = async (job: JobPosting) => {
        await fetch(`/api/careers/${job.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isActive: !job.isActive }) });
        fetchJobs();
    };

    const resetForm = () => {
        setFormData({ title: '', department: '', location: '', type: 'full-time', description: '', requirements: '', benefits: '', salaryRange: '', applicationUrl: '', isActive: true });
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Job Postings</h1>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>Manage career opportunities</p>
                </div>
                <button onClick={() => { resetForm(); setEditingJob(null); setShowModal(true); }} style={{ padding: '12px 24px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                    + Add Job
                </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
                <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 8px 0' }}>Total Jobs</p>
                    <p style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', margin: 0 }}>{jobs.length}</p>
                </div>
                <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 8px 0' }}>Active</p>
                    <p style={{ fontSize: '32px', fontWeight: '700', color: '#10b981', margin: 0 }}>{jobs.filter(j => j.isActive).length}</p>
                </div>
                <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 8px 0' }}>Closed</p>
                    <p style={{ fontSize: '32px', fontWeight: '700', color: '#94a3b8', margin: 0 }}>{jobs.filter(j => !j.isActive).length}</p>
                </div>
            </div>

            {/* Jobs List */}
            <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
                {loading ? (
                    <p style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Loading...</p>
                ) : jobs.length === 0 ? (
                    <div style={{ padding: '60px', textAlign: 'center' }}>
                        <p style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>💼</p>
                        <p style={{ color: '#0f172a', fontWeight: '500' }}>No job postings yet</p>
                    </div>
                ) : (
                    jobs.map((job, idx) => (
                        <div key={job.id} style={{ padding: '20px 24px', borderBottom: idx < jobs.length - 1 ? '1px solid #f1f5f9' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                                    <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a', margin: 0 }}>{job.title}</h3>
                                    <span style={{ padding: '2px 8px', borderRadius: '10px', background: job.isActive ? '#ecfdf5' : '#f1f5f9', color: job.isActive ? '#059669' : '#94a3b8', fontSize: '11px', fontWeight: '500' }}>
                                        {job.isActive ? 'Active' : 'Closed'}
                                    </span>
                                </div>
                                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                                    {job.department && `${job.department} • `}{job.location || 'Remote'} • {job.type || 'Full-time'}
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => toggleActive(job)} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'white', fontSize: '12px', cursor: 'pointer', color: job.isActive ? '#b45309' : '#059669' }}>
                                    {job.isActive ? 'Close' : 'Reopen'}
                                </button>
                                <button onClick={() => handleEdit(job)} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'white', color: '#3b82f6', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
                                <button onClick={() => handleDelete(job.id)} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }}>
                    <div style={{ background: 'white', borderRadius: '20px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflow: 'auto' }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a', margin: 0 }}>{editingJob ? 'Edit Job' : 'Add Job'}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#64748b' }}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Job Title *</label>
                                    <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Department</label>
                                    <input type="text" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Location</label>
                                    <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="e.g. Luxembourg, Remote" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Type</label>
                                    <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box', background: 'white' }}>
                                        <option value="full-time">Full-time</option>
                                        <option value="part-time">Part-time</option>
                                        <option value="contract">Contract</option>
                                        <option value="internship">Internship</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Salary Range</label>
                                    <input type="text" value={formData.salaryRange} onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })} placeholder="e.g. €50k-70k" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Description *</label>
                                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Requirements</label>
                                <textarea value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} rows={3} placeholder="List the requirements..." style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Application URL</label>
                                <input type="url" value={formData.applicationUrl} onChange={(e) => setFormData({ ...formData, applicationUrl: e.target.value })} placeholder="https://..." style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' }} />
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
