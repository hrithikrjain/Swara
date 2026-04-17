/**
 * SERVER-ONLY content reader
 * Reads from /content/ JSON & Markdown files at build time.
 * Falls back to static TypeScript data if files are missing.
 *
 * ⚠️  NEVER import this file in client components ('use client').
 *     Only import in Server Components (page.tsx, layout.tsx, etc.)
 */

import fs   from 'fs';
import path from 'path';
import matter from 'gray-matter';

import {
  products  as staticProducts,
  categories as staticCategories,
  type Product,
  type Category,
} from './products';

const ROOT = process.cwd();

/** Read a JSON file that contains { items: T[] } and return items array */
function readItemsJSON<T>(relPath: string, fallback: T[]): T[] {
  try {
    const raw = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
    const parsed = JSON.parse(raw);
    // Support both { items: [...] } format (CMS-written) and plain array (legacy)
    const arr: T[] = Array.isArray(parsed) ? parsed : (parsed?.items ?? []);
    return arr.length > 0 ? arr : fallback;
  } catch {
    return fallback;
  }
}

/** Read a JSON file that is a plain object (not array) */
function readObjectJSON<T>(relPath: string, fallback: T): T {
  try {
    const raw = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
    const parsed = JSON.parse(raw) as T;
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

/* ── Products ──────────────────────────────────────────────────────────────── */

export function getAllProducts(): Product[] {
  const dir = path.join(ROOT, 'content/products');
  try {
    const files = fs
      .readdirSync(dir)
      .filter(f => f.endsWith('.md') && !f.startsWith('.'));

    if (files.length === 0) return staticProducts;

    const parsed = files
      .map(file => {
        try {
          const raw = fs.readFileSync(path.join(dir, file), 'utf8');
          const { data } = matter(raw);
          return data as Product;
        } catch {
          return null;
        }
      })
      .filter((p): p is Product => !!p && !!p.id);

    return parsed.length > 0 ? parsed : staticProducts;
  } catch {
    return staticProducts;
  }
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find(p => p.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const slug = categorySlug.toLowerCase().replace(/ /g, '-');
  return getAllProducts().filter(p =>
    p.category.toLowerCase().replace(/ /g, '-') === slug ||
    p.category.toLowerCase() === categorySlug.toLowerCase()
  );
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter(p => p.featured);
}

export function getBestSellers(): Product[] {
  return getAllProducts().filter(p => p.bestSeller);
}

/* ── Categories ────────────────────────────────────────────────────────────── */

export function getAllCategories(): Category[] {
  return readItemsJSON<Category>('content/data/categories.json', staticCategories).map(cat => ({
    ...cat,
    count: getProductsByCategory(cat.slug).length,
  }));
}

/* ── Hero Slides ───────────────────────────────────────────────────────────── */

export interface HeroSlide {
  id       : string;
  image    : string;
  label    : string;
  headline : string;
  sub      : string;
  ctaLabel : string;
  ctaHref  : string;
}

const defaultSlides: HeroSlide[] = [
  {
    id: 'slide-1', image: '/images/Bridal/bridal-1-front.jpeg',
    label: 'Bridal Collection', headline: 'Where Tradition\nMeets Grace',
    sub: 'Exquisite bridal wear crafted for the modern Indian bride.',
    ctaLabel: 'Explore Bridal', ctaHref: '/collections/bridal',
  },
  {
    id: 'slide-2', image: '/images/Lehenga Choli/Lehenga-1.jpeg',
    label: 'Lehenga Choli', headline: 'Timeless Elegance,\nReborn',
    sub: 'Heritage craftsmanship meets contemporary silhouettes.',
    ctaLabel: 'Shop Lehengas', ctaHref: '/collections/lehenga-choli',
  },
  {
    id: 'slide-3', image: '/images/Indo Western/Indo-1-Front.jpeg',
    label: 'Indo Western', headline: 'East Meets West\nin Perfect Harmony',
    sub: 'Bold, contemporary, unmistakably Indian.',
    ctaLabel: 'View Indo Western', ctaHref: '/collections/indo-western',
  },
  {
    id: 'slide-4', image: '/images/Navratri/Navratri-1-Front.jpeg',
    label: 'Navratri Special', headline: 'Dance Into\nThe Celebration',
    sub: 'Vibrant chaniya cholis crafted for every garba night.',
    ctaLabel: 'Shop Navratri', ctaHref: '/collections/navratri',
  },
];

export function getHeroSlides(): HeroSlide[] {
  return readItemsJSON<HeroSlide>('content/data/hero-slides.json', defaultSlides);
}

/* ── Testimonials ──────────────────────────────────────────────────────────── */

export interface Testimonial {
  id      : string;
  name    : string;
  city    : string;
  role    : string;
  rating  : number;
  review  : string;
  product : string;
  avatar  : string;
}

const defaultTestimonials: Testimonial[] = [
  { id:'t1', name:'Priya Sharma',  city:'Mumbai',     role:'Bride',               rating:5, review:'Swara made my wedding day absolutely magical. The bridal lehenga was beyond my imagination — every detail perfection!', product:'Rani Heritage Bridal Lehenga', avatar:'P' },
  { id:'t2', name:'Deepa Nair',    city:'Bangalore',  role:'Regular Customer',    rating:5, review:"I've been shopping at Swara for 3 years — the quality is exceptional, fabrics are luxurious. My go-to store forever!", product:'Royal Chikankari Kurti', avatar:'D' },
  { id:'t3', name:'Kavya Patel',   city:'Ahmedabad',  role:'Festival Shopper',    rating:5, review:'Bought the Garba Nite chaniya choli for Navratri and WOW! I danced all 9 nights comfortably. Everyone kept asking where I bought it!', product:'Garba Nite Chaniya Choli', avatar:'K' },
  { id:'t4', name:'Ananya Mehta',  city:'Delhi',      role:'Fashion Enthusiast',  rating:5, review:'The Indo-Western fusion set exceeded all expectations — quality at par with high-end boutiques at a fraction of the price!', product:'Fusion Dhoti Pant Co-ord Set', avatar:'A' },
  { id:'t5', name:'Ritu Joshi',    city:'Pune',       role:'Mother of the Bride', rating:5, review:'We ordered the entire bridal outfit from Swara. From consultation to delivery, everything was handled with care. Beautiful work!', product:'Shahi Dulhan Bridal Set', avatar:'R' },
];

export function getTestimonials(): Testimonial[] {
  return readItemsJSON<Testimonial>('content/data/testimonials.json', defaultTestimonials);
}

/* ── Instagram Grid ────────────────────────────────────────────────────────── */

export interface InstagramImage {
  id      : string;
  src     : string;
  alt     : string;
  caption : string;
}

const defaultInstagram: InstagramImage[] = [
  { id:'ig1', src:'/images/Ethnic Kurti/Kurti-1.jpeg',              alt:'Ethnic Kurti',       caption:'Elegance in every thread ✨' },
  { id:'ig2', src:'/images/Indo Western/Indo-2-Front.jpeg',         alt:'Indo Western',        caption:'East meets West 🌸' },
  { id:'ig3', src:'/images/Lehenga Choli/Lehenga-3-Front.jpeg',    alt:'Lehenga Choli',       caption:'Noor-E-Jahan vibes 💛' },
  { id:'ig4', src:'/images/Bridal/bridal-1-back.jpeg',              alt:'Bridal Back Detail',  caption:'Back details that steal the show 👰' },
  { id:'ig5', src:'/images/Navratri/Navratri-2-Front.jpeg',         alt:'Navratri',            caption:'Garba ready! 🎊' },
  { id:'ig6', src:'/images/Indo Western/Indo-5-Front.jpeg',         alt:'Indo Western Fusion', caption:'Power dressing, Indian roots 🦋' },
  { id:'ig7', src:'/images/Ethnic Kurti/Kurti-6-Front.jpeg',        alt:'Chikankari Kurti',    caption:'Lucknowi magic 🤍' },
  { id:'ig8', src:'/images/Lehenga Choli/Lehenga-4-Front.jpeg',    alt:'Blossom Lehenga',     caption:'Fresh as morning blossoms 🌺' },
];

export function getInstagramImages(): InstagramImage[] {
  return readItemsJSON<InstagramImage>('content/data/instagram.json', defaultInstagram);
}

/* ── Announcements ─────────────────────────────────────────────────────────── */

const defaultAnnouncements = [
  'Free Delivery on Orders Above ₹2,000',
  'Custom Stitching Available',
  'WhatsApp for Styling Help: +91 98765 43210',
];

export function getAnnouncements(): string[] {
  try {
    const raw = fs.readFileSync(path.join(ROOT, 'content/settings/announcements.json'), 'utf8');
    const parsed = JSON.parse(raw);
    // Support { items: string[] } or plain string[]
    const arr: string[] = Array.isArray(parsed) ? parsed : (parsed?.items ?? []);
    return arr.length > 0 ? arr : defaultAnnouncements;
  } catch {
    return defaultAnnouncements;
  }
}

/* ── Business Settings ─────────────────────────────────────────────────────── */

export interface BusinessSettings {
  name       : string;
  tagline    : string;
  whatsapp   : string;
  phone      : string;
  email      : string;
  address    : string;
  hours      : string;
  instagram  : string;
}

const defaultBusiness: BusinessSettings = {
  name: 'Swara Ethnic Wear', tagline: 'Where Tradition Meets Grace',
  whatsapp: '919876543210', phone: '+91 98765 43210',
  email: 'hello@swara.fashion',
  address: 'Swara Ethnic Wear\nYour Street, Your City\nIndia — 400001',
  hours: 'Mon – Sat: 10:00 AM – 8:00 PM\nSunday: 11:00 AM – 6:00 PM',
  instagram: 'swara_ethnicwear',
};

export function getBusinessSettings(): BusinessSettings {
  return readObjectJSON<BusinessSettings>('content/settings/business.json', defaultBusiness);
}
