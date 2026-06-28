# Captured Tracks Framework Reference

Structural blueprint for Super Evil website (crawled June 2026).

## Platform

| Layer | CT | Super Evil |
|-------|-----|------------|
| Marketing | Custom CMS | Next.js 15 + Sanity |
| Store | Ochre (`store.capturedtracks.com`) | Unified `/store` + Stripe |
| Fonts | GT Walsheim | Shrikhand (display) + Inter (body) |
| Newsletter | ActiveCampaign | Klaviyo/Mailchimp API |
| Analytics | GA4 + Meta Pixel | GA4 + Meta Pixel |

## Global Chrome

- Sticky header: Logo | News · Artists · Tour · Store · About/FAQ | social icons
- Footer: logo, socials, copyright
- Fixed `↑ Back To Top` on long pages

## Sitemap

| CT URL | Super Evil |
|--------|------------|
| `/` | `/` |
| `/news/` | `/news` |
| `/{slug}/` | `/news/[slug]` |
| `/artists/` | `/artists` |
| `/artists/roster/` | `/artists/roster` |
| `/artist/{slug}/` | `/artists/[slug]` |
| `/tour/` | `/tour` |
| `/about/` | `/about` + `/contact` |
| store subdomain | `/store`, `/store/[slug]`, `/cart`, `/checkout` |

## Page Modules

### Home
1. HeroReleaseCarousel
2. LatestNews (6 cards)
3. RecentReleases carousel
4. JoinMailingList
5. Footer

### Artist Detail
1. GalleryCarousel
2. ArtistBio
3. ContactBlock
4. StoreReleases carousel
5. ArtistNews
6. TourWidget
7. Audio (Spotify)
8. Videos

### Tour
- Per-artist sections with ShowRow: date · venue · city · RSVP · Tickets
- Super Evil adds artist/city/month filters

### Store (Ochre-inspired)
- Category tabs, product grid, PDP with variants, audio demos, related items

## Component Map

| Component | File |
|-----------|------|
| Header/Nav | `components/layout/Header.tsx`, `Nav.tsx` |
| SocialLinks | `components/layout/SocialLinks.tsx` |
| HeroCarousel | `components/home/HeroCarousel.tsx` |
| NewsCard | `components/news/NewsCard.tsx` |
| ReleaseCarousel | `components/releases/ReleaseCarousel.tsx` |
| NewsletterForm | `components/forms/NewsletterForm.tsx` |
| ArtistGridTile | `components/artists/ArtistGridTile.tsx` |
| GalleryCarousel | `components/artists/GalleryCarousel.tsx` |
| ShowRow | `components/tour/ShowRow.tsx` |
| ProductCard | `components/store/ProductCard.tsx` |
| BackToTop | `components/layout/BackToTop.tsx` |
