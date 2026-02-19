import type { Metadata } from 'next';
import { templateList } from '@/lib/templates/registry';
import TemplateGallery from './gallery';

export const metadata: Metadata = {
    title: 'CV Templates Kiezen - 13+ Professionele Ontwerpen | WerkCV.nl',
    description: 'Kies uit 13+ professionele CV templates. Van klassiek tot modern, ATS-vriendelijk ontwerp. Vind de perfecte stijl voor jouw sollicitatie.',
    keywords: [
        'cv template',
        'cv ontwerp',
        'cv layout',
        'professioneel cv template',
        'modern cv template',
        'klassiek cv template',
        'ATS-vriendelijk cv template',
        'cv template kiezen',
        'cv stijl',
        'gratis cv template',
    ],
    alternates: {
        canonical: 'https://werkcv.nl/templates',
        languages: {
            'nl-NL': 'https://werkcv.nl/templates',
            'en-NL': 'https://werkcv.nl/en/dutch-cv-template',
            'x-default': 'https://werkcv.nl/templates',
        },
    },
};

export default function TemplatesPage() {
    return (
        <main id="quick-start">
            <TemplateGallery templates={templateList} />
        </main>
    );
}
