'use client';

import { useState, useEffect } from 'react';

interface PageContent {
    id: number;
    pageSlug: string;
    title: string;
    content: string;
    metaDescription: string | null;
    heroImage: string | null;
    isPublished: boolean;
    updatedAt: string;
}

// Predefined pages for the website
const predefinedPages = [
    { slug: 'about-us', name: 'About Us', icon: '👥' },
    { slug: 'planting-trees', name: 'Planting Trees', icon: '🌳' },
    { slug: 'affiliate-program', name: 'Affiliate Program', icon: '🤝' },
    { slug: 'employee-benefit', name: 'Employee Benefit', icon: '💼' },
    { slug: 'for-airlines', name: 'For Airlines', icon: '✈️' },
    { slug: 'become-a-partner', name: 'Become a Partner', icon: '🤝' },
];

export default function PagesManagementPage() {
    const [pages, setPages] = useState<PageContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPage, setEditingPage] = useState<PageContent | null>(null);
    const [selectedSlug, setSelectedSlug] = useState('');
    const [formData, setFormData] = useState({
        pageSlug: '',
        title: '',
        content: '',
        metaDescription: '',
        heroImage: '',
        isPublished: true,
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            const res = await fetch('/api/pages');
            const data = await res.json();
            setPages(data);
        } catch (err) {
            console.error('Error fetching pages:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            const url = editingPage ? `/api/pages/${editingPage.id}` : '/api/pages';
            const method = editingPage ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to save page');
            }

            setShowModal(false);
            setEditingPage(null);
            resetForm();
            fetchPages();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = async (page: PageContent) => {
        setFormData({
            pageSlug: page.pageSlug,
            title: page.title,
            content: page.content,
            metaDescription: page.metaDescription || '',
            heroImage: page.heroImage || '',
            isPublished: page.isPublished,
        });
        setEditingPage(page);
        setShowModal(true);
    };

    const handleCreate = (predef: typeof predefinedPages[0]) => {
        setFormData({
            pageSlug: predef.slug,
            title: predef.name,
            content: '',
            metaDescription: '',
            heroImage: '',
            isPublished: true,
        });
        setEditingPage(null);
        setShowModal(true);
    };

    const handleDelete = async (pageId: number) => {
        if (!confirm('Are you sure you want to delete this page content?')) return;

        try {
            await fetch(`/api/pages/${pageId}`, { method: 'DELETE' });
            fetchPages();
        } catch (err) {
            console.error('Error deleting page:', err);
        }
    };

    const resetForm = () => {
        setFormData({
            pageSlug: '',
            title: '',
            content: '',
            metaDescription: '',
            heroImage: '',
            isPublished: true,
        });
    };

    const getPageStatus = (slug: string) => {
        const page = pages.find(p => p.pageSlug === slug);
        return page ? { exists: true, page } : { exists: false };
    };

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Page Content</h1>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Manage content for your website pages
                </p>
            </div>

            {/* Pages Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                {predefinedPages.map((predef) => {
                    const status = getPageStatus(predef.slug);
                    return (
                        <div
                            key={predef.slug}
                            style={{
                                background: 'white',
                                borderRadius: '16px',
                                padding: '24px',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                                border: status.exists ? '1px solid #10b981' : '1px solid #e2e8f0',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '14px',
                                    background: status.exists
                                        ? 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)'
                                        : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px',
                                    flexShrink: 0,
                                }}>
                                    {predef.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', margin: 0 }}>
                                            {predef.name}
                                        </h3>
                                        <span style={{
                                            padding: '2px 8px',
                                            borderRadius: '10px',
                                            background: status.exists ? '#ecfdf5' : '#fef3c7',
                                            color: status.exists ? '#059669' : '#b45309',
                                            fontSize: '11px',
                                            fontWeight: '500',
                                        }}>
                                            {status.exists ? 'Published' : 'Not Set'}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0' }}>
                                        /{predef.slug}
                                    </p>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {status.exists ? (
                                            <>
                                                <button
                                                    onClick={() => handleEdit(status.page!)}
                                                    style={{
                                                        padding: '8px 16px',
                                                        borderRadius: '8px',
                                                        border: 'none',
                                                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                                        color: 'white',
                                                        fontSize: '13px',
                                                        fontWeight: '500',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    Edit Content
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(status.page!.id)}
                                                    style={{
                                                        padding: '8px 16px',
                                                        borderRadius: '8px',
                                                        border: '1px solid #fecaca',
                                                        background: 'white',
                                                        color: '#dc2626',
                                                        fontSize: '13px',
                                                        fontWeight: '500',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => handleCreate(predef)}
                                                style={{
                                                    padding: '8px 16px',
                                                    borderRadius: '8px',
                                                    border: 'none',
                                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                                    color: 'white',
                                                    fontSize: '13px',
                                                    fontWeight: '500',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                + Add Content
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {status.exists && status.page && (
                                <div style={{
                                    marginTop: '16px',
                                    paddingTop: '16px',
                                    borderTop: '1px solid #f1f5f9',
                                    fontSize: '12px',
                                    color: '#94a3b8',
                                }}>
                                    Last updated: {new Date(status.page.updatedAt).toLocaleDateString()}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '24px',
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        width: '100%',
                        maxWidth: '800px',
                        maxHeight: '90vh',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <div style={{
                            padding: '24px',
                            borderBottom: '1px solid #e2e8f0',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a', margin: 0 }}>
                                {editingPage ? `Edit: ${formData.title}` : `Create: ${formData.title}`}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    fontSize: '24px',
                                    cursor: 'pointer',
                                    color: '#64748b',
                                }}
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
                            {error && (
                                <div style={{
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    background: '#fef2f2',
                                    border: '1px solid #fecaca',
                                    color: '#dc2626',
                                    fontSize: '14px',
                                    marginBottom: '20px',
                                }}>
                                    {error}
                                </div>
                            )}

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                                        Page Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            borderRadius: '10px',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '14px',
                                            boxSizing: 'border-box',
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                                        Page Slug
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.pageSlug}
                                        disabled
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            borderRadius: '10px',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '14px',
                                            boxSizing: 'border-box',
                                            background: '#f8fafc',
                                            color: '#64748b',
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                                    Meta Description (SEO)
                                </label>
                                <textarea
                                    value={formData.metaDescription}
                                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                                    rows={2}
                                    placeholder="Write a short description for search engines..."
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '10px',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '14px',
                                        boxSizing: 'border-box',
                                        resize: 'vertical',
                                        fontFamily: 'inherit',
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                                    Hero Image URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.heroImage}
                                    onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '10px',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '14px',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                                    Page Content * (HTML supported)
                                </label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    rows={15}
                                    required
                                    placeholder="Write your page content here. HTML tags are supported for formatting..."
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '10px',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '14px',
                                        boxSizing: 'border-box',
                                        resize: 'vertical',
                                        fontFamily: 'monospace',
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    style={{
                                        padding: '12px 24px',
                                        borderRadius: '10px',
                                        border: '1px solid #e2e8f0',
                                        background: 'white',
                                        color: '#64748b',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    style={{
                                        padding: '12px 32px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                        color: 'white',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        cursor: saving ? 'not-allowed' : 'pointer',
                                        opacity: saving ? 0.7 : 1,
                                    }}
                                >
                                    {saving ? 'Saving...' : 'Save Page'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
