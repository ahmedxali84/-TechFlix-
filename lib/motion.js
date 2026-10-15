/* =========================================================
   TechFlix — GSAP interactions
   createSite() sets up what lives for the whole visit (smooth scroll,
   WebGL scene, page transitions); mountPage() wires up the page that is
   currently rendered and returns a cleanup for when the route changes.
   ========================================================= */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { createScene } from './scene';

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

/* ---------------------------------------------------------
   Text splitting
   --------------------------------------------------------- */
function splitWords(el) {
    if (el.dataset.splitDone) return $$('.word-inner', el);
    const label = el.textContent.replace(/\s+/g, ' ').trim();
    const out = document.createDocumentFragment();
    const walk = (node, wrapTag, parent) => {
        node.childNodes.forEach((child) => {
            if (child.nodeType === 3) {
                child.textContent.split(/(\s+)/).forEach((part) => {
                    if (!part) return;
                    if (/^\s+$/.test(part)) { parent.appendChild(document.createTextNode(' ')); return; }
                    const w = document.createElement('span');
                    w.className = 'word';
                    w.setAttribute('aria-hidden', 'true');
                    const inner = document.createElement(wrapTag || 'span');
                    inner.className = 'word-inner';
                    inner.textContent = part;
                    w.appendChild(inner);
                    parent.appendChild(w);
                });
            } else if (child.nodeName === 'BR') {
                parent.appendChild(document.createElement('br'));
            } else if (child.nodeType === 1) {
                // keep block line wrappers, flatten inline styling (em) onto words
                if (child.classList.contains('ln')) {
                    const ln = child.cloneNode(false);
                    parent.appendChild(ln);
                    walk(child, wrapTag, ln);
                } else {
                    walk(child, child.nodeName === 'EM' ? 'em' : wrapTag, parent);
                }
            }
        });
    };
    walk(el, null, out);
    el.setAttribute('aria-label', label);
    el.textContent = '';
    el.appendChild(out);
    el.dataset.splitDone = '1';
    return $$('.word-inner', el);
}

export function createSite(router) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: 'power3.out', duration: 1 });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const wipe = $('.page-wipe');
    const nav = $('.nav');

    /* ---------------------------------------------------------
       Smooth scroll
       --------------------------------------------------------- */
    let lenis = null;
    const lenisRaf = (time) => lenis.raf(time * 1000);
    if (!reduceMotion) {
        lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(lenisRaf);
        gsap.ticker.lagSmoothing(0);
    }
    const scrollToTarget = (sel, immediate) => {
        const el = typeof sel === 'string' ? $(sel) : sel;
        if (!el) return;
        if (lenis) lenis.scrollTo(el, { offset: -40, duration: 1.6, immediate: !!immediate });
        else el.scrollIntoView({ behavior: reduceMotion || immediate ? 'auto' : 'smooth' });
    };
    const scrollToTop = () => {
        if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);
    };

    const canvas = $('.webgl');
    const scene = canvas ? createScene(canvas) : null;

    /* ---------------------------------------------------------
       Page transitions: internal links play the loader-style wipe,
       then hand over to the Next.js router.
       --------------------------------------------------------- */
    let leaving = false;
    const onLinkClick = (e) => {
        const a = e.target.closest && e.target.closest('a[href]');
        if (!a || e.defaultPrevented) return;
        if (a.target === '_blank' || a.hasAttribute('download')) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        const url = new URL(a.href, window.location.href);
        if (url.origin !== window.location.origin) return;

        if (url.pathname === window.location.pathname) {
            e.preventDefault();
            // Deferred so a mobile-menu link can close the menu (and restart Lenis) first
            if (url.hash.length > 1) setTimeout(() => scrollToTarget(decodeURIComponent(url.hash)), 0);
            return;
        }

        e.preventDefault();
        if (leaving) return;
        const dest = url.pathname + url.search + url.hash;
        if (reduceMotion || !wipe) { router.push(dest, { scroll: false }); return; }
        leaving = true;
        // Loader-style exit: fade in logo + bar, fill most of the bar, then navigate
        gsap.timeline({ onComplete: () => router.push(dest, { scroll: false }) })
            .set(wipe, { pointerEvents: 'all' })
            .to(wipe, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' })
            .fromTo('.wipe-mark', { scale: 0.85, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.6, ease: 'expo.out' }, 0.1)
            .fromTo('.wipe-bar span', { scaleX: 0 }, { scaleX: 0.75, duration: 0.6, ease: 'power2.out' }, 0.15);
    };
    document.addEventListener('click', onLinkClick, true);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    /* ---------------------------------------------------------
       Intro: preloader on the very first visit, wipe afterwards
       --------------------------------------------------------- */
    let firstPage = true;
    function runIntro(done) {
        const first = firstPage;
        firstPage = false;
        const pre = $('.preloader');
        let visited = !first;
        try { visited = visited || sessionStorage.getItem('tf-visited') === '1'; } catch (_) { /* storage blocked */ }
        try { sessionStorage.setItem('tf-visited', '1'); } catch (_) { /* storage blocked */ }

        if (reduceMotion || !pre) {
            if (pre) pre.style.display = 'none';
            if (wipe) gsap.set(wipe, { autoAlpha: 0, pointerEvents: 'none' });
            done();
            return;
        }
        if (visited) {
            pre.style.display = 'none';
            // Loader-style entry: finish the bar, then fade the loader away
            gsap.timeline({ onComplete: () => { gsap.set(wipe, { pointerEvents: 'none' }); leaving = false; } })
                .set(wipe, { autoAlpha: 1, pointerEvents: 'all' })
                .set('.wipe-mark', { scale: 1, autoAlpha: 1 })
                .fromTo('.wipe-bar span', { scaleX: 0.75 }, { scaleX: 1, duration: 0.45, ease: 'power2.inOut' })
                .to('.wipe-mark', { scale: 1.08, autoAlpha: 0, duration: 0.45, ease: 'power2.in' }, '+=0.05')
                .to(wipe, { autoAlpha: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
                .add(done, '-=0.35');
            return;
        }

        lenis && lenis.stop();
        const count = $('.preloader-count', pre);
        const c = { v: 0 };
        gsap.timeline({ onComplete: () => { pre.style.display = 'none'; lenis && lenis.start(); } })
            .from('.preloader-word > *', { yPercent: 30, scale: 0.9, autoAlpha: 0, filter: 'blur(14px)', duration: 1, ease: 'expo.out' })
            .from(['.preloader-top', '.preloader-bottom'], { autoAlpha: 0, duration: 0.6 }, 0.1)
            .to('.preloader-bar', { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 0.2)
            .to(c, { v: 100, duration: 1.6, ease: 'power2.inOut', onUpdate: () => { count.textContent = String(Math.round(c.v)).padStart(3, '0'); } }, 0.2)
            .to('.preloader-word > *', { yPercent: -20, scale: 1.05, autoAlpha: 0, filter: 'blur(14px)', duration: 0.7, ease: 'expo.in' }, '+=0.1')
            .to(pre, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' }, '-=0.2')
            .add(done, '-=0.6');
    }

    /* ---------------------------------------------------------
       Per-page wiring
       --------------------------------------------------------- */
    function mountPage() {
        const disposers = [];
        const on = (el, type, fn, opts) => {
            el.addEventListener(type, fn, opts);
            disposers.push(() => el.removeEventListener(type, fn, opts));
        };
        const sections = $$('main [data-scene]');
        const isFirst = firstPage;
        let alive = true;

        // A new page starts at its top; hash targets are scrolled to once laid out.
        scrollToTop();
        if (isFirst && scene) scene.prime(sections);

        const ctx = gsap.context(() => {
            /* Navigation: shrink on scroll, hide while scrolling down */
            if (nav) {
                ScrollTrigger.create({
                    start: 0, end: 'max',
                    onUpdate: (self) => {
                        const y = self.scroll();
                        nav.classList.toggle('is-scrolled', y > 40);
                        if (document.body.classList.contains('nav-open')) return;
                        gsap.to(nav, { yPercent: self.direction === 1 && y > 500 ? -120 : 0, duration: 0.6, overwrite: 'auto' });
                    },
                });
            }

            /* Mobile menu */
            const toggle = $('.nav-toggle');
            const menu = $('.mobile-menu');
            if (toggle && menu) {
                const tl = gsap.timeline({ paused: true })
                    .set(menu, { visibility: 'visible' })
                    .to(menu, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'expo.inOut' })
                    .from($$('li a', menu), { yPercent: 60, autoAlpha: 0, filter: 'blur(8px)', stagger: 0.06, duration: 0.8, ease: 'expo.out', clearProps: 'filter' }, '-=0.4')
                    .from('.mobile-menu-foot', { autoAlpha: 0, y: 20, duration: 0.5 }, '-=0.5');
                const setMenu = (open) => {
                    document.body.classList.toggle('nav-open', open);
                    toggle.setAttribute('aria-expanded', String(open));
                    if (open) { lenis && lenis.stop(); tl.timeScale(1).play(); }
                    else { lenis && lenis.start(); tl.timeScale(1.7).reverse(); }
                };
                on(toggle, 'click', () => setMenu(!document.body.classList.contains('nav-open')));
                $$('a', menu).forEach((a) => on(a, 'click', () => setMenu(false)));
                disposers.push(() => {
                    document.body.classList.remove('nav-open');
                    toggle.setAttribute('aria-expanded', 'false');
                });
            }

            /* Magnetic buttons */
            if (finePointer && !reduceMotion) {
                $$('[data-magnetic]').forEach((el) => {
                    const k = parseFloat(el.dataset.magnetic) || 0.35;
                    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });
                    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });
                    on(el, 'pointermove', (e) => {
                        const r = el.getBoundingClientRect();
                        xTo((e.clientX - r.left - r.width / 2) * k);
                        yTo((e.clientY - r.top - r.height / 2) * k);
                    });
                    on(el, 'pointerleave', () => { xTo(0); yTo(0); });
                });
            }

            contactIntents(on);
        });

        // Hero entrance, built paused so start states apply at once
        let hero;
        ctx.add(() => { hero = heroIntro(); });

        runIntro(() => {
            if (!alive) return;
            if (isFirst && scene) scene.reveal(sections);
            if (scene) disposers.push(scene.bind(sections));
            ctx.add(() => {
                hero.play();
                scrollAnimations(disposers);
            });
            ScrollTrigger.refresh();
            const hash = decodeURIComponent(window.location.hash);
            if (hash.length > 1) {
                const target = $(hash);
                if (target) scrollToTarget(target, true);
            }
        });

        return () => {
            alive = false;
            disposers.forEach((d) => d());
            ctx.revert();
            lenis && lenis.start();
        };
    }

    function heroIntro() {
        const tl = gsap.timeline({ paused: true });
        const title = $('[data-hero-title]');
        if (title) {
            tl.from(splitWords(title), {
                yPercent: 70, autoAlpha: 0, filter: 'blur(14px)',
                stagger: 0.07, duration: 1.4, ease: 'expo.out', clearProps: 'filter',
            }, 0);
        }
        const fade = $$('[data-hero-fade]');
        if (fade.length) tl.from(fade, { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1 }, 0.5);
        if (nav) tl.from(nav, { yPercent: -100, autoAlpha: 0, duration: 1 }, 0.3);
        if ($('.scroll-cue')) tl.from('.scroll-cue', { autoAlpha: 0, duration: 1 }, 1.2);
        return tl;
    }

    /* ---------------------------------------------------------
       Scroll animations
       --------------------------------------------------------- */
    function scrollAnimations(disposers) {
        // Headings: words rise into focus (blur -> sharp), always upright
        $$('[data-split]').forEach((el) => {
            gsap.from(splitWords(el), {
                yPercent: 60, autoAlpha: 0, filter: 'blur(12px)',
                stagger: 0.05, duration: 1.2, ease: 'expo.out', clearProps: 'filter',
                scrollTrigger: { trigger: el, start: 'top 86%' },
            });
        });

        // Fade-up batches
        gsap.set('[data-reveal]', { y: 50, autoAlpha: 0 });
        ScrollTrigger.batch('[data-reveal]', {
            start: 'top 90%',
            onEnter: (b) => gsap.to(b, { y: 0, autoAlpha: 1, stagger: 0.09, duration: 1.1, overwrite: true }),
        });

        // Hero drifts up and fades as you scroll past it
        const heroInner = $('.hero .wrap.hero-main, .page-hero .wrap');
        if (heroInner && !reduceMotion) {
            gsap.to(heroInner, {
                yPercent: -12, scale: 0.96, autoAlpha: 0.15, ease: 'none',
                scrollTrigger: { trigger: heroInner.closest('section'), start: 'top top', end: 'bottom top', scrub: true },
            });
        }

        // Crossing marquee bands — speed up and flip with scroll velocity
        const tracks = $$('.band-track');
        if (tracks.length) {
            const loops = tracks.map((t, i) => gsap.fromTo(t, { xPercent: i ? -50 : 0 }, { xPercent: i ? 0 : -50, duration: 30, ease: 'none', repeat: -1 }));
            let dir = 1;
            ScrollTrigger.create({
                onUpdate: (self) => {
                    if (self.direction !== dir) dir = self.direction;
                    const boost = gsap.utils.clamp(1, 6, Math.abs(self.getVelocity()) / 250);
                    loops.forEach((l) => gsap.timeline({ overwrite: true })
                        .to(l, { timeScale: boost * dir, duration: 0.2 })
                        .to(l, { timeScale: dir, duration: 1.4, ease: 'power2.out' }));
                },
            });
            gsap.from('.band-a', { rotateX: 70, ease: 'none', scrollTrigger: { trigger: '.bands', start: 'top bottom', end: 'center center', scrub: true } });
            gsap.from('.band-b', { rotateX: -70, ease: 'none', scrollTrigger: { trigger: '.bands', start: 'top bottom', end: 'center center', scrub: true } });
        }

        // Manifesto: words light up as you read
        const mf = $('.manifesto-text');
        if (mf) {
            if (!mf.dataset.wrapDone) {
                const wrap = (node) => {
                    Array.from(node.childNodes).forEach((n) => {
                        if (n.nodeType === 3) {
                            const frag = document.createDocumentFragment();
                            n.textContent.split(/(\s+)/).forEach((p) => {
                                if (!p) return;
                                if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
                                const s = document.createElement('span');
                                s.className = 'w'; s.textContent = p; frag.appendChild(s);
                            });
                            n.replaceWith(frag);
                        } else if (n.nodeType === 1) wrap(n);
                    });
                };
                wrap(mf);
                mf.dataset.wrapDone = '1';
            }
            gsap.to($$('.w', mf), {
                opacity: 1, stagger: 0.1, ease: 'none',
                scrollTrigger: { trigger: mf, start: 'top 80%', end: 'bottom 45%', scrub: 0.5 },
            });
        }

        // Services rows slide in with depth
        gsap.utils.toArray('.svc').forEach((row) => {
            gsap.from(row, {
                y: 60, autoAlpha: 0, filter: 'blur(10px)', duration: 1.2, ease: 'expo.out', clearProps: 'filter',
                scrollTrigger: { trigger: row, start: 'top 92%' },
            });
        });

        ventures(disposers);
        processSteps();

        // Image parallax inside clipped frames (team portraits keep their own shape, so no room to slide)
        $$('.story-img img').forEach((img) => {
            gsap.fromTo(img, { yPercent: -8 }, {
                yPercent: 4, ease: 'none',
                scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
            });
        });
        $$('.member-img, .story-img figure').forEach((f) => {
            gsap.from(f, {
                clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 100% 100%, 0 100%)', duration: 1.6, ease: 'expo.inOut',
                scrollTrigger: { trigger: f, start: 'top 82%' },
            });
        });
        // Story image leans back in 3D as it scrolls
        const storyFig = $('.story-img figure');
        if (storyFig && !reduceMotion) {
            gsap.fromTo(storyFig, { rotateX: 22, rotateY: -10 }, {
                rotateX: 0, rotateY: 0, ease: 'none',
                scrollTrigger: { trigger: '.story', start: 'top bottom', end: 'center center', scrub: true },
            });
        }

        // Counters
        $$('[data-count]').forEach((el) => {
            const end = parseFloat(el.dataset.count);
            const o = { v: 0 };
            const sup = el.querySelector('sup');
            const supHTML = sup ? sup.outerHTML : '';
            el.innerHTML = '0' + supHTML;
            gsap.to(o, {
                v: end, duration: 2.2, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 90%' },
                onUpdate: () => { el.innerHTML = Math.round(o.v) + supHTML; },
            });
        });

        // Numbers & values: hairline grid assembles
        gsap.utils.toArray('.num, .value, .channel').forEach((el, i) => {
            gsap.from(el, {
                y: 40, autoAlpha: 0, filter: 'blur(10px)', duration: 1.1, delay: (i % 4) * 0.08, ease: 'expo.out', clearProps: 'filter',
                scrollTrigger: { trigger: el, start: 'top 92%' },
            });
        });

        // CTA headline pushes toward the viewer
        const cta = $('.cta-title');
        if (cta && !reduceMotion) {
            gsap.fromTo(cta, { scale: 0.86 }, {
                scale: 1, ease: 'none',
                scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'center 60%', scrub: true },
            });
        }

        // Footer wordmark letters rise up
        if ($('.footer-big')) {
            gsap.from($$('.footer-big > span'), {
                yPercent: 80, autoAlpha: 0, stagger: 0.04, ease: 'power2.out',
                scrollTrigger: { trigger: '.footer', start: 'top 85%', end: 'bottom bottom', scrub: 1 },
            });
        }

        // Map
        if ($('.map-wrap')) {
            gsap.from('.map-wrap', { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 4% 100%, 0 100%)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: '.map-wrap', start: 'top 85%' } });
        }
    }

    /* ---------------------------------------------------------
       Ventures: pinned 3D fly-through (desktop) / stacked (mobile)
       --------------------------------------------------------- */
    function ventures(disposers) {
        const sec = $('.ventures');
        if (!sec) return;
        const panels = $$('.v-panel', sec);
        const n = panels.length;
        const counter = $('.v-counter b', sec);
        const bars = $$('.v-rail i b', sec);
        const mm = gsap.matchMedia();
        disposers.push(() => mm.revert());

        mm.add('(min-width: 861px) and (prefers-reduced-motion: no-preference)', () => {
            const D = 1500; // depth between panels (px)
            const render = (p) => {
                panels.forEach((el, i) => {
                    const d = p - i;               // 0 = in focus, <0 = still far away, >0 = flying past
                    const z = gsap.utils.clamp(-D * 2.2, 800, d * D);
                    const side = i % 2 ? -1 : 1;
                    const x = d < 0 ? side * d * -14 : side * d * 30; // vw drift
                    const op = d < 0 ? gsap.utils.clamp(0, 1, 1 + d * 0.85) : gsap.utils.clamp(0, 1, 1 - d * 2.2);
                    el.style.transform = `translate(-50%, -50%) translate3d(${x}vw, 0, ${z}px)`;
                    el.style.opacity = op;
                    el.style.pointerEvents = Math.abs(d) < 0.35 ? 'auto' : 'none';
                    el.style.zIndex = String(100 - Math.round(Math.abs(d) * 10));
                });
                const active = Math.min(n - 1, Math.max(0, Math.round(p)));
                if (counter) counter.textContent = String(active + 1).padStart(2, '0');
                bars.forEach((b, i) => gsap.set(b, { scaleX: gsap.utils.clamp(0, 1, p - i + 0.5) }));
            };
            render(0);
            const st = ScrollTrigger.create({
                trigger: sec,
                pin: '.v-pin',
                start: 'top top',
                end: () => '+=' + window.innerHeight * (n - 0.4) * 1.1,
                scrub: 0.8,
                anticipatePin: 1,
                onUpdate: (self) => render(self.progress * (n - 1 + 0.15)),
            });
            return () => {
                st.kill();
                panels.forEach((el) => { el.style.cssText = ''; });
            };
        });

        mm.add('(max-width: 860px), (prefers-reduced-motion: reduce)', () => {
            panels.forEach((el) => {
                gsap.from(el, {
                    y: 80, autoAlpha: 0, filter: 'blur(10px)', duration: 1.3, ease: 'expo.out', clearProps: 'filter',
                    scrollTrigger: { trigger: el, start: 'top 85%' },
                });
            });
        });
    }

    /* ---------------------------------------------------------
       Process: sticky digit odometer + active step
       --------------------------------------------------------- */
    function processSteps() {
        const steps = $$('.step');
        if (!steps.length) return;
        const digits = $('.process-big .digits');
        steps.forEach((step, i) => {
            gsap.from(step, {
                autoAlpha: 0, y: 40, filter: 'blur(10px)', duration: 1.2, ease: 'expo.out', clearProps: 'filter',
                scrollTrigger: { trigger: step, start: 'top 88%' },
            });
            ScrollTrigger.create({
                trigger: step, start: 'top 60%', end: 'bottom 60%',
                onToggle: (self) => {
                    step.classList.toggle('is-active', self.isActive);
                    if (self.isActive && digits) gsap.to(digits, { yPercent: (-100 / steps.length) * i, duration: 1, ease: 'expo.inOut', overwrite: true });
                },
            });
        });
    }

    /* ---------------------------------------------------------
       Contact intents: accordion of topics
       --------------------------------------------------------- */
    function contactIntents(on) {
        const list = $('.intents');
        if (!list) return;
        const items = $$('.intent', list);
        items.forEach((item) => {
            const head = $('.intent-head', item);
            const body = $('.intent-body', item);
            on(head, 'click', () => {
                const open = !item.classList.contains('is-open');
                items.forEach((o) => {
                    if (o !== item && o.classList.contains('is-open')) {
                        o.classList.remove('is-open');
                        $('.intent-head', o).setAttribute('aria-expanded', 'false');
                        gsap.to($('.intent-body', o), { height: 0, duration: 0.6, ease: 'expo.inOut' });
                    }
                });
                item.classList.toggle('is-open', open);
                head.setAttribute('aria-expanded', String(open));
                gsap.to(body, { height: open ? 'auto' : 0, duration: 0.7, ease: 'expo.inOut', onComplete: () => ScrollTrigger.refresh() });
                if (open) gsap.fromTo($$('.intent-actions a', item), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.6, delay: 0.15, ease: 'expo.out' });
            });
        });
    }

    return {
        mountPage,
        destroy() {
            document.removeEventListener('click', onLinkClick, true);
            window.removeEventListener('load', onLoad);
            if (lenis) { gsap.ticker.remove(lenisRaf); lenis.destroy(); }
            if (scene) scene.destroy();
        },
    };
}
