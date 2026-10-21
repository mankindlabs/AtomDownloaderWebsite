import React, { forwardRef, useState } from 'react';
import { X } from 'lucide-react';
import elfIcon from './assets/elf_icon.png';
import siliconArtwork from './assets/Apple_Silicon.7987975f.png';
import intelArtwork from './assets/Intel.ba0f8ebb.png';
import { DOWNLOAD_INTEL_URL, DOWNLOAD_SILICON_URL } from './config.js';
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

const DownloadChooser = forwardRef(function DownloadChooser(_, ref) {
  const [message, setMessage] = useState('');
  const choose = (label, url) => {
    if (/^https?:\/\//i.test(url)) {
      setMessage(`Starting your ${label} download…`);
      window.location.assign(url);
    } else {
      setMessage(`The ${label} installer isn’t connected yet. Please check back soon.`);
    }
  };
  return <dialog ref={ref} className="download-dialog architecture-dialog" aria-labelledby="download-title" aria-describedby="download-description" onClose={() => setMessage('')} onClick={event => { if (event.target === event.currentTarget) ref.current.close(); }}>
    <div className="download-confetti" aria-hidden="true">{pieces.map((style, index) => <i key={index} style={style} />)}</div>
    <button className="dialog-close" aria-label="Close download chooser" autoFocus onClick={() => ref.current.close()}><X size={22} /></button>
    <img src={elfIcon} alt="" />
    <span className="eyebrow">A LITTLE CELEBRATION. A BIG UPGRADE.</span>
    <h2 id="download-title">Your Mac.<br /><span>Your kind of Atom.</span></h2>
    <p id="download-description">Pick your Mac’s chip. We’ll take it from here.</p>
    <div className="architecture-options">
      <button onClick={() => choose('Mac Intel', DOWNLOAD_INTEL_URL)}><img className="architecture-artwork" src={intelArtwork} alt="" /><span><strong>Download for Mac Intel</strong><small>For Macs with an Intel processor</small></span></button>
      <button onClick={() => choose('Mac Apple Silicon', DOWNLOAD_SILICON_URL)}><img className="architecture-artwork" src={siliconArtwork} alt="" /><span><strong>Download for Apple M-Chips</strong><small>For Macs with Apple Silicon Chips</small></span></button>
    </div>
    <p className="chip-help">Not sure? Open the Apple menu → <strong>About This Mac</strong> and look for Chip or Processor.</p>
    <div className="installer-status" role="status" aria-live="polite">{message}</div>
  </dialog>;
});

export default DownloadChooser;
