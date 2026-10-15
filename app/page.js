import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: 'TechFlix — Software Studio',
    description: 'TechFlix is a software studio building web, mobile and AI products for clients — and ventures of our own, like KAVAN.',
};

export default function HomePage() {
    return (
        <main>
            {/* HERO */}
            <section className="hero" data-scene="0" data-scene-x="2.3" data-scene-s="0.9">
                <div className="hero-meta mono" data-hero-fade>
                    <div className="wrap"><span>(Est. 2024)</span><span>Software studio — Karachi, PK</span><span>Web · Mobile · AI · Ventures</span></div>
                </div>
                <div className="wrap hero-main">
                    <h1 className="hero-title" data-hero-title>
                        <span className="ln">We engineer</span>
                        <span className="ln"><em>digital products</em></span>
                        <span className="ln">that move markets.</span>
                    </h1>
                    <div className="hero-foot">
                        <p data-hero-fade><strong>TechFlix</strong> designs and builds websites, apps and AI platforms for ambitious companies — and launches ventures of our own.</p>
                        <a className="live-ticker" href="https://kavanai.site" target="_blank" rel="noopener" data-hero-fade>
                            <span className="status live mono"><i></i>Live now — kavanai.site</span>
                            <b>KAVAN, where <em>founders</em> meet investors <span className="arr">↗</span></b>
                        </a>
                        <div className="hero-ctas" data-hero-fade>
                            <a href="#services" className="btn" data-magnetic>Our services <span className="arr">→</span></a>
                            <Link href="/contact" className="btn btn-solid" data-magnetic>Let's talk <span className="arr">→</span></Link>
                        </div>
                    </div>
                </div>
                <div className="scroll-cue mono" aria-hidden="true">Scroll <i></i></div>
            </section>

            {/* CROSSING BANDS */}
            <div className="bands" aria-hidden="true">
                <div className="band band-b"><div className="band-track"><span>Product strategy</span><span>Cloud</span><span>SEO</span><span>Digital marketing</span><span>Branding</span><span>Product strategy</span><span>Cloud</span><span>SEO</span><span>Digital marketing</span><span>Branding</span></div></div>
                <div className="band band-a"><div className="band-track"><span>Web development</span><span>Mobile apps</span><span>UI/UX design</span><span>E-commerce</span><span>AI platforms</span><span>Web development</span><span>Mobile apps</span><span>UI/UX design</span><span>E-commerce</span><span>AI platforms</span></div></div>
            </div>

            {/* MANIFESTO */}
            <section className="section manifesto" data-scene="0" data-scene-x="-2.6" data-scene-o="0.6">
                <div className="wrap manifesto-grid">
                    <div className="sec-label mono" data-reveal>(01) Studio</div>
                    <p className="manifesto-text">We are a small, senior team of engineers and designers. We take an idea from a sketch to a product people pay for — <em>with the same care</em> we put into the ventures we build for ourselves. No templates, no shortcuts, just software that performs.</p>
                </div>
            </section>

            {/* SERVICES */}
            <section id="services" className="section" data-scene="1" data-scene-x="2.8" data-scene-o="0.55">
                <div className="wrap">
                    <div className="sec-head">
                        <div>
                            <div className="sec-label mono" data-reveal>(02) Capabilities</div>
                            <h2 className="sec-title" data-split>What we <em>build</em></h2>
                        </div>
                        <p className="sec-desc" data-reveal>End-to-end delivery, from first workshop to production — tailored to your market, your users and your numbers.</p>
                    </div>
                    <ul className="svc-list">
                        <li className="svc">
                            <span className="svc-idx mono">01</span><h3 className="svc-name">Web <em>development</em></h3>
                            <p className="svc-desc">Fast, scalable websites and web apps on modern stacks.</p><span className="svc-arrow" aria-hidden="true">→</span>
                        </li>
                        <li className="svc">
                            <span className="svc-idx mono">02</span><h3 className="svc-name">Mobile <em>apps</em></h3>
                            <p className="svc-desc">Native and cross-platform apps your users will love.</p><span className="svc-arrow" aria-hidden="true">→</span>
                        </li>
                        <li className="svc">
                            <span className="svc-idx mono">03</span><h3 className="svc-name">UI/UX <em>design</em></h3>
                            <p className="svc-desc">Interfaces crafted around real user journeys.</p><span className="svc-arrow" aria-hidden="true">→</span>
                        </li>
                        <li className="svc">
                            <span className="svc-idx mono">04</span><h3 className="svc-name">E-<em>commerce</em></h3>
                            <p className="svc-desc">High-converting stores with secure payments.</p><span className="svc-arrow" aria-hidden="true">→</span>
                        </li>
                        <li className="svc">
                            <span className="svc-idx mono">05</span><h3 className="svc-name">Digital <em>marketing</em></h3>
                            <p className="svc-desc">Campaigns that grow audience and revenue.</p><span className="svc-arrow" aria-hidden="true">→</span>
                        </li>
                        <li className="svc">
                            <span className="svc-idx mono">06</span><h3 className="svc-name">Cloud <em>solutions</em></h3>
                            <p className="svc-desc">Reliable infrastructure, deployments and scaling.</p><span className="svc-arrow" aria-hidden="true">→</span>
                        </li>
                        <li className="svc">
                            <span className="svc-idx mono">07</span><h3 className="svc-name">SEO <em>optimization</em></h3>
                            <p className="svc-desc">Get found by the customers who matter.</p><span className="svc-arrow" aria-hidden="true">→</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* VENTURES */}
            <section id="ventures" className="ventures" data-scene="2" data-scene-x="0" data-scene-o="0.45" data-scene-s="1.25">
                <div className="v-pin">
                    <div className="wrap v-head">
                        <div>
                            <div className="sec-label mono" data-reveal>(03) In-house ventures</div>
                            <h2 className="sec-title" data-split>Products we build <em>for ourselves</em></h2>
                        </div>
                        <div className="v-counter"><b>01</b> / 03</div>
                    </div>

                    <div className="v-stage">
                        <article className="v-panel" data-status="live">
                            <div className="v-visual">
                                <div className="v-orbit"></div><div className="v-orbit o2"></div>
                                <span className="v-ghost" aria-hidden="true">KAVAN</span>
                                <h3 className="v-name">KAVAN<em>founders × investors</em></h3>
                            </div>
                            <div className="v-copy">
                                <div className="v-meta mono"><span className="status live"><i></i>Live</span><span>V—01</span><span>Networking · AI</span></div>
                                <p className="v-tag">Where <em>founders</em> meet the <em>investors</em> looking for them.</p>
                                <p className="v-desc">A meeting ground for startups and capital — founders present what they're building, investors discover deals that fit their thesis, and both sides connect directly.</p>
                                <ul className="v-feats"><li>Founder profiles</li><li>Investor discovery</li><li>Direct intros</li></ul>
                                <div className="v-team"><span className="mono">Built by</span><ul><li>Ahmed Ali</li><li>Mubashir</li><li>Saad</li><li>Joun</li><li>Usman</li><li>Tazmeen</li></ul></div>
                                <div className="v-actions">
                                    <a href="https://kavanai.site" target="_blank" rel="noopener" className="btn btn-solid" data-magnetic>Visit kavanai.site <span className="arr">↗</span></a>
                                    <Link href="/about#kavan-launch" className="btn" data-magnetic>Expo launch <span className="arr">→</span></Link>
                                </div>
                            </div>
                        </article>

                        <article className="v-panel" data-status="soon">
                            <div className="v-visual">
                                <div className="v-orbit"></div><div className="v-orbit o2"></div>
                                <span className="v-ghost" aria-hidden="true">MAFIA</span>
                                <h3 className="v-name">MAFIA<em>games</em></h3>
                            </div>
                            <div className="v-copy">
                                <div className="v-meta mono"><span className="status soon"><i></i>Coming soon</span><span>V—02</span><span>Gaming</span></div>
                                <p className="v-tag">Games built to be played <em>together</em>.</p>
                                <p className="v-desc">Our in-house games label. The first multiplayer titles are in active development — be the first to hear when they drop.</p>
                                <ul className="v-feats"><li>Multiplayer</li><li>Mobile first</li><li>In development</li></ul>
                                <div className="v-team"><span className="mono">Built by</span><ul><li>Ahmed Ali</li><li>Mubashir</li><li>Hiban</li><li>Tazmeen</li><li>Eshaal</li></ul></div>
                                <div className="v-actions">
                                    <a href="mailto:codifyx100@gmail.com?subject=Notify%20me%20%E2%80%94%20MAFIA%20GAMES" className="btn" data-magnetic>Notify me <span className="arr">→</span></a>
                                </div>
                            </div>
                        </article>

                        <article className="v-panel" data-status="soon">
                            <div className="v-visual">
                                <div className="v-orbit"></div><div className="v-orbit o2"></div>
                                <span className="v-ghost" aria-hidden="true">INDOOR</span>
                                <h3 className="v-name long">ONE PLACE<em>indoor</em></h3>
                            </div>
                            <div className="v-copy">
                                <div className="v-meta mono"><span className="status soon"><i></i>Coming soon</span><span>V—03</span><span>Platform</span></div>
                                <p className="v-tag">Everything indoor, <em>in one place</em>.</p>
                                <p className="v-desc">A single platform bringing indoor venues and experiences together. Currently in private build — launching soon.</p>
                                <ul className="v-feats"><li>Discover</li><li>Book</li><li>In development</li></ul>
                                <div className="v-team"><span className="mono">Built by</span><ul><li>Ahmed Ali</li><li>Saad</li><li>Yasir</li><li>Huzaifa</li><li>Sufyan</li></ul></div>
                                <div className="v-actions">
                                    <a href="mailto:codifyx100@gmail.com?subject=Notify%20me%20%E2%80%94%20ONE%20PLACE%20INDOOR" className="btn" data-magnetic>Notify me <span className="arr">→</span></a>
                                </div>
                            </div>
                        </article>
                    </div>

                    <div className="wrap v-rail" aria-hidden="true">
                        <span>KAVAN</span><i><b></b></i><span>MAFIA</span><i><b></b></i><span>INDOOR</span>
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section id="process" className="section" data-scene="3" data-scene-x="-2.6" data-scene-o="0.8">
                <div className="wrap process-grid">
                    <div className="process-sticky">
                        <div className="sec-label mono" data-reveal>(04) Method</div>
                        <h2 className="sec-title" data-split>How we <em>work</em></h2>
                        <div className="process-big" aria-hidden="true"><div className="digits"><span>01</span><span>02</span><span>03</span><span>04</span><span>05</span></div></div>
                    </div>
                    <ol className="steps">
                        <li className="step"><span className="step-n">01</span><div><h4>Discovery</h4><p>We learn your business, your users and the numbers that matter before a single line of code.</p></div></li>
                        <li className="step"><span className="step-n">02</span><div><h4>Planning</h4><p>A clear roadmap, architecture and milestones — so you always know what ships, and when.</p></div></li>
                        <li className="step"><span className="step-n">03</span><div><h4>Design</h4><p>Interfaces prototyped and tested with real people, then refined until they feel effortless.</p></div></li>
                        <li className="step"><span className="step-n">04</span><div><h4>Development</h4><p>Robust, scalable engineering with weekly demos and code you fully own.</p></div></li>
                        <li className="step"><span className="step-n">05</span><div><h4>Launch &amp; grow</h4><p>Deployment, monitoring and ongoing optimisation long after go-live.</p></div></li>
                    </ol>
                </div>
            </section>

            {/* TEAM */}
            <section id="team" className="section" data-scene="1" data-scene-x="0" data-scene-o="0.3">
                <div className="wrap">
                    <div className="sec-head">
                        <div>
                            <div className="sec-label mono" data-reveal>(05) Leadership</div>
                            <h2 className="sec-title" data-split>The people <em>behind it</em></h2>
                        </div>
                        <div>
                            <p className="sec-desc" data-reveal>Technical depth and creative vision — the founders lead every engagement personally.</p>
                            <Link href="/team" className="btn" style={{ marginTop: 24 }} data-magnetic data-reveal>Meet the full team <span className="arr">→</span></Link>
                        </div>
                    </div>
                    <div className="team">
                        <figure className="member">
                            <div className="member-img" style={{ '--ar': 1 }}>
                                <Image src="/assets/team/ahmed.jpg" alt="Ahmed Ali, CEO" width={1600} height={1600} quality={90} sizes="(max-width: 860px) 100vw, 45vw" />
                            </div>
                            <figcaption className="member-cap">
                                <span className="mono">CEO — Chief Executive Officer</span>
                                <h3>Ahmed <em>Ali</em></h3>
                                <p>MERN-stack specialist with years of experience leading technical teams and delivering enterprise solutions.</p>
                            </figcaption>
                        </figure>
                        <figure className="member">
                            <div className="member-img" style={{ '--ar': 1600 / 2588 }}>
                                <Image src="/assets/team/maria.jpg" alt="Maria Aftab, COO" width={1600} height={2588} quality={90} sizes="(max-width: 860px) 100vw, 45vw" />
                            </div>
                            <figcaption className="member-cap">
                                <span className="mono">COO — Chief Operating Officer</span>
                                <h3>Maria <em>Aftab</em></h3>
                                <p>SEO and social specialist with a proven record in brand growth and online engagement.</p>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            {/* NUMBERS */}
            <section className="wrap" aria-label="Key figures">
                <div className="numbers">
                    <div className="num"><strong data-count="10">10<sup>+</sup></strong><span>Workshops</span></div>
                    <div className="num"><strong data-count="3">3</strong><span>Ventures</span></div>
                    <div className="num"><strong data-count="7">7<sup>+</sup></strong><span>Services</span></div>
                    <div className="num"><strong data-count="10">10<sup>+</sup></strong><span>Cities</span></div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta" data-scene="0" data-scene-x="0" data-scene-o="0.9" data-scene-s="1.35">
                <div className="wrap">
                    <h2 className="cta-title" data-split>Have an idea? <em>Let's build it.</em></h2>
                    <Link href="/contact" className="cta-orb" data-magnetic="0.4" aria-label="Start a project">
                        <svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="circ" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"/></defs><text><textPath href="#circ">Start a project • Start a project • </textPath></text></svg>
                        <span>→</span>
                    </Link>
                </div>
            </section>

        </main>
    );
}
