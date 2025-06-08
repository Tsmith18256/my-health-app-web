/**
 * Helper type for returning an object with an error. This is used throughout
 * the app for known errors rather than using `throw` because TypeScript can't
 * do type inference in a `catch`.
 */
export type WithError<
  TSuccessFields extends object = object,
  TError extends Error = Error,
> =
  | (TSuccessFields & {
      /**
       * The error.
       */
      error?: TError;
    })
  | ({ [K in keyof TSuccessFields]?: undefined } & {
      /**
       * The error.
       */
      error: TError;
    });
