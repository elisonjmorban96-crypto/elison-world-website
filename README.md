# Elison World Website

Official website for Elison. The app is a Vite + React single-page site with prerendered HTML, GSAP motion, embedded music playback, and production checks for accessibility and crawlability.

## Stack

- Vite
- React 19
- TypeScript
- Tailwind CSS
- GSAP
- Playwright + axe-core
- Lighthouse
- Vercel Analytics

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

The build script prerenders the homepage after the normal Vite client build so crawlers receive the full story, music, gallery, and connect content in the shipped HTML.

## Quality checks

```bash
npm run lint
npm run audit:playwright
npm run audit:lighthouse
```

## Content locations

- App shell: `src/App.tsx`
- Navigation: `src/components/Navigation.tsx`
- Hero: `src/sections/Hero.tsx`
- Story: `src/sections/Story.tsx`
- Music: `src/sections/Music.tsx`
- Gallery: `src/sections/Gallery.tsx`
- Connect / newsletter: `src/sections/Connection.tsx`
- SEO shell metadata: `index.html`
- Crawl directives: `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, `public/llms-full.txt`

## Newsletter

The subscribe form posts to Formspree at `https://formspree.io/f/xqewbelg`. There are no local environment variables required for the current setup.

If you move the form to another provider later, update the endpoint constant in `src/sections/Connection.tsx`.

## Deployment

The project is deployed on Vercel at `https://elisonworld.com`.

Expected production settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
