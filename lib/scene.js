/* =========================================================
   TechFlix — WebGL background
   One particle cloud that morphs between four shapes
   (sphere → torus knot → double helix → spiral galaxy),
   driven by sections marked with data-scene="0..3".
   The canvas lives in the layout, so the cloud persists across
   pages; each page binds its own sections with bind().
   ========================================================= */
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Colours are fed straight into a custom shader; keep them in sRGB as authored.
THREE.ColorManagement.enabled = false;

const rand = (a, b) => a + Math.random() * (b - a);

function rotateZ(v, a) {
    const c = Math.cos(a), s = Math.sin(a);
    const x = v[0] * c - v[1] * s;
    const y = v[0] * s + v[1] * c;
    v[0] = x; v[1] = y;
}

function sphere(i, n, out) {
    // Fibonacci sphere with a soft inner shell
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = i * 2.399963229728653;
    const shell = Math.random() < 0.82 ? 2.2 : rand(0.6, 2.0);
    out[0] = Math.cos(t) * r * shell;
    out[1] = y * shell;
    out[2] = Math.sin(t) * r * shell;
}

function torusKnot(i, n, out) {
    const t = (i / n) * Math.PI * 2;
    const p = 2, q = 3;
    const r = 1.25 + 0.55 * Math.cos(q * t);
    const cx = r * Math.cos(p * t);
    const cy = r * Math.sin(p * t);
    const cz = 0.55 * Math.sin(q * t);
    // jitter inside a tube
    const a = Math.random() * Math.PI * 2;
    const b = Math.acos(rand(-1, 1));
    const tube = Math.pow(Math.random(), 0.6) * 0.26;
    out[0] = (cx + Math.sin(b) * Math.cos(a) * tube) * 1.15;
    out[1] = (cy + Math.sin(b) * Math.sin(a) * tube) * 1.15;
    out[2] = (cz + Math.cos(b) * tube) * 1.15;
}

function helix(i, n, out) {
    const strand = i % 5; // 0,1 strands — 2..4 rungs
    const y = rand(-3.2, 3.2);
    const ang = y * 1.9;
    const R = 1.05;
    let x, z;
    if (strand < 2) {
        const off = strand * Math.PI;
        x = Math.cos(ang + off) * R + rand(-0.05, 0.05);
        z = Math.sin(ang + off) * R + rand(-0.05, 0.05);
    } else {
        // rungs: quantise y so points form ladder steps
        const yq = Math.round(y * 3.2) / 3.2;
        const a2 = yq * 1.9;
        const s = rand(-1, 1);
        x = Math.cos(a2) * R * s;
        z = Math.sin(a2) * R * s;
        out[1] = yq + rand(-0.015, 0.015);
        out[0] = x; out[2] = z;
        rotateZ(out, 0.5);
        return;
    }
    out[0] = x; out[1] = y; out[2] = z;
    rotateZ(out, 0.5);
}

function galaxy(i, n, out) {
    const arms = 3;
    const arm = i % arms;
    const r = Math.pow(Math.random(), 0.7) * 3.4 + 0.15;
    const spin = r * 1.25;
    const a = (arm / arms) * Math.PI * 2 + spin;
    const spread = Math.pow(Math.random(), 2.4) * (0.55 + r * 0.12);
    out[0] = Math.cos(a) * r + rand(-1, 1) * spread;
    out[1] = rand(-1, 1) * spread * 0.35;
    out[2] = Math.sin(a) * r + rand(-1, 1) * spread;
    // tilt toward the camera
    const c = Math.cos(1.05), s = Math.sin(1.05);
    const y = out[1] * c - out[2] * s;
    const z = out[1] * s + out[2] * c;
    out[1] = y; out[2] = z;
}

const vertexShader = /* glsl */ `
    attribute vec3 pB;
    attribute vec3 pC;
    attribute vec3 pD;
    attribute float aRand;
    uniform float uTime;
    uniform float uMorph;
    uniform float uSize;
    uniform float uPR;
    uniform float uScatter;
    varying float vRand;
    varying float vDepth;

    float ease(float t) { return t * t * (3.0 - 2.0 * t); }

    void main() {
        vec3 p = position;
        // per-particle stagger so the morph ripples through the cloud
        float m = uMorph + (aRand - 0.5) * 0.35;
        p = mix(p, pB, ease(clamp(m, 0.0, 1.0)));
        p = mix(p, pC, ease(clamp(m - 1.0, 0.0, 1.0)));
        p = mix(p, pD, ease(clamp(m - 2.0, 0.0, 1.0)));

        // breathing + scroll-velocity scatter
        vec3 n = normalize(p + 0.0001);
        float wave = sin(uTime * 0.9 + aRand * 6.2831 + p.y * 1.8);
        p += n * (wave * 0.035 + uScatter * (0.25 + aRand * 0.6));

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = uSize * uPR * (0.35 + aRand * 0.9) / -mv.z;
        vRand = aRand;
        vDepth = clamp((-mv.z - 6.0) / 6.0, 0.0, 1.0);
    }
`;

const fragmentShader = /* glsl */ `
    uniform vec3 uInk;
    uniform vec3 uAccent;
    uniform vec3 uAccent2;
    uniform float uOpacity;
    varying float vRand;
    varying float vDepth;
    void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.05, d);
        vec3 col = mix(uInk, uAccent, step(0.82, vRand));
        col = mix(col, uAccent2, step(0.94, vRand));
        float alpha = a * (0.85 - vDepth * 0.6) * uOpacity;
        gl_FragColor = vec4(col * alpha, alpha);
    }
`;

const num = (v, fallback) => (v !== undefined && v !== '' ? parseFloat(v) : fallback);

export function createScene(canvas) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.matchMedia('(max-width: 860px)').matches;
    const COUNT = small ? 7000 : 16000;

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    } catch (e) {
        canvas.style.display = 'none';
        return null;
    }
    const PR = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75);
    renderer.setPixelRatio(PR);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    /* ---------- Particles ---------- */
    const shapes = [sphere, torusKnot, helix, galaxy];
    const buffers = shapes.map(() => new Float32Array(COUNT * 3));
    const randoms = new Float32Array(COUNT);
    const tmp = [0, 0, 0];
    for (let i = 0; i < COUNT; i++) {
        shapes.forEach((fn, s) => {
            fn(i, COUNT, tmp);
            buffers[s][i * 3] = tmp[0];
            buffers[s][i * 3 + 1] = tmp[1];
            buffers[s][i * 3 + 2] = tmp[2];
        });
        randoms[i] = Math.random();
    }
    // Shuffle per-shape order so morphs swirl instead of sliding in lockstep
    for (let s = 1; s < buffers.length; s++) {
        const b = buffers[s];
        for (let i = COUNT - 1; i > 0; i--) {
            const j = (Math.random() * (i + 1)) | 0;
            for (let k = 0; k < 3; k++) { const t = b[i * 3 + k]; b[i * 3 + k] = b[j * 3 + k]; b[j * 3 + k] = t; }
        }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(buffers[0], 3));
    geo.setAttribute('pB', new THREE.BufferAttribute(buffers[1], 3));
    geo.setAttribute('pC', new THREE.BufferAttribute(buffers[2], 3));
    geo.setAttribute('pD', new THREE.BufferAttribute(buffers[3], 3));
    geo.setAttribute('aRand', new THREE.BufferAttribute(randoms, 1));

    const uniforms = {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uSize: { value: small ? 34 : 30 },
        uPR: { value: PR },
        uScatter: { value: 0 },
        uOpacity: { value: 0 },
        uInk: { value: new THREE.Color('#eceaf8') },
        uAccent: { value: new THREE.Color('#7b2ff7') },
        uAccent2: { value: new THREE.Color('#c43cf2') },
    };

    const mat = new THREE.ShaderMaterial({
        uniforms, vertexShader, fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geo, mat);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    /* ---------- Sizing ---------- */
    let W = 0, H = 0, fit = 1;
    const state = { x: 0, y: 0, scale: 1 };
    function resize() {
        W = window.innerWidth;
        H = window.innerHeight;
        renderer.setSize(W, H, false);
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
        // shrink the cloud on narrow screens so it stays inside the viewport
        fit = Math.min(1, Math.max(0.55, camera.aspect * 0.85 + 0.15));
    }
    resize();

    /* ---------- Pointer ---------- */
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e) => {
        mouse.tx = (e.clientX / W) * 2 - 1;
        mouse.ty = (e.clientY / H) * 2 - 1;
    };

    let visible = true;
    const onVisibility = () => { visible = !document.hidden; };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    /* ---------- Scroll-driven states ---------- */
    function go(el) {
        const morph = num(el.dataset.scene, 0);
        const x = num(el.dataset.sceneX, 0);
        const o = num(el.dataset.sceneO, 1);
        const s = num(el.dataset.sceneS, 1);
        gsap.to(uniforms.uMorph, { value: morph, duration: reduceMotion ? 0 : 2.4, ease: 'power3.inOut', overwrite: 'auto' });
        gsap.to(state, { x, scale: s, duration: reduceMotion ? 0 : 2, ease: 'power3.inOut', overwrite: 'auto' });
        gsap.to(uniforms.uOpacity, { value: o, duration: 1.2, overwrite: 'auto' });
    }

    /* ---------- Loop ---------- */
    let last = performance.now();
    function tick() {
        if (!visible) return;
        const now = performance.now();
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;

        uniforms.uTime.value += reduceMotion ? 0 : dt;
        uniforms.uScatter.value *= 0.92;

        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;

        const xFit = state.x * (camera.aspect > 1 ? 1 : 0.15);
        group.position.x = xFit;
        group.scale.setScalar(state.scale * fit);
        if (!reduceMotion) group.rotation.y += dt * 0.09;
        points.rotation.x = mouse.y * 0.25;
        points.rotation.z = -mouse.x * 0.12;
        camera.position.x = mouse.x * 0.35;
        camera.position.y = -mouse.y * 0.25;
        camera.lookAt(xFit * 0.4, 0, 0);

        renderer.render(scene, camera);
    }
    gsap.ticker.add(tick);

    let revealed = false;

    return {
        /** Start the cloud in the first section's state, without tweening (first page only). */
        prime(sections) {
            const first = sections[0];
            if (!first) return;
            uniforms.uMorph.value = num(first.dataset.scene, 0);
            state.x = num(first.dataset.sceneX, 0);
            state.scale = num(first.dataset.sceneS, 1);
        },
        /** Scatter the particles in from nothing once the intro is done. */
        reveal(sections) {
            revealed = true;
            const o = sections[0] ? num(sections[0].dataset.sceneO, 1) : 1;
            gsap.fromTo(uniforms.uScatter, { value: 3 }, { value: 0, duration: 2.6, ease: 'expo.out' });
            gsap.to(uniforms.uOpacity, { value: o, duration: 1.6, ease: 'power2.out' });
        },
        /** Follow this page's sections while scrolling. Returns an unbind function. */
        bind(sections) {
            const triggers = sections.map((el) => ScrollTrigger.create({
                trigger: el,
                start: 'top 55%',
                end: 'bottom 55%',
                onToggle: (self) => { if (self.isActive && revealed) go(el); },
            }));
            // Scroll velocity → scatter
            triggers.push(ScrollTrigger.create({
                onUpdate: (self) => {
                    const v = Math.min(Math.abs(self.getVelocity()) / 4000, 0.6);
                    if (v > uniforms.uScatter.value) uniforms.uScatter.value = v;
                },
            }));
            if (revealed && sections[0]) go(sections[0]);
            return () => triggers.forEach((t) => t.kill());
        },
        destroy() {
            gsap.ticker.remove(tick);
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', onPointer);
            document.removeEventListener('visibilitychange', onVisibility);
            geo.dispose();
            mat.dispose();
            renderer.dispose();
        },
    };
}
