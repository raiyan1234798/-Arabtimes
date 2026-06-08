'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%, -50%) scale(2)';
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
    };
    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    document.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          width: 7, height: 7,
          borderRadius: '50%',
          background: '#B4913C',
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.15s ease',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] hidden md:block"
        style={{
          width: 32, height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(180,145,60,0.5)',
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.25s ease',
        }}
      />
    </>
  );
}
