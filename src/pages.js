// Every address Google can list, with its own title and words. Used by the
// page itself (popups and titles) and by scripts/prerender.mjs (static HTML).
export const SITE = 'https://atomdownloader.online';
export const SUPPORT_EMAIL = 'atomIDMsupport@mankindresearch.org';
export const HOME_TITLE = 'Atom IDM - Atom Downloader is the Secure Internet Download Manager for Mac';
export const HOME_DESCRIPTION = 'Atom IDM (Atom Downloader) is the secure Internet Download Manager for Mac: parallel downloads, auto-resume and a security check on every file. Free for Apple Silicon and Intel.';

// kind: 'scroll' → the home page scrolled to `target`; 'pricing' → the pricing
// popup; 'info' → the info popup with `sections`.
export const pages = {
  '/download': {
    kind: 'scroll', target: 'download',
    title: 'Download Atom IDM for Mac — Free, Notarized by Apple',
    description: 'Download Atom IDM for Mac free. Signed and notarized by Apple, with builds for Apple Silicon (M1, M2, M3, M4) and Intel Macs.',
    heading: 'Download Atom IDM for Mac',
    sections: [['', 'Atom IDM is free to download for macOS. Pick Apple Silicon for M-chip Macs or Universal for Intel Macs. Every build is signed with a Developer ID and notarized by Apple.']],
  },
  '/features': {
    kind: 'scroll', target: 'features',
    title: 'Features — Atom IDM, the Download Manager for Mac',
    description: 'Parallel multi-part downloads, auto-resume after Wi-Fi drops, a security check on every file, Hugging Face and GitHub repos, and brew · npm · pip installs.',
    heading: 'Atom IDM features',
    sections: [['', 'Parallel multi-part downloads powered by AtomPowercore. Auto-resume when Wi-Fi drops or a server pauses. A security check on every file and link. Hugging Face and GitHub repositories. brew, npm and pip installs in Ultra.']],
  },
  '/pricing': {
    kind: 'pricing',
    title: 'Pricing — Atom IDM Free, Pro $25, Ultra $39.99 (One-Time)',
    description: 'Atom IDM is free to start. Pro is $25 and Ultra is $39.99 — pay once, keep it forever. No subscription. Card, PayPal and Apple Pay.',
    heading: 'Atom IDM pricing',
    sections: [['', 'Free: one download at a time, auto-resume and security checks. Pro, $25 one-time: many downloads at once plus Hugging Face and GitHub repos. Ultra, $39.99 one-time: everything in Pro plus brew, npm and pip installs. Buy inside the app after downloading it free.']],
  },
  '/about': {
    kind: 'scroll', target: 'about',
    title: 'About Atom IDM — Made by Mankind Research Corporation',
    description: 'Atom IDM (Atom Downloader) is the secure Internet Download Manager for Mac, made by Mankind Research Corporation and notarized by Apple.',
    heading: 'About Atom IDM',
    sections: [['', 'Atom IDM, also called Atom Downloader, is a download manager built only for macOS by Mankind Research Corporation. Its AtomPowercore engine splits files into parts and downloads them in parallel.']],
  },
  '/support': {
    kind: 'info',
    title: 'Support & Contact — Atom IDM for Mac',
    description: `Get help with Atom IDM for Mac: installing, licenses, refunds and updates. Email ${SUPPORT_EMAIL}.`,
    heading: 'Support & contact',
    sections: [
      ['Email us', `Write to ${SUPPORT_EMAIL}. Include your Mac model, your macOS version and, for purchases, the email you paid with. We usually reply within one business day.`],
      ['How do I buy Pro or Ultra?', 'Inside the app. Download Atom Downloader free, click Get Full Version, and pay with card, PayPal or Apple Pay. It unlocks on the spot.'],
      ['Bought Atom and it didn’t unlock?', 'Open Atom Downloader → Restore Purchase and enter the email you paid with and the transaction ID from your PayPal receipt. Still stuck? Email us both and we’ll unlock it for you.'],
      ['Moving to a new Mac?', 'Your purchase is yours forever. Install Atom on the new Mac and use Restore Purchase with the same email and PayPal transaction ID.'],
    ],
  },
  '/how-to-use-idm-on-mac': {
    kind: 'info',
    title: 'How to Use IDM on Mac — Atom IDM, the Download Manager for macOS',
    description: 'Looking for IDM on Mac? Atom IDM is a download manager built for macOS: install it, paste a link and download in parallel with auto-resume.',
    heading: 'How can I use IDM on Mac?',
    sections: [
      ['A download manager made for macOS', 'Atom IDM brings what people love about an internet download manager — faster parallel downloads and resume after a drop — to the Mac, built natively for macOS.'],
      ['1. Install', 'Download Atom IDM, open the disk image and drag Atom Downloader into Applications. It is notarized by Apple, so it opens like any App Store app.'],
      ['2. Add a link', 'Copy a download link and paste it into Atom, or drop a link onto its window. Atom checks the link before it starts.'],
      ['3. Let it run', 'Atom splits the file into parts and downloads them at the same time. If your Wi-Fi drops, it waits and carries on from where it stopped.'],
    ],
  },
  '/update': {
    kind: 'info',
    title: 'Update Atom IDM to the Latest Version',
    description: 'How to check your Atom IDM version and update to the latest release for Mac. Your license and downloads stay as they are.',
    heading: 'Update Atom IDM to the latest version',
    sections: [
      ['Which version do I have?', 'Open Atom Downloader, then choose Atom Downloader → About Atom Downloader from the menu bar.'],
      ['How do I update?', 'Download the latest version from this site and drag it into Applications, choosing Replace. Your purchase, settings and downloads are kept.'],
      ['Latest version', 'Atom IDM 2.26 — Apple Silicon and Universal (Intel) builds, signed and notarized by Apple.'],
    ],
  },
  '/privacy': {
    kind: 'info',
    title: 'Privacy Policy — Atom IDM',
    description: 'How Atom IDM and atomdownloader.online handle your data: downloads stay on your Mac, payments go through PayPal.',
    heading: 'Privacy policy',
    sections: [
      ['On your Mac', 'Atom IDM downloads files straight from the sites you choose. Your downloads, links and history stay on your Mac and are not sent to us. Security checks run on your Mac.'],
      ['Payments', 'Payments are handled by PayPal (card, PayPal or Apple Pay). We never see your card number. PayPal shares your name, email and order number with us so we can issue your license.'],
      ['Purchases', 'We keep your name, email and order number to unlock your Mac, let you Restore Purchase later and answer support requests. We do not sell or share it.'],
      ['This website', 'The site is hosted by Vercel, which keeps standard server logs. Downloads are served from GitHub.'],
      ['Contact', `Questions or a request to delete your data: ${SUPPORT_EMAIL}.`],
    ],
  },
  '/terms': {
    kind: 'info',
    title: 'Terms of Use — Atom IDM',
    description: 'The terms for using Atom IDM (Atom Downloader) for Mac and buying a Pro or Ultra license.',
    heading: 'Terms of use',
    sections: [
      ['License', 'Pro and Ultra are one-time purchases that license Atom IDM for your personal or business use on your own Macs. There is no subscription.'],
      ['Your downloads', 'You are responsible for what you download and for respecting copyright and the terms of the sites you download from.'],
      ['No warranty', 'Atom IDM is provided as is. Download speeds depend on your connection and the source server.'],
      ['Names', 'Atom IDM is made by Mankind Research Corporation. It is not affiliated with Tonec Inc.’s Internet Download Manager (IDM) or with GitHub’s Atom editor. Other names belong to their owners.'],
    ],
  },
  '/refund': {
    kind: 'info',
    title: 'Refund Policy — Atom IDM',
    description: 'Atom IDM Pro and Ultra come with a 14-day refund. Email support with your PayPal receipt.',
    heading: 'Refund policy',
    sections: [
      ['14-day refund', `If Atom IDM Pro or Ultra isn’t right for you, email ${SUPPORT_EMAIL} within 14 days of buying, with the email you paid with. We refund the full amount through PayPal.`],
      ['Try first', 'The free version is free forever, so you can try Atom on your Mac before you buy.'],
    ],
  },
};

export const pageFor = path => pages[path.replace(/(\.html)?\/*$/, '')] || null;
