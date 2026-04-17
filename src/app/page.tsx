import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import FeaturedCollections from '@/components/FeaturedCollections';
import BestSellers from '@/components/BestSellers';
import OccasionSection from '@/components/OccasionSection';
import TrustSection from '@/components/TrustSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import InstagramGrid from '@/components/InstagramGrid';
import {
  getHeroSlides,
  getTestimonials,
  getInstagramImages,
  getBusinessSettings,
} from '@/lib/content';

export const metadata: Metadata = {
  title: 'Swara — Premium Women\'s Ethnic Wear',
  description:
    'Discover Swara\'s exquisite collections of bridal lehengas, ethnic kurtis, indo-western outfits, and navratri chaniya cholis. Premium women\'s ethnic wear crafted with love.',
};

export default function HomePage() {
  const slides       = getHeroSlides();
  const testimonials = getTestimonials();
  const igImages     = getInstagramImages();
  const business     = getBusinessSettings();

  return (
    <div className="page-enter">
      <HeroSection slides={slides} />
      <FeaturedCollections />
      <BestSellers />
      <OccasionSection />
      <TrustSection />
      <TestimonialsSection testimonials={testimonials} />
      <InstagramGrid images={igImages} handle={business.instagram} />
    </div>
  );
}
