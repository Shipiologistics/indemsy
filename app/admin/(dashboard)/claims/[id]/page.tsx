'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Claim {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: string;
    problemType: string;
    delayDuration: string;
    departureAirport: { iata: string; name: string } | null;
    arrivalAirport: { iata: string; name: string } | null;
    selectedFlight: { flightNumber: string } | null;
    manualFlightNumber: string | null;
    manualAirline: string | null;
    travelDate: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    bookingNumber: string;
    incidentDescription: string;
    contactedAirline: boolean;
    boardingPassUrl: string | null;
    idDocumentUrl: string | null;
    createdAt: string;
    updatedAt: string;
}

interface Comment {
    id: number;
    adminName: string;
    content: string;
    isInternal: boolean;
    createdAt: string;
}

const statusOptions = [
    { value: 'submitted', label: 'Submitted', bg: '#fffbeb', color: '#d97706' },
    { value: 'processing', label: 'Processing', bg: '#eff6ff', color: '#3b82f6' },
    { value: 'pending_documents', label: 'Pending Documents', bg: '#fef3c7', color: '#b45309' },
    { value: 'approved', label: 'Approved', bg: '#ecfdf5', color: '#059669' },
    { value: 'rejected', label: 'Rejected', bg: '#fef2f2', color: '#dc2626' },
    { value: 'closed', label: 'Closed', bg: '#f1f5f9', color: '#64748b' },
];

export default function ClaimDetailPage() {
    const params = useParams();
    const router = useRouter();
    const claimId = params.id as string;

    const [claim, setClaim] = useState<Claim | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [isInternal, setIsInternal] = useState(false);
    const [addingComment, setAddingComment] = useState(false);
    const [statusSuccess, setStatusSuccess] = useState('');

    const fetchClaim = async () => {
        try {
            const res = await fetch(`/api/claims/${claimId}`);
            const data = await res.json();
            if (res.ok) {
                setClaim(data);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to fetch claim');
        }
    };

    const fetchComments = async () => {
        try {
            const res = await fetch(`/api/claims/${claimId}/comments`, {
                headers: { 'x-admin-request': 'true' }
            });
            const data = await res.json();
            if (res.ok) {
                setComments(data);
            }
        } catch (err) {
            console.error('Failed to fetch comments');
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchClaim(), fetchComments()]);
            setLoading(false);
        };
        loadData();
    }, [claimId]);

    const handleStatusChange = async (newStatus: string) => {
        setUpdatingStatus(true);
        setStatusSuccess('');
        try {
            const res = await fetch(`/api/claims/${claimId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                const updated = await res.json();
                setClaim(updated);
                setStatusSuccess('Status updated successfully!');
                setTimeout(() => setStatusSuccess(''), 3000);
            } else {
                const data = await res.json();
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to update status');
        } finally {
            setUpdatingStatus(false);
        }
    };

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setAddingComment(true);
        try {
            const res = await fetch(`/api/claims/${claimId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: newComment,
                    adminName: 'Admin',
                    isInternal,
                }),
            });

            if (res.ok) {
                setNewComment('');
                setIsInternal(false);
                await fetchComments();
            } else {
                const data = await res.json();
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to add comment');
        } finally {
            setAddingComment(false);
        }
    };

    if (loading) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '12px' }}>⏳</div>
                <p style={{ color: '#64748b' }}>Loading claim details...</p>
            </div>
        );
    }

    if (!claim) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '12px' }}>❌</div>
                <p style={{ color: '#64748b' }}>{error || 'Claim not found'}</p>
                <Link
                    href="/admin/claims"
                    style={{
                        display: 'inline-block',
                        marginTop: '20px',
                        padding: '10px 20px',
                        background: '#3b82f6',
                        color: 'white',
                        borderRadius: '8px',
                        textDecoration: 'none',
                    }}
                >
                    Back to Claims
                </Link>
            </div>
        );
    }

    const currentStatus = statusOptions.find(s => s.value === claim.status) || statusOptions[0];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Link
                        href="/admin/claims"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: 'white',
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                            color: '#64748b',
                        }}
                    >
                        ←
                    </Link>
                    <div>
                        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                            Claim #{claim.id}
                        </h1>
                        <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>
                            {claim.firstName} {claim.lastName} • {claim.email}
                        </p>
                    </div>
                </div>
                <span style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    background: currentStatus.bg,
                    color: currentStatus.color,
                }}>
                    {currentStatus.label}
                </span>
            </div>

            {/* Success/Error Messages */}
            {statusSuccess && (
                <div style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    color: '#059669',
                    fontSize: '14px',
                }}>
                    ✓ {statusSuccess}
                </div>
            )}

            {error && (
                <div style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#dc2626',
                    fontSize: '14px',
                }}>
                    {error}
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
                {/* Main Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Passenger Info */}
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '24px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        border: '1px solid #f1f5f9',
                    }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            👤 Passenger Information
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>Full Name</p>
                                <p style={{ fontSize: '15px', fontWeight: '500', color: '#0f172a', margin: 0 }}>
                                    {claim.firstName} {claim.lastName}
                                </p>
                            </div>
                            <div>
                                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>Email</p>
                                <p style={{ fontSize: '15px', fontWeight: '500', color: '#0f172a', margin: 0 }}>{claim.email}</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>Phone</p>
                                <p style={{ fontSize: '15px', fontWeight: '500', color: '#0f172a', margin: 0 }}>{claim.phone || 'N/A'}</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>Address</p>
                                <p style={{ fontSize: '15px', fontWeight: '500', color: '#0f172a', margin: 0 }}>
                                    {claim.address ? `${claim.address}, ${claim.city} ${claim.postalCode}, ${claim.country}` : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Flight Info */}
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '24px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        border: '1px solid #f1f5f9',
                    }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            ✈️ Flight Details
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                            <div style={{
                                padding: '16px 24px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)',
                                textAlign: 'center',
                            }}>
                                <p style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                                    {(claim.departureAirport as any)?.iata || '?'}
                                </p>
                                <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>Departure</p>
                            </div>
                            <div style={{ fontSize: '24px', color: '#3b82f6' }}>→</div>
                            <div style={{
                                padding: '16px 24px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)',
                                textAlign: 'center',
                            }}>
                                <p style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                                    {(claim.arrivalAirport as any)?.iata || '?'}
                                </p>
                                <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>Arrival</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                            <div>
                                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>Flight Number</p>
                                <p style={{ fontSize: '15px', fontWeight: '500', color: '#0f172a', margin: 0 }}>
                                    {(claim.selectedFlight as any)?.flightNumber || claim.manualFlightNumber || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>Travel Date</p>
                                <p style={{ fontSize: '15px', fontWeight: '500', color: '#0f172a', margin: 0 }}>
                                    {claim.travelDate ? new Date(claim.travelDate).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>Booking Number</p>
                                <p style={{ fontSize: '15px', fontWeight: '500', color: '#0f172a', margin: 0 }}>
                                    {claim.bookingNumber || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Problem Details */}
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '24px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        border: '1px solid #f1f5f9',
                    }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            ⚠️ Problem Details
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                            <div>
                                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>Problem Type</p>
                                <p style={{ fontSize: '15px', fontWeight: '500', color: '#0f172a', margin: 0, textTransform: 'capitalize' }}>
                                    {claim.problemType || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>Delay Duration</p>
                                <p style={{ fontSize: '15px', fontWeight: '500', color: '#0f172a', margin: 0 }}>
                                    {claim.delayDuration || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>Contacted Airline</p>
                                <p style={{ fontSize: '15px', fontWeight: '500', color: '#0f172a', margin: 0 }}>
                                    {claim.contactedAirline ? 'Yes' : 'No'}
                                </p>
                            </div>
                        </div>
                        {claim.incidentDescription && (
                            <div>
                                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>Description</p>
                                <p style={{ fontSize: '14px', color: '#334155', margin: 0, lineHeight: 1.6 }}>
                                    {claim.incidentDescription}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Documents */}
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '24px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        border: '1px solid #f1f5f9',
                    }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            📎 Documents
                        </h3>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            {claim.boardingPassUrl ? (
                                <a
                                    href={claim.boardingPassUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        padding: '12px 20px',
                                        borderRadius: '10px',
                                        background: '#eff6ff',
                                        color: '#3b82f6',
                                        textDecoration: 'none',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}
                                >
                                    🎫 Boarding Pass
                                </a>
                            ) : (
                                <span style={{ padding: '12px 20px', borderRadius: '10px', background: '#f1f5f9', color: '#94a3b8', fontSize: '14px' }}>
                                    No boarding pass
                                </span>
                            )}
                            {claim.idDocumentUrl ? (
                                <a
                                    href={claim.idDocumentUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        padding: '12px 20px',
                                        borderRadius: '10px',
                                        background: '#f5f3ff',
                                        color: '#8b5cf6',
                                        textDecoration: 'none',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}
                                >
                                    🪪 ID Document
                                </a>
                            ) : (
                                <span style={{ padding: '12px 20px', borderRadius: '10px', background: '#f1f5f9', color: '#94a3b8', fontSize: '14px' }}>
                                    No ID document
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar - Status & Comments */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Update Status */}
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '24px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        border: '1px solid #f1f5f9',
                    }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            🔄 Update Status
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {statusOptions.map((status) => (
                                <button
                                    key={status.value}
                                    onClick={() => handleStatusChange(status.value)}
                                    disabled={updatingStatus || claim.status === status.value}
                                    style={{
                                        padding: '12px 16px',
                                        borderRadius: '10px',
                                        border: claim.status === status.value ? `2px solid ${status.color}` : '1px solid #e2e8f0',
                                        background: claim.status === status.value ? status.bg : 'white',
                                        color: status.color,
                                        fontSize: '14px',
                                        fontWeight: claim.status === status.value ? '600' : '500',
                                        cursor: claim.status === status.value ? 'default' : 'pointer',
                                        textAlign: 'left',
                                        opacity: updatingStatus ? 0.7 : 1,
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {claim.status === status.value && '✓ '}{status.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add Comment */}
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '24px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        border: '1px solid #f1f5f9',
                    }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            💬 Add Comment
                        </h3>
                        <form onSubmit={handleAddComment}>
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write a comment for this claim..."
                                rows={4}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    borderRadius: '10px',
                                    border: '1px solid #e2e8f0',
                                    fontSize: '14px',
                                    resize: 'vertical',
                                    marginBottom: '12px',
                                    boxSizing: 'border-box',
                                    fontFamily: 'inherit',
                                }}
                            />
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={isInternal}
                                    onChange={(e) => setIsInternal(e.target.checked)}
                                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                                />
                                <span style={{ fontSize: '13px', color: '#64748b' }}>
                                    Internal note (not visible to user)
                                </span>
                            </label>
                            <button
                                type="submit"
                                disabled={addingComment || !newComment.trim()}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                    color: 'white',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: addingComment || !newComment.trim() ? 'not-allowed' : 'pointer',
                                    opacity: addingComment || !newComment.trim() ? 0.7 : 1,
                                }}
                            >
                                {addingComment ? 'Adding...' : 'Add Comment'}
                            </button>
                        </form>
                    </div>

                    {/* Comments List */}
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '24px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        border: '1px solid #f1f5f9',
                    }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            📝 Comments ({comments.length})
                        </h3>
                        {comments.length === 0 ? (
                            <div style={{
                                padding: '24px',
                                textAlign: 'center',
                                background: '#f8fafc',
                                borderRadius: '12px',
                            }}>
                                <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>💭</span>
                                <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>No comments yet</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto' }}>
                                {comments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        style={{
                                            padding: '14px',
                                            borderRadius: '12px',
                                            background: comment.isInternal
                                                ? 'linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%)'
                                                : 'linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)',
                                            borderLeft: `4px solid ${comment.isInternal ? '#f59e0b' : '#3b82f6'}`,
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ fontSize: '13px', fontWeight: '600', color: comment.isInternal ? '#b45309' : '#3b82f6' }}>
                                                    {comment.adminName}
                                                </span>
                                                {comment.isInternal && (
                                                    <span style={{
                                                        fontSize: '10px',
                                                        padding: '2px 6px',
                                                        borderRadius: '4px',
                                                        background: '#fef3c7',
                                                        color: '#b45309',
                                                        fontWeight: '500',
                                                    }}>
                                                        Internal
                                                    </span>
                                                )}
                                            </div>
                                            <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                                                {new Date(comment.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                        <p style={{ fontSize: '14px', color: '#334155', margin: 0, lineHeight: 1.5 }}>
                                            {comment.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
