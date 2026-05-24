<br># Astik Tripathi — Portfolio V2

A cinematic, dark-themed developer portfolio built with **Next.js 16**, **Framer Motion**, and **Tailwind CSS**. Designed to feel like a futuristic operating system interface — minimal, immersive, and technically sharp.

<br>

## ✦ Live

| Platform | URL |
|---|---|
| **Netlify** | _[your-netlify-url]_ |
| **Cloudflare Pages** | _[your-cloudflare-url]_ |

<br>

## ✦ Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Static Export) |
| Language | TypeScript |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |
| Animation | [Framer Motion 11](https://www.framer.com/motion/) |
| Scroll | [Lenis](https://github.com/darkroomengineering/lenis) (smooth scroll) |
| Particles | [OGL](https://github.com/oframe/ogl) (WebGL particle field) |
| Icons | [Lucide React](https://lucide.dev/) |
| Typography | Syne / DM Sans / JetBrains Mono (Google Fonts) |

<br>

## ✦ Features

### Design System
- **Monochrome dark palette** — `#050505` to `#F5F7FA`, no bright neon
- **Glassmorphism cards** with layered radial gradients and subtle borders
- **Custom cursor** with glow trail
- **Noise texture overlay** for cinematic grain
- **Parallax starfield** (pure CSS, multi-layer drift)

### Sections
- **Hero** — Typewriter role animation, parallax text, CTA buttons
- **About** — Cinematic `SystemAvatar` with orbit rings, drifting particles, breathing glow, scanline shimmer, and mouse parallax
- **Skills** — Animated `SkillOrb` cards with progress bars and icon integration
- **Projects** — Filterable project grid with scanline/shimmer card effects
- **Timeline** — Vertical alternating timeline with pulse-dot markers
- **Education** — Academic credentials card
- **Contact** — Form, quick-copy actions, social links, and live status indicator

### Interactive Elements
- **Fake Terminal** (`Ctrl + Backtick`) — 15+ commands including `neofetch`, `matrix`, `hack`, `skills`, `projects`, `whoami`, easter eggs, and more
- **Section Dividers** — Gradient lines with animated sparkle particles
- **Global Particles** — Full-viewport WebGL particle background with scroll parallax
- **Mouse Parallax** — Spring-physics cursor tracking on hero and avatar

### System Avatar (`SystemAvatar.tsx`)
- Cinematic developer silhouette with rim lighting
- 3 concentric orbit rings rotating at different speeds
- 12 slowly drifting ambient particles
- Breathing radial glow (4.5s cycle)
- Scanline shimmer on hover
- HUD micro-labels: `SIGNAL ACTIVE`, `NODE 01`, `AI SYSTEMS`, `ASTIK//ID`
- Multi-layer mouse parallax (inner/outer depth multipliers)

<br>

## ✦ Project Structure

```
portfolio/
├── app/
│   ├── globals.css          # Design system, animations, keyframes
│   ├── layout.tsx           # Root layout with font loading
│   ├── page.tsx             # Entry point
│   └── not-found.tsx        # 404 page
├── components/
│   ├── PortfolioApp.tsx     # Main app shell (all sections)
│   ├── SystemAvatar.tsx     # Cinematic avatar module
│   ├── FakeTerminal.tsx     # Interactive terminal easter egg
│   ├── Particles.tsx        # WebGL particle field (OGL)
│   ├── SkillOrb.tsx         # Skill card with progress animation
│   ├── ProjectCard.tsx      # Project display card
│   ├── SectionShell.tsx     # Reusable section wrapper
│   ├── SectionDivider.tsx   # Sparkle divider between sections
│   ├── CustomCursor.tsx     # Custom glow cursor
│   └── ParallaxStars.tsx    # CSS starfield layers
├── hooks/
│   ├── useLenisScroll.ts    # Smooth scroll initialization
│   └── useMouseParallax.ts  # Spring-physics mouse tracking
├── lib/
│   └── utils.ts             # cn() utility (clsx + tailwind-merge)
├── public/
│   └── assets/
│       ├── resume.pdf
│       └── developer-silhouette.png
├── tailwind.config.ts       # Color tokens, fonts, custom animations
├── next.config.mjs          # Static export configuration
├── netlify.toml             # Netlify deployment config
└── package.json
```

<br>

## ✦ Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10

### Install & Run

```bash
# Clone the repo
git clone https://github.com/astik-t/Portfolio-V2.git
cd Portfolio-V2

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Production build (static export → out/)
npm run build
```

<br>

## ✦ Deployment

### Netlify

Already configured via `netlify.toml`. Just connect your GitHub repo in the Netlify dashboard — zero config needed.

### Cloudflare Pages

1. Connect your repo in the Cloudflare Pages dashboard
2. Set these build settings:

| Setting | Value |
|---|---|
| Framework preset | `None` |
| Build command | `npm run build` |
| Build output directory | `out` |

3. Deploy — done.

<br>

## ✦ Color Palette

| Token | Hex | Usage |
|---|---|---|
| `bg` | `#050505` | Page background |
| `surface` | `rgba(255,255,255,0.035)` | Card backgrounds |
| `primary` | `#E6E6E6` | Primary buttons, CTAs |
| `accent` | `#BDBDBD` | Highlights, active states |
| `text` | `#F5F7FA` | Body text |
| `muted` | `#9CA3AF` | Secondary text, labels |
| `danger` | `#F2F2F2` | Resume button accent |

<br>

## ✦ Typography

| Role | Font | Weight |
|---|---|---|
| Headings | **Syne** | 400–800 |
| Body | **DM Sans** | 300–700 |
| Mono / Code | **JetBrains Mono** | Variable |

<br>

## ✦ Terminal Commands

Press `Ctrl + Backtick` to open the terminal. Available commands:

```
help          Show all commands
whoami        Developer identity
skills        Technical skills overview
projects      Project list
education     Academic info
contact       Contact details
neofetch      System info display
clear         Clear terminal
theme         Toggle theme info
hack          Fake hacking animation
matrix        Matrix rain effect
history       Command history
echo [text]   Print text
date          Current date/time
resume        Open resume PDF
```

<br>

## ✦ License

This is a personal portfolio project. Feel free to use it as inspiration, but please don't copy it wholesale. If you build something from it, credit is appreciated.

<br>

---

<p align="center">
  <sub>Built with Next.js, Framer Motion, Tailwind, Lenis, and a lot of late-night iteration.</sub>
</p>
