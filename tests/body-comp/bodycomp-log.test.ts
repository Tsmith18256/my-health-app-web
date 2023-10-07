import test, { expect } from '@playwright/test';
import { TEST_IDS } from '../../src/lib/constants/test-ids.constants';

test.describe('Body Comp Log', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/bodycomp/log');
  });

  test('shows icon button for new entry on desktop', async ({ page }) => {
    const button = await page.getByTestId(TEST_IDS.button);
    await expect(button).toBeVisible();
    await expect(button).toHaveText('NEW ENTRY');

    const fab = await page.getByTestId(TEST_IDS.floatingActionButton);
    await expect(fab).not.toBeVisible();
  });

  test('shows floating action button for new entry on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 412, height: 783 })

    const fab = await page.getByTestId(TEST_IDS.floatingActionButton);
    await expect(fab).toBeVisible();

    const button = await page.getByTestId(TEST_IDS.button);
    await expect(button).not.toBeVisible();
  });

  test('opens modal on new entry button click', async ({ page }) => {
    const button = page.getByTestId(TEST_IDS.button);
    await button.click();

    const modal = await page.getByTestId(TEST_IDS.modal);
    await expect(modal).toBeVisible();
  });
});
