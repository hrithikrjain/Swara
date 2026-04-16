import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { categories } from '@/lib/products';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Explore all Swara ethnic wear collections — Bridal, Lehenga Choli, Ethnic Kurti, Indo Western, and Navratri.',
};

export default function CollectionsPage() {
  return (
    <div className="page-enter">

      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 bg-brand-900 overflow-hidden">
        <Image
          src="/images/Lehenga Choli/Lehenga-1.jpeg"
          alt="Collections"
          fill
          className="object-cover object-top opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/60 to-brand-950/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="section-label text-gold-400 mb-3">Swara</p>
          <h1 className="font-cormorant text-4xl md:text-6xl text-cream font-light">
            All Collections
          </h1>
          <div className="ornament-divider max-w-xs mx-auto mt-4">
            <span className="font-cormorant text-gold-500 text-xl">✦</span>
          </div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mt-4 font-jost text-xs text-brand-300">
            <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-cream">Collections</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-cream">
        <div className="container-xl">

          <AnimatedSection className="text-center mb-12">
            <p className="section-label mb-3">Explore By Category</p>
            <h2 className="font-cormorant text-4xl md:text-5xl text-brand-900 font-light">
              Find Your Perfect Look
            </h2>
            <div className="ornament-divider max-w-xs mx-auto mt-5">
              <span className="font-cormorant text-gold-500 text-xl">✦</span>
            </div>
            <p className="font-jost text-brand-500 text-sm mt-4 max-w-lg mx-auto">
              From timeless bridal wear to everyday ethnic elegance — explore our curated categories crafted for every woman, every occasion.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <StaggerItem key={cat.id}>
                <Link
                  href={`/collections/${cat.slug}`}
                  className="group block relative rounded-2xl overflow-hidden shadow-glass hover:shadow-luxury transition-all duration-500"
                  style={{ height: i === 0 ? '500px' : '340px' }}
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover img-zoom"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-card-gradient opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <p className="font-jost text-[10px] text-gold-400 tracking-[0.3em] uppercase mb-2">
                      {cat.count} {cat.count === 1 ? 'Style' : 'Styles'}
                    </p>
                    <h3 className="font-cormorant text-3xl text-cream font-medium mb-2">
                      {cat.name}
                    </h3>
                    <p className="font-jost text-xs text-brand-200 mb-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {cat.description}
                    </p>
                    <div className="flex items-center gap-2 text-gold-400 font-jost text-xs tracking-widest uppercase group-hover:gap-3 transition-all duration-200">
                      Explore Collection
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
