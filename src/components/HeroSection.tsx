'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import type { HeroSlide } from '@/lib/content';

/* ── Static fallback (used when no props passed) ─────────────────────────── */
const defaultSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    image: '/images/Bridal/bridal-1-front.jpeg',
    label: 'Bridal Collection',
    headline: 'Where Tradition\nMeets Grace',
    sub: 'Exquisite bridal wear crafted for the modern Indian bride. Every stitch, a story.',
    ctaLabel: 'Explore Bridal',
    ctaHref: '/collections/bridal',
  },
  {
    id: 'slide-2',
    image: '/images/Lehenga Choli/Lehenga-1.jpeg',
    label: 'Lehenga Choli',
    headline: 'Timeless Elegance,\nReborn',
    sub: 'Heritage craftsmanship meets contemporary silhouettes for celebrations that last a lifetime.',
    ctaLabel: 'Shop Lehengas',
    ctaHref: '/collections/lehenga-choli',
  },
  {
    id: 'slide-3',
    image: '/images/Indo Western/Indo-1-Front.jpeg',
    label: 'Indo Western',
    headline: 'East Meets West\nin Perfect Harmony',
    sub: 'Bold, contemporary, unmistakably Indian. Fusion fashion for the woman who leads.',
    ctaLabel: 'View Indo Western',
    ctaHref: '/collections/indo-western',
  },
  {
    id: 'slide-4',
    image: '/images/Navratri/Navratri-1-Front.jpeg',
    label: 'Navratri Special',
    headline: 'Dance Into\nThe Celebration',
    sub: 'Vibrant chaniya cholis crafted for every spin, twirl, and garba night.',
    ctaLabel: 'Shop Navratri',
    ctaHref: '/collections/navratri',
  },
];

interface HeroSectionProps {
  slides?: HeroSlide[];
}

export default function HeroSection({ slides = defaultSlides }: HeroSectionProps) {
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

  /* ── Variants ─────────────────────────────────────────────────────────── */

  // Mobile: image slides left/right (full-bleed)
  const mobileImageVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '8%' : '-8%', opacity: 0, scale: 1.05 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-8%' : '8%', opacity: 0, scale: 0.97 }),
  };

  // Desktop: image fades in (it's in a fixed column)
  const desktopImageVariants = {
    enter: { opacity: 0, scale: 1.04 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  };

  const textVariants = {
    enter: { opacity: 0, y: 30 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section className="relative w-full overflow-hidden bg-brand-950">

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE: full-bleed portrait image with gradient overlay
          Only visible below lg breakpoint
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="block lg:hidden relative h-[92vh] min-h-[600px] max-h-[900px]">
        <AnimatePresence custom={direction} mode="sync">
          <motion.div
            key={`mobile-${current}`}
            custom={direction}
            variants={mobileImageVariants}
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
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-brand-950/20" />
          </motion.div>
        </AnimatePresence>

        {/* Mobile Text Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="px-6 max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-text-${current}`}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-5"
              >
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex items-center gap-3 text-gold-400 font-jost text-xs tracking-[0.35em] uppercase"
                >
                  <span className="block w-8 h-px bg-gold-400" />
                  {slide.label}
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="font-cormorant text-5xl sm:text-6xl text-cream font-light leading-[1.05] tracking-tight"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {slide.headline}
                </motion.h1>
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
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="font-jost text-brand-200 text-base leading-relaxed max-w-xs font-light"
                >
                  {slide.sub}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.6 }}
                  className="flex flex-wrap items-center gap-4 pt-2"
                >
                  <Link href={slide.ctaHref} className="btn-primary">
                    {slide.ctaLabel}
                    <ChevronRight size={14} />
                  </Link>
                  <Link
                    href="/collections"
                    className="font-jost text-sm text-cream tracking-widest uppercase hover:text-gold-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    All Collections
                    <span className="block w-6 h-px bg-current" />
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Controls */}
        <MobileControls
          total={total}
          current={current}
          setCurrent={setCurrent}
          setDirection={setDirection}
          goPrev={goPrev}
          goNext={goNext}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          DESKTOP: Split layout — dark text panel (45%) + portrait image (55%)
          Only visible at lg+ breakpoint
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex h-[92vh] min-h-[680px] max-h-[960px]">

        {/* Left: Text Panel */}
        <div className="relative w-[45%] bg-brand-950 flex flex-col justify-center px-12 xl:px-16 2xl:px-20 overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle at 30% 70%, #C47B3A 0%, transparent 60%)',
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={`desktop-text-${current}`}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative space-y-6"
            >
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center gap-3 text-gold-400 font-jost text-xs tracking-[0.35em] uppercase"
              >
                <span className="block w-8 h-px bg-gold-400" />
                {slide.label}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-cormorant text-6xl xl:text-7xl 2xl:text-8xl text-cream font-light leading-[1.05] tracking-tight"
                style={{ whiteSpace: 'pre-line' }}
              >
                {slide.headline}
              </motion.h1>

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

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="font-jost text-brand-200 text-base xl:text-lg leading-relaxed max-w-sm font-light"
              >
                {slide.sub}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Link href={slide.ctaHref} className="btn-primary">
                  {slide.ctaLabel}
                  <ChevronRight size={14} />
                </Link>
                <Link
                  href="/collections"
                  className="font-jost text-sm text-cream tracking-widest uppercase hover:text-gold-400 transition-colors duration-200 flex items-center gap-2"
                >
                  All Collections
                  <span className="block w-6 h-px bg-current" />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Desktop dot indicators (bottom of text panel) */}
          <div className="absolute bottom-8 left-12 xl:left-16 flex items-center gap-3">
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
                    : 'w-1.5 h-1.5 bg-cream/30 hover:bg-cream/60'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <div className="absolute bottom-8 right-8 font-jost text-xs text-cream/30 tracking-widest">
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 right-16 flex flex-col items-center gap-2">
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-gold-400 to-transparent animate-float" />
          </div>
        </div>

        {/* Right: Portrait Image Panel */}
        <div className="relative w-[55%] overflow-hidden bg-brand-900">
          <AnimatePresence mode="sync">
            <motion.div
              key={`desktop-img-${current}`}
              variants={desktopImageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={slide.image}
                alt={slide.headline}
                fill
                className="object-cover object-top"
                priority
                sizes="55vw"
              />
              {/* Subtle left-edge vignette to blend with text panel */}
              <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-brand-950/60 to-transparent" />
              {/* Bottom vignette */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-950/50 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Desktop arrow controls on the image panel */}
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
        </div>
      </div>
    </section>
  );
}

/* ── Shared mobile controls sub-component ────────────────────────────────── */
function MobileControls({
  total,
  current,
  setCurrent,
  setDirection,
  goPrev,
  goNext,
}: {
  total: number;
  current: number;
  setCurrent: (i: number) => void;
  setDirection: (d: number) => void;
  goPrev: () => void;
  goNext: () => void;
}) {
  return (
    <>
      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {Array.from({ length: total }).map((_, i) => (
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

      {/* Arrow buttons */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-card-dark flex items-center justify-center text-cream hover:text-gold-400 transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-card-dark flex items-center justify-center text-cream hover:text-gold-400 transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight size={18} />
      </button>

      {/* Slide counter */}
      <div className="absolute right-8 bottom-8 z-20 font-jost text-xs text-cream/40 tracking-widest">
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-8 z-20 flex flex-col items-center gap-2">
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-gold-400 to-transparent animate-float" />
        <p className="font-jost text-[9px] text-cream/30 tracking-[0.3em] uppercase [writing-mode:vertical-lr] rotate-180">
          Scroll
        </p>
      </div>
    </>
  );
}
