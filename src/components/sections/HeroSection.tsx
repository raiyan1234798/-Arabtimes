'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

function LiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setTime(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tick-digit font-mono" style={{ fontVariantNumeric: 'tabular-nums' }}>
      {time}
    </span>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const watchY     = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const watchScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const textY      = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity    = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden hero-bg grain"
      style={{ minHeight: '100svh' }}
    >
      {/* Diagonal light beam */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(125deg, rgba(212,175,96,0.06) 0%, transparent 50%, rgba(180,145,60,0.04) 100%)',
        }}
      />

      {/* Fine grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(180,145,60,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(180,145,60,0.04) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Rotating decorative rings */}
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
        <div
          className="rotate-slow"
          style={{ width: 520, height: 520, borderRadius: '50%', border: '1px dashed rgba(180,145,60,0.12)', position: 'relative' }}
        >
          {/* Dot markers on ring */}
          {[0, 90, 180, 270].map((deg) => (
            <div
              key={deg}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: 'rgba(180,145,60,0.4)',
                top: '50%', left: '50%',
                transform: `rotate(${deg}deg) translateY(-260px) translate(-50%, -50%)`,
              }}
            />
          ))}
        </div>
        <div
          className="rotate-slow-reverse absolute inset-6"
          style={{ borderRadius: '50%', border: '0.5px solid rgba(180,145,60,0.07)' }}
        />
      </div>

      <div className="container-xl relative z-10 w-full py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">

          {/* ── LEFT: COPY ── */}
          <motion.div style={{ y: textY }}>
            {/* Eyebrow */}
            <motion.div
              className="section-eyebrow mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.8, duration: 0.7 }}
            >
              <span>Est. 2015 · Colachel, India · Premium Timepieces</span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              className="display-hero mb-8"
              style={{ fontSize: 'clamp(3.2rem, 7vw, 6.5rem)', color: '#0F0F0E' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.9, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span style={{ display: 'block', lineHeight: 0.9 }}>Every</span>
              <span
                className="gold-shimmer"
                style={{ display: 'block', lineHeight: 0.9, fontStyle: 'normal', fontWeight: 700 }}
              >
                Second
              </span>
              <span style={{ display: 'block', lineHeight: 0.9 }}>Defines</span>
              <span style={{ display: 'block', lineHeight: 0.9, color: '#4A4A46', fontWeight: 300, fontSize: '0.72em' }}>
                your style.
              </span>
            </motion.h1>

            <motion.p
              className="text-base mb-10 max-w-md leading-relaxed"
              style={{ color: 'var(--text-secondary)', fontWeight: 300 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.1, duration: 0.7 }}
            >
              Quality Citizen, Casio, Forest &amp; stylish watches — 
              handpicked for those who love great design without overpaying.
              <span style={{ color: 'var(--gold-600)', fontWeight: 600 }}>Best deal prices</span>, shipped free across India.
            </motion.p>

            {/* Live clock */}
            <motion.div
              className="flex items-center gap-3 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.15 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-tertiary)' }}>
                Live — <LiveClock /> IST
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.6 }}
            >
              <Link href="/collections" className="btn-primary">
                Explore Collection <ArrowRight size={14} />
              </Link>
              <a
                href={siteConfig.officialStore}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Shop Now <ExternalLink size={13} />
              </a>
            </motion.div>

            {/* Trust micro-row */}
            <motion.div
              className="flex flex-wrap items-center gap-6 mt-10 pt-10"
              style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.35 }}
            >
              {[
                { n: '2015', l: 'Founded' },
                { n: '2000+', l: 'Customers' },
                { n: '100%', l: 'Authentic' },
                { n: '6+', l: 'Collections' },
              ].map((s) => (
                <div key={s.l}>
                  <div
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--gold-600)' }}
                  >
                    {s.n}
                  </div>
                  <div className="label-caps" style={{ color: 'var(--text-tertiary)', fontSize: '0.6rem' }}>{s.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: WATCH ── */}
          <motion.div
            className="relative flex items-center justify-center"
            style={{ y: watchY, scale: watchScale, opacity }}
          >
            {/* Glow behind watch */}
            <div
              className="absolute rounded-full breathe"
              style={{ width: 380, height: 380, background: 'radial-gradient(circle, rgba(180,145,60,0.14) 0%, transparent 70%)' }}
            />

            {/* Watch image */}
            <motion.div
              className="float-watch relative z-10"
              style={{
                width: 'clamp(280px, 40vw, 480px)',
                height: 'clamp(280px, 40vw, 480px)',
                filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.22))',
              }}
              initial={{ opacity: 0, scale: 0.85, rotate: 8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 3.0, duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Image
                src="https://m.media-amazon.com/images/X/bxt1/M/xbxt1BgvdtMNzZA.png"
                alt="Arab Times — Citizen Premium Blue Multi-Function Watch"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Floating info cards */}
            <motion.div
              className="absolute left-0 lg:-left-10 bottom-12 rounded-xl px-4 py-3 flex gap-3 items-center"
              style={{
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(180,145,60,0.18)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.09)',
              }}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.5, duration: 0.6 }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style={{ background: 'var(--gold-100)' }}
              >
                ⭐
              </div>
              <div>
                <div className="text-xs font-bold" style={{ color: '#0F0F0E' }}>4.8 / 5.0</div>
                <div className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>2,000+ Reviews</div>
              </div>
            </motion.div>

            <motion.div
              className="absolute right-0 lg:-right-6 top-14 rounded-xl px-5 py-3"
              style={{
                background: '#0F0F0E',
                border: '1px solid rgba(180,145,60,0.25)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              }}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.6, duration: 0.6 }}
            >
              <div className="text-xl font-bold" style={{ color: 'var(--gold-400)', fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.1 }}>
                Best
              </div>
              <div className="text-xl font-bold" style={{ color: 'var(--gold-400)', fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.1 }}>
                Prices
              </div>
              <div className="label-caps text-white opacity-50" style={{ fontSize: '0.58rem' }}>Free Shipping</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll CTA */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8 }}
      >
        <span className="label-caps" style={{ color: 'var(--gold-500)', fontSize: '0.6rem' }}>Discover</span>
        <motion.div
          style={{ width: 1, height: 52, background: 'linear-gradient(to bottom, var(--gold-500), transparent)' }}
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
        />
      </motion.div>
    </section>
  );
}
