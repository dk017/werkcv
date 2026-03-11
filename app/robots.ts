import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/editor'],
            },
            {
                userAgent: 'OAI-SearchBot',
                allow: '/',
                disallow: ['/api/', '/editor'],
            },
            {
                userAgent: 'GPTBot',
                allow: '/',
                disallow: ['/api/', '/editor'],
            },
        ],
        sitemap: 'https://werkcv.nl/sitemap.xml',
    };
}
