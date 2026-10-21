import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, X } from 'lucide-react';
import elfIcon from './assets/elf_icon.png';
import { LICENSE_API } from './config.js';
import './download-chooser.css';

const pieces = Array.from({ length: 84 }, (_, index) => ({
  left: `${(index * 37) % 101}%`,
  '--drift': `${((index * 53) % 241) - 120}px`,
  '--spin': `${360 + (index * 71) % 720}deg`,
  '--delay': `${(index % 12) * 0.055}s`,
  '--duration': `${2.3 + (index % 7) * 0.16}s`,
  background: ['#185df5', '#83bdff', '#a68aff', '#f9ca68', '#69d8bb'][index % 5],
  borderRadius: index % 3 === 0 ? '50%' : '2px',
}));

const saveFile = ({ filename, license }) => {
  const url = URL.createObjectURL(new Blob([license], { type: 'application/json' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
};

/// Shown when PayPal sends the buyer back: confirms the payment with the
/// license server and downloads their .license file.
export default function LicenseClaim() {
  const ref = useRef(null);
  const [state, setState] = useState('idle');
  const [result, setResult] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const purchase = params.get('purchase');
    if (!purchase) return;
    window.history.replaceState(null, '', window.location.pathname);
    if (purchase === 'cancelled') return;
    ref.current?.showModal();
    const orderID = params.get('token');
    if (purchase !== 'done' || !orderID) { setState('error'); return; }
    setState('working');
    fetch(`${LICENSE_API}/claim`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orderID }), signal: AbortSignal.timeout(30000) })
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => { setResult(data); setState('done'); saveFile(data); })
      .catch(() => setState('error'));
  }, []);

  return <dialog ref={ref} className="download-dialog license-dialog" aria-labelledby="license-title">
    {state === 'done' && <div className="download-confetti" aria-hidden="true">{pieces.map((style, index) => <i key={index} style={style} />)}</div>}
    <button className="dialog-close" aria-label="Close" onClick={() => ref.current.close()}><X size={22} /></button>
    <img src={elfIcon} alt="" />
    {state === 'working' && <>
      <span className="eyebrow">ONE MOMENT</span>
      <h2 id="license-title">Confirming your payment…</h2>
      <p>Your license file is on its way. Please keep this page open.</p>
    </>}
    {state === 'done' && <>
      <span className="eyebrow">WELCOME TO THE FULL VERSION</span>
      <h2 id="license-title">Thank you, {result.name.split(' ')[0]}!</h2>
      <p>Your license file just downloaded{result.email ? <> — a copy is on its way to <strong>{result.email}</strong></> : null}.
        Open Atom Downloader, then double-click <strong>{result.filename}</strong> to unlock everything.</p>
      <button className="button button-blue" onClick={() => saveFile(result)}><ArrowDownToLine size={18} /><span>Download license again</span></button>
    </>}
    {state === 'error' && <>
      <span className="eyebrow">SOMETHING WENT WRONG</span>
      <h2 id="license-title">We couldn’t confirm that payment.</h2>
      <p>If you were charged, don’t worry — reply to your PayPal receipt or contact us and we’ll send your license file right away.</p>
    </>}
  </dialog>;
}
