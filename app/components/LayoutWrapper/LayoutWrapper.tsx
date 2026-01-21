'use client';

import { usePathname } from 'next/navigation';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface LayoutWrapperProps {
    children: React.ReactNode;
}

// Routes that should NOT have the website header/footer
const DASHBOARD_ROUTES = ['/admin', '/dashboard', '/claim'];

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
    const pathname = usePathname();

    // Check if current route is a dashboard route
    const isDashboardRoute = DASHBOARD_ROUTES.some(route =>
        pathname.startsWith(route)
    );

    // Dashboard routes get just the children (they have their own layouts)
    if (isDashboardRoute) {
        return <>{children}</>;
    }

    // Public routes get the website header and footer
    return (
        <>
            <Header />
            <main style={{ minHeight: '100vh' }}>
                {children}
            </main>
            <Footer />
        </>
    );
}
