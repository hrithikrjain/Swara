'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const slides = [
  {
    image: '/images/Bridal/bridal-1-front.jpeg',
    label: 'Bridal Collection',
    headline: 'Where Tradition\nMeets Grace',
    sub: 'Exquisite bridal wear crafted for the modern Indian bride. Every stitch, a story.',
    cta: { label: 'Explore Bridal', href: '/collections/bridal' },
  },
  {
    image: '/images/Lehenga Choli/Lehenga-1.jpeg',
    label: 'Lehenga Choli',
    headline: 'Timeless Elegance,\nReborn',
    sub: 'Heritage craftsmanship meets contemporary silhouettes for celebrations that last a lifetime.',
    cta: { label: 'Shop Lehengas', href: '/collections/lehenga-choli' },
  },
  {
    image: '/images/Indo Western/Indo-1-Front.jpeg',
    label: 'Indo Western',
    headline: 'East Meets West\nin Perfect Harmony',
    sub: 'Bold, contemporary, unmistakably Indian. Fusion fashion for the woman who leads.',
    cta: { label: 'View Indo Western', href: '/collections/indo-western' },
  },
  {
    image: '/images/Navratri/Navratri-1-Front.jpeg',
    label: 'Navratri Special',
    headline: 'Dance Into\nThe Celebration',
    sub: 'Vibrant chaniya cholis crafted for every spin, twirl, and garba night.',
    cta: { label: 'Shop Navratri', href: '/collections/navratri' },
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = slides.length;

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const id = setInterval(goNext, 6000);
    return () => clearInterval(id);
  }, [goNext]);

  const slide = slides[current];

  const imageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '8%' : '-8%',
      opacity: 0,
      scale: 1.05,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? '-8%' : '8%',
      opacity: 0,
      scale: 0.97,
    }),
  };

  const textVariants = {
    enter: { opacity: 0, y: 30 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section className="relative w-full h-[92vh] min-h-[600px] max-h-[900px] overflow-hidden bg-brand-950">

      {/* Slides */}
      <AnimatePresence custom={direction} mode="sync">
        <motion.div
          key={current}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={slide.image}
            alt={slide.headline}
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          {/* Multi-layer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-brand-950/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-xl px-4 sm:px-6 lg:px-8 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              {/* Label */}
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center gap-3 text-gold-400 font-jost text-xs tracking-[0.35em] uppercase"
              >
                <span className="block w-8 h-px bg-gold-400" />
                {slide.label}
              </motion.p>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-cormorant text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream font-light leading-[1.05] tracking-tight"
                style={{ whiteSpace: 'pre-line' }}
              >
                {slide.headline}
              </motion.h1>

              {/* Ornament */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex items-center gap-3 origin-left"
              >
                <span className="block w-12 h-px bg-gold-500" />
                <span className="text-gold-500 text-lg">✦</span>
                <span className="block w-12 h-px bg-gold-500" />
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="font-jost text-brand-200 text-base md:text-lg leading-relaxed max-w-md font-light"
              >
                {slide.sub}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Link href={slide.cta.href} className="btn-primary">
                  {slide.cta.label}
                  <ChevronRight size={14} />
                </Link>
                <Link href="/collections" className="font-jost text-sm text-cream tracking-widest uppercase hover:text-gold-400 transition-colors duration-200 flex items-center gap-2">
                  All Collections
                  <span className="block w-6 h-px bg-current" />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`transition-all duration-400 rounded-full ${
              i === current
                ? 'w-8 h-1.5 bg-gold-400'
                : 'w-1.5 h-1.5 bg-cream/40 hover:bg-cream/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrow Controls */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-card-dark flex items-center justify-center text-cream hover:text-gold-400 hover:border-gold-500/40 transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-card-dark flex items-center justify-center text-cream hover:text-gold-400 hover:border-gold-500/40 transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight size={18} />
      </button>

      {/* Slide counter */}
      <div className="absolute right-8 bottom-8 z-20 font-jost text-xs text-cream/50 tracking-widest">
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-8 z-20 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold-400 to-transparent animate-float" />
        <p className="font-jost text-[9px] text-cream/40 tracking-[0.3em] uppercase [writing-mode:vertical-lr] rotate-180">
          Scroll
        </p>
      </div>
    </section>
  );
}
