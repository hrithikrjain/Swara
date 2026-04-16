'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    city: 'Mumbai',
    role: 'Bride',
    rating: 5,
    review:
      'Swara made my wedding day absolutely magical. The bridal lehenga they crafted for me was beyond my imagination — every detail, every stitch was perfection. I received compliments throughout the day. Forever grateful! 🙏',
    product: 'Rani Heritage Bridal Lehenga',
    avatar: 'P',
  },
  {
    name: 'Deepa Nair',
    city: 'Bangalore',
    role: 'Regular Customer',
    rating: 5,
    review:
      'I\'ve been shopping at Swara for 3 years now and I can\'t imagine going anywhere else for ethnic wear. The quality is exceptional, the fabrics are luxurious, and the team is so helpful. My go-to store forever!',
    product: 'Royal Chikankari Kurti',
    avatar: 'D',
  },
  {
    name: 'Kavya Patel',
    city: 'Ahmedabad',
    role: 'Festival Shopper',
    rating: 5,
    review:
      'Bought the Garba Nite chaniya choli for Navratri and WOW! The mirror work, the quality, the flare of the skirt — absolutely divine. I danced all 9 nights comfortably. Everyone kept asking where I bought it from!',
    product: 'Garba Nite Chaniya Choli',
    avatar: 'K',
  },
  {
    name: 'Ananya Mehta',
    city: 'Delhi',
    role: 'Fashion Enthusiast',
    rating: 5,
    review:
      'The Indo-Western fusion set I ordered exceeded all expectations. The quality, stitching, and detailing are at par with high-end boutiques but at a fraction of the price. Swara is truly special!',
    product: 'Fusion Dhoti Pant Co-ord Set',
    avatar: 'A',
  },
  {
    name: 'Ritu Joshi',
    city: 'Pune',
    role: 'Mother of the Bride',
    rating: 5,
    review:
      'We ordered the entire bridal outfit set from Swara for my daughter\'s wedding. From the first consultation to the final delivery, everything was handled with such care and professionalism. Beautiful work!',
    product: 'Shahi Dulhan Bridal Set',
    avatar: 'R',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} size={12} className="fill-gold-500 text-gold-500" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const id = setInterval(goNext, 5000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[current];

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <section className="section-padding bg-brand-900 overflow-hidden">
      <div className="container-xl max-w-4xl">

        <AnimatedSection className="text-center mb-14">
          <p className="section-label text-gold-400 mb-3">Testimonials</p>
          <h2 className="font-cormorant text-4xl md:text-5xl text-cream font-light">
            Words From Our Community
          </h2>
          <div className="ornament-divider max-w-xs mx-auto mt-5">
            <span className="font-cormorant text-gold-500 text-xl">✦</span>
          </div>
        </AnimatedSection>

        {/* Testimonial Card */}
        <div className="relative">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card-dark p-8 md:p-12 text-center"
            >
              {/* Quote icon */}
              <Quote size={40} className="text-gold-500/30 mx-auto mb-6" />

              {/* Review */}
              <blockquote className="font-cormorant text-xl md:text-2xl text-cream font-light leading-relaxed italic mb-8">
                "{t.review}"
              </blockquote>

              {/* Product badge */}
              <p className="font-jost text-[10px] text-gold-400 tracking-[0.3em] uppercase mb-6">
                Purchased: {t.product}
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-700 border-2 border-brand-600 flex items-center justify-center">
                  <span className="font-cormorant text-xl text-gold-400 font-semibold">{t.avatar}</span>
                </div>
                <div className="text-left">
                  <p className="font-cormorant text-lg text-cream font-medium">{t.name}</p>
                  <p className="font-jost text-xs text-brand-400">{t.role} · {t.city}</p>
                  <div className="mt-1">
                    <StarRating count={t.rating} />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goPrev}
              className="w-9 h-9 rounded-full border border-brand-700 flex items-center justify-center text-brand-300 hover:text-gold-400 hover:border-gold-500/50 transition-colors duration-200"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 h-1.5 bg-gold-400' : 'w-1.5 h-1.5 bg-brand-600 hover:bg-brand-500'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={goNext}
              className="w-9 h-9 rounded-full border border-brand-700 flex items-center justify-center text-brand-300 hover:text-gold-400 hover:border-gold-500/50 transition-colors duration-200"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Google rating strip */}
        <AnimatedSection className="mt-12 text-center" delay={0.2}>
          <div className="inline-flex items-center gap-3 glass-card-dark px-6 py-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-gold-500 text-gold-500" />
              ))}
            </div>
            <span className="font-cormorant text-cream text-lg">4.9/5</span>
            <span className="font-jost text-xs text-brand-400">from 200+ reviews</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
