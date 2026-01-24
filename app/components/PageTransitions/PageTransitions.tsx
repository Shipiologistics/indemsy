'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Loading from '../../loading';

function PageLoaderHandler() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // When the route changes, show the loader briefly
        // This gives the "WOW" feedback the user wants
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 600); // Pulse the loader for a smooth transition

        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    if (!loading) return null;

    return <Loading />;
}

export default function PageTransitions() {
    return (
        <Suspense fallback={null}>
            <PageLoaderHandler />
        </Suspense>
    );
}
