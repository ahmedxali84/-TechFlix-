import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: 'Team — TechFlix',
    description: 'Meet the people behind TechFlix — the leadership team and the leads behind KAVAN, Mafia Games and One Place Indoor.',
};

const MEMBERS = [
    {
        role: 'CEO — Chief Executive Officer',
        first: 'Ahmed', last: 'Ali',
        photo: '/assets/team/ahmed.jpg', w: 1600, h: 1600,
        bio: 'AI engineer specialising in machine learning, MLOps, generative AI and agentic AI — taking models from experiment to production and leading TechFlix’s technical direction.',
    },
    {
        role: 'COO — Chief Operating Officer',
        first: 'Maria', last: 'Aftab',
        photo: '/assets/team/maria-square.jpg', w: 1600, h: 1600,
        bio: 'SEO and social specialist with a proven record in brand growth and online engagement.',
    },
    {
        role: 'Team Lead — Mafia Games · Co-Lead — KAVAN',
        first: 'Mubashir', last: 'Shabbir',
        photo: '/assets/team/mubashir-square.jpg', w: 1600, h: 1600,
        bio: 'Leads the Mafia Games team and co-leads KAVAN, keeping both products moving from plan to release.',
    },
    {
        role: 'Team Lead — KAVAN & One Place Indoor',
        first: 'Saad', last: 'Sajjad',
        photo: '/assets/team/saad.jpg', w: 1600, h: 1600,
        bio: 'Leads the KAVAN and One Place Indoor teams, owning delivery across both ventures.',
    },
];

// Full team per venture (same people as the home page's "Built by"); leads first.
const VENTURES = [
    {
        name: 'KAVAN',
        team: [
            { name: 'Saad Sajjad', role: 'Team Lead' },
            { name: 'Mubashir Shabbir', role: 'Co-Lead' },
            { name: 'Ahmed Ali', role: 'CEO' },
            { name: 'Joun', role: 'Member' },
            { name: 'Usman', role: 'Member' },
            { name: 'Tazmeen', role: 'Member' },
        ],
    },
    {
        name: 'Mafia Games',
        team: [
            { name: 'Mubashir Shabbir', role: 'Team Lead' },
            { name: 'Ahmed Ali', role: 'CEO' },
            { name: 'Hiban', role: 'Member' },
            { name: 'Tazmeen', role: 'Member' },
            { name: 'Eshaal', role: 'Member' },
        ],
    },
    {
        name: 'One Place Indoor',
        team: [
            { name: 'Saad Sajjad', role: 'Team Lead' },
            { name: 'Ahmed Ali', role: 'CEO' },
            { name: 'Yasir', role: 'Member' },
            { name: 'Huzaifa', role: 'Member' },
            { name: 'Sufyan', role: 'Member' },
        ],
    },
];

export default function TeamPage() {
    return (
        <main>
            <section className="page-hero" data-scene="1" data-scene-x="2.6" data-scene-o="0.8">
                <div className="wrap">
                    <div className="crumb mono" data-hero-fade><Link href="/">Home</Link><span>/</span><span>Team</span></div>
                    <h1 data-hero-title>The people <em>behind</em> TechFlix.</h1>
                    <div className="ph-foot">
                        <p data-hero-fade>A small team that leads every engagement personally — from client work to the ventures we build ourselves.</p>
                        <span className="mono" style={{ color: 'var(--muted)' }} data-hero-fade>({MEMBERS.length} people · Karachi)</span>
                    </div>
                </div>
            </section>

            <section className="section" data-scene="0" data-scene-x="-2.8" data-scene-o="0.35">
                <div className="wrap">
                    <div className="sec-head">
                        <div>
                            <div className="sec-label mono" data-reveal>(01) Leadership</div>
                            <h2 className="sec-title" data-split>Who <em>leads what</em></h2>
                        </div>
                        <p className="sec-desc" data-reveal>Founders run the studio; team leads own each venture end to end.</p>
                    </div>
                    <div className="team team--full">
                        {MEMBERS.map((m) => (
                            <figure className="member" key={m.first}>
                                {m.photo ? (
                                    <div className="member-img" style={{ '--ar': m.w / m.h }}>
                                        <Image src={m.photo} alt={`${m.first} ${m.last}, ${m.role}`} width={m.w} height={m.h} quality={90} sizes="(max-width: 860px) 100vw, 45vw" />
                                    </div>
                                ) : (
                                    // No photo yet: initials in the same frame
                                    <div className="member-img member-img--empty" aria-hidden="true"><span>{m.first[0]}{m.last[0]}</span></div>
                                )}
                                <figcaption className="member-cap">
                                    <span className="mono">{m.role}</span>
                                    <h3>{m.first} <em>{m.last}</em></h3>
                                    <p>{m.bio}</p>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" data-scene="2" data-scene-x="2.6" data-scene-o="0.5">
                <div className="wrap">
                    <div className="sec-head">
                        <div>
                            <div className="sec-label mono" data-reveal>(02) Ventures</div>
                            <h2 className="sec-title" data-split>Teams by <em>venture</em></h2>
                        </div>
                        <p className="sec-desc" data-reveal>Every product has a dedicated team and one clear lead.</p>
                    </div>
                    <div className="values">
                        {VENTURES.map((v, i) => (
                            <div className="value" key={v.name}>
                                <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                                <div>
                                    <h3><em>{v.name}</em></h3>
                                    <ul className="venture-team">
                                        {v.team.map((p) => (
                                            <li key={p.name}><span>{p.name}</span><span className="mono">{p.role}</span></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta" data-scene="3" data-scene-x="0" data-scene-o="0.8" data-scene-s="1.2">
                <div className="wrap">
                    <h2 className="cta-title" data-split>Work <em>with us.</em></h2>
                    <Link href="/contact" className="cta-orb" data-magnetic="0.4" aria-label="Start a project">
                        <svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="circ" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"/></defs><text><textPath href="#circ">Start a project • Start a project • </textPath></text></svg>
                        <span>→</span>
                    </Link>
                </div>
            </section>
        </main>
    );
}
