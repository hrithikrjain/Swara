'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Truck, RefreshCw, Shield, ChevronDown } from 'lucide-react';
import { StaggerContainer, StaggerItem } from './AnimatedSection';
import AnimatedSection from './AnimatedSection';
import ProductCard from './ProductCard';
import { Product, products, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '@/lib/products';

export default function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const toggleAccordion = (key: string) =>
    setOpenAccordion((prev) => (prev === key ? null : key));

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE(product.name)}${
    selectedSize ? encodeURIComponent(` (Size: ${selectedSize})`) : ''
  }`;

  return (
    <>
      {/* Main Product Section */}
      <section className="section-padding bg-cream">
        <div className="container-xl grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

          {/* ── Images ── */}
          <div className="space-y-3">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-brand-50 shadow-glass">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[activeImage]}
                    alt={`${product.name} — view ${activeImage + 1}`}
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {product.badge && (
                <div className="absolute top-4 left-4 bg-brand-800 text-cream text-[9px] font-jost tracking-[0.2em] uppercase px-3 py-1.5">
                  {product.badge}
                </div>
              )}
              {discount && (
                <div className="absolute top-4 right-4 bg-gold-500 text-brand-950 text-[9px] font-jost font-medium tracking-wide uppercase px-3 py-1.5 rounded-full">
                  -{discount}% OFF
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      i === activeImage
                        ? 'border-brand-600 shadow-glass'
                        : 'border-brand-100 hover:border-brand-300'
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className="space-y-6">
            <div>
              <p className="font-jost text-[10px] text-brand-400 tracking-[0.3em] uppercase mb-2">
                {product.category}
              </p>
              <h1 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-brand-900 font-light leading-tight">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-gold-500 text-gold-500" />
                ))}
              </div>
              <span className="font-jost text-xs text-brand-400">(4.9 — Premium Quality)</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-cormorant text-4xl text-brand-800 font-semibold">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <>
                  <span className="font-jost text-base text-brand-300 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="font-jost text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>

            <div className="h-px bg-brand-100" />

            <p className="font-jost text-sm text-brand-600 leading-relaxed">{product.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-jost text-[10px] text-brand-400 tracking-widest uppercase mb-1">Fabric</p>
                <p className="font-cormorant text-base text-brand-800">{product.fabric}</p>
              </div>
              <div>
                <p className="font-jost text-[10px] text-brand-400 tracking-widest uppercase mb-1">Occasion</p>
                <p className="font-cormorant text-base text-brand-800">{product.occasion.join(', ')}</p>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-jost text-xs text-brand-600 tracking-widest uppercase font-medium">Select Size</p>
                <button className="font-jost text-[10px] text-brand-400 underline hover:text-brand-600">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-11 h-11 font-jost text-xs border transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-brand-800 text-cream border-brand-800'
                        : 'border-brand-200 text-brand-600 hover:border-brand-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="font-jost text-[10px] text-brand-400 mt-2">
                  Please select a size before enquiring
                </p>
              )}
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white font-jost font-medium text-sm tracking-widest uppercase py-4 hover:bg-[#1ebe5d] transition-colors duration-200 shadow-[0_4px_20px_rgba(37,211,102,0.3)]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Enquire on WhatsApp
              </a>
              <Link href="/contact" className="flex items-center justify-center w-full btn-outline py-4 text-xs">
                Request Custom Stitching
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: Truck, text: 'Free Delivery', sub: 'Above ₹2,000' },
                { icon: RefreshCw, text: 'Easy Returns', sub: '7 days policy' },
                { icon: Shield, text: 'Authentic', sub: '100% Genuine' },
              ].map((badge) => {
                const Icon = badge.icon;
                return (
                  <div key={badge.text} className="flex flex-col items-center text-center p-2 rounded-lg bg-brand-50">
                    <Icon size={16} className="text-brand-500 mb-1" />
                    <p className="font-jost text-[10px] text-brand-700 font-medium">{badge.text}</p>
                    <p className="font-jost text-[9px] text-brand-400">{badge.sub}</p>
                  </div>
                );
              })}
            </div>

            {/* Accordions */}
            <div className="space-y-2 pt-2">
              {[
                { key: 'details', label: 'Product Details', content: product.details },
                {
                  key: 'care',
                  label: 'Care Instructions',
                  content: [
                    'Dry clean recommended',
                    'Store in breathable garment bag',
                    'Avoid direct sunlight for prolonged periods',
                    'Iron on reverse with low heat',
                  ],
                },
                {
                  key: 'shipping',
                  label: 'Shipping & Delivery',
                  content: [
                    'Delivery within 5–7 business days',
                    'Express delivery available on request',
                    'Free shipping on orders above ₹2,000',
                    'Fully insured delivery',
                  ],
                },
              ].map((acc) => (
                <div key={acc.key} className="border border-brand-100 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleAccordion(acc.key)}
                    className="flex items-center justify-between w-full px-4 py-3.5 text-left"
                  >
                    <span className="font-jost text-sm font-medium text-brand-800">{acc.label}</span>
                    <ChevronDown
                      size={14}
                      className={`text-brand-500 transition-transform duration-300 ${
                        openAccordion === acc.key ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openAccordion === acc.key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="px-4 pb-4 space-y-1.5">
                          {acc.content.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 font-jost text-xs text-brand-500">
                              <span className="text-gold-500 mt-0.5">✦</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-parchment/60">
          <div className="container-xl">
            <AnimatedSection className="text-center mb-10">
              <p className="section-label mb-2">You May Also Love</p>
              <h2 className="font-cormorant text-3xl md:text-4xl text-brand-900 font-light">
                More From {product.category}
              </h2>
            </AnimatedSection>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <StaggerItem key={p.id}>
                  <ProductCard product={p} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}
    </>
  );
}
