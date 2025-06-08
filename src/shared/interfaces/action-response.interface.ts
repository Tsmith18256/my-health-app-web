import { HttpStatusCode } from "../enums/http-status-code.enum";

/**
 * The interface that should be used for the return value of all action
 * handlers.
 */
export type IActionResponse<TSuccessFields extends object = object> = Promise<
  | (TSuccessFields & {
      /**
       * The status message.
       */
      message?: string;
      /**
       * The status code associated with the response.
       */
      statusCode: SuccessStatusCode;
    })
  | ({ [K in keyof TSuccessFields]?: undefined } & {
      /**
       * The status message.
       */
      message: string;
      /**
       * The status code associated with the response.
       */
      statusCode: ErrorStatusCode;
    })
>;

type ErrorStatusCode = (typeof HttpStatusCode)[
  | "BadRequest"
  | "InternalServerError"];
type SuccessStatusCode = Exclude<HttpStatusCode, ErrorStatusCode>;
