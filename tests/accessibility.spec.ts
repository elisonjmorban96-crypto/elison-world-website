import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const staticSubpages = [
  {
    path: '/la-primera/',
    title: /LA PRIMERA \| Elison/,
    heading: /LA PRIMERA/i,
    canonical: 'https://elisonworld.com/la-primera/',
    marker: 'Official Release Page',
  },
  {
    path: '/decisions/',
    title: /Decisions \(Remastered\) \| Elison/,
    heading: /Decisions \(Remastered\)/i,
    canonical: 'https://elisonworld.com/decisions/',
    marker: 'Official Release Page',
  },
  {
    path: '/epk/',
    title: /EPK \| Elison/,
    heading: /Elison EPK/i,
    canonical: 'https://elisonworld.com/epk/',
    marker: 'Official EPK',
  },
] as const;

test('homepage has the expected landmarks and metadata', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Elison's World/);
  await expect(page.locator('main')).toBeVisible();
  // Hero has 2 h1 elements ("Nothing was random." and "It was all connected.")
  await expect(page.locator('h1')).toHaveCount(2);
  await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
});

test('homepage passes core axe accessibility checks', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page })
    .exclude('iframe')
    .disableRules(['color-contrast', 'meta-viewport'])
    .analyze();

  expect(results.violations).toEqual([]);
});

test('homepage stays within the viewport on a mobile screen', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();

  await page.goto('/');

  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  expect(metrics.scrollWidth).toBe(metrics.clientWidth);

  await context.close();
});

test('homepage keeps the hero readable when reduced motion is enabled', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();

  await page.goto('/');

  // With reduced motion, hero text should be visible immediately
  await expect(page.getByRole('heading', { name: /Nothing was random/i })).toBeVisible();
  await expect(page.getByText('It was all connected.')).toBeVisible();

  await context.close();
});

for (const subpage of staticSubpages) {
  test(`${subpage.path} has the expected metadata and primary content`, async ({ page }) => {
    await page.goto(subpage.path);

    await expect(page).toHaveTitle(subpage.title);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: subpage.heading })).toBeVisible();
    await expect(page.getByText(subpage.marker, { exact: true })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', subpage.canonical);
    await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  });

  test(`${subpage.path} is readable without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    await page.goto(subpage.path, { waitUntil: 'domcontentloaded' });

    await expect(page.getByRole('heading', { level: 1, name: subpage.heading })).toBeVisible();
    await expect(page.getByText(subpage.marker, { exact: true })).toBeVisible();

    await context.close();
  });
}
