'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createSite } from '@/lib/motion';

// Boots the animation layer once, then re-wires it for every page the router renders.
export default function SiteRuntime() {
    const pathname = usePathname();
    const router = useRouter();
    const site = useRef(null);

    useEffect(() => {
        site.current = createSite(router);
        return () => { site.current.destroy(); site.current = null; };
    }, [router]);

    useEffect(() => site.current && site.current.mountPage(), [pathname]);

    return null;
}
