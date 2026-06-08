'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Tag, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { type Watch } from '@/data/collections';
import { siteConfig } from '@/data/siteConfig';

interface Props {
  products: Watch[];
}

export default function ProductShowcase({ products }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [active, setActive] = useState(0);
  if (!products || products.length === 0) return null;
  const watch = products[active];

  const prev = () => setActive((p) => (p - 1 + products.length) % products.length);
  const next = () => setActive((p) => (p + 1) % products.length);

  return (
    <section
      ref={ref}
      className="section-xl relative overflow-hidden grain"
      style={{ background: 'var(--bg-dark)' }}
    >
      {/* Gold glow orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(180,145,60,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              className="flex items-center gap-4 mb-5"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            >
              <div className="h-px w-8" style={{ background: 'var(--gold-500)' }} />
              <span className="label-caps" style={{ color: 'var(--gold-500)', fontSize: '0.65rem' }}>All Products</span>
            </motion.div>
            <motion.h2
              className="display-title text-white"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.7 }}
            >
              Browse <span className="gold-shimmer">Every</span> Piece
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
            <Link href="/collections" className="btn-dark flex items-center gap-2">
              View All <ChevronRight size={13} />
            </Link>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Watch viewer */}
          <motion.div
            className="relative rounded-none overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #1E1D1A, #151412)',
              border: '1px solid rgba(180,145,60,0.12)',
              minHeight: 440,
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {/* Badges */}
            <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
              {watch.badge && <span className="badge-new">{watch.badge}</span>}
              <span className="badge-off">{watch.discount}</span>
            </div>

            {/* Watch display */}
            <div className="flex items-center justify-center h-full p-10" style={{ minHeight: 380 }}>
              <motion.div
                key={active}
                className="relative"
                style={{
                  width: 'min(300px, 80%)',
                  height: 'min(300px, 80%)',
                  filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.5))',
                }}
                initial={{ opacity: 0, scale: 0.88, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Image src={watch.image} alt={watch.name} fill className="object-contain" />
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-3">
              <button
                onClick={prev}
                className="w-9 h-9 flex items-center justify-center rounded-full transition-all"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(180,145,60,0.2)', color: 'var(--gold-400)' }}
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>
              {products.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    width: i === active ? 22 : 7, height: 7,
                    background: i === active ? 'var(--gold-400)' : 'rgba(255,255,255,0.18)',
                    border: 'none', borderRadius: 99,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  aria-label={`Watch ${i + 1}`}
                />
              ))}
              <button
                onClick={next}
                className="w-9 h-9 flex items-center justify-center rounded-full transition-all"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(180,145,60,0.2)', color: 'var(--gold-400)' }}
                aria-label="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="label-caps mb-4" style={{ color: 'var(--gold-500)', fontSize: '0.62rem' }}>
              {watch.brand} · {watch.category}
            </div>
            <motion.h3
              key={`h-${watch.id}`}
              className="display-title text-white mb-5 leading-tight"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {watch.name}
            </motion.h3>
            <p className="text-sm mb-7 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>
              {watch.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-8">
              {watch.features.map((f) => (
                <span
                  key={f}
                  className="text-[10px] px-3 py-1.5 font-medium"
                  style={{
                    background: 'rgba(180,145,60,0.08)',
                    border: '1px solid rgba(180,145,60,0.22)',
                    color: 'var(--gold-300)',
                    borderRadius: 2,
                  }}
                >
                  {f}
                </span>
              ))}
            </div>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-7">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="var(--gold-400)" style={{ color: 'var(--gold-400)' }} />
              ))}
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', marginLeft: 4 }}>
                Verified purchases
              </span>
            </div>

            {/* Price block */}
            <div
              className="rounded-none p-5 mb-6"
              style={{
                background: 'rgba(180,145,60,0.06)',
                border: '1px solid rgba(180,145,60,0.16)',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
                    {watch.price}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="price-original" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      MRP {watch.mrp}
                    </span>
                    <span className="badge-off" style={{ fontSize: '0.58rem' }}>{watch.discount}</span>
                  </div>
                </div>
                <a
                  href={watch.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                  id={`showcase-buy-${watch.id}`}
                >
                  Buy Now <ExternalLink size={13} />
                </a>
              </div>
            </div>

            <p className="text-xs flex items-center gap-4" style={{ color: 'rgba(255,255,255,0.25)' }}>
              <span><span style={{ color: '#4ADE80' }}>✓</span> Free shipping</span>
              <span><span style={{ color: '#4ADE80' }}>✓</span> 100% authentic</span>
              <span><span style={{ color: '#4ADE80' }}>✓</span> Secure checkout</span>
            </p>
          </motion.div>
        </div>

        {/* Thumbnail strip */}
        <motion.div
          className="grid grid-cols-3 md:grid-cols-6 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {products.map((w, i) => (
            <button
              key={w.id}
              onClick={() => setActive(i)}
              className="relative overflow-hidden transition-all duration-300"
              style={{
                aspectRatio: '1',
                background: i === active ? 'rgba(180,145,60,0.12)' : 'rgba(255,255,255,0.03)',
                border: `1.5px solid ${i === active ? 'rgba(180,145,60,0.5)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 2,
                padding: 8,
              }}
              aria-label={`Select ${w.name}`}
            >
              <div className="relative w-full h-full" style={{ minHeight: 60 }}>
                <Image src={w.image} alt={w.name} fill className="object-contain" />
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
