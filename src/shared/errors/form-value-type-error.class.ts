import {
  ErrorCode,
  ErrorWithCode,
} from "@/shared/errors/error-with-code.class";

/**
 * A custom error class for form value type mismatches. The purpose of this
 * class is to extend ErrorWithCode but provide auto-generated error messages
 * based on the field name and value.
 */
export class FormValueTypeError extends ErrorWithCode {
  constructor(
    public fieldName: string,
    public value: string | File,
    opts?: ErrorOptions,
  ) {
    /* c8 ignore start */
    const message =
      value instanceof File
        ? `Did not expect file data for ${fieldName}`
        : `Did not expect string data for ${fieldName}`;
    /* c8 ignore stop */

    super(ErrorCode.FormValueTypeMismatch, message, opts);
  }
}
