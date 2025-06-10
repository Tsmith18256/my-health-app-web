"use server";

import {
  IBodyCompEntry,
  updateBodyCompEntry as updateEntryInDb,
} from "@/features/body-comp/daos/body-comp-entry.dao";
import { IActionResponse } from "@/shared/interfaces/action-response.interface";
import { HttpStatusCode } from "@/shared/enums/http-status-code.enum";

/**
 * Server action to update an existing body comp entry.
 */
export const updateBodyCompEntryAction = async (
  entry: IBodyCompEntry,
): IActionResponse<{ updatedEntry: IBodyCompEntry }> => {
  const { updatedEntry, error } = await updateEntryInDb(entry);

  if (updatedEntry) {
    return {
      updatedEntry,
      statusCode: HttpStatusCode.Success,
    };
  }

  return {
    message: error.message,
    statusCode: HttpStatusCode.InternalServerError,
  };
};
