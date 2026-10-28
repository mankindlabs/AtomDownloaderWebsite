import React, { forwardRef } from 'react';
import { Check, X } from 'lucide-react';
import elfPro from './assets/elf_pro.png';
import './download-chooser.css';

const tiers = [
  { name: 'Free', price: '$0', note: 'Free forever', features: ['One download at a time', 'Auto-resume after Wi-Fi drops', 'Security check on every file'], action: 'free' },
  { name: 'Pro', price: '$25', note: 'One-time · yours forever', popular: true, features: ['Everything in Free', 'Many downloads at once', 'Hugging Face & GitHub repos'], },
  { name: 'Ultra', price: '$39.99', note: 'One-time · yours forever', features: ['Everything in Pro', 'brew · npm · pip installs', 'Every feature, unlocked'], },
];

/// The pricing popup: tiers and features, without leaving the page.
const PricingDialog = forwardRef(function PricingDialog({ onFree }, ref) {
  const close = () => ref.current.close();
  return <dialog ref={ref} className="download-dialog pricing-dialog" aria-labelledby="pricing-title" onClick={event => { if (event.target === ref.current) close(); }}>
    <button className="dialog-close" aria-label="Close pricing" autoFocus onClick={close}><X size={22} /></button>
    <img src={elfPro} alt="" />
    <span className="eyebrow">PAY ONCE. KEEP IT FOREVER.</span>
    <h2 id="pricing-title">Pick your <span>Atom.</span></h2>
    <p>No subscription. Security checks stay free on every plan.</p>
    <div className="pricing-tiers">
      {tiers.map(tier => <div key={tier.name} className={`pricing-tier ${tier.popular ? 'is-popular' : ''}`}>
        {tier.popular && <span className="pricing-badge">Most popular</span>}
        <strong>{tier.name}</strong>
        <b>{tier.price}</b>
        <small>{tier.note}</small>
        <ul>{tier.features.map(f => <li key={f}><Check size={14} />{f}</li>)}</ul>
        <button className={`button pricing-cta ${tier.popular ? 'button-blue' : ''}`} onClick={() => { close(); onFree(); }}>{tier.action === 'free' ? 'Download Free' : `Download, then get ${tier.name} in the app`}</button>
      </div>)}
    </div>
    <p className="pricing-foot">Upgrade inside Atom Downloader — card, PayPal or Apple Pay — and it unlocks on the spot.</p>
  </dialog>;
});

export default PricingDialog;
