# Strawberries

A marketing site and shop for **Strawberries**, a small (imaginary) farm that ships fresh-picked strawberry boxes. Built in React from a high-fidelity design handoff, with the design system's primitives ported into typed components.

**Screens:** Home · Shop · Our field · Pick-your-own (slot booking) · Farm shop · Basket · Checkout · Order confirmation

## Stack

- **Vite + React 18 + TypeScript** (strict)
- **React Router 6** for routes: `/`, `/shop`, `/field`, `/pick`, `/farm-shop`, `/basket`, `/checkout`, `/order/:id`
- **SCSS + CSS Modules**:
  - Design tokens are CSS custom properties in `src/styles/tokens/`.
  - Component styles are nested partials in `src/styles/components/`.
  - Page layout lives in co-located `.module.scss` files.
  - Font sizes are in `rem`, written as `rem(14px)` via `src/styles/_functions.scss`, so text scales with the visitor's browser setting.
- **lucide-react** icons at 2px stroke

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve the build
```

## Structure

```
src/
  components/   Design-system primitives: Button, IconButton, Input, Select, Checkbox,
                Radio, Switch, Card, Badge, Tag, Tabs, Dialog, Toast, Tooltip,
                Strawberry, Subheader, Stripes
  site/         Site chrome + shared pieces: Header, Footer, Layout, BoxCard, OrderSummary, Photo
  screens/      One file per route
  state/        Basket / frequency / favourites / toast / last order (React context)
  data/         Product catalogue
  lib/          Money + totals, local-date helpers, safe storage
  styles/       Tokens, component partials (sb-*), base + app globals (SCSS)
```

## Details worth a look

- **Matches the prototype within 1–2px** at 1280px wide on every page (checked by measuring element boxes side by side), then extends it with responsive breakpoints and a mobile menu.
- **Persistent basket.** The basket, delivery frequency and favourites survive a refresh (`localStorage`), and the last order survives a reload of its confirmation page (`sessionStorage`).
- **Totals:** a 10% weekly discount, plus free delivery once the discounted subtotal reaches $30 (otherwise $4.50), with a nudge showing how much more to add.
- **Forms:** inline, friendly validation. Focus moves to the first invalid field. Card number and expiry are auto-formatted, and dates are computed from today (delivery from tomorrow; pick-your-own on the next Saturday).
- **Accessibility:**
  - A skip link, and focus moves to `<main>` on navigation.
  - Labelled icon buttons, and keyboard-reachable interactive cards.
  - `aria-invalid` and `aria-describedby` on fields with errors.
  - Live regions for the toast and the shop result count.
  - Respects `prefers-reduced-motion`.
- **Shareable shop filters.** `/shop?kind=jam` deep-links to a tab, and the footer uses it.

## Notes

- All photography is a striped placeholder (`site/Photo.tsx`), and the farm's address, phone and hours are made up.
- Checkout is a demo: no payment is taken, and the page says so.
- Fonts: Libre Caslon Text, Figtree and DM Mono, loaded from Google Fonts.
- Deploying under a sub-path (e.g. GitHub Pages)? Set `base` in `vite.config.ts`; the router picks it up automatically. Static hosts need an SPA fallback to `index.html`.
