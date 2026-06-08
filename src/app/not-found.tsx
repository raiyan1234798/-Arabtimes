'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: 'linear-gradient(145deg, #FDFCFA 0%, #F5F1E8 100%)' }}
    >
      {/* Logo */}
      <motion.div
        className="w-20 h-20 relative mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image src="/images/logo.png" alt="Arab Times" fill className="object-contain" />
      </motion.div>

      {/* 404 display */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div
          className="text-8xl font-serif font-black mb-4 gold-shimmer"
          style={{ fontSize: 'clamp(5rem, 15vw, 9rem)' }}
        >
          404
        </div>
        <h1 className="text-2xl font-serif font-bold mb-3" style={{ color: '#1A1A1A' }}>
          Page Not Found
        </h1>
        <p className="text-sm mb-10 max-w-sm mx-auto" style={{ color: '#7A7A7A' }}>
          The page you're looking for doesn't exist. Let's get you back to exploring our premium timepieces.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-gold flex items-center gap-2">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <Link href="/collections" className="btn-outline-gold">
            View Collections
          </Link>
        </div>

        {/* Subtle watch image */}
        <motion.div
          className="mt-14 opacity-10 w-48 h-48 relative mx-auto"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image src="/images/p_citizen_blue.png" alt="" fill className="object-contain" />
        </motion.div>
      </motion.div>
    </div>
  );
}
