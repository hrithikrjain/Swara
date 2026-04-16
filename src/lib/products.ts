export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  images: string[];
  featured: boolean;
  bestSeller: boolean;
  inStock: boolean;
  fabric: string;
  occasion: string[];
  colors: string[];
  sizes: string[];
  badge?: string;
}

export const products: Product[] = [
  // ── BRIDAL ─────────────────────────────────────────────────────────────────
  {
    id: 'bridal-lehenga-1',
    name: 'Rani Heritage Bridal Lehenga',
    category: 'Bridal',
    price: 24999,
    originalPrice: 32000,
    description:
      'A timeless masterpiece crafted for the modern bride. This exquisite bridal lehenga features hand-embroidered zardosi work on rich silk, adorned with mirror work and sequin detailing that catches every ray of light. Designed to make you feel like royalty on your most special day.',
    details: [
      'Heavy zardosi hand embroidery throughout',
      'Mirror work & sequin detailing',
      'Premium pure silk fabric',
      'Fully lined for comfort',
      'Comes with matching dupatta & blouse piece',
      'Dry clean only',
    ],
    images: [
      '/images/Bridal/bridal-1-front.jpeg',
      '/images/Bridal/bridal-1-back.jpeg',
    ],
    featured: true,
    bestSeller: true,
    inStock: true,
    fabric: 'Pure Silk',
    occasion: ['Bridal', 'Wedding', 'Sangeet'],
    colors: ['Deep Red', 'Gold'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'Bestseller',
  },
  {
    id: 'bridal-lehenga-2',
    name: 'Shahi Dulhan Bridal Set',
    category: 'Bridal',
    price: 19999,
    originalPrice: 26000,
    description:
      'Embrace regal elegance with this stunning bridal creation. The rich fabric and intricate embellishments make it the perfect choice for today\'s discerning bride who values tradition and style in equal measure.',
    details: [
      'Intricate thread & zari embroidery',
      'Flared skirt with 4-metre flair',
      'Premium velvet & net fabric combination',
      'Comes with stitched blouse & dupatta',
      'Custom stitching available',
    ],
    images: ['/images/Bridal/bridal-2.jpeg'],
    featured: true,
    bestSeller: false,
    inStock: true,
    fabric: 'Velvet & Net',
    occasion: ['Bridal', 'Wedding', 'Reception'],
    colors: ['Maroon', 'Gold'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'New Arrival',
  },

  // ── LEHENGA CHOLI ──────────────────────────────────────────────────────────
  {
    id: 'lehenga-choli-1',
    name: 'Gulbadan Embroidered Lehenga',
    category: 'Lehenga Choli',
    price: 8999,
    originalPrice: 12000,
    description:
      'A celebration of Indian craftsmanship — this vibrant lehenga choli is adorned with floral thread embroidery and gota patti work that dances as you move. Perfect for festive occasions and wedding celebrations.',
    details: [
      'Floral thread embroidery',
      'Gota patti border detailing',
      'Georgette skirt with net dupatta',
      'Comes with unstitched blouse',
      'Festive & wedding appropriate',
    ],
    images: ['/images/Lehenga Choli/Lehenga-1.jpeg'],
    featured: true,
    bestSeller: true,
    inStock: true,
    fabric: 'Georgette & Net',
    occasion: ['Wedding', 'Festive', 'Reception'],
    colors: ['Pink', 'Gold'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'Bestseller',
  },
  {
    id: 'lehenga-choli-2',
    name: 'Saffron Dreams Lehenga',
    category: 'Lehenga Choli',
    price: 7499,
    originalPrice: 9999,
    description:
      'Drape yourself in warmth and luxury with this saffron beauty. Rich in colour and craftsmanship, this lehenga is your go-to pick for sangeet nights and festive gatherings.',
    details: [
      'Resham thread embroidery',
      'Flared 3-tier skirt',
      'Soft georgette fabric',
      'Matching dupatta included',
    ],
    images: ['/images/Lehenga Choli/Lehenga-2.jpeg'],
    featured: false,
    bestSeller: true,
    inStock: true,
    fabric: 'Georgette',
    occasion: ['Sangeet', 'Festive', 'Wedding'],
    colors: ['Saffron', 'Orange'],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Hot Pick',
  },
  {
    id: 'lehenga-choli-3',
    name: 'Noor-E-Jahan Silk Lehenga',
    category: 'Lehenga Choli',
    price: 11999,
    originalPrice: 15000,
    description:
      'Inspired by the grandeur of Mughal courts, this silk lehenga is hand-crafted with patience and artistry. Every stitch tells a story of heritage and grace.',
    details: [
      'Pure raw silk fabric',
      'Mughal-inspired hand embroidery',
      'Heavy dupatta with zari border',
      'Fully lined for comfort',
      'Custom stitching available',
    ],
    images: [
      '/images/Lehenga Choli/Lehenga-3-Front.jpeg',
      '/images/Lehenga Choli/Lehenga-3_Back.jpeg',
    ],
    featured: true,
    bestSeller: false,
    inStock: true,
    fabric: 'Raw Silk',
    occasion: ['Wedding', 'Reception', 'Festival'],
    colors: ['Royal Blue', 'Silver'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'lehenga-choli-4',
    name: 'Zara Blossom Lehenga',
    category: 'Lehenga Choli',
    price: 9499,
    originalPrice: 12500,
    description:
      'Fresh as morning blossoms — this charming lehenga features digital floral prints paired with contrast embroidery borders. Effortlessly chic for the modern ethnic lover.',
    details: [
      'Digital floral print fabric',
      'Contrast embroidered border',
      'Lightweight chiffon dupatta',
      'Blouse piece included',
    ],
    images: [
      '/images/Lehenga Choli/Lehenga-4-Front.jpeg',
      '/images/Lehenga Choli/Lehenga-4-Back.jpeg',
    ],
    featured: false,
    bestSeller: false,
    inStock: true,
    fabric: 'Chiffon',
    occasion: ['Festive', 'Sangeet', 'Casual Ethnic'],
    colors: ['Peach', 'Gold'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },

  // ── ETHNIC KURTI ───────────────────────────────────────────────────────────
  {
    id: 'ethnic-kurti-1',
    name: 'Anarkali Grace Kurti',
    category: 'Ethnic Kurti',
    price: 2499,
    originalPrice: 3500,
    description:
      'Elegance in every thread. This flared Anarkali kurti in premium cotton blend features delicate block printing and hand-embroidered yoke detailing. A wardrobe essential for the modern Indian woman.',
    details: [
      'Premium cotton-silk blend',
      'Hand block printed',
      'Embroidered yoke with mirror work',
      'Flared Anarkali silhouette',
      'Easy wash & wear',
    ],
    images: ['/images/Ethnic Kurti/Kurti-1.jpeg'],
    featured: false,
    bestSeller: true,
    inStock: true,
    fabric: 'Cotton-Silk Blend',
    occasion: ['Casual', 'Office', 'Festive'],
    colors: ['Teal', 'Gold'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'Bestseller',
  },
  {
    id: 'ethnic-kurti-2',
    name: 'Rangoli Print A-Line Kurti',
    category: 'Ethnic Kurti',
    price: 1999,
    originalPrice: 2800,
    description:
      'A riot of colours in the most sophisticated way. This A-line kurti sports vibrant Rangoli-inspired prints with contrast piping and button details — perfectly paired with palazzos or churidars.',
    details: [
      'Rayon fabric with fine drape',
      'Rangoli block print pattern',
      'Contrast piping & wooden buttons',
      'Side slits for easy movement',
    ],
    images: ['/images/Ethnic Kurti/Kurti-2.jpeg'],
    featured: false,
    bestSeller: false,
    inStock: true,
    fabric: 'Rayon',
    occasion: ['Casual', 'Daily Wear', 'Festive'],
    colors: ['Multi-color', 'Cream'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'ethnic-kurti-3',
    name: 'Mogra Chanderi Straight Kurti',
    category: 'Ethnic Kurti',
    price: 3299,
    originalPrice: 4500,
    description:
      'Pure, ethereal, breathtaking. This straight-cut Chanderi kurti with mogra floral embroidery is the epitome of subtle luxury. Wear it to work, to weddings, to anywhere elegance is called for.',
    details: [
      'Pure Chanderi silk fabric',
      'Mogra floral embroidery',
      'Straight silhouette with slit',
      'Breathable & skin-friendly',
      'Pairs beautifully with churidar',
    ],
    images: ['/images/Ethnic Kurti/Kurti-3.jpeg'],
    featured: true,
    bestSeller: false,
    inStock: true,
    fabric: 'Chanderi Silk',
    occasion: ['Office', 'Festive', 'Semi-formal'],
    colors: ['Ivory', 'Gold'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'Premium',
  },
  {
    id: 'ethnic-kurti-4',
    name: 'Shahi Collar Kurta',
    category: 'Ethnic Kurti',
    price: 2799,
    originalPrice: 3800,
    description:
      'Regal detailing meets everyday comfort. The mandarin collar, pintuck detailing, and contrast embroidery make this kurta stand apart. Dress it up or down — it works every time.',
    details: [
      'Premium cotton fabric',
      'Mandarin collar design',
      'Pintuck front detailing',
      'Contrast cuff embroidery',
      'Machine washable',
    ],
    images: [
      '/images/Ethnic Kurti/Kurti-4-Front.jpeg',
      '/images/Ethnic Kurti/Kurti-4-Back.jpeg',
    ],
    featured: false,
    bestSeller: true,
    inStock: true,
    fabric: 'Premium Cotton',
    occasion: ['Office', 'Casual', 'Puja'],
    colors: ['Blue', 'White'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'ethnic-kurti-5',
    name: 'Gulabi Embroidered Tunic',
    category: 'Ethnic Kurti',
    price: 2199,
    originalPrice: 3000,
    description:
      'Soft as petals, beautiful as blooms. This gulabi (pink) tunic features all-over floral embroidery on soft georgette. Perfect for the woman who finds beauty in gentle details.',
    details: [
      'Soft georgette fabric',
      'All-over floral embroidery',
      'A-line silhouette',
      'Comfortable & breathable',
    ],
    images: [
      '/images/Ethnic Kurti/Kurti-5-Front.jpeg',
      '/images/Ethnic Kurti/Kurti-5-Back.jpeg',
    ],
    featured: false,
    bestSeller: false,
    inStock: true,
    fabric: 'Georgette',
    occasion: ['Casual', 'Festival', 'Daily Wear'],
    colors: ['Pink', 'Gold'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'ethnic-kurti-6',
    name: 'Royal Chikankari Kurti',
    category: 'Ethnic Kurti',
    price: 3799,
    originalPrice: 5000,
    description:
      'A tribute to Lucknow\'s legendary craft. This chikankari kurti is hand-embroidered by skilled artisans on fine cotton voile. Lightweight, elegant, and utterly timeless.',
    details: [
      'Fine cotton voile fabric',
      'Hand-done chikankari embroidery',
      'Straight cut with side slits',
      'Breathable summer-friendly fabric',
      'Artisan crafted — limited pieces',
    ],
    images: [
      '/images/Ethnic Kurti/Kurti-6-Front.jpeg',
      '/images/Ethnic Kurti/kurti-6-Back.jpeg',
    ],
    featured: true,
    bestSeller: true,
    inStock: true,
    fabric: 'Cotton Voile',
    occasion: ['Casual', 'Summer', 'Festival', 'Daily Wear'],
    colors: ['White', 'Ivory'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'Artisan Pick',
  },

  // ── INDO WESTERN ───────────────────────────────────────────────────────────
  {
    id: 'indo-western-1',
    name: 'Fusion Dhoti Pant Co-ord Set',
    category: 'Indo Western',
    price: 5499,
    originalPrice: 7000,
    description:
      'Where East meets West in perfect harmony. This contemporary co-ord set pairs a structured crop top with dhoti-style pants — delivering maximum impact with minimum effort.',
    details: [
      'Co-ord set (top + dhoti pants)',
      'Structured crop top with embroidery',
      'Dhoti-style relaxed pants',
      'Premium crepe fabric',
      'Perfect for parties & events',
    ],
    images: [
      '/images/Indo Western/Indo-1-Front.jpeg',
      '/images/Indo Western/Indo-1-Back.jpeg',
    ],
    featured: true,
    bestSeller: true,
    inStock: true,
    fabric: 'Premium Crepe',
    occasion: ['Party', 'Cocktail', 'Festive'],
    colors: ['Black', 'Gold'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'Trending',
  },
  {
    id: 'indo-western-2',
    name: 'Cape Sleeve Kurta Set',
    category: 'Indo Western',
    price: 4799,
    originalPrice: 6500,
    description:
      'Drama, grace, and contemporary chic all in one ensemble. The flowy cape layer over the fitted kurta creates a silhouette that turns heads at every soirée.',
    details: [
      'Three-piece: kurta + cape + palazzo',
      'Georgette cape with border detail',
      'Fitted silk-blend kurta',
      'Wide-leg palazzo pants',
    ],
    images: [
      '/images/Indo Western/Indo-2-Front.jpeg',
      '/images/Indo Western/Indo-2-Back.jpeg',
    ],
    featured: false,
    bestSeller: true,
    inStock: true,
    fabric: 'Georgette & Silk Blend',
    occasion: ['Party', 'Reception', 'Evening'],
    colors: ['Burgundy', 'Gold'],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Hot Pick',
  },
  {
    id: 'indo-western-3',
    name: 'Layered Ruffle Kurta',
    category: 'Indo Western',
    price: 3999,
    originalPrice: 5500,
    description:
      'Feminine, bold, and effortlessly stylish. Cascading ruffle layers on a straight silhouette create movement and drama, making this the perfect ensemble for festive evenings.',
    details: [
      'Cascading ruffle layers',
      'Straight silhouette base',
      'Lightweight chiffon ruffles',
      'Belt included for definition',
    ],
    images: [
      '/images/Indo Western/Indo-3-Front.jpeg',
      '/images/Indo Western/Indo-3-Back.jpeg',
    ],
    featured: false,
    bestSeller: false,
    inStock: true,
    fabric: 'Chiffon & Rayon',
    occasion: ['Party', 'Festive', 'Casual Chic'],
    colors: ['Emerald', 'Silver'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'indo-western-4',
    name: 'High-Neck Embroidered Gown',
    category: 'Indo Western',
    price: 6999,
    originalPrice: 9000,
    description:
      'A floor-length masterpiece for your most important evenings. The high neck, subtle zari embroidery, and contemporary cut make this gown a conversation starter wherever you go.',
    details: [
      'Floor-length silhouette',
      'High neck with back keyhole',
      'Zari border embroidery',
      'Premium velvet bodice',
      'Flared georgette skirt',
    ],
    images: ['/images/Indo Western/Indo-4.jpeg'],
    featured: true,
    bestSeller: false,
    inStock: true,
    fabric: 'Velvet & Georgette',
    occasion: ['Reception', 'Cocktail', 'Formal Evening'],
    colors: ['Navy', 'Gold'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'Exclusive',
  },
  {
    id: 'indo-western-5',
    name: 'Blazer Kurta Fusion Set',
    category: 'Indo Western',
    price: 5999,
    originalPrice: 8000,
    description:
      'Redefining power dressing with Indian roots. This structured blazer-kurta fusion set commands attention in every boardroom and ballroom equally.',
    details: [
      'Structured structured blazer',
      'Fitted inner kurta',
      'Slim fit churidar',
      'Tone-on-tone embroidery',
    ],
    images: [
      '/images/Indo Western/Indo-5-Front.jpeg',
      '/images/Indo Western/Indo-5-Back.jpeg',
    ],
    featured: false,
    bestSeller: false,
    inStock: true,
    fabric: 'Brocade & Crepe',
    occasion: ['Office', 'Formal', 'Party'],
    colors: ['Champagne', 'Gold'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },

  // ── NAVRATRI ───────────────────────────────────────────────────────────────
  {
    id: 'navratri-1',
    name: 'Garba Nite Chaniya Choli',
    category: 'Navratri',
    price: 3499,
    originalPrice: 4800,
    description:
      'Dance the night away in our signature Garba Nite chaniya choli. Crafted in vibrant cotton with traditional mirror work and bandhani detailing — built to spin, twirl, and celebrate!',
    details: [
      'Traditional cotton chaniya choli',
      'Dense mirror work & sequins',
      'Bandhani pattern on choli',
      'Comfortable for all-night garba',
      'Matching dupatta included',
    ],
    images: [
      '/images/Navratri/Navratri-1-Front.jpeg',
      '/images/Navratri/Navratri-1-Back.jpeg',
    ],
    featured: true,
    bestSeller: true,
    inStock: true,
    fabric: 'Cotton with Mirror Work',
    occasion: ['Navratri', 'Garba', 'Dandiya', 'Festival'],
    colors: ['Red', 'Gold', 'Multi'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'Festival Special',
  },
  {
    id: 'navratri-2',
    name: 'Rani Rang Chaniya Choli',
    category: 'Navratri',
    price: 2999,
    originalPrice: 4200,
    description:
      'A festival-ready explosion of colour and craft. The Rani Rang chaniya choli features vibrant bandhej prints with gota patti detailing and a flared skirt that makes every spin magical.',
    details: [
      'Vibrant bandhej print',
      'Gota patti border work',
      'Wide flared skirt for dancing',
      'Comfortable inner lining',
      'Embroidered blouse piece included',
    ],
    images: [
      '/images/Navratri/Navratri-2-Front.jpeg',
      '/images/Navratri/Navratri-2-Back.jpeg',
    ],
    featured: false,
    bestSeller: false,
    inStock: true,
    fabric: 'Cotton Blend',
    occasion: ['Navratri', 'Garba', 'Festival'],
    colors: ['Turquoise', 'Orange', 'Gold'],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Festival Special',
  },
];

export const categories = [
  {
    id: 'bridal',
    name: 'Bridal',
    slug: 'bridal',
    description: 'Make your wedding day unforgettable',
    image: '/images/Bridal/bridal-1-front.jpeg',
    count: products.filter((p) => p.category === 'Bridal').length,
  },
  {
    id: 'lehenga-choli',
    name: 'Lehenga Choli',
    slug: 'lehenga-choli',
    description: 'Timeless elegance for every celebration',
    image: '/images/Lehenga Choli/Lehenga-1.jpeg',
    count: products.filter((p) => p.category === 'Lehenga Choli').length,
  },
  {
    id: 'ethnic-kurti',
    name: 'Ethnic Kurti',
    slug: 'ethnic-kurti',
    description: 'Effortless grace, every single day',
    image: '/images/Ethnic Kurti/Kurti-3.jpeg',
    count: products.filter((p) => p.category === 'Ethnic Kurti').length,
  },
  {
    id: 'indo-western',
    name: 'Indo Western',
    slug: 'indo-western',
    description: 'Where tradition meets contemporary',
    image: '/images/Indo Western/Indo-1-Front.jpeg',
    count: products.filter((p) => p.category === 'Indo Western').length,
  },
  {
    id: 'navratri',
    name: 'Navratri',
    slug: 'navratri',
    description: 'Dance, celebrate, dazzle',
    image: '/images/Navratri/Navratri-1-Front.jpeg',
    count: products.filter((p) => p.category === 'Navratri').length,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  const slug = category.toLowerCase().replace(/ /g, '-');
  return products.filter(
    (p) =>
      p.category.toLowerCase().replace(/ /g, '-') === slug ||
      p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.bestSeller);
}

export const WHATSAPP_NUMBER = '919876543210'; // Replace with real number
export const WHATSAPP_MESSAGE = (productName: string) =>
  encodeURIComponent(
    `Hi Swara! I'm interested in "${productName}". Could you please share more details, pricing, and availability?`
  );
