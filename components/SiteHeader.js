'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
    { href: '/', label: 'Home' },
    { href: '/#ventures', label: 'Ventures' },
    { href: '/about', label: 'About' },
    { href: '/team', label: 'Team' },
    { href: '/contact', label: 'Contact' },
];

// Label is doubled via data-text so CSS can roll it on hover.
const Roll = ({ children }) => <span data-text={children}>{children}</span>;

export default function SiteHeader() {
    const pathname = usePathname();
    const onContact = pathname === '/contact';

    return (
        <>
            <header className="nav">
                <div className="wrap">
                    <Link href="/" className="logo" aria-label="TechFlix home"><Image src="/assets/logo/techflix-lockup.png" alt="TechFlix" width={659} height={160} preload /></Link>
                    <ul className="nav-links">
                        {LINKS.map((l) => (
                            <li key={l.href}>
                                <Link href={l.href} className={`roll${l.href === pathname ? ' is-active' : ''}`}><Roll>{l.label}</Roll></Link>
                            </li>
                        ))}
                    </ul>
                    <div className="nav-actions">
                        {onContact
                            ? <a href="tel:03182715442" className="btn btn-sm" data-magnetic="0.25"><span className="dot"></span>Call us</a>
                            : <Link href="/contact" className="btn btn-sm" data-magnetic="0.25"><span className="dot"></span>Start a project</Link>}
                        <button className="nav-toggle" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>
                    </div>
                </div>
            </header>
            <nav className="mobile-menu" aria-label="Mobile">
                <ul>
                    {LINKS.map((l, i) => (
                        <li key={l.href}><Link href={l.href}>{l.label} <small>{String(i + 1).padStart(2, '0')}</small></Link></li>
                    ))}
                </ul>
                <div className="mobile-menu-foot">
                    <span>Call — <a href="tel:03182715442">0318 2715442</a></span>
                    <span>Mail — <a href="mailto:codifyx100@gmail.com">codifyx100@gmail.com</a></span>
                </div>
            </nav>
        </>
    );
}
