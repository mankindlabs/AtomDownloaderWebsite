export const DOWNLOAD_INTEL_URL = import.meta.env.VITE_DOWNLOAD_INTEL_URL?.trim() || 'https://github.com/mankindlabs/AtomDownloaderWebsite/releases/download/v2.26/AtomDownloader-2.26-Universal.dmg';
export const DOWNLOAD_SILICON_URL = import.meta.env.VITE_DOWNLOAD_SILICON_URL?.trim() || 'https://github.com/mankindlabs/AtomDownloaderWebsite/releases/download/v2.26/AtomDownloader-2.26_Apple_Silicon.dmg';
export const DOWNLOAD_URL = import.meta.env.VITE_DOWNLOAD_URL?.trim() || '';
export const MIN_MACOS = 'macOS • Check system requirements';
export const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL?.trim() || '';
// The license server: Full Version checkout and .license delivery.
export const LICENSE_API = import.meta.env.VITE_LICENSE_API?.trim() || 'https://atomdownloader-license.atomidm.workers.dev';
export const FULL_VERSION_URL = `${LICENSE_API}/checkout`;
// PayPal payment pages: card, PayPal and Apple Pay on one page, no log-in first.
export const PRO_PAY_URL = 'https://www.paypal.com/ncp/payment/9BPLDQMRN8A94';
export const ULTRA_PAY_URL = 'https://www.paypal.com/ncp/payment/53YZS4B373U7Y';
