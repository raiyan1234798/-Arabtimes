'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

const testimonials = [
  {
    name: 'Arjun Mehta',
    location: 'Mumbai, Maharashtra',
    text: 'The Citizen Blue Multifunction exceeded every expectation. The quality rivals watches priced 5x higher. Arab Times is genuinely world-class.',
    rating: 5,
    watch: 'Citizen Blue Multi-Function',
    initials: 'AM',
  },
  {
    name: 'Priya Venkat',
    location: 'Chennai, Tamil Nadu',
    text: 'Gifted the Casio Edifice to my husband — he was speechless. Premium packaging, authentic product, and blazing-fast delivery.',
    rating: 5,
    watch: 'Casio Edifice Blue',
    initials: 'PV',
  },
  {
    name: 'Ravi Krishnan',
    location: 'Bangalore, Karnataka',
    text: 'My G-Shock arrived in perfect condition with premium gift wrapping. Completely genuine product at a price I couldn\'t believe. Highly recommend Arab Times!',
    rating: 5,
    watch: 'Casio G-Shock Black',
    initials: 'RK',
  },
];

const trustBadges = [
  { icon: '🔒', label: 'Secure Payment',   sub: 'SSL Encrypted' },
  { icon: '✅', label: '100% Authentic',   sub: 'Guaranteed Real' },
  { icon: '🚀', label: 'Fast Delivery',    sub: 'Free Pan India' },
  { icon: '🎁', label: 'Gift Packaging',   sub: 'Premium Unboxing' },
];

export default function SocialProof() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-xl" style={{ background: 'var(--bg-card)' }}>
      <div className="container-xl">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            className="section-eyebrow justify-center mb-5"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          >
            <span>Customer Stories</span>
          </motion.div>
          <motion.h2
            className="display-title"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.7 }}
          >
            Worn With <span className="gold-shimmer">Pride</span>
          </motion.h2>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-1"
          style={{ background: 'var(--border-light)' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="group relative overflow-hidden p-8 bg-white"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.6 }}
              style={{ transition: 'background 0.35s ease' }}
              whileHover={{ background: '#FDFCF8' } as never}
            >
              {/* Large quote mark */}
              <div className="absolute top-4 right-4 opacity-[0.06]" style={{ color: 'var(--gold-500)' }}>
                <Quote size={60} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={13} fill="var(--gold-400)" style={{ color: 'var(--gold-400)' }} />
                ))}
              </div>

              <p
                className="text-sm leading-relaxed mb-6 italic"
                style={{ color: 'var(--text-secondary)', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.02rem', fontWeight: 400 }}
              >
                "{t.text}"
              </p>

              {/* Purchased tag */}
              <div
                className="inline-flex items-center gap-1.5 label-caps mb-5"
                style={{
                  background: 'var(--gold-100)',
                  color: 'var(--gold-700)',
                  border: '1px solid rgba(180,145,60,0.2)',
                  padding: '4px 10px',
                  borderRadius: 2,
                  fontSize: '0.58rem',
                }}
              >
                ✓ Purchased: {t.watch}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid var(--border-light)' }}>
                <div
                  className="w-10 h-10 flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, var(--gold-700), var(--gold-500))',
                    color: 'white',
                    borderRadius: 2,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{t.name}</div>
                  <div className="label-caps" style={{ color: 'var(--text-tertiary)', fontSize: '0.58rem' }}>{t.location}</div>
                </div>
              </div>

              {/* Bottom gold accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left"
                style={{ background: 'linear-gradient(90deg, var(--gold-700), var(--gold-400))', transition: 'transform 0.45s ease' }}
              />
            </motion.div>
          ))}
        </div>

        {/* Trust badges strip */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-px mt-1"
          style={{ background: 'var(--border-light)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-4 py-7 px-8 bg-white"
              style={{ background: 'linear-gradient(145deg, #FDFCF8, #F8F4EC)' }}
            >
              <span className="text-2xl">{badge.icon}</span>
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{badge.label}</div>
                <div className="label-caps" style={{ color: 'var(--text-tertiary)', fontSize: '0.58rem' }}>{badge.sub}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}
        >
          <p className="text-sm mb-6" style={{ color: 'var(--text-tertiary)', fontWeight: 300 }}>
            Join 2,000+ satisfied customers — genuine branded watches at the best prices, every day.
          </p>
          <a
            href={siteConfig.officialStore}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
            id="social-proof-cta"
          >
            Shop Arab Times — Official Store <ExternalLink size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
