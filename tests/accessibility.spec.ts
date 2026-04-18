import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage has the expected landmarks and metadata', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Elison \| Latin R&B Artist \| LA PRIMERA/);
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
});

test('homepage passes core axe accessibility checks', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page })
    .disableRules(['color-contrast'])
    .analyze();

  expect(results.violations).toEqual([]);
});

test('navigation and gallery are keyboard reachable', async ({ page }) => {
  await page.goto('/');

  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.locator('nav').getByRole('link', { name: 'ELISON', exact: true })).toBeFocused();

  await page.getByRole('button', { name: /open gallery image 1/i }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
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
  await expect(page.getByRole('button', { name: /open menu/i })).toBeVisible();

  await context.close();
});
