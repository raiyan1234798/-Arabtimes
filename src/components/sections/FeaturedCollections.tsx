'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Tag } from 'lucide-react';
import { type Watch } from '@/data/collections';

// Pick the 3 most interesting ones (best seller / fan favourite / premium pick)
interface Props { products: Watch[]; }

export default function FeaturedCollections({ products }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="featured-collections"
      className="section-xl"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="container-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              className="section-eyebrow mb-5"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
            >
              <span>Featured Timepieces</span>
            </motion.div>
            <motion.h2
              className="display-title"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.7 }}
            >
              Signature <span className="gold-shimmer">Watches</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          >
            <Link href="/collections" className="btn-ghost flex items-center gap-2">
              Full Collection <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((watch, i) => (
            <motion.div
              key={watch.id}
              className="group overflow-hidden bg-white relative border border-[var(--border-light)] hover:border-[rgba(180,145,60,0.2)] transition-all duration-400"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Image */}
              <div className="relative product-image-bg overflow-hidden" style={{ height: 280 }}>
                {watch.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="badge-new">{watch.badge}</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 z-10">
                  <span className="badge-off">{watch.discount}</span>
                </div>

                <Image
                  src={watch.image}
                  alt={watch.name}
                  fill
                  className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                  style={{ transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                />

                {/* Quick-buy overlay */}
                <div
                  className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-all duration-400"
                  style={{ background: 'linear-gradient(to top, rgba(250,250,247,0.95) 0%, transparent 55%)', transition: 'opacity 0.4s ease' }}
                >
                  <a
                    href={watch.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ padding: '10px 24px', fontSize: '0.66rem', transform: 'translateY(8px)', transition: 'all 0.35s ease' }}
                    id={`featured-buy-${watch.id}`}
                  >
                    Buy — {watch.price} <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="label-caps mb-2" style={{ color: 'var(--gold-600)', fontSize: '0.6rem' }}>
                  {watch.brand} · {watch.category}
                </div>
                <h3
                  className="mb-2 font-serif font-bold leading-snug"
                  style={{ fontSize: '1.05rem', color: 'var(--text-primary)', minHeight: '2.4rem' }}
                >
                  {watch.name}
                </h3>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>
                  {watch.description}
                </p>

                {/* Feature chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {watch.features.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="text-[10px] px-2.5 py-1"
                      style={{
                        background: 'var(--gold-100)',
                        color: 'var(--gold-700)',
                        border: '1px solid rgba(180,145,60,0.18)',
                        borderRadius: '2px',
                        fontWeight: 500,
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Price row */}
                <div
                  className="flex items-center justify-between pt-5"
                  style={{ borderTop: '1px solid var(--border-light)' }}
                >
                  <div>
                    <div className="price-current">{watch.price}</div>
                    <div className="price-original flex items-center gap-1 mt-0.5">
                      <Tag size={9} /> MRP {watch.mrp}
                    </div>
                  </div>
                  <a
                    href={watch.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ padding: '10px 18px', fontSize: '0.64rem' }}
                    id={`card-buy-${watch.id}`}
                  >
                    Buy Now <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
