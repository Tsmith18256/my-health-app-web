"use server";

import {
  IBodyCompEntry,
  INewBodyCompEntry,
  insertBodyCompEntry,
} from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";
import { HttpStatusCode } from "@/shared/enums/http-status-code.enum";
import { IActionResponse } from "@/shared/interfaces/action-response.interfaces";

/**
 * Server action to create a new body comp entry.
 */
export const createBodyCompEntryAction = async (
  inputEntry: INewBodyCompEntry
): Promise<IActionResponse<{ entry: IBodyCompEntry }>> => {
  try {
    const createdEntry = await insertBodyCompEntry(inputEntry);

    return {
      entry: createdEntry,
      statusCode: HttpStatusCode.Success
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: err.message,
        statusCode: HttpStatusCode.InternalServerError,
      };
    }

    return {
      message: typeof err === "string" ? err : "Unknown error occurred",
      statusCode: HttpStatusCode.InternalServerError,
    };
  }
};
