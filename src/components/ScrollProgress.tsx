'use client';
import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[950] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #8A6E2A, #B4913C, #D4B865)',
      }}
    />
  );
}
