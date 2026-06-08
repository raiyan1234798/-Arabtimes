'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const timeline = [
  { year: '2015', title: 'Founded', desc: 'Arab Times began in Colachel, Tamil Nadu — a passion project to bring world-class timepieces to every watch enthusiast.' },
  { year: '2017', title: 'First Collection', desc: 'Launched our debut premium range featuring Citizen & Casio, establishing a reputation for authenticity and value.' },
  { year: '2020', title: 'Online Store', desc: 'Opened our SmartBiz digital store — taking Arab Times to watch lovers across all of India.' },
  { year: '2024', title: 'Digital Flagship', desc: 'Launched this premium showcase with 6+ curated collections and over 2,000 happy customers.' },
];

export default function BrandStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="section-xl relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Diagonal accent */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none"
        style={{ background: 'linear-gradient(to left, rgba(180,145,60,0.04), transparent)' }}
      />

      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Image */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Corner frame accent */}
            <div
              className="absolute -top-5 -left-5 pointer-events-none"
              style={{ width: '60%', height: '60%', border: '1px solid rgba(180,145,60,0.2)', borderRight: 'none', borderBottom: 'none' }}
            />
            <div
              className="absolute -bottom-5 -right-5 pointer-events-none"
              style={{ width: '60%', height: '60%', border: '1px solid rgba(180,145,60,0.1)', borderLeft: 'none', borderTop: 'none' }}
            />

            <div
              className="relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #EDE8DC, #E2DBCB)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.14)',
              }}
            >
              <Image
                src="/images/p_casio_edifice.png"
                alt="Arab Times — Heritage Craftsmanship"
                width={680}
                height={680}
                className="w-full h-auto object-contain"
                style={{ padding: '48px' }}
              />

              {/* Bottom caption overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 px-8 py-5"
                style={{ background: 'linear-gradient(to top, rgba(250,250,247,0.95) 0%, transparent 100%)' }}
              >
                <span className="label-caps" style={{ color: 'var(--gold-600)', fontSize: '0.6rem' }}>
                  Arab Times · Est. 2015 · Colachel, Tamil Nadu
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right — Copy */}
          <div className="order-1 lg:order-2">
            <motion.div
              className="section-eyebrow mb-6"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span>Our Story</span>
            </motion.div>

            <motion.h2
              className="display-title mb-6"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7 }}
            >
              A Decade of
              <br />
              <span className="gold-shimmer">Curated</span> Excellence
            </motion.h2>

            <motion.p
              className="text-base mb-4 leading-relaxed"
              style={{ color: 'var(--text-secondary)', fontWeight: 300 }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Founded in 2015 in the coastal town of Colachel, Arab Times started with a simple goal —
            to bring quality branded watches from Citizen, Casio, Forest and more to every watch
            enthusiast in India at prices that won't break the bank.
            </motion.p>
            <motion.p
              className="text-sm mb-12 leading-relaxed"
              style={{ color: 'var(--text-tertiary)', fontWeight: 300 }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25 }}
            >
              We're a passionate watch retailer — not a manufacturer. Every watch we sell
            is sourced and offered at the best possible price, so you always get genuine quality for what you pay.
            </motion.p>

            {/* Timeline */}
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  className="flex gap-5"
                  initial={{ opacity: 0, x: 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  {/* Year column */}
                  <div className="flex flex-col items-center flex-shrink-0" style={{ width: 44 }}>
                    <div
                      className="w-8 h-8 flex items-center justify-center text-[10px] font-bold"
                      style={{
                        background: 'var(--gold-100)',
                        border: '1.5px solid rgba(180,145,60,0.3)',
                        color: 'var(--gold-700)',
                        borderRadius: 2,
                        flexShrink: 0,
                      }}
                    >
                      {item.year.slice(2)}
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="w-px flex-1 my-1" style={{ background: 'rgba(180,145,60,0.15)', minHeight: 24 }} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-6">
                    <div className="label-caps mb-1" style={{ color: 'var(--gold-600)', fontSize: '0.6rem' }}>
                      {item.year} · {item.title}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
