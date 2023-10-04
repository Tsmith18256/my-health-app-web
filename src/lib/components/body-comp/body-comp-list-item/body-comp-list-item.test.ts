import BodyCompListItem from '$lib/components/body-comp/body-comp-list-item/body-comp-list-item.svelte';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';

const mockProps = {
  date: '2023-09-17',
  weight: '167.2',
  bodyFat: '13.9',
  waistCirc: '34.5',
  neckCirc: '15.0',
  chestSkinfold: '12',
  abSkinfold: '14',
  thighSkinfold: '13',
};

describe('Body Comp List Item component', () => {
  test('renders date', () => {
    render(BodyCompListItem, mockProps);

    const date = screen.getByText(mockProps.date);
    expect(date).toBeInTheDocument();
  });

  test.each([
    ['weight', `${mockProps.weight} lbs`],
    ['body fat', `${mockProps.bodyFat}% BF`],
    ['waist circumference', `${mockProps.waistCirc}"`],
    ['neck circumference', `${mockProps.neckCirc}"`],
    ['chest skinfold', `${mockProps.chestSkinfold} mm`],
    ['ab skinfold', `${mockProps.abSkinfold} mm`],
    ['thigh skinfold', `${mockProps.thighSkinfold} mm`],
  ])('formats %s string', (_, expected) => {
    render(BodyCompListItem, mockProps);

    const element = screen.getByText(expected);
    expect(element).toBeInTheDocument();
  });
});
