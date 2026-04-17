'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Collections',
    href: '/collections',
    children: [
      { label: 'Bridal', href: '/collections/bridal' },
      { label: 'Lehenga Choli', href: '/collections/lehenga-choli' },
      { label: 'Ethnic Kurti', href: '/collections/ethnic-kurti' },
      { label: 'Indo Western', href: '/collections/indo-western' },
      { label: 'Navratri', href: '/collections/navratri' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

interface NavbarProps {
  announcements?: string[];
}

const DEFAULT_ANNOUNCEMENTS = [
  'Free Delivery on Orders Above ₹2,000',
  'Custom Stitching Available',
  'WhatsApp for Styling Help: +91 98765 43210',
];

export default function Navbar({ announcements = DEFAULT_ANNOUNCEMENTS }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { openCart, totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, []);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  /* Build ticker text from announcements array */
  const tickerText = announcements
    .map((a) => `✦ ${a}`)
    .join(' \u00A0\u00A0\u00A0');
  const repeated = `${tickerText} \u00A0\u00A0\u00A0${tickerText} \u00A0\u00A0\u00A0`;

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-brand-800 text-cream text-center py-2 px-4 text-xs font-jost tracking-[0.2em] uppercase overflow-hidden">
        <div className="marquee-wrapper">
          <div className="marquee-content">{repeated}</div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-xl shadow-glass border-b border-brand-100'
            : 'bg-cream/80 backdrop-blur-sm'
        }`}
      >
        <div className="container-xl flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-200 group-hover:border-brand-400 transition-colors duration-300 shadow-glass">
              <Image
                src="/images/Logo.jpg"
                alt="Swara Logo"
                fill
                className="object-cover img-zoom"
                priority
              />
            </div>
            <div>
              <p className="font-cormorant text-2xl font-semibold text-brand-900 leading-none tracking-wide">
                Swara
              </p>
              <p className="font-jost text-[9px] tracking-[0.3em] uppercase text-brand-500 mt-0.5">
                Ethnic Wear
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(link.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button className="nav-link flex items-center gap-1 py-6">
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        activeDropdown === link.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 w-52 glass-card bg-cream/95 border-brand-100 py-3 shadow-luxury"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-5 py-2.5 font-jost text-sm text-brand-700 hover:text-brand-500 hover:bg-brand-50 transition-colors duration-150"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.href} href={link.href} className="nav-link py-6">
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Cart icon */}
            <button
              onClick={openCart}
              className="relative text-brand-700 hover:text-brand-500 transition-colors duration-200"
              aria-label={`Open cart${totalItems > 0 ? ` (${totalItems} items)` : ''}`}
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-800 text-cream text-[9px] font-jost flex items-center justify-center"
                >
                  {totalItems > 9 ? '9+' : totalItems}
                </motion.span>
              )}
            </button>

            <Link href="/contact" className="btn-primary text-xs py-2.5 px-5">
              Enquire Now
            </Link>
          </div>

          {/* Mobile: Cart + Hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative p-1 text-brand-800 hover:text-brand-500 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-800 text-cream text-[8px] font-jost flex items-center justify-center"
                >
                  {totalItems > 9 ? '9+' : totalItems}
                </motion.span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-brand-800 hover:text-brand-500 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden sticky top-20 z-40 bg-cream/98 backdrop-blur-xl border-b border-brand-100 shadow-luxury overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.children ? (
                    <>
                      <button
                        onClick={() =>
                          setMobileExpanded(
                            mobileExpanded === link.label ? null : link.label
                          )
                        }
                        className="flex items-center justify-between w-full py-3 px-2 font-jost text-sm tracking-wider uppercase text-brand-800"
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${
                            mobileExpanded === link.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === link.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 pb-2 space-y-1 overflow-hidden"
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="block py-2 px-2 font-jost text-sm text-brand-600 hover:text-brand-400"
                              >
                                → {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 px-2 font-jost text-sm tracking-wider uppercase text-brand-800 hover:text-brand-500"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-brand-100">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full justify-center text-xs"
                >
                  Enquire Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
