'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

const igImages = [
  { src: '/images/ig1.png',            alt: 'Arab Times lifestyle' },
  { src: '/images/p_citizen_blue.png', alt: 'Citizen Blue Multifunction' },
  { src: '/images/ig2.png',            alt: 'Watch detail' },
  { src: '/images/p_casio_edifice.png',alt: 'Casio Edifice collection' },
  { src: '/images/ig3.png',            alt: 'Luxury flat lay' },
  { src: '/images/p_casio_gshock.png', alt: 'G-Shock sports' },
];

export default function InstagramShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="section-xl"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="container-xl">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            className="section-eyebrow justify-center mb-5"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          >
            <span>Instagram · @arab_times</span>
          </motion.div>
          <motion.h2
            className="display-title mb-4"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.7 }}
          >
            Follow Our <span className="gold-shimmer">Journey</span>
          </motion.h2>
          <motion.p
            className="text-sm max-w-md mx-auto"
            style={{ color: 'var(--text-tertiary)', fontWeight: 300 }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          >
            @arab_times — New arrivals, styling inspiration &amp; exclusive deals daily.
          </motion.p>
        </div>

        {/* Grid — magazine-style varying sizes */}
        <div
          className="grid grid-cols-3 gap-2"
          style={{ gridTemplateRows: 'auto auto' }}
        >
          {igImages.map((img, i) => (
            <motion.a
              key={i}
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden group block"
              style={{
                gridColumn: i === 0 ? 'span 1' : 'span 1',
                gridRow: i === 0 || i === 3 ? 'span 2' : 'span 1',
                aspectRatio: (i === 0 || i === 3) ? '3/4' : '1/1',
                background: 'linear-gradient(145deg, #EDE8DC, #E2DBCB)',
                minHeight: 160,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.04 * i, duration: 0.45 }}
              aria-label={img.alt}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-contain p-5 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-350"
                style={{ background: 'rgba(250,250,247,0.90)', backdropFilter: 'blur(8px)' }}
              >
                <div
                  className="flex items-center gap-2 label-caps px-5 py-3"
                  style={{
                    background: 'linear-gradient(135deg, var(--gold-700), var(--gold-500))',
                    color: 'white',
                    borderRadius: 1,
                    fontSize: '0.62rem',
                  }}
                >
                  <Instagram size={11} />
                  View Post
                  <ArrowUpRight size={11} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
        >
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2"
            id="ig-follow-btn"
          >
            <Instagram size={14} />
            Follow @arab_times
          </a>
        </motion.div>
      </div>
    </section>
  );
}
