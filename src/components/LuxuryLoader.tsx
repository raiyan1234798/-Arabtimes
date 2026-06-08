'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LuxuryLoader() {
  const [phase, setPhase] = useState<'loading' | 'done'>('loading');

  useEffect(() => {
    const t = setTimeout(() => setPhase('done'), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#0F0F0E' }}
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Background radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(180,145,60,0.08) 0%, transparent 70%)' }}
          />

          {/* Logo */}
          <motion.div
            className="relative w-24 h-24 mb-8"
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Image src="/images/logo.png" alt="Arab Times" fill className="object-contain" priority />
          </motion.div>

          {/* Brand */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div
              className="text-2xl tracking-[0.5em] uppercase mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#FAFAF7', fontWeight: 300, letterSpacing: '0.55em' }}
            >
              ARAB TIMES
            </div>
            <div className="label-caps" style={{ color: 'rgba(180,145,60,0.8)', letterSpacing: '0.3em' }}>
              Est. 2015 · Colachel
            </div>
          </motion.div>

          {/* Gold loader line */}
          <motion.div
            className="relative overflow-hidden"
            style={{ width: 140, height: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="absolute inset-0" style={{ background: 'rgba(180,145,60,0.15)' }} />
            <motion.div
              className="absolute inset-y-0 left-0"
              style={{ background: 'linear-gradient(90deg, #7A5E1A, #D4AF60, #7A5E1A)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.6, duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="label-caps mt-8"
            style={{ color: 'rgba(255,255,255,0.2)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            Every Second Defines Your Style
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
