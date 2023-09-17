import BodyCompListItem from '$lib/components/body-comp-list-item/body-comp-list-item.svelte';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';

const mockBodyFat = '13.9';
const mockDate = '2023-09-17';
const mockWeight = '167.2';

describe('Body Comp List Item component', () => {
  test('renders date', () => {
    render(BodyCompListItem, { date: mockDate, weight: mockWeight, bodyFat: mockBodyFat });

    const date = screen.getByText(mockDate);
    expect(date).toBeInTheDocument();
  });

  test('formats weight string', () => {
    render(BodyCompListItem, { date: mockDate, weight: mockWeight, bodyFat: mockBodyFat });

    const weight = screen.getByText(`${mockWeight} lbs`);
    expect(weight).toBeInTheDocument();
  });

	test('formats body fat string', () => {
		render(BodyCompListItem, { date: mockDate, weight: mockWeight, bodyFat: mockBodyFat });

    const bodyFat = screen.getByText(`${mockBodyFat}% BF`);
    expect(bodyFat).toBeInTheDocument();
	});
});
