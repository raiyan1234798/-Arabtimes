'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Phone, MessageCircle, Instagram, Facebook, Store, MapPin, ExternalLink, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

const channels = [
  {
    id: 'whatsapp',
    icon: <MessageCircle size={28} />,
    title: 'WhatsApp',
    sub: 'Instant Reply',
    detail: 'Chat directly with us',
    href: siteConfig.whatsapp,
    accent: '#25D366',
    bg: 'rgba(37,211,102,0.06)',
    border: 'rgba(37,211,102,0.2)',
  },
  {
    id: 'call',
    icon: <Phone size={28} />,
    title: 'Call Us',
    sub: 'Speak Directly',
    detail: siteConfig.phoneDisplay,
    href: `tel:${siteConfig.phone}`,
    accent: 'var(--gold-500)',
    bg: 'var(--gold-100)',
    border: 'rgba(180,145,60,0.25)',
  },
  {
    id: 'instagram',
    icon: <Instagram size={28} />,
    title: 'Instagram',
    sub: '@arab_times',
    detail: 'Follow & DM us',
    href: siteConfig.instagram,
    accent: '#E1306C',
    bg: 'rgba(225,48,108,0.05)',
    border: 'rgba(225,48,108,0.15)',
  },
  {
    id: 'facebook',
    icon: <Facebook size={28} />,
    title: 'Facebook',
    sub: 'Arab Times',
    detail: 'Like & Message',
    href: siteConfig.facebook,
    accent: '#1877F2',
    bg: 'rgba(24,119,242,0.05)',
    border: 'rgba(24,119,242,0.15)',
  },
  {
    id: 'store',
    icon: <Store size={28} />,
    title: 'Official Store',
    sub: 'Shop Online',
    detail: 'arabtimes.in',
    href: siteConfig.officialStore,
    accent: 'var(--gold-500)',
    bg: 'var(--gold-100)',
    border: 'rgba(180,145,60,0.25)',
  },
];

export default function ContactClient() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden flex items-end"
        style={{
          background: 'linear-gradient(160deg, #FDFCF8 0%, #F4F0E6 45%, #EAE4D4 100%)',
          minHeight: '55vh',
          paddingTop: '140px',
          paddingBottom: '80px',
        }}
      >
        {/* Decorative ring */}
        <div className="absolute right-[6%] top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
          <div
            className="rotate-slow"
            style={{ width: 360, height: 360, borderRadius: '50%', border: '1px dashed rgba(180,145,60,0.12)' }}
          />
        </div>

        <div className="container-xl relative z-10">
          <motion.div
            className="section-eyebrow mb-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          >
            <span>Get In Touch</span>
          </motion.div>
          <motion.h1
            className="display-hero mb-5"
            style={{ fontSize: 'clamp(3rem, 7vw, 5.8rem)', color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span style={{ display: 'block' }}>We&apos;re Here</span>
            <span className="gold-shimmer" style={{ display: 'block', fontStyle: 'normal', fontWeight: 700 }}>
              For You
            </span>
          </motion.h1>
          <motion.p
            className="text-base max-w-md"
            style={{ color: 'var(--text-secondary)', fontWeight: 300 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          >
            Whether you need help finding the perfect timepiece or have a question about an order —
            we&apos;re always just a message away.
          </motion.p>
        </div>
      </section>

      <div className="divider-gold" />

      {/* ── Contact Cards ── */}
      <section ref={ref} className="section-xl" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-xl">

          {/* Channel cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
            {channels.map((ch, i) => (
              <motion.a
                key={ch.id}
                href={ch.href}
                target={ch.id !== 'call' ? '_blank' : undefined}
                rel={ch.id !== 'call' ? 'noopener noreferrer' : undefined}
                id={`contact-${ch.id}-btn`}
                className="group flex flex-col items-center text-center p-8 relative overflow-hidden"
                style={{
                  background: ch.bg,
                  border: `1.5px solid ${ch.border}`,
                  textDecoration: 'none',
                  borderRadius: 2,
                  transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.09, duration: 0.5 }}
                whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,0,0,0.09)' }}
              >
                <div
                  className="w-14 h-14 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: '#fff',
                    border: `1.5px solid ${ch.border}`,
                    color: ch.accent,
                    borderRadius: 2,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                  }}
                >
                  {ch.icon}
                </div>
                <div className="label-caps mb-1" style={{ color: ch.accent, fontSize: '0.65rem' }}>
                  {ch.title}
                </div>
                <div className="label-caps mb-3" style={{ color: 'var(--text-tertiary)', fontSize: '0.58rem' }}>
                  {ch.sub}
                </div>
                <div className="text-sm font-medium flex items-center gap-1" style={{ color: 'var(--text-primary)' }}>
                  {ch.detail}
                  <ExternalLink size={9} style={{ opacity: 0.4 }} />
                </div>

                {/* Bottom accent bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left"
                  style={{ background: ch.accent, transition: 'transform 0.4s ease' }}
                />
              </motion.a>
            ))}
          </div>

          {/* Map + Info */}
          <motion.div
            className="grid lg:grid-cols-2 gap-px"
            style={{ background: 'var(--border-light)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            {/* Map */}
            <div className="relative overflow-hidden bg-white" style={{ minHeight: 400 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.7024!2d77.255!3d8.177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0453cc67da5dbf%3A0x4b8e89cd8c5b5bbc!2sColachel%2C%20Tamil%20Nadu%20629251!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Arab Times Showroom Location"
              />
            </div>

            {/* Address card */}
            <div className="bg-white p-12 flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'var(--gold-100)',
                      border: '1.5px solid rgba(180,145,60,0.25)',
                      color: 'var(--gold-600)',
                      borderRadius: 2,
                    }}
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="label-caps" style={{ color: 'var(--gold-600)', fontSize: '0.62rem' }}>
                      Our Location
                    </div>
                    <h3
                      className="font-serif font-bold text-xl"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Arab Times Showroom
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <div>
                    <div className="label-caps mb-1" style={{ color: 'var(--text-tertiary)', fontSize: '0.6rem' }}>
                      Address
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>
                      {siteConfig.addressFull}
                    </p>
                  </div>
                  <div>
                    <div className="label-caps mb-1" style={{ color: 'var(--text-tertiary)', fontSize: '0.6rem' }}>
                      Phone
                    </div>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-sm font-medium link-underline"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                  <div>
                    <div className="label-caps mb-1" style={{ color: 'var(--text-tertiary)', fontSize: '0.6rem' }}>
                      WhatsApp
                    </div>
                    <a
                      href={siteConfig.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium flex items-center gap-1.5"
                      style={{ color: '#25D366' }}
                    >
                      Message us instantly <ArrowUpRight size={12} />
                    </a>
                  </div>
                  <div>
                    <div className="label-caps mb-1" style={{ color: 'var(--text-tertiary)', fontSize: '0.6rem' }}>
                      Hours
                    </div>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>
                      Mon – Sat: 9:00 AM – 7:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 pt-8" style={{ borderTop: '1px solid var(--border-light)' }}>
                <a
                  href={siteConfig.officialStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                  id="contact-store-btn"
                >
                  Shop Online <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
