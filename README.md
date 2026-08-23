# Elison's World

**Experimental artist website template built with Elison as the first case study.**

Elison's World explores how an artist's music, visuals, story, releases, press materials, and fan connection can live inside one immersive web experience. I used my own artist identity as the first subject so the project could function as both a real site and a reusable creative/technical template for other artists.

**Live site:** https://elisonworld.com

## What this project explores

- Artist storytelling through interactive web design
- Music and release discovery inside a single experience
- Motion and visual direction using GSAP
- Three.js-backed visual experiments
- Search/crawl-friendly prerendering for a React SPA
- Accessibility and performance checks before production
- Reusable content architecture for artist sites and EPKs

## Stack

- Vite
- React 19
- TypeScript
- Tailwind CSS
- GSAP
- Three.js
- Playwright + axe-core
- Lighthouse
- Vercel Analytics

## Product structure

The site is organized around the core surfaces an artist needs online:

- Hero / artist identity
- Story
- Music and releases
- Gallery
- Fan connection / newsletter
- Release-specific pages
- EPK
- SEO and crawl metadata

## Engineering decisions

### Prerender a highly visual React experience
The project keeps a client-side, motion-heavy experience while adding an SSR/prerender step so crawlers and non-JavaScript consumers receive meaningful shipped HTML instead of an empty app shell.

### Treat accessibility as part of the build
The repository includes Playwright + axe checks and Lighthouse auditing rather than treating accessibility and performance as a final visual-QA step.

### Centralize artist content
Shared artist and release data lives in a reusable content layer so pages do not each invent their own source of truth.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The build process compiles TypeScript, creates the Vite client build, produces an SSR build, and prerenders the homepage so key content is present in the final HTML.

## Quality checks

```bash
npm run lint
npm run audit:playwright
npm run audit:lighthouse
```

## Key content locations

- App shell: `src/App.tsx`
- Navigation: `src/components/Navigation.tsx`
- Hero: `src/sections/Hero.tsx`
- Story: `src/sections/Story.tsx`
- Music: `src/sections/Music.tsx`
- Gallery: `src/sections/Gallery.tsx`
- Connect / newsletter: `src/sections/Connection.tsx`
- Release pages: `src/pages/ReleasePage.tsx`
- EPK page: `src/pages/EpkPage.tsx`
- Route metadata: `src/lib/metadata.ts`
- Shared artist/release content: `src/content/site.ts`

## What I owned

I treated this as both a creative-direction problem and a product-engineering problem: defining the experience, information architecture, reusable content model, motion direction, implementation requirements, quality gates, and production behavior; directing and reviewing implementation; and iterating the shipped experience against the live site.

## Portfolio context

This project shows a different side of my systems work than **[DevHouse AI](https://github.com/emorban/devhouse-ai)**. DevHouse focuses on AI, workflows, integrations, and operational reliability; Elison's World focuses on interaction design, storytelling, frontend architecture, accessibility, and shipping a highly visual product without abandoning technical quality.

## Newsletter

The subscribe form currently posts to Formspree. If the provider changes, update the endpoint in `src/sections/Connection.tsx`.

## Deployment

Deployed on Vercel at https://elisonworld.com.

This project is part portfolio piece, part working artist site, and part experiment in what a more expressive artist website template can be.
