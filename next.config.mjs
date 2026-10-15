/** @type {import('next').NextConfig} */
const nextConfig = {
    // The GSAP layer mutates the DOM (word splitting, counters); a double
    // mount in development would split already-split text.
    reactStrictMode: false,
    images: {
        remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
        // 90 is for team portraits; AVIF/WebP keep them light at that quality.
        qualities: [75, 90],
        formats: ['image/avif', 'image/webp'],
    },
    async redirects() {
        return [
            { source: '/index.html', destination: '/', permanent: true },
            { source: '/aboutUs.html', destination: '/about', permanent: true },
            { source: '/ContactUS.html', destination: '/contact', permanent: true },
        ];
    },
};

export default nextConfig;
