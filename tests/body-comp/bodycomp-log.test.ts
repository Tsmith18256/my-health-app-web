import test, { expect } from '@playwright/test';
import { TEST_IDS } from '../../src/lib/shared/constants/test-ids.constants';
import { sleep } from '../../src/lib/shared/utils/sleep/sleep.util';
import dayjs from 'dayjs';

test.describe('Body Comp Log', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the log page.
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
    await page.setViewportSize({ width: 412, height: 783 });

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

  test('saves and displays new entry', async ({ page }) => {
    // Update the settings so that the user is 28 and 5'10" every time.
    const settingsButton = page.getByTitle('Settings');
    await settingsButton.click();

    const birthdayInput = page.getByLabel('Birthday');
    await birthdayInput.fill(dayjs().subtract(28, 'year').format('YYYY-MM-DD'));

    const heightInput = page.getByLabel('Height');
    await heightInput.fill('70');

    const saveButton = page.getByText('Save Settings');
    await saveButton.click();

    const backButton = page.getByTitle('Go back');
    await backButton.click();

    // Open the new entry modal.
    const newEntryButton = page.getByTestId(TEST_IDS.button);
    await newEntryButton.click();

    // Fill out the form.
    const weightInput = page.getByLabel('Weight (lbs)');
    await weightInput.fill('177.8');
    const waistInput = page.getByLabel('Waist (in)');
    await waistInput.fill('33.5');
    const neckInput = page.getByLabel('Neck (in)');
    await neckInput.fill('15');
    const chestInput = page.getByLabel('Chest (mm)');
    await chestInput.fill('10');
    const abInput = page.getByLabel('Ab (mm)');
    await abInput.fill('11');
    const thighInput = page.getByLabel('Thigh (mm)');
    await thighInput.fill('12');

    // Submit the form.
    const submitButton = page.getByText('SUBMIT');
    await submitButton.click();

    // Check that the table row is showing with all the correct info.
    const weightLabel = page.getByText('177.8 lbs');
    await expect(weightLabel).toBeVisible();
    const bodyFatLabel = page.getByText('13.11%');
    await expect(bodyFatLabel).toBeVisible();
    const waistLabel = page.getByText('33.5"');
    await expect(waistLabel).toBeVisible();
    const neckLabel = page.getByText('15.0"');
    await expect(neckLabel).toBeVisible();
    const chestLabel = page.getByText('10 mm');
    await expect(chestLabel).toBeVisible();
    const abLabel = page.getByText('11 mm');
    await expect(abLabel).toBeVisible();
    const thighLabel = page.getByText('12 mm');
    await expect(thighLabel).toBeVisible();

    await sleep(1000);
  });
});
