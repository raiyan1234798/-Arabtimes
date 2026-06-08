'use client';
import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Tag, SlidersHorizontal } from 'lucide-react';
import { type Watch, categories, type WatchCategory } from '@/data/collections';
import { siteConfig } from '@/data/siteConfig';

interface Props {
  products: Watch[];
}

export default function CollectionsClient({ products }: Props) {
  const [active, setActive] = useState<WatchCategory>('All');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const filtered = active === 'All'
    ? products
    : products.filter((w) => w.category === active);

  return (
    <>
      {/* ── Cinematic Hero ── */}
      <section
        className="relative overflow-hidden flex items-end"
        style={{
          background: 'linear-gradient(160deg, #FDFCF8 0%, #F4F0E6 45%, #EAE4D4 100%)',
          minHeight: '60vh',
          paddingTop: '140px',
          paddingBottom: '80px',
        }}
      >
        {/* Rotating ring */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
          <div
            className="rotate-slow"
            style={{ width: 420, height: 420, borderRadius: '50%', border: '1px dashed rgba(180,145,60,0.14)' }}
          />
          <div
            className="rotate-slow-reverse absolute inset-10"
            style={{ borderRadius: '50%', border: '0.5px solid rgba(180,145,60,0.07)' }}
          />
        </div>

        {/* Floating hero watch — first real product image */}
        {products[0] && (
          <div
            className="absolute right-[8%] top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none"
            style={{ width: 300, height: 300, filter: 'drop-shadow(0 32px 60px rgba(0,0,0,0.16))' }}
          >
            <div className="float-watch relative w-full h-full">
              <Image src={products[0].image} alt="" fill className="object-contain" />
            </div>
          </div>
        )}

        <div className="container-xl relative z-10">
          <motion.div
            className="section-eyebrow mb-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          >
            <span>All Timepieces · {products.length} watches</span>
          </motion.div>

          <motion.h1
            className="display-hero mb-6"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', color: 'var(--text-primary)', lineHeight: 1.1 }}
            initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span style={{ display: 'block' }}>Timepieces</span>
            <span className="gold-shimmer" style={{ display: 'block', fontStyle: 'normal', fontWeight: 700, paddingRight: '0.2em' }}>
              of Distinction
            </span>
          </motion.h1>

          <motion.p
            className="text-base max-w-md mb-8"
            style={{ color: 'var(--text-secondary)', fontWeight: 300 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          >
            Handpicked from Citizen, Casio, Forest, Seiko &amp; more —
            genuine branded watches at{' '}
            <strong style={{ color: 'var(--gold-600)', fontWeight: 600 }}>the best prices</strong>,
            with free shipping across India.
          </motion.p>

          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2"
            style={{ background: 'rgba(180,145,60,0.08)', border: '1px solid rgba(180,145,60,0.2)', borderRadius: 2 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="label-caps" style={{ color: 'var(--gold-700)', fontSize: '0.62rem' }}>
              Live · {products.length} Products · Free Shipping · 100% Authentic
            </span>
          </motion.div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* ── Filter + Grid ── */}
      <section ref={ref} className="section-xl" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-xl">

          {/* Filter bar */}
          <motion.div
            className="flex flex-wrap items-center justify-between gap-5 mb-12 pb-8"
            style={{ borderBottom: '1px solid var(--border-light)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2.5 label-caps" style={{ color: 'var(--text-secondary)', fontSize: '0.65rem' }}>
              <SlidersHorizontal size={14} style={{ color: 'var(--gold-500)' }} />
              Filter by Brand
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`pill ${active === cat ? 'active' : ''}`}
                  onClick={() => setActive(cat)}
                  id={`filter-${cat.toLowerCase().replace(' ', '-')}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="label-caps" style={{ color: 'var(--text-tertiary)', fontSize: '0.62rem' }}>
              {filtered.length} piece{filtered.length !== 1 ? 's' : ''}
            </div>
          </motion.div>

          {/* Product Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: 'var(--border-light)' }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((watch, i) => (
                <motion.div
                  key={watch.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.6) }}
                  className="group relative overflow-hidden bg-white"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden product-image-bg" style={{ height: 280 }}>
                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                      {watch.badge && <span className="badge-new">{watch.badge}</span>}
                      {watch.discount && <span className="badge-off">{watch.discount}</span>}
                    </div>

                    <Image
                      src={watch.image}
                      alt={watch.name}
                      fill
                      className="object-contain p-8"
                      style={{ transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                      onError={(e) => {
                        // Fallback to a placeholder on image error
                        (e.currentTarget as HTMLImageElement).style.opacity = '0.3';
                      }}
                    />

                    {/* Hover quick-buy */}
                    <div
                      className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100"
                      style={{ background: 'linear-gradient(to top, rgba(250,250,247,0.97) 0%, transparent 55%)', transition: 'opacity 0.35s ease' }}
                    >
                      <a
                        href={watch.storeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ padding: '10px 24px', fontSize: '0.65rem' }}
                        id={`quick-buy-${watch.id}`}
                      >
                        Buy — {watch.price} <ExternalLink size={10} />
                      </a>
                    </div>

                    {/* Bottom gold bar */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left"
                      style={{ background: 'linear-gradient(90deg, var(--gold-700), var(--gold-400))', transition: 'transform 0.45s ease' }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="label-caps mb-2" style={{ color: 'var(--gold-600)', fontSize: '0.6rem' }}>
                      {watch.brand} · {watch.category}
                    </div>
                    <h3
                      className="font-serif font-bold mb-2 leading-snug"
                      style={{ fontSize: '0.95rem', color: 'var(--text-primary)', minHeight: '2.4rem' }}
                    >
                      {watch.name}
                    </h3>
                    <p className="text-xs mb-4 leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>
                      {watch.description}
                    </p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {watch.features.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="text-[9px] px-2.5 py-1 font-medium"
                          style={{ background: 'var(--gold-100)', color: 'var(--gold-700)', border: '1px solid rgba(180,145,60,0.18)', borderRadius: 2 }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* Price + Buy */}
                    <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border-light)' }}>
                      <div>
                        <div className="price-current">{watch.price}</div>
                        {watch.mrp && watch.mrp !== watch.price && (
                          <div className="price-original flex items-center gap-1 mt-0.5">
                            <Tag size={9} /> MRP {watch.mrp}
                          </div>
                        )}
                      </div>
                      <a
                        href={watch.storeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ padding: '10px 18px', fontSize: '0.64rem' }}
                        id={`buy-${watch.id}`}
                      >
                        Buy <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* CTA Banner */}
          <motion.div
            className="mt-16 relative overflow-hidden"
            style={{ background: 'var(--bg-dark)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <div className="divider-gold" />
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(180,145,60,1) 1px, transparent 0)', backgroundSize: '32px 32px' }}
            />
            <div className="px-12 py-16 text-center relative z-10">
              <div className="label-caps mb-4" style={{ color: 'var(--gold-500)', fontSize: '0.65rem' }}>
                Official Store · arabtimes.in
              </div>
              <h2 className="text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 600 }}>
                Explore the Complete Arab Times Collection
              </h2>
              <p className="mb-10 max-w-xl mx-auto text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>
                New arrivals, bundles, and the full Arab Times catalogue — always at the best prices.
              </p>
              <a
                href={siteConfig.officialStore}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
                id="collections-store-cta"
              >
                Visit Official Store <ExternalLink size={13} />
              </a>
            </div>
            <div className="divider-gold" />
          </motion.div>
        </div>
      </section>
    </>
  );
}
