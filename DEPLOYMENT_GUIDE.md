# 🚀 Swara Ethnic Wear — Deployment Guide

## ✅ Build Status: VERIFIED (31 pages, 0 errors, 0 warnings)

---

## 📁 Complete Project Structure

```
Swara-Website/
├── public/
│   ├── images/                  ← All your product & shop images
│   │   ├── Bridal/
│   │   ├── Ethnic Kurti/
│   │   ├── Indo Western/
│   │   ├── Lehenga Choli/
│   │   ├── Navratri/
│   │   ├── Shop Images/
│   │   └── Logo.jpg
│   └── admin/
│       ├── index.html           ← Decap CMS admin panel
│       └── config.yml           ← CMS configuration
│
├── src/
│   ├── app/
│   │   ├── layout.tsx           ← Root layout + SEO
│   │   ├── globals.css          ← Global styles
│   │   ├── page.tsx             ← Home page
│   │   ├── about/page.tsx       ← About page
│   │   ├── contact/page.tsx     ← Contact page
│   │   ├── collections/
│   │   │   ├── page.tsx         ← All collections
│   │   │   └── [category]/      ← Category pages (5 routes)
│   │   └── product/[id]/        ← Product pages (19 routes)
│   │
│   ├── components/
│   │   ├── Navbar.tsx           ← Sticky navbar + dropdown
│   │   ├── Footer.tsx           ← Full footer
│   │   ├── HeroSection.tsx      ← Auto-sliding hero carousel
│   │   ├── FeaturedCollections.tsx
│   │   ├── BestSellers.tsx      ← Tabbed product grid
│   │   ├── OccasionSection.tsx  ← Shop by occasion
│   │   ├── TrustSection.tsx     ← Store photos + trust points
│   │   ├── TestimonialsSection.tsx
│   │   ├── InstagramGrid.tsx
│   │   ├── ProductCard.tsx      ← Card with image flip + WhatsApp
│   │   ├── ProductDetail.tsx    ← Full product detail page
│   │   ├── WhatsAppButton.tsx   ← Floating WhatsApp button
│   │   └── AnimatedSection.tsx  ← Framer Motion scroll animations
│   │
│   └── lib/
│       └── products.ts          ← All 19 products data
│
├── functions/
│   └── api/
│       ├── auth.js              ← Cloudflare Pages Function: OAuth start
│       └── callback.js          ← Cloudflare Pages Function: OAuth callback
│
├── content/
│   ├── products/                ← CMS-managed product files (Markdown)
│   ├── testimonials/            ← CMS-managed testimonials
│   └── settings/
│       └── business.json        ← Store info
│
├── _routes.json                 ← Cloudflare routing config
├── _headers                     ← Cloudflare caching headers
├── next.config.js               ← Static export config
├── tailwind.config.js
├── package.json
└── tsconfig.json
```

---

## 🚀 STEP 1: Push to GitHub

```bash
cd "C:/Users/Sandesh Jain/Downloads/Swara-Website"

# Initialize git repo
git init
git add .
git commit -m "🎉 Initial commit — Swara Ethnic Wear Website"

# Create a new GitHub repo named: swara-ethnic-wear
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/swara-ethnic-wear.git
git branch -M main
git push -u origin main
```

---

## 🌐 STEP 2: Deploy on Cloudflare Pages

1. Go to **https://dash.cloudflare.com**
2. Click **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Select your `swara-ethnic-wear` GitHub repository
4. Configure build settings:

| Setting | Value |
|---|---|
| **Framework preset** | Next.js (Static HTML Export) |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Root directory** | *(leave blank)* |
| **Node.js version** | `18` or `20` |

5. Click **Save and Deploy** ✅

---

## 🔐 STEP 3: Create GitHub OAuth App

1. Go to **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**
2. Fill in:
   - **Application name:** `Swara CMS`
   - **Homepage URL:** `https://YOUR_SITE.pages.dev`
   - **Authorization callback URL:** `https://YOUR_SITE.pages.dev/api/callback`
3. Click **Register application**
4. Copy the **Client ID** and generate a **Client Secret** — save both securely

---

## 🔑 STEP 4: Set Environment Variables in Cloudflare Pages

1. Go to **Cloudflare Pages → Your Project → Settings → Environment Variables**
2. Add these (for **Production**):

| Variable | Value |
|---|---|
| `GITHUB_CLIENT_ID` | *(paste your GitHub OAuth Client ID)* |
| `GITHUB_CLIENT_SECRET` | *(paste your GitHub OAuth Client Secret)* |

3. Click **Save** and **Redeploy**

---

## 🎛️ STEP 5: Update Decap CMS Config

Open `public/admin/config.yml` and replace the placeholders:

```yaml
backend:
  name: github
  repo: YOUR_GITHUB_USERNAME/swara-ethnic-wear    # ← Your actual GitHub username/repo
  branch: main
  base_url: https://YOUR_SITE.pages.dev           # ← Your actual Cloudflare Pages URL
  auth_endpoint: /api/auth
```

Commit and push this change:
```bash
git add public/admin/config.yml
git commit -m "Configure CMS with production URLs"
git push
```

---

## 📝 STEP 6: Use the CMS Admin Panel

1. Visit: `https://YOUR_SITE.pages.dev/admin`
2. Click **"Login with GitHub"**
3. Authorize the OAuth app on GitHub
4. You'll be redirected back as an authenticated admin ✅

### What you can do in the CMS:
- ➕ **Add products** with images, price, details, sizes
- ✏️ **Edit existing** products, badges, descriptions
- 🗑️ **Delete products**
- ⭐ **Add testimonials**
- 🏢 **Update store info** (phone, address, hours)

Every save creates a **Git commit** → triggers a **Cloudflare Pages rebuild** → live in ~60 seconds!

---

## 📱 STEP 7: Update WhatsApp Number

In `src/lib/products.ts`, find and replace:
```ts
export const WHATSAPP_NUMBER = '919876543210';
// Replace with actual number: country code + number, no spaces or +
// Example for +91 98765 43210: '919876543210'
```

---

## 🔄 OAuth Flow Explanation

```
User visits /admin
    ↓
Decap CMS loads → shows "Login with GitHub"
    ↓
User clicks login → CMS requests /api/auth?provider=github
    ↓
/functions/api/auth.js builds GitHub OAuth URL → redirects user to GitHub
    ↓
User authorizes on GitHub → GitHub redirects to /api/callback?code=xxx
    ↓
/functions/api/callback.js exchanges code for access token (server-side, secret safe)
    ↓
Callback page sends postMessage with token → CMS receives it
    ↓
CMS is authenticated ✅ → User can manage content
    ↓
Content changes commit to GitHub → Cloudflare Pages rebuilds → Live!
```

---

## 🎨 Design Features

| Feature | Implementation |
|---|---|
| **Auto Hero Slideshow** | Framer Motion + 4 slides with your real images |
| **Glassmorphism Cards** | `backdrop-blur` + `bg-white/10` with gold borders |
| **Scroll Animations** | `useInView` Framer Motion, smooth fade-up on scroll |
| **Product Image Flip** | Hover shows back image automatically |
| **WhatsApp Integration** | Floating button + per-product enquiry links |
| **Warm Color Palette** | Brand brown `#5C2D0E`, amber `#C47B3A`, gold `#D4A017` |
| **Premium Typography** | Cormorant Garamond (headings) + Jost (body) |
| **Mobile-First** | Responsive grid, collapsible navbar, touch-optimized |
| **SEO Ready** | Metadata, OG tags, structured data on every page |

---

## 📊 Pages Generated (31 Total)

| Page | Route |
|---|---|
| Home | `/` |
| Collections | `/collections` |
| Bridal | `/collections/bridal` |
| Lehenga Choli | `/collections/lehenga-choli` |
| Ethnic Kurti | `/collections/ethnic-kurti` |
| Indo Western | `/collections/indo-western` |
| Navratri | `/collections/navratri` |
| About | `/about` |
| Contact | `/contact` |
| Admin CMS | `/admin` |
| Product pages | `/product/[19 products]` |
| 404 | `/_not-found` |

---

## ⚡ Performance Notes

- **Static export**: All pages pre-built = instant load
- **Image lazy loading**: Native Next.js lazy loading on all images
- **Font preloading**: Google Fonts preconnect in head
- **Cache headers**: 1-year cache for images + static assets
- **No external DB**: Zero cold-start, zero runtime cost

---

*Built with ❤️ for Swara Ethnic Wear — India's premium ethnic fashion brand*
