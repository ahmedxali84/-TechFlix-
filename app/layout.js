import Image from 'next/image';
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import SiteRuntime from '@/components/SiteRuntime';
import './globals.css';

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif' });
const sans = Inter_Tight({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: '400', variable: '--font-mono' });

export const metadata = {
    title: 'TechFlix — Software Studio',
    description: 'TechFlix is a software studio building web, mobile and AI products for clients — and ventures of our own, like KAVAN.',
    icons: { icon: '/assets/logo/favicon.png' },
};

export const viewport = {
    themeColor: '#07060d',
};

// Runs before paint: enables the JS-only start states, and skips the
// preloader for visitors who already saw it this session.
const bootScript = "document.documentElement.classList.add('js');try{if(sessionStorage.getItem('tf-visited')==='1')document.documentElement.classList.add('is-returning')}catch(e){}";

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: bootScript }} />
            </head>
            <body>
                <canvas className="webgl" aria-hidden="true"></canvas>
                <div className="vignette" aria-hidden="true"></div>
                <div className="grain" aria-hidden="true"></div>

                <div className="preloader" aria-hidden="true">
                    <div className="preloader-top mono"><span>Software Studio</span><span>Karachi — Worldwide</span></div>
                    <div className="preloader-word"><Image className="preloader-mark" src="/assets/logo/techflix-mark.png" alt="" width={420} height={320} preload /></div>
                    <div className="preloader-bottom mono"><span>Loading experience</span><span className="preloader-count">000</span></div>
                    <div className="preloader-bar"></div>
                </div>
                <div className="page-wipe" aria-hidden="true"><Image className="wipe-mark" src="/assets/logo/techflix-mark.png" alt="" width={420} height={320} loading="eager" /><div className="wipe-bar"><span></span></div></div>

                <SiteHeader />
                {children}
                <SiteFooter />
                <SiteRuntime />
            </body>
        </html>
    );
}
