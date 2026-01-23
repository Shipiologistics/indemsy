'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string | null;
    category: string | null;
    author: string | null;
    isPublished: boolean;
    isFeatured: boolean;
    publishedAt: string | null;
    createdAt: string;
}

export default function BlogManagementPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [formData, setFormData] = useState({
        slug: '',
        title: '',
        excerpt: '',
        content: '',
        category: '',
        author: 'FlyCompense Team',
        readTime: 5,
        isPublished: false,
        isFeatured: false,
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/blog');
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            console.error('Error fetching posts:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            const url = editingPost ? `/api/blog/${editingPost.id}` : '/api/blog';
            const method = editingPost ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to save post');
            }

            setShowModal(false);
            setEditingPost(null);
            resetForm();
            fetchPosts();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = async (post: BlogPost) => {
        // Fetch full post data
        try {
            const res = await fetch(`/api/blog/${post.id}`);
            const fullPost = await res.json();
            setFormData({
                slug: fullPost.slug,
                title: fullPost.title,
                excerpt: fullPost.excerpt || '',
                content: fullPost.content,
                category: fullPost.category || '',
                author: fullPost.author || 'FlyCompense Team',
                readTime: fullPost.readTime || 5,
                isPublished: fullPost.isPublished,
                isFeatured: fullPost.isFeatured,
            });
            setEditingPost(post);
            setShowModal(true);
        } catch (err) {
            console.error('Error fetching post:', err);
        }
    };

    const handleDelete = async (postId: number) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            await fetch(`/api/blog/${postId}`, { method: 'DELETE' });
            fetchPosts();
        } catch (err) {
            console.error('Error deleting post:', err);
        }
    };

    const togglePublish = async (post: BlogPost) => {
        try {
            await fetch(`/api/blog/${post.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isPublished: !post.isPublished }),
            });
            fetchPosts();
        } catch (err) {
            console.error('Error updating post:', err);
        }
    };

    const resetForm = () => {
        setFormData({
            slug: '',
            title: '',
            excerpt: '',
            content: '',
            category: '',
            author: 'FlyCompense Team',
            readTime: 5,
            isPublished: false,
            isFeatured: false,
        });
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Blog Posts</h1>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>
                        Create and manage blog articles for your website
                    </p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setEditingPost(null);
                        setShowModal(true);
                    }}
                    style={{
                        padding: '12px 24px',
                        borderRadius: '10px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <span style={{ fontSize: '18px' }}>+</span> New Post
                </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 8px 0' }}>Total Posts</p>
                    <p style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', margin: 0 }}>{posts.length}</p>
                </div>
                <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 8px 0' }}>Published</p>
                    <p style={{ fontSize: '32px', fontWeight: '700', color: '#10b981', margin: 0 }}>{posts.filter(p => p.isPublished).length}</p>
                </div>
                <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 8px 0' }}>Drafts</p>
                    <p style={{ fontSize: '32px', fontWeight: '700', color: '#f59e0b', margin: 0 }}>{posts.filter(p => !p.isPublished).length}</p>
                </div>
                <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 8px 0' }}>Featured</p>
                    <p style={{ fontSize: '32px', fontWeight: '700', color: '#8b5cf6', margin: 0 }}>{posts.filter(p => p.isFeatured).length}</p>
                </div>
            </div>

            {/* Posts Table */}
            <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Title</th>
                            <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Category</th>
                            <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                            <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Date</th>
                            <th style={{ padding: '16px 20px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>
                                    Loading posts...
                                </td>
                            </tr>
                        ) : posts.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ padding: '60px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📝</div>
                                    <p style={{ fontSize: '16px', fontWeight: '500', color: '#0f172a', margin: '0 0 8px 0' }}>No blog posts yet</p>
                                    <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Create your first post to get started</p>
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '16px 20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            {post.isFeatured && (
                                                <span style={{ fontSize: '14px' }} title="Featured">⭐</span>
                                            )}
                                            <div>
                                                <p style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', margin: 0 }}>{post.title}</p>
                                                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0 0' }}>{post.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 20px' }}>
                                        {post.category ? (
                                            <span style={{
                                                padding: '4px 10px',
                                                borderRadius: '20px',
                                                background: '#eff6ff',
                                                color: '#3b82f6',
                                                fontSize: '12px',
                                                fontWeight: '500'
                                            }}>
                                                {post.category}
                                            </span>
                                        ) : (
                                            <span style={{ color: '#94a3b8', fontSize: '13px' }}>—</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '16px 20px' }}>
                                        <span style={{
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            background: post.isPublished ? '#ecfdf5' : '#fef3c7',
                                            color: post.isPublished ? '#059669' : '#b45309',
                                            fontSize: '12px',
                                            fontWeight: '500',
                                        }}>
                                            {post.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 20px', fontSize: '13px', color: '#64748b' }}>
                                        {post.publishedAt
                                            ? new Date(post.publishedAt).toLocaleDateString()
                                            : new Date(post.createdAt).toLocaleDateString()
                                        }
                                    </td>
                                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <button
                                                onClick={() => togglePublish(post)}
                                                style={{
                                                    padding: '6px 12px',
                                                    borderRadius: '6px',
                                                    border: '1px solid #e2e8f0',
                                                    background: 'white',
                                                    fontSize: '12px',
                                                    cursor: 'pointer',
                                                    color: post.isPublished ? '#b45309' : '#059669',
                                                }}
                                            >
                                                {post.isPublished ? 'Unpublish' : 'Publish'}
                                            </button>
                                            <button
                                                onClick={() => handleEdit(post)}
                                                style={{
                                                    padding: '6px 12px',
                                                    borderRadius: '6px',
                                                    border: '1px solid #e2e8f0',
                                                    background: 'white',
                                                    fontSize: '12px',
                                                    cursor: 'pointer',
                                                    color: '#3b82f6',
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                style={{
                                                    padding: '6px 12px',
                                                    borderRadius: '6px',
                                                    border: '1px solid #fecaca',
                                                    background: '#fef2f2',
                                                    fontSize: '12px',
                                                    cursor: 'pointer',
                                                    color: '#dc2626',
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
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
                        {/* Modal Header */}
                        <div style={{
                            padding: '24px',
                            borderBottom: '1px solid #e2e8f0',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a', margin: 0 }}>
                                {editingPost ? 'Edit Post' : 'Create New Post'}
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

                        {/* Modal Body */}
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
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                title: e.target.value,
                                                slug: formData.slug || generateSlug(e.target.value)
                                            });
                                        }}
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
                                        Slug *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
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
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                                        Category
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            borderRadius: '10px',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '14px',
                                            boxSizing: 'border-box',
                                            background: 'white',
                                        }}
                                    >
                                        <option value="">Select category</option>
                                        <option value="Passenger Rights">Passenger Rights</option>
                                        <option value="Travel Tips">Travel Tips</option>
                                        <option value="News">News</option>
                                        <option value="Guides">Guides</option>
                                        <option value="Compensation">Compensation</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                                        Author
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
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
                                        Read Time (min)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.readTime}
                                        onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) || 5 })}
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
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                                    Excerpt
                                </label>
                                <textarea
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    rows={2}
                                    placeholder="Short summary for blog cards..."
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
                                    Content * (HTML supported)
                                </label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    rows={12}
                                    required
                                    placeholder="Write your blog content here. HTML tags are supported..."
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

                            <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.isPublished}
                                        onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                        style={{ width: '18px', height: '18px' }}
                                    />
                                    <span style={{ fontSize: '14px', color: '#374151' }}>Publish immediately</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.isFeatured}
                                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                        style={{ width: '18px', height: '18px' }}
                                    />
                                    <span style={{ fontSize: '14px', color: '#374151' }}>Featured post</span>
                                </label>
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
                                    {saving ? 'Saving...' : (editingPost ? 'Update Post' : 'Create Post')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
