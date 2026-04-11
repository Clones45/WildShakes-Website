# 🥤 Wildshakes Cafe — Premium Website

A premium, fully responsive multi-page website for **Wildshakes Cafe** — Philippines' fastest-growing signature shake café brand.

## 🚀 Getting Started

```bash
# Install (optional — only needed for dev server)
npm install

# Run local dev server with live reload
npm run dev

# Or preview with static file server
npm run preview
```

Then open `http://localhost:3000` in your browser.

## 📁 Project Structure

```
WildShakes2/
├── index.html          # Home page
├── menu.html           # Interactive menu (Shakes / Coffee / Food)
├── experience.html     # Gallery + Brand Story
├── contact.html        # Franchise inquiry & contact
├── 404.html            # Custom 404 error page
├── style.css           # Global design system
├── app.js              # Shared JS (cookie consent, back-to-top, etc.)
├── vercel.json         # Vercel deployment config
├── robots.txt          # SEO
├── sitemap.xml         # SEO sitemap
└── assets/
    ├── 69bfaf...jpeg   # Brand logo
    ├── Coffee/         # Coffee product photography
    ├── Food/           # Food product photography
    ├── Shakes/
    │   ├── Premium Milk Shakes/
    │   └── Premium Fruit shakes/
    ├── Wild/           # Cafe ambiance & lifestyle
    └── Contact Photos/ # Franchise marketing images
```

## 🌟 Features

- **Glassmorphism sticky navbar** with mobile drawer
- **Cinematic hero** with parallax zoom + staggered text animations
- **Animated stat counters** using IntersectionObserver
- **Auto-scrolling testimonial marquee**
- **Tabbed interactive menu** with live search filtering
- **Filterable masonry gallery** with full lightbox (keyboard navigable)
- **Franchise inquiry form** with animated submit state
- **WhatsApp floating CTA** button
- **Back to top** smooth scroll button
- **Cookie consent banner** (GDPR-style)
- **Scroll-triggered reveal animations** on all sections
- **Custom 404 page**
- **Open Graph / Twitter Card meta tags**
- **JSON-LD structured data** (Restaurant schema)
- **Fully responsive** — mobile / tablet / desktop

## 🚀 Deploy to Vercel

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Leave all settings as default (no build command needed)
5. Click **Deploy** ✅

The `vercel.json` automatically gives you clean URLs:
- `/` → Home
- `/menu` → Menu
- `/experience` → The Wild Experience
- `/contact` → Franchise & Contact

## 🎨 Design System

| Token | Value |
|---|---|
| Deep Green | `#2D5A27` |
| Mid Green | `#4F7942` |
| Light Green | `#D6EFB6` |
| Cream | `#F9F5EC` |
| Gold | `#C9A84C` |
| Black | `#121212` |

**Fonts:** Playfair Display (headings) · Inter (body) · Cormorant Garamond (accents)

## 📄 License

All rights reserved © 2025 Wildshakes Cafe.
