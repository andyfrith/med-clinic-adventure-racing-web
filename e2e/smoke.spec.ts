import { expect, test, type Page } from '@playwright/test';

/** Viewport targets from specs/responsive-design.md */
const viewports = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1024, height: 768 },
  kiosk: { width: 1920, height: 1080 },
} as const;

async function expectNoHorizontalScroll(page: Page) {
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
}

test.describe('Phase 0 smoke', () => {
  test('home page loads with app title', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: 'Adventure Racing Med Clinic' }),
    ).toBeVisible();
  });

  test('kiosk page loads with large queue heading', async ({ page }) => {
    await page.goto('/kiosk');
    await expect(page.getByRole('heading', { name: 'Clinic queue' })).toBeVisible();
  });
});

test.describe('Responsive staff shell', () => {
  for (const [name, size] of Object.entries(viewports)) {
    test(`${name} (${size.width}px): home loads without horizontal scroll`, async ({
      page,
    }) => {
      await page.setViewportSize(size);
      await page.goto('/');
      await expect(
        page.getByRole('heading', { name: 'Adventure Racing Med Clinic' }),
      ).toBeVisible();
      await expectNoHorizontalScroll(page);
    });
  }

  test('mobile: navigation drawer opens and closes', async ({ page }) => {
    await page.setViewportSize(viewports.mobile);
    await page.goto('/');

    const menuButton = page.getByRole('button', { name: 'Open navigation menu' });
    await expect(menuButton).toBeVisible();

    await menuButton.click();
    await expect(page.getByRole('navigation', { name: 'Staff navigation' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Clinician' })).toBeVisible();

    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByRole('navigation', { name: 'Staff navigation' })).toBeHidden();
  });

  test('desktop: persistent sidebar visible, mobile menu hidden', async ({ page }) => {
    await page.setViewportSize(viewports.desktop);
    await page.goto('/');

    await expect(page.getByRole('navigation', { name: 'Staff navigation' })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Open navigation menu' }),
    ).toBeHidden();
  });

  test('tablet: drawer nav available', async ({ page }) => {
    await page.setViewportSize(viewports.tablet);
    await page.goto('/clinician');

    await expect(
      page.getByRole('button', { name: 'Open navigation menu' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Clinician' }),
    ).toBeVisible();
    await expectNoHorizontalScroll(page);
  });
});

test.describe('Placeholder role routes', () => {
  const routes = [
    { path: '/clinician', heading: 'Clinician' },
    { path: '/doctor', heading: 'Doctor' },
    { path: '/ops', heading: 'Ops / Admin' },
    { path: '/racer', heading: 'Racer' },
  ] as const;

  for (const { path, heading } of routes) {
    test(`${path} loads at mobile width`, async ({ page }) => {
      await page.setViewportSize(viewports.mobile);
      await page.goto(path);
      await expect(page.getByRole('main').getByRole('heading', { name: heading })).toBeVisible();
      await expectNoHorizontalScroll(page);
    });
  }
});

test.describe('Kiosk display', () => {
  test('1920x1080: large queue heading and now serving section', async ({ page }) => {
    await page.setViewportSize(viewports.kiosk);
    await page.goto('/kiosk');

    await expect(page.getByRole('heading', { name: 'Clinic queue' })).toBeVisible();
    await expect(page.getByText('Now serving')).toBeVisible();
    await expectNoHorizontalScroll(page);
  });
});
