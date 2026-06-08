'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Award, Shield, Gem, Globe, Zap, HeartHandshake } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

const iconMap: Record<string, React.ReactNode> = {
  Award:         <Award size={22} />,
  Shield:        <Shield size={22} />,
  Gem:           <Gem size={22} />,
  Globe:         <Globe size={22} />,
  Zap:           <Zap size={22} />,
  HeartHandshake:<HeartHandshake size={22} />,
};

function StatDisplay({ target, suffix, label }: { target: string; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const num = parseInt(target.replace(/\D/g, ''));
  const isStatic = label === 'Est. Year';

  useEffect(() => {
    if (!inView || isStatic) return;
    let start = 0;
    const step = Math.ceil(num / (1600 / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, num);
      setCount(start);
      if (start >= num) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, num, isStatic]);

  return <span ref={ref}>{isStatic ? target : count}{suffix}</span>;
}

export default function WhyArabTimes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-xl relative" style={{ background: 'var(--bg-card)' }}>
      <div className="divider-gold" />

      <div className="container-xl pt-16">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {siteConfig.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center py-10 px-4"
              style={{
                background: 'linear-gradient(145deg, #FDFCF8, #F5F0E6)',
                border: '1px solid rgba(180,145,60,0.1)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(180,145,60,0.1)' }}
            >
              <div
                className="mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '3rem',
                  fontWeight: 700,
                  lineHeight: 1,
                  color: 'var(--gold-600)',
                  letterSpacing: '-0.02em',
                }}
              >
                <StatDisplay target={stat.number} suffix={stat.suffix} label={stat.label} />
              </div>
              <div className="label-caps" style={{ color: 'var(--text-tertiary)', fontSize: '0.62rem' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            className="section-eyebrow justify-center mb-5"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          >
            <span>Why Arab Times</span>
          </motion.div>
          <motion.h2
            className="display-title"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            The <span className="gold-shimmer">Arab Times</span> Promise
          </motion.h2>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: 'var(--border-light)' }}>
          {siteConfig.whyUs.map((item, i) => (
            <motion.div
              key={item.title}
              className="group relative overflow-hidden p-8"
              style={{ background: 'var(--bg-card)', transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
              whileHover={{ background: '#FDFCF8' } as never}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 flex items-center justify-center mb-5 transition-all duration-400 group-hover:scale-110"
                style={{
                  background: 'var(--gold-100)',
                  border: '1px solid rgba(180,145,60,0.2)',
                  color: 'var(--gold-600)',
                  borderRadius: 2,
                }}
              >
                {iconMap[item.icon]}
              </div>
              <h3 className="font-serif font-bold mb-2 text-base" style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>
                {item.description}
              </p>

              {/* Bottom gold bar on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left"
                style={{ background: 'linear-gradient(90deg, var(--gold-700), var(--gold-400))', transition: 'transform 0.45s ease' }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="divider-gold mt-16" />
    </section>
  );
}
