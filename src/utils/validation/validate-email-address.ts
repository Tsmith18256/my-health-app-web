import { Brand } from '@/types/brand.type';

export type EmailAddress = Brand<string, "EmailAddress">;

const emailRegex = /^.+@.+\..+/g;

export const validateEmailAddress = (input: string): EmailAddress => {
  if (!emailRegex.test(input)) {
    throw new Error(`${input} is not a valid email address`);
  }

  return input as EmailAddress;
};
