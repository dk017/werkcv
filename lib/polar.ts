import { Polar } from '@polar-sh/sdk';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const POLAR_ACCESS_TOKEN = process.env.POLAR_ACCESS_TOKEN;
const POLAR_PRODUCT_ID =
    process.env.POLAR_PRODUCT_ID_CV_DOWNLOAD || process.env.POLAR_PRODUCT_ID;
const POLAR_PRODUCT_ID_ATS_REWRITE = process.env.POLAR_PRODUCT_ID_ATS_REWRITE;
const POLAR_PRODUCT_ID_COVER_LETTER = process.env.POLAR_PRODUCT_ID_COVER_LETTER;
const POLAR_PRODUCT_ID_LOCALIZATION = process.env.POLAR_PRODUCT_ID_LOCALIZATION;
const POLAR_SERVER = process.env.POLAR_SERVER === 'sandbox' ? 'sandbox' : 'production';

const SUPPORTED_ADDONS = ['ats-rewrite', 'cover-letter', 'localization-polish'] as const;
export type CheckoutAddon = typeof SUPPORTED_ADDONS[number];

function isCheckoutAddon(value: string): value is CheckoutAddon {
    return SUPPORTED_ADDONS.includes(value as CheckoutAddon);
}

function uniqueAddons(addons: CheckoutAddon[]): CheckoutAddon[] {
    return [...new Set(addons)];
}

function resolveAddonProductId(addon: CheckoutAddon): string {
    if (addon === 'ats-rewrite') {
        if (!POLAR_PRODUCT_ID_ATS_REWRITE) {
            throw new Error('POLAR_PRODUCT_ID_ATS_REWRITE is not configured');
        }
        return POLAR_PRODUCT_ID_ATS_REWRITE;
    }
    if (addon === 'cover-letter') {
        if (!POLAR_PRODUCT_ID_COVER_LETTER) {
            throw new Error('POLAR_PRODUCT_ID_COVER_LETTER is not configured');
        }
        return POLAR_PRODUCT_ID_COVER_LETTER;
    }
    if (!POLAR_PRODUCT_ID_LOCALIZATION) {
        throw new Error('POLAR_PRODUCT_ID_LOCALIZATION is not configured');
    }
    return POLAR_PRODUCT_ID_LOCALIZATION;
}

function getClient(): Polar {
    if (!POLAR_ACCESS_TOKEN) {
        throw new Error('POLAR_ACCESS_TOKEN is not configured');
    }

    return new Polar({
        accessToken: POLAR_ACCESS_TOKEN,
        server: POLAR_SERVER,
    });
}

export function parseCheckoutAddons(input: unknown): CheckoutAddon[] {
    if (!Array.isArray(input)) return [];
    return uniqueAddons(
        input
            .filter((value): value is string => typeof value === 'string')
            .map((value) => value.trim())
            .filter(isCheckoutAddon)
    );
}

export async function buildCheckoutURL(
    cvId: string,
    email?: string,
    selectedAddons: CheckoutAddon[] = []
): Promise<string> {
    if (!POLAR_PRODUCT_ID) {
        throw new Error('POLAR_PRODUCT_ID (or POLAR_PRODUCT_ID_CV_DOWNLOAD) is not configured');
    }

    const client = getClient();
    const addons = uniqueAddons(selectedAddons);
    const productIds = [POLAR_PRODUCT_ID, ...addons.map(resolveAddonProductId)];

    const checkout = await client.checkouts.create({
        products: productIds,
        successUrl: `${APP_URL}/success?cvId=${encodeURIComponent(cvId)}`,
        returnUrl: `${APP_URL}/editor?id=${encodeURIComponent(cvId)}`,
        customerEmail: email || undefined,
        metadata: {
            cv_id: cvId,
            addons_csv: addons.join(','),
        },
    });

    if (!checkout.url) {
        throw new Error('Polar checkout URL is missing');
    }

    return checkout.url;
}
