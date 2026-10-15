import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: 'About — TechFlix',
    description: 'TechFlix — our story, mission and values.',
};

export default function AboutPage() {
    return (
        <main>
            <section className="page-hero" data-scene="2" data-scene-x="2.6" data-scene-o="0.8">
                <div className="wrap">
                    <div className="crumb mono" data-hero-fade><Link href="/">Home</Link><span>/</span><span>About</span></div>
                    <h1 data-hero-title>A studio that <em>builds</em> like a founder.</h1>
                    <div className="ph-foot">
                        <p data-hero-fade>Driving digital transformation through technology tailored to your business — since 2024.</p>
                        <span className="mono" style={{ color: 'var(--muted)' }} data-hero-fade>(Karachi · Global clients)</span>
                    </div>
                </div>
            </section>

            <section className="section" data-scene="0" data-scene-x="-2.8" data-scene-o="0.45">
                <div className="wrap story">
                    <div className="story-img">
                        <figure><Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80" alt="The TechFlix team collaborating" width={1000} height={1250} sizes="(max-width: 860px) 100vw, 45vw" /></figure>
                        <figcaption className="mono"><span>Fig. 01 — The studio</span><span>Est. 2024</span></figcaption>
                    </div>
                    <div className="story-copy">
                        <div className="sec-label mono" data-reveal>(01) Our story</div>
                        <h2 data-split>Who <em>we are</em></h2>
                        <p data-reveal>TechFlix is a digital solutions studio founded in 2024 to close the gap between ambitious businesses and modern technology.</p>
                        <p data-reveal>Based in Karachi with a global clientele, our certified developers, designers and strategists build digital experiences that drive growth — websites, apps, platforms and the marketing that brings them users.</p>
                        <p data-reveal>What sets us apart: we understand your objectives first, then craft technology that fits them — never a one-size-fits-all package. It's the same discipline we apply to our own ventures, like <a href="https://kavanai.site" target="_blank" rel="noopener" style={{ color: 'var(--ink)', borderBottom: '1px solid var(--accent)' }}>KAVAN</a>.</p>
                    </div>
                </div>
            </section>

            <section className="wrap" aria-label="Key figures">
                <div className="numbers">
                    <div className="num"><strong data-count="10">10<sup>+</sup></strong><span>Workshops</span></div>
                    <div className="num"><strong data-count="3">3</strong><span>Ventures</span></div>
                    <div className="num"><strong data-count="7">7<sup>+</sup></strong><span>Services</span></div>
                    <div className="num"><strong data-count="10">10<sup>+</sup></strong><span>Cities</span></div>
                </div>
            </section>

            <section id="kavan-launch" className="section launch" data-scene="1" data-scene-x="-2.4" data-scene-o="0.55">
                <div className="wrap">
                    <div className="sec-head">
                        <div>
                            <div className="sec-label mono" data-reveal>(02) In the field</div>
                            <h2 className="sec-title" data-split>Launching <em>KAVAN</em></h2>
                        </div>
                        <p className="sec-desc" data-reveal>We took our company and our first product to the Expo floor — demoing KAVAN live, walking visitors through the platform and meeting the founders and investors it's built for.</p>
                    </div>
                    <div className="launch-grid">
                        <figure className="launch-fig launch-fig--tall" data-reveal>
                            <Image src="/assets/kavan-launch/kavan-expo-team.jpg" alt="The TechFlix team at the KAVAN booth at the Expo" width={1050} height={1400} sizes="(max-width: 860px) 100vw, 50vw" />
                            <figcaption className="mono"><span>Fig. 02 — The team at our booth</span></figcaption>
                        </figure>
                        <figure className="launch-fig" data-reveal>
                            <Image src="/assets/kavan-launch/kavan-expo-demo.jpg" alt="Team members demoing KAVAN to visitors on laptops" width={1242} height={926} sizes="(max-width: 860px) 100vw, 50vw" />
                            <figcaption className="mono"><span>Fig. 03 — Live product demos</span></figcaption>
                        </figure>
                        <figure className="launch-fig" data-reveal>
                            <Image src="/assets/kavan-launch/kavan-expo-pitch.jpg" alt="Walking a visitor through the KAVAN brochure" width={1242} height={928} sizes="(max-width: 860px) 100vw, 50vw" />
                            <figcaption className="mono"><span>Fig. 04 — Pitching to visitors</span></figcaption>
                        </figure>
                    </div>
                    <div className="launch-foot" data-reveal>
                        <ul className="v-feats"><li>Company launch</li><li>Product launch</li><li>Live demos</li></ul>
                        <a href="https://kavanai.site" target="_blank" rel="noopener" className="btn" data-magnetic>Visit kavanai.site <span className="arr">↗</span></a>
                    </div>
                </div>
            </section>

            <section className="section" data-scene="3" data-scene-x="2.6" data-scene-o="0.6">
                <div className="wrap">
                    <div className="sec-head">
                        <div>
                            <div className="sec-label mono" data-reveal>(03) What drives us</div>
                            <h2 className="sec-title" data-split>Mission <em>&amp; values</em></h2>
                        </div>
                        <p className="sec-desc" data-reveal>Technology should empower businesses, not complicate them. These principles guide every decision we make.</p>
                    </div>
                    <div className="values">
                        <div className="value"><span className="mono">01</span><div><h3>Our <em>mission</em></h3><p>Make premium digital solutions accessible, so businesses of every size can compete in the digital economy with affordable, scalable technology.</p></div></div>
                        <div className="value"><span className="mono">02</span><div><h3><em>Innovation</em></h3><p>We keep exploring emerging technologies and methods to give our clients a real competitive edge.</p></div></div>
                        <div className="value"><span className="mono">03</span><div><h3><em>Partnership</em></h3><p>Every client relationship is a long-term partnership — we're invested in your success as much as our own.</p></div></div>
                        <div className="value"><span className="mono">04</span><div><h3>Results-<em>driven</em></h3><p>We measure ourselves by business outcomes, not just technical deliverables.</p></div></div>
                        <div className="value"><span className="mono">05</span><div><h3><em>Integrity</em></h3><p>Transparency in every dealing and the highest ethical standards in our work.</p></div></div>
                        <div className="value"><span className="mono">06</span><div><h3><em>Excellence</em></h3><p>Mastery through continuous learning and quality assurance at every stage.</p></div></div>
                    </div>
                </div>
            </section>

            <section className="cta" data-scene="1" data-scene-x="0" data-scene-o="0.8" data-scene-s="1.2">
                <div className="wrap">
                    <h2 className="cta-title" data-split>Meet the <em>team.</em></h2>
                    <Link href="/team" className="cta-orb" data-magnetic="0.4" aria-label="View our team">
                        <svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="circ" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"/></defs><text><textPath href="#circ">View our team • View our team • </textPath></text></svg>
                        <span>→</span>
                    </Link>
                </div>
            </section>

        </main>
    );
}
