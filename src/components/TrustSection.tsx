'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';
import { Star, Award, Truck, RefreshCw, MessageCircle } from 'lucide-react';

const shopImages = [
  { src: '/images/Shop Images/Shop front pic.webp', alt: 'Swara Store Front', span: 'col-span-2 row-span-2' },
  { src: '/images/Shop Images/shop inside pics.png', alt: 'Inside the Store' },
  { src: '/images/Shop Images/shop inside pics 2.png', alt: 'Store Display' },
  { src: '/images/Shop Images/swara shopping bags.webp', alt: 'Swara Shopping Bags' },
];

const trustPoints = [
  {
    icon: Star,
    title: 'Premium Quality',
    desc: 'Every piece is crafted with finest fabrics and artisan-level detailing.',
  },
  {
    icon: Award,
    title: 'Authentic Craftsmanship',
    desc: 'Traditional techniques by skilled artisans passed down through generations.',
  },
  {
    icon: Truck,
    title: 'Pan-India Delivery',
    desc: 'Safe, insured delivery across India. Free shipping on orders above ₹2,000.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    desc: 'Hassle-free 7-day returns. Your satisfaction is our priority.',
  },
  {
    icon: MessageCircle,
    title: 'Personal Styling',
    desc: 'Chat with our experts on WhatsApp for personalised styling guidance.',
  },
];

export default function TrustSection() {
  return (
    <section className="section-padding bg-cream overflow-hidden">
      <div className="container-xl">

        {/* ── Store Gallery ── */}
        <AnimatedSection className="mb-20">
          <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-luxury">
            {shopImages.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden group ${img.span ?? ''}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover img-zoom"
                  sizes="(max-width: 640px) 66vw, 33vw"
                />
                <div className="absolute inset-0 bg-brand-800/0 group-hover:bg-brand-800/20 transition-colors duration-500" />
              </div>
            ))}
          </div>

          {/* Caption */}
          <div className="text-center mt-6">
            <p className="section-label">The Swara Store</p>
            <p className="font-cormorant text-2xl text-brand-700 mt-1 font-light italic">
              "Where every visit feels like a celebration"
            </p>
          </div>
        </AnimatedSection>

        {/* ── Trust Features ── */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left: Headline */}
          <AnimatedSection direction="left">
            <p className="section-label mb-3">Why Choose Swara</p>
            <h2 className="font-cormorant text-4xl md:text-5xl text-brand-900 font-light leading-tight">
              Crafted with Love,<br />
              <span className="italic text-brand-600">Delivered with Care</span>
            </h2>
            <div className="flex items-center gap-3 mt-5">
              <span className="block w-12 h-0.5 bg-gold-500" />
              <span className="text-gold-500">✦</span>
            </div>
            <p className="font-jost text-brand-500 text-sm mt-5 leading-relaxed max-w-md">
              At Swara, we believe every woman deserves to feel like royalty. That's why we go beyond clothing — we create experiences that celebrate your individuality and honour our shared heritage.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-brand-100">
              {[
                { num: '500+', label: 'Happy Clients' },
                { num: '5+', label: 'Years of Craft' },
                { num: '100%', label: 'Authentic' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-cormorant text-3xl text-brand-800 font-semibold">{stat.num}</p>
                  <p className="font-jost text-xs text-brand-400 tracking-wide mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: Trust points */}
          <StaggerContainer className="space-y-5">
            {trustPoints.map((point) => {
              const Icon = point.icon;
              return (
                <StaggerItem key={point.title}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white hover:shadow-glass transition-all duration-300 cursor-default border border-brand-50"
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-brand-600" />
                    </div>
                    <div>
                      <h4 className="font-cormorant text-lg text-brand-900 font-medium">{point.title}</h4>
                      <p className="font-jost text-xs text-brand-400 mt-0.5 leading-relaxed">{point.desc}</p>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
