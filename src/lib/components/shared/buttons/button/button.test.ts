import TestingWrapperButton from '$lib/components/shared/buttons/button/testing-wrapper-button.svelte';
import { TEST_IDS } from '$lib/constants/test-ids.constants';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';

describe('Button component', () => {
  test('renders text', () => {
    render(TestingWrapperButton);

    const button = screen.getByTestId(TEST_IDS.button);
    expect(button).toHaveTextContent('Click me');
  });
});
