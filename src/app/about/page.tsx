import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { Heart, Star, Users, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Discover the story behind Swara — a premium women\'s ethnic wear brand rooted in Indian heritage and craftsmanship.',
};

const values = [
  {
    icon: Heart,
    title: 'Crafted with Love',
    desc: 'Every piece that leaves our store has been created with genuine care, attention to detail, and a deep respect for the woman who will wear it.',
  },
  {
    icon: Award,
    title: 'Uncompromising Quality',
    desc: 'We source only the finest fabrics and work with skilled artisans who have spent decades perfecting their craft.',
  },
  {
    icon: Users,
    title: 'Community First',
    desc: 'Swara is more than a brand — it\'s a community of women who celebrate their heritage and individuality every single day.',
  },
  {
    icon: Star,
    title: 'Heritage Preserved',
    desc: 'We are proud custodians of India\'s textile traditions, from Chikankari to Zardosi, Bandhej to Banarasi.',
  },
];

const team = [
  {
    name: 'The Founders',
    role: 'Vision & Craft',
    image: '/images/Shop Images/shop inside pics.png',
    quote: '"We started Swara to make every Indian woman feel like royalty — affordably."',
  },
];

export default function AboutPage() {
  return (
    <div className="page-enter">

      {/* Hero */}
      <section className="relative h-72 md:h-96 overflow-hidden bg-brand-900">
        <Image
          src="/images/Shop Images/Shop front pic.webp"
          alt="Swara Store"
          fill
          className="object-cover object-center opacity-50"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/40 to-brand-950/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="section-label text-gold-400 mb-3">Our Story</p>
          <h1 className="font-cormorant text-5xl md:text-7xl text-cream font-light">About Swara</h1>
          <div className="ornament-divider max-w-xs mx-auto mt-4">
            <span className="font-cormorant text-gold-500 text-xl">✦</span>
          </div>
          <div className="flex items-center gap-2 mt-5 font-jost text-xs text-brand-400">
            <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-cream">About</span>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-padding bg-cream">
        <div className="container-xl grid md:grid-cols-2 gap-12 items-center">

          <AnimatedSection direction="left">
            <div className="space-y-6">
              <p className="section-label mb-2">Who We Are</p>
              <h2 className="font-cormorant text-4xl md:text-5xl text-brand-900 font-light leading-tight">
                Born from Passion,<br />
                <span className="italic text-brand-600">Built on Tradition</span>
              </h2>
              <div className="flex items-center gap-3">
                <span className="block w-12 h-0.5 bg-gold-500" />
                <span className="text-gold-500">✦</span>
              </div>
              <p className="font-jost text-brand-600 text-sm leading-loose">
                Swara was born from a simple but powerful belief: every Indian woman deserves to feel extraordinary in her ethnicity. We started as a small boutique with a big dream — to bring together the finest Indian craftsmanship and make it accessible to every woman who cherishes her heritage.
              </p>
              <p className="font-jost text-brand-600 text-sm leading-loose">
                Today, Swara is a beloved ethnic wear destination where brides find their dream lehengas, mothers discover elegant kurtis, and young women explore the magic of Indo-Western fusion. Every piece in our collection tells a story — of skilled hands, rich traditions, and the timeless beauty of Indian culture.
              </p>
              <p className="font-jost text-brand-600 text-sm leading-loose">
                We believe that fashion is not just about what you wear — it's about how it makes you feel. At Swara, we want you to feel confident, celebrated, and beautiful.
              </p>
              <Link href="/collections" className="btn-primary inline-flex">
                Explore Collections
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.2}>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-luxury">
                <Image
                  src="/images/Shop Images/shop inside pics.png"
                  alt="Inside Swara Store"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-luxury mt-8">
                <Image
                  src="/images/Shop Images/shop inside pics 2.png"
                  alt="Swara Store Display"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="col-span-2 relative aspect-video rounded-2xl overflow-hidden shadow-glass">
                <Image
                  src="/images/Shop Images/swara shopping bags.webp"
                  alt="Swara Shopping Bags"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-900 py-16 px-4">
        <div className="container-xl">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '500+', label: 'Happy Clients' },
              { num: '5+', label: 'Years in Business' },
              { num: '20+', label: 'Unique Styles' },
              { num: '100%', label: 'Authentic Crafts' },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div>
                  <p className="font-cormorant text-5xl text-gold-400 font-light">{stat.num}</p>
                  <p className="font-jost text-xs text-brand-300 tracking-widest uppercase mt-2">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-parchment/60">
        <div className="container-xl">
          <AnimatedSection className="text-center mb-12">
            <p className="section-label mb-3">What We Stand For</p>
            <h2 className="font-cormorant text-4xl md:text-5xl text-brand-900 font-light">Our Values</h2>
            <div className="ornament-divider max-w-xs mx-auto mt-5">
              <span className="font-cormorant text-gold-500 text-xl">✦</span>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={value.title}>
                  <div className="bg-white rounded-2xl p-7 shadow-glass hover:shadow-luxury transition-shadow duration-400 text-center group">
                    <div className="w-14 h-14 rounded-full bg-brand-50 group-hover:bg-brand-100 transition-colors flex items-center justify-center mx-auto mb-5">
                      <Icon size={24} className="text-brand-600" />
                    </div>
                    <h3 className="font-cormorant text-xl text-brand-900 font-medium mb-3">{value.title}</h3>
                    <p className="font-jost text-xs text-brand-500 leading-relaxed">{value.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Store Visit CTA */}
      <section className="relative py-20 overflow-hidden bg-brand-950">
        <Image
          src="/images/Shop Images/Shop front pic.webp"
          alt="Swara Store"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="relative z-10 container-xl text-center px-4">
          <AnimatedSection>
            <p className="section-label text-gold-400 mb-4">Visit Us</p>
            <h2 className="font-cormorant text-4xl md:text-6xl text-cream font-light mb-6">
              Experience Swara in Person
            </h2>
            <p className="font-jost text-brand-300 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Step into our store and let our styling experts help you find your perfect look. We'd love to meet you!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Get Directions
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-jost text-cream tracking-widest uppercase hover:text-gold-400 transition-colors"
              >
                WhatsApp Us
                <span className="block w-6 h-px bg-current" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
