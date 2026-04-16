'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart, Eye } from 'lucide-react';
import { Product, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="product-card bg-white group shadow-glass hover:shadow-card-hover transition-shadow duration-500 rounded-xl overflow-hidden"
    >
      {/* Image Container */}
      <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-brand-50">
        <Image
          src={product.images[imageIndex]}
          alt={product.name}
          fill
          className="object-cover img-zoom"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          onError={() => setImageIndex(0)}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Quick View Button */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400">
          <Link
            href={`/product/${product.id}`}
            className="flex items-center gap-2 bg-cream/95 backdrop-blur-sm text-brand-800 text-xs font-jost font-medium tracking-widest uppercase px-5 py-2.5 hover:bg-cream transition-colors duration-200"
          >
            <Eye size={13} />
            Quick View
          </Link>
        </div>

        {/* Image toggle dots (for multiple images) */}
        {product.images.length > 1 && (
          <div className="absolute inset-x-0 top-0 flex h-full">
            {product.images.map((_, i) => (
              <div
                key={i}
                className="flex-1 cursor-pointer"
                onMouseEnter={() => setImageIndex(i)}
                onMouseLeave={() => setImageIndex(0)}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="bg-brand-800 text-cream text-[9px] font-jost font-medium tracking-[0.2em] uppercase px-2.5 py-1">
              {product.badge}
            </span>
          )}
          {discount && discount > 0 && (
            <span className="bg-gold-500 text-brand-950 text-[9px] font-jost font-medium tracking-[0.15em] uppercase px-2.5 py-1">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setWishlisted(!wishlisted);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          aria-label="Add to wishlist"
        >
          <Heart
            size={14}
            className={wishlisted ? 'fill-brand-600 text-brand-600' : 'text-brand-400'}
          />
        </button>

        {/* Image navigation dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {product.images.map((_, i) => (
              <span
                key={i}
                className={`block w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  i === imageIndex ? 'bg-cream w-3' : 'bg-cream/50'
                }`}
              />
            ))}
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <p className="font-jost text-[10px] text-brand-400 tracking-[0.2em] uppercase mb-1">
          {product.category}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-cormorant text-lg text-brand-900 font-medium leading-snug hover:text-brand-600 transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-50">
          <div>
            <span className="font-cormorant text-xl font-semibold text-brand-800">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="font-jost text-xs text-brand-300 line-through ml-2">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE(product.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[10px] font-jost tracking-widest uppercase text-[#25D366] border border-[#25D366]/30 px-3 py-1.5 hover:bg-[#25D366] hover:text-white transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Enquire
          </a>
        </div>
      </div>
    </motion.div>
  );
}
