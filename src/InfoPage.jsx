import React from 'react';
import { SUPPORT_EMAIL } from './pages.js';

/// Help and policy pages: their own address, with the download button on top.
export default function InfoPage({ page, downloadButton }) {
  return <main id="main" className="info-page container">
    <span className="eyebrow">ATOM IDM FOR MAC</span>
    <h1>{page.heading}</h1>
    <div className="info-page-actions">{downloadButton()}</div>
    <div className="info-sections">
      {page.sections.map(([title, text]) => <section key={title || text}>
        {title && <h2>{title}</h2>}
        <p>{text.split(SUPPORT_EMAIL).flatMap((part, i) => i ? [<a key={i} href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>, part] : [part])}</p>
      </section>)}
    </div>
  </main>;
}
