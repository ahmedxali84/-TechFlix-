import Image from 'next/image';
import Link from 'next/link';

// Footer wordmark is pre-split into letters so they can rise one by one.
const letters = (text, em) => text.split('').map((ch, i) => <span key={i}>{em ? <em>{ch}</em> : ch}</span>);

export default function SiteFooter() {
    return (
        <footer className="footer">
            <div className="wrap">
                <div className="footer-top">
                    <div>
                        <Link href="/" className="logo" aria-label="TechFlix home"><Image src="/assets/logo/techflix-logo.png" alt="TechFlix — Connect, Collaborate, Create Impact" width={516} height={475} /></Link>
                        <p>A software studio helping businesses grow in the digital world — and building ventures of our own.</p>
                    </div>
                    <div><h4>Studio</h4><ul><li><Link href="/about">About</Link></li><li><Link href="/team">Team</Link></li><li><Link href="/#process">Process</Link></li><li><Link href="/contact">Contact</Link></li></ul></div>
                    <div><h4>Ventures</h4><ul><li><a href="https://kavanai.site" target="_blank" rel="noopener">KAVAN ↗</a></li><li><Link href="/#ventures">Mafia Games</Link></li><li><Link href="/#ventures">One Place Indoor</Link></li></ul></div>
                    <div><h4>Contact</h4><ul><li><a href="mailto:codifyx100@gmail.com">codifyx100@gmail.com</a></li><li><a href="tel:03182715442">0318 2715442</a></li><li><a href="https://wa.me/923182715442" target="_blank" rel="noopener">WhatsApp</a></li></ul></div>
                </div>
                <div className="footer-big" aria-hidden="true">{letters('Tech')}{letters('flix', true)}</div>
                <div className="footer-bottom mono">
                    <span>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> TechFlix. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}
