const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const POLAR_ACCESS_TOKEN = process.env.POLAR_ACCESS_TOKEN;
const POLAR_PRICE_ID =
    process.env.POLAR_PRICE_ID_CV_DOWNLOAD || process.env.POLAR_PRODUCT_ID_CV_DOWNLOAD || process.env.POLAR_PRODUCT_ID;
const POLAR_SERVER = process.env.POLAR_SERVER === 'sandbox' ? 'sandbox' : 'production';

const POLAR_API_BASE = POLAR_SERVER === 'sandbox'
    ? 'https://sandbox-api.polar.sh'
    : 'https://api.polar.sh';

const SUPPORTED_ADDONS = ['ats-rewrite', 'cover-letter', 'localization-polish'] as const;
export type CheckoutAddon = typeof SUPPORTED_ADDONS[number];

function isCheckoutAddon(value: string): value is CheckoutAddon {
    return SUPPORTED_ADDONS.includes(value as CheckoutAddon);
}

function uniqueAddons(addons: CheckoutAddon[]): CheckoutAddon[] {
    return [...new Set(addons)];
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
    if (!POLAR_ACCESS_TOKEN) {
        throw new Error('POLAR_ACCESS_TOKEN is not configured');
    }
    if (!POLAR_PRICE_ID) {
        throw new Error('POLAR_PRICE_ID_CV_DOWNLOAD is not configured');
    }

    const addons = uniqueAddons(selectedAddons);

    const body: Record<string, unknown> = {
        product_price_id: POLAR_PRICE_ID,
        success_url: `${APP_URL}/success?cvId=${encodeURIComponent(cvId)}`,
        return_url: `${APP_URL}/editor?id=${encodeURIComponent(cvId)}`,
        metadata: {
            cv_id: cvId,
            addons_csv: addons.join(','),
        },
    };

    if (email) {
        body.customer_email = email;
    }

    const res = await fetch(`${POLAR_API_BASE}/v1/checkouts/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${POLAR_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Polar checkout failed (${res.status}): ${error}`);
    }

    const checkout = await res.json() as { url?: string };

    if (!checkout.url) {
        throw new Error('Polar checkout URL is missing from response');
    }

    return checkout.url;
}
