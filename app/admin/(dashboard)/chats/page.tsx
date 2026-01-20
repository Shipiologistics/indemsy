'use client';

import { useState, useEffect } from 'react';

interface ChatSession {
    id: number;
    userId: number | null;
    status: string;
    metadata: any;
    createdAt: string;
    updatedAt: string;
}

interface ChatMessage {
    id: number;
    sessionId: number;
    role: 'user' | 'assistant';
    content: string;
    createdAt: string;
}

export default function ChatsPage() {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const res = await fetch('/api/chat-sessions');
            if (res.ok) {
                const data = await res.json();
                setSessions(data);
            }
        } catch (error) {
            console.error('Error fetching sessions:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async (session: ChatSession) => {
        setSelectedSession(session);
        setLoadingMessages(true);
        try {
            const res = await fetch(`/api/chat-sessions/${session.id}`);
            if (res.ok) {
                const data = await res.json();
                setMessages(data.messages || []);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoadingMessages(false);
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                    Chat History
                </h1>
                <p style={{ color: '#64748b', marginTop: '8px' }}>
                    View all chatbot conversations
                </p>
            </div>

            <div style={{ display: 'flex', gap: '24px', minHeight: '600px' }}>
                {/* Sessions List */}
                <div style={{
                    width: '320px',
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <div style={{
                        padding: '16px 20px',
                        borderBottom: '1px solid #e2e8f0',
                        background: '#f8fafc',
                    }}>
                        <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', margin: 0 }}>
                            Sessions ({sessions.length})
                        </h2>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {loading ? (
                            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                                Loading...
                            </div>
                        ) : sessions.length === 0 ? (
                            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                                No chat sessions yet
                            </div>
                        ) : (
                            sessions.map((session) => (
                                <div
                                    key={session.id}
                                    onClick={() => fetchMessages(session)}
                                    style={{
                                        padding: '16px 20px',
                                        borderBottom: '1px solid #f1f5f9',
                                        cursor: 'pointer',
                                        background: selectedSession?.id === session.id ? '#eff6ff' : 'white',
                                        transition: 'background 0.15s',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                        }}>
                                            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', margin: 0 }}>
                                                Session #{session.id}
                                            </p>
                                            <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0' }}>
                                                {formatDate(session.createdAt)}
                                            </p>
                                        </div>
                                        <span style={{
                                            fontSize: '11px',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            background: session.status === 'active' ? '#dcfce7' : '#f1f5f9',
                                            color: session.status === 'active' ? '#16a34a' : '#64748b',
                                            fontWeight: '500',
                                        }}>
                                            {session.metadata?.language?.toUpperCase() || 'EN'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat View */}
                <div style={{
                    flex: 1,
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}>
                    {selectedSession ? (
                        <>
                            <div style={{
                                padding: '16px 24px',
                                borderBottom: '1px solid #e2e8f0',
                                background: '#f8fafc',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <div>
                                    <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', margin: 0 }}>
                                        Session #{selectedSession.id}
                                    </h2>
                                    <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>
                                        Started: {formatDate(selectedSession.createdAt)}
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                flex: 1,
                                padding: '24px',
                                overflowY: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                background: '#f8fafc',
                            }}>
                                {loadingMessages ? (
                                    <div style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>
                                        Loading messages...
                                    </div>
                                ) : messages.length === 0 ? (
                                    <div style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>
                                        No messages in this session
                                    </div>
                                ) : (
                                    messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            style={{
                                                display: 'flex',
                                                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                            }}
                                        >
                                            <div style={{
                                                maxWidth: '70%',
                                                padding: '12px 16px',
                                                borderRadius: msg.role === 'user'
                                                    ? '16px 16px 4px 16px'
                                                    : '16px 16px 16px 4px',
                                                background: msg.role === 'user'
                                                    ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                                                    : 'white',
                                                color: msg.role === 'user' ? 'white' : '#0f172a',
                                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                            }}>
                                                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
                                                    {msg.content}
                                                </p>
                                                <p style={{
                                                    margin: '8px 0 0',
                                                    fontSize: '11px',
                                                    opacity: 0.7,
                                                    textAlign: 'right',
                                                }}>
                                                    {formatDate(msg.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    ) : (
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#64748b',
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ opacity: 0.3, margin: '0 auto 16px' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <p style={{ fontSize: '16px' }}>Select a session to view chat history</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
