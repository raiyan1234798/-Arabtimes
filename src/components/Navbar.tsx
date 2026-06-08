'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink, Phone } from 'lucide-react';
import Image from 'next/image';
import { siteConfig } from '@/data/siteConfig';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      {/* ── Main Nav ── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[900]"
        style={{
          background: scrolled ? 'rgba(250,250,247,0.92)' : 'rgba(250,250,247,0.70)',
          backdropFilter: 'blur(28px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(28px) saturate(1.5)',
          borderBottom: scrolled ? '1px solid rgba(180,145,60,0.12)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.06)' : 'none',
          transition: 'all 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2.7, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="container-xl flex items-center justify-between h-[72px]">

          <Link href="/" className="flex items-center gap-3 flex-shrink-0" id="nav-logo">
            {/* Logo shown on a dark pill so the black logo is always visible */}
            <div
              className="relative flex-shrink-0"
              style={{
                width: 52,
                height: 52,
                background: '#0F0F0E',
                borderRadius: 4,
                overflow: 'hidden',
                border: '1.5px solid rgba(180,145,60,0.25)',
              }}
            >
              <Image src="/images/logo.png" alt="Arab Times" fill className="object-contain p-[3px]" priority />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span
                className="tracking-[0.32em] text-[13px] font-semibold"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#0F0F0E', letterSpacing: '0.34em' }}
              >
                ARAB TIMES
              </span>
              <span className="label-caps" style={{ color: 'var(--gold-500)', fontSize: '0.56rem', letterSpacing: '0.22em' }}>
                Quality Timepieces
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline label-caps"
                style={{
                  color: pathname === link.href ? 'var(--gold-600)' : 'var(--text-secondary)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.18em',
                  fontWeight: pathname === link.href ? 700 : 500,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-1.5 text-[11px] font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Phone size={12} style={{ color: 'var(--gold-500)' }} />
              {siteConfig.phoneDisplay}
            </a>
            <div className="w-px h-4" style={{ background: 'rgba(0,0,0,0.1)' }} />
            <a
              href={siteConfig.officialStore}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: '10px 22px', fontSize: '0.66rem' }}
            >
              Shop Now <ExternalLink size={11} />
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg"
            style={{ background: open ? 'var(--gold-100)' : 'transparent', border: '1px solid rgba(0,0,0,0.08)', color: open ? 'var(--gold-700)' : '#0F0F0E' }}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            className="fixed inset-0 z-[850] flex flex-col"
            style={{ background: 'rgba(250,250,247,0.97)', backdropFilter: 'blur(32px)' }}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.35 }}
          >
            {/* Close button area */}
            <div className="h-[72px]" />

            <div className="flex flex-col items-center justify-center flex-1 gap-12 pb-20">
              {/* Logo */}
              <motion.div
                className="relative w-16 h-16"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 }}
              >
                <div
                  className="relative"
                  style={{ width: 80, height: 80, background: '#0F0F0E', borderRadius: 4, border: '1.5px solid rgba(180,145,60,0.25)', overflow: 'hidden' }}
                >
                  <Image src="/images/logo.png" alt="Arab Times" fill className="object-contain p-2" />
                </div>
              </motion.div>

              {/* Nav Links */}
              <div className="flex flex-col items-center gap-8">
                {siteConfig.navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      className="display-title block text-center"
                      style={{
                        fontSize: '2.2rem',
                        color: pathname === link.href ? 'var(--gold-600)' : '#0F0F0E',
                        fontFamily: "'Cormorant Garamond', serif",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href={siteConfig.officialStore}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                Visit Official Store <ExternalLink size={13} />
              </motion.a>

              <motion.a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 label-caps"
                style={{ color: 'var(--text-tertiary)', fontSize: '0.65rem' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Phone size={12} style={{ color: 'var(--gold-500)' }} />
                {siteConfig.phoneDisplay}
              </motion.a>
            </div>

            {/* Bottom tagline */}
            <div className="pb-8 text-center">
              <p className="label-caps" style={{ color: 'var(--text-tertiary)', fontSize: '0.6rem' }}>
                Every Second Defines Your Style
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
