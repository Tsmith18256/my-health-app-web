"use server";

import {
  IBodyCompEntry,
  INewBodyCompEntry,
  insertBodyCompEntry,
} from "@/features/body-comp/daos/body-comp-entry.dao";
import { HttpStatusCode } from "@/shared/enums/http-status-code.enum";
import { IActionResponse } from "@/shared/interfaces/action-response.interface";

/**
 * Server action to create a new body comp entry.
 */
export const createBodyCompEntry = async (
  inputEntry: INewBodyCompEntry,
): IActionResponse<{ entry: IBodyCompEntry }> => {
  const { entry: createdEntry, error } = await insertBodyCompEntry(inputEntry);

  if (createdEntry) {
    return {
      entry: createdEntry,
      statusCode: HttpStatusCode.Success,
    };
  }

  return {
    message: error.message,
    statusCode: HttpStatusCode.InternalServerError,
  };
};
