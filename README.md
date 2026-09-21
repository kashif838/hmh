# HMH General Trading — website

B2B site for HMH General Trading LLC, Dubai. Next.js 16 (App Router, TypeScript), Tailwind CSS 4, next-intl. Every page is statically generated; there is no e-commerce.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Copy `.env.example` to `.env.local` and fill in:

| Variable | Needed | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | **Production** | Delivers enquiries by email. Without it, forms show the visitor an error in production rather than dropping the lead. In development submissions are logged to the console. |
| `ENQUIRY_TO` / `ENQUIRY_FROM` | Optional | Recipient (defaults to hmhdubai26@gmail.com) and sender. The sender domain must be verified in Resend. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Optional | Cloudflare Turnstile on forms. A honeypot always runs. |
| `NEXT_PUBLIC_GA_ID` | Optional | GA4. Tracks `rfq_submit`, `partner_submit`, `contact_submit`, `tel_click`, `mailto_click`. |

## Where things live

```
content/        all site content, typed and Zod-validated at build time
  company.ts      facts, contact, vision and mission (from HMH's introduction letter)
  categories.ts   13 categories, homepage mosaic order and spans
  products.ts     Abu Koora + the 10 Boon varieties
  brands.ts       Boon, Abu Koora
  services.ts     capabilities, trade flow, private-label steps, service pages
  map-dots.ts     generated world dot matrix for the markets map
app/[locale]/   routes (English at /, Arabic at /ar/)
components/     Header, Footer, Sections (shared homepage blocks), ProductGallery, EnquiryForm, …
app/actions/    enquiry server action (validation, spam checks, email)
messages/       UI strings (en.json; ar.json mirrors English until Arabic content lands)
```

### Add a product

Add one record to `content/products.ts` and its images to `public/images/`. The route, metadata, sitemap entry, brand-page listing and related links are all generated from it. Fields left out are simply not rendered.

### Turn on Arabic

Translate `messages/ar.json` and the content files, then set `AR_LIVE = true` in `i18n/routing.ts`. That enables the header switch, hreflang pairs and indexing of `/ar/`. The layout is already right-to-left safe (logical CSS properties throughout); check pages with `/ar/` before launch.

## Design

The design is locked. Tokens (colour, type scale, motion) are in `app/globals.css`. Poppins only, no italics, white light sections, gold on near-black.
