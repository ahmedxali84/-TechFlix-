import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';
import { SOCIALS } from '@/lib/site';

const EMAIL = 'codifyx100@gmail.com';
const WHATSAPP = '923182715442';
// Booking page link (e.g. Calendly). Empty = "Book a call" opens a call-request email.
const BOOKING = '';

const INTENTS = [
    { topic: 'Build a Product', blurb: 'Web, mobile apps, software.' },
    { topic: 'Explore AI', blurb: 'AI solutions and automation.' },
    { topic: 'Partner With Us', blurb: 'Business collaborations.' },
];

// Each channel opens with the chosen topic already written into the message.
const gmail = (subject, body) => 'https://mail.google.com/mail/?view=cm&fs=1'
    + '&to=' + encodeURIComponent(EMAIL)
    + '&su=' + encodeURIComponent(subject)
    + '&body=' + encodeURIComponent(body);

function intentLinks(topic) {
    const intro = `Hi TechFlix, I'd like to talk about: ${topic}.`;
    return {
        email: gmail(`${topic} — new enquiry`, `${intro}\n\nName:\nPhone:\n\nDetails:\n`),
        whatsapp: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(intro)}`,
        book: BOOKING || gmail(`Book a call — ${topic}`, `${intro}\n\nI'd like to book a call.\nPreferred day & time:\nName:\nPhone:\n`),
    };
}

// Only profiles with a real URL are shown.
const socials = SOCIALS.filter((s) => s.href);

export const metadata = {
    title: 'Contact — TechFlix',
    description: 'Start a project with TechFlix — email, call or WhatsApp us. We reply within 24 hours.',
};

export default function ContactPage() {
    return (
        <main>
            <section className="page-hero" data-scene="3" data-scene-x="2.4" data-scene-o="0.9">
                <div className="wrap">
                    <div className="crumb mono" data-hero-fade><Link href="/">Home</Link><span>/</span><span>Contact</span></div>
                    <h1 data-hero-title>Let's start a <em>conversation.</em></h1>
                    <div className="ph-foot">
                        <p data-hero-fade>Questions about our services, or ready to start your next project? Our team replies within 24 hours.</p>
                        <span className="status live mono" data-hero-fade><i></i>Taking new projects</span>
                    </div>
                </div>
            </section>

            <section className="section" style={{ paddingTop: '40px' }} data-scene="3" data-scene-x="-2.8" data-scene-o="0.35">
                <div className="wrap contact-grid">
                    <div className="channels">
                        <div className="sec-label mono" data-reveal>(01) Direct lines</div>
                        <div className="channel"><span className="mono">General enquiries</span><a href="mailto:codifyx100@gmail.com">codifyx100@gmail.com</a></div>
                        <div className="channel"><span className="mono">Phone</span><a href="tel:03182715442">0318 2715442</a></div>
                        <div className="channel"><span className="mono">WhatsApp</span><a href="https://wa.me/923182715442" target="_blank" rel="noopener">+92 318 2715442 ↗</a></div>
                        {socials.length > 0 && (
                            <div className="channel"><span className="mono">Elsewhere</span>
                                <div className="socials">
                                    {socials.map((s) => (
                                        <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label}><i className={s.icon}></i></a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="sec-label mono" data-reveal>(02) Start here</div>
                        <h2 className="intent-title" data-split>What do you want to <em>do</em> with us?</h2>
                        <p className="form-sub" data-reveal>Pick one — we'll open the right conversation for you.</p>

                                            <ul className="intents">
                            {INTENTS.map((it, i) => {
                                const id = `intent-${i + 1}`;
                                const links = intentLinks(it.topic);
                                return (
                                    <li className="intent" data-reveal key={it.topic}>
                                        <button className="intent-head" aria-expanded="false" aria-controls={id}>
                                            <span className="intent-idx mono">{String(i + 1).padStart(2, '0')}</span>
                                            <span className="intent-text"><b>{it.topic}</b><small>{it.blurb}</small></span>
                                            <span className="intent-plus" aria-hidden="true"></span>
                                        </button>
                                        <div className="intent-body" id={id}><div className="intent-actions">
                                            <a href={links.email} target="_blank" rel="noopener noreferrer"><i className="far fa-envelope" aria-hidden="true"></i>Email</a>
                                            <a href={links.whatsapp} target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp" aria-hidden="true"></i>WhatsApp</a>
                                            <a href={links.book} target="_blank" rel="noopener noreferrer"><i className="far fa-calendar" aria-hidden="true"></i>Book a call</a>
                                        </div></div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div className="wrap">
                    <div className="map-wrap">
                        <iframe title="TechFlix location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.207256469881!2d67.1902674!3d24.8714269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb3310054c54b05%3A0x8513bbde76c79de6!2sBhopal%20Homes%20Society!5e0!3m2!1sen!2s!4v1714310400000!5m2!1sen!2s" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        <span className="map-label mono">TechFlix — Karachi</span>
                    </div>
                </div>
            </section>

        </main>
    );
}
