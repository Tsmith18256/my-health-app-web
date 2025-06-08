import { ObjectValues } from "@/shared/helper-types/object-values.type";

/**
 * A basic Error subclass that adds an ErrorCode field and populates a default
 * error message based on the given code. The default message can be overridden
 * any time.
 */
export class ErrorWithCode extends Error {
  /**
   * Creates a new instance of `ErrorWithCode`. If no error message is provided,
   * a default one will be used based on the given error code.
   */
  constructor(
    /**
     * The code associated with this error.
     */
    public code: ErrorCode,
    message: string = DefaultErrorMessagesByCode[code],
    opts?: ErrorOptions,
  ) {
    super(message, opts);
  }
}

/**
 * A list of error codes used throughout the app. These codes are intended for
 * internal use for debugging/logging purposes.
 */
export const ErrorCode = {
  AuthFailed: "AuthFailed",
  DatabaseInsertError: "DatabaseInsertError",
  DatabaseUpdateError: "DatabaseUpdateError",
  FormDataIncomplete: "FormDataIncomplete",
  FormValueTypeMismatch: "FormValueTypeMismatch",
} as const;
export type ErrorCode = ObjectValues<typeof ErrorCode>;

/**
 * A mapping of each error code to the default error message to display. These
 * messages are intended for displaying to the user or to add human-friendly
 * output to logging.
 */
const DefaultErrorMessagesByCode = {
  [ErrorCode.AuthFailed]: "Authentication failed.",
  [ErrorCode.DatabaseInsertError]: "Unknown error inserting into database.",
  [ErrorCode.DatabaseUpdateError]: "Unknown error updating entry in database.",
  [ErrorCode.FormDataIncomplete]: "Form data incomplete.",
  [ErrorCode.FormValueTypeMismatch]: "Unknown error parsing form data.",
} as const satisfies Record<ErrorCode, string>;
