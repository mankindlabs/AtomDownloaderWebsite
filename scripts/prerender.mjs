// After `vite build`: writes one real HTML file per address, each with its own
// title, description, canonical link and readable text, so Google can index
// and list them as sublinks. The page script then takes over as usual.
import { readFileSync, writeFileSync } from 'node:fs';
import { pages, SITE, HOME_TITLE, HOME_DESCRIPTION } from '../src/pages.js';

const dist = new URL('../dist/', import.meta.url);
const template = readFileSync(new URL('index.html', dist), 'utf8');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const links = Object.entries(pages).map(([path, p]) => `<li><a href="${path}">${esc(p.heading)}</a></li>`).join('');

function render(path, title, description, body) {
  const url = SITE + (path === '/' ? '/' : path);
  return template
    .replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(description)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(description)}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${esc(title)}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${esc(description)}`)
    .replace('<div id="root"></div>', `<div id="root"><main class="prerender">${body}<nav aria-label="Atom IDM"><ul>${links}</ul></nav></main></div>`);
}

const home = `<h1>Atom IDM — the Internet Download Manager for Mac</h1><p>${esc(HOME_DESCRIPTION)}</p><p><a href="/download">Download Atom IDM for Mac free</a></p>`;
writeFileSync(new URL('index.html', dist), render('/', HOME_TITLE, HOME_DESCRIPTION, home));
for (const [path, p] of Object.entries(pages)) {
  const body = `<h1>${esc(p.heading)}</h1>` + p.sections.map(([h, t]) => (h ? `<h2>${esc(h)}</h2>` : '') + `<p>${esc(t)}</p>`).join('') + `<p><a href="/download">Download Atom IDM for Mac free</a></p>`;
  writeFileSync(new URL(path.slice(1) + '.html', dist), render(path, p.title, p.description, body));
}

const today = new Date().toISOString().slice(0, 10);
const urls = ['/', ...Object.keys(pages)].map(path => `  <url><loc>${SITE}${path}</loc><lastmod>${today}</lastmod><priority>${path === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n');
writeFileSync(new URL('sitemap.xml', dist), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
console.log(`prerendered ${Object.keys(pages).length + 1} pages`);
