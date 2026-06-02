import { expect, test } from '@playwright/test';

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
