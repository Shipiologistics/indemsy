'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './ChatBot.module.css';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState<'en' | 'fr' | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<number | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('chatbot-open');
        } else {
            document.body.classList.remove('chatbot-open');
        }

        if (isOpen && window.innerWidth <= 768) {
            // Force a scroll that triggers the widget to slide up/away
            // This provides the "space" by mimicking the natural scroll behavior
            window.scrollTo({
                top: 180, // Scroll down enough to move hero content up and provide room
                behavior: 'smooth'
            });
        } else if (!isOpen && window.innerWidth <= 768) {
            // Optional: scroll back to top when closing
            if (window.scrollY > 150) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }, [isOpen]);

    // Save session when chat ends or user closes
    const saveSession = async (msgs: Message[]) => {
        if (msgs.length === 0) return;

        try {
            if (sessionId) {
                // Update existing session
                await fetch(`/api/chat-sessions/${sessionId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: msgs }),
                });
            } else {
                // Create new session
                const res = await fetch('/api/chat-sessions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        language,
                        messages: msgs,
                    }),
                });
                if (res.ok) {
                    const data = await res.json();
                    setSessionId(data.id);
                }
            }
        } catch (error) {
            console.error('Failed to save session:', error);
        }
    };

    const toggleChat = () => {
        if (isOpen && messages.length > 0) {
            // Save session when closing chat
            saveSession(messages);
        }
        setIsOpen(!isOpen);
    };

    const handleLanguageSelect = (lang: 'en' | 'fr') => {
        setLanguage(lang);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
        };

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: newMessages,
                    language: language || 'en',
                    checkoutState: {},
                }),
            });

            if (!response.ok) throw new Error('Failed to fetch');

            const data = await response.json();

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.content || 'I apologize, I could not generate a response.',
            };

            const updatedMessages = [...newMessages, assistantMessage];
            setMessages(updatedMessages);

            // Save after each exchange
            saveSession(updatedMessages);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: language === 'en' ? 'Sorry, something went wrong. Please try again.' : 'Désolé, une erreur s\'est produite. Veuillez réessayer.',
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!language && isOpen) {
        return (
            <div className={styles.container}>
                <div className={styles.window}>
                    <div className={styles.header}>
                        <div className={styles.headerTitle}>Indemsy AI</div>
                        <button onClick={toggleChat} className={styles.closeBtn}>×</button>
                    </div>
                    <div className={styles.languageSelection}>
                        <h3>Welcome / Bienvenue</h3>
                        <p>Please select your language</p>
                        <p>Veuillez choisir votre langue</p>
                        <div className={styles.langButtons}>
                            <button onClick={() => handleLanguageSelect('en')} className={styles.langBtn}>
                                🇬🇧 English
                            </button>
                            <button onClick={() => handleLanguageSelect('fr')} className={styles.langBtn}>
                                🇫🇷 Français
                            </button>
                        </div>
                    </div>
                </div>
                <button className={styles.launcher} onClick={toggleChat} style={{ display: 'none' }}>
                    💬
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {isOpen && (
                <div className={styles.window}>
                    <div className={styles.header}>
                        <div className={styles.headerTitle}>Indemsy AI {language === 'fr' ? '(FR)' : '(EN)'}</div>
                        <button onClick={toggleChat} className={styles.closeBtn}>×</button>
                    </div>

                    <div className={styles.messages}>
                        {messages.length === 0 && (
                            <div className={styles.welcome}>
                                <p>{language === 'en' ? 'Hello! How can I help you regarding your flight claim today?' : 'Bonjour! Comment puis-je vous aider concernant votre réclamation de vol aujourd\'hui?'}</p>
                            </div>
                        )}
                        {messages.map((m) => (
                            <div key={m.id} className={`${styles.message} ${m.role === 'user' ? styles.user : styles.ai}`}>
                                <div className={styles.messageContent}>
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && messages[messages.length - 1]?.role === 'user' && (
                            <div className={`${styles.message} ${styles.ai}`}>
                                <div className={styles.typing}>...</div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className={styles.inputForm}>
                        <input
                            className={styles.input}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={language === 'en' ? "Type your message..." : "Tapez votre message..."}
                        />
                        <button type="submit" className={styles.sendBtn} disabled={isLoading || !input.trim()}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </form>
                </div>
            )}

            <button className={`${styles.launcher} ${isOpen ? styles.launcherActive : ''}`} onClick={toggleChat}>
                {isOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                )}
            </button>
        </div>
    );
}
