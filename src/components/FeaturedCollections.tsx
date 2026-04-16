'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { StaggerContainer, StaggerItem } from './AnimatedSection';
import AnimatedSection from './AnimatedSection';
import { categories } from '@/lib/products';

export default function FeaturedCollections() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-xl">

        {/* Header */}
        <AnimatedSection className="text-center mb-14">
          <p className="section-label mb-3">Our World</p>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-brand-900 font-light">
            Explore the Collections
          </h2>
          <div className="ornament-divider max-w-xs mx-auto mt-5">
            <span className="font-cormorant text-gold-500 text-xl">✦</span>
          </div>
          <p className="font-jost text-brand-500 text-sm mt-4 max-w-md mx-auto leading-relaxed">
            Each collection is a carefully curated celebration of Indian craftsmanship, designed for the woman who carries tradition in her heart and confidence in her stride.
          </p>
        </AnimatedSection>

        {/* Category Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Large featured card - Bridal */}
          <StaggerItem className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <CollectionCard
              category={categories[0]}
              tall
            />
          </StaggerItem>

          {/* Other categories */}
          {categories.slice(1).map((cat) => (
            <StaggerItem key={cat.id}>
              <CollectionCard category={cat} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View all CTA */}
        <AnimatedSection className="text-center mt-12">
          <Link href="/collections" className="btn-outline inline-flex items-center gap-2">
            View All Collections
            <ArrowRight size={14} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

function CollectionCard({
  category,
  tall = false,
}: {
  category: typeof categories[0];
  tall?: boolean;
}) {
  return (
    <Link
      href={`/collections/${category.slug}`}
      className={`product-card block rounded-2xl overflow-hidden shadow-glass hover:shadow-luxury transition-shadow duration-500 ${
        tall ? 'h-[480px] sm:h-[560px]' : 'h-56 sm:h-64'
      }`}
    >
      <div className="relative w-full h-full">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover img-zoom"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-card-gradient opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <p className="font-jost text-[10px] text-gold-400 tracking-[0.3em] uppercase mb-1.5">
            {category.count} Styles
          </p>
          <h3 className="font-cormorant text-2xl md:text-3xl text-cream font-medium leading-tight mb-2">
            {category.name}
          </h3>
          <p className="font-jost text-xs text-brand-200 mb-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            {category.description}
          </p>
          <motion.div
            className="flex items-center gap-2 text-gold-400 font-jost text-xs tracking-widest uppercase"
            whileHover={{ x: 4 }}
          >
            Explore
            <ArrowRight size={12} />
          </motion.div>
        </div>
      </div>
    </Link>
  );
}
