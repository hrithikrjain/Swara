'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';
import ProductCard from './ProductCard';
import { products, categories } from '@/lib/products';

const tabs = ['All', ...categories.map((c) => c.name)];

export default function BestSellers() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered =
    activeTab === 'All'
      ? products.filter((p) => p.bestSeller || p.featured).slice(0, 8)
      : products
          .filter((p) => p.category === activeTab)
          .slice(0, 8);

  return (
    <section className="section-padding bg-parchment/60">
      <div className="container-xl">

        {/* Header */}
        <AnimatedSection className="text-center mb-10">
          <p className="section-label mb-3">Curated For You</p>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-brand-900 font-light">
            Bestsellers & Featured
          </h2>
          <div className="ornament-divider max-w-xs mx-auto mt-5">
            <span className="font-cormorant text-gold-500 text-xl">✦</span>
          </div>
        </AnimatedSection>

        {/* Tab Filters */}
        <AnimatedSection delay={0.1} className="mb-10">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative font-jost text-xs tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-brand-800 text-cream'
                    : 'bg-white text-brand-600 hover:bg-brand-50 border border-brand-100'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.span
                    layoutId="tabIndicator"
                    className="absolute inset-0 bg-brand-800 -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Product Grid */}
        <StaggerContainer
          key={activeTab}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filtered.map((product, i) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} priority={i < 4} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="font-cormorant text-2xl text-brand-300">
              More styles coming soon…
            </p>
          </div>
        )}

        {/* View All */}
        <AnimatedSection className="text-center mt-12">
          <Link
            href={activeTab === 'All' ? '/collections' : `/collections/${activeTab.toLowerCase().replace(/ /g, '-')}`}
            className="btn-primary"
          >
            View All {activeTab === 'All' ? 'Products' : activeTab}
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
