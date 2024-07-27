import BodyCompTableHeading from '$lib/body-comp/components/body-comp-table/body-comp-table-heading/body-comp-table-heading.svelte';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';

describe('Body Comp Table Heading component', () => {
  test('renders correct columns', () => {
    const expectedHeadings = [
      'Date',
      'Weight',
      'Body fat',
      'Waist',
      'Neck',
      'Chest skinfold',
      'Ab skinfold',
      'Thigh skinfold',
    ];

    render(BodyCompTableHeading);

    expectedHeadings.forEach((heading) => {
      expect(screen.getByText(heading)).toBeInTheDocument();
    });
  });
});
