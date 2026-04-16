'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';

const occasions = [
  {
    title: 'Bridal',
    subtitle: 'Your forever begins here',
    image: '/images/Bridal/bridal-2.jpeg',
    href: '/collections/bridal',
    color: 'from-rose-900/80',
  },
  {
    title: 'Navratri',
    subtitle: 'Dance, dazzle, celebrate',
    image: '/images/Navratri/Navratri-1-Front.jpeg',
    href: '/collections/navratri',
    color: 'from-orange-900/80',
  },
  {
    title: 'Festive',
    subtitle: 'Made for celebrations',
    image: '/images/Lehenga Choli/Lehenga-2.jpeg',
    href: '/collections/lehenga-choli',
    color: 'from-brand-900/80',
  },
  {
    title: 'Everyday Grace',
    subtitle: 'Elegance for every morning',
    image: '/images/Ethnic Kurti/Kurti-3.jpeg',
    href: '/collections/ethnic-kurti',
    color: 'from-teal-900/80',
  },
  {
    title: 'Reception',
    subtitle: 'Contemporary & chic',
    image: '/images/Indo Western/Indo-4.jpeg',
    href: '/collections/indo-western',
    color: 'from-slate-900/80',
  },
];

export default function OccasionSection() {
  return (
    <section className="section-padding bg-brand-950">
      <div className="container-xl">

        {/* Header */}
        <AnimatedSection className="text-center mb-14">
          <p className="section-label text-gold-400 mb-3">Shop by Occasion</p>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-cream font-light">
            Dressed for Every Moment
          </h2>
          <div className="ornament-divider max-w-xs mx-auto mt-5">
            <span className="font-cormorant text-gold-500 text-xl">✦</span>
          </div>
          <p className="font-jost text-brand-300 text-sm mt-4 max-w-md mx-auto">
            From intimate pujas to grand wedding ceremonies — we have the perfect ensemble for every beautiful moment in your life.
          </p>
        </AnimatedSection>

        {/* Occasion Grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {occasions.map((occ) => (
            <StaggerItem key={occ.title}>
              <Link
                href={occ.href}
                className="group relative block rounded-xl overflow-hidden aspect-[3/4] shadow-glass hover:shadow-luxury transition-all duration-500"
              >
                <Image
                  src={occ.image}
                  alt={occ.title}
                  fill
                  className="object-cover img-zoom"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                {/* Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t ${occ.color} to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-400`} />

                {/* Label */}
                <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                  <h3 className="font-cormorant text-xl text-cream font-medium leading-tight">
                    {occ.title}
                  </h3>
                  <p className="font-jost text-[10px] text-brand-200 mt-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {occ.subtitle}
                  </p>
                  <motion.span
                    className="inline-block mt-2 text-gold-400 text-xs font-jost tracking-widest uppercase opacity-0 group-hover:opacity-100"
                    whileHover={{ x: 3 }}
                  >
                    Shop →
                  </motion.span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
