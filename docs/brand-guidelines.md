# NerdLogic Brand Guidelines

Developer and AI reference for the marketing site. Derived from **ADH Brand Guideline Final - Blue**.

## Logo

Official mark extracted from `nerd logo illustraion.ai` (Illustrator / PDF):

| Asset | Path |
|-------|------|
| React mark | `src/components/logo-mark.tsx` |
| SVG | `public/assets/nerdlogic-mark.svg` |
| Full logo UI | `src/components/logo.tsx` (`showMark`, optional `href={null}`) |

Mark is white (`currentColor`) geometric “N” ribbon: left stem + rounded top-right arch + right foot.

**On color fields (guideline p.3):** white mark on Primary / Deep / Charcoal / Gradient; Deep Blue mark on White; Deep Blue mark on Light Blue.

---

## Color (Brand Guideline p.3)

| Name | HEX | RGB | CMYK | Pantone | Meaning / use |
|------|-----|-----|------|---------|----------------|
| **Primary Blue** | `#0066E6` | `0, 102, 230` | `100, 56, 0, 10` | **285 C** | Innovation · Trust · Technology — primary brand / CTAs / Aurora |
| **Light Blue** | `#6BB6FF` | `107, 182, 255` | `58, 18, 0, 0` | **2905 C** | Highlights, soft accents, focus rings |
| **Deep Blue** | `#003DA5` | `0, 61, 165` | `100, 63, 0, 35` | **293 C** | Depth, gradients, dark UI accents |
| **Charcoal Gray** | `#2B2B2A` | `43, 43, 42` | `0, 0, 2, 83` | **Cool Gray 11 C** | Professionalism · Stability — secondary surfaces |
| **White** | `#FFFFFF` | `255, 255, 255` | `0, 0, 0, 0` | — | Clarity · Simplicity — type on dark / mark on blue |
| **Gradient** | `#0066E6` → `#003DA5` → black | — | — | — | Hero / packaging / Coming Soon Aurora + pattern |

### CSS tokens

Defined in `src/app/globals.css`:

- `--brand-primary` → `#0066E6`
- `--brand-light` → `#6BB6FF`
- `--brand-deep` → `#003DA5`
- `--brand-charcoal` → `#2B2B2A`
- `--brand-white` → `#FFFFFF`
- `--accent` / `--primary` map to Primary Blue
- Site canvas background remains OLED `#000000` for digital product UI

Avoid purple / violet “AI defaults.” Prefer this blue system only.

---

## Typography

### Headlines — Surgena Sans Serif

- Self-hosted: `src/fonts/Surgena-SemiBold.ttf` → CSS var `--font-surgena`
- Use for display headlines, section titles, and the **NerdLogic** wordmark via `.font-display` / `h1–h6`
- Fallback: `"Surgena", system-ui`
- Designer: Digitype Studio ([Surgena Font Family](https://digitypestudio.com/surgena-font-family/))
- Note: current file is the personal-use demo weight. For production / commercial shipping, purchase a webfont license and drop Regular/Medium/Bold files into `src/fonts/`.

### Body — Mona Sans

- Self-hosted variable font: `src/fonts/MonaSansVF.woff2` (OFL: `src/fonts/OFL.txt`)
- Loaded as `--font-mona-sans`

| Style | Weight | Tailwind |
|-------|--------|----------|
| Text Light | 300 | `font-light` |
| Text Medium | 500 | `font-medium` (body default) |
| Text SemiBold | 600 | `font-semibold` |

---

## Pattern

Inspired by the curved edges of the ADH / NerdLogic logo geometry.

### Construction

1. **Top bar** — horizontal rectangle, **only top-right corner** heavily rounded.
2. **Bottom bar** — same proportions, **only bottom-left corner** heavily rounded, **offset to the right** (staggered stack with a small vertical gap).

### Versions

| Version | Component prop | Fill | Recommended use |
|---------|----------------|------|-----------------|
| 01 | `variant="gradient"` | Primary → Deep → black | Heroes, Coming Soon, presentations |
| 02 | `variant="solid"` | Solid `#0066E6` | Digital UI backgrounds, layered compositions |
| 03 | `variant="outline"` | Stroke `#0066E6` | Subtle branding, textures, stationery |

File: `src/components/brand-pattern.tsx`.

---

## Motion / Aurora

Coming Soon uses **react-bits Aurora** (`src/components/Aurora.jsx`) with brand stops:

```tsx
colorStops={["#0066E6", "#6BB6FF", "#003DA5"]}
```

Install / refresh: `npx shadcn@latest add @react-bits/Aurora-JS-CSS`

Honor `prefers-reduced-motion` (static gradient fallback).

---

## Coming Soon mode

| Item | Detail |
|------|--------|
| Env | `COMING_SOON=true` in `.env.local` / Vercel |
| Proxy | `src/proxy.ts` |
| Page | `/coming-soon` → `src/components/coming-soon.tsx` |
| Layout | Skips `SiteShell` when gate is active |

When disabled, `/coming-soon` redirects home.

---

## Product UI notes

- Logo mark + wordmark via `Logo` / `LogoMark`
- Motion: 150–300ms interactions; longer ambient drifts OK; honor reduced motion
- Touch targets ≥ 44px; focus rings use Light Blue `#6BB6FF`
