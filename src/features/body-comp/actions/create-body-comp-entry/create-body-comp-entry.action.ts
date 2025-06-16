"use server";

import { getAuthSessionDetails } from "@/features/auth/get-auth-session-details.util";
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
export const createBodyCompEntryAction = async (
  inputEntry: INewBodyCompEntry,
): IActionResponse<{ entry: IBodyCompEntry }> => {
  const { emailAddress } = await getAuthSessionDetails();
  if (inputEntry.userEmail !== emailAddress) {
    return {
      message: "Cannot create a body comp entry for another user",
      statusCode: HttpStatusCode.BadRequest,
    };
  }

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
