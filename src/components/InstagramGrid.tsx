'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';
import { Instagram } from 'lucide-react';
import type { InstagramImage } from '@/lib/content';

const DEFAULT_IMAGES: InstagramImage[] = [
  { id: 'ig1', src: '/images/Ethnic Kurti/Kurti-1.jpeg', alt: 'Ethnic Kurti', caption: 'Elegance in every thread ✨' },
  { id: 'ig2', src: '/images/Indo Western/Indo-2-Front.jpeg', alt: 'Indo Western', caption: 'East meets West 🌸' },
  { id: 'ig3', src: '/images/Lehenga Choli/Lehenga-3-Front.jpeg', alt: 'Lehenga Choli', caption: 'Noor-E-Jahan vibes 💛' },
  { id: 'ig4', src: '/images/Bridal/bridal-1-back.jpeg', alt: 'Bridal Back Detail', caption: 'Back details that steal the show 👰' },
  { id: 'ig5', src: '/images/Navratri/Navratri-2-Front.jpeg', alt: 'Navratri', caption: 'Garba ready! 🎊' },
  { id: 'ig6', src: '/images/Indo Western/Indo-5-Front.jpeg', alt: 'Indo Western Fusion', caption: 'Power dressing, Indian roots 🦋' },
  { id: 'ig7', src: '/images/Ethnic Kurti/Kurti-6-Front.jpeg', alt: 'Chikankari Kurti', caption: 'Lucknowi magic 🤍' },
  { id: 'ig8', src: '/images/Lehenga Choli/Lehenga-4-Front.jpeg', alt: 'Blossom Lehenga', caption: 'Fresh as morning blossoms 🌺' },
];

interface InstagramGridProps {
  images?: InstagramImage[];
  handle?: string;
}

export default function InstagramGrid({ images = DEFAULT_IMAGES, handle = 'swara_ethnicwear' }: InstagramGridProps) {
  const profileUrl = `https://instagram.com/${handle}`;

  return (
    <section className="section-padding bg-cream">
      <div className="container-xl">

        {/* Header */}
        <AnimatedSection className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Instagram size={18} className="text-pink-500" />
            <p className="section-label">@{handle}</p>
          </div>
          <h2 className="font-cormorant text-4xl md:text-5xl text-brand-900 font-light">
            As Seen on Instagram
          </h2>
          <div className="ornament-divider max-w-xs mx-auto mt-5">
            <span className="font-cormorant text-gold-500 text-xl">✦</span>
          </div>
          <p className="font-jost text-brand-500 text-sm mt-4">
            Tag us in your Swara look for a chance to be featured!
          </p>
        </AnimatedSection>

        {/* Grid */}
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
          {images.map((img, i) => (
            <StaggerItem key={img.id ?? i}>
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-square overflow-hidden group rounded-lg bg-brand-100"
                title={img.caption}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover img-zoom"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center gap-2 p-3">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <Instagram size={24} className="text-white" />
                    <span className="font-jost text-xs text-white tracking-widest uppercase">View Post</span>
                  </motion.div>
                  {img.caption && (
                    <p className="font-jost text-[10px] text-white/80 text-center leading-snug mt-1">
                      {img.caption}
                    </p>
                  )}
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Follow CTA */}
        <AnimatedSection className="text-center mt-8">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-jost text-sm tracking-widest uppercase text-brand-700 border-b border-brand-300 pb-0.5 hover:text-pink-500 hover:border-pink-500 transition-colors duration-200"
          >
            <Instagram size={14} />
            Follow @{handle}
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
