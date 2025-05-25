import { ObjectValues } from '@/shared/helper-types/object-values.type';

/**
 * IDs used for testing purposes.
 */
export const TestId = {
  InputField: 'InputField',
  InputLabel: 'InputLabel'
} as const;

export type TestId = ObjectValues<typeof TestId>;
