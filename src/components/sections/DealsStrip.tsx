'use client';
import { Truck, Zap, ShieldCheck, RefreshCcw, Award } from 'lucide-react';

const items = [
  { icon: <Zap size={13} />,         text: 'Best Deal Prices Every Day' },
  { icon: <Truck size={13} />,       text: 'Free Shipping · Pan India' },
  { icon: <ShieldCheck size={13} />, text: '100% Authentic Guaranteed' },
  { icon: <Award size={13} />,       text: 'Citizen · Casio · Forest · Seiko' },
  { icon: <RefreshCcw size={13} />,  text: 'Easy Returns & Support' },
  { icon: <Zap size={13} />,         text: 'Est. 2015 · Colachel · Tamil Nadu' },
];

export default function DealsStrip() {
  return (
    <div
      className="overflow-hidden py-[11px] relative"
      style={{ background: 'var(--bg-dark)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(180,145,60,0.05) 50%, transparent 100%)' }}
      />
      <div className="marquee-track">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2.5 mx-10"
            style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}
          >
            <span style={{ color: 'var(--gold-400)' }}>{item.icon}</span>
            {item.text}
            <span style={{ color: 'rgba(180,145,60,0.3)', margin: '0 8px' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
