import { ObjectValues } from '@/shared/helper-types/object-values/object-values.type';

export const validateSex = (input: string): Sex => {
  if (Object.values<string>(Sex).includes(input)) {
    return input as Sex;
  }

  throw new Error(`(${input}) is not a valid Sex value.`);
};

export const Sex = {
  Female: "F",
  Male: "M",
} as const;

export type Sex = ObjectValues<typeof Sex>;
