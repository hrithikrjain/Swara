'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';
import { Instagram } from 'lucide-react';

const gridImages = [
  { src: '/images/Ethnic Kurti/Kurti-1.jpeg', alt: 'Ethnic Kurti' },
  { src: '/images/Indo Western/Indo-2-Front.jpeg', alt: 'Indo Western' },
  { src: '/images/Lehenga Choli/Lehenga-3-Front.jpeg', alt: 'Lehenga Choli' },
  { src: '/images/Bridal/bridal-1-back.jpeg', alt: 'Bridal Back' },
  { src: '/images/Navratri/Navratri-2-Front.jpeg', alt: 'Navratri' },
  { src: '/images/Indo Western/Indo-5-Front.jpeg', alt: 'Indo Western' },
  { src: '/images/Ethnic Kurti/Kurti-6-Front.jpeg', alt: 'Chikankari Kurti' },
  { src: '/images/Lehenga Choli/Lehenga-4-Front.jpeg', alt: 'Lehenga' },
];

export default function InstagramGrid() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-xl">

        {/* Header */}
        <AnimatedSection className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Instagram size={18} className="text-pink-500" />
            <p className="section-label">@swara_ethnicwear</p>
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
          {gridImages.map((img, i) => (
            <StaggerItem key={i}>
              <a
                href="https://instagram.com/swara_ethnicwear"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-square overflow-hidden group rounded-lg bg-brand-100"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover img-zoom"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                {/* Hover */}
                <div className="absolute inset-0 bg-brand-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <Instagram size={24} className="text-white" />
                    <span className="font-jost text-xs text-white tracking-widest uppercase">View Post</span>
                  </motion.div>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Follow CTA */}
        <AnimatedSection className="text-center mt-8">
          <a
            href="https://instagram.com/swara_ethnicwear"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-jost text-sm tracking-widest uppercase text-brand-700 border-b border-brand-300 pb-0.5 hover:text-pink-500 hover:border-pink-500 transition-colors duration-200"
          >
            <Instagram size={14} />
            Follow @swara_ethnicwear
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
