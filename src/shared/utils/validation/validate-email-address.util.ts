import { Brand } from '@/shared/helper-types/brand/brand.type';

export const validateEmailAddress = (input: string): EmailAddress => {
  if (emailRegex.test(input)) {
    return input as EmailAddress;
  }

  throw new Error(`(${input}) is not a valid email address`);
};

const emailRegex = /^.+@.+\..+$/;

export type EmailAddress = Brand<string, "EmailAddress">;
