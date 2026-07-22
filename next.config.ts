import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['@napi-rs/canvas', 'pdfjs-dist'],
  turbopack: {},

  async headers() {
    // Keep this policy in report-only mode until production violation reports
    // have been reviewed for 24-48 hours. Runtime third parties currently used:
    // Google Analytics/Tag Manager, Microsoft Clarity, and the admin-only
    // Leaflet bundle/OpenStreetMap tiles.
    const contentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://unpkg.com",
      "style-src 'self' 'unsafe-inline' https://unpkg.com",
      "img-src 'self' data: blob: https://*.clarity.ms https://c.bing.com https://*.tile.openstreetmap.org",
      "font-src 'self' data:",
      "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com",
      "worker-src 'self' blob:",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy-Report-Only',
            value: contentSecurityPolicy,
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Consolidate overlapping English CV intent onto one owner per cluster.
      {
        source: '/en/netherlands-cv-format',
        destination: '/en/guides/cv-format-netherlands-english',
        permanent: true,
      },
      {
        source: '/en/cv-format-netherlands-english',
        destination: '/en/guides/cv-format-netherlands-english',
        permanent: true,
      },
      {
        source: '/en/dutch-cv-for-expats',
        destination: '/en/expat-cv-netherlands',
        permanent: true,
      },
      {
        source: '/en/guides/dutch-cv-for-expats',
        destination: '/en/expat-cv-netherlands',
        permanent: true,
      },
      {
        source: '/cv.nl-opzeggen',
        destination: '/cv-nl-opzeggen',
        permanent: true,
      },

      // =====================================================================
      // Old /cv-voorbeeld → new /cv-voorbeelden redirects (301 permanent)
      // =====================================================================

      // Overview page
      {
        source: '/cv-voorbeeld',
        destination: '/cv-voorbeelden',
        permanent: true,
      },

      // --- Specific spoke redirects (MUST come before catch-all pillar redirects) ---

      // ICT spokes → technologie-en-ict
      {
        source: '/cv-voorbeeld/ict-en-software/developer/backend-developer-nodejs',
        destination: '/cv-voorbeelden/technologie-en-ict/software-ontwikkelaar',
        permanent: true,
      },
      {
        source: '/cv-voorbeeld/ict-en-software/developer/frontend-react-developer',
        destination: '/cv-voorbeelden/technologie-en-ict/software-ontwikkelaar',
        permanent: true,
      },
      {
        source: '/cv-voorbeeld/ict-en-software/data-specialist/junior-data-analist-python',
        destination: '/cv-voorbeelden/technologie-en-ict/data-engineer',
        permanent: true,
      },
      {
        source: '/cv-voorbeeld/ict-en-software/zendesk-support-medewerker',
        destination: '/cv-voorbeelden/technologie-en-ict/technische-dienst',
        permanent: true,
      },

      // Healthcare spokes → zorg-en-welzijn
      {
        source: '/cv-voorbeeld/zorg-en-welzijn/verpleegkundige-icu',
        destination: '/cv-voorbeelden/zorg-en-welzijn/verpleegkundige',
        permanent: true,
      },
      {
        source: '/cv-voorbeeld/zorg-en-welzijn/verzorgende-ig-ouderenzorg',
        destination: '/cv-voorbeelden/zorg-en-welzijn/zorgmedewerker-helpende',
        permanent: true,
      },

      // Logistics spokes → vakmanschap-en-logistiek
      {
        source: '/cv-voorbeeld/logistiek-en-transport/magazijnmedewerker-nachtdienst',
        destination: '/cv-voorbeelden/vakmanschap-en-logistiek/magazijnmedewerker',
        permanent: true,
      },
      {
        source: '/cv-voorbeeld/logistiek-en-transport/heftruckchauffeur-certificaat',
        destination: '/cv-voorbeelden/vakmanschap-en-logistiek/magazijnmedewerker',
        permanent: true,
      },
      {
        source: '/cv-voorbeeld/logistiek-en-transport/vrachtwagenchauffeur-internationaal',
        destination: '/cv-voorbeelden/vakmanschap-en-logistiek/chauffeur',
        permanent: true,
      },

      // Career situation spokes → studenten-en-starters (best fit)
      {
        source: '/cv-voorbeeld/situatie/carrièreswitch-naar-it',
        destination: '/cv-voorbeelden/technologie-en-ict/software-ontwikkelaar',
        permanent: true,
      },
      {
        source: '/cv-voorbeeld/situatie/zonder-ervaring-horeca',
        destination: '/cv-voorbeelden/studenten-en-starters/eerste-baan-starter',
        permanent: true,
      },
      {
        source: '/cv-voorbeeld/situatie/gat-in-cv-burn-out',
        destination: '/cv-voorbeelden/studenten-en-starters/eerste-baan-starter',
        permanent: true,
      },

      // Office spokes → will redirect to overview for now
      {
        source: '/cv-voorbeeld/kantoor-en-administratie/directiesecretaresse',
        destination: '/cv-voorbeelden',
        permanent: true,
      },
      {
        source: '/cv-voorbeeld/kantoor-en-administratie/financial-controller-mkb',
        destination: '/cv-voorbeelden',
        permanent: true,
      },

      // --- Catch-all pillar/subhub redirects ---

      // ICT subhubs and pillar
      {
        source: '/cv-voorbeeld/ict-en-software/developer/:path*',
        destination: '/cv-voorbeelden/technologie-en-ict',
        permanent: true,
      },
      {
        source: '/cv-voorbeeld/ict-en-software/data-specialist/:path*',
        destination: '/cv-voorbeelden/technologie-en-ict',
        permanent: true,
      },
      {
        source: '/cv-voorbeeld/ict-en-software/:path*',
        destination: '/cv-voorbeelden/technologie-en-ict',
        permanent: true,
      },

      // Healthcare pillar
      {
        source: '/cv-voorbeeld/zorg-en-welzijn/:path*',
        destination: '/cv-voorbeelden/zorg-en-welzijn',
        permanent: true,
      },

      // Logistics pillar
      {
        source: '/cv-voorbeeld/logistiek-en-transport/:path*',
        destination: '/cv-voorbeelden/vakmanschap-en-logistiek',
        permanent: true,
      },

      // Situations pillar
      {
        source: '/cv-voorbeeld/situatie/:path*',
        destination: '/cv-voorbeelden/studenten-en-starters',
        permanent: true,
      },

      // Office pillar
      {
        source: '/cv-voorbeeld/kantoor-en-administratie/:path*',
        destination: '/cv-voorbeelden',
        permanent: true,
      },

      // Final catch-all for any unmatched old URLs
      {
        source: '/cv-voorbeeld/:path*',
        destination: '/cv-voorbeelden',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
