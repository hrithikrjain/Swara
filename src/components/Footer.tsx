import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Phone, Mail, MapPin, Heart } from 'lucide-react';

const collections = [
  { label: 'Bridal', href: '/collections/bridal' },
  { label: 'Lehenga Choli', href: '/collections/lehenga-choli' },
  { label: 'Ethnic Kurti', href: '/collections/ethnic-kurti' },
  { label: 'Indo Western', href: '/collections/indo-western' },
  { label: 'Navratri', href: '/collections/navratri' },
];

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'All Collections', href: '/collections' },
  { label: 'Contact', href: '/contact' },
  { label: 'Shipping Policy', href: '/contact' },
  { label: 'Return Policy', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-parchment">

      {/* Top CTA Strip */}
      <div className="bg-brand-800 py-12 px-4">
        <div className="container-xl text-center space-y-4">
          <p className="section-label text-gold-400">Get In Touch</p>
          <h2 className="font-cormorant text-3xl md:text-4xl text-cream font-light">
            Have a question or custom requirement?
          </h2>
          <p className="font-jost text-brand-200 text-sm max-w-md mx-auto">
            We love helping you find your perfect look. Reach out on WhatsApp for instant styling assistance.
          </p>
          <a
            href="https://wa.me/919876543210?text=Hi%20Swara!%20I'd%20love%20to%20know%20more%20about%20your%20collections."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-4 bg-[#25D366] text-white px-8 py-3.5 font-jost text-sm font-medium tracking-widest uppercase hover:bg-[#1ebe5d] transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-padding">
        <div className="container-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-brand-700">
                <Image
                  src="/images/Logo.jpg"
                  alt="Swara"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-cormorant text-2xl text-cream font-semibold leading-none">Swara</p>
                <p className="font-jost text-[9px] tracking-[0.3em] uppercase text-brand-400 mt-0.5">Ethnic Wear</p>
              </div>
            </Link>
            <p className="font-jost text-sm text-brand-300 leading-relaxed max-w-xs">
              Celebrating the art of Indian craftsmanship. Every piece we create is a love letter to our rich cultural heritage.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-brand-700 flex items-center justify-center text-brand-300 hover:text-gold-400 hover:border-gold-500 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-brand-700 flex items-center justify-center text-brand-300 hover:text-green-400 hover:border-green-500 transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-5">
            <h3 className="font-cormorant text-xl text-cream font-medium">Collections</h3>
            <div className="gold-line" />
            <ul className="space-y-2.5">
              {collections.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-jost text-sm text-brand-300 hover:text-gold-400 transition-colors duration-200 hover:translate-x-1 inline-block transition-transform"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="font-cormorant text-xl text-cream font-medium">Quick Links</h3>
            <div className="gold-line" />
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-jost text-sm text-brand-300 hover:text-gold-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h3 className="font-cormorant text-xl text-cream font-medium">Find Us</h3>
            <div className="gold-line" />
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-gold-400 mt-0.5 shrink-0" />
                <p className="font-jost text-sm text-brand-300 leading-relaxed">
                  Swara Ethnic Wear,<br />
                  Your City, Your State<br />
                  India — 400001
                </p>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-gold-400 shrink-0" />
                <a href="tel:+919876543210" className="font-jost text-sm text-brand-300 hover:text-gold-400 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-gold-400 shrink-0" />
                <a href="mailto:hello@swara.fashion" className="font-jost text-sm text-brand-300 hover:text-gold-400 transition-colors">
                  hello@swara.fashion
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-800 py-5 px-4">
        <div className="container-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-jost text-xs text-brand-500">
            © {new Date().getFullYear()} Swara Ethnic Wear. All rights reserved.
          </p>
          <p className="font-jost text-xs text-brand-500 flex items-center gap-1">
            Made with <Heart size={11} className="text-brand-400 fill-brand-400" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
