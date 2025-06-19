/**
 * Returns the message string, if found, from an unknown error. This is intended
 * to be used in catch clauses, where the error type is unknown.
 */
export const getMessageFromUnknownError = (
  err: unknown,
): string | undefined => {
  if (err instanceof Error) {
    return err.message;
  }

  if (typeof err === "string") {
    return err;
  }

  return undefined;
};
