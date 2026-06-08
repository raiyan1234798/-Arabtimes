'use client';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/data/siteConfig';
import { Instagram, Facebook, Phone, MessageCircle, ExternalLink, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-dark)', color: 'var(--text-invert)' }}>

      {/* ── Gold CTA Strip ── */}
      <div
        className="relative overflow-hidden py-14 px-6"
        style={{ background: 'linear-gradient(135deg, var(--gold-700) 0%, var(--gold-500) 50%, var(--gold-300) 100%)' }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="container-lg flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <h3
              className="text-white mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 600 }}
            >
              Ready to Find Your Perfect Watch?
            </h3>
            <p className="text-white/70 text-sm">Genuine Brands · Best Prices · Free Shipping Pan India</p>
          </div>
          <a
            href={siteConfig.officialStore}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-[11px] font-bold tracking-widest uppercase px-8 py-4 transition-all hover:bg-gray-50"
            style={{ color: 'var(--gold-700)', letterSpacing: '0.14em', borderRadius: 1 }}
          >
            Shop Now <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="container-lg py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Brand — 5 cols */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-6" id="footer-logo">
              <div
                className="relative flex-shrink-0"
                style={{
                  width: 52,
                  height: 52,
                  background: '#0F0F0E',
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: '1.5px solid rgba(180,145,60,0.3)',
                }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Arab Times"
                  fill
                  className="object-contain p-[3px]"
                />
              </div>
              <div>
                <div
                  className="tracking-[0.36em] text-[13px] text-white"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
                >
                  ARAB TIMES
                </div>
                <div className="label-caps" style={{ color: 'rgba(180,145,60,0.7)', fontSize: '0.56rem' }}>
                  Est. 2015 · Premium Timepieces
                </div>
              </div>
            </Link>

            <p
              className="text-sm leading-relaxed mb-8 max-w-sm"
              style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}
            >
              Born in Colachel, Tamil Nadu in 2015. We bring you quality Citizen, Casio, Forest,
              Seiko &amp; stylish watches at prices that make sense — because every second defines your style.
            </p>

            {/* Social row */}
            <div className="flex gap-2">
              {[
                { href: siteConfig.instagram, icon: <Instagram size={15} />, label: 'Instagram' },
                { href: siteConfig.facebook,  icon: <Facebook  size={15} />, label: 'Facebook'  },
                { href: siteConfig.whatsapp,  icon: <MessageCircle size={15} />, label: 'WhatsApp' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center transition-all group"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.55)',
                    borderRadius: 2,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(180,145,60,0.18)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(180,145,60,0.4)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--gold-300)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation — 2 cols */}
          <div className="md:col-span-3">
            <h5 className="label-caps mb-6" style={{ color: 'var(--gold-500)', fontSize: '0.65rem' }}>Navigate</h5>
            <ul className="space-y-3.5">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.officialStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm flex items-center gap-1.5 transition-colors"
                  style={{ color: 'var(--gold-400)', fontWeight: 400 }}
                >
                  Official Store <ExternalLink size={11} />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact — 4 cols */}
          <div className="md:col-span-4">
            <h5 className="label-caps mb-6" style={{ color: 'var(--gold-500)', fontSize: '0.65rem' }}>Contact</h5>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start gap-3">
                  <MapPin size={13} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--gold-500)' }} />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 300, lineHeight: 1.6 }}>
                    {siteConfig.addressFull}
                  </span>
                </div>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-3 text-sm transition-colors"
                  style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--gold-300)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
                >
                  <Phone size={13} style={{ color: 'var(--gold-500)', flexShrink: 0 }} />
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-colors"
                  style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#4ADE80')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
                >
                  <MessageCircle size={13} style={{ color: '#25D366', flexShrink: 0 }} />
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-3 mt-16 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>
            © {new Date().getFullYear()} Arab Times. All rights reserved. Est. 2015, Colachel, Tamil Nadu.
          </p>
          <p
            className="text-xs tracking-[0.18em]"
            style={{ color: 'rgba(180,145,60,0.4)', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}
          >
            Every Second Defines Your Style
          </p>
        </div>
      </div>
    </footer>
  );
}
