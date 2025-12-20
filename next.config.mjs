/** @type {import('next').NextConfig} */

// Definisci gli header di sicurezza
const cspHeader = `
    connect-src 'self' wss://antoniorinaldidev.com https://antoniorinaldidev.com/backend-api;
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://www.google-analytics.com https://static.cloudflareinsights.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https:;
    font-src 'self' data: https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`;

const nextConfig = {
    output: "standalone",
    reactStrictMode: false,

    async headers() {
        // SE SIAMO IN SVILUPPO: Non restituire headers di sicurezza stringenti
        if (process.env.NODE_ENV === 'development') {
            return [];
        }

        // SE SIAMO IN PRODUZIONE: Restituisci tutti gli headers di sicurezza
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: cspHeader.replace(/\n/g, ''),
                    },
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin'
                    }
                ],
            },
        ];
    },
};

export default nextConfig;