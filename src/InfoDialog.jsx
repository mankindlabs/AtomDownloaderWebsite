import React, { forwardRef } from 'react';
import { X } from 'lucide-react';
import elfIcon from './assets/elf_icon.png';
import { SUPPORT_EMAIL } from './pages.js';
import './download-chooser.css';

/// Help, support and policy pages, as a popup over the download page.
const InfoDialog = forwardRef(function InfoDialog({ page, onDownload }, ref) {
  const close = () => ref.current.close();
  return <dialog ref={ref} className="download-dialog info-dialog" aria-labelledby="info-title" onClick={event => { if (event.target === ref.current) close(); }}>
    <button className="dialog-close" aria-label="Close" autoFocus onClick={close}><X size={22} /></button>
    <img src={elfIcon} alt="" />
    <span className="eyebrow">ATOM IDM FOR MAC</span>
    <h2 id="info-title">{page?.heading}</h2>
    <div className="info-sections">
      {page?.sections.map(([title, text]) => <section key={title || text}>
        {title && <h3>{title}</h3>}
        <p>{text.split(SUPPORT_EMAIL).flatMap((part, i) => i ? [<a key={i} href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>, part] : [part])}</p>
      </section>)}
    </div>
    <button className="button button-blue info-cta" onClick={() => { close(); onDownload(); }}>Download Free for Mac</button>
  </dialog>;
});

export default InfoDialog;
