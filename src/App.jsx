import React, { useEffect, useRef, useState } from 'react';
import ParticleNetwork from './ParticleNetwork.jsx';
import DownloadChooser from './DownloadChooser.jsx';
import LicenseClaim from './LicenseClaim.jsx';
import PricingDialog from './PricingDialog.jsx';
import { ArrowUpRight, ArrowRight, Download, Plus, Minus, X, Menu, Zap, Layers, FolderDown, Command, Check, Cpu, BadgeCheck } from 'lucide-react';
import elfIcon from './assets/elf_icon.png';
import elfPro from './assets/elf_pro.png';
import elfPower from './assets/elf9.png';
import elfScanner from './assets/elf7.png';
import elfParallel from './assets/elf6.png';
import elfManagement from './assets/elf8.png';
import elfMac from './assets/elf10.png';
import mankindLogo from './assets/Mankind_Logo.png';
import './footer.css';
import { DOWNLOAD_URL, SUPPORT_EMAIL, FULL_VERSION_URL } from './config.js';

const asset = name => `/assets/${name}.webp`;
const heroElves = [
  [elfPro, 'Atom IDM Pro License for $25', 'Atom IDM Pro License', 'Just $25 · yours forever'],
  [elfPower, 'A lil power with AtomPowerCore', 'A lil power with', 'AtomPowerCore'],
  [elfScanner, 'Secure links with Link Scanner', 'Secure links with', 'Link Scanner'],
  [elfParallel, 'Fast Parallel downloads', 'Fast', 'Parallel downloads'],
  [elfManagement, 'Best File Management', 'Best', 'File Management'],
  [elfMac, 'Loved and works on all Macs', 'Loved and works on', 'All Macs'],
];
const heroTaglines = [
  'Pay once. Keep it forever.',
  'Big files. Meet little power.',
  'Scan first. Download confidently.',
  'More lanes. Less waiting.',
  'Every file. Right where it belongs.',
  'Your Mac. Meet your perfect sidekick.',
];
function AppleIcon() {
  return <svg className="apple-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.05 12.54c.03 3.26 2.86 4.35 2.89 4.37-.02.08-.45 1.55-1.49 3.07-.9 1.31-1.83 2.62-3.3 2.65-1.44.03-1.91-.86-3.56-.86-1.65 0-2.17.83-3.53.89-1.42.05-2.5-1.42-3.4-2.73-1.84-2.68-3.25-7.58-1.36-10.88.94-1.64 2.62-2.68 4.45-2.7 1.39-.03 2.7.94 3.55.94.85 0 2.44-1.16 4.11-.99.7.03 2.68.28 3.95 2.14-.1.06-2.36 1.38-2.31 4.1ZM14.35 4.51c.75-.91 1.25-2.17 1.11-3.43-1.08.04-2.39.72-3.16 1.63-.7.81-1.31 2.1-1.15 3.34 1.2.09 2.43-.61 3.2-1.54Z" /></svg>;
}
function HeroElves() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let interval;
    const sync = () => {
      clearInterval(interval);
      if (!paused && !preference.matches && !document.hidden) {
        interval = setInterval(() => setActive(index => (index + 1) % heroElves.length), 4000);
      }
    };
    sync();
    preference.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      clearInterval(interval);
      preference.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [paused]);
  return <>
    <div className={`floating-label label-power ${active === 0 ? 'label-up' : ''}`}><span className="label-icon">{active === 0 ? <BadgeCheck size={21} /> : active === 3 ? <Layers size={21} /> : active === 4 ? <FolderDown size={21} /> : active === 5 ? <Command size={21} /> : active === 2 ? <Check size={21} /> : <Zap size={21} fill="currentColor" />}</span><div><small>{heroElves[active][2]}</small><strong>{heroElves[active][3]}</strong></div></div>
    <div className="elf-slides" role="img" aria-label={`Atom elf: ${heroElves[active][1]}`}>
      {heroElves.map(([name], index) => <img key={name} className={`main-elf elf-slide ${index === active ? 'is-active' : ''}`} src={name} alt="" aria-hidden="true" fetchPriority={index === 0 ? 'high' : 'auto'} />)}
    </div>
    <div className="hero-sparkles" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <span key={index} style={{ '--i': index, left: `${14 + (index * 23) % 77}%`, top: `${10 + (index * 31) % 76}%` }}>✦</span>)}</div>
    <div className="floating-label label-ready"><span className="ready-check"><Check size={17} /></span><span>{heroTaglines[active]}</span></div>
      <div className="elf-controls"><div className="elf-dots" aria-label="Choose an elf">{heroElves.map(([, label], index) => <button key={label} onClick={() => setActive(index)} aria-label={`Show ${label}`} aria-pressed={active === index} />)}</div><button className="elf-pause" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume elf rotation' : 'Pause elf rotation'}>{paused ? 'Play' : 'Pause'}</button><span>{String(active + 1).padStart(2, '0')} / {heroElves[active][1]}</span></div>
  </>;
}
const questions = [
  ["Is Atom IDM the IDM for Mac?", "Yes. Atom IDM (Atom Downloader) is an Internet Download Manager built for macOS. It splits files into parts and downloads them in parallel, resumes after Wi-Fi drops, and checks every file before you open it."],
  ["Does Atom IDM run on Apple Silicon and Intel Macs?", "Yes. There is a native Apple Silicon build and a Universal build for Intel Macs. Both are signed and notarized by Apple."],
  ["Does Atom IDM resume broken downloads?", "Yes. If your connection drops, Atom IDM waits for the network to come back and carries on from where it stopped, without starting over."],
  ["Is Atom IDM free?", "There is a free version that downloads one file at a time. Pro ($25) and Ultra ($39.99) are one-time purchases — no subscription."],
  ["What is the difference between Pro and Ultra?", "Pro unlocks many downloads at once plus Hugging Face and GitHub repositories. Ultra adds brew, npm and pip installs. Both are pay once, keep forever."],
  ["Is Atom IDM safe?", "Every download gets a security check before it is marked ready, and the app is signed and notarized by Apple."],
];

export default function App() {
  useEffect(() => {
    const id = { '/download/': 'download', '/features/': 'features', '/pricing/': 'pricing', '/about/': 'about' }[window.location.pathname.replace(/\/?$/, '/')];
    if (id === 'pricing') requestAnimationFrame(() => pricingRef.current?.showModal());
    else if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, []);
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState(0);
  const notice = useRef(null);
  const download = () => notice.current.showModal();
  const pricingRef = useRef(null);
  const pricing = event => { event?.preventDefault(); setMenu(false); pricingRef.current.showModal(); };
  const downloadButton = (className = '') => <button className={`button button-blue ${className}`} onClick={download}><AppleIcon /><span>Download Free for Mac</span><ArrowUpRight className="download-arrow" size={18} /></button>;
  const fullVersionLink = (className = '') => <a className={`button button-full ${className}`} href="#pricing" onClick={pricing}><span>Explore Atom Pro</span><ArrowUpRight className="download-arrow" size={18} /></a>;
  return <>
    <ParticleNetwork />
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="header">
      <div className="nav container">
        <a className="brand" href="#top" aria-label="Atom Downloader home"><img src={elfIcon} alt="" /><span>atom<span className="brand-dot">.</span><small>DOWNLOADER</small></span></a>
        <nav id="navigation" aria-label="Main navigation" className={menu ? 'navigation open' : 'navigation'}>
          <a href="#download" onClick={() => setMenu(false)}>Download Atom IDM</a><a href="#features" onClick={() => setMenu(false)}>Features</a><a href="#pricing" onClick={pricing}>Pricing</a><a href="#about" onClick={() => setMenu(false)}>About Atom IDM</a>
        </nav>
        <button className="nav-cta" onClick={download}>Get Atom <ArrowUpRight size={16} /></button>
        <button className="menu-toggle" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
      </div>
    </header>
    <main id="main">
      <section className="hero container" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> ATOM DOWNLOADER · THE MOST TRUSTED IDM FOR MAC</div>
          <h1>Faster downloads.<br />Less <span className="blue-word">waiting<svg viewBox="0 0 560 24" aria-hidden="true"><path d="M5 17 Q250 -4 550 12" /></svg></span>.</h1>
          <p>Meet Atom IDM, the powerful download manager that makes downloading and managing files on your Mac faster, simpler, secure and a whole lot more enjoyable.</p>
          <div className="hero-actions">{downloadButton()}{fullVersionLink()}</div>
          <div className="hero-note"><Command size={14} /> Built for macOS <span /> By Mankind</div>
        </div>
        <div className="hero-art" aria-label="Atom’s blue elf mascot">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" /><span className="orbit-spark spark-one">✳</span><span className="orbit-spark spark-two">+</span>
          <span className="art-caption">YOUR NEW DOWNLOAD SUPERPOWER</span>
          <div className="elf-aura" />
          <HeroElves />
          
        </div>
      </section>
      <div className="principles container"><span>NOT JUST ANOTHER<br /><b>DOWNLOAD MANAGER.</b></span><div><Zap /> Parallel by nature</div><div><Command /> Mac at heart</div><div><FolderDown /> Less download chaos</div><div className="principle-last">A little more <i>Atom.</i></div></div>

      <span id="features" className="scroll-anchor" /><section className="experience container section" id="experience">
        <div className="section-heading"><div><span className="eyebrow">01 / THE EVERYDAY UPGRADE</span><h2>Your downloads.<br />Minus the drama.</h2></div><p>Big ideas. Heavy files. A busy day.<br />Atom helps you get back to what matters,<br />with a download experience that just feels right.</p></div>
        <div className="bento-grid">
          <article className="feature feature-speed"><div className="feature-copy"><span className="feature-number">01 — PICK UP THE PACE</span><h3>Big files.<br />Small interruption.</h3><p>Parallel connections put more of your connection to work. Less staring at a progress bar. More moving forward.</p></div><img src={asset('elf-fast')} alt="Atom elf bringing energy to your downloads" loading="lazy" /><div className="speed-lines" aria-hidden="true"><span /><span /><span /></div><span className="card-tag"><Zap size={14} /> Powered by AtomPowercore</span></article>
          <article className="feature feature-organize"><span className="feature-number">02 — FIND YOUR FLOW</span><h3>A little order.<br />A lot of calm.</h3><p>Your downloads deserve better than getting lost in the shuffle.</p><div className="file-stack" aria-label="Illustrative file organization"><div><span className="file-icon"><Layers size={20} /></span><div><b>Brand assets.zip</b><small>Creative work, collected.</small></div><Check size={16} /></div><div><span className="file-icon mint"><FolderDown size={20} /></span><div><b>The next big idea.pdf</b><small>Right where you need it.</small></div><Check size={16} /></div></div><img src={asset('elf-files')} alt="Atom file-handling elf" loading="lazy" /></article>
          <article className="feature feature-mac"><div><span className="feature-number">03 — RIGHT AT HOME</span><h3>Mac energy.<br />Through and through.</h3><p>Not an afterthought. A download experience designed around the computer you love.</p><span className="mac-key"><Command size={24} /></span></div><img src={asset('elf-blue')} alt="Blue Atom elf" loading="lazy" /></article>
        </div>
      </section>

      <span id="about" className="scroll-anchor" /><section className="engine" id="powercore"><div className="container engine-inner"><div className="engine-copy"><span className="eyebrow">02 / SMALL ELF. SERIOUS ENGINE.</span><h2>Looks like magic.<br />Runs on <em>Powercore.</em></h2><p>Behind the personality is a multi-part download engine. AtomPowercore breaks files into segments and brings them down in parallel. One file. More ways to get it moving.</p><div className="engine-chips"><span><Layers size={16} /> Multi-part transfers</span><span><Cpu size={16} /> One focused engine</span></div><small>Real-world speeds vary by connection and source server.</small></div><div className="engine-visual"><div className="engine-grid" /><div className="engine-node"><Zap size={42} fill="currentColor" /><b>AtomPowercore</b><small>PARALLEL BY DESIGN</small></div><div className="segment segment-one"><span /><span /><span /><span /></div><div className="segment segment-two"><span /><span /><span /><span /></div><div className="segment segment-three"><span /><span /><span /><span /></div><span className="engine-label">MULTIPLE SEGMENTS. ONE DESTINATION.</span><img src={asset('elf-powercore')} alt="AtomPowercore elf" loading="lazy" /></div></div></section>

      <section className="faq-section container section" id="questions"><div><span className="eyebrow">03 / THE LITTLE DETAILS</span><h2>Good questions.<br />Straight answers.</h2><p>No mystery. Just a little magic.</p><span className="faq-star" aria-hidden="true">✳</span></div><div className="faq-list">{questions.map(([question, answer], index) => <article className={`faq-item ${faq === index ? 'active' : ''}`} key={question}><h3><button aria-expanded={faq === index} aria-controls={`answer-${index}`} onClick={() => setFaq(faq === index ? -1 : index)}>{question}{faq === index ? <Minus size={18} /> : <Plus size={18} />}</button></h3><div id={`answer-${index}`} hidden={faq !== index}><p>{answer}</p></div></article>)}</div></section>
      <section className="final-cta container" id="download"><div className="cta-circle" /><div className="cta-copy"><span className="eyebrow">YOUR MAC’S NEXT GOOD THING.</span><h2>Go on.<br />Give your downloads<br />a little <span>superpower.</span></h2><div className="cta-actions">{downloadButton('button-white')}{fullVersionLink('button-full-light')}</div><p>Atom Downloader. By Mankind. For your Mac.</p></div><img src={asset('elf-secure')} alt="Your Atom elf is ready" loading="lazy" /><span className="cta-star" aria-hidden="true">✳</span></section>
    </main>
    <footer className="footer container"><div className="footer-top"><a className="brand" href="#top"><img src={elfIcon} alt="" /><span>atom<span className="brand-dot">.</span><small>DOWNLOADER</small></span></a><p>Atom IDM — Atom Downloader is the Secure Internet Download Manager for Mac.</p><nav className="footer-links" aria-label="Site"><a href="#download">Download Atom IDM</a><a href="#features">Features</a><a href="#pricing" onClick={pricing}>Pricing</a><a href="#about">About Atom IDM</a></nav><a className="back-top" href="#top">Back to top <ArrowUpRight size={16} /></a></div><div className="footer-bottom footer-signature"><p className="footer-credit">Made with ❤️ by Mankind Research Corporation © 2014 - 2024</p><img className="mankind-logo" src={mankindLogo} alt="Mankind" loading="lazy" /></div></footer>
    <DownloadChooser ref={notice} />
    <PricingDialog ref={pricingRef} onFree={download} />
    <LicenseClaim />
  </>;
}
