# Kunal's Premium 3D Portfolio

> Awwwards-level developer portfolio built with Next.js 14, React Three Fiber, Framer Motion, and GSAP.

![Portfolio Preview](./public/og-image.png)

---

## ✨ Features

- **Full 3D Hero Scene** — React Three Fiber with floating orb, particle disk, and animated code cubes
- **Interactive Skill Sphere** — Three.js word cloud that orbits and responds to drag
- **Glassmorphism Design** — Frosted glass cards with neon cyan / violet accents
- **Smooth Scroll** — Lenis smooth scrolling with custom easing
- **Custom Cursor** — Animated dot + ring that reacts to interactive elements
- **Typewriter Effect** — Rotating role titles in the hero
- **Section Animations** — Framer Motion scroll-triggered reveals throughout
- **Contact Form** — API route wired to Resend (or console log in dev)
- **Fully Responsive** — Mobile-first, works perfectly on all screen sizes
- **Lighthouse 90+** — Lazy-loaded 3D, optimized fonts, `next/image`
- **SEO Ready** — Full Open Graph, Twitter Card, and JSON-LD metadata

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Home page — assembles all sections
│   └── api/
│       └── contact/
│           └── route.ts    # Contact form email API
├── components/
│   ├── 3d/
│   │   ├── ParticleBackground.tsx   # Global ambient particles
│   │   ├── HeroScene.tsx            # Hero 3D orb + floating cubes
│   │   └── SkillSphere.tsx          # Skills word-cloud sphere
│   ├── layout/
│   │   ├── Navigation.tsx           # Sticky nav with scroll spy
│   │   ├── Footer.tsx               # Footer with links
│   │   └── SmoothScrollProvider.tsx # Lenis wrapper
│   ├── sections/
│   │   ├── HeroSection.tsx          # Full-screen hero
│   │   ├── AboutSection.tsx         # Timeline + stats + skill bars
│   │   ├── SkillsSection.tsx        # 3D sphere + skill bars + badges
│   │   ├── ProjectsSection.tsx      # Filterable 3D project cards
│   │   ├── ExperienceSection.tsx    # Vertical timeline
│   │   ├── AchievementsSection.tsx  # Hackathons, certs, OSS
│   │   └── ContactSection.tsx       # Form + socials
│   └── ui/
│       └── CustomCursor.tsx         # Animated cursor
├── lib/
│   └── utils.ts            # cn() utility
└── styles/
    └── globals.css          # Tailwind base + custom design tokens
```

---

## 🚀 Getting Started

### 1. Clone & install

```bash
git clone https://github.com/devkunal2812/portfolio-v2
cd portfolio-v2
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 3. Run development server

```bash
npm run dev
# → http://localhost:3000
```

### 4. Build for production

```bash
npm run build
npm start
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments.

**Set environment variables in Vercel Dashboard:**
- `RESEND_API_KEY` — from resend.com
- `CONTACT_EMAIL` — your email
- `NEXT_PUBLIC_SITE_URL` — your domain

### Custom Domain

1. In Vercel → Project Settings → Domains → Add `kunalbuilds.me`
2. Update your DNS (CNAME → `cname.vercel-dns.com`)

---

## 🎨 Customisation Guide

### Personal Information

Update your data in these files:

| File | What to update |
|------|---------------|
| `src/app/layout.tsx` | Name, description, OG metadata |
| `src/components/sections/HeroSection.tsx` | Headline, roles, social links |
| `src/components/sections/AboutSection.tsx` | Bio, stats, timeline events |
| `src/components/sections/SkillsSection.tsx` | Skill names and levels |
| `src/components/sections/ProjectsSection.tsx` | Project cards (title, description, links, tech) |
| `src/components/sections/ExperienceSection.tsx` | Work history |
| `src/components/sections/AchievementsSection.tsx` | Hackathons, certs, OSS |
| `src/components/sections/ContactSection.tsx` | Email, social handles |
| `src/components/layout/Footer.tsx` | Footer links |

### Colours

Edit `tailwind.config.js` → `theme.extend.colors`:

```js
accent: {
  cyan: '#00d4ff',    // Primary neon accent
  violet: '#7c3aed',  // Secondary accent
  emerald: '#10b981', // Success / available
  amber: '#f59e0b',   // Warning / highlights
},
```

### Resume

Place your resume PDF at `public/resume.pdf`.

---

## 📧 Contact Form Setup (Resend)

1. Sign up at [resend.com](https://resend.com) (free — 3,000 emails/month)
2. Create an API key
3. Add `RESEND_API_KEY=re_xxx` to `.env.local`
4. Add `CONTACT_EMAIL=your@email.com` to `.env.local`
5. Verify your domain in Resend dashboard

---

## ⚡ Performance Tips

- 3D scenes use `dpr={[1, 1.5]}` — capped for performance
- All Three.js components are `dynamic` imported with `ssr: false`
- Fonts loaded via `next/font/google` with `display: swap`
- Images should use `next/image` with `priority` on hero images
- `ParticleBackground` particle count reduced on mobile via CSS media queries

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| 3D | React Three Fiber + Three.js + Drei |
| Animation | Framer Motion + GSAP |
| Scroll | Lenis |
| Email | Resend |
| Fonts | Inter + JetBrains Mono + Space Grotesk |
| Deployment | Vercel |

---

## 📄 License

MIT © Kunal — feel free to use as inspiration with attribution.
