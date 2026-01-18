'use client';

import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            width: '100%',
            background: '#f8fafc',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                overflow: 'hidden',
            }}>
                {/* Header */}
                <Header />

                {/* Page Content */}
                <main style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '32px',
                }}>
                    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
