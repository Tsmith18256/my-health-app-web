import { ObjectValues } from "@/shared/helper-types/object-values.type";

/**
 * An enum of all the HTTP status codes used throughout the app.
 */
export const HttpStatusCode = {
  BadRequest: 400,
  InternalServerError: 500,
  Success: 200,
} as const;

export type HttpStatusCode = ObjectValues<typeof HttpStatusCode>;
