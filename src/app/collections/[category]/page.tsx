import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import ProductCard from '@/components/ProductCard';
import { categories, getProductsByCategory } from '@/lib/products';

interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = categories.find((c) => c.slug === params.category);
  if (!cat) return { title: 'Not Found' };
  return {
    title: cat.name,
    description: `Shop Swara's ${cat.name} collection — ${cat.description}. Premium quality, artisan crafted.`,
  };
}

export default function CategoryPage({ params }: Props) {
  const cat = categories.find((c) => c.slug === params.category);
  if (!cat) notFound();

  const catProducts = getProductsByCategory(cat.name);

  return (
    <div className="page-enter">

      {/* Hero */}
      <section className="relative h-64 md:h-96 overflow-hidden bg-brand-900">
        <Image
          src={cat.image}
          alt={cat.name}
          fill
          className="object-cover object-top opacity-50"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/40 via-brand-900/60 to-brand-950/90" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="section-label text-gold-400 mb-3">{cat.count} Styles</p>
          <h1 className="font-cormorant text-5xl md:text-7xl text-cream font-light">
            {cat.name}
          </h1>
          <div className="ornament-divider max-w-xs mx-auto mt-4">
            <span className="font-cormorant text-gold-500 text-xl">✦</span>
          </div>
          <p className="font-jost text-brand-200 text-sm mt-3 max-w-sm mx-auto">{cat.description}</p>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mt-5 font-jost text-xs text-brand-400">
            <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/collections" className="hover:text-gold-400 transition-colors">Collections</Link>
            <span>/</span>
            <span className="text-cream">{cat.name}</span>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding bg-cream">
        <div className="container-xl">

          {/* Sort/Filter bar */}
          <AnimatedSection className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-brand-100">
            <p className="font-jost text-sm text-brand-500">
              Showing <span className="font-medium text-brand-800">{catProducts.length}</span> results
            </p>
            <div className="flex items-center gap-3">
              <span className="font-jost text-xs text-brand-400 tracking-wider uppercase">Sort by:</span>
              <select className="font-jost text-xs text-brand-700 border border-brand-200 px-3 py-2 bg-white focus:border-brand-400 focus:outline-none rounded">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </AnimatedSection>

          {catProducts.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {catProducts.map((product, i) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} priority={i < 4} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-24">
              <p className="font-cormorant text-4xl text-brand-300 font-light">
                New styles coming soon…
              </p>
              <p className="font-jost text-sm text-brand-400 mt-3">
                Check back or{' '}
                <Link href="/contact" className="text-brand-600 underline">
                  contact us
                </Link>{' '}
                for custom orders.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Other Categories */}
      <section className="section-padding bg-parchment/60">
        <div className="container-xl">
          <AnimatedSection className="text-center mb-8">
            <p className="section-label mb-2">Also Explore</p>
            <h2 className="font-cormorant text-3xl md:text-4xl text-brand-900 font-light">
              More Collections
            </h2>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-3">
            {categories
              .filter((c) => c.slug !== cat.slug)
              .map((c) => (
                <Link
                  key={c.id}
                  href={`/collections/${c.slug}`}
                  className="group relative overflow-hidden rounded-xl"
                >
                  <div className="relative w-40 h-52 sm:w-48 sm:h-64">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      className="object-cover img-zoom"
                      sizes="200px"
                    />
                    <div className="absolute inset-0 bg-brand-900/50 group-hover:bg-brand-900/30 transition-colors duration-300" />
                    <div className="absolute inset-x-0 bottom-0 p-3 text-center">
                      <p className="font-cormorant text-lg text-cream font-medium">{c.name}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
