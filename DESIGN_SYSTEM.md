# Houmaah Homepage Design System

This file is the implementation source of truth for the current React homepage and catalog experience. It reflects the attached `design.md` direction while keeping unconfirmed commercial details generic.

## Technical Stack

- Runtime: React with Vite.
- Routing: React Router owns Home, New In, Shop, Collections, Lookbook, and Our Story.
- Entry point: `index.html` mounts `src/main.jsx`.
- Shared layout: header, footer, newsletter, service strip, product card, and icon primitives live under `src/components`.
- Shared commercial/content data lives in `src/data.js`.
- Styling remains centralized in `styles.css` so the established Houmaah visual system stays consistent during the migration.
- Legacy static page documents have been removed; page changes should happen in React components under `src/pages`.
- Required utility routes are designed in React: Search, Bag, Checkout, Product Detail, Contact, FAQs, Size Guide, Shipping & Returns, Track Order, Privacy, and Terms.
- Legacy aliases such as `.html` URLs and common policy/support variants should redirect into the matching React route rather than receiving separate duplicated page files.
- Footer social links redirect to Lookbook until confirmed brand social URLs are available.
- Product detail pages include ecommerce confidence modules: gallery thumbnails, size selector, stock state, add/buy/wishlist actions, delivery badges, product details, care instructions, size chart, shipping/returns, reviews, and related products.
- The ecommerce flow is guest-only: product add, bag review, checkout, Cash on Delivery order confirmation. Do not introduce identity-gated customer surfaces unless the brand explicitly changes direction.
- Mantak-inspired missing surfaces are represented as Houmaah routes: Sale, Journal, Wishlist, and richer product detail sections. Keep their styling quiet, editorial, and aligned with the Houmaah design system rather than copying Mantak's visual treatment.

## Direction

Houmaah should feel like a modern fashion editorial that is easy to shop:

- Product first
- Warm white and ivory space
- Strong black typography
- Didot/Bodoni-style editorial headings
- Montserrat utility and body typography
- Square, restrained UI
- Thin rules, no heavy card shadows
- Gold only as a small accent
- Mobile-first product discovery

Homepage story order:

1. Emotion
2. Product
3. Brand
4. Product discovery
5. Lifestyle
6. Trust
7. Conversion

## Tokens

Runtime CSS tokens:

- `--color-black: #111111`
- `--color-ivory: #f3ede2`
- `--color-gold: #a9843a`
- `--color-white: #ffffff`
- `--color-warm-gray: #555555`
- `--border-subtle: rgba(17, 17, 17, 0.12)`
- `--border-strong: rgba(17, 17, 17, 0.28)`
- `--text-muted: rgba(17, 17, 17, 0.62)`
- `--surface-soft: rgba(243, 237, 226, 0.55)`
- `--container: 1280px`
- `--gutter: clamp(20px, 4.5vw, 64px)`
- `--ease: cubic-bezier(0.22, 1, 0.36, 1)`

## Typography

- Display: Didot-style fallback stack via `Playfair Display`, Didot, Bodoni, Georgia, serif.
- Body/UI: Montserrat, Helvetica Neue, Arial, sans-serif.
- Use serif type for H1, H2, H3, quotes, collection titles, and editorial statements.
- Use Montserrat for nav, buttons, labels, forms, prices, and body copy.
- Keep labels uppercase, small, and widely tracked.
- Avoid centered long paragraphs.

## Layout

- Desktop content width: `1280px`.
- Desktop outer gutter: up to `64px`.
- Mobile outer gutter: `20px`.
- Default homepage spacing: `76-112px` depending section intensity.
- Sections should be full-width bands or unframed editorial layouts.
- Do not nest cards inside cards.

## Header

- Announcement bar is a single line only.
- Header desktop: logo left, navigation center, utilities right.
- Desktop nav: New In, Shop, Collections, Lookbook, Our Story.
- Mobile: menu left, centered logo, search and bag right.
- Logo must remain at least `120px` wide.

## Buttons

- Primary buttons: black or white fill, square corners, `48px` minimum height.
- Secondary buttons: transparent with one-pixel black border.
- Text links use a fine underline and an SVG arrow mark.
- Newsletter and subscription submit controls use inline SVG arrows, never text arrows.
- Avoid pill buttons in this homepage system.

## Product Cards

- Product cards are quiet and image-led.
- Image ratio: `4 / 5`.
- Always show product name and price.
- Optional product label: New, Limited, Signature.
- Desktop quick add appears on hover/focus only.
- Mobile quick add is visible because hover does not exist.
- No ratings, oversized sale badges, or descriptive paragraphs inside cards.
- Product grid is four columns desktop and horizontal swipe on mobile with about 1.4 cards visible.

## Homepage Sections

- Hero: one campaign image, no carousel, minimal copy, and enough height to fill the first landing viewport with the header.
- Hero and Campaign Banner imagery must be right-composed fashion portraits: face visible, garment silhouette visible, warm neutral styling, and enough quieter space on the left for text overlays.
- Current canonical exports: Hero `4800 x 2800px`; Campaign Banner `4800 x 1920px`.
- New Arrivals: four products plus View All.
- Brand Philosophy: ivory split section with intimate detail image.
- Shop by Collection: three editorial image-led cards.
- Campaign Banner: image-led New Arrivals / Timeless Essentials section.
- Craft Details: three vertical image moments.
- Lookbook Preview: asymmetrical editorial grid.
- Quote: ivory pause section.
- Trust Strip: three simple service items with line icons, no cards.
- Social: curated static grid, not embedded plugin.
- Newsletter: large centered conversion block.
- Footer: black magazine-like close with logo, tagline, links, policies, socials, newsletter.
- Footer background and layout should span the full device width rather than sitting inside a constrained card-like wrapper.

## Listing Pages

- New In pages should feel like a refined boutique catalog, not a marketing landing page.
- Preferred order: announcement and header, compact quiet ivory page hero, horizontal category pills, filter/sort controls, product grid, one editorial image strip, service strip, footer.
- Listing heroes should stay low-height and minimal. Text-only is preferred unless an image adds clear shopping value.
- Product listing grids use four columns on desktop, two columns on tablet, and one column on small mobile.
- Listing controls remain restrained: thin borders, uppercase Montserrat labels, black active state, no heavy chips or colored badges.
- Product cards may include one short descriptor below the price, but should avoid long descriptions, ratings, sale clutter, or nested card surfaces.

## Shop Page

- Shop is the complete catalog route and should prioritize product comparison over campaign storytelling.
- Preferred order: compact listing hero, category strip, filter sidebar plus catalog toolbar, product grid, footer.
- Desktop filters use a left rail with thin separators. Tablet/mobile filters stack above results.
- Keep filter labels native and accessible with fieldsets, legends, checkboxes, and radio controls.
- Sort and product count should remain visible above the product grid.

## Collections Page

- Collections is a discovery route for shoppers choosing by wardrobe intention or occasion.
- Preferred order: compact listing hero, featured collection, collection index grid, seasonal callout, service strip, footer.
- Use image-led collection cards with concise purpose copy, item count, and clear navigation to Shop or New In.
- Avoid large marketing heroes; the page should quickly expose collection choices.
- Collection copy should describe use cases such as everyday, occasion, essentials, new season, and detail-led dressing.

## Lookbook Page

- Lookbook is the editorial route for mood, styling, and campaign discovery.
- Preferred order: compact editorial hero, asymmetric feature image, chapter cards, styling notes, campaign gallery, service strip, footer.
- Use larger image rhythm than listing pages, but keep copy concise and shoppable.
- CTAs should point toward Shop and Collections rather than creating product behavior.
- Lookbook imagery should show full styling, faces, garment movement, and warm neutral campaign direction.

## Our Story Page

- Our Story is the trust and philosophy route, paced more slowly than catalog pages.
- Preferred order: quiet brand hero, origin/philosophy split, value pillars, process timeline, brand note, newsletter, footer.
- Use ivory and white bands, serif statements, thin rules, and gold only for small dividers or labels.
- Keep commercial claims generic until confirmed by the brand.
- The page should explain Houmaah as effortless luxury: clean silhouettes, delicate detailing, and fabrics made to move with her.

## Imagery

- Use imagery that looks like it belongs to a women's fashion brand: editorial portraits, garment-forward styling, refined studio or warm neutral lifestyle settings.
- Avoid random scenery, detail-only photos for hero/banner placements, harsh color casts, dark stock-style crops, and images where the model's face is hidden when the section is meant to sell an emotional fashion moment.
- Full-width image sections should preserve the left copy zone and place the model or strongest garment read on the right on desktop.
- Mobile crops may center the model, but should still preserve the face, garment, and readable overlay text.

## Commercial Details Not To Invent

Keep these generic until the brand confirms them:

- Free shipping threshold
- Final return policy details
- Active Facebook / Pinterest presence
- Newsletter provider
- Product taxonomy
- Payment gateway
- Payment gateways, saved-customer systems, and gift-card support
